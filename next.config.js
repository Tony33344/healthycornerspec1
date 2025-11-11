const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jwxenutezijwyrguqicv.supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = withNextIntl(nextConfig)
