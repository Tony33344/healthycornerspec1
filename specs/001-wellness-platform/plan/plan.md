# Implementation Plan: Wellness Retreat Platform

**Feature ID:** 001-wellness-platform  
**Plan Version:** 1.0.0  
**Created:** 2025-01-11  
**Status:** Active  
**Branch:** `feature/001-wellness-platform`

---

## Constitutional Compliance Check

### Principle 1: Technology Stack ✅
- Next.js 14 (App Router): ✅ Specified
- TypeScript (strict mode): ✅ Required
- Tailwind CSS: ✅ With brand colors (#A4B82C)
- Framer Motion: ✅ For animations
- Supabase: ✅ Database, auth, storage
- Next.js i18n: ✅ English + Spanish

### Principle 2: Brand Design ✅
- Lime green #A4B82C: ✅ Primary color
- Lowercase "healthy corner": ✅ Typography rule
- `/public/images/` assets: ✅ Referenced throughout
- Logo usage: ✅ logo.png, logo-black-bg.png

### Principle 3: Accessibility ✅
- WCAG 2.1 AA: ✅ Required
- Mobile-first: ✅ 320px → 1024px+
- SEO optimization: ✅ Meta tags, sitemap

### Principle 4: Security ✅
- Supabase RLS: ✅ All tables
- Admin auth: ✅ Supabase Auth
- Booking conflicts: ✅ Server-side detection

### Principle 5: CMS ✅
- Admin dashboard: ✅ `/admin` route
- WYSIWYG editor: ✅ Tiptap
- CRUD operations: ✅ All content types

### Principle 6: Performance ✅
- LCP < 2.5s: ✅ Target
- Next.js optimization: ✅ SSG/ISR
- Netlify deployment: ✅ Configured

### Principle 7: Testing ✅
- Jest: ✅ Unit tests
- Playwright: ✅ E2E tests
- Brand tests: ✅ Colors, typography

### Principle 8: Commerce ✅
- Booking calendar: ✅ Weekly view
- Shopping cart: ✅ localStorage + Supabase
- Admin tools: ✅ Management dashboard

**Gate Status:** ✅ PASS - All principles satisfied

---

## Technical Context

### Technology Stack
- **Frontend:** Next.js 14.0+ (App Router), React 18+
- **Language:** TypeScript 5.0+ (strict mode)
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 10+
- **Backend:** Supabase (PostgreSQL 15+, Auth, Storage, Edge Functions)
- **Deployment:** Netlify
- **Testing:** Jest 29+, Playwright 1.40+, React Testing Library
- **Code Quality:** ESLint, Prettier, Husky

### Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.38.0",
    "framer-motion": "^10.16.0",
    "zod": "^3.22.0",
    "next-intl": "^3.0.0",
    "@tiptap/react": "^2.1.0",
    "@tiptap/starter-kit": "^2.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@playwright/test": "^1.40.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

### Project Structure
```
healthy-corner-spec/
├── app/                          # Next.js 14 App Router
│   ├── (public)/                 # Public routes
│   │   ├── page.tsx              # Home (hero, about)
│   │   ├── services/             # Service catalog
│   │   ├── menu/                 # Food menu
│   │   ├── schedule/             # Weekly calendar
│   │   ├── gallery/              # Photo gallery
│   │   ├── shop/                 # Online shop
│   │   └── contact/              # Contact form
│   ├── (admin)/                  # Admin routes
│   │   └── admin/
│   │       ├── dashboard/        # Analytics dashboard
│   │       ├── services/         # Service CRUD
│   │       ├── menu/             # Menu CRUD
│   │       ├── bookings/         # Booking management
│   │       ├── schedule/         # Schedule builder
│   │       └── settings/         # Site settings
│   ├── api/                      # API routes
│   │   ├── bookings/             # Booking endpoints
│   │   ├── services/             # Service endpoints
│   │   └── contact/              # Contact form
│   ├── components/               # Shared components
│   │   ├── ui/                   # UI primitives
│   │   ├── layout/               # Layout components
│   │   └── features/             # Feature components
│   ├── lib/                      # Utilities
│   │   ├── supabase/             # Supabase client
│   │   ├── utils/                # Helper functions
│   │   └── validations/          # Zod schemas
│   └── styles/                   # Global styles
├── public/                       # Static assets
│   └── images/                   # Brand images
├── .specify/                     # Governance
├── specs/                        # Specifications
└── tests/                        # Test suites
    ├── unit/                     # Jest tests
    └── e2e/                      # Playwright tests
```

---

## Phase 0: Research & Decisions

### Research Tasks Completed

#### 1. Next.js 14 App Router Best Practices
**Decision:** Use App Router with Server Components
**Rationale:** Better performance, streaming SSR, simplified data fetching
**Implementation:**
- Server Components for data fetching (default)
- Client Components only when needed (interactivity, hooks)
- Route groups for organization: `(public)`, `(admin)`

#### 2. Supabase RLS Patterns
**Decision:** Implement RLS on all tables with role-based policies
**Rationale:** Defense-in-depth security, prevents data leaks
**Implementation:**
- Public SELECT for published content
- User-scoped INSERT/UPDATE for bookings
- Admin-only access for CMS operations

#### 3. Multilingual Strategy
**Decision:** Use `next-intl` with middleware
**Rationale:** Official Next.js i18n support, automatic routing
**Implementation:**
- Middleware for locale detection
- JSON translation files: `/locales/en.json`, `/locales/es.json`
- Database fields: `title_en`, `title_es`

#### 4. Image Optimization
**Decision:** Next.js Image component with responsive sizes
**Rationale:** Automatic WebP conversion, lazy loading, CDN caching
**Implementation:**
- Static images from `/public/images/`
- Dynamic images from Supabase Storage
- Responsive srcset generation

#### 5. State Management
**Decision:** React Server Components + URL state + Supabase real-time
**Rationale:** Minimize client-side state, leverage server capabilities
**Implementation:**
- Server Components for initial data
- URL search params for filters
- Supabase subscriptions for real-time updates

---

## Phase 1: Data Model & Contracts

### Database Schema

#### Core Tables

**services**
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  description_en TEXT,
  description_es TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  duration INTEGER CHECK (duration > 0), -- minutes
  capacity INTEGER CHECK (capacity > 0),
  category TEXT NOT NULL CHECK (category IN ('Yoga', 'Ice Bathing', 'Workshops', 'Packages')),
  image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_services_status ON services(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_category ON services(category) WHERE deleted_at IS NULL;
```

**menu_items**
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  description_en TEXT,
  description_es TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  ingredients_en TEXT,
  ingredients_es TEXT,
  allergens TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('Snacks', 'Meals', 'Beverages', 'Supplements')),
  image_url TEXT,
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
```

**schedules**
```sql
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  time TIME NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  instructor TEXT,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_schedules_day_time ON schedules(day_of_week, time);
```

**bookings**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_user_booking ON bookings(user_id, schedule_id, booking_date) WHERE status != 'cancelled';
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

**orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**carts**
```sql
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**testimonials**
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_es TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**gallery_images**
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  caption_en TEXT,
  caption_es TEXT,
  alt_text_en TEXT NOT NULL,
  alt_text_es TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**pages**
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_es TEXT NOT NULL,
  content_en TEXT,
  content_es TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**newsletter_subscribers**
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);
```

### RLS Policies

```sql
-- Services: Public can view published
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services"
  ON services FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Admin can manage services"
  ON services FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Bookings: Users can view/create own, admin can manage all
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage all bookings"
  ON bookings FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Similar policies for other tables...
```

### API Contracts

See `/contracts/` directory for OpenAPI specifications.

---

## Phase 2: Implementation Phases

### Phase 2.1: Foundation (Week 1-2)

**Tasks:**
1. Initialize Next.js 14 project with TypeScript
2. Configure Tailwind with brand colors
3. Set up Supabase client and types
4. Create database schema and RLS policies
5. Configure ESLint, Prettier, Husky
6. Set up testing infrastructure (Jest, Playwright)
7. Create base layout components

**Deliverables:**
- Working Next.js app with brand styling
- Database schema deployed to Supabase
- CI/CD pipeline configured
- Test suite structure

### Phase 2.2: Public Pages (Week 3-5)

**Tasks:**
1. Hero & About section (US-001)
2. Service catalog (US-002)
3. Menu section (US-003)
4. Weekly schedule calendar (US-004)
5. Gallery & testimonials (US-005)
6. Contact & newsletter forms (US-006)
7. Shopping cart (US-007)
8. Multilingual support (US-008)

**Deliverables:**
- All public-facing pages functional
- Brand design implemented
- Mobile-responsive
- SEO optimized

### Phase 2.3: Admin Dashboard (Week 6-8)

**Tasks:**
1. Admin authentication (US-009)
2. Dashboard with analytics (US-009)
3. Content management (US-010)
4. Service & menu CRUD (US-011)
5. Booking management (US-012)
6. Schedule builder (US-013)
7. Advanced search & bulk operations (US-014)
8. Brand consistency enforcement (US-015)

**Deliverables:**
- Fully functional admin CMS
- WYSIWYG editor integrated
- Booking management system
- Analytics dashboard

### Phase 2.4: Commerce & Booking (Week 9-10)

**Tasks:**
1. Booking conflict detection
2. Payment integration (Stripe optional)
3. Order management
4. Email notifications
5. Cart persistence
6. Checkout flow

**Deliverables:**
- Complete booking system
- Shopping cart with checkout
- Email notifications working

### Phase 2.5: Testing & Optimization (Week 11-12)

**Tasks:**
1. Write comprehensive test suite
2. Performance optimization
3. Accessibility audit
4. Security review
5. Brand consistency tests
6. Load testing

**Deliverables:**
- 80%+ test coverage
- Lighthouse score 90+
- WCAG 2.1 AA compliance
- Production-ready platform

---

## Success Metrics

- **Performance:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibility:** WCAG 2.1 AA compliance
- **Test Coverage:** 80%+ unit tests, 100% E2E critical flows
- **Brand Consistency:** 100% adherence to brand guidelines
- **Functionality:** All 15 user stories implemented and tested

---

## Risk Mitigation

1. **Booking Conflicts:** Server-side validation + database constraints
2. **Performance:** Next.js optimization + CDN caching + image optimization
3. **Security:** Supabase RLS + input validation + rate limiting
4. **Brand Consistency:** Automated tests + CMS constraints + preview mode

---

**Plan Status:** Ready for Implementation  
**Next Step:** Run `/speckit.tasks` to generate actionable task list
