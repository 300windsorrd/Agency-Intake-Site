import { submitIntake, buildIntakePayload } from '@/lib/webhooks'
import { IntakeFormData } from '@/lib/schema'

describe('submitIntake', () => {
  const originalEnv = process.env
  const baseForm: IntakeFormData = {
    business: {
      name: 'Acme Co',
      industry: 'Retail & E-commerce',
      address: {
        country: 'United States',
        state: 'CA',
        streetAddress: '1 Main St',
        city: 'San Francisco',
        zipCode: '94105'
      },
      phone: '555-123-4567',
      domain: 'acme.com',
      socials: {}
    },
    goals: {
      conversions: ['calls'],
      pages: ['Home']
    },
    color: {
      brand: '#3366FF',
      mode: 'auto',
      palette: ['#3366FF']
    },
    fonts: {
      headings: 'inter',
      body: 'inter'
    },
    templates: ['Style A'],
    referenceUrls: [],
    features: [],
    assets: {},
    content: {},
    admin: { timeline: '3-4_weeks', plan: 'standard' }
  }

  beforeEach(() => {
    jest.resetAllMocks()
    process.env = { ...originalEnv }
    process.env.N8N_INTAKE_WEBHOOK_URL = 'https://n8n.example.com/webhook/intake'
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('posts intake data to the intake api route and returns an id', async () => {
    const mockId = '1234-uuid'
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, id: mockId })
    } as any)

    const res = await submitIntake(baseForm, 'tok')

    expect(res).toEqual({ success: true, id: mockId })
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/intake',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('returns webhook error details on failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'bad' })
    } as any)

    const res = await submitIntake(baseForm, 'tok')

    expect(res.success).toBe(false)
    expect(res.error).toBe('bad')
  })

  it('builds the expected payload structure', () => {
    const payload = buildIntakePayload(baseForm, 'tok')

    expect(payload.business_name).toBe('Acme Co')
    expect(payload.goals).toEqual(['Calls'])
    expect(payload.turnstileToken).toBe('tok')
  })
})
