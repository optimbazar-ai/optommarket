# ✅ OptoMarket.uz - Testing Checklist

Loyihani to'liq test qilish uchun chekliste.

## 🎯 QADAM 1: BACKEND SETUP

### ✅ Pre-checks
- [ ] Node.js o'rnatilgan (v18+)
- [ ] MongoDB o'rnatilgan va ishlamoqda
- [ ] Backend dependencies o'rnatilgan (`npm install`)
- [ ] `.env` fayl to'g'ri sozlangan

### ✅ Commands
```bash
cd backend
npm install
npm run dev
```

### ✅ Terminal Check
```
✓ Server running on port 5000
✓ Environment: development
✓ API available at: http://localhost:5000/api
```

### ✅ API Test
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "...",
  "service": "OptoMarket API"
}
```

### ❌ Common Errors
- `Error: listen EADDRINUSE` → Port busy, kill process
- `Cannot find module 'express'` → Run `npm install`
- `PORT is not defined` → Check `.env` file

---

## 🎯 QADAM 2: DATABASE CONNECTION

### ✅ Pre-checks
- [ ] MongoDB service running
- [ ] Connection string correct in `.env`
- [ ] Database name correct

### ✅ Commands
```bash
# Windows
net start MongoDB

# Test connection
mongosh
show dbs
```

### ✅ Terminal Check
```
✓ MongoDB connected successfully
✓ Database: optommarket
✓ Host: localhost:27017
```

### ✅ API Test
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "dbName": "optommarket"
}
```

### ❌ Common Errors
- `MongoServerError: Authentication failed` → Check credentials
- `MongooseServerSelectionError` → MongoDB not running
- `Error: connect ECONNREFUSED` → Wrong port/host

---

## 🎯 QADAM 3: SEED DATABASE

### ✅ Commands
```bash
cd backend
npm run seed
```

### ✅ Terminal Check
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Created 5 categories
✓ Created 6 products
✓ Created test user
✅ Database seeded successfully!
```

### ✅ Verify Data
```bash
curl http://localhost:5000/api/categories
curl http://localhost:5000/api/products
```

**Expected:** Should return arrays with data

### ❌ Common Errors
- `ValidationError` → Check model schema
- `Database connection failed` → Check MongoDB

---

## 🎯 QADAM 4: FRONTEND SETUP

### ✅ Pre-checks
- [ ] Frontend dependencies o'rnatilgan
- [ ] `.env` fayl to'g'ri sozlangan
- [ ] Backend server running

### ✅ Commands
```bash
cd frontend
npm install
npm run dev
```

### ✅ Terminal Check
```
VITE v5.x.x ready in 500ms

➜ Local:   http://localhost:3000/
➜ Network: use --host to expose
```

### ✅ Browser Test
1. Open `http://localhost:3000`
2. Page should load completely
3. Navigation should work
4. Open DevTools (F12) → No errors in console

### ❌ Common Errors
- `Module not found` → Run `npm install`
- `Port 3000 already in use` → Change port in vite.config.js
- Blank page → Check console for errors

---

## 🎯 QADAM 5: API INTEGRATION TEST

### ✅ Browser DevTools
Open DevTools (F12) → Network tab

### ✅ Home Page Test
1. Navigate to `http://localhost:3000`
2. Check Network tab:
   - `GET /api/health` → 200 OK
   - `GET /api/categories` → 200 OK
   - `GET /api/products?featured=true` → 200 OK

### ✅ Products Page Test
1. Navigate to `http://localhost:3000/products`
2. Check Network tab:
   - `GET /api/products` → 200 OK
3. Verify:
   - Products displayed correctly
   - Filters working
   - Search working

### ❌ Common Errors
- `CORS policy error` → Check backend CORS config
- `Network Error` → Backend not running
- `404 Not Found` → Wrong API URL in `.env`

---

## 🎯 QADAM 6: AUTHENTICATION TEST

### ✅ Login Test
1. Navigate to `http://localhost:3000/login`
2. Use test credentials:
   - Email: `test@optommarket.uz`
   - Password: `test123`
3. Click "Kirish"
4. Should redirect to dashboard

### ✅ Browser Check
- LocalStorage should have `token`
- User info displayed in navbar
- Dashboard accessible

### ✅ API Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@optommarket.uz","password":"test123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "email": "test@optommarket.uz",
    "name": "Test User"
  }
}
```

### ❌ Common Errors
- `Invalid credentials` → Wrong email/password
- `jwt malformed` → Token format error
- `User not found` → Seed database again

---

## 🎯 QADAM 7: REGISTRATION TEST

### ✅ Register Test
1. Navigate to `http://localhost:3000/register`
2. Fill form with new data
3. Submit form
4. Should redirect to dashboard

### ✅ API Test
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@test.com",
    "password": "test123",
    "role": "customer"
  }'
```

### ❌ Common Errors
- `User already exists` → Email already registered
- `Password too short` → Min 6 characters
- `Validation error` → Check required fields

---

## 🎯 QADAM 8: PRODUCTS CRUD TEST

### ✅ View Product Detail
1. Click on any product
2. Should show full details
3. Check Network: `GET /api/products/:id` → 200 OK

### ✅ Create Product (Login required)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 100000,
    "category": "CATEGORY_ID",
    "stock": 50
  }'
```

### ❌ Common Errors
- `Not authorized` → Login required
- `ValidationError` → Missing required fields
- `CastError` → Invalid category ID

---

## 🎯 FINAL VERIFICATION

### ✅ Complete Checklist

#### Backend
- [ ] Server running on port 5000
- [ ] MongoDB connected
- [ ] Health endpoint working
- [ ] All routes loaded
- [ ] No errors in terminal

#### Frontend
- [ ] Dev server on port 3000
- [ ] Home page renders
- [ ] Products page renders
- [ ] Login/Register working
- [ ] Dashboard accessible
- [ ] No console errors

#### API
- [ ] Health check: ✓
- [ ] Get products: ✓
- [ ] Get categories: ✓
- [ ] Login: ✓
- [ ] Register: ✓
- [ ] Protected routes: ✓

#### Browser
- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit
- [ ] API calls successful
- [ ] No CORS errors
- [ ] LocalStorage working

---

## 📊 FINAL HISOBOT

```
=== OPTOMARKET.UZ TEST HISOBOTI ===

✅ BACKEND STATUS:
   Server: ✓ Running
   Database: ✓ Connected
   Health API: ✓ Working
   Products API: ✓ Working
   Auth API: ✓ Working
   Categories API: ✓ Working

✅ FRONTEND STATUS:
   Dev Server: ✓ Running
   Home Page: ✓ Rendered
   Products Page: ✓ Rendered
   Login Page: ✓ Rendered
   Register Page: ✓ Rendered
   Dashboard: ✓ Rendered

✅ INTEGRATION:
   API Connection: ✓ Working
   Authentication: ✓ Working
   CORS: ✓ Working
   LocalStorage: ✓ Working

✅ ERRORS:
   Console Errors: 0
   Network Errors: 0
   Database Errors: 0

🎉 STATUS: ALL TESTS PASSED
📅 Date: 2024-10-22
⏰ Time: 03:19 UTC+05:00
```

---

## 🆘 Yordam kerakmi?

Agar biror qadam muvaffaqiyatsiz bo'lsa:

1. `IMPLEMENTATION_GUIDE.md` faylini o'qing
2. Error Troubleshooting jadvalini tekshiring
3. Terminal va console loglarni o'qing
4. GitHub Issues-ga xatolik haqida yozing

**Muvaffaqiyatli testing!** ✨
