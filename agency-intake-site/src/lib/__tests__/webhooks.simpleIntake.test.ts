import { buildSimpleIntakePayload } from '@/lib/webhooks'
import { simpleIntakeSchema } from '@/lib/simple-intake.schema'

describe('simple intake lead flow', () => {
  it('builds the expected lead payload for the shared contact form', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-03-15T10:30:00Z'))

    const payload = buildSimpleIntakePayload({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(555) 123-4567',
      businessName: 'Acme Co',
      roleInCompany: 'Founder',
      businessSize: 'growing',
      services: ['web_development', 'ai_automation'],
      urgencyTag: '2_4_weeks',
      projectDetails: 'We need a new site and lead routing automation.',
      preferredContactMethod: 'phone',
      turnstileToken: 'tok'
    })

    expect(payload).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(555) 123-4567',
      businessName: 'Acme Co',
      roleInCompany: 'Founder',
      businessSize: '11-50 employees',
      services: ['Web Development', 'AI Automation'],
      urgencyTag: '2-4 Weeks',
      projectDetails: 'We need a new site and lead routing automation.',
      preferredContactMethod: 'Phone',
      dateSent: '03-15-2026',
      turnstileToken: 'tok'
    })

    jest.useRealTimers()
  })

  it('requires a phone number when phone is the preferred contact method', () => {
    const result = simpleIntakeSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '',
      businessName: '',
      roleInCompany: '',
      businessSize: 'small',
      services: ['web_development'],
      urgencyTag: '',
      projectDetails: '',
      preferredContactMethod: 'phone'
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toContain('Phone number is required if you prefer a phone call')
    }
  })

  it('allows email as the preferred contact method without a phone number', () => {
    const result = simpleIntakeSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '',
      businessName: '',
      roleInCompany: '',
      businessSize: 'small',
      services: ['social_media_management'],
      urgencyTag: '',
      projectDetails: '',
      preferredContactMethod: 'email'
    })

    expect(result.success).toBe(true)
  })
})
