import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['sl', 'nl', 'en', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatically detect user's locale
  localeDetection: true,
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(sl|nl|en|de)/:path*'],
}
