'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone, Sparkles } from 'lucide-react'
import { simpleIntakeSchema, type SimpleIntake } from '@/lib/simple-intake.schema'
import { submitSimpleIntake } from '@/lib/webhooks'
import { useBackground } from '@/contexts/BackgroundContext'

const businessSizeOptions = [
	{ value: 'solo', label: 'Solo / Freelancer' },
	{ value: 'small', label: '2-10 employees' },
	{ value: 'growing', label: '11-50 employees' },
	{ value: 'established', label: '51-200 employees' },
	{ value: 'enterprise', label: '200+ employees' }
] as const

const serviceOptions = [
	{
		value: 'web_development',
		label: 'Web Development',
		description: 'Custom sites, landing pages, and performance improvements.'
	},
	{
		value: 'social_media_management',
		label: 'Social Media Management',
		description: 'Content planning, posting cadence, and audience growth.'
	},
	{
		value: 'ai_automation',
		label: 'AI Automation',
		description: 'Workflow automation, lead routing, and ops efficiency.'
	}
] as const

export default function SimpleIntakeForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const tokenRef = useRef<string>('')
	const { getButtonColor, getButtonTextColor } = useBackground()
	const buttonColor = getButtonColor()
	const buttonTextColor = getButtonTextColor()

	const defaultValues = useMemo<SimpleIntake>(() => ({
		name: '',
		email: '',
		phone: '',
		businessSize: 'small',
		services: ['web_development'],
		projectDetails: '',
		preferredContactMethod: 'email'
	}), [])

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		trigger,
		reset
	} = useForm<SimpleIntake>({
		resolver: zodResolver(simpleIntakeSchema),
		mode: 'onChange',
		defaultValues
	})

	const preferredContactMethod = watch('preferredContactMethod')
	const selectedServices = watch('services') || []

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return
		if (document.querySelector('script[src*="turnstile/v0/api.js"]')) return
		const script = document.createElement('script')
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
		script.async = true
		script.defer = true
		document.head.appendChild(script)
	}, [])

	useEffect(() => {
		trigger('phone')
	}, [preferredContactMethod, trigger])

	const onSubmit = async (data: SimpleIntake) => {
		setIsSubmitting(true)
		setMessage(null)
		let token = tokenRef.current

		if (!token && process.env.NODE_ENV !== 'production') token = 'placeholder-token'
		if (!token && typeof window !== 'undefined' && (window as any).turnstile) {
			await new Promise<void>((resolve) => {
				const container = document.getElementById('turnstile-container')
				if (!container) return resolve()
				;(window as any).turnstile.render('#turnstile-container', {
					sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
					callback: (issuedToken: string) => {
						tokenRef.current = issuedToken
						resolve()
					}
				})
			})
			token = tokenRef.current
		}

		if (!token) {
			setIsSubmitting(false)
			setMessage('Please complete the captcha to continue.')
			return
		}

		const result = await submitSimpleIntake({ ...data, turnstileToken: token }, token)
		if (result.success) {
			setMessage("Thanks. We will reach out with next steps soon.")
			reset(defaultValues)
			tokenRef.current = ''
			return setIsSubmitting(false)
		}

		setMessage(result.error || 'Something went wrong.')
		setIsSubmitting(false)
	}

	const inputClassName =
		'mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-primary/60 focus:ring-4 focus:ring-primary/20'

	return (
		<div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
			<form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.9)] sm:p-8">
				<div className="mb-8 flex items-start justify-between gap-6">
					<div>
						<p className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
							<Sparkles className="h-3.5 w-3.5" />
							Start Your Project
						</p>
						<h2 className="text-3xl font-bold text-slate-50">Tell us what you need.</h2>
						<p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
							Keep it short. We only ask for the details needed to route your project and follow up the way you prefer.
						</p>
					</div>
					<div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 sm:block">
						Email is required
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div>
						<label className="block text-sm font-medium text-slate-200">Name</label>
						<input
							{...register('name')}
							className={inputClassName}
							placeholder="Jane Doe"
						/>
						{errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-200">Email</label>
						<input
							{...register('email')}
							type="email"
							className={inputClassName}
							placeholder="jane@company.com"
						/>
						{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
					</div>
				</div>

				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<div>
						<label className="block text-sm font-medium text-slate-200">Phone</label>
						<input
							{...register('phone')}
							type="tel"
							className={inputClassName}
							placeholder="(555) 123-4567"
						/>
						<p className="mt-2 text-xs text-slate-400">
							Optional unless you want us to contact you by phone.
						</p>
						{errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-200">Business size</label>
						<select {...register('businessSize')} className={inputClassName}>
							{businessSizeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						{errors.businessSize && <p className="mt-2 text-sm text-red-600">{errors.businessSize.message}</p>}
					</div>
				</div>

				<div className="mt-8">
					<div className="mb-3 flex items-center justify-between gap-3">
						<label className="block text-sm font-medium text-slate-200">Services</label>
						<span className="text-xs uppercase tracking-[0.18em] text-slate-500">Select all that apply</span>
					</div>
					<div className="grid gap-3 md:grid-cols-3">
						{serviceOptions.map((option) => {
							const active = selectedServices.includes(option.value)
							return (
								<label
									key={option.value}
									className={`group relative flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
										active
											? 'border-primary/60 bg-slate-900 text-white shadow-lg'
											: 'border-slate-800 bg-slate-900/60 text-slate-100 hover:border-slate-600 hover:bg-slate-900'
									}`}
								>
									<input
										{...register('services')}
										type="checkbox"
										value={option.value}
										className="sr-only"
									/>
									<span className="text-sm font-semibold">{option.label}</span>
									<span className={`mt-2 text-sm leading-6 ${active ? 'text-slate-200' : 'text-slate-300'}`}>
										{option.description}
									</span>
									<span className={`mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] ${
										active ? 'text-emerald-300' : 'text-slate-500'
									}`}>
										{active ? 'Selected' : 'Available'}
									</span>
								</label>
							)
						})}
					</div>
					{errors.services && <p className="mt-2 text-sm text-red-600">{errors.services.message}</p>}
				</div>

				<div className="mt-8">
					<label className="block text-sm font-medium text-slate-200">Preferred contact method</label>
					<div className="mt-3 grid gap-3 sm:grid-cols-2">
						<label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition ${
							preferredContactMethod === 'email'
								? 'border-primary/60 bg-slate-900 text-white'
								: 'border-slate-800 bg-slate-900/60 text-slate-100 hover:border-slate-600 hover:bg-slate-900'
						}`}>
							<input
								{...register('preferredContactMethod')}
								type="radio"
								value="email"
								className="sr-only"
							/>
							<Mail className="h-5 w-5" />
							<div>
								<p className="font-semibold">Email</p>
								<p className={`text-sm ${preferredContactMethod === 'email' ? 'text-slate-200' : 'text-slate-400'}`}>
									Best for proposals and written next steps.
								</p>
							</div>
						</label>
						<label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 transition ${
							preferredContactMethod === 'phone'
								? 'border-primary/60 bg-slate-900 text-white'
								: 'border-slate-800 bg-slate-900/60 text-slate-100 hover:border-slate-600 hover:bg-slate-900'
						}`}>
							<input
								{...register('preferredContactMethod')}
								type="radio"
								value="phone"
								className="sr-only"
							/>
							<Phone className="h-5 w-5" />
							<div>
								<p className="font-semibold">Phone</p>
								<p className={`text-sm ${preferredContactMethod === 'phone' ? 'text-slate-200' : 'text-slate-400'}`}>
									Best for quick scoping calls and follow-up.
								</p>
							</div>
						</label>
					</div>
				</div>

				<div className="mt-8">
					<label className="block text-sm font-medium text-slate-200">Project details</label>
					<textarea
						{...register('projectDetails')}
						rows={5}
						className={`${inputClassName} resize-y`}
						placeholder="Share the goal, timeline, current bottleneck, or anything else that helps us qualify the lead quickly."
					/>
					{errors.projectDetails && <p className="mt-2 text-sm text-red-600">{errors.projectDetails.message}</p>}
				</div>

				<div id="turnstile-container" className="hidden" />

				<motion.button
					type="submit"
					disabled={!isValid || isSubmitting}
					className="mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-bold shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
					style={{
						backgroundColor: buttonColor,
						color: buttonTextColor
					}}
					whileHover={{ scale: 1.01, filter: 'brightness(1.05)' }}
					whileTap={{ scale: 0.99 }}
					initial={{ opacity: 0.96 }}
					animate={{
						opacity: 1,
						boxShadow: `0 20px 45px -20px ${buttonColor}`
					}}
				>
					{isSubmitting ? (
						<span className="flex items-center gap-2">
							<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Sending request...
						</span>
					) : 'Start Your Project'}
				</motion.button>

				<p className="mt-4 text-xs text-slate-400">
					By submitting, you agree to be contacted about your inquiry using your preferred method.
				</p>
				{message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
			</form>

			<aside className="rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_rgba(2,6,23,0.96)_48%)] p-6 shadow-[0_25px_70px_-45px_rgba(2,6,23,0.9)] sm:p-8">
				<div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">What happens next</p>
					<ul className="mt-6 space-y-4">
						{[
							'We review the services you selected and match the request to the right workflow.',
							'Project details help us qualify urgency, budget fit, and whether web, social, or automation should lead.',
							'You hear from us by email or phone based on your preference in the form.'
						].map((item) => (
							<li key={item} className="flex items-start gap-3 text-slate-300">
								<CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-500" />
								<span className="leading-7">{item}</span>
							</li>
						))}
					</ul>
				</div>

			</aside>
		</div>
	)
}
