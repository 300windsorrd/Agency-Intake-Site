import { IntakeFormData } from './schema'
import { IntakePayload } from './intake.schema'
import type { SimpleIntake } from './simple-intake.schema'

type SubmitResult = { success: boolean; id?: string; error?: string }

const CONTACT_WEBHOOK_ENV_KEYS = ['N8N_CONTACT_WEBHOOK_URL', 'N8N_WEBHOOK_URL', 'WEBHOOK_URL'] as const
const INTAKE_WEBHOOK_ENV_KEYS = ['N8N_INTAKE_WEBHOOK_URL', 'N8N_WEBHOOK_URL', 'WEBHOOK_URL'] as const

function normalizeUrlOrUndefined(input?: string): string | undefined {
  if (!input) return undefined
  try {
    const withScheme = /^https?:\/\//i.test(input) ? input : `https://${input}`
    const url = new URL(withScheme)
    return url.toString()
  } catch {
    return undefined
  }
}

function composeAddress(intake: IntakeFormData): string {
  const addr = intake.business.address
  const parts = [
    addr?.streetAddress,
    addr?.city,
    addr?.state,
    addr?.zipCode,
    addr?.country
  ].filter(Boolean)
  return parts.join(', ')
}

function getWebhookUrl(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim()
    if (value) {
      return value
    }
  }
  return undefined
}

async function postWebhook(url: string, payload: unknown): Promise<{ id?: string }> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  let result: any = null
  try {
    result = await response.json()
  } catch {
    result = null
  }

  if (!response.ok) {
    throw new Error(result?.error || `Webhook request failed with status ${response.status}`)
  }

  return {
    id: result?.id || result?.submissionId || result?.intakeId
  }
}

export function buildIntakePayload(intake: IntakeFormData, turnstileToken: string): IntakePayload {
  const goalMapping: Record<string, 'Calls' | 'Bookings' | 'Orders' | 'Lead Form' | 'Not Sure'> = {
    calls: 'Calls',
    bookings: 'Bookings',
    orders: 'Orders',
    lead_form: 'Lead Form',
    not_sure: 'Not Sure'
  }

  const featureMapping: Record<string, string> = {
    booking: 'Booking',
    menu_catalog: 'Menu Catalog',
    gift_cards: 'Gift Cards',
    testimonials: 'Testimonials',
    gallery: 'Gallery',
    blog: 'Blog',
    faq: 'FAQ',
    map: 'Map',
    hours: 'Hours',
    contact_form: 'Contact Form',
    chat: 'Chat',
    analytics: 'Analytics',
    not_sure: 'Not Sure'
  }

  const selectedDomain = normalizeUrlOrUndefined(intake.business.domain)
  const address = composeAddress(intake)
  const mappedPages = (intake.goals.pages || []).filter((p) => p !== 'not_sure')
  const pages = mappedPages.length ? (mappedPages as IntakePayload['pages']) : (['Home'] as IntakePayload['pages'])

  const normalizeTemplate = (template: string): 'Template A' | 'Template B' | 'Style A' | 'Style B' => {
    if (template === 'Style A' || template === 'Template A') {
      return (process.env.NEXT_PUBLIC_TEMPLATE_LABEL || 'Template') === 'Template' ? 'Template A' : 'Style A'
    }
    if (template === 'Style B' || template === 'Template B') {
      return (process.env.NEXT_PUBLIC_TEMPLATE_LABEL || 'Template') === 'Template' ? 'Template B' : 'Style B'
    }
    return 'Template A'
  }

  return {
    business_name: intake.business.name || 'Test Business',
    industry: intake.business.industry || 'Technology',
    address: address || '123 Test Street',
    phone: intake.business.phone || '555-0123',
    domain: selectedDomain,
    goals: (() => {
      const mapped = (intake.goals.conversions || [])
        .map((goal) => goalMapping[goal])
        .filter((goal): goal is NonNullable<typeof goal> => Boolean(goal))
      return mapped.length ? mapped : (['Not Sure'] as any)
    })(),
    pages,
    color: {
      selected: intake.color.brand || '#000000',
      mode: (() => {
        const map: Record<string, IntakePayload['color']['mode']> = {
          complementary: 'Complementary',
          analogous: 'Analogous',
          split: 'Split',
          triad: 'Triad',
          tetrad: 'Tetrad',
          mono: 'Monochrome',
          'mono-tints': 'Monochrome Tints'
        }
        const harmony = (intake as any)?.color?.harmony as keyof typeof map | undefined
        return (harmony && map[harmony]) || 'Monochrome'
      })(),
      palette: intake.color.palette || ['#000000']
    },
    typography: {
      headings: intake.fonts.headings || 'inter',
      body: intake.fonts.body || 'inter',
      style: intake.fonts.headings || 'inter'
    },
    templates: ((intake.templates?.length ? intake.templates : ['Style A']).map(normalizeTemplate)) as IntakePayload['templates'],
    inspiration_urls: intake.referenceUrls || [],
    features: (intake.features || [])
      .filter((feature) => feature !== 'not_sure')
      .map((feature) => featureMapping[feature])
      .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature)) as unknown as IntakePayload['features'],
    timeline: intake.admin?.timeline?.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || '3-4 weeks',
    plan: intake.admin?.plan
      ? intake.admin.plan.charAt(0).toUpperCase() + intake.admin.plan.slice(1)
      : 'Standard',
    organization: {
      name: intake.business.name || 'Test Business',
      website: selectedDomain,
      phone: intake.business.phone || '555-0123',
      address,
      domain: selectedDomain
    },
    turnstileToken
  }
}

export function buildSimpleIntakePayload(intake: SimpleIntake) {
  const mapRole = (role: SimpleIntake['role']) => ({
    owner: 'Owner',
    manager: 'Manager',
    employee: 'Employee',
    investor: 'Investor',
    other: 'Other'
  }[role])

  const mapUrgency = (urgency: SimpleIntake['urgency']) => (urgency === 'soon' ? 'Soon' : 'No Rush')

  return {
    name: intake.name,
    company: intake.company,
    role: mapRole(intake.role),
    email: intake.email,
    phone: intake.phone,
    urgency: mapUrgency(intake.urgency),
    turnstileToken: intake.turnstileToken
  }
}

export async function submitIntake(intake: IntakeFormData, turnstileToken: string): Promise<SubmitResult> {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turnstileToken, ...intake })
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit intake')
      }
      return { success: true, id: result.id }
    } catch (error) {
      console.error('Error submitting intake (client):', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  const webhookUrl = getWebhookUrl(INTAKE_WEBHOOK_ENV_KEYS)
  if (!webhookUrl) {
    return {
      success: false,
      error: 'n8n intake webhook not configured. Set N8N_INTAKE_WEBHOOK_URL or N8N_WEBHOOK_URL.'
    }
  }

  try {
    const submissionId = crypto.randomUUID()
    const result = await postWebhook(webhookUrl, {
      submissionId,
      formType: 'intake',
      submittedAt: new Date().toISOString(),
      intake: buildIntakePayload(intake, turnstileToken)
    })
    return { success: true, id: result.id || submissionId }
  } catch (error) {
    console.error('Error submitting intake:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function submitSimpleIntake(intake: SimpleIntake, turnstileToken: string): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...intake, turnstileToken })
    })

    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit lead')
    }

    return { success: true, id: result.id }
  } catch (error) {
    console.error('Error submitting simple intake:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
