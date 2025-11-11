# API Endpoints: Wellness Retreat Platform

**Version:** 1.0.0  
**Base URL:** `/api`  
**Authentication:** Supabase JWT tokens

---

## Public Endpoints

### GET /api/services
**Description:** Get list of published services

**Query Parameters:**
- `category` (optional): Filter by category (Yoga, Ice Bathing, Workshops, Packages)
- `locale` (optional): Language (en, es)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Morning Yoga Session",
      "description": "Start your day with energizing yoga",
      "price": 25.00,
      "duration": 60,
      "capacity": 10,
      "category": "Yoga",
      "image_url": "/images/yoga.jpg"
    }
  ]
}
```

---

### GET /api/services/:id
**Description:** Get single service details

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Morning Yoga Session",
    "description": "Detailed description...",
    "price": 25.00,
    "duration": 60,
    "capacity": 10,
    "category": "Yoga",
    "image_url": "/images/yoga.jpg"
  }
}
```

---

### GET /api/menu
**Description:** Get menu items

**Query Parameters:**
- `category` (optional): Filter by category
- `dietary` (optional): Filter by dietary restrictions (vegan, gluten-free, etc.)
- `locale` (optional): Language

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Healthy Snack Bowl",
      "description": "Fresh fruits and nuts",
      "price": 8.50,
      "ingredients": "Banana, almonds, honey",
      "allergens": ["nuts"],
      "category": "Snacks",
      "stock": 15,
      "image_url": "/images/snack.jpg"
    }
  ]
}
```

---

### GET /api/schedules
**Description:** Get weekly schedule with availability

**Query Parameters:**
- `week` (optional): ISO week number (default: current week)
- `date` (optional): Specific date (YYYY-MM-DD)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "day_of_week": 1,
      "time": "09:00",
      "service": {
        "id": "uuid",
        "name": "Morning Yoga",
        "category": "Yoga"
      },
      "instructor": "Maria Garcia",
      "capacity": 10,
      "available_spots": 7
    }
  ]
}
```

---

### POST /api/bookings
**Description:** Create new booking (requires auth)

**Request Body:**
```json
{
  "schedule_id": "uuid",
  "booking_date": "2025-01-15",
  "notes": "First time participant"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "schedule_id": "uuid",
    "booking_date": "2025-01-15",
    "status": "pending",
    "payment_status": "pending",
    "created_at": "2025-01-11T22:00:00Z"
  }
}
```

**Errors:**
- `409 Conflict`: Booking capacity exceeded or user already booked
- `401 Unauthorized`: Not authenticated

---

### GET /api/bookings
**Description:** Get user's bookings (requires auth)

**Query Parameters:**
- `status` (optional): Filter by status
- `from_date`, `to_date` (optional): Date range

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "schedule": {
        "day_of_week": 1,
        "time": "09:00",
        "service": {
          "name": "Morning Yoga"
        }
      },
      "booking_date": "2025-01-15",
      "status": "confirmed",
      "payment_status": "paid"
    }
  ]
}
```

---

### POST /api/contact
**Description:** Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in booking a retreat"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

### POST /api/newsletter
**Description:** Subscribe to newsletter

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

**Errors:**
- `409 Conflict`: Email already subscribed

---

### GET /api/testimonials
**Description:** Get testimonials

**Query Parameters:**
- `limit` (optional): Number of testimonials (default: 10)
- `locale` (optional): Language

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "guest_name": "Sarah Johnson",
      "quote": "Amazing experience!",
      "rating": 5,
      "date": "2024-12-15"
    }
  ]
}
```

---

### GET /api/gallery
**Description:** Get gallery images

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "url": "/images/gallery/photo1.jpg",
      "caption": "Yoga session at sunrise",
      "alt_text": "Group of people doing yoga outdoors",
      "display_order": 1
    }
  ]
}
```

---

## Admin Endpoints (Requires admin role)

### POST /api/admin/services
**Description:** Create new service

**Request Body:**
```json
{
  "name_en": "Evening Meditation",
  "name_es": "Meditación Vespertina",
  "description_en": "Relaxing evening meditation",
  "description_es": "Meditación relajante por la tarde",
  "price": 20.00,
  "duration": 45,
  "capacity": 15,
  "category": "Workshops",
  "image_url": "/images/meditation.jpg",
  "status": "draft"
}
```

---

### PUT /api/admin/services/:id
**Description:** Update service

---

### DELETE /api/admin/services/:id
**Description:** Soft delete service (sets deleted_at)

---

### GET /api/admin/bookings
**Description:** Get all bookings with filters

**Query Parameters:**
- `status`, `from_date`, `to_date`, `service_id`, `user_email`

---

### PATCH /api/admin/bookings/:id
**Description:** Update booking status

**Request Body:**
```json
{
  "status": "confirmed",
  "payment_status": "paid"
}
```

---

### GET /api/admin/analytics
**Description:** Get analytics data

**Response:**
```json
{
  "data": {
    "total_bookings": {
      "today": 5,
      "week": 32,
      "month": 127
    },
    "revenue": {
      "today": 125.00,
      "week": 800.00,
      "month": 3200.00
    },
    "popular_services": [
      {
        "service_name": "Morning Yoga",
        "booking_count": 45
      }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

**Common Status Codes:**
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not authorized (wrong role)
- `404 Not Found`: Resource not found
- `409 Conflict`: Constraint violation
- `500 Internal Server Error`: Server error

---

**API Contract Status:** Complete
