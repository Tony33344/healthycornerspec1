# Healthy Corner Platform

**Full-Stack Wellness Retreat Web Platform for Camp Menina**

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

---

## 🎯 Project Overview

Healthy Corner is a multilingual wellness retreat web platform providing:
- **Public Website:** Service catalog, booking system, online shop, gallery, testimonials
- **Admin CMS:** WordPress-like content management, booking management, analytics dashboard
- **Brand Integration:** Lime green (#A4B82C) design, nature-inspired visuals, professional UX

**Constitutional Governance:** All development follows [`.specify/memory/constitution.md`](.specify/memory/constitution.md) v1.0.0

---

## 📋 Quick Links

- **Constitution:** [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
- **Feature Spec:** [`specs/001-wellness-platform/spec.md`](specs/001-wellness-platform/spec.md)
- **Brand Guidelines:** [`BRAND_IMPLEMENTATION.md`](BRAND_IMPLEMENTATION.md), [`BRAND_REVIEW.md`](BRAND_REVIEW.md)
- **GitHub Repository:** https://github.com/Tony33344/healthycornerspec1
- **Supabase Project:** https://jwxenutezijwyrguqicv.supabase.co

---

## 🛠️ Technology Stack

Following **Constitution Principle 1** (Technology Independence with Constraints):

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Deployment:** Netlify with CI/CD
- **Testing:** Jest, React Testing Library, Playwright
- **Code Quality:** ESLint, Prettier, TypeScript strict mode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (already configured)
- Netlify account (for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tony33344/healthycornerspec1.git
   cd healthycornerspec1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   The `.env.local` file is already configured with Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://jwxenutezijwyrguqicv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
healthy-corner-spec/
├── .specify/                    # Project governance
│   ├── memory/
│   │   └── constitution.md      # Project constitution v1.0.0
│   └── templates/               # Spec templates (to be created)
├── specs/                       # Feature specifications
│   └── 001-wellness-platform/
│       ├── spec.md              # Main specification
│       └── checklists/
│           └── requirements.md  # Quality checklist
├── public/                      # Static assets
│   ├── images/
│   │   ├── logo.png             # Primary logo (lime green)
│   │   ├── logo-black-bg.png    # Logo for dark backgrounds
│   │   ├── hero-bg.jpg          # Hero section background
│   │   ├── about-bg.jpg         # About section background
│   │   ├── gallery/             # 13 gallery images
│   │   ├── icebath breathing/   # 7 ice bath activity images
│   │   └── izbrane hrana/       # 6 healthy food images
│   └── robots.txt
├── BRAND_IMPLEMENTATION.md      # Brand design guidelines
├── BRAND_REVIEW.md              # Brand review checklist
├── CONSTITUTION_SUMMARY.md      # Quick reference guide
├── netlify.toml                 # Netlify configuration
├── .env.local                   # Environment variables (gitignored)
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 🎨 Brand Guidelines

Following **Constitution Principle 2** (Brand Design Integrity):

### Colors
- **Primary:** `#A4B82C` (Lime Green)
- **Black:** `#000000`
- **White:** `#FFFFFF`
- **Neutrals:** Gray scale (50, 100, 700, 900)

### Typography
- **Brand Name:** "healthy corner" (ALWAYS lowercase, bold)
- **Tagline:** "ALPSKI ZDRAVILIŠKI KAMP" (ALWAYS uppercase, tracking-[0.4em])
- **Section Labels:** UPPERCASE with tracking-[0.3em]
- **Headlines:** text-5xl to text-8xl, font-bold
- **Body Text:** text-xl, font-light

### Logo Usage
- Use `/public/images/logo.png` for primary logo
- Use `/public/images/logo-black-bg.png` for dark backgrounds
- NEVER recreate logo with CSS or SVG

**Full Guidelines:** See [`BRAND_IMPLEMENTATION.md`](BRAND_IMPLEMENTATION.md)

---

## 🔐 Supabase Setup

### Current Configuration

**Project URL:** https://jwxenutezijwyrguqicv.supabase.co  
**Status:** ✅ Connected

### Database Schema (To Be Created)

Following **Constitution Principle 4** (Security & Data Integrity):

Required tables with Row Level Security (RLS):
- `services` - Wellness packages and activities
- `menu_items` - Healthy food products
- `schedules` - Weekly activity schedules
- `bookings` - User reservations
- `orders` - Shop orders
- `carts` - Shopping carts
- `testimonials` - Guest reviews
- `newsletter_subscribers` - Email subscribers
- `gallery_images` - Gallery photos
- `pages` - CMS content

### RLS Policies

- **Public SELECT:** Published services, menu items, schedules, testimonials, gallery, pages
- **Authenticated INSERT:** Users can create bookings (own user_id only)
- **Admin FULL ACCESS:** Admin role required for all CMS operations

---

## 🌐 Netlify Deployment

### Initial Setup

1. **Login to Netlify:**
   ```bash
   netlify login
   ```

2. **Initialize new site:**
   ```bash
   netlify init
   ```
   
   Follow prompts:
   - **Team:** Select your team
   - **Site name:** `healthycornerspec1` (or your preferred name)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

3. **Set environment variables:**
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://jwxenutezijwyrguqicv.supabase.co"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "YOUR_ANON_KEY"
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Automatic Deployments

Once connected to GitHub, Netlify will automatically deploy:
- **Production:** On push to `main` branch
- **Preview:** On pull requests

### Configuration

Netlify settings are defined in [`netlify.toml`](netlify.toml):
- Build command: `npm run build`
- Publish directory: `.next`
- Headers for security and caching
- Redirects for Next.js App Router

---

## 🧪 Testing

Following **Constitution Principle 7** (Testing & Quality Assurance):

### Run Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Linting
npm run lint

# Type checking
npm run type-check
```

### Test Coverage

- **Unit Tests:** Jest + React Testing Library (80% coverage target)
- **Integration Tests:** Supabase mocks
- **E2E Tests:** Playwright (public, admin, shop flows)
- **Accessibility Tests:** axe-core, manual screen reader testing
- **Performance Tests:** Lighthouse CI, Core Web Vitals monitoring

---

## 📊 Performance Targets

Following **Constitution Principle 6** (Performance & Scalability):

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Lighthouse Score:** 90+ on all metrics

---

## 🌍 Multilingual Support

Following **Constitution Principle 1** (Multilingual Content):

- **Supported Languages:** English (en), Spanish (es)
- **Implementation:** Next.js i18n with next-intl
- **URL Structure:** `/en/services`, `/es/servicios`
- **Content:** CMS supports language-specific fields (title_en, title_es)

---

## 🔒 Security

Following **Constitution Principle 4** (Security & Data Integrity):

- **Authentication:** Supabase Auth (email/password + OAuth)
- **Authorization:** Row Level Security (RLS) on all tables
- **API Security:** Rate limiting (100 req/min per IP)
- **Input Validation:** Zod schemas on all forms
- **Environment Variables:** Never commit `.env.local` to Git

---

## 📝 Development Workflow

### Creating New Features

1. **Run specification workflow:**
   ```bash
   /speckit.specify "Feature description"
   ```

2. **Generate implementation plan:**
   ```bash
   /speckit.plan
   ```

3. **Break down into tasks:**
   ```bash
   /speckit.tasks
   ```

4. **Implement:**
   ```bash
   /speckit.implement
   ```

### Constitutional Compliance

All code changes MUST:
- Cite the constitution in commit messages
- Follow brand guidelines
- Include tests
- Meet accessibility standards
- Achieve performance targets

**Violations require:** `/speckit.clarify` workflow

---

## 🤝 Contributing

### Pull Request Checklist

- [ ] Constitutional compliance confirmed
- [ ] Brand guidelines followed
- [ ] Tests written and passing
- [ ] Accessibility checked (WCAG 2.1 AA)
- [ ] Performance metrics met (Lighthouse 90+)
- [ ] Security review completed
- [ ] Documentation updated

### Commit Message Format

Follow conventional commits:
```
feat: add booking calendar with conflict detection
fix: resolve double-booking issue in schedule
docs: update API documentation
style: apply brand colors to cart component
test: add E2E tests for checkout flow
```

---

## 📚 Documentation

- **Constitution:** [`.specify/memory/constitution.md`](.specify/memory/constitution.md) - Project governance
- **Feature Spec:** [`specs/001-wellness-platform/spec.md`](specs/001-wellness-platform/spec.md) - Detailed requirements
- **Brand Guidelines:** [`BRAND_IMPLEMENTATION.md`](BRAND_IMPLEMENTATION.md) - Visual design rules
- **Quick Reference:** [`CONSTITUTION_SUMMARY.md`](CONSTITUTION_SUMMARY.md) - Constitution summary

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Supabase connection error  
**Solution:** Verify `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Issue:** Images not loading  
**Solution:** Ensure images are in `/public/images/` folder and referenced as `/images/filename.jpg`

**Issue:** Build fails on Netlify  
**Solution:** Check `netlify.toml` configuration and environment variables in Netlify UI

**Issue:** Brand colors not applying  
**Solution:** Verify Tailwind config includes brand colors: `primary: '#A4B82C'`

---

## 📞 Support

- **GitHub Issues:** https://github.com/Tony33344/healthycornerspec1/issues
- **Constitutional Questions:** Run `/speckit.clarify` workflow
- **Supabase Dashboard:** https://app.supabase.com/project/jwxenutezijwyrguqicv

---

## 📄 License

[Add license information]

---

## 🙏 Acknowledgments

- **Camp Menina** - Wellness retreat inspiration
- **Brand Design** - Marko Marinšek studio ma—ma_Logatip (September 2025)
- **Constitutional Framework** - SpecKit workflows

---

**Built with ❤️ for wellness seekers**

*"healthy corner" - ALPSKI ZDRAVILIŠKI KAMP*
