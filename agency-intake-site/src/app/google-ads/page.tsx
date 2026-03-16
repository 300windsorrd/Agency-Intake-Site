import type { Metadata } from 'next'
import { ArrowRight, BarChart3, Target, Rocket, CheckCircle2, MapPin, RefreshCw, Layers, FileText, Gauge } from 'lucide-react'
import PricingNote from '@/components/PricingNote'

export const metadata: Metadata = {
	title: 'Google Ads Management | Your Agency Name',
	description: 'Drive qualified traffic and measurable ROI. Management fee: 10% of monthly ad spend.',
	openGraph: {
		title: 'Google Ads Management | Your Agency Name',
		description: 'Google Ads management for small businesses focused on measurable ROI.',
		type: 'website'
	}
}

export default function GoogleAdsPage() {
	return (
		<main className="min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Service',
						name: 'Google Ads Management',
						description: 'Google Ads management for small businesses.',
						provider: {
							'@type': 'Organization',
							name: 'Your Agency Name'
						},
						areaServed: 'US',
						serviceType: 'Advertising',
						priceSpecification: {
							'@type': 'PriceSpecification',
							priceCurrency: 'USD',
							description: 'percentage: 10%'
						}
					})
				}}
			/>

			<section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="mb-4 text-4xl font-bold text-slate-50 md:text-5xl">
							Google Ads Management for Small Businesses
						</h1>
						<p className="mb-8 text-xl text-slate-300">
							Drive qualified traffic and measurable ROI with expert campaign strategy, setup, and ongoing optimization.
						</p>
						<div className="flex flex-col gap-3 motion-reduce:transition-none sm:flex-row">
							<a href="/start" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-primary/90">
								Start a Project
								<ArrowRight className="ml-2 h-5 w-5" />
							</a>
							<a href="/pricing" className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/70 px-6 py-3 font-semibold text-slate-100 transition-all duration-200 hover:border-slate-500 hover:bg-slate-900/80">
								View Pricing
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-transparent py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-10 text-3xl font-bold text-slate-50">What We Do</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{ icon: Target, label: 'Account setup and structure' },
							{ icon: BarChart3, label: 'Conversion tracking' },
							{ icon: Layers, label: 'Keyword and RSA ad creation' },
							{ icon: FileText, label: 'Ad assets (sitelinks/callouts)' },
							{ icon: CheckCircle2, label: 'Negative keywords' },
							{ icon: Rocket, label: 'Landing-page alignment' },
							{ icon: MapPin, label: 'Geo and schedule controls' },
							{ icon: Gauge, label: 'Performance Max' },
							{ icon: RefreshCw, label: 'Remarketing' },
							{ icon: BarChart3, label: 'Budgets and pacing' },
							{ icon: FileText, label: 'Reporting' }
						].map((item, i) => (
							<div
								key={i}
								className="group rounded-xl border border-slate-800 bg-slate-950/65 p-5 transition-[transform,opacity] duration-200 will-change-transform hover:border-slate-700 hover:shadow-md motion-reduce:transition-none"
								style={{ transitionDuration: '200ms' }}
							>
								<item.icon className="mb-3 h-6 w-6 text-primary opacity-90 group-hover:opacity-100 motion-reduce:opacity-100" />
								<div className="font-medium text-slate-100">{item.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-slate-950/40 py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-6 text-3xl font-bold text-slate-50">Our Best-Practice Playbook</h2>
					<p className="max-w-3xl text-slate-300">
						We implement Google-recommended practices: conversion tracking (Ads, GA4, GTM), themed ad groups with relevant ad copy, Quality Score fundamentals, responsive search ads with multiple headlines and descriptions, ad assets for richer SERP coverage, Performance Max with audience signals and sufficient ramp time, and Smart Bidding options such as tCPA or tROAS where appropriate.
					</p>
				</div>
			</section>

			<section className="bg-transparent py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-10 text-3xl font-bold text-slate-50">How We Work</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
						{[
							{ step: 'Audit', desc: 'Review current account, site, and goals' },
							{ step: 'Build', desc: 'Structure campaigns, ad groups, and assets' },
							{ step: 'Launch', desc: 'Deploy with proper tracking and QA' },
							{ step: 'Optimize', desc: 'Iterate on bids, queries, and creative' }
						].map((s, i) => (
							<div key={i} className="rounded-xl border border-slate-800 bg-slate-950/65 p-5">
								<div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
								<div className="text-xl font-semibold text-slate-100">{s.step}</div>
								<p className="mt-2 text-slate-300">{s.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="pricing" className="bg-slate-950/40 py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-3xl font-bold text-slate-50">Pricing</h2>
					<div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm">
						<div className="text-xl font-semibold text-slate-100">Management fee: 10% of monthly ad spend.</div>
						<PricingNote />
						<div className="mt-6">
							<a href="/start" className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90">
								Start a Project
								<ArrowRight className="ml-2 h-5 w-5" />
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-transparent py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-3xl font-bold text-slate-50">FAQ</h2>
					<div className="space-y-6">
						<div>
							<div className="font-semibold text-slate-100">What is the contract term?</div>
							<p className="text-slate-300">Month-to-month. Cancel anytime.</p>
						</div>
						<div>
							<div className="font-semibold text-slate-100">What budgets do you recommend?</div>
							<p className="text-slate-300">We typically recommend starting from $1,000-$3,000/month depending on market and goals.</p>
						</div>
						<div>
							<div className="font-semibold text-slate-100">How often do you report?</div>
							<p className="text-slate-300">We provide monthly reporting and check-ins, with on-demand updates available.</p>
						</div>
					</div>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<a href="/start" className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90">Start a Project</a>
						<a href="mailto:hello@youragency.com" className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-950/70 px-6 py-3 font-semibold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900/80">Email Us</a>
					</div>
				</div>
			</section>
		</main>
	)
}
