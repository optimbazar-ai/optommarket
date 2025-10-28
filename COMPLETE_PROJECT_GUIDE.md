# 🚀 FULL-STACK E-COMMERCE LOYIHASINI 0 DAN YARATISH

## 📋 Mundarija

1. [Loyiha Tavsifi](#loyiha-tavsifi)
2. [Texnologiyalar](#texnologiyalar)
3. [Loyiha Strukturasi](#loyiha-strukturasi)
4. [Qadam-ba-Qadam Setup](#qadam-ba-qadam-setup)
5. [AI Promptlar](#ai-promptlar)
6. [Database Setup](#database-setup)
7. [Backend Development](#backend-development)
8. [Frontend Development](#frontend-development)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Loyiha Tavsifi

**Loyiha Nomi:** OPTOMMARKET - B2B E-commerce Platform

**Asosiy Funksiyalar:**
- ✅ User authentication (JWT)
- ✅ Product CRUD operations
- ✅ Order management
- ✅ Admin dashboard
- ✅ AI-powered chatbot
- ✅ Telegram bot notifications
- ✅ Blog system (MongoDB)
- ✅ Promotion scheduler
- ✅ AI description generator
- ✅ Role-based access (admin, seller, customer)

**Deployment:**
- Backend: Render.com
- Frontend: Vercel
- Databases: Neon.tech (PostgreSQL) + MongoDB Atlas

---

## 2️⃣ Texnologiyalar

### Backend:
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js",
  "databases": {
    "primary": "PostgreSQL (Neon.tech)",
    "secondary": "MongoDB Atlas"
  },
  "auth": "JWT (jsonwebtoken)",
  "AI": "Google Gemini API",
  "telegram": "node-telegram-bot-api",
  "scheduler": "node-cron",
  "validation": "express-validator",
  "password": "bcryptjs"
}
```

### Frontend:
```json
{
  "framework": "Next.js 14 (React)",
  "or": "Vite + React",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui",
  "icons": "Lucide React",
  "forms": "React Hook Form",
  "state": "Context API / Zustand",
  "http": "Axios"
}
```

---

## 3️⃣ Loyiha Strukturasi

```
optommarket/
├── backend/
│   ├── models/
│   │   ├── db.js                 # PostgreSQL connection
│   │   ├── mongodb.js            # MongoDB connection
│   │   ├── User.js               # User model (PostgreSQL)
│   │   ├── Product.js            # Product model
│   │   └── Order.js              # Order model
│   ├── routes/
│   │   ├── users.js              # Auth routes
│   │   ├── products.js           # Product routes
│   │   ├── orders.js             # Order routes
│   │   ├── admin.js              # Admin routes
│   │   ├── chatbot.js            # AI chatbot
│   │   ├── blogs.js              # Blog routes (MongoDB)
│   │   └── promotions.js         # Promotion routes
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── services/
│   │   ├── telegramBot.js        # Telegram integration
│   │   ├── aiDescriptionGenerator.js  # AI descriptions
│   │   ├── blogGenerator.js      # AI blog generator
│   │   ├── promotionScheduler.js # Promotion scheduler
│   │   └── scheduler.js          # Cron jobs
│   ├── scripts/
│   │   └── createAdminPostgres.js  # Create admin user
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── server.js                 # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Pages/Routes
│   │   ├── context/              # Context providers
│   │   ├── services/             # API services
│   │   ├── hooks/                # Custom hooks
│   │   └── utils/                # Utility functions
│   ├── public/                   # Static files
│   ├── .env.local                # Local env variables
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── DEPLOYMENT_GUIDE.md
```

---

## 4️⃣ Qadam-ba-Qadam Setup

### STEP 1: Loyiha Yaratish

```bash
# 1. Papka yaratish
mkdir optommarket
cd optommarket

# 2. Git boshlash
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# 3. Backend setup
mkdir backend
cd backend
npm init -y

# 4. Backend dependencies
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm install mongoose node-cron node-telegram-bot-api
npm install @google/generative-ai
npm install -D nodemon

# 5. Frontend setup
cd ..
npx create-next-app@latest frontend
# yoki Vite uchun:
npm create vite@latest frontend -- --template react

cd frontend
npm install axios react-hook-form lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### STEP 2: Database Setup

**PostgreSQL (Neon.tech):**

1. https://neon.tech ga o'ting
2. Sign up qiling
3. Project yarating: `optommarket_db`
4. Connection string oling:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/optommarket_db?sslmode=require
```

**MongoDB (Atlas):**

1. https://mongodb.com/cloud/atlas ga o'ting
2. Cluster yarating (Free tier)
3. Database user yarating
4. Connection string oling:
```
mongodb+srv://user:password@cluster.mongodb.net/optommarket?retryWrites=true&w=majority
```

### STEP 3: Environment Variables

**Backend `.env`:**
```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL (Neon.tech)
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/optommarket_db?sslmode=require

# MongoDB (Atlas)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/optommarket

# JWT
JWT_SECRET=your_super_secret_key_min_32_characters_long

# Google Gemini AI
GEMINI_API_KEY=AIzaSy...

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_CHAT_ID=-100...

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Frontend `.env.local`:**
```env
# Vite uchun
VITE_API_URL=http://localhost:5000/api

# Next.js uchun
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=OPTOMMARKET
```

---

## 5️⃣ AI Promptlar

### Prompt 1: Backend Server Setup

```
Men Node.js va Express ishlatib e-commerce backend yaratmoqchiman.

Talablar:
1. Express server (port 5000)
2. CORS sozlash
3. PostgreSQL database connection (pg kutubxonasi)
4. MongoDB connection (mongoose)
5. Environment variables (.env)
6. Error handling middleware
7. Request logging

Quyidagi strukturada kod yozing:
- server.js - asosiy server
- models/db.js - PostgreSQL connection
- models/mongodb.js - MongoDB connection

server.js da asosiy API routes uchun placeholder qoldiring.
```

### Prompt 2: Authentication System

```
JWT authentication system yaratish kerak.

Talablar:
1. User model (PostgreSQL):
   - id, username, email, password_hash, phone, role, created_at
2. Routes:
   - POST /api/users/register
   - POST /api/users/login
   - GET /api/users/profile (protected)
3. Password hashing (bcryptjs)
4. JWT token generation va verification
5. Auth middleware

Kod yozing:
- models/User.js
- routes/users.js
- middleware/auth.js
```

### Prompt 3: Product Management

```
Product CRUD operations yaratish.

Talablar:
1. Product model (PostgreSQL):
   - id, name, description, price, category, image_url, stock, created_at
2. Routes:
   - GET /api/products (public)
   - GET /api/products/:id (public)
   - POST /api/products (admin only)
   - PUT /api/products/:id (admin only)
   - DELETE /api/products/:id (admin only)
3. Image upload support
4. Pagination va filtering

Kod:
- models/Product.js
- routes/products.js
```

### Prompt 4: Admin Dashboard API

```
Admin dashboard uchun API endpoints.

Talablar:
1. Dashboard statistics:
   - Total users
   - Total orders
   - Total revenue
   - Recent orders
2. User management:
   - GET /api/admin/users
   - PUT /api/admin/users/:id/role
   - DELETE /api/admin/users/:id
3. Admin-only middleware protection

Kod:
- routes/admin.js
```

### Prompt 5: AI Chatbot

```
Google Gemini AI ishlatib chatbot yaratish.

Talablar:
1. POST /api/chatbot/chat endpoint
2. Google Generative AI integration
3. Conversation history saqlash
4. Rate limiting
5. Error handling

Kod:
- routes/chatbot.js
```

### Prompt 6: Telegram Bot Integration

```
Telegram bot orqali notifications yuborish.

Talablar:
1. node-telegram-bot-api ishlatish
2. Yangi order bildirishnomalari
3. Admin tasdiqlash so'rovlari
4. Production da polling o'chirish

Kod:
- services/telegramBot.js
```

### Prompt 7: Scheduler System

```
node-cron ishlatib avtomatik vazifalar yaratish.

Talablar:
1. Kunlik blog generation (09:00)
2. Product promotion scheduling (10:00, 14:00, 18:00)
3. Expired promotions cleanup (har soat)
4. MongoDB ga blog va promotion saqlash

Kod:
- services/scheduler.js
- services/blogGenerator.js
- services/promotionScheduler.js
```

### Prompt 8: Frontend Setup (Next.js)

```
Next.js 14 ishlatib e-commerce frontend yaratish.

Talablar:
1. Tailwind CSS styling
2. Pages:
   - Home (/)
   - Login (/login)
   - Register (/register)
   - Products (/products)
   - Product Detail (/products/[id])
   - Cart (/cart)
   - Admin Dashboard (/admin)
3. Auth Context
4. API service (axios)
5. Protected routes

Strukturani yarating va asosiy komponentlar yozing.
```

### Prompt 9: Frontend Components

```
Reusable React components yaratish.

Kerakli componentlar:
1. Navbar - navigation menu
2. ProductCard - product display card
3. Cart - shopping cart
4. LoginForm - login form with validation
5. AdminSidebar - admin navigation
6. Modal - reusable modal dialog
7. Loading - loading spinner

Tailwind CSS va Lucide React icons ishlatish.
```

### Prompt 10: Deployment Configuration

```
Production deployment uchun konfiguratsiya.

Kerak:
1. Backend uchun:
   - Render.com deploy qilish (render.yaml)
   - Environment variables sozlash
   - CORS production URLs
   - Health check endpoint

2. Frontend uchun:
   - Vercel deploy qilish (vercel.json)
   - Environment variables
   - Build optimization

Fayllar yarating:
- render.yaml
- vercel.json
- .env.production.example
```

---

## 6️⃣ Database Schema

### PostgreSQL Tables

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Create admin user
INSERT INTO users (username, email, password_hash, role)
VALUES (
  'Admin',
  'admin@optommarket.uz',
  '$2a$10$Jd3sjBm2KD5K5hli3pzhlu5pNwOjhnLhXXoE.PKyNHs7PfPturwhO',
  'admin'
);
```

### MongoDB Collections

```javascript
// Blog schema
{
  title: String,
  content: String,
  category: String,
  tags: [String],
  author: String,
  published: Boolean,
  createdAt: Date
}

// Promotion schema
{
  productId: Number,
  discount: Number,
  startDate: Date,
  endDate: Date,
  active: Boolean,
  createdAt: Date
}

// Analytics schema
{
  date: Date,
  pageViews: Number,
  uniqueVisitors: Number,
  orders: Number,
  revenue: Number
}
```

---

## 7️⃣ Backend Development - Ketma-ketlik

### 1. Basic Server Setup

```bash
# server.js yaratish
node server.js  # Test qilish
```

### 2. Database Connections

```bash
# PostgreSQL test
# MongoDB test
```

### 3. Authentication System

```bash
# User model
# Auth routes
# Test with Postman/Thunder Client
POST http://localhost:5000/api/users/register
POST http://localhost:5000/api/users/login
```

### 4. CRUD Operations

```bash
# Products
# Orders
# Admin endpoints
```

### 5. Advanced Features

```bash
# AI Chatbot
# Telegram Bot
# Schedulers
```

---

## 8️⃣ Frontend Development - Ketma-ketlik

### 1. Project Setup

```bash
npm run dev  # Start dev server
```

### 2. Routing va Pages

```bash
# Home page
# Auth pages (login, register)
# Product pages
```

### 3. State Management

```bash
# Auth Context
# Cart Context
# API Service
```

### 4. Components

```bash
# UI Components
# Feature Components
```

### 5. Integration

```bash
# Connect to backend
# Test all features
```

---

## 9️⃣ Deployment

### Backend (Render.com):

1. GitHub repository yarating
2. Code ni push qiling
3. Render.com ga o'ting
4. New Web Service yarating
5. GitHub repo ni ulang
6. Environment variables qo'shing
7. Deploy qiling

**render.yaml:**
```yaml
services:
  - type: web
    name: optommarket-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
```

### Frontend (Vercel):

1. Vercel CLI install: `npm i -g vercel`
2. `vercel login`
3. `cd frontend && vercel --prod`
4. Environment variables qo'shing
5. Deploy tugashi kutiladi

**vercel.json:**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🔟 Troubleshooting

### CORS Errors:

```javascript
// server.js
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### Database Connection Issues:

```bash
# Test PostgreSQL
psql "postgresql://..."

# Test MongoDB
mongosh "mongodb+srv://..."
```

### Environment Variables:

```bash
# Local test
cat .env

# Production
# Check Render.com / Vercel dashboard
```

### Login 500 Error:

1. Check user exists in database
2. Verify password hash correct
3. Check JWT_SECRET configured
4. Review backend logs

---

## 📚 Qo'shimcha Resurslar

### Documentation:
- Express.js: https://expressjs.com
- Next.js: https://nextjs.org
- PostgreSQL: https://postgresql.org
- MongoDB: https://mongodb.com/docs

### Deployment:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs

### APIs:
- Google Gemini: https://ai.google.dev
- Telegram Bot: https://core.telegram.org/bots

---

## ✅ Checklist

### Backend:
- [ ] Server running locally
- [ ] PostgreSQL connected
- [ ] MongoDB connected
- [ ] Authentication working
- [ ] CRUD operations tested
- [ ] AI features implemented
- [ ] Deployed to Render.com

### Frontend:
- [ ] Pages created
- [ ] Components working
- [ ] API integration done
- [ ] Styling complete
- [ ] Responsive design
- [ ] Deployed to Vercel

### Production:
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Admin user created
- [ ] Testing complete
- [ ] Documentation updated

---

## 🎓 Xulosa

Ushbu qo'llanma yordamida siz:
1. To'liq full-stack e-commerce loyiha yaratasiz
2. Modern texnologiyalarni o'rganasiz
3. AI integratsiyasini amalga oshirasiz
4. Production ga deploy qilasiz

**Muvaffaqiyat tilayman!** 🚀
