import { IntakeFormData } from './schema'
import { IntakePayload } from './intake.schema'
import type { SimpleIntake } from './simple-intake.schema'

type SubmitResult = { success: boolean; id?: string; error?: string }
const INTAKE_WEBHOOK_ENV_KEYS = ['N8N_INTAKE_WEBHOOK_URL', 'N8N_WEBHOOK_URL', 'WEBHOOK_URL'] as const
type WebhookResponse = {
  id?: string
  submissionId?: string
  intakeId?: string
  error?: string
  message?: string
  success?: boolean
}

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

function formatDateSent(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}-${day}-${year}`
}

async function postWebhook(url: string, payload: unknown): Promise<{ id?: string }> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  let result: WebhookResponse | null = null
  try {
    const text = await response.text()
    const parsed: unknown = text ? JSON.parse(text) : null
    result = parsed && typeof parsed === 'object' ? (parsed as WebhookResponse) : null
  } catch {
    result = null
  }

  if (!response.ok) {
    throw new Error(result?.error || result?.message || `Webhook request failed with status ${response.status}`)
  }

  return {
    id: result?.id || result?.submissionId || result?.intakeId
  }
}

async function parseJsonResponse(response: Response): Promise<WebhookResponse | null> {
  try {
    const text = await response.text()
    if (!text.trim()) return null
    const parsed: unknown = JSON.parse(text)
    return parsed && typeof parsed === 'object' ? (parsed as WebhookResponse) : null
  } catch {
    return null
  }
}

export function buildIntakePayload(intake: IntakeFormData, turnstileToken: string): IntakePayload {
  const goalMapping: Record<IntakeFormData['goals']['conversions'][number], IntakePayload['goals'][number]> = {
    calls: 'Calls',
    bookings: 'Bookings',
    orders: 'Orders',
    lead_form: 'Lead Form',
    not_sure: 'not_sure'
  }

  const featureMapping: Record<
    Exclude<NonNullable<IntakeFormData['features']>[number], 'not_sure'>,
    NonNullable<IntakePayload['features']>[number]
  > = {
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
    analytics: 'Analytics'
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
      return mapped.length ? mapped : (['not_sure'] as IntakePayload['goals'])
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
        const harmony = intake.color?.harmony
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
      .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature)),
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
  const mapBusinessSize = (businessSize: SimpleIntake['businessSize']) => ({
    solo: 'Solo / Freelancer',
    small: '2-10 employees',
    growing: '11-50 employees',
    established: '51-200 employees',
    enterprise: '200+ employees'
  }[businessSize])

  const mapService = (service: SimpleIntake['services'][number]) => ({
    web_development: 'Web Development',
    social_media_management: 'Social Media Management',
    ai_automation: 'AI Automation'
  }[service])

  const mapUrgencyTag = (urgencyTag: Exclude<SimpleIntake['urgencyTag'], '' | undefined>) => ({
    asap: 'ASAP',
    '2_4_weeks': '2-4 Weeks',
    '1_2_months': '1-2 Months',
    flexible: 'Flexible'
  }[urgencyTag])

  const mapContactMethod = (preferredContactMethod: SimpleIntake['preferredContactMethod']) =>
    preferredContactMethod === 'phone' ? 'Phone' : 'Email'

  return {
    name: intake.name,
    email: intake.email,
    phone: intake.phone || undefined,
    businessName: intake.businessName || undefined,
    roleInCompany: intake.roleInCompany || undefined,
    businessSize: mapBusinessSize(intake.businessSize),
    services: intake.services.map(mapService),
    urgencyTag: intake.urgencyTag ? mapUrgencyTag(intake.urgencyTag) : undefined,
    projectDetails: intake.projectDetails || undefined,
    preferredContactMethod: mapContactMethod(intake.preferredContactMethod),
    dateSent: formatDateSent(new Date()),
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
      const result = await parseJsonResponse(response)
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || result?.message || 'Failed to submit intake')
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

    const result = await parseJsonResponse(response)
    if (!response.ok || !result?.success) {
      throw new Error(result?.error || result?.message || 'Failed to submit lead')
    }

    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Error submitting simple intake:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
