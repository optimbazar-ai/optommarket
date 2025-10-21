# ✅ OPTOMMARKET - TESTING CHECKLIST

## 🎯 Platform Status: READY FOR TESTING

---

## 📊 SERVER STATUS

### Backend (Port 5000)
- [ ] Server running: http://localhost:5000
- [ ] Health check: http://localhost:5000/api/health → `{"status":"healthy"}`
- [ ] Database connected: ✅ in health response
- [ ] Products API: http://localhost:5000/api/products → 16 products returned

### Frontend (Port 3000)
- [ ] Server running: http://localhost:3000
- [ ] Next.js ready (no compilation errors)
- [ ] `.env.local` exists with `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

### Database (Neon)
- [ ] Tables created: users, products, orders, order_items
- [ ] Sample data: 16 products inserted
- [ ] Indexes created
- [ ] Connection stable

---

## 🧪 FUNCTIONAL TESTING

### 1. HOME PAGE (/)

**URL:** http://localhost:3000

**Expected:**
- [ ] ✅ Navbar visible (top)
  - Logo: "🛒 OPTOMMARKET"
  - Links: Mahsulotlar, Kirish, Ro'yxatdan o'tish
  - Cart button with count
- [ ] ✅ Hero Section
  - Title: "OPTOMMARKET"
  - Subtitle: "O'zbekiston uchun zamonaviy optom savdo platformasi"
  - Button: "Mahsulotlarni ko'rish 🚀"
- [ ] ✅ Features Section (3 cards)
  - ⚡ Tez Yetkazib Berish
  - 💯 Sifat Kafolati
  - 🤖 AI Chatbot
- [ ] ✅ Products Section
  - Title: "Ommabop Mahsulotlar"
  - Link: "Barchasini ko'rish →"
  - Grid: 8 product cards
  - Each card: Image, Name, Price, "Savatga qo'shish" button
- [ ] ✅ Footer visible (bottom)
  - Company info
  - Links: Mahsulotlar, Biz haqimizda, Aloqa
  - Contact info
  - Copyright
- [ ] ✅ ChatBot button (bottom-right corner)

**Console (F12):**
- [ ] ❌ No red errors
- [ ] ✅ Products API call success (200 OK)

---

### 2. PRODUCTS PAGE (/products)

**URL:** http://localhost:3000/products

**Expected:**
- [ ] ✅ Page title: "📦 Mahsulotlar"
- [ ] ✅ Search bar
- [ ] ✅ Category filter dropdown
- [ ] ✅ Product grid (all 16 products)
- [ ] ✅ Each product card clickable
- [ ] ✅ "Savatga qo'shish" buttons work
- [ ] ✅ Toast notification on add to cart

**Test:**
1. Click a product → Redirect to `/products/[id]`
2. Add product to cart → Cart count increases in Navbar

---

### 3. PRODUCT DETAIL (/products/[id])

**URL:** http://localhost:3000/products/1

**Expected:**
- [ ] ✅ Product image (large)
- [ ] ✅ Product name
- [ ] ✅ Price
- [ ] ✅ Description
- [ ] ✅ Category
- [ ] ✅ Stock quantity
- [ ] ✅ "Savatga qo'shish" button
- [ ] ✅ Quantity selector

**Test:**
1. Change quantity
2. Add to cart → Success toast
3. Back button → Return to products

---

### 4. REGISTER PAGE (/register)

**URL:** http://localhost:3000/register

**Expected:**
- [ ] ✅ Form fields:
  - Username (required)
  - Email (required)
  - Password (required)
  - Phone
  - Address
- [ ] ✅ "Ro'yxatdan o'tish" button
- [ ] ✅ Link: "Hisobingiz bormi? Kirish"

**Test:**
1. Fill all fields
2. Submit → Success toast + Redirect to home
3. Token saved in localStorage
4. Navbar shows username

**Test Data:**
```
Username: testuser
Email: test@example.com
Password: test123
Phone: +998901234567
```

---

### 5. LOGIN PAGE (/login)

**URL:** http://localhost:3000/login

**Expected:**
- [ ] ✅ Email field
- [ ] ✅ Password field
- [ ] ✅ "Kirish" button
- [ ] ✅ Link: "Hisobingiz yo'qmi? Ro'yxatdan o'ting"

**Test:**
1. Enter credentials
2. Submit → Success toast + Redirect to home
3. Navbar shows "Profil", "Buyurtmalarim", "Chiqish"

**Test Credentials (if admin user created):**
```
Email: admin@optommarket.uz
Password: admin123
```

---

### 6. CART PAGE (/cart)

**URL:** http://localhost:3000/cart

**Expected (Empty):**
- [ ] ✅ Message: "Savatingiz bo'sh"
- [ ] ✅ Button: "Mahsulotlarni ko'rish"

**Expected (With items):**
- [ ] ✅ Cart items list
- [ ] ✅ Each item: Image, Name, Price, Quantity, Remove button
- [ ] ✅ Quantity controls (+ / -)
- [ ] ✅ Total amount
- [ ] ✅ "To'lovga o'tish" button

**Test:**
1. Add products from home/products
2. Go to cart
3. Change quantity → Total updates
4. Remove item → Item removed
5. "To'lovga o'tish" → Redirect to checkout (if logged in)

---

### 7. CHECKOUT PAGE (/checkout)

**URL:** http://localhost:3000/checkout

**Auth Required:** Yes

**Expected:**
- [ ] ✅ Delivery address form
- [ ] ✅ Order summary (items, quantities, prices)
- [ ] ✅ Total amount
- [ ] ✅ "Buyurtma berish" button

**Test:**
1. Login first
2. Add items to cart
3. Go to checkout
4. Fill address
5. Submit → Order created + Redirect to success page

---

### 8. ORDER SUCCESS PAGE (/order-success/[id])

**URL:** http://localhost:3000/order-success/1

**Expected:**
- [ ] ✅ Success message: "Buyurtmangiz qabul qilindi! 🎉"
- [ ] ✅ Order ID
- [ ] ✅ Total amount
- [ ] ✅ Status: "Kutilmoqda"
- [ ] ✅ Button: "Bosh sahifaga qaytish"
- [ ] ✅ Button: "Buyurtmalarim"

---

### 9. ORDERS PAGE (/orders)

**URL:** http://localhost:3000/orders

**Auth Required:** Yes

**Expected:**
- [ ] ✅ Page title: "📋 Buyurtmalarim"
- [ ] ✅ Orders list (table or cards)
- [ ] ✅ Each order: ID, Date, Status, Amount, Items count
- [ ] ✅ Status badges (color-coded)

**Test:**
1. Create order first (checkout)
2. Go to orders page
3. See order in list
4. Click order → View details (if implemented)

---

### 10. PROFILE PAGE (/profile)

**URL:** http://localhost:3000/profile

**Auth Required:** Yes

**Expected:**
- [ ] ✅ User info display:
  - Username
  - Email
  - Phone (if provided)
  - Registration date
- [ ] ✅ "Chiqish" button

**Test:**
1. Login
2. Go to profile
3. See user info
4. Click "Chiqish" → Logout + Redirect to home

---

### 11. ADMIN PANEL (/admin)

**URL:** http://localhost:3000/admin

**Auth Required:** Admin role

**Expected:**
- [ ] ✅ Sidebar (left)
  - Dashboard
  - Mahsulotlar
  - Buyurtmalar
  - Foydalanuvchilar
  - Statistika
- [ ] ✅ Dashboard stats cards
  - Total Orders
  - Total Revenue
  - Total Users
  - Total Products
  - Total Stock
- [ ] ✅ Recent orders table
- [ ] ✅ Low stock products table
- [ ] ❌ No Navbar (admin has own layout)
- [ ] ❌ No Footer

**Test:**
1. Create admin user first (see ADMIN_SETUP.md)
2. Login as admin
3. Navbar shows "⚙️ Admin Panel" button
4. Click → Admin dashboard opens

---

### 12. ADMIN PRODUCTS (/admin/products)

**Expected:**
- [ ] ✅ "➕ Yangi Mahsulot" button
- [ ] ✅ Products table
- [ ] ✅ Each row: ID, Name, Category, Price, Quantity, SKU, Actions
- [ ] ✅ Actions: "✏️ Tahrirlash", "❌ O'chirish"

**Test:**
1. Click "Yangi Mahsulot" → Form appears
2. Fill form → Submit → Product created
3. Click "Tahrirlash" → Edit form → Update → Success
4. Click "O'chirish" → Confirm → Product deleted (if no orders)

---

### 13. ADMIN ORDERS (/admin/orders)

**Expected:**
- [ ] ✅ Orders table
- [ ] ✅ Filter buttons: All, Pending, Confirmed
- [ ] ✅ Each row: ID, User, Email, Amount, Items, Status, Date
- [ ] ✅ Status dropdown (change status)

**Test:**
1. Create order first (regular user flow)
2. Login as admin
3. Go to admin orders
4. Change order status → Success toast
5. Status updates in table

---

### 14. ADMIN USERS (/admin/users)

**Expected:**
- [ ] ✅ Users table
- [ ] ✅ Filter: All, Admins, Customers
- [ ] ✅ Each row: ID, Username, Email, Phone, Role, Orders count, Date
- [ ] ✅ Actions: "⬆ Admin qilish" / "⬇ Admin olib tashlash", "❌ O'chirish"

**Test:**
1. Create regular user (register)
2. Login as admin
3. Go to admin users
4. Make user admin → Success
5. Remove admin role → Success
6. Delete user (without orders) → Success

---

### 15. ADMIN ANALYTICS (/admin/analytics)

**Expected:**
- [ ] ✅ Sales trend chart (line chart)
- [ ] ✅ Top products chart (bar chart)
- [ ] ✅ Summary cards:
  - Total orders (30 days)
  - Total revenue (30 days)
  - Total items sold
- [ ] ✅ Products ranking table

**Test:**
1. Create some orders
2. Go to admin analytics
3. Charts render without errors
4. Data matches orders

---

### 16. AI CHATBOT

**Location:** All pages (bottom-right button)

**Expected:**
- [ ] ✅ ChatBot button visible: 💬
- [ ] ✅ Click → Chat window opens
- [ ] ✅ Input field
- [ ] ✅ Send button
- [ ] ✅ Messages display (user + AI)

**Test:**
1. Click ChatBot button
2. Type message (Uzbek): "Salom"
3. Send → AI response (Gemini)
4. Continue conversation
5. History preserved

**Test Messages:**
```
1. "Salom, qanday yordam bera olaman?"
2. "Mahsulotlar haqida ma'lumot bering"
3. "Yetkazib berish qancha vaqt oladi?"
```

---

## 🔒 AUTHENTICATION TESTING

### Logout
- [ ] Click "Chiqish" → Redirect to home
- [ ] Token removed from localStorage
- [ ] Navbar shows "Kirish", "Ro'yxatdan o'tish"

### Protected Routes
- [ ] `/checkout` → Redirect to /login if not authenticated
- [ ] `/orders` → Redirect to /login if not authenticated
- [ ] `/profile` → Redirect to /login if not authenticated
- [ ] `/admin` → Redirect to /login if not authenticated
- [ ] `/admin/*` → Redirect to home if not admin role

---

## 🎨 UI/UX TESTING

### Responsive Design
- [ ] Desktop (1920x1080): Layout proper
- [ ] Tablet (768x1024): Responsive grid
- [ ] Mobile (375x667): Mobile-friendly

### Loading States
- [ ] Products loading → Spinner visible
- [ ] Form submit → Button disabled with "⏳ Yuklanmoqda..."
- [ ] API call → Loading indicator

### Error Handling
- [ ] Invalid login → Error toast
- [ ] API error → Error message displayed
- [ ] Empty cart checkout → Warning message
- [ ] Form validation → Field errors

### Notifications (Toast)
- [ ] Success: Green, top-right
- [ ] Error: Red, top-right
- [ ] Auto-dismiss: 3 seconds
- [ ] Closeable

---

## 🔧 BACKEND API TESTING

### Products
```bash
# Get all products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/1

# Search
curl http://localhost:5000/api/products?search=laptop

# Filter by category
curl http://localhost:5000/api/products?category=Texnika
```

### Users
```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Profile (with token)
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Orders
```bash
# Create order (with token)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"items":[{"product_id":1,"quantity":2}],"total_amount":1700}'

# Get user orders
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Chatbot
```bash
# Send message
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Salom","userId":"test123"}'
```

---

## 🚨 COMMON ISSUES

### ❌ "Route not found"
**Fix:** Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

### ❌ Products not loading
**Fix:** Run `node backend/scripts/init-db.js`

### ❌ Navbar/Footer missing
**Fix:** Check layout-client.tsx rendering correctly

### ❌ Port 3000 in use
**Fix:** Kill node processes: `taskkill /F /IM node.exe`

### ❌ Database connection error
**Fix:** Check `backend/.env` has correct `DATABASE_URL`

### ❌ Admin panel not accessible
**Fix:** Create admin user (see ADMIN_SETUP.md)

---

## ✅ FINAL CHECKLIST

### Before Production:
- [ ] All tests pass
- [ ] No console errors
- [ ] All features work
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Database initialized
- [ ] Security: Secrets not exposed
- [ ] Performance: No slow queries

### Ready for Deployment:
- [ ] Backend: Deploy to Render
- [ ] Frontend: Deploy to Vercel
- [ ] Database: Production setup on Neon
- [ ] Environment: Production .env configured
- [ ] Domain: Custom domain (optional)
- [ ] SSL: HTTPS enabled

---

## 📊 TESTING SUMMARY

**Total Test Cases:** 100+

**Categories:**
- ✅ Pages: 11
- ✅ Features: 16
- ✅ API Endpoints: 12+
- ✅ Auth: 5
- ✅ UI/UX: 10+
- ✅ Admin: 5

---

## 🎉 SUCCESS CRITERIA

Platform is ready when:
1. ✅ All pages load without errors
2. ✅ All features work as expected
3. ✅ Authentication functional
4. ✅ Admin panel accessible
5. ✅ API endpoints respond correctly
6. ✅ Chatbot works
7. ✅ No critical bugs

---

**OPTOMMARKET Platform Testing Complete!** 🚀

Use this checklist to verify all features before production deployment.
