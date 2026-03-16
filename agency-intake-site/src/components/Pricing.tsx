'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { useBackground } from '@/contexts/BackgroundContext'

const plans = [
  {
    name: 'Starter',
    price: 'Starting at $800',
    description: 'Focused one-page site to launch quickly',
    features: [
      'Custom design (1 page)',
      'Mobile-responsive layout',
      'Basic SEO optimization',
      'Contact form',
      'Social media integration',
      '1 round of revision',
      'Launch support',
      'Basic analytics setup'
    ],
    popular: false,
    color: 'border-slate-800'
  },
  {
    name: 'Basic',
    price: '$1,500',
    description: 'Perfect for small businesses getting started online',
    features: [
      'Custom design (up to 5 pages)',
      'Mobile-responsive layout',
      'Basic SEO optimization',
      'Contact form',
      'Social media integration',
      '2 rounds of revisions',
      'Launch support',
      'Basic analytics setup'
    ],
    popular: false,
    color: 'border-slate-800'
  },
  {
    name: 'Standard',
    price: '$3,000',
    description: 'Ideal for growing businesses with more complex needs',
    features: [
      'Custom design (up to 10 pages)',
      'Mobile-responsive layout',
      'Advanced SEO optimization',
      'Contact form + lead capture',
      'Social media integration',
      'Blog setup',
      'Google Analytics integration',
      '3 rounds of revisions',
      'Priority support',
      'Performance optimization'
    ],
    popular: true,
    color: 'border-primary'
  },
  {
    name: 'Premium',
    price: '$5,000',
    description: 'Comprehensive solution for established businesses',
    features: [
      'Custom design (unlimited pages)',
      'Mobile-responsive layout',
      'Advanced SEO optimization',
      'Advanced forms & integrations',
      'E-commerce functionality',
      'Blog with CMS',
      'Advanced analytics & reporting',
      'Performance optimization',
      'Security hardening',
      'Unlimited revisions',
      'Priority support',
      'Training & documentation'
    ],
    popular: false,
    color: 'border-slate-800'
  }
]

export default function Pricing() {
  const { getButtonColor, getButtonTextColor } = useBackground()

  return (
    <section id="pricing" className="bg-transparent py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-50">
            Transparent Pricing
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Choose the plan that best fits your business needs and budget.
            All plans include custom design, mobile optimization, and ongoing support.
          </p>
          <div className="mt-6">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/70 px-6 py-3 font-semibold text-slate-100 transition-all duration-200 hover:border-slate-500 hover:bg-slate-900/80"
            >
              Why is this valuable?
            </a>
          </div>
        </motion.div>

        {/* Horizontal Free Consultation card (moved above plans) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 mb-12 md:mb-16 max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-xl md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              <h3 className="whitespace-nowrap text-xl font-bold text-slate-50 md:text-2xl">Free Consultation:</h3>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <li className="inline-flex items-center text-slate-300"><Check className="mr-2 h-5 w-5 text-green-400" /> A.I Automation</li>
                <li className="inline-flex items-center text-slate-300"><Check className="mr-2 h-5 w-5 text-green-400" /> Web Development</li>
                <li className="inline-flex items-center text-slate-300"><Check className="mr-2 h-5 w-5 text-green-400" /> Social Media Management</li>
              </ul>
              <a
                href="https://calendar.app.google/bKKKvGWBSgvV8rodA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
                style={({
                  backgroundColor: getButtonColor(),
                  color: getButtonTextColor(),
                  ['--tw-shadow-color' as any]: getButtonColor(),
                  ['--tw-shadow' as any]: `0 4px 6px -1px ${getButtonColor()}40, 0 2px 4px -1px ${getButtonColor()}40`
                } as React.CSSProperties)}
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 p-8 ${plan.color} ${plan.popular
                  ? 'scale-105 bg-primary/10 shadow-xl'
                  : 'bg-slate-950/80 shadow-lg hover:shadow-xl'
                } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center whitespace-nowrap"
                    style={{ backgroundColor: getButtonColor() }}>
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="mb-2 text-2xl font-bold text-slate-50">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-50">{plan.price}</span>
                  <span className="text-slate-400">/project</span>
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <a
                  href="/start"
                  className="inline-block w-full py-3 px-6 rounded-lg font-semibold transition-colors"
                  style={({
                    backgroundColor: getButtonColor(),
                    color: getButtonTextColor(),
                    ['--tw-shadow-color' as any]: getButtonColor(),
                    ['--tw-shadow' as any]: `0 4px 6px -1px ${getButtonColor()}40, 0 2px 4px -1px ${getButtonColor()}40`
                  } as React.CSSProperties)}
                >
                  Start Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-950/80 p-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-50">
              Need Something Custom?
            </h3>
            <p className="mb-6 text-lg text-slate-300">
              Every business is unique. If you need a custom solution that doesn't fit our standard plans,
              let's discuss your specific requirements and create a tailored proposal.
            </p>
            <a
              href="https://calendar.app.google/wt5eP9xbkrrAVoYU7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 text-white font-semibold rounded-lg transition-colors"
              style={({
                backgroundColor: getButtonColor(),
                color: getButtonTextColor(),
                ['--tw-shadow-color' as any]: getButtonColor(),
                ['--tw-shadow' as any]: `0 4px 6px -1px ${getButtonColor()}40, 0 2px 4px -1px ${getButtonColor()}40`
              } as React.CSSProperties)}
            >
              Discuss Custom Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
