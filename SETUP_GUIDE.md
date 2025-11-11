# Healthy Corner Platform - Setup Guide

**Quick Start Guide for GitHub, Supabase, and Netlify Integration**

---

## ✅ Completed Steps

### 1. GitHub Connection - DONE ✅

**Repository:** https://github.com/Tony33344/healthycornerspec1

**Status:** Connected and pushed to `main` branch

**Commits:**
- Initial commit with constitution, specifications, and brand assets
- Added Netlify configuration and README

**Verification:**
```bash
git remote -v
# origin  https://github.com/Tony33344/healthycornerspec1.git (fetch)
# origin  https://github.com/Tony33344/healthycornerspec1.git (push)
```

### 2. Supabase Connection - DONE ✅

**Project URL:** https://jwxenutezijwyrguqicv.supabase.co

**Configuration:** `.env.local` (gitignored)
```env
NEXT_PUBLIC_SUPABASE_URL=https://jwxenutezijwyrguqicv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Status:** Credentials configured, ready for database setup

---

## 🚀 Next Step: Netlify Deployment

### Option 1: Complete Interactive Setup (Recommended)

The `netlify init` command is currently running and waiting for input. Complete it by:

1. **Site name:** Type `healthycornerspec1` (or your preferred name)
2. **Build command:** Accept default or type `npm run build`
3. **Publish directory:** Accept default or type `.next`
4. **Connect to GitHub:** Select `Yes` to enable automatic deployments

**Interactive Prompts:**
```bash
? Site name: healthycornerspec1
? Your build command: npm run build
? Directory to deploy: .next
? Link to GitHub repository: Yes
```

### Option 2: Manual Netlify Setup (Alternative)

If the interactive setup doesn't work, use the Netlify UI:

1. **Go to:** https://app.netlify.com/
2. **Click:** "Add new site" → "Import an existing project"
3. **Connect:** Select GitHub and authorize
4. **Choose repository:** `Tony33344/healthycornerspec1`
5. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Branch:** `main`

6. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://jwxenutezijwyrguqicv.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `[your anon key from .env.local]`

7. **Deploy:** Click "Deploy site"

### Option 3: CLI Setup (After Init Completes)

Once `netlify init` completes, set environment variables:

```bash
# Set Supabase environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://jwxenutezijwyrguqicv.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "YOUR_ANON_KEY_HERE"

# Deploy to production
netlify deploy --prod
```

---

## 📋 Post-Deployment Checklist

After Netlify deployment completes:

### 1. Verify Deployment
- [ ] Site is live at Netlify URL (e.g., `healthycornerspec1.netlify.app`)
- [ ] GitHub integration enabled (auto-deploy on push to main)
- [ ] Environment variables set in Netlify UI
- [ ] Build logs show successful deployment

### 2. Update README
- [ ] Add Netlify badge to README.md
- [ ] Update site URL in documentation
- [ ] Commit and push changes

### 3. Configure Custom Domain (Optional)
- [ ] Purchase domain (e.g., `healthycorner.si`)
- [ ] Add domain in Netlify: Site settings → Domain management
- [ ] Configure DNS records
- [ ] Enable HTTPS (automatic with Netlify)

---

## 🗄️ Next: Supabase Database Setup

### Required Database Tables

Following Constitution Principle 4 (Security & Data Integrity), create tables with RLS:

#### 1. Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER, -- minutes
  capacity INTEGER,
  category TEXT NOT NULL, -- 'Yoga', 'Ice Bathing', 'Workshops', 'Packages'
  image_url TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policy: Public can view published services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services"
  ON services FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Admin can manage services"
  ON services FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

#### 2. Menu Items Table
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  ingredients TEXT,
  allergens TEXT[], -- array of allergen names
  category TEXT NOT NULL, -- 'Snacks', 'Meals', 'Beverages', 'Supplements'
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policy
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published menu items"
  ON menu_items FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Admin can manage menu items"
  ON menu_items FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

#### 3. Schedules Table
```sql
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, ..., 6=Saturday
  time TIME NOT NULL,
  activity_id UUID REFERENCES services(id),
  instructor TEXT,
  capacity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view schedules"
  ON schedules FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage schedules"
  ON schedules FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

#### 4. Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  schedule_id UUID REFERENCES schedules(id),
  booking_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy
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

-- Conflict detection constraint
CREATE UNIQUE INDEX unique_user_booking 
  ON bookings(user_id, schedule_id, booking_date)
  WHERE deleted_at IS NULL;
```

#### 5. Additional Tables

Create remaining tables following the same pattern:
- `orders` - Shop orders
- `carts` - Shopping carts
- `testimonials` - Guest reviews
- `newsletter_subscribers` - Email list
- `gallery_images` - Gallery photos
- `pages` - CMS content

**Full SQL Schema:** See `specs/001-wellness-platform/spec.md` for complete data model

---

## 🔐 Supabase Admin Role Setup

### Create Admin User

1. **Go to:** https://app.supabase.com/project/jwxenutezijwyrguqicv/auth/users
2. **Create user:** Add admin email and password
3. **Set role:** Run SQL in Supabase SQL Editor:

```sql
-- Update user metadata to add admin role
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-admin-email@example.com';
```

---

## 🎨 Next.js Project Setup

### Create Next.js 14 App

Once Netlify is configured, initialize the Next.js project:

```bash
# Create Next.js 14 app with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install @supabase/supabase-js framer-motion zod
npm install -D @types/node @types/react @types/react-dom

# Install dev dependencies
npm install -D eslint prettier eslint-config-prettier
npm install -D @playwright/test jest @testing-library/react @testing-library/jest-dom
```

### Configure Tailwind with Brand Colors

Edit `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A4B82C',        // Lime green - brand primary
        'primary-dark': '#8A9824',  // Darker lime for hover states
        black: '#000000',
        white: '#FFFFFF',
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          700: '#404040',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📝 Development Workflow

### 1. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 2. Create Feature Branch
```bash
git checkout -b feature/hero-section
```

### 3. Implement Following Constitution
- Reference `.specify/memory/constitution.md`
- Follow brand guidelines from `BRAND_IMPLEMENTATION.md`
- Use images from `/public/images/`
- Write tests for new features

### 4. Commit and Push
```bash
git add .
git commit -m "feat: add hero section with brand imagery

- Use /public/images/hero-bg.jpg as background
- Display logo from /public/images/logo.png
- Apply brand typography (lowercase 'healthy corner')
- Implement fade-in animation with Framer Motion

Refs: .specify/memory/constitution.md - Principle 2"

git push origin feature/hero-section
```

### 5. Create Pull Request
- Netlify will create preview deployment automatically
- Review checklist in PR template
- Verify constitutional compliance

---

## 🎯 Immediate Next Steps

1. **Complete Netlify Init** (currently in progress)
2. **Verify deployment** at Netlify URL
3. **Set up Supabase database** with tables and RLS policies
4. **Create admin user** in Supabase Auth
5. **Initialize Next.js project** with TypeScript and Tailwind
6. **Configure brand colors** in Tailwind config
7. **Start implementing** hero section (first user story)

---

## 📞 Support Resources

- **Constitution:** `.specify/memory/constitution.md`
- **Specification:** `specs/001-wellness-platform/spec.md`
- **Brand Guidelines:** `BRAND_IMPLEMENTATION.md`
- **GitHub:** https://github.com/Tony33344/healthycornerspec1
- **Supabase Dashboard:** https://app.supabase.com/project/jwxenutezijwyrguqicv
- **Netlify Dashboard:** https://app.netlify.com/ (after setup)

---

## ✅ Status Summary

| Component | Status | Next Action |
|-----------|--------|-------------|
| GitHub | ✅ Connected | Push code changes |
| Supabase | ✅ Configured | Create database schema |
| Netlify | 🔄 In Progress | Complete `netlify init` |
| Next.js | ⏳ Pending | Initialize project |
| Database | ⏳ Pending | Run SQL migrations |
| Admin User | ⏳ Pending | Create in Supabase Auth |

**Current Step:** Complete Netlify initialization (interactive prompts)

---

**Ready to build! 🚀**
