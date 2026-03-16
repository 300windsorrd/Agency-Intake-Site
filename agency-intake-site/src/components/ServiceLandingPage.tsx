import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Factory,
  Megaphone,
  Sparkles,
  Store,
  Workflow
} from 'lucide-react'
import type { ServiceAudience, ServiceDefinition } from '@/content/services'

const serviceIcons: Record<ServiceDefinition['slug'], LucideIcon> = {
  'web-development': Code2,
  'social-media-management': Megaphone,
  'ai-automation': Bot
}

const accentClasses: Record<ServiceDefinition['slug'], string> = {
  'web-development': 'from-sky-500/25 via-cyan-500/10 to-slate-950',
  'social-media-management': 'from-fuchsia-500/20 via-rose-500/10 to-slate-950',
  'ai-automation': 'from-emerald-500/20 via-teal-500/10 to-slate-950'
}

const audienceIcons: Record<ServiceAudience['segment'], LucideIcon> = {
  'Small businesses': Store,
  'Medium businesses': Building2,
  'Large businesses': Factory
}

interface ServiceLandingPageProps {
  service: ServiceDefinition
}

export default function ServiceLandingPage({ service }: ServiceLandingPageProps) {
  const Icon = serviceIcons[service.slug]
  const heroAccent = accentClasses[service.slug]

  return (
    <main className="min-h-screen bg-transparent">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroAccent}`} aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-950/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-100">
                  <Icon className="h-4 w-4" />
                </span>
                Services
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{service.heroDescription}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/consultation" className="btn-primary">
                  Schedule a free consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/pricing" className="btn-secondary">
                  See pricing
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/75 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.95)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">What this service entails</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{service.intro}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-100">
                    <Workflow className="h-4 w-4 text-sky-300" />
                    Scope
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{service.includes.length} delivery areas included in a typical engagement.</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-100">
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                    Outcomes
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{service.outcomes.length} business outcomes that the work is designed to improve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Scope</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-50 md:text-4xl">What&apos;s included</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Every engagement is scoped to the client, but these are the delivery areas we typically cover.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {service.includes.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-800 bg-slate-950/75 p-6 shadow-[0_20px_50px_-40px_rgba(15,23,42,1)]">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <p className="mt-4 text-base leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/40 py-16">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Business Fit</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-50 md:text-4xl">Who benefits from this service</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The same core service can solve different problems depending on the size of the business and the complexity of the workflow.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {service.audience.map((segment) => {
              const AudienceIcon = audienceIcons[segment.segment]
              return (
                <div key={segment.segment} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-100">
                    <AudienceIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-slate-50">{segment.segment}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{segment.description}</p>
                  <ul className="mt-5 space-y-3">
                    {segment.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-sky-300" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Results</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-50 md:text-4xl">Outcomes clients can expect</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                We scope the work around business results, not just deliverables. These are the improvements the engagement is designed to create.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
                  <p className="text-base leading-7 text-slate-200">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,_rgba(15,23,42,0.95)_0%,_rgba(2,6,23,0.98)_100%)] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Delivery</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-50">How we typically deliver {service.title.toLowerCase()}</h2>
              </div>
              <ol className="grid gap-4 md:grid-cols-2">
                {service.process.map((step, index) => (
                  <li key={step} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
                    <p className="mt-3 text-base leading-7 text-slate-200">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 text-center shadow-[0_28px_80px_-50px_rgba(15,23,42,1)] md:p-12">
            <h2 className="text-3xl font-bold text-slate-50 md:text-4xl">Want to talk through scope, fit, or timing?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              We can review your goals, recommend the right service mix, and point you to the pricing tier that matches the work.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/consultation" className="btn-primary">
                Schedule a free consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
