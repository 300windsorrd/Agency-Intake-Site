import { NextRequest, NextResponse } from 'next/server'
import { intakeSchema } from '@/lib/schema'
import { buildIntakePayload } from '@/lib/webhooks'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { turnstileToken, ...intakeData } = body

    if (!turnstileToken && process.env.NODE_ENV !== 'production') {
      turnstileToken = 'placeholder-token'
    } else if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Turnstile token is required' },
        { status: 400 }
      )
    }

    const intakeWebhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL?.trim() || process.env.N8N_WEBHOOK_URL?.trim() || process.env.WEBHOOK_URL?.trim()

    if (!intakeWebhookUrl) {
      return NextResponse.json(
        { success: false, error: 'n8n intake webhook is not configured' },
        { status: 500 }
      )
    }

    const validatedData = intakeSchema.parse(intakeData)
    const submissionId = crypto.randomUUID()
    const response = await fetch(intakeWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId,
        formType: 'intake',
        submittedAt: new Date().toISOString(),
        intake: buildIntakePayload(validatedData, turnstileToken)
      })
    })

    let result: any = null
    try {
      result = await response.json()
    } catch {
      result = null
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: result?.error || 'Webhook request failed' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        id: result?.id || result?.submissionId || result?.intakeId || submissionId,
        message: 'Intake submitted successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Intake submission error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.message
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
