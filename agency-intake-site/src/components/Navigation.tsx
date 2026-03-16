'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import LogoSwap from './LogoSwap'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import { serviceNavItems } from '@/content/services'
import './Navigation.css'
import { LayoutGroup } from 'framer-motion'

interface NavigationProps {
  className?: string
}

interface NavigationItem {
  href: string
  label: string
  children?: NavigationItem[]
}

const navItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', children: serviceNavItems },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/consultation', label: 'Consultation' },
  { href: '/start', label: 'Get Started' }
]

const desktopNavItems = navItems.filter((item) => item.href !== '/' && item.href !== '/start')

const Navigation = ({ className = '' }: NavigationProps) => {
  const { getButtonColor, getNavigationTextColor } = useBackground()
  const pathname = usePathname()

  // Navigation should always be sticky for better accessibility and UX
  const isSticky = true

  // Always add body padding for fixed navigation to prevent content overlap
  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    body.classList.add('has-fixed-nav')
    return () => {
      body.classList.remove('has-fixed-nav')
    }
  }, [])

  return (
    <LayoutGroup id="nav-customize">
      <PillNav
        logo={<LogoSwap />}
        logoHref="/"
        items={navItems}
        desktopItems={desktopNavItems}
        activeHref={pathname}
        baseColor="#0f172a"
        pillColor={getButtonColor()}
        pillTextColor={getNavigationTextColor()}
        hoveredPillTextColor="#e2e8f0"
        className={className}
        onMobileMenuClick={() => { }}
        slotItem={null}
        slotIndex={undefined}
        leftSlot={null}
        rightSlot={
          <Link
            href="/start"
            className="ml-2 inline-flex items-center rounded-full px-3.5 py-2 text-[0.8rem] font-semibold text-white shadow-lg transition hover:brightness-110 sm:text-[0.85rem]"
            style={{ backgroundColor: getButtonColor() }}
          >
            Start Your Project
          </Link>
        }
        sticky={isSticky}
        topOffset={12}
      />
    </LayoutGroup>
  )
}

export default Navigation 
