# 🛒 OptoMarket.uz - Optom Savdo Platformasi

O'zbekistondagi eng yirik optom savdo platformasi. MERN Stack (MongoDB, Express, React, Node.js) texnologiyalarida qurilgan.

## 📋 Loyiha haqida

OptoMarket.uz - bu ishonchli va qulay optom xaridlar uchun yaratilgan zamonaviy marketplace platformasi.

### ✨ Asosiy xususiyatlar

#### E-commerce Features:
- 🔐 Foydalanuvchi autentifikatsiyasi (JWT)
- 🛍️ Mahsulotlar katalogi
- 🔍 Qidiruv va filtrlash
- 📦 Kategoriyalar tizimi
- 💰 Optom narxlari
- 🛒 Shopping cart & checkout
- 💳 Click va Payme to'lov tizimi
- 📱 Responsive dizayn
- 🎨 Modern UI (TailwindCSS)

#### Admin Panel Features:
- 📊 Dashboard with analytics
- 📦 Product management (CRUD)
- 🏷️ Category management (CRUD)
- 📋 Order management & tracking
- 👥 User management (roles, permissions)
- 📝 Blog/CMS system with WYSIWYG editor
- 📈 Advanced statistics & charts
- ⚙️ Settings (store, shipping, tax)

## 🚀 Texnologiyalar

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **ReactQuill** - WYSIWYG editor
- **Recharts** - Data visualization

## 📁 Loyiha strukturasi

```
optommarketuz/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   ├── .env            # Environment variables
│   ├── server.js       # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env            # Environment variables
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── IMPLEMENTATION_GUIDE.md  # Qadam-baqadam yo'riqnoma
└── README.md
```

## ⚙️ O'rnatish va ishga tushirish

### Talablar

- Node.js (v18 yoki undan yuqori)
- MongoDB (v6 yoki undan yuqori)
- npm yoki yarn

### 1️⃣ Repositoriyani klonlash

```bash
git clone <repository-url>
cd optommarketuz
```

### 2️⃣ Backend o'rnatish

```bash
cd backend
npm install
```

Backend `.env` faylini sozlang:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/optommarket
JWT_SECRET=optommarket_secret_key_2024_change_in_production
JWT_EXPIRE=7d
```

### 3️⃣ Frontend o'rnatish

```bash
cd frontend
npm install
```

Frontend `.env` faylini sozlang:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ MongoDB-ni ishga tushirish

**Windows:**
```bash
net start MongoDB
```

**MacOS/Linux:**
```bash
brew services start mongodb-community
# yoki
sudo systemctl start mongod
```

### 5️⃣ Database-ga ma'lumot to'ldirish

```bash
cd backend
npm run seed
```

Bu buyruq:
- 5 ta kategoriya yaratadi
- 6 ta namuna mahsulot qo'shadi
- Test foydalanuvchi yaratadi

**Test foydalanuvchi:**
- Email: `test@optommarket.uz`
- Parol: `test123`

**Admin foydalanuvchi:**
- Email: `admin@optommarket.uz`
- Parol: `admin123`
- Admin yaratish: `npm run create-admin`

### 6️⃣ Backend-ni ishga tushirish

```bash
cd backend
npm run dev
```

Server `http://localhost:5000` da ishga tushadi

### 7️⃣ Frontend-ni ishga tushirish

Yangi terminal oching:

```bash
cd frontend
npm run dev
```

Frontend `http://localhost:3000` da ochiladi

## 🧪 API Endpoints

### Health Check
```bash
GET http://localhost:5000/api/health
```

### Authentication
```bash
POST /api/auth/register - Ro'yxatdan o'tish
POST /api/auth/login    - Kirish
GET  /api/auth/me       - Foydalanuvchi ma'lumotlari (protected)
```

### Products
```bash
GET    /api/products     - Barcha mahsulotlar
GET    /api/products/:id - Bitta mahsulot
POST   /api/products     - Mahsulot qo'shish (protected)
PUT    /api/products/:id - Mahsulot yangilash (protected)
DELETE /api/products/:id - Mahsulot o'chirish (protected)
```

### Categories
```bash
GET  /api/categories     - Barcha kategoriyalar
GET  /api/categories/:id - Bitta kategoriya
POST /api/categories     - Kategoriya qo'shish (protected)
```

### Admin (Admin only - requires admin role)
```bash
# Dashboard
GET    /api/admin/dashboard        - Admin dashboard stats

# Products Management
GET    /api/admin/products         - Get all products
POST   /api/admin/products         - Create product
PUT    /api/admin/products/:id     - Update product
DELETE /api/admin/products/:id     - Delete product

# Orders Management
GET    /api/admin/orders           - Get all orders
PUT    /api/admin/orders/:id/status - Update order status

# Users Management
GET    /api/admin/users            - Get all users
GET    /api/admin/users/stats      - Get user statistics
GET    /api/admin/users/:id/orders - Get user orders
PUT    /api/admin/users/:id/role   - Update user role
DELETE /api/admin/users/:id        - Delete user

# Categories Management
GET    /api/admin/categories       - Get all categories
POST   /api/admin/categories       - Create category
PUT    /api/admin/categories/:id   - Update category
DELETE /api/admin/categories/:id   - Delete category

# Blog Management
GET    /api/admin/blog             - Get all blog posts
POST   /api/admin/blog             - Create blog post
PUT    /api/admin/blog/:id         - Update blog post
DELETE /api/admin/blog/:id         - Delete blog post
PUT    /api/admin/blog/:id/publish - Publish/unpublish post

# Analytics
GET    /api/admin/analytics/sales       - Sales analytics
GET    /api/admin/analytics/top-products - Top products
GET    /api/admin/analytics/categories   - Category analytics
GET    /api/admin/stats/detailed         - Detailed statistics
```

## 📖 Foydalanish

### Health Check tekshirish

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "dbName": "optommarket",
  "timestamp": "2024-10-22T03:19:00.000Z",
  "service": "OptoMarket API",
  "version": "1.0.0"
}
```

### Login qilish

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@optommarket.uz","password":"test123"}'
```

### Mahsulotlarni olish

```bash
curl http://localhost:5000/api/products
```

## 🔧 Development

### Backend development

```bash
cd backend
npm run dev  # Nodemon bilan auto-reload
```

### Frontend development

```bash
cd frontend
npm run dev  # Hot reload
```

### Production build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📚 Qadam-baqadam yo'riqnoma

To'liq implementation guide uchun `IMPLEMENTATION_GUIDE.md` faylini o'qing.

Guide-da quyidagilar mavjud:
- ✅ Har bir qadam uchun aniq ko'rsatmalar
- ✅ Terminal va browser testlari
- ✅ Xatoliklarni tuzatish jadvali
- ✅ Success criteria har bir qadam uchun

## 🐛 Xatoliklarni tuzatish

### Port band xatolik

```bash
# Backend port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB connection xatolik

1. MongoDB servisini tekshiring:
```bash
# Windows
net start MongoDB

# MacOS/Linux
brew services start mongodb-community
```

2. `.env` faylidagi `MONGODB_URI` to'g'ri ekanligini tekshiring

### CORS xatolik

Backend-da CORS middleware qo'shilgan. Agar muammo bo'lsa:

```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## 🎯 Test Scenarios

### 1. Backend Test
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@optommarket.uz","password":"test123"}'
```

### 2. Frontend Test

1. `http://localhost:3000` - Home page
2. `http://localhost:3000/products` - Products list
3. `http://localhost:3000/login` - Login page
4. `http://localhost:3000/register` - Register page
5. Browser Console (F12) - No errors

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/optommarket
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 👥 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📄 License

MIT License

## 📞 Aloqa

- Email: info@optommarket.uz
- Website: https://optommarket.uz

---

**Made with ❤️ in Uzbekistan**
