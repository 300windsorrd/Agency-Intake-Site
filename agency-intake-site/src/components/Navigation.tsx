'use client'

import { useEffect } from 'react'
import LogoSwap from './LogoSwap'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import './Navigation.css'
import { LayoutGroup } from 'framer-motion'

interface NavigationProps {
  className?: string
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const { getButtonColor, getNavigationTextColor } = useBackground()
  const pathname = usePathname()

  // Navigation should always be sticky for better accessibility and UX
  const isSticky = true

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/start', label: 'Get Started' }
  ]

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
        logo={(<LogoSwap />) as unknown as string}
        logoHref="/"
        items={navItems.map(item => ({
          href: item.href,
          label: item.label
        }))}
        activeHref={pathname}
        baseColor="#ffffff"
        pillColor={getButtonColor()}
        pillTextColor={getNavigationTextColor()}
        hoveredPillTextColor="#1f2937"
        className={className}
        onMobileMenuClick={() => { }}
        slotItem={null}
        slotIndex={undefined}
        leftSlot={null}
        rightSlot={null}
        sticky={isSticky}
        topOffset={14}
      />
    </LayoutGroup>
  )
}

export default Navigation 
