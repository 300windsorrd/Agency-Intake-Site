'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Smartphone, Zap, Target, Users, Shield } from 'lucide-react'
import MagicBento from '@/components/MagicBento/MagicBento.jsx'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack.jsx'
import ChromaGrid from '@/components/ChromaGrid/ChromaGrid.jsx'
import LayoutPicker from '@/components/LayoutPicker'

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every website is uniquely designed to match your brand identity and business goals. No templates, no cookie-cutter solutions.',
    color: 'text-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Responsive design that looks and works perfectly on all devices, from smartphones to desktop computers.',
    color: 'text-green-600'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and performance, ensuring your visitors have the best possible experience.',
    color: 'text-yellow-600'
  },
  {
    icon: Target,
    title: 'Conversion Focused',
    description: 'Designed with your business goals in mind, optimized to convert visitors into customers.',
    color: 'text-red-600'
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Intuitive navigation and user-friendly interfaces that keep visitors engaged and coming back.',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'SEO Optimized',
    description: 'Built with search engine optimization in mind, helping your website rank higher in search results.',
    color: 'text-indigo-600'
  }
]

export default function Features() {
  const [layout, setLayout] = useState<'grid' | 'magic-bento' | 'scroll-stack' | 'chroma-grid'>('magic-bento')

  const palette = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  const bentoItems = useMemo(
    () =>
      features.map((f, i) => ({
        color: '#081120',
        title: f.title,
        description: f.description,
        label: 'Feature',
        icon: f.icon,
        iconColor: f.color
      })),
    []
  )

  const chromaItems = useMemo(
    () =>
      features.map((f, i) => ({
        icon: f.icon,
        iconColor: f.color,
        title: f.title,
        subtitle: f.description,
        handle: '',
        borderColor: palette[i % palette.length],
        gradient: `linear-gradient(165deg, ${palette[i % palette.length]}, #000)`,
        url: '/start'
      })),
    []
  )

  return (
    <section className="bg-transparent py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center lg:mb-9"
        >
          <h2 className="mb-4 text-[1.95rem] font-bold text-slate-50 sm:text-[2.45rem]">
            Why Choose Our Web Design Services?
          </h2>
          <p className="mx-auto max-w-2xl text-[0.98rem] leading-7 text-slate-300 lg:text-[1.05rem]">
            We combine creativity with technical expertise to deliver websites that not only look great 
            but also drive real business results.
          </p>
        </motion.div>

        <div className="mb-8 flex items-center justify-center">
          <label htmlFor="features-layout" className="sr-only">Layout</label>
          <select
            id="features-layout"
            className="sr-only"
            value={layout}
            onChange={(e) => setLayout(e.target.value as any)}
          >
            <option value="grid">Grid</option>
            <option value="magic-bento">Magic Bento</option>
            <option value="scroll-stack">Scroll Stack</option>
            <option value="chroma-grid">Chroma Grid</option>
          </select>
          <LayoutPicker current={layout} onPick={(l) => setLayout(l as any)} />
        </div>

        {layout === 'grid' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group transform rounded-xl border border-slate-800 bg-slate-950/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-lg"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 transition-colors group-hover:bg-primary/10`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-100">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {layout === 'magic-bento' && (
          <div className="mt-6">
            <MagicBento
              items={bentoItems}
              enableStars={false}
              enableTilt={false}
              enableMagnetism={false}
              enableSpotlight
              enableBorderGlow
              textAutoHide={false}
              spotlightRadius={360}
            />
          </div>
        )}

        {layout === 'scroll-stack' && (
          <div className="mt-6">
            <ScrollStack onStackComplete={() => {}}>
              {features.map((f, i) => (
                <ScrollStackItem key={i}>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900">
                      <f.icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <div className="mb-2 text-xl font-semibold text-slate-100">{f.title}</div>
                    <p className="leading-relaxed text-slate-300">{f.description}</p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        )}

        {layout === 'chroma-grid' && (
          <div className="mt-6">
            <ChromaGrid items={chromaItems} columns={3} rows={2} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center lg:mt-16"
        >
          <div className="rounded-2xl border border-cyan-500/20 bg-[linear-gradient(135deg,_rgba(6,182,212,0.16),_rgba(15,23,42,0.96),_rgba(37,99,235,0.22))] p-6 text-slate-50 sm:p-7">
            <h3 className="mb-4 text-lg font-bold sm:text-[1.7rem]">
              Ready to Transform Your Online Presence?
            </h3>
            <p className="mb-6 text-[0.98rem] leading-7 text-slate-200">
              Let's discuss your project and create something amazing together.
            </p>
            <a
              href="/start"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
