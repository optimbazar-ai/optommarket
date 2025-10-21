# 👑 ADMIN PANEL SETUP GUIDE

## QADAM 7: Admin Panel - Complete Guide

---

## 📋 OVERVIEW

Admin Panel - bu OPTOMMARKET platformasini boshqarish uchun mo'ljallangan maxsus interfeys. Faqat **admin** rolida foydalanuvchilar kirish huquqiga ega.

### Features:
- ✅ Dashboard (statistika)
- ✅ Mahsulotlar boshqaruvi (CRUD)
- ✅ Buyurtmalar holati (status update)
- ✅ Foydalanuvchilar rollar (admin/customer)
- ✅ Statistika va grafiklar (analytics)

---

## 1️⃣ ADMIN USER YARATISH

### Option 1: Neon Dashboard SQL Editor

1. **Neon Console-ga kiring:** https://console.neon.tech
2. **SQL Editor-ni oching**
3. **Quyidagi SQL ni run qiling:**

```sql
-- IMPORTANT: Avval password hash yaratish kerak!
-- Backend terminalda:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(h => console.log(h));"

INSERT INTO users (username, email, password_hash, phone, role, created_at)
VALUES (
  'admin',
  'admin@optommarket.uz',
  '$2b$10$YOUR_GENERATED_HASH_HERE',  -- <-- REPLACE with actual hash
  '+998901234567',
  'admin',
  NOW()
);
```

### Option 2: Backend Node.js Script

**Create:** `backend/scripts/create-admin.js`

```javascript
const bcrypt = require('bcryptjs');
const pool = require('../models/db');

async function createAdmin() {
  try {
    const password = 'admin123'; // Change this!
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, phone, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, username, email, role`,
      ['admin', 'admin@optommarket.uz', passwordHash, '+998901234567', 'admin']
    );

    console.log('✅ Admin user created successfully!');
    console.log(result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
```

**Run:**
```bash
cd backend
node scripts/create-admin.js
```

### Option 3: Password Hash Generator (Quick Method)

**Terminal:**
```bash
cd backend
node
```

**Node REPL:**
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(hash => console.log(hash));
// Copy the output hash
```

**Copy hash va SQL-ga qo'ying:**
```sql
INSERT INTO users (username, email, password_hash, role, created_at)
VALUES ('admin', 'admin@optommarket.uz', '$2b$10$COPIED_HASH_HERE', 'admin', NOW());
```

---

## 2️⃣ LOGIN AS ADMIN

### Test Credentials:
- **Email:** `admin@optommarket.uz`
- **Password:** `admin123` (yoki siz o'rnatgan parol)

### Login Steps:
1. Go to: http://localhost:3000/login
2. Enter admin credentials
3. Click "Kirish"
4. Navbar-da "⚙️ Admin Panel" button ko'rinadi
5. Click → Admin Dashboard opens

---

## 3️⃣ ADMIN PANEL FEATURES

### 📊 Dashboard (`/admin`)

**Statistics Cards:**
- Total Orders
- Total Revenue ($)
- Total Users
- Total Products
- Total Stock

**Recent Orders Table:**
- Last 5 orders
- User, amount, status, date

**Low Stock Products:**
- Products with quantity < 10
- Alert system

### 📦 Products Management (`/admin/products`)

**Actions:**
- ➕ **Add Product:** Form with name, price, quantity, category, etc.
- ✏️ **Edit Product:** Update existing product details
- ❌ **Delete Product:** Remove product (if not in orders)

**Product Fields:**
- Name *
- Description
- Price * ($)
- Quantity *
- Category
- Image URL
- SKU

### 🛒 Orders Management (`/admin/orders`)

**Features:**
- View all orders
- Filter by status (all, pending, confirmed, etc.)
- Update order status via dropdown
- Status options:
  - pending (Kutilmoqda)
  - confirmed (Tasdiqlangan)
  - shipped (Yo'lda)
  - delivered (Yetkazilgan)
  - cancelled (Bekor qilingan)

**Order Details:**
- Order ID
- Customer name & email
- Total amount
- Items count
- Status
- Order date

### 👥 Users Management (`/admin/users`)

**Actions:**
- ⬆ **Make Admin:** Change customer → admin
- ⬇ **Remove Admin:** Change admin → customer
- ❌ **Delete User:** Remove user (if no orders)

**User Info:**
- ID
- Username
- Email
- Phone
- Role (admin/customer)
- Orders count
- Registration date

**Filters:**
- All users
- Admins only
- Customers only

### 📈 Analytics (`/admin/analytics`)

**Charts:**
1. **Sales Trend (Line Chart)**
   - X-axis: Date (last 30 days)
   - Y-axis: Orders count & Revenue ($)
   - Data: Daily sales statistics

2. **Top Products (Bar Chart)**
   - X-axis: Product name
   - Y-axis: Quantity sold
   - Data: Top 10 best-selling products

**Summary Stats:**
- Total orders (30 days)
- Total revenue (30 days)
- Total items sold

**Products Ranking Table:**
- Position (1-10)
- Product name
- Units sold
- Percentage

---

## 4️⃣ BACKEND API ENDPOINTS

All admin endpoints require:
- **Authentication:** Bearer token (JWT)
- **Authorization:** User role = 'admin'

### Dashboard
```
GET /api/admin/dashboard
Response: {
  stats: { totalOrders, totalRevenue, totalUsers, totalProducts, totalStock },
  recentOrders: [...],
  lowStockProducts: [...]
}
```

### Products
```
GET    /api/admin/products          → List all products
POST   /api/admin/products          → Create product
PUT    /api/admin/products/:id      → Update product
DELETE /api/admin/products/:id      → Delete product
```

### Orders
```
GET /api/admin/orders              → List all orders
PUT /api/admin/orders/:id/status   → Update order status
Body: { "status": "confirmed" }
```

### Users
```
GET    /api/admin/users            → List all users
PUT    /api/admin/users/:id/role   → Change user role
DELETE /api/admin/users/:id        → Delete user
```

### Analytics
```
GET /api/admin/analytics/sales     → Sales data (30 days)
GET /api/admin/analytics/products  → Top products
```

---

## 5️⃣ SECURITY FEATURES

### Backend Middleware

**`adminOnly` Middleware:**
```javascript
// Checks:
1. User is authenticated (JWT valid)
2. User role === 'admin'
3. Returns 403 if not admin
```

**Protected Actions:**
- Cannot delete yourself
- Cannot change your own role
- Cannot delete users with orders
- Cannot delete products in orders

### Frontend Guards

**Admin Layout:**
- Redirects to /login if not authenticated
- Redirects to / if not admin
- Shows loading spinner during check

---

## 6️⃣ TESTING CHECKLIST

### ✅ Authentication
- [ ] Login as admin works
- [ ] Admin Panel button appears in Navbar
- [ ] Non-admin users cannot access /admin
- [ ] Redirects work correctly

### ✅ Dashboard
- [ ] Statistics load correctly
- [ ] Recent orders displayed
- [ ] Low stock products shown
- [ ] All cards show accurate data

### ✅ Products Management
- [ ] Can add new product
- [ ] Form validation works
- [ ] Can edit existing product
- [ ] Can delete product (without orders)
- [ ] Cannot delete product with orders
- [ ] Table displays all products

### ✅ Orders Management
- [ ] All orders displayed
- [ ] Can filter by status
- [ ] Can update order status
- [ ] Status change reflects immediately
- [ ] Stats cards update

### ✅ Users Management
- [ ] All users displayed
- [ ] Can make user admin
- [ ] Can remove admin role
- [ ] Cannot modify own role
- [ ] Can delete users (without orders)
- [ ] Filters work (all/admins/customers)

### ✅ Analytics
- [ ] Sales chart renders
- [ ] Products chart renders
- [ ] Data loads correctly
- [ ] No console errors
- [ ] Ranking table displays

---

## 7️⃣ TROUBLESHOOTING

### ❌ "Admin ruxsati kerak" Error

**Cause:** User role is not 'admin'

**Solution:**
1. Check database: `SELECT role FROM users WHERE email = 'admin@optommarket.uz';`
2. Should return: `admin`
3. If not, update: `UPDATE users SET role = 'admin' WHERE email = 'admin@optommarket.uz';`

### ❌ 403 Forbidden on Admin Routes

**Cause:** Token invalid or user not admin

**Solution:**
1. Logout and login again
2. Check localStorage token: `localStorage.getItem('token')`
3. Verify backend verifies token correctly

### ❌ Charts Not Rendering

**Cause:** `recharts` package not installed

**Solution:**
```bash
cd frontend
npm install recharts
npm run dev
```

### ❌ "Cannot delete product/user"

**Cause:** Product/User has related orders

**Solution:**
- This is intentional (data integrity)
- Either delete related orders first (not recommended)
- Or archive/deactivate instead

---

## 8️⃣ FILE STRUCTURE

```
backend/
├── routes/
│   └── admin.js              ✅ NEW (Admin API endpoints)
└── server.js                 ✅ UPDATED (Admin routes added)

frontend/
├── app/
│   └── admin/
│       ├── layout.tsx        ✅ NEW (Admin sidebar layout)
│       ├── page.tsx          ✅ NEW (Dashboard)
│       ├── products/
│       │   └── page.tsx      ✅ NEW (Products CRUD)
│       ├── orders/
│       │   └── page.tsx      ✅ NEW (Orders management)
│       ├── users/
│       │   └── page.tsx      ✅ NEW (Users management)
│       └── analytics/
│           └── page.tsx      ✅ NEW (Charts & analytics)
└── components/
    └── Navbar.tsx            ✅ UPDATED (Admin link added)
```

**Total New Files:** 7 files
**Updated Files:** 2 files

---

## 9️⃣ PRODUCTION DEPLOYMENT

### Environment Variables

**Backend (.env):**
```env
# No additional variables needed for admin panel
# Existing variables sufficient
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Production: https://your-backend.onrender.com/api
```

### Database Preparation

**Production:**
```sql
-- Create admin user in production database
INSERT INTO users (username, email, password_hash, role, created_at)
VALUES ('admin', 'admin@yourcompany.com', '$2b$10$HASH', 'admin', NOW());
```

### Render & Vercel

**No special configuration needed!**
- Backend routes automatically deployed
- Frontend pages automatically deployed
- Admin panel accessible at: `https://yourapp.vercel.app/admin`

---

## 🔟 BEST PRACTICES

### Security
- ✅ Use strong admin passwords
- ✅ Regularly review admin users
- ✅ Monitor admin actions (future: audit log)
- ✅ Limit admin access

### Data Management
- ✅ Regular backups
- ✅ Don't delete data with dependencies
- ✅ Use soft deletes (future feature)
- ✅ Archive old data

### Performance
- ✅ Paginate large lists (future)
- ✅ Cache dashboard stats (future)
- ✅ Optimize database queries
- ✅ Index frequently queried columns

---

## 1️⃣1️⃣ ADMIN USER CREDENTIALS (Production)

**⚠️ MUHIM: Production-da parolni o'zgartiring!**

```
Email: admin@yourcompany.com
Password: [Strong-Password-Here-Min-12-chars]
```

**Password Requirements:**
- Minimum 12 characters
- Include: uppercase, lowercase, numbers, symbols
- Don't use common words
- Store securely (password manager)

---

## 1️⃣2️⃣ QUICK START SUMMARY

1. **Create Admin User:**
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(h => console.log(h));"
   ```
   Copy hash → Neon SQL Editor → INSERT into users

2. **Login:**
   - http://localhost:3000/login
   - Email: admin@optommarket.uz
   - Password: admin123

3. **Access Admin Panel:**
   - Click "⚙️ Admin Panel" in Navbar
   - Or go to: http://localhost:3000/admin

4. **Start Managing:**
   - Add products
   - Update order statuses
   - Manage users
   - View analytics

---

## ✅ DEPLOYMENT COMPLETE!

Admin Panel is now fully functional! 🎉

**URL:** http://localhost:3000/admin (development)
**Production:** https://yourapp.vercel.app/admin

**Next Steps:**
- Create admin user
- Test all features
- Deploy to production
- Train admin users

---

## 📞 SUPPORT

For issues or questions:
- Check troubleshooting section above
- Review backend logs
- Check browser console
- Verify admin role in database

**Admin Panel Ready to Use!** 👑
