# Healthy Corner Constitution Summary

**Version:** 1.0.0  
**Created:** 2025-01-11  
**Location:** `.specify/memory/constitution.md`

---

## Quick Overview

The Healthy Corner Platform Constitution is the authoritative governance document for all development, design, and architectural decisions. This summary provides quick access to key principles and requirements.

### 🎯 Platform Mission

Provide a seamless, accessible, and beautiful digital experience for wellness seekers to discover services, book activities (yoga, ice bathing, etc.), shop for healthy food, and enable administrators to manage all content through an intuitive CMS interface.

---

## 8 Core Principles

### 1. Technology Independence with Constraints ⚙️

**Mandatory Stack:**
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- Backend: Supabase (PostgreSQL + Auth + Storage)
- Deployment: Netlify with CI/CD
- i18n: Next.js i18n (English + Spanish minimum)

**Key Rule:** NO deviations without constitutional amendment.

### 2. Brand Design Integrity 🎨

**Non-Negotiable:**
- Logo: Lime green (#A4B82C) circle with 'h' smile - use `/public/images/logo.png`
- Brand name: "healthy corner" (ALWAYS lowercase)
- Tagline: "ALPSKI ZDRAVILIŠKI KAMP" (ALWAYS UPPERCASE, tracking-[0.4em])
- Colors: Primary #A4B82C, Black #000000, White #FFFFFF
- Design: Minimal, clean, generous white space

**Key Rule:** All design MUST match `BRAND_IMPLEMENTATION.md` and `BRAND_REVIEW.md`.

### 3. User-Centric Design & Accessibility ♿

**Requirements:**
- WCAG 2.1 AA compliance
- Mobile-first responsive design (320px → 1024px+)
- SEO optimization (meta tags, sitemap, structured data)
- Calming animations (Framer Motion with ease-out)
- Lighthouse score: 90+ on all metrics

**Key Rule:** Accessibility is mandatory, not optional.

### 4. Security & Data Integrity 🔒

**Mandatory Security:**
- Supabase RLS on ALL tables
- Admin auth via Supabase (email/password + OAuth)
- Booking conflict detection (server-side)
- Encrypted sensitive data
- API keys in environment variables only

**Key Rule:** Security violations are critical bugs.

### 5. CMS-Driven Content Management 📝

**Admin Dashboard:**
- Route: `/admin` (Supabase Auth protected)
- WYSIWYG editor for rich text
- CRUD for: Pages, Services, Schedules, Menu, Gallery, Bookings
- Image uploads to Supabase Storage
- Link existing images from `/public/images/`

**Key Rule:** All public content MUST be admin-editable.

### 6. Performance & Scalability ⚡

**Targets:**
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Next.js Image optimization for all images
- SSG/ISR for public pages
- CDN caching via Netlify
- Bundle size monitoring

**Key Rule:** Core Web Vitals MUST meet targets.

### 7. Testing & Quality Assurance ✅

**Required Tests:**
- Unit tests: Jest + React Testing Library
- Integration tests: Supabase mocks
- E2E tests: Playwright (critical flows)
- Code quality: ESLint, Prettier, TypeScript strict
- Brand consistency tests (colors, logo, typography)

**Key Rule:** No code without tests.

### 8. Commerce & Booking Business Rules 🛒

**Booking System:**
- Calendar view with availability
- Conflict detection (no double-booking)
- 24hr advance notice, 48hr cancellation
- Activity types: Yoga, Ice Bathing, Workshops

**Online Shop:**
- Product catalog with images
- Shopping cart (localStorage/Supabase)
- Minimal checkout (Stripe optional)
- Admin order management

**Key Rule:** Business logic MUST be enforced server-side.

---

## Brand Assets Reference

**Location:** `/public/images/`

### Core Assets
- `logo.png` - Primary lime green logo
- `logo-black-bg.png` - Logo for dark backgrounds
- `brand-guide.png` - Official brand guidelines
- `hero-bg.jpg` - Hero background (743KB)
- `about-bg.jpg` - About background (431KB)

### Content Assets
- `gallery/` - 13 gallery images
- `icebath breathing/` - 7 ice bath images
- `izbrane hrana/` - 6 healthy food images

---

## Color Palette (Tailwind)

```javascript
colors: {
  primary: '#A4B82C',        // Lime green - brand primary
  'primary-dark': '#8A9824',  // Hover states
  black: '#000000',           // Text/backgrounds
  white: '#FFFFFF',           // Contrast
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    700: '#404040',
    900: '#171717'
  }
}
```

---

## Typography Rules

| Element | Style | Example |
|---------|-------|---------|
| Brand Name | lowercase, bold | "healthy corner" |
| Tagline | UPPERCASE, tracking-[0.4em] | "ALPSKI ZDRAVILIŠKI KAMP" |
| Section Labels | UPPERCASE, tracking-[0.3em] | "ABOUT US" |
| Headlines | text-5xl to text-8xl, font-bold | Large titles |
| Body Text | text-xl, font-light | Paragraph content |

---

## Critical Workflows

- `/speckit.constitution` - Update this constitution
- `/speckit.clarify` - Resolve ambiguities
- `/speckit.specify` - Create feature specs
- `/speckit.plan` - Generate implementation plans
- `/speckit.tasks` - Break down into tasks
- `/speckit.implement` - Execute implementation

---

## Enforcement Rules

### AI Agent Requirements
1. **MUST** cite constitution in every generation step
2. **MUST** run `/speckit.clarify` for violations
3. **MUST** reference brand files (`BRAND_IMPLEMENTATION.md`, `BRAND_REVIEW.md`)
4. **MUST** validate against principles before committing

### Pull Request Checklist
- [ ] Constitutional compliance confirmed
- [ ] Brand guidelines followed
- [ ] Tests written and passing
- [ ] Accessibility checked
- [ ] Performance metrics met
- [ ] Security review completed

### Violation Handling
- **Minor:** Fix in same PR
- **Major:** Reject PR, require clarification
- **Repeated:** Escalate to maintainers

---

## Next Steps (TODOs)

### Immediate
- [ ] Create `.specify/templates/plan-template.md`
- [ ] Create `.specify/templates/spec-template.md`
- [ ] Create `.specify/templates/tasks-template.md`
- [ ] Create `.specify/templates/commands/*.md`

### Setup
- [ ] Initialize Supabase project
- [ ] Configure RLS policies
- [ ] Set up Netlify deployment
- [ ] Create test suite structure
- [ ] Configure ESLint + Prettier

### Documentation
- [ ] Create README.md with setup instructions
- [ ] Document API endpoints
- [ ] Create deployment guide
- [ ] Write contribution guidelines

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-11 | Initial constitution with 8 core principles |

---

## Contact & Support

For constitutional questions or amendments:
1. Open GitHub issue with label `constitution-amendment`
2. Run `/speckit.clarify` workflow for ambiguities
3. Contact project maintainers for urgent matters

---

**Full Constitution:** `.specify/memory/constitution.md`  
**Brand Guidelines:** `BRAND_IMPLEMENTATION.md`, `BRAND_REVIEW.md`  
**Project Root:** `/home/jack/CascadeProjects/healthy corner spec/`
