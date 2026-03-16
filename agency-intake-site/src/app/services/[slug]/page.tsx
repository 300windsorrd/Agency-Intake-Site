import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLandingPage from '@/components/ServiceLandingPage'
import { getServiceBySlug, serviceCatalog } from '@/content/services'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return serviceCatalog.map((service) => ({
    slug: service.slug
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | BiteSites'
    }
  }

  return {
    title: `${service.title} | BiteSites`,
    description: service.summary
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return <ServiceLandingPage service={service} />
}
