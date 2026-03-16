import type { Metadata } from 'next'
import { ArrowRight, CalendarClock, ClipboardList, MessageSquareMore } from 'lucide-react'
import Link from 'next/link'
import SimpleIntakeForm from '@/components/SimpleIntakeForm'

export const metadata: Metadata = {
  title: 'Consultation | BiteSites',
  description:
    'Request a free consultation to discuss web development, social media management, or AI automation services.'
}

const nextSteps = [
  {
    title: 'Tell us what you need',
    description: 'Share your business, goals, preferred services, and the best way for us to contact you.',
    icon: ClipboardList
  },
  {
    title: 'We review the scope',
    description: 'We look at the request, identify the right service mix, and prepare practical next steps.',
    icon: MessageSquareMore
  },
  {
    title: 'We follow up to book the conversation',
    description: 'If the fit is right, we reach out and confirm the consultation details with you directly.',
    icon: CalendarClock
  }
]

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,0.96)_45%,_rgba(2,6,23,1)_100%)] py-16">
      <div className="container">
        <div className="space-y-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Consultation</p>
            <h1 className="mt-4 text-4xl font-bold text-slate-50 md:text-5xl">Schedule a free consultation</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Use the intake form to tell us what you are trying to solve. We&apos;ll review the request, recommend the right service direction, and follow up to confirm a conversation.
            </p>
            <div className="mt-8 grid gap-4">
              {nextSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-5">
                    <div className="flex items-center gap-3 text-slate-100">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-semibold">{step.title}</h2>
                    </div>
                    <p className="mt-3 text-base leading-7 text-slate-300">{step.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://calendar.app.google/bKKKvGWBSgvV8rodA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
              >
                Schedule a consultation
                <CalendarClock className="ml-2 h-4 w-4" />
              </a>
              <Link href="/pricing" className="btn-secondary">
                See pricing
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900/70">
                Review services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <SimpleIntakeForm />
          </div>
        </div>
      </div>
    </main>
  )
}
