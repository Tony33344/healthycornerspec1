'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND_TEXT, BRAND_ASSETS } from '../../lib/constants/brand'
import CartIcon from './CartIcon'
import LanguageToggle from './LanguageToggle'

export default function Navigation() {
  const t = useTranslations('nav')
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'menu', href: `/${locale}/menu` },
    { key: 'schedule', href: `/${locale}/schedule` },
    { key: 'gallery', href: `/${locale}/gallery` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with Image */}
            <Link href={`/${locale}`} className="flex items-center gap-2 md:gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src={BRAND_ASSETS.logo}
                  alt="healthy corner logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              </div>
              <span className="brand-name text-lg md:text-xl font-bold text-neutral-900 hidden sm:block">
                {BRAND_TEXT.name}
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 relative py-2 ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-neutral-700 hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart Icon */}
              <CartIcon className="text-neutral-700 hover:text-lime-600" />
              
              {/* Language Toggle - Desktop */}
              <LanguageToggle variant="compact" className="hidden md:block" />

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <Link 
                  href={`/${locale}`} 
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src={BRAND_ASSETS.logo}
                      alt="healthy corner logo"
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                  <span className="brand-name text-lg font-bold text-neutral-900">
                    {BRAND_TEXT.name}
                  </span>
                </Link>
                <button 
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary'
                        }`}
                      >
                        {t(item.key)}
                        {isActive(item.href) && (
                          <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Language Toggle */}
              <div className="p-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 mb-3 px-4">Language</p>
                <LanguageToggle variant="full" className="w-full" />
              </div>

              {/* Mobile CTA */}
              <div className="p-4">
                <Link
                  href={`/${locale}/schedule`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Book Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
