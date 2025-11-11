# Quickstart Guide: Healthy Corner Platform

**For Developers** - Get up and running in 15 minutes

---

## Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (already set up)
- Netlify account

---

## 1. Clone & Install (2 min)

```bash
# Clone repository
git clone https://github.com/Tony33344/healthycornerspec1.git
cd healthycornerspec1

# Install dependencies (will be created after Next.js init)
npm install
```

---

## 2. Environment Setup (3 min)

The `.env.local` file already exists with Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jwxenutezijwyrguqicv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Verify connection:**
```bash
# Test Supabase connection (after Next.js setup)
npm run test:connection
```

---

## 3. Database Setup (5 min)

### Create Tables

Go to Supabase SQL Editor: https://app.supabase.com/project/jwxenutezijwyrguqicv/sql

Run the SQL from `specs/001-wellness-platform/plan/data-model.md`:

```sql
-- Copy and paste the CREATE TABLE statements
-- from data-model.md into Supabase SQL Editor
```

### Enable RLS

```sql
-- Enable Row Level Security on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ... etc
```

### Create Admin User

1. Go to Auth → Users: https://app.supabase.com/project/jwxenutezijwyrguqicv/auth/users
2. Click "Add user" → Create with email/password
3. Run SQL to set admin role:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-admin@example.com';
```

---

## 4. Start Development Server (1 min)

```bash
# Start Next.js dev server
npm run dev

# Open browser
open http://localhost:3000
```

---

## 5. Verify Setup (4 min)

### Check Public Pages
- ✅ Home page loads with hero section
- ✅ Services page shows catalog
- ✅ Menu page displays food items
- ✅ Schedule page shows calendar

### Check Admin Dashboard
- ✅ Login at `/admin` with admin credentials
- ✅ Dashboard shows analytics
- ✅ Can create/edit services
- ✅ Can view bookings

### Check Brand Design
- ✅ Logo displays from `/public/images/logo.png`
- ✅ Lime green (#A4B82C) color appears
- ✅ "healthy corner" is lowercase
- ✅ Images load from `/public/images/`

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run Playwright tests
npm run test:watch       # Watch mode

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm run type-check       # TypeScript check

# Database
npm run db:migrate       # Run migrations (if using)
npm run db:seed          # Seed test data
npm run db:reset         # Reset database

# Deployment
netlify deploy           # Deploy preview
netlify deploy --prod    # Deploy production
```

---

## Project Structure Overview

```
├── app/                    # Next.js 14 App Router
│   ├── (public)/          # Public routes
│   │   ├── page.tsx       # Home page
│   │   ├── services/      # Services catalog
│   │   ├── menu/          # Food menu
│   │   └── schedule/      # Weekly calendar
│   ├── (admin)/           # Admin routes
│   │   └── admin/         # Dashboard
│   ├── api/               # API routes
│   └── components/        # React components
├── public/                # Static assets
│   └── images/            # Brand images (already present)
├── lib/                   # Utilities
│   ├── supabase/          # Supabase client
│   └── utils/             # Helper functions
├── tests/                 # Test suites
└── .specify/              # Governance docs
```

---

## Key Files to Know

### Configuration
- `tailwind.config.ts` - Brand colors (#A4B82C)
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript settings
- `.env.local` - Environment variables (gitignored)

### Documentation
- `.specify/memory/constitution.md` - Project governance
- `specs/001-wellness-platform/spec.md` - Feature specification
- `specs/001-wellness-platform/plan/plan.md` - Implementation plan
- `BRAND_IMPLEMENTATION.md` - Brand guidelines

---

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow constitution principles
- Use brand colors and typography
- Write tests for new features
- Reference images from `/public/images/`

### 3. Test Locally
```bash
npm test
npm run test:e2e
npm run lint
```

### 4. Commit with Constitutional Reference
```bash
git commit -m "feat: add hero section with brand imagery

- Use /public/images/hero-bg.jpg as background
- Display logo from /public/images/logo.png
- Apply brand typography (lowercase 'healthy corner')

Refs: .specify/memory/constitution.md - Principle 2"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
# Create PR on GitHub
# Netlify will create preview deployment automatically
```

---

## Troubleshooting

### Issue: Supabase connection error
**Solution:** Verify `.env.local` has correct credentials

### Issue: Images not loading
**Solution:** Ensure images are in `/public/images/` and use `/images/` path

### Issue: TypeScript errors
**Solution:** Run `npm run type-check` and fix type issues

### Issue: Build fails
**Solution:** Check `npm run build` output for errors

### Issue: Tests failing
**Solution:** Run `npm test -- --verbose` for detailed output

---

## Next Steps

1. **Read the Constitution:** `.specify/memory/constitution.md`
2. **Review Specification:** `specs/001-wellness-platform/spec.md`
3. **Check Implementation Plan:** `specs/001-wellness-platform/plan/plan.md`
4. **Start with Hero Section:** Implement US-001 first
5. **Follow Brand Guidelines:** `BRAND_IMPLEMENTATION.md`

---

## Support Resources

- **GitHub Issues:** https://github.com/Tony33344/healthycornerspec1/issues
- **Supabase Dashboard:** https://app.supabase.com/project/jwxenutezijwyrguqicv
- **Netlify Dashboard:** https://app.netlify.com/projects/healthycornerspec1
- **Documentation:** All `.md` files in project root and `.specify/` folder

---

**Ready to build!** 🚀

Start with: `npm run dev` and open http://localhost:3000
