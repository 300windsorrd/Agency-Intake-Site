import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

interface StartProjectCTAProps {
	title?: string
	description?: string
	buttonLabel?: string
	className?: string
}

const highlights = [
	'One shared lead form across the site',
	'Service checklist for faster qualification',
	'Preferred contact method built in'
]

export default function StartProjectCTA({
	title = 'Ready to start your project?',
	description = 'Use our single intake form to tell us what you need, choose services, and let us know how you want to be contacted.',
	buttonLabel = 'Start Your Project',
	className = ''
}: StartProjectCTAProps) {
	return (
		<section className={`py-20 ${className}`}>
			<div className="container mx-auto px-4">
				<div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,_rgba(15,23,42,0.96)_0%,_rgba(2,6,23,0.98)_48%,_rgba(15,23,42,0.96)_100%)] shadow-[0_35px_90px_-55px_rgba(2,6,23,0.9)]">
					<div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Get Started</p>
							<h2 className="mt-4 text-4xl font-bold text-slate-50">{title}</h2>
							<p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Link
									href="/start"
									className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
								>
									{buttonLabel}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
								<Link
									href="/pricing"
									className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 px-6 py-4 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900/80"
								>
									View Pricing
								</Link>
							</div>
						</div>
						<div className="rounded-[1.5rem] border border-slate-700/60 bg-slate-900/40 p-6 backdrop-blur">
							<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Included in the form</p>
							<ul className="mt-6 space-y-4">
								{highlights.map((item) => (
									<li key={item} className="flex items-start gap-3 text-slate-200">
										<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
											<Check className="h-4 w-4" />
										</span>
										<span className="leading-7">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
