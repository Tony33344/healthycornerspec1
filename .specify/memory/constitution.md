<!--
SYNC IMPACT REPORT
==================
Version: 0.0.0 → 1.0.0 (Initial Constitution)
Ratification Date: 2025-01-11
Last Amended: 2025-01-11

Changes:
- ✅ Initial constitution created with 8 core principles
- ✅ Brand design guidelines integrated from BRAND_IMPLEMENTATION.md and BRAND_REVIEW.md
- ✅ Technical stack defined (Next.js 14, TypeScript, Tailwind, Supabase)
- ✅ Public folder image assets catalogued and referenced
- ✅ Governance and enforcement procedures established

Templates Status:
- ⚠ .specify/templates/plan-template.md - TO BE CREATED
- ⚠ .specify/templates/spec-template.md - TO BE CREATED
- ⚠ .specify/templates/tasks-template.md - TO BE CREATED
- ⚠ .specify/templates/commands/*.md - TO BE CREATED

Follow-up TODOs:
- Create template files aligned with constitution principles
- Set up CI/CD pipeline configuration
- Initialize Supabase project and RLS policies
- Create initial test suite structure
-->

# Healthy Corner Platform Constitution

**Project Name:** Healthy Corner  
**Project Type:** Full-Stack Wellness Retreat Web Platform  
**Version:** 1.0.0  
**Ratification Date:** 2025-01-11  
**Last Amended:** 2025-01-11  
**Status:** Active

---

## Preamble

This constitution governs the development, maintenance, and evolution of the Healthy Corner platform—a multilingual wellness retreat web application for Camp Menina. This document establishes non-negotiable principles, technical constraints, brand guidelines, and governance procedures that MUST be followed by all contributors, AI agents, and automated systems.

**Platform Mission:** To provide a seamless, accessible, and beautiful digital experience for wellness seekers to discover services, book activities (yoga, ice bathing, etc.), shop for healthy food, and enable administrators to manage all content through an intuitive CMS interface.

**Enforcement Authority:** All code changes, feature implementations, and design decisions MUST cite this constitution. Violations require immediate clarification via `/speckit.clarify` workflow.

---

## Core Principles

### Principle 1: Technology Independence with Constraints

**Statement:** The platform MUST use a specific, approved technology stack. Deviations are prohibited without explicit architectural review and constitutional amendment.

**Mandatory Technology Stack:**

- **Frontend Framework:** Next.js 14 (App Router) - NO Pages Router, NO other frameworks
- **Language:** TypeScript (strict mode enabled) - NO JavaScript without types
- **Styling:** Tailwind CSS with brand color integration - NO CSS-in-JS libraries, NO styled-components
- **Animations:** Framer Motion only - NO other animation libraries
- **Backend:** Supabase (PostgreSQL + Auth + Storage) - NO custom backend servers, NO Firebase
- **Internationalization:** Next.js i18n (next-intl or similar) - MUST support English and Spanish minimum
- **Image Management:** Next.js Image component with public/ folder references

**Static Asset Rules:**
- All brand images MUST reside in `/public/images/` directory
- Component imports MUST use format: `<Image src="/images/hero.jpg" alt="..." />`
- Available brand assets include:
  - `/public/images/logo.png` - Primary lime green logo (#A4B82C)
  - `/public/images/logo-black-bg.png` - Logo for dark backgrounds
  - `/public/images/brand-guide.png` - Official brand guidelines
  - `/public/images/hero-bg.jpg` - Hero section background
  - `/public/images/about-bg.jpg` - About section background
  - `/public/images/gallery/*` - Gallery images
  - `/public/images/icebath breathing/*` - Ice bath activity images
  - `/public/images/izbrane hrana/*` - Healthy food shop images

**Rationale:** Consistency prevents technical debt, ensures maintainability, and leverages Next.js 14's performance optimizations. Supabase provides enterprise-grade security with RLS while maintaining rapid development velocity.

---

### Principle 2: Brand Design Integrity

**Statement:** All visual design, typography, and color usage MUST strictly adhere to the Healthy Corner brand guidelines as documented in `BRAND_IMPLEMENTATION.md` and `BRAND_REVIEW.md`.

**Non-Negotiable Brand Rules:**

1. **Logo Usage:**
   - Logo is a lime green (#A4B82C) circle with lowercase 'h' forming a smile (happy face)
   - MUST use actual logo images from `/public/images/logo.png` or `logo-black-bg.png`
   - NEVER recreate logo with CSS or SVG - use provided PNG files only
   - Logo works on: black, lime green, white backgrounds (use appropriate variant)

2. **Typography:**
   - Brand name: "healthy corner" - **ALWAYS lowercase**, bold, clean sans-serif
   - Tagline: "ALPSKI ZDRAVILIŠKI KAMP" - **ALWAYS UPPERCASE**, wide letter-spacing (tracking-[0.4em])
   - NEVER capitalize "healthy corner" except at sentence start
   - Section labels: UPPERCASE with tracking-[0.3em]
   - Headlines: text-5xl to text-8xl, bold (font-bold)
   - Body text: text-xl, light weight (font-light)

3. **Color System (Tailwind Config):**
   ```typescript
   colors: {
     primary: '#A4B82C',        // Lime green - brand primary
     'primary-dark': '#8A9824',  // Darker lime for hover states
     black: '#000000',           // Pure black for text/backgrounds
     white: '#FFFFFF',           // Pure white for contrast
     neutral: {
       50: '#FAFAFA',
       100: '#F5F5F5',
       700: '#404040',
       900: '#171717'
     }
   }
   ```

4. **Design Principles:**
   - Minimal, clean layouts with generous white space
   - Black backgrounds for hero sections (with subtle gradients)
   - Lime green (#A4B82C) backgrounds for brand showcase sections
   - White/neutral-50 alternating backgrounds for content sections
   - Lime green underline bars (w-16 h-1) under section headers
   - Mobile-first responsive design
   - Calming, nature-inspired animations (Framer Motion with easing)

5. **Section Header Pattern (MUST follow):**
   ```tsx
   <div className="mb-8">
     <p className="text-sm uppercase tracking-[0.3em] text-neutral-700 mb-4">
       SECTION LABEL
     </p>
     <div className="w-16 h-1 bg-primary mb-6"></div>
     <h2 className="text-6xl font-bold mb-6">Section Title</h2>
     <p className="text-xl font-light text-neutral-700">Body text</p>
   </div>
   ```

**Enforcement:** Every component MUST be reviewed against `BRAND_IMPLEMENTATION.md`. Brand violations are considered critical bugs.

**Rationale:** Brand consistency builds trust, recognition, and professional credibility. The lime green logo with smile conveys health, happiness, and approachability—core values of the wellness retreat.

---

### Principle 3: User-Centric Design & Accessibility

**Statement:** The platform MUST prioritize accessibility, intuitive UX, and mobile-first design to serve wellness seekers of all abilities.

**Mandatory Requirements:**

1. **Accessibility (WCAG 2.1 AA Compliance):**
   - All images MUST have descriptive `alt` attributes
   - Color contrast ratios MUST meet 4.5:1 for normal text, 3:1 for large text
   - Keyboard navigation MUST work for all interactive elements
   - Focus indicators MUST be visible (lime green outline: `focus:ring-2 focus:ring-primary`)
   - Form labels MUST be properly associated with inputs
   - ARIA labels MUST be used for icon-only buttons
   - Screen reader testing MUST be performed for critical flows

2. **Mobile-First Responsive Design:**
   - Design for mobile (320px) first, then tablet (768px), then desktop (1024px+)
   - Touch targets MUST be minimum 44x44px
   - Navigation MUST collapse to hamburger menu on mobile
   - Images MUST be optimized with Next.js Image (responsive srcset)
   - Test on real devices: iOS Safari, Android Chrome

3. **Intuitive UX for Wellness Seekers:**
   - Calming animations: fade-in, slide-up (Framer Motion with `ease-out` easing)
   - Loading states MUST show skeleton screens or spinners (lime green)
   - Error messages MUST be friendly and actionable
   - Success confirmations MUST use nature-inspired visuals
   - Booking flows MUST be max 3 steps with progress indicators

4. **SEO Optimization:**
   - Every page MUST have unique `<title>` and `<meta name="description">`
   - Open Graph tags MUST be present for social sharing
   - Semantic HTML5 tags MUST be used (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
   - Sitemap.xml MUST be generated and submitted to search engines
   - robots.txt MUST allow public pages, disallow admin routes
   - Structured data (JSON-LD) MUST be added for services, events, and products

**Rationale:** Accessibility is a legal requirement and moral imperative. Mobile-first design reflects user behavior (60%+ mobile traffic). SEO drives organic discovery for wellness seekers searching for retreats.

---

### Principle 4: Security & Data Integrity

**Statement:** Security MUST be implemented at every layer. User data MUST be protected with encryption, authentication, and row-level security.

**Mandatory Security Measures:**

1. **Supabase Row Level Security (RLS):**
   - ALL database tables MUST have RLS policies enabled
   - Public data (services, schedules) MUST have `SELECT` policies for anonymous users
   - User bookings MUST be restricted to authenticated users (policy: `auth.uid() = user_id`)
   - Admin data MUST require admin role check (policy: `auth.jwt() ->> 'role' = 'admin'`)
   - NO direct database queries from client - use Supabase client with RLS

2. **Authentication:**
   - Admin login MUST use Supabase Auth (email/password + OAuth options)
   - Passwords MUST meet requirements: 8+ chars, 1 uppercase, 1 number, 1 special char
   - Session tokens MUST be HTTP-only cookies
   - JWT tokens MUST expire after 1 hour (refresh token: 7 days)
   - Multi-factor authentication (MFA) MUST be available for admin accounts

3. **Booking System Integrity:**
   - Conflict detection MUST run server-side (Supabase Edge Functions)
   - Time overlaps MUST be prevented with database constraints
   - Timestamps MUST use `created_at` and `updated_at` with automatic triggers
   - Booking confirmations MUST be idempotent (prevent double-booking)
   - Cancellation policies MUST be enforced with status checks

4. **Data Protection:**
   - Sensitive data (payment info) MUST be encrypted at rest
   - API keys MUST be stored in environment variables (`.env.local`, NEVER committed)
   - Supabase Storage MUST use signed URLs for private uploads
   - Public brand images in `/public/images/` are exempt (static assets)
   - GDPR compliance: user data export and deletion endpoints MUST exist

5. **API Security:**
   - Rate limiting MUST be enabled (Supabase: 100 req/min per IP)
   - CORS MUST be configured to allow only production domain
   - Input validation MUST use Zod schemas on all API routes
   - SQL injection prevention: use parameterized queries only

**Rationale:** Wellness retreat bookings involve personal data and payments. Security breaches destroy trust. RLS provides defense-in-depth. Automated timestamps prevent data inconsistencies.

---

### Principle 5: CMS-Driven Content Management

**Statement:** All public-facing content MUST be editable through an admin dashboard. The CMS MUST mimic WordPress ease-of-use while leveraging Supabase as the backend.

**CMS Requirements:**

1. **Admin Dashboard Structure:**
   - Route: `/admin` (protected by Supabase Auth)
   - Sections: Pages, Services, Schedules, Menu Items, Gallery, Bookings, Users, Settings
   - WYSIWYG editor for rich text (e.g., Tiptap or Lexical)
   - Drag-and-drop image uploads to Supabase Storage
   - Ability to link existing images from `/public/images/` folder

2. **Editable Content Types:**
   - **Pages:** Hero title/subtitle, About text, Contact info
   - **Services:** Name, description, price, duration, images, availability
   - **Schedules:** Weekly yoga classes, ice bathing sessions (time slots, capacity)
   - **Menu Items:** Healthy food products (name, price, image, ingredients, allergens)
   - **Gallery:** Image uploads with captions, alt text, and ordering
   - **Settings:** Site title, tagline, social links, brand colors (read-only reference)

3. **CRUD Operations:**
   - Create: Form with validation (Zod schemas)
   - Read: Paginated tables with search and filters
   - Update: Inline editing or modal forms
   - Delete: Soft delete with confirmation dialog (archive, not hard delete)
   - Bulk actions: Multi-select with delete/archive/publish

4. **Image Management:**
   - Upload to Supabase Storage (`/uploads/` bucket)
   - Fallback to `/public/images/` for static brand assets (read-only)
   - Image optimization: automatic WebP conversion, responsive sizes
   - Alt text MUST be required field (accessibility)

5. **Content Versioning:**
   - Draft/Published status for all content
   - Revision history with rollback capability (future enhancement)
   - Scheduled publishing (publish_at timestamp)

**Rationale:** Non-technical staff need to update content without developer intervention. WordPress-like UX reduces training time. Supabase provides real-time updates and scalability.

---

### Principle 6: Performance & Scalability

**Statement:** The platform MUST load fast, scale efficiently, and provide excellent Core Web Vitals scores.

**Performance Requirements:**

1. **Next.js Optimization:**
   - Static Site Generation (SSG) for public pages (build-time rendering)
   - Incremental Static Regeneration (ISR) for content updates (revalidate: 60s)
   - Server Components for data fetching (reduce client-side JavaScript)
   - Dynamic imports for heavy components (e.g., booking calendar)
   - Image optimization: Next.js Image component with `priority` for hero images

2. **Asset Optimization:**
   - Images in `/public/images/` MUST be optimized (WebP format, max 500KB)
   - Lazy loading for below-the-fold images
   - Font optimization: `next/font` with `font-display: swap`
   - CSS purging: Tailwind's JIT mode removes unused styles
   - Bundle size monitoring: `@next/bundle-analyzer` in CI

3. **Caching Strategy:**
   - Static assets: CDN caching (Netlify Edge, 1 year TTL)
   - API responses: Supabase query caching (5 min TTL)
   - Browser caching: `Cache-Control` headers for images
   - Service Worker (optional): offline support for public pages

4. **Core Web Vitals Targets:**
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1
   - Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)

5. **Deployment:**
   - Platform: Netlify (CI/CD with GitHub integration)
   - Build command: `npm run build`
   - Environment variables: Supabase URL, Anon Key, Stripe Key (if used)
   - Preview deployments for pull requests
   - Production domain: `healthycorner.si` (or similar)

**Rationale:** Fast load times reduce bounce rates and improve SEO. Next.js 14 App Router provides best-in-class performance. Netlify's global CDN ensures low latency worldwide.

---

### Principle 7: Testing & Quality Assurance

**Statement:** Code quality MUST be maintained through automated testing, linting, and formatting. Test-Driven Development (TDD) is encouraged where feasible.

**Testing Requirements:**

1. **Unit Tests (Jest + React Testing Library):**
   - All utility functions MUST have unit tests (100% coverage target)
   - Component tests for UI logic (button clicks, form validation)
   - Test file naming: `ComponentName.test.tsx`
   - Run on every commit: `npm test`

2. **Integration Tests (Supabase Mocks):**
   - API route tests with mocked Supabase client
   - Database query tests with test fixtures
   - Authentication flow tests (login, logout, session)
   - Test environment: `.env.test` with test Supabase project

3. **End-to-End Tests (Playwright):**
   - Critical user flows MUST be covered:
     - Public: Browse services → View schedule → Book activity
     - Admin: Login → Create service → Upload image → Publish
     - Shop: Add to cart → Checkout → Order confirmation
   - Test on Chrome, Firefox, Safari (webkit)
   - Visual regression tests for brand consistency (lime green colors, logo rendering)
   - Run before deployment: `npm run test:e2e`

4. **Code Quality Tools:**
   - **ESLint:** Enforce TypeScript rules, React best practices, accessibility (eslint-plugin-jsx-a11y)
   - **Prettier:** Auto-format on save (2 spaces, single quotes, trailing commas)
   - **TypeScript:** Strict mode enabled (`strict: true`, `noImplicitAny: true`)
   - **Husky:** Pre-commit hooks for linting and tests
   - **Commitlint:** Enforce conventional commits (`feat:`, `fix:`, `docs:`)

5. **Brand Consistency Tests:**
   - Automated tests for brand color usage (check Tailwind classes)
   - Logo image presence tests (verify `/public/images/logo.png` is used)
   - Typography tests (ensure "healthy corner" is lowercase in rendered HTML)

**Rationale:** Automated testing prevents regressions and enables confident refactoring. TDD improves design. Linting catches bugs early. Brand tests ensure visual consistency.

---

### Principle 8: Commerce & Booking Business Rules

**Statement:** The booking and commerce systems MUST enforce business logic, prevent conflicts, and provide admin tools for management.

**Booking System Rules:**

1. **Calendar & Scheduling:**
   - Weekly schedules MUST display in calendar view (react-big-calendar or similar)
   - Time slots MUST show availability (e.g., "8/10 spots available")
   - Conflict detection MUST prevent double-booking same user at same time
   - Booking window: 24 hours advance notice minimum (configurable)
   - Cancellation policy: 48 hours before start time (configurable)

2. **Activity Types:**
   - **Yoga Classes:** Weekly recurring schedule, max capacity per class
   - **Ice Bathing:** Package-based (e.g., 5-session pass), appointment booking
   - **Workshops:** One-time events with registration deadline
   - Each activity MUST have: name, description, duration, price, capacity, images

3. **Booking Workflow:**
   - Step 1: Select activity and date/time
   - Step 2: Enter user details (name, email, phone)
   - Step 3: Confirm and pay (Stripe integration optional, can start with manual payment)
   - Confirmation email MUST be sent (Supabase Edge Function + email service)

4. **Admin Management:**
   - View all bookings in table (filterable by date, activity, status)
   - Export bookings to CSV (for accounting)
   - Bulk actions: confirm, cancel, send reminders
   - Analytics dashboard: bookings per week, revenue, popular activities

**Online Shop Rules:**

1. **Product Catalog:**
   - Healthy food products with images from `/public/images/izbrane hrana/`
   - Product fields: name, description, price, image, ingredients, allergens, stock
   - Categories: Snacks, Meals, Beverages, Supplements

2. **Shopping Cart:**
   - Add to cart (stored in localStorage or Supabase if authenticated)
   - Update quantity, remove items
   - Cart icon in navigation with item count badge
   - Persistent cart for logged-in users

3. **Checkout (Minimal MVP):**
   - Collect: name, email, phone, delivery address
   - Payment: Stripe integration (optional) or manual bank transfer instructions
   - Order confirmation page with order number
   - Admin receives order notification email

4. **Admin Tools:**
   - Order management: view, update status (pending, confirmed, shipped, delivered)
   - Inventory tracking: low stock alerts
   - Sales reports: revenue by product, date range filters

**Rationale:** Booking conflicts damage reputation. Calendar views improve UX. Admin tools reduce manual work. Minimal shop keeps scope manageable while enabling revenue.

---

## Governance & Enforcement

### Amendment Procedure

1. **Proposal:** Any contributor or AI agent MAY propose a constitutional amendment via GitHub issue with label `constitution-amendment`.
2. **Review:** Project maintainers MUST review within 7 days.
3. **Approval:** Amendments require unanimous approval from core team (or 2/3 majority if team > 3).
4. **Documentation:** Approved amendments MUST update this document with new version number and change log.
5. **Propagation:** All dependent templates (`.specify/templates/`) MUST be updated within 48 hours.

### Versioning Policy

- **MAJOR (X.0.0):** Backward-incompatible changes (e.g., removing a principle, changing tech stack)
- **MINOR (1.X.0):** New principles, expanded guidance, new mandatory sections
- **PATCH (1.0.X):** Clarifications, typo fixes, non-semantic improvements

### Compliance Review

1. **Pre-Commit:** Husky hooks MUST check for constitution violations (linting, tests).
2. **Pull Request:** All PRs MUST include checklist confirming constitutional compliance.
3. **AI Agent Enforcement:** AI agents MUST cite relevant principles in commit messages and PR descriptions.
4. **Violation Handling:** If a violation is detected:
   - **Minor:** Fix immediately in same PR
   - **Major:** Reject PR, require `/speckit.clarify` workflow to resolve ambiguity
   - **Repeated:** Escalate to project maintainers for review

### Clarification Workflow

When constitutional guidance is ambiguous or conflicts arise:

1. Run `/speckit.clarify` workflow with specific question
2. AI agent MUST ask up to 5 targeted clarification questions
3. Answers MUST be encoded back into this constitution (amendment process)
4. Updated constitution MUST be committed before proceeding with original task

### Documentation Requirements

1. **README.md:** MUST reference this constitution and link to `.specify/memory/constitution.md`
2. **API Documentation:** MUST document all Supabase tables, RLS policies, and Edge Functions
3. **Setup Guide:** MUST include step-by-step instructions for local development
4. **Deployment Guide:** MUST document Netlify configuration and environment variables
5. **Brand Guidelines:** MUST link to `BRAND_IMPLEMENTATION.md` and `BRAND_REVIEW.md`

---

## Appendix: Quick Reference

### Brand Assets Inventory

Located in `/public/images/`:
- `logo.png` - Primary lime green logo (#A4B82C)
- `logo-black-bg.png` - Logo for dark backgrounds
- `brand-guide.png` - Official brand guidelines
- `hero-bg.jpg` - Hero section background (743KB)
- `about-bg.jpg` - About section background (431KB)
- `gallery/` - 13 gallery images
- `icebath breathing/` - 7 ice bath activity images
- `izbrane hrana/` - 6 healthy food product images

### Color Palette (Tailwind)

```javascript
// tailwind.config.js
colors: {
  primary: '#A4B82C',        // Lime green
  'primary-dark': '#8A9824',
  black: '#000000',
  white: '#FFFFFF',
  neutral: { 50, 100, 700, 900 }
}
```

### Typography Rules

- Brand name: "healthy corner" (lowercase, bold)
- Tagline: "ALPSKI ZDRAVILIŠKI KAMP" (uppercase, tracking-[0.4em])
- Section labels: UPPERCASE, tracking-[0.3em]
- Headlines: text-5xl to text-8xl, font-bold
- Body: text-xl, font-light

### Tech Stack Summary

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Deployment:** Netlify (CI/CD)
- **Testing:** Jest, React Testing Library, Playwright
- **Linting:** ESLint, Prettier, TypeScript strict mode

### Critical Workflows

- `/speckit.clarify` - Resolve constitutional ambiguities
- `/speckit.specify` - Create feature specifications
- `/speckit.plan` - Generate implementation plans
- `/speckit.tasks` - Break down features into tasks
- `/speckit.implement` - Execute implementation

---

**End of Constitution**

*This document is the source of truth for all development decisions. When in doubt, cite this constitution.*
