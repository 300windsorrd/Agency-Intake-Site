import { Metadata } from 'next'
import SimpleIntakeForm from '@/components/SimpleIntakeForm'

export const metadata: Metadata = {
	title: 'Start a Project | Your Agency Name',
	description: 'Use our shared project intake form to request web development, social media management, or AI automation services.'
}

export default function StartPage() {
	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] py-14 lg:py-16">
			<div className="container">
				<div className="mb-10 max-w-3xl">
					<p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Get Started</p>
					<h1 className="text-[2.35rem] font-bold text-slate-50 md:text-[3rem]">Start Your Project</h1>
					<p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-300 lg:text-[1.05rem]">
						Use one form for web development, social media management, or AI automation. Share the basics, pick your services, and tell us whether to reply by email or phone.
					</p>
				</div>
				<SimpleIntakeForm />
			</div>
		</div>
	)
}
