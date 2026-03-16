import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import LazyVisible from '@/components/LazyVisible'
import StartProjectCTA from '@/components/StartProjectCTA'

export const metadata: Metadata = {
  title: 'Professional Web Design Services - Transform Your Business',
  description: 'Get a custom website that converts visitors into customers. Professional web design services with modern, responsive designs tailored to your business needs.',
  keywords: ['web design', 'website development', 'custom websites', 'business websites', 'responsive design'],
  openGraph: {
    title: 'Professional Web Design Services - Transform Your Business',
    description: 'Get a custom website that converts visitors into customers. Professional web design services with modern, responsive designs.',
    type: 'website',
    url: 'https://yourdomain.com',
    images: ['/api/og?title=Web%20Design%20Services'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Web Design Services - Transform Your Business',
    description: 'Get a custom website that converts visitors into customers.',
    images: ['/api/og?title=Web%20Design%20Services'],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LazyVisible>
        <Features />
      </LazyVisible>
      {/* Testimonials section removed */}
      <StartProjectCTA className="bg-transparent" />
    </div>
  )
}
