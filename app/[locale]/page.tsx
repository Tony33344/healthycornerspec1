import Hero from '../components/Hero'
import About from '../components/About'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'healthy corner - ALPSKI ZDRAVILIŠKI KAMP | Wellness Retreat',
  description:
    'Experience wellness in the heart of nature at Camp Menina. Yoga, ice bathing, and healthy cuisine in a serene alpine setting.',
  openGraph: {
    title: 'healthy corner - Wellness Retreat',
    description: 'Experience wellness in the heart of nature at Camp Menina.',
    images: ['/images/hero-bg.jpg'],
  },
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
    </main>
  )
}
