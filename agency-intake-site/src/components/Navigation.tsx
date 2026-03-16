'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import LogoSwap from './LogoSwap'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import './Navigation.css'
import { LayoutGroup } from 'framer-motion'

interface NavigationProps {
  className?: string
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/start', label: 'Get Started' }
]

const desktopNavItems = navItems.filter((item) => item.href !== '/start')

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
        items={navItems.map(item => ({
          href: item.href,
          label: item.label
        }))}
        desktopItems={desktopNavItems.map(item => ({
          href: item.href,
          label: item.label
        }))}
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
            className="ml-3 inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            style={{ backgroundColor: getButtonColor() }}
          >
            Start Your Project
          </Link>
        }
        sticky={isSticky}
        topOffset={14}
      />
    </LayoutGroup>
  )
}

export default Navigation 
