# Feature Specification: Wellness Retreat Platform

**Feature ID:** 001-wellness-platform  
**Feature Name:** Build Full-Stack Wellness Retreat Platform for Camp Menina  
**Version:** 1.0.0  
**Created:** 2025-01-11  
**Status:** Draft  
**Constitutional Reference:** `.specify/memory/constitution.md` v1.0.0

---

## Executive Summary

Build a comprehensive multilingual wellness retreat web platform for Camp Menina (Healthy Corner brand) that enables wellness seekers to discover services, book activities, shop for healthy food, and allows administrators to manage all content through an intuitive CMS interface. The platform must incorporate brand design elements (lime green #A4B82C, lowercase "healthy corner" typography) and leverage static images from the `/public/images/` folder alongside dynamic Supabase-stored media.

**Business Value:** Streamline retreat operations, increase booking conversions, enable self-service content management, and provide a professional digital presence aligned with the Healthy Corner brand identity.

**Target Users:**
- **Primary:** Wellness seekers browsing and booking retreat activities
- **Secondary:** Camp administrators managing content, bookings, and commerce
- **Tertiary:** Newsletter subscribers and past guests engaging with content

---

## Constitutional Compliance

This specification adheres to the Healthy Corner Platform Constitution v1.0.0:

- **Principle 1 (Technology Stack):** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Supabase
- **Principle 2 (Brand Design):** Lime green #A4B82C, lowercase "healthy corner", images from `/public/images/`
- **Principle 3 (Accessibility):** WCAG 2.1 AA compliance, mobile-first, SEO optimization
- **Principle 4 (Security):** Supabase RLS, admin auth, booking conflict detection
- **Principle 5 (CMS):** Admin dashboard at `/admin`, WYSIWYG editing, CRUD operations
- **Principle 6 (Performance):** Core Web Vitals targets, Next.js optimization, Netlify deployment
- **Principle 7 (Testing):** Jest, Playwright, ESLint, brand consistency tests
- **Principle 8 (Commerce):** Booking calendar, shopping cart, admin management tools

---

## User Stories & Acceptance Criteria

### Public-Facing Features

#### US-001: Hero & About Section with Brand Imagery
**As a wellness seeker**, I want to see a compelling hero section with Camp Menina's story using brand visuals from `/public/images/`, so I feel emotionally connected to the retreat.

**Acceptance Criteria:**
- Hero displays logo from `/public/images/logo.png` (160x160px)
- Background uses `/public/images/hero-bg.jpg` with Next.js Image optimization
- Brand name "healthy corner" in lowercase, bold, text-8xl (responsive to text-4xl mobile)
- Tagline "ALPSKI ZDRAVILIŠKI KAMP" uppercase with tracking-[0.4em]
- About section uses `/public/images/about-bg.jpg` with CMS-editable storytelling text
- Smooth fade-in animations using Framer Motion
- Mobile-responsive layout (320px to 1024px+)
- SEO meta tags and Open Graph tags present

#### US-002: Service Catalog with Wellness Packages
**As a visitor**, I want to browse wellness packages (ice bathing, yoga, workshops) with images from `/public/images/icebath breathing/` and pricing, so I can compare offerings.

**Acceptance Criteria:**
- Service cards display images from `/public/images/` or Supabase Storage
- Each service shows: name, description, price, duration, capacity, "Book Now" CTA
- Filterable by category (All, Yoga, Ice Bathing, Workshops, Packages)
- Lime green (#A4B82C) hover effects with scale(1.05) transform
- Grid layout: 1 col mobile, 2 col tablet, 3 col desktop
- SEO structured data (JSON-LD) for services
- Accessible keyboard navigation and ARIA labels

#### US-003: Healthy Food Menu
**As a guest**, I want to view menu options with photos from `/public/images/izbrane hrana/`, ingredients, allergens, and pricing.

**Acceptance Criteria:**
- Menu items display images from `/public/images/izbrane hrana/` (6 available)
- Each item shows: name, description, price, ingredients, allergen icons
- Categories: Snacks, Meals, Beverages, Supplements
- Dietary filters: Vegan, Gluten-Free, Dairy-Free, Nut-Free (multi-select)
- "Add to Cart" button with quantity selector (lime green styling)
- Nutritional info in expandable accordion
- Images optimized with Next.js Image (WebP, lazy loading)

#### US-004: Weekly Schedule Calendar
**As a participant**, I want to see weekly schedules in calendar view with bookable time slots and availability.

**Acceptance Criteria:**
- Calendar displays weekly grid (Monday-Sunday x time slots)
- Each slot shows: activity name, time, instructor, available spots ("8/10")
- Color-coded by type: Yoga (#A4B82C), Ice Bathing (#3B82F6), Workshops (#8B5CF6)
- Click slot opens booking modal with activity details
- Real-time availability updates via Supabase subscriptions
- Conflict detection prevents double-booking same user
- Mobile switches to list view with date picker
- Timezone displayed (Central European Time)

#### US-005: Gallery & Testimonials
**As a user**, I want to browse retreat photos from `/public/images/gallery/` (13 images) and read guest testimonials.

**Acceptance Criteria:**
- Gallery grid displays 13 static images from `/public/images/gallery/`
- Admin-uploaded images from Supabase Storage also appear
- Lightbox modal for full-size viewing with prev/next navigation
- Image captions with alt text (accessibility)
- Testimonials section with guest quotes, names, dates, star ratings (1-5)
- Lime green stars for ratings
- Lazy loading for below-fold images
- Video embeds supported (YouTube/Vimeo)

#### US-006: Contact & Newsletter
**As a user**, I want to submit contact inquiries and subscribe to newsletters.

**Acceptance Criteria:**
- Contact form fields: name, email, phone, message (Zod validation)
- Newsletter signup with email and GDPR consent checkbox
- Form validation with inline error messages
- Submission via Supabase Edge Function
- Email notifications to admin
- Success confirmation with lime green checkmark animation
- reCAPTCHA v3 for spam prevention
- Privacy policy link present

#### US-007: Online Shop with Cart
**As a shopper**, I want to add products to cart and checkout seamlessly.

**Acceptance Criteria:**
- Product cards with images, prices, "Add to Cart" buttons
- Cart icon in navigation with item count badge (lime green)
- Cart drawer slides from right with item list
- Update quantity, remove items, view subtotal
- Persistent cart (localStorage for guests, Supabase for authenticated users)
- Checkout page with Stripe integration or manual payment instructions
- Order confirmation page with order number
- Inventory tracking with low stock warnings

#### US-008: Multilingual Support
**As an international visitor**, I want to switch between English and Spanish.

**Acceptance Criteria:**
- Language toggle in navigation (EN/ES)
- All UI text translated via Next.js i18n
- CMS content supports language-specific fields (title_en, title_es)
- URL structure: `/en/services`, `/es/servicios`
- Browser language detection for default
- SEO hreflang tags for each language
- Language preference persisted in cookie (30 days)

### Admin/Back Office Features

#### US-009: Admin Dashboard with Analytics
**As an admin**, I want a Supabase-authenticated dashboard showing key metrics (bookings, revenue, messages).

**Acceptance Criteria:**
- Login at `/admin` with Supabase Auth (email/password)
- Dashboard displays: total bookings (today/week/month), revenue, pending messages
- Charts: bookings over time (line chart), popular services (bar chart)
- Recent activity feed (last 10 bookings, messages)
- Quick action buttons: View Bookings, Manage Services, Check Messages
- Role-based access (admin role via Supabase RLS)
- Session timeout after 1 hour inactivity

#### US-010: WordPress-Like Content Management
**As an administrator**, I want WYSIWYG editing for all site sections without coding.

**Acceptance Criteria:**
- WYSIWYG editor (Tiptap) for rich text with toolbar (bold, italic, headings, lists, links)
- Edit pages: Hero, About, Services, Menu, Schedule, Gallery, Contact
- Image management: upload to Supabase Storage or link from `/public/images/`
- Image browser shows thumbnails from both sources
- Drag-and-drop reordering for gallery
- Draft/Published status toggle
- Auto-save every 30 seconds
- Live preview pane beside editor

#### US-011: Service & Menu CRUD
**As an admin**, I want to create, update, and delete services and menu items.

**Acceptance Criteria:**
- Service form: name, description, price, duration, capacity, category, image
- Menu form: name, description, price, ingredients, allergens, category, image
- Image upload: drag-and-drop, max 5MB, JPG/PNG/WebP
- Select existing images from `/public/images/` folders
- Validation: required fields, price > 0, capacity > 0
- Bulk actions: delete multiple, update prices in batch
- Search and filter in list view
- Soft delete (archive) with restore option

#### US-012: Booking Management
**As an admin**, I want to view, filter, and manage all bookings efficiently.

**Acceptance Criteria:**
- Booking table: ID, user name, email, activity, date/time, status, payment
- Filters: date range, activity type, status (pending/confirmed/cancelled)
- Search by user name or email
- Status update dropdown (confirm, cancel, complete)
- Export to CSV with selected columns
- Bulk actions: confirm multiple, send reminder emails
- Booking details modal with full information
- Conflict warnings highlighted in red
- Email notification on status change

#### US-013: Weekly Schedule Management
**As an admin**, I want to create recurring weekly schedules and update time slots.

**Acceptance Criteria:**
- Schedule builder with day/time grid
- Add recurring slots: day, time, activity, instructor, capacity
- Edit existing slots: change time, capacity, instructor
- Delete with confirmation (check for existing bookings)
- Template system: save schedule, apply to multiple weeks
- Override individual dates (holiday closures)
- Real-time capacity updates on public calendar

#### US-014: Advanced Search & Bulk Operations
**As an admin**, I want advanced search and bulk update capabilities for efficiency.

**Acceptance Criteria:**
- Global search across: services, menu items, bookings, users
- Advanced filters: date ranges, price ranges, categories, status
- Bulk edit modal: select fields, apply to selected items
- Bulk price adjustment: percentage or fixed amount
- Bulk image replacement for multiple items
- Bulk status change: publish/unpublish
- Confirmation dialog before bulk operations
- Undo last bulk action (within 5 minutes)

#### US-015: Brand Consistency Enforcement
**As an admin**, I want CMS to enforce brand guidelines per `BRAND_IMPLEMENTATION.md`.

**Acceptance Criteria:**
- Color picker limited to brand palette (#A4B82C, black, white, neutrals)
- Typography presets match brand (lowercase "healthy corner", uppercase tagline)
- Image upload validates dimensions (min 800x600px, aspect ratio 16:9 or 4:3)
- Logo replacement disabled (always use `/public/images/logo.png`)
- Preview mode shows exact public-facing rendering
- Warning messages for non-brand-compliant edits
- Read-only reference to `BRAND_IMPLEMENTATION.md` in admin

---

## Success Criteria

The feature is considered successful when:

1. **User Engagement:** 80% of visitors browse at least 3 pages (services, menu, schedule)
2. **Booking Conversion:** 15% of schedule viewers complete a booking within 7 days
3. **Cart Conversion:** 25% of cart additions result in completed orders
4. **Performance:** Lighthouse score 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
5. **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1 on 75th percentile
6. **Accessibility:** WCAG 2.1 AA compliance verified by automated and manual testing
7. **Admin Efficiency:** Content updates take < 5 minutes without developer assistance
8. **Booking Accuracy:** Zero double-booking conflicts in production
9. **Brand Consistency:** 100% of pages use correct brand colors, typography, and logo
10. **Multilingual Coverage:** 100% of UI text and 90% of CMS content available in English and Spanish

---

## Key Entities & Data Model

### Public Content Entities
- **Service:** id, name, description, price, duration, capacity, category, image_url, status
- **MenuItem:** id, name, description, price, ingredients, allergens, category, image_url, stock, status
- **Schedule:** id, day_of_week, time, activity_id, instructor, capacity
- **Booking:** id, user_id, schedule_id, booking_date, status, payment_status, notes
- **Testimonial:** id, guest_name, quote, rating, date
- **GalleryImage:** id, url, caption, alt_text, order

### Commerce Entities
- **Cart:** id, user_id, items (jsonb: [{menu_item_id, quantity, price}])
- **Order:** id, user_id, order_number, items (jsonb), subtotal, tax, total, status, shipping_address
- **NewsletterSubscriber:** id, email, subscribed_at, unsubscribed_at

### CMS Entities
- **Page:** id, slug, title_en, title_es, content_en, content_es, status

### Relationships
- Service 1:N Schedule (one service has many schedule slots)
- Schedule 1:N Booking (one slot has many bookings)
- User 1:N Booking (one user has many bookings)
- User 1:1 Cart (one user has one active cart)
- User 1:N Order (one user has many orders)

---

## Assumptions & Constraints

### Assumptions
1. Camp Menina operates in Central European Time (CET/CEST)
2. Initial launch supports English and Spanish (expandable to more languages)
3. Payment processing via Stripe (manual bank transfer as MVP fallback)
4. Admin team consists of 2-5 non-technical staff members
5. Peak booking period is summer months (June-August)
6. Average booking window is 2-4 weeks in advance
7. Gallery images are professionally photographed (high quality)
8. Email service integrated (SendGrid, Resend, or Supabase built-in)

### Constraints
1. **Technology Stack:** Must use Next.js 14, TypeScript, Tailwind, Supabase (per Constitution Principle 1)
2. **Brand Design:** Must follow `BRAND_IMPLEMENTATION.md` and `BRAND_REVIEW.md` (per Constitution Principle 2)
3. **Static Assets:** Must use images from `/public/images/` folder (13 gallery, 7 ice bath, 6 food images available)
4. **Budget:** Supabase free tier initially (500MB database, 1GB storage, 2GB bandwidth)
5. **Timeline:** MVP launch within 8-12 weeks
6. **Performance:** Must meet Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
7. **Accessibility:** Must achieve WCAG 2.1 AA compliance
8. **Security:** Must implement Supabase RLS on all tables

---

## Out of Scope (Future Enhancements)

The following features are explicitly excluded from this initial release:

1. **Mobile Apps:** Native iOS/Android apps (web-only for MVP)
2. **Advanced Payment:** Installment plans, gift cards, loyalty points
3. **Social Features:** User profiles, social sharing, community forums
4. **Advanced Analytics:** Heatmaps, A/B testing, funnel analysis
5. **Marketing Automation:** Email drip campaigns, abandoned cart recovery
6. **Inventory Management:** Supplier integration, purchase orders, stock alerts
7. **Multi-Location:** Support for multiple retreat locations
8. **Third-Party Integrations:** Mailchimp, Google Calendar sync, Zapier
9. **Advanced Booking:** Waitlists, group bookings, package deals
10. **Content Versioning:** Full revision history with diff view

---

## Dependencies

### External Services
- **Supabase:** Database, authentication, storage, edge functions
- **Netlify:** Hosting, CI/CD, CDN
- **Stripe:** Payment processing (optional for MVP)
- **Email Service:** SendGrid, Resend, or Supabase built-in
- **reCAPTCHA:** Google reCAPTCHA v3 for spam prevention

### Internal Dependencies
- **Constitution:** `.specify/memory/constitution.md` v1.0.0
- **Brand Guidelines:** `BRAND_IMPLEMENTATION.md`, `BRAND_REVIEW.md`
- **Static Assets:** `/public/images/` folder (logo, hero, about, gallery, activities, food)

### Technical Dependencies
- **Next.js:** 14.x (App Router)
- **TypeScript:** 5.x
- **Tailwind CSS:** 3.x
- **Framer Motion:** 10.x
- **Supabase JS Client:** 2.x
- **Zod:** 3.x (validation)
- **Tiptap:** 2.x (WYSIWYG editor)
- **Chart.js or Recharts:** Data visualization
- **Playwright:** E2E testing
- **Jest:** Unit testing

---

## Risk Assessment

### High Risk
1. **Booking Conflicts:** Double-booking could damage reputation
   - **Mitigation:** Server-side conflict detection, database constraints, comprehensive testing
2. **Payment Security:** Handling sensitive payment data
   - **Mitigation:** Use Stripe (PCI-compliant), never store card details, implement Supabase RLS
3. **Performance:** Slow load times could increase bounce rate
   - **Mitigation:** Next.js optimization, image optimization, CDN caching, performance monitoring

### Medium Risk
4. **Brand Inconsistency:** Admin edits could violate brand guidelines
   - **Mitigation:** CMS constraints, color picker limits, image validation, preview mode
5. **Accessibility Gaps:** Non-compliance could lead to legal issues
   - **Mitigation:** WCAG 2.1 AA testing, screen reader testing, keyboard navigation testing
6. **Data Loss:** Accidental deletion of content or bookings
   - **Mitigation:** Soft delete, confirmation dialogs, database backups, undo functionality

### Low Risk
7. **Multilingual Coverage:** Incomplete translations
   - **Mitigation:** Translation management system, fallback to English, professional translation service
8. **Email Deliverability:** Emails ending up in spam
   - **Mitigation:** SPF/DKIM/DMARC setup, reputable email service, unsubscribe links

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)
- Component rendering tests (all public and admin components)
- Utility function tests (date formatting, price calculation, validation)
- Form validation tests (Zod schemas)
- Target: 80% code coverage

### Integration Tests
- API route tests with mocked Supabase client
- Database query tests with test fixtures
- Authentication flow tests (login, logout, session management)
- Booking conflict detection tests

### E2E Tests (Playwright)
- **Public Flow:** Browse services → View schedule → Book activity → Receive confirmation
- **Admin Flow:** Login → Create service → Upload image → Publish → Verify on public site
- **Shop Flow:** Add to cart → Update quantity → Checkout → Order confirmation
- **Visual Regression:** Brand colors, logo rendering, typography consistency

### Accessibility Tests
- Automated: axe-core, Lighthouse accessibility audit
- Manual: Screen reader testing (NVDA, VoiceOver), keyboard navigation
- Color contrast verification (WCAG 2.1 AA)

### Performance Tests
- Lighthouse CI in GitHub Actions
- Core Web Vitals monitoring (LCP, FID, CLS)
- Load testing for booking system (simulate 100 concurrent bookings)

### Brand Consistency Tests
- Automated checks for brand colors in CSS
- Logo image presence verification
- Typography validation (lowercase "healthy corner", uppercase tagline)

---

## Acceptance Checklist

Before marking this feature as complete, verify:

- [ ] All user stories have acceptance criteria met
- [ ] Constitutional compliance verified for all 8 principles
- [ ] Brand guidelines from `BRAND_IMPLEMENTATION.md` followed
- [ ] All images from `/public/images/` properly referenced
- [ ] Supabase RLS policies implemented and tested
- [ ] Admin authentication with role-based access working
- [ ] Booking conflict detection prevents double-booking
- [ ] Core Web Vitals targets achieved (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] WCAG 2.1 AA compliance verified
- [ ] Multilingual support (English + Spanish) functional
- [ ] All E2E tests passing (public, admin, shop flows)
- [ ] Brand consistency tests passing (colors, logo, typography)
- [ ] Netlify deployment successful with custom domain
- [ ] Email notifications working (contact, booking, order confirmations)
- [ ] Documentation complete (README, API docs, deployment guide)
- [ ] Performance monitoring set up (Lighthouse CI, Core Web Vitals)

---

## Next Steps

After specification approval:

1. Run `/speckit.plan` to generate implementation plan
2. Run `/speckit.tasks` to break down into actionable tasks
3. Set up Supabase project and configure RLS policies
4. Initialize Next.js 14 project with TypeScript and Tailwind
5. Configure Netlify deployment with environment variables
6. Create database schema and seed data
7. Implement public pages with brand design
8. Build admin dashboard with CMS features
9. Integrate booking system with conflict detection
10. Add shopping cart and checkout flow
11. Implement multilingual support
12. Write comprehensive test suite
13. Conduct accessibility audit
14. Performance optimization and monitoring
15. Deploy to production and monitor

---

**Specification Status:** Ready for Planning  
**Estimated Complexity:** High (8-12 weeks for MVP)  
**Priority:** P0 (Critical - Platform Foundation)
