'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { BRAND_TEXT, BRAND_ASSETS } from '../../lib/constants/brand'
import { getFeaturedTestimonials } from '../lib/constants/testimonials'

export default function Hero() {
  const t = useTranslations('hero')
  const params = useParams() as { locale?: string }
  const locale = params?.locale || 'en'
  const [imageError, setImageError] = useState(false)
  const featuredTestimonials = getFeaturedTestimonials().slice(0, 3)

  const quickActions = [
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Yoga',
      href: `/${locale}/services?category=Yoga`,
      activeColor: 'text-[#A4B82C]'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      title: 'Ice Bathing',
      href: `/${locale}/services?category=Ice%20Bathing`,
      activeColor: 'text-blue-400'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Workshops',
      href: `/${locale}/services?category=Workshops`,
      activeColor: 'text-orange-400'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Book Now',
      href: `/${locale}/schedule`,
      activeColor: 'text-[#A4B82C]'
    }
  ]

  return (
    <section className="relative min-h-screen bg-neutral-900 flex flex-col overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <Image
            src={BRAND_ASSETS.heroBg}
            alt="Camp Menina Wellness Retreat Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}
        
        {/* Simplified Gradient Overlay to prevent text issues */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 pt-24 pb-12">
        {/* Top Section - Logo & Brand */}
        <div className="text-center mb-8 md:mb-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
              <Image
                src={BRAND_ASSETS.logo}
                alt="healthy corner logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
              />
            </div>
          </motion.div>

          {/* Brand Name - Cleaned up rendering */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="brand-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-5 text-white tracking-tight"
          >
            {BRAND_TEXT.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="brand-tagline text-xs sm:text-sm md:text-base text-neutral-300 mb-8 md:mb-10 tracking-[0.3em] font-medium"
          >
            {BRAND_TEXT.tagline}
          </motion.p>
        </div>

        {/* Quick Actions Grid - Sophisticated Minimalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-16"
        >
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl text-white text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`transition-colors duration-300 group-hover:${action.activeColor}`}>
                    {action.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base tracking-wide uppercase">{action.title}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA Buttons - Refined Brand Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-16"
        >
          <Link
            href={`/${locale}/services`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#A4B82C] hover:bg-[#8A9824] text-white font-bold py-4 px-8 md:px-10 rounded-xl transition-all duration-300 shadow-lg shadow-black/20"
          >
            {t('cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/gallery`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 md:px-10 rounded-xl border border-white/20 transition-all duration-300"
          >
            View Gallery
          </Link>
        </motion.div>

        {/* Testimonials Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="max-w-5xl mx-auto hidden sm:block"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
              >
                <div className="flex gap-1 mb-3 text-[#A4B82C]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'text-white/20'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-300 text-sm italic leading-relaxed mb-4 line-clamp-3">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <p className="text-white text-xs font-semibold uppercase tracking-wider">
                  — {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
