# Quick Start Commands

**Fast reference for common tasks**

---

## 🚀 Initial Setup (One-Time)

```bash
# 1. Complete Netlify initialization (currently in progress)
# Answer the prompts:
#   - Site name: healthycornerspec1
#   - Build command: npm run build
#   - Publish directory: .next

# 2. Set Supabase environment variables in Netlify
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://jwxenutezijwyrguqicv.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "YOUR_KEY_FROM_.env.local"

# 3. Initialize Next.js project (when ready)
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# 4. Install Healthy Corner dependencies
npm install @supabase/supabase-js framer-motion zod
npm install -D @playwright/test jest @testing-library/react
```

---

## 📦 Daily Development

```bash
# Start development server
npm run dev

# Run tests
npm test                  # Unit tests
npm run test:e2e         # E2E tests (Playwright)
npm run lint             # Linting
npm run type-check       # TypeScript check

# Build for production
npm run build
```

---

## 🌐 Git & Deployment

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes (constitutional format)
git add .
git commit -m "feat: your feature description

- Detail 1
- Detail 2

Refs: .specify/memory/constitution.md - Principle X"

# Push to GitHub (triggers Netlify preview)
git push origin feature/your-feature-name

# Deploy to production (after merge to main)
git checkout main
git pull origin main
# Netlify auto-deploys on push to main
```

---

## 🗄️ Supabase Quick Commands

```bash
# View Supabase project
open https://app.supabase.com/project/jwxenutezijwyrguqicv

# Test connection (in Node.js/browser console)
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  'https://jwxenutezijwyrguqicv.supabase.co',
  'YOUR_ANON_KEY'
)
const { data, error } = await supabase.from('services').select('*')
console.log(data, error)
```

---

## 🌐 Netlify Quick Commands

```bash
# Check status
netlify status

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod

# View site
netlify open:site

# View admin dashboard
netlify open:admin

# Set environment variable
netlify env:set KEY "value"

# List environment variables
netlify env:list
```

---

## 🎨 Brand Asset Paths

```tsx
// Logo (use in components)
import Image from 'next/image'

<Image 
  src="/images/logo.png" 
  alt="Healthy Corner Logo"
  width={160}
  height={160}
/>

// Hero background
<Image 
  src="/images/hero-bg.jpg"
  alt="Camp Menina Wellness Retreat"
  fill
  priority
  className="object-cover"
/>

// Gallery images (13 available)
<Image src="/images/gallery/DSC_4866.JPG" ... />

// Ice bath images (7 available)
<Image src="/images/icebath breathing/DSC_4910.JPG" ... />

// Food images (6 available)
<Image src="/images/izbrane hrana/DSC_4866.JPG" ... />
```

---

## 🎨 Brand Colors (Tailwind)

```tsx
// Primary lime green
className="bg-primary text-white"
className="text-primary"
className="border-primary"
className="hover:bg-primary-dark"

// Typography
className="text-8xl font-bold lowercase"  // "healthy corner"
className="text-sm uppercase tracking-[0.4em]"  // "ALPSKI ZDRAVILIŠKI KAMP"
className="text-sm uppercase tracking-[0.3em]"  // Section labels

// Spacing
className="py-24 md:py-40"  // Section padding
className="mb-20"  // Section margin
```

---

## 📋 Constitutional Workflows

```bash
# Create new feature specification
/speckit.specify "Feature description"

# Generate implementation plan
/speckit.plan

# Break down into tasks
/speckit.tasks

# Implement feature
/speckit.implement

# Resolve ambiguities
/speckit.clarify
```

---

## 🔍 Quick Checks

```bash
# Verify GitHub connection
git remote -v

# Check Netlify status
netlify status

# Verify Supabase credentials
cat .env.local

# Check brand assets
ls -la public/images/
ls -la public/images/gallery/
ls -la public/images/icebath\ breathing/
ls -la public/images/izbrane\ hrana/

# View constitution
cat .specify/memory/constitution.md | head -50

# View specification
cat specs/001-wellness-platform/spec.md | head -100
```

---

## 🐛 Troubleshooting

```bash
# Netlify build fails
netlify logs  # View build logs
netlify env:list  # Check environment variables

# Supabase connection error
# Verify .env.local has correct credentials
cat .env.local

# Images not loading
# Ensure images are in /public/images/
ls -la public/images/

# Git push rejected
git pull origin main --rebase
git push origin main

# Port already in use
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
npm run dev  # Restart
```

---

## 📚 Documentation Links

- **Constitution:** `.specify/memory/constitution.md`
- **Specification:** `specs/001-wellness-platform/spec.md`
- **Setup Guide:** `SETUP_GUIDE.md`
- **README:** `README.md`
- **Brand Guidelines:** `BRAND_IMPLEMENTATION.md`

---

## ✅ Current Status

```bash
# Check what's done
git log --oneline  # View commits
git status  # View current changes
netlify status  # Check Netlify connection
```

**GitHub:** ✅ Connected (https://github.com/Tony33344/healthycornerspec1)  
**Supabase:** ✅ Configured (https://jwxenutezijwyrguqicv.supabase.co)  
**Netlify:** 🔄 In Progress (complete `netlify init`)  
**Next.js:** ⏳ Pending (initialize after Netlify setup)

---

**Next:** Complete the Netlify init prompts, then initialize Next.js project! 🚀
