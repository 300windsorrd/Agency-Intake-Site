'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useBackground } from '@/contexts/BackgroundContext'
import GradientText from '@/TextAnimations/GradientText/GradientText'
import '@/TextAnimations/GradientText/GradientText.css'
import { Fredoka } from 'next/font/google'
import { Grid, LayoutTemplate, Layers, Palette, Check } from 'lucide-react'

const fredoka = Fredoka({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-fredoka',
	display: 'swap',
})

export type FeaturesLayout = 'grid' | 'magic-bento' | 'scroll-stack' | 'chroma-grid'

interface LayoutPickerProps {
	current: FeaturesLayout
	onPick: (layout: FeaturesLayout) => void
}

export default function LayoutPicker({ current, onPick }: LayoutPickerProps) {
	const { getButtonColor, getButtonTextColor } = useBackground()
	const [expanded, setExpanded] = useState(false)
	const collapseTimerRef = useRef<number | null>(null)

	useEffect(() => () => {
		if (collapseTimerRef.current) window.clearTimeout(collapseTimerRef.current)
	}, [])

	const buttonColor = getButtonColor()
	const buttonTextColor = getButtonTextColor()

	const options: ReadonlyArray<{ value: FeaturesLayout; label: string; Icon: any; description: string }> = useMemo(
		() => [
			{ value: 'grid', label: 'Grid', Icon: Grid, description: 'Classic clean structure' },
			{ value: 'magic-bento', label: 'Magic Bento', Icon: LayoutTemplate, description: 'Dynamic asymmetrical' },
			{ value: 'scroll-stack', label: 'Scroll Stack', Icon: Layers, description: 'Vertical storytelling' },
			{ value: 'chroma-grid', label: 'Chroma Grid', Icon: Palette, description: 'Colorful & bold' },
		],
		[]
	)

	const handlePick = (value: FeaturesLayout) => {
		onPick(value)
		if (collapseTimerRef.current) window.clearTimeout(collapseTimerRef.current)
		// Auto collapse after selection
		collapseTimerRef.current = window.setTimeout(() => setExpanded(false), 800) as unknown as number
	}

	return (
		<LayoutGroup id="layout-picker">
			<div className="w-full flex items-center justify-center p-4">
				<AnimatePresence initial={false} mode="wait">
					{!expanded ? (
						<motion.button
							key="lp-min"
							layoutId="lp-container"
							onClick={() => setExpanded(true)}
							className="relative group px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all overflow-hidden"
							style={{
								backgroundColor: buttonColor,
								color: buttonTextColor
							}}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{/* Shine effect */}
							<motion.div
								className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
								initial={{ x: '-100%' }}
								animate={{ x: '100%' }}
								transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.5, ease: "easeInOut" }}
							/>

							<div className={`${fredoka.className} relative z-10 flex items-center gap-3 text-lg font-bold`}>
								<LayoutTemplate className="w-5 h-5" />
								<span>Customize Layout</span>
							</div>
						</motion.button>
					) : (
						<motion.div
							key="lp-exp"
							layoutId="lp-container"
							className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
							style={{
								backgroundColor: 'rgba(2,6,23,0.82)',
							}}
						>
							{/* Close button zone (click outside logic is usually handled by parent overlays, but here we just have a close button for clarity) */}
							<button
								onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
								className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-slate-800/80"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
							</button>

							<div className="flex flex-col items-center justify-center mb-8">
								<h3 className={`${fredoka.className} text-2xl sm:text-3xl font-extrabold mb-2 text-center`}>
									<GradientText animationSpeed={6}>Choose Your Layout</GradientText>
								</h3>
								<p className="text-sm font-medium text-slate-400 sm:text-base">
									Select how your content is presented
								</p>
							</div>

							<div key={current} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								{options.map((opt) => {
									const isActive = opt.value === current
									const Icon = opt.Icon
									return (
										<motion.button
											key={opt.value}
											onClick={() => handlePick(opt.value)}
											className={`relative group flex flex-col items-center rounded-2xl border-2 p-4 transition-all duration-300 ${isActive ? 'border-transparent shadow-lg' : 'border-transparent hover:border-slate-700 hover:bg-slate-900/80'}`}
											style={isActive ? { backgroundColor: 'rgba(15,23,42,0.96)' } : {}}
											whileHover={{ y: -4 }}
											whileTap={{ scale: 0.98 }}
										>
											{isActive && (
												<motion.div
													className="absolute inset-0 rounded-2xl border-2"
													style={{ borderColor: buttonColor }}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ duration: 0.2 }}
												/>
											)}

											<div
												className={`mb-3 rounded-full p-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`}
												style={isActive ? { backgroundColor: buttonColor } : { backgroundColor: 'rgba(255,255,255,0.06)' }}
											>
												<Icon className="w-6 h-6" />
											</div>

											<span className="mb-1 text-base font-bold text-slate-100">
												{opt.label}
											</span>
											<span className="text-center text-xs text-slate-400">
												{opt.description}
											</span>

											{isActive && (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className="absolute top-3 right-3 text-white bg-green-500 rounded-full p-0.5"
												>
													<Check className="w-3 h-3" />
												</motion.div>
											)}
										</motion.button>
									)
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</LayoutGroup>
	)
}


