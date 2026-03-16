'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useBackground } from '@/contexts/BackgroundContext'
import GradientText from '@/TextAnimations/GradientText/GradientText'
import '@/TextAnimations/GradientText/GradientText.css'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

interface BackgroundSliderProps {
  value: number
  onChange: (value: number) => void
  max: number
  labels: string[]
  textColors: {
    primary: string
    secondary: string
    accent: string
    slider?: string
  }
}

export default function BackgroundSlider({
  value,
  onChange,
  max,
  labels,
  textColors: _textColors
}: BackgroundSliderProps) {
  const { getButtonColor, getButtonTextColor } = useBackground()

  const buttonColor = getButtonColor()
  const buttonTextColor = getButtonTextColor()

  const clampedValue = useMemo(() => {
    const upper = Math.max(0, Math.min(max, value))
    return upper
  }, [value, max])

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(2,6,23,0.78)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Decorative background glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${buttonColor}, transparent 70%)`
          }}
        />

        <div className="relative px-5 py-6 sm:px-8 sm:py-8">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div className={`${fredoka.className} mb-2 text-2xl font-extrabold sm:text-3xl`}>
              <GradientText animationSpeed={6}>Customize Background</GradientText>
            </div>
            <p className="max-w-md text-sm font-medium text-slate-400 sm:text-base">
              Choose the perfect atmosphere
            </p>
          </div>

          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            {labels.map((label, index) => {
              const isActive = index === clampedValue
              return (
                <motion.button
                  key={index}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onChange(index)}
                  className="relative min-h-12 w-full overflow-hidden rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all duration-300 sm:w-auto sm:min-w-[180px]"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(255,255,255,0.04)'
                      : 'transparent',
                    color: '#e2e8f0'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Background Fill with Gradient */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 opacity-100"
                      style={{ backgroundColor: buttonColor }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Border for inactive items */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl border border-white/0 transition-colors group-hover:border-white/10" />
                  )}

                  <span
                    className="relative z-10 flex items-center justify-center gap-2"
                    style={{ color: isActive ? buttonTextColor : 'inherit' }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-current"
                      />
                    )}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
