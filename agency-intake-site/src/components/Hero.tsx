'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import BackgroundSlider from './BackgroundSlider'
import { useBackground } from '@/contexts/BackgroundContext'
import TextType from '@/TextAnimations/TextType/TextType.jsx'
import TextCleaningStyles from './TextCleaningStyles'
import { cleanText, validateCleanText } from '@/lib/textUtils'
import { useTextMonitor } from '@/hooks/useTextMonitor'

// Lazy-load heavy animated backgrounds to reduce initial JS and improve LCP
const Orb = dynamic(() => import('@/Backgrounds/Orb/Orb.jsx'), { ssr: false })
const Prism = dynamic(() => import('@/Backgrounds/Prism/Prism.jsx'), { ssr: false })
const DarkVeil = dynamic(() => import('@/Backgrounds/DarkVeil/DarkVeil.jsx'), { ssr: false })

export default function Hero() {
  const { setCurrentBackground, getButtonColor, getButtonTextColor } = useBackground()
  const textRef = useRef<HTMLSpanElement>(null)

  type BackgroundTextColors = {
    primary: string
    secondary: string
    accent: string
    slider?: string
  }

  type BackgroundItem = {
    key: string
    label: string
    word: string
    Component: any
    props: Record<string, any>
    textColors: BackgroundTextColors
  }

  const backgrounds: ReadonlyArray<BackgroundItem> = [
    {
      key: 'orb',
      label: 'Orb',
      word: 'Fantastic',
      Component: Orb,
      props: {},
      textColors: {
        primary: 'text-slate-50',
        secondary: 'text-slate-200',
        accent: 'text-cyan-300'
      }
    },
    {
      key: 'prism',
      label: 'Prism',
      word: 'Prismatic',
      Component: Prism,
      props: {
        animationType: 'rotate',
        timeScale: 0.4,
        scale: 3.9,
        height: 3.5,
        baseWidth: 5.5,
        noise: 0,
        glow: 1,
        hueShift: 0,
        colorFrequency: 1,
      },
      textColors: {
        primary: 'text-slate-50',
        secondary: 'text-slate-200',
        accent: 'text-cyan-300',
        slider: 'text-slate-200'
      }
    },
    {
      key: 'darkveil',
      label: 'Dark Veil',
      word: 'Elegant',
      Component: DarkVeil,
      props: {
        hueShift: 0,
        noiseIntensity: 0.1,
        scanlineIntensity: 0.08,
        speed: 0.6,
        scanlineFrequency: 0.0,
        warpAmount: 0.02,
      },
      textColors: {
        primary: 'text-white',
        secondary: 'text-slate-200',
        accent: 'text-indigo-300',
        slider: 'text-slate-200'
      }
    },
  ]
  const [bgIndex, setBgIndex] = useState(backgrounds.length - 1)
  const SelectedBg = backgrounds[bgIndex].Component

  // Use the text monitoring hook to prevent periods
  useTextMonitor([bgIndex], textRef)

  // Validate background words for periods
  useEffect(() => {
    const currentWord = backgrounds[bgIndex]?.word
    if (currentWord) {
      validateCleanText(currentWord, 'background word')
    }
  }, [bgIndex])

  // Update background context when bgIndex changes
  useEffect(() => {
    setCurrentBackground(backgrounds[bgIndex].key)
  }, [bgIndex, setCurrentBackground])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-24">
      <TextCleaningStyles />

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Defer mounting animated background until idle to improve LCP */}
        <IdleBackground component={SelectedBg} props={backgrounds[bgIndex].props as any} />
      </div>
      <div className="absolute inset-0 z-[1] bg-slate-950/50" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={false} className="mb-7 lg:mb-8">
            <h1 className={`mb-5 text-[2.4rem] font-bold leading-[1.03] sm:text-[3.15rem] lg:text-[3.8rem] ${backgrounds[bgIndex].textColors.primary}`}>
              Transform Your Business:
              <span className={`${backgrounds[bgIndex].textColors.accent} block`} ref={textRef}>
                <TextType
                  key={backgrounds[bgIndex].key}
                  as="span"
                  className="underline font-extrabold"
                  text={cleanText(backgrounds[bgIndex].word)}
                  typingSpeed={60}
                  deletingSpeed={30}
                  pauseDuration={1000}
                  loop={false}
                  showCursor={true}
                  cursorBlinkDuration={0.5}
                  textColors={["currentColor"]}
                  onSentenceComplete={(text) => validateCleanText(text, 'TextType output')}
                />
                Web Design
              </span>
            </h1>
            <p className={`mx-auto max-w-xl text-[0.98rem] leading-7 lg:text-[1.05rem] lg:leading-7 ${backgrounds[bgIndex].textColors.secondary}`}>
              Get a custom website that converts visitors into customers. Modern, responsive designs
              that perfectly represent your brand and drive real business results.
            </p>
          </motion.div>

          <motion.div initial={false} className="mb-10 flex flex-col justify-center gap-3 sm:flex-row lg:mb-12">
            <a
              href="/start"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={({
                backgroundColor: getButtonColor(),
                color: getButtonTextColor(),
                ['--tw-shadow-color' as any]: getButtonColor(),
                ['--tw-shadow' as any]: `0 10px 15px -3px ${getButtonColor()}40, 0 4px 6px -4px ${getButtonColor()}40`
              } as React.CSSProperties)}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-[1.125rem] w-[1.125rem]" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-white/25 hover:bg-slate-900/80"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Background Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-2 lg:mb-4"
          >
            <BackgroundSlider
              value={bgIndex}
              onChange={setBgIndex}
              max={backgrounds.length - 1}
              labels={backgrounds.map(b => b.label)}
              textColors={backgrounds[bgIndex].textColors}
            />
          </motion.div>


        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute left-10 top-20 h-64 w-64 ${backgrounds[bgIndex].textColors.accent}/10 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-16 right-10 h-80 w-80 ${backgrounds[bgIndex].textColors.accent}/10 rounded-full blur-3xl`}></div>
      </div>
    </section>
  )
}

// Small helper to mount heavy animated backgrounds after idle time
function IdleBackground({ component: Component, props }: { component: any; props: any }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      ; (window as any).requestIdleCallback(() => setReady(true), { timeout: 1200 })
    } else {
      const t = setTimeout(() => setReady(true), 600)
      return () => clearTimeout(t)
    }
  }, [])
  if (!ready) return null
  return <Component {...props} />
}
