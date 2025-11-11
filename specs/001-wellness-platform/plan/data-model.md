# Data Model: Wellness Retreat Platform

**Feature ID:** 001-wellness-platform  
**Version:** 1.0.0  
**Created:** 2025-01-11

---

## Entity Relationship Diagram

```
User (auth.users)
  ├─→ Bookings (1:N)
  ├─→ Orders (1:N)
  └─→ Cart (1:1)

Service
  ├─→ Schedules (1:N)
  └─→ Bookings (via Schedule)

Schedule
  └─→ Bookings (1:N)

MenuItem
  └─→ OrderItems (via Orders.items JSONB)

Gallery, Testimonials, Pages, NewsletterSubscribers (standalone)
```

---

## Entities

### 1. Service
**Purpose:** Wellness packages and activities offered at the retreat

**Fields:**
- `id` (UUID, PK): Unique identifier
- `name_en` (TEXT, required): English name
- `name_es` (TEXT, required): Spanish name
- `description_en` (TEXT): English description
- `description_es` (TEXT): Spanish description
- `price` (DECIMAL(10,2), required): Price in EUR
- `duration` (INTEGER): Duration in minutes
- `capacity` (INTEGER): Maximum participants
- `category` (TEXT, required): 'Yoga', 'Ice Bathing', 'Workshops', 'Packages'
- `image_url` (TEXT): Image path or Supabase Storage URL
- `status` (TEXT): 'draft' or 'published'
- `created_at`, `updated_at`, `deleted_at` (TIMESTAMPTZ)

**Validation:**
- price >= 0
- duration > 0
- capacity > 0
- category IN ('Yoga', 'Ice Bathing', 'Workshops', 'Packages')

**Indexes:**
- `idx_services_status` on (status) WHERE deleted_at IS NULL
- `idx_services_category` on (category) WHERE deleted_at IS NULL

---

### 2. MenuItem
**Purpose:** Healthy food products available for purchase

**Fields:**
- `id` (UUID, PK)
- `name_en`, `name_es` (TEXT, required)
- `description_en`, `description_es` (TEXT)
- `price` (DECIMAL(10,2), required)
- `ingredients_en`, `ingredients_es` (TEXT)
- `allergens` (TEXT[]): Array of allergen names
- `category` (TEXT, required): 'Snacks', 'Meals', 'Beverages', 'Supplements'
- `image_url` (TEXT)
- `stock` (INTEGER): Available quantity
- `status` (TEXT): 'draft' or 'published'
- `created_at`, `updated_at`, `deleted_at` (TIMESTAMPTZ)

**Validation:**
- price >= 0
- stock >= 0
- category IN ('Snacks', 'Meals', 'Beverages', 'Supplements')

---

### 3. Schedule
**Purpose:** Weekly recurring time slots for activities

**Fields:**
- `id` (UUID, PK)
- `day_of_week` (INTEGER, required): 0=Sunday, 1=Monday, ..., 6=Saturday
- `time` (TIME, required): Start time (e.g., '09:00')
- `service_id` (UUID, FK → services.id)
- `instructor` (TEXT): Instructor name
- `capacity` (INTEGER, required): Max participants per slot
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Validation:**
- day_of_week BETWEEN 0 AND 6
- capacity > 0

**Indexes:**
- `idx_schedules_day_time` on (day_of_week, time)

---

### 4. Booking
**Purpose:** User reservations for scheduled activities

**Fields:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `schedule_id` (UUID, FK → schedules.id)
- `booking_date` (DATE, required): Specific date for this booking
- `status` (TEXT): 'pending', 'confirmed', 'cancelled', 'completed'
- `payment_status` (TEXT): 'pending', 'paid', 'refunded'
- `notes` (TEXT): Additional information
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Validation:**
- status IN ('pending', 'confirmed', 'cancelled', 'completed')
- payment_status IN ('pending', 'paid', 'refunded')

**Constraints:**
- UNIQUE (user_id, schedule_id, booking_date) WHERE status != 'cancelled'
  - Prevents double-booking same user for same slot on same date

**Indexes:**
- `idx_bookings_user` on (user_id)
- `idx_bookings_date` on (booking_date)

---

### 5. Order
**Purpose:** Shop orders for menu items and products

**Fields:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id, nullable for guest checkout)
- `order_number` (TEXT, UNIQUE, required): Format HC-YYYYMMDD-XXXX
- `items` (JSONB, required): Array of {menu_item_id, quantity, price, name}
- `subtotal` (DECIMAL(10,2), required)
- `tax` (DECIMAL(10,2)): Tax amount
- `total` (DECIMAL(10,2), required)
- `status` (TEXT): 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
- `shipping_address` (JSONB): {name, address, city, postal_code, country}
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Validation:**
- status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
- total = subtotal + tax

**Example items JSONB:**
```json
[
  {
    "menu_item_id": "uuid",
    "name": "Healthy Snack",
    "quantity": 2,
    "price": 5.99
  }
]
```

---

### 6. Cart
**Purpose:** Persistent shopping cart for authenticated users

**Fields:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id, UNIQUE)
- `items` (JSONB): Array of {menu_item_id, quantity}
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Constraints:**
- One cart per user (UNIQUE on user_id)

**Example items JSONB:**
```json
[
  {
    "menu_item_id": "uuid",
    "quantity": 2
  }
]
```

---

### 7. Testimonial
**Purpose:** Guest reviews and ratings

**Fields:**
- `id` (UUID, PK)
- `guest_name` (TEXT, required)
- `quote_en`, `quote_es` (TEXT, required)
- `rating` (INTEGER): 1-5 stars
- `date` (DATE): Review date
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Validation:**
- rating BETWEEN 1 AND 5

---

### 8. GalleryImage
**Purpose:** Photo gallery images

**Fields:**
- `id` (UUID, PK)
- `url` (TEXT, required): Image path or Supabase Storage URL
- `caption_en`, `caption_es` (TEXT)
- `alt_text_en`, `alt_text_es` (TEXT, required): Accessibility
- `display_order` (INTEGER): Sort order
- `created_at`, `updated_at` (TIMESTAMPTZ)

---

### 9. Page
**Purpose:** CMS-managed content pages

**Fields:**
- `id` (UUID, PK)
- `slug` (TEXT, UNIQUE, required): URL slug (e.g., 'about', 'contact')
- `title_en`, `title_es` (TEXT, required)
- `content_en`, `content_es` (TEXT): Rich text content
- `status` (TEXT): 'draft' or 'published'
- `created_at`, `updated_at` (TIMESTAMPTZ)

---

### 10. NewsletterSubscriber
**Purpose:** Email newsletter subscriptions

**Fields:**
- `id` (UUID, PK)
- `email` (TEXT, UNIQUE, required)
- `subscribed_at` (TIMESTAMPTZ)
- `unsubscribed_at` (TIMESTAMPTZ, nullable)

**Constraints:**
- UNIQUE on email

---

## State Transitions

### Booking Status Flow
```
pending → confirmed → completed
   ↓
cancelled
```

### Order Status Flow
```
pending → confirmed → shipped → delivered
   ↓
cancelled
```

### Payment Status Flow
```
pending → paid
   ↓
refunded
```

---

## Database Triggers

### Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Repeat for other tables...
```

### Booking conflict prevention
```sql
CREATE OR REPLACE FUNCTION check_booking_capacity()
RETURNS TRIGGER AS $$
DECLARE
  schedule_capacity INTEGER;
  current_bookings INTEGER;
BEGIN
  -- Get schedule capacity
  SELECT capacity INTO schedule_capacity
  FROM schedules
  WHERE id = NEW.schedule_id;

  -- Count existing bookings for this slot and date
  SELECT COUNT(*) INTO current_bookings
  FROM bookings
  WHERE schedule_id = NEW.schedule_id
    AND booking_date = NEW.booking_date
    AND status IN ('pending', 'confirmed');

  -- Check if capacity exceeded
  IF current_bookings >= schedule_capacity THEN
    RAISE EXCEPTION 'Booking capacity exceeded for this time slot';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_booking_capacity_trigger
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION check_booking_capacity();
```

---

## Relationships Summary

- **User → Bookings:** One user can have many bookings
- **User → Orders:** One user can have many orders
- **User → Cart:** One user has one cart
- **Service → Schedules:** One service can have many weekly schedules
- **Schedule → Bookings:** One schedule slot can have many bookings (up to capacity)
- **MenuItem:** Referenced in Order.items and Cart.items via JSONB

---

**Data Model Status:** Complete and ready for implementation
