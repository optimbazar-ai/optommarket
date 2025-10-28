# 📋 OPTOMARKET.UZ - IMPLEMENTATION GUIDE

**Dasturchi uchun qadam-baqadam yo'riqnoma**

---

## 🚀 QADAM 1: BACKEND SETUP

### ✅ BEFORE:
- `backend` papka yaratiladi
- Express server konfiguratsiya qilinadi
- Dependencies o'rnatiladi: `express`, `mongoose`, `dotenv`, `cors`

### 🔧 IMPLEMENTATION:
```bash
cd backend
npm install
npm run dev
```

### ✅ AFTER:

**Terminal check:**
```
✓ Server running on port 5000
✓ Environment: development
```

**API test:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "OK",
  "timestamp": "2024-10-22T03:19:00.000Z",
  "service": "OptoMarket API"
}
```

**Success criteria:**
- ✅ Server ishga tushdi
- ✅ Health endpoint 200 OK qaytardi
- ✅ Terminal-da xatolik yo'q

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `Error: listen EADDRINUSE` | Port band, `npm run dev` ni stop qiling va qayta ishga tushiring |
| `Cannot find module 'express'` | `npm install` qayta bajaring |
| `PORT is not defined` | `.env` faylidagi `PORT=5000` borligini tekshiring |

---

## 🗄️ QADAM 2: DATABASE CONNECTION

### ✅ BEFORE:
- MongoDB connection o'rnatiladi
- Database models yaratiladi
- Connection middleware setup

### 🔧 IMPLEMENTATION:
```bash
# MongoDB-ni ishga tushiring (agar local bo'lsa)
# Yoki MongoDB Atlas-da cluster yarating

# Backend serverni restart qiling
npm run dev
```

### ✅ AFTER:

**Terminal check:**
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
```

**API test:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "dbName": "optommarket",
  "timestamp": "2024-10-22T03:19:00.000Z"
}
```

**Success criteria:**
- ✅ Database connected
- ✅ Health endpoint database statusni ko'rsatadi
- ✅ Terminal-da connection xabari

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `MongoServerError: Authentication failed` | `.env` faylidagi `MONGODB_URI` login/parolni tekshiring |
| `MongooseServerSelectionError` | MongoDB servisi ishlamayapti, `mongod` ni ishga tushiring |
| `Error: connect ECONNREFUSED` | MongoDB port (27017) to'g'ri ekanligini tekshiring |

---

## 🎨 QADAM 3: FRONTEND SETUP

### ✅ BEFORE:
- React + Vite loyihasi yaratiladi
- TailwindCSS o'rnatiladi
- Routing (React Router) setup

### 🔧 IMPLEMENTATION:
```bash
cd frontend
npm install
npm run dev
```

### ✅ AFTER:

**Terminal check:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Browser test:**
- URL: `http://localhost:3000`
- Page title: "OptoMarket.uz - Optom savdo markazi"
- Home page ko'rinishi kerak

**Browser console (F12):**
- ❌ Xatolik bo'lmasligi kerak
- ✅ React version info

**Success criteria:**
- ✅ Frontend localhost:3000 da ochildi
- ✅ Home page render bo'ldi
- ✅ Console-da xatolik yo'q

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `Module not found: react` | `npm install` qayta bajaring |
| `Port 3000 already in use` | `vite.config.js` da portni o'zgartiring (3001) |
| Blank page | Browser console-ni tekshiring, component xatosini ko'ring |

---

## 🔗 QADAM 4: API INTEGRATION

### ✅ BEFORE:
- Axios o'rnatiladi
- API service layer yaratiladi
- Environment variables setup

### 🔧 IMPLEMENTATION:
```bash
cd frontend
npm install axios
```

Frontend `.env` fayliga:
```
VITE_API_URL=http://localhost:5000/api
```

### ✅ AFTER:

**Browser test:**
- Home page ochiladi
- Network tab (F12 → Network)
- API calls ko'rinadi

**Network tab check:**
```
GET http://localhost:5000/api/health → Status: 200
Response: {"status":"OK","database":"Connected"}
```

**Success criteria:**
- ✅ Frontend backend bilan bog'landi
- ✅ API calls muvaffaqiyatli
- ✅ CORS xatoligi yo'q

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `CORS policy error` | Backend-da `cors` middleware qo'shing |
| `Network Error` | Backend ishlamayapti, `npm run dev` ni backend-da ishga tushiring |
| `404 Not Found` | API endpoint URL-ni tekshiring |

---

## 📦 QADAM 5: PRODUCTS API

### ✅ BEFORE:
- Product model yaratiladi
- CRUD endpoints yaratiladi
- Frontend-da product list page

### 🔧 IMPLEMENTATION:

**Backend:**
```bash
# Server avval ishlab turishi kerak
# Models va routes avtomatik yuklanadi
```

**Frontend:**
```bash
# Frontend serverni restart qiling
npm run dev
```

### ✅ AFTER:

**API test:**
```bash
# Get all products
curl http://localhost:5000/api/products

# Create product (POST)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":100,"category":"electronics"}'
```

**Browser test:**
- URL: `http://localhost:3000/products`
- Products list ko'rinishi kerak
- Loading state ishlashi kerak

**Network tab check:**
```
GET /api/products → 200 OK
Response: [{"_id":"...","name":"...","price":...}]
```

**Success criteria:**
- ✅ Products API ishlayapti
- ✅ Frontend products list ko'rsatadi
- ✅ Create/Update/Delete ishlaydi

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `ValidationError` | Request body-dagi ma'lumotlarni tekshiring |
| `CastError: ObjectId failed` | ID format noto'g'ri, valid MongoDB ObjectId kiriting |
| Empty array `[]` | Database-da ma'lumot yo'q, seed script ishga tushiring |

---

## 🔐 QADAM 6: AUTHENTICATION

### ✅ BEFORE:
- User model yaratiladi
- JWT authentication setup
- Login/Register endpoints

### 🔧 IMPLEMENTATION:

**Dependencies:**
```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### ✅ AFTER:

**API test:**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Expected response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

**Browser test:**
- URL: `http://localhost:3000/login`
- Login form ishlashi kerak
- Successful login → Dashboard-ga redirect

**Success criteria:**
- ✅ Registration ishlaydi
- ✅ Login token qaytaradi
- ✅ Protected routes ishlaydi

### ❌ ERROR TROUBLESHOOTING:

| Error | Yechim |
|-------|--------|
| `User already exists` | Boshqa email ishlatib ko'ring |
| `Invalid credentials` | Email/password to'g'ri ekanligini tekshiring |
| `jwt malformed` | Token format to'g'ri, `.env` da `JWT_SECRET` borligini tekshiring |

---

## 🎯 QADAM 7: FINAL TESTING

### ✅ COMPLETE CHECKLIST:

#### Backend Tests:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
curl http://localhost:5000/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"test123"}'
```

#### Frontend Tests:
- [ ] Home page loads (`http://localhost:3000`)
- [ ] Products page loads (`http://localhost:3000/products`)
- [ ] Login page loads (`http://localhost:3000/login`)
- [ ] Registration works
- [ ] Product creation works
- [ ] No console errors

#### Browser DevTools:
- [ ] Console: No errors
- [ ] Network: All API calls return 200/201
- [ ] Application: LocalStorage has token after login

### ✅ SUCCESS CRITERIA:

**Terminal (Backend):**
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
✓ All routes loaded
```

**Terminal (Frontend):**
```
✓ VITE ready in 500ms
✓ Local: http://localhost:3000
✓ No compilation errors
```

**Browser:**
```
✓ Home page visible
✓ Navigation working
✓ Forms submitting
✓ API responses visible in Network tab
```

---

## 📊 FINAL HISOBOT FORMATI

```
=== OPTOMARKET.UZ IMPLEMENTATION HISOBOTI ===

✅ BACKEND STATUS:
   - Server: Running on port 5000
   - Database: Connected to MongoDB
   - Health API: ✓ Working
   - Products API: ✓ Working
   - Auth API: ✓ Working

✅ FRONTEND STATUS:
   - Dev Server: Running on port 3000
   - Home Page: ✓ Rendered
   - Products Page: ✓ Rendered
   - Auth Pages: ✓ Rendered
   - API Integration: ✓ Working

✅ TESTING RESULTS:
   - Backend Tests: 5/5 passed
   - Frontend Tests: 6/6 passed
   - Integration Tests: 3/3 passed
   - Console Errors: 0
   - Network Errors: 0

🎉 STATUS: READY FOR DEVELOPMENT
```

---

## 🆘 UMUMIY XATOLAR VA YECHIMLAR

### Port Conflicts:
```bash
# Backend port busy
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend port busy  
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables:
```bash
# Backend .env should have:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/optommarket
JWT_SECRET=your_secret_key_here

# Frontend .env should have:
VITE_API_URL=http://localhost:5000/api
```

### Database Connection Issues:
```bash
# Check MongoDB service
# Windows:
net start MongoDB

# Check connection:
mongosh
show dbs
```

---

**Guide tugadi. Har qadam birin-ketin bajaring va tekshiring!** ✅
