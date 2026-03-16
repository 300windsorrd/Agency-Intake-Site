import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bot, Code2, Megaphone } from 'lucide-react'
import { serviceCatalog } from '@/content/services'

export const metadata: Metadata = {
  title: 'Services | BiteSites',
  description:
    'Explore web development, social media management, and AI automation services built for small, medium, and large businesses.'
}

const serviceIcons = {
  'web-development': Code2,
  'social-media-management': Megaphone,
  'ai-automation': Bot
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_85%_10%,_rgba(16,185,129,0.14),_transparent_25%),linear-gradient(180deg,_rgba(15,23,42,0.25),_rgba(2,6,23,0.9))]" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Services</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">Digital services built around growth, not filler.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              We help businesses improve how they show up online, how they communicate, and how work moves behind the scenes. Choose a focused service or combine them into one engagement.
            </p>
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
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {serviceCatalog.map((service) => {
              const Icon = serviceIcons[service.slug]
              return (
                <article key={service.slug} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/75 p-7 shadow-[0_24px_60px_-45px_rgba(15,23,42,1)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-slate-50">{service.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-300">{service.summary}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {service.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-8 inline-flex items-center text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                  >
                    Explore {service.navLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/40 py-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold text-slate-50">Small businesses</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Build credibility quickly, simplify lead capture, and stop losing time to inconsistent marketing or manual follow-up.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold text-slate-50">Medium businesses</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Support growth with better structure across campaigns, service lines, content operations, and internal workflows.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold text-slate-50">Large businesses</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Coordinate more stakeholders, stronger standards, and more complex processes without sacrificing clarity or speed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
