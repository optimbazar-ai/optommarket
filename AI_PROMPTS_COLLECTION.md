# 🤖 AI ASSISTANT UCHUN PROMPT TO'PLAMI

Ushbu promptlarni AI assistant (ChatGPT, Claude, Windsurf, etc.) bilan ishlatib, loyihani qadam-ba-qadam yaratishingiz mumkin.

---

## 🎯 UMUMIY LOYIHA PROMPT

```
Men professional full-stack e-commerce web application yaratmoqchiman.

TEXNOLOGIYALAR:
- Backend: Node.js + Express
- Frontend: Next.js yoki Vite + React
- Database: PostgreSQL (Neon.tech) + MongoDB (Atlas)
- Auth: JWT
- AI: Google Gemini API
- Telegram: Telegram Bot API
- Styling: Tailwind CSS

FUNKSIYALAR:
1. User authentication (register, login, profile)
2. Product CRUD (create, read, update, delete)
3. Order management
4. Admin dashboard
5. AI-powered chatbot
6. Telegram notifications
7. Blog system (MongoDB)
8. Product promotion scheduler
9. AI description generator

Loyihani boshlash uchun folder structure va package.json larlarn yozib bering.
```

---

## 📂 STEP-BY-STEP PROMPTS

### PROMPT 1: Project Initialization

```
Loyiha strukturasini yarating:

optommarket/
├── backend/
└── frontend/

Backend uchun:
1. Express.js server setup
2. package.json dependencies:
   - express, cors, dotenv
   - pg (PostgreSQL client)
   - mongoose (MongoDB)
   - bcryptjs, jsonwebtoken
   - @google/generative-ai
   - node-telegram-bot-api
   - node-cron
3. .env.example yarating
4. .gitignore yarating

Frontend uchun:
1. Next.js yoki Vite setup
2. package.json dependencies:
   - axios
   - react-hook-form
   - lucide-react
   - tailwindcss
3. .env.example yarating

Barcha kerakli fayllar va konfiguratsiyalarni yarating.
```

### PROMPT 2: Database Models

```
PostgreSQL models yarating (backend/models/):

1. db.js - PostgreSQL connection pool:
   ```javascript
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });
   ```

2. User.js - User model:
   Methods:
   - create(userData)
   - findByEmail(email)
   - findById(id)
   - verifyPassword(plain, hashed)
   - getAll()
   - update(id, data)
   - delete(id)

3. Product.js - Product model:
   Methods:
   - create, findAll, findById, update, delete
   - findByCategory(category)
   - search(query)

4. Order.js - Order model:
   Methods:
   - create, findAll, findById, findByUser
   - updateStatus(id, status)

5. mongodb.js - MongoDB connection va schemas (Blog, Promotion, Analytics)

Har bir model uchun to'liq kod yozing.
```

### PROMPT 3: Authentication System

```
JWT authentication system yarating:

1. backend/routes/users.js:
   Routes:
   - POST /register
   - POST /login
   - GET /profile (protected)
   - PUT /profile (protected)
   
2. backend/middleware/auth.js:
   - verifyToken middleware
   - isAdmin middleware
   - isSeller middleware

3. Features:
   - Password hashing (bcryptjs, 10 rounds)
   - JWT token (7 days expiry)
   - Role-based access control (admin, seller, customer)
   - Error handling

Validation:
- Email format check
- Password min 6 characters
- Required fields check

To'liq kodlarni yozing.
```

### PROMPT 4: Product Management

```
Product CRUD API yarating (backend/routes/products.js):

PUBLIC routes:
- GET /api/products - Get all products (pagination, filtering)
- GET /api/products/:id - Get single product
- GET /api/products/category/:category - Products by category
- GET /api/products/search?q=query - Search products

ADMIN routes (protected):
- POST /api/products - Create product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product
- PUT /api/products/:id/stock - Update stock

Features:
- Image URL support
- Stock management
- Category filtering
- Price range filtering
- Pagination (limit, offset)
- Sort (price, name, date)

Error handling va validation qo'shing.
```

### PROMPT 5: Admin Dashboard

```
Admin dashboard API yarating (backend/routes/admin.js):

Endpoints:
1. GET /api/admin/dashboard - Statistics
   Response:
   {
     totalUsers: number,
     totalOrders: number,
     totalRevenue: number,
     recentOrders: Order[]
   }

2. GET /api/admin/users - All users
3. PUT /api/admin/users/:id/role - Change user role
4. DELETE /api/admin/users/:id - Delete user
5. GET /api/admin/orders - All orders
6. PUT /api/admin/orders/:id/status - Update order status
7. GET /api/admin/products - All products (with filters)
8. GET /api/admin/analytics - Analytics data

Har bir endpoint uchun to'liq kod yozing.
Admin middleware bilan protect qiling.
```

### PROMPT 6: AI Chatbot

```
Google Gemini AI chatbot yarating (backend/routes/chatbot.js):

Endpoint: POST /api/chatbot/chat

Request body:
{
  message: string,
  history?: Array<{role, content}>
}

Features:
1. Google Generative AI SDK ishlatish
2. Gemini-1.5-flash model
3. Conversation history support
4. System prompt:
   "You are a helpful e-commerce assistant for OPTOMMARKET.
   Help users with product queries, orders, and general questions.
   Be professional and friendly."
5. Error handling
6. Rate limiting (optional)
7. Response streaming (optional)

To'liq working kod yozing.
Environment: GEMINI_API_KEY
```

### PROMPT 7: Telegram Bot Integration

```
Telegram bot yarating (backend/services/telegramBot.js):

Functions needed:
1. initializeTelegramBot() - Bot initialize
2. sendNotification(message) - Send message to admin
3. sendOrderNotification(order) - New order alert
4. sendAdminApproval(data) - Admin approval needed

Configuration:
- Production da polling o'chirish
- Error handling
- Markdown formatting support

Events:
- New order created
- New user registered
- Product stock low alert

Environment variables:
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID

To'liq kod yozing.
```

### PROMPT 8: Scheduler System

```
Cron job scheduler yarating (backend/services/):

1. scheduler.js - Main scheduler:
   Tasks:
   - Daily blog generation (09:00 Tashkent time)
   - Promotion scheduling (10:00, 14:00, 18:00)
   - Expired promotions cleanup (hourly)

2. blogGenerator.js - AI blog generator:
   - Use Gemini API
   - Topics: e-commerce tips, product reviews, industry news
   - Save to MongoDB (blogs collection)
   - Auto-publish

3. promotionScheduler.js - Promotion manager:
   - Select products for promotion
   - Set discount percentage
   - Set start/end dates
   - Save to MongoDB
   - Deactivate expired

4. aiDescriptionGenerator.js - Product description AI:
   - Generate descriptions from product name
   - Use Gemini API
   - Return formatted description

node-cron ishlatib to'liq kod yozing.
```

### PROMPT 9: Frontend Pages (Next.js)

```
Next.js pages yarating (app/ folder):

1. page.tsx - Home page:
   - Hero section
   - Featured products
   - Categories
   - Latest blog posts
   - Call to action

2. login/page.tsx - Login page:
   - Email/password form
   - Form validation
   - Remember me checkbox
   - Link to register
   - Social login (optional)

3. register/page.tsx - Register page:
   - Full registration form
   - Password strength indicator
   - Terms & conditions checkbox

4. products/page.tsx - Products listing:
   - Grid/List view toggle
   - Filters (category, price)
   - Sort options
   - Pagination
   - Search bar

5. products/[id]/page.tsx - Product detail:
   - Product images
   - Description
   - Price
   - Add to cart button
   - Related products
   - Reviews section

6. admin/page.tsx - Admin dashboard:
   - Statistics cards
   - Charts (orders, revenue)
   - Recent activity
   - Quick actions

Tailwind CSS va shadcn/ui components ishlatib to'liq kod yozing.
```

### PROMPT 10: Frontend Components

```
Reusable React components yarating (components/):

1. Navbar.tsx:
   - Logo
   - Navigation links
   - Search bar
   - User dropdown
   - Cart icon with badge
   - Mobile responsive menu

2. ProductCard.tsx:
   Props: {product}
   - Product image
   - Name, price
   - Add to cart button
   - Favorite button
   - Discount badge

3. Cart.tsx:
   - Cart items list
   - Quantity controls
   - Total price
   - Checkout button
   - Empty cart state

4. AdminSidebar.tsx:
   - Navigation menu
   - Active link indicator
   - Logout button
   - Collapsible on mobile

5. Modal.tsx:
   Props: {isOpen, onClose, children}
   - Overlay backdrop
   - Close button
   - Animations
   - Trap focus

6. Loading.tsx:
   - Spinner animation
   - Skeleton loaders
   - Progress bar

7. SearchBar.tsx:
   - Auto-suggest
   - Debounced search
   - Recent searches
   - Categories filter

Tailwind CSS, Lucide icons, TypeScript ishlatib to'liq kod yozing.
```

### PROMPT 11: API Service Layer

```
Frontend API service yarating (services/api.ts):

1. Axios instance:
   - Base URL from env
   - Auth token interceptor
   - Error interceptor
   - Response interceptor

2. Auth API:
   - login(email, password)
   - register(userData)
   - logout()
   - getProfile()
   - updateProfile(data)

3. Products API:
   - getProducts(filters)
   - getProduct(id)
   - searchProducts(query)
   - createProduct(data) // admin
   - updateProduct(id, data) // admin
   - deleteProduct(id) // admin

4. Orders API:
   - createOrder(orderData)
   - getOrders()
   - getOrder(id)
   - updateOrderStatus(id, status) // admin

5. Chatbot API:
   - sendMessage(message, history)

6. Admin API:
   - getDashboardStats()
   - getUsers()
   - updateUserRole(id, role)
   - getAnalytics()

TypeScript types bilan to'liq kod yozing.
```

### PROMPT 12: State Management

```
React Context va hooks yarating (context/):

1. AuthContext.tsx:
   State:
   - user: User | null
   - token: string | null
   - loading: boolean
   
   Functions:
   - login(email, password)
   - register(userData)
   - logout()
   - checkAuth()
   
   LocalStorage integration

2. CartContext.tsx:
   State:
   - items: CartItem[]
   - total: number
   
   Functions:
   - addItem(product, quantity)
   - removeItem(productId)
   - updateQuantity(productId, quantity)
   - clearCart()
   
   LocalStorage persistence

3. Custom hooks:
   - useAuth() - Access auth context
   - useCart() - Access cart context
   - useApi(endpoint) - Fetch data hook
   - useDebounce(value, delay) - Debounce hook

TypeScript bilan to'liq kod yozing.
```

### PROMPT 13: Protected Routes

```
Next.js protected routes yarating:

1. middleware.ts - Route protection:
   - Check authentication
   - Role-based access
   - Redirect logic

2. ProtectedRoute component:
   - Verify token
   - Check user role
   - Loading state
   - Redirect to login

3. Admin-only pages protection
4. Seller-only pages protection

Routes:
- /admin/* - Admin only
- /seller/* - Seller only
- /profile - Authenticated only
- /orders - Authenticated only

To'liq Next.js 14 App Router bilan kod yozing.
```

### PROMPT 14: Deployment Configuration

```
Production deployment setup yarating:

1. Backend (Render.com):
   File: render.yaml
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

2. Frontend (Vercel):
   File: vercel.json
   - Build command
   - Output directory
   - Environment variables
   - Redirects/rewrites

3. Environment setup:
   - .env.production.example
   - Backend va frontend URLs
   - API keys
   - Database connections

4. CORS configuration:
   - Production domain qo'shish
   - Credentials support

5. Health check endpoint:
   - GET /health
   - GET /api/health

To'liq konfiguratsiya fayllarini yarating.
```

### PROMPT 15: Database Migration Scripts

```
Database initialization scripts yarating:

1. init-postgres.sql:
   - CREATE TABLE statements
   - Indexes
   - Constraints
   - Initial data (categories, admin user)

2. seed-data.js:
   - Sample products
   - Sample users
   - Sample orders

3. createAdmin.js script:
   - Create admin user
   - Hash password
   - Insert to database
   - Console output

To'liq SQL va JavaScript kod yozing.
Environment variables ishlatish.
```

---

## 🎨 STYLING PROMPTS

### PROMPT: Tailwind Configuration

```
Tailwind CSS konfiguratsiyasini sozlang:

1. tailwind.config.js:
   - Custom colors (brand colors)
   - Custom fonts
   - Custom breakpoints
   - Plugins (forms, typography)

2. global.css:
   - CSS reset
   - Custom utilities
   - Animations
   - Dark mode variables

Colors:
- Primary: Blue (#3B82F6)
- Secondary: Indigo (#6366F1)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

To'liq konfiguratsiya yarating.
```

---

## 🐛 DEBUGGING PROMPTS

### PROMPT: Error Handling

```
Global error handling yarating:

Backend:
1. Error middleware (express):
   - 404 handler
   - 500 handler
   - Validation errors
   - Database errors
   - JWT errors

2. Custom Error class:
   - statusCode
   - message
   - stack trace (dev only)

3. Logging:
   - Console logs (dev)
   - File logs (production)
   - Error reporting service integration

Frontend:
1. Error boundary component
2. API error handling
3. Form validation errors
4. Toast notifications

To'liq kod yozing.
```

---

## 📚 DOCUMENTATION PROMPTS

### PROMPT: API Documentation

```
API documentation yarating (README.md format):

Har bir endpoint uchun:
- Method va URL
- Request headers
- Request body
- Response format
- Status codes
- Error responses
- Example requests (curl)
- Example responses (JSON)

Authentication qismini alohida yozing.
Postman collection format ham qo'shing.
```

---

## ✅ FINAL INTEGRATION PROMPT

```
Barcha qismlarni birlashtiring:

1. Backend server.js da:
   - Barcha routes import
   - Middleware order to'g'ri
   - Error handling
   - Graceful shutdown

2. Frontend _app.tsx da:
   - Context providers wrap
   - Global styles
   - Font loading
   - Analytics integration

3. Testing:
   - Backend endpoints test
   - Frontend pages test
   - Integration test

4. Production checklist:
   - Environment variables set
   - Database migrated
   - Admin user created
   - CORS configured
   - SSL enabled

To'liq integration guide yozing.
```

---

## 🎓 NASONLIKLAR

### Promptlarni Qanday Ishlatish:

1. **Ketma-ketlikda boring** - Birinchi PROMPT 1 dan boshlang
2. **Har bir promptni alohida yuboring** - Bir vaqtda bitta task
3. **Kod olganingizdan keyin test qiling** - Ishlaganini tekshiring
4. **Xato bo'lsa, debugging prompt ishlatilan** - AI ga xatoni tushuntiring
5. **Qo'shimcha savol bering** - Tushunmagan joyingizni so'rang

### AI Assistant Bilan Ishlash Tips:

```
Yaxshi prompt:
"Express.js da JWT authentication middleware yarating.
verifyToken function header dan token olsin, jwt.verify bilan tekshirsin,
req.user ga ma'lumot qo'ysin. Error handling qo'shing."

Yomon prompt:
"Auth yozib ber."
```

### Davom Ettirish:

```
Agar AI to'xtab qolsa:
"Davom eting" yoki "Continue" yozing.

Agar kod yarim bo'lsa:
"To'liq kodini yozing" yoki "Complete the code"

Agar xatolik bo'lsa:
"Bu xato chiqdi: [error message]. Tuzating."
```

---

## 🚀 Qo'shimcha AI Prompts

### Code Review Prompt:

```
Quyidagi kodimni tekshiring va yaxshilash bo'yicha tavsiyalar bering:

[KODINGIZNI KIRITING]

Quyidagilarni tekshiring:
1. Security issues
2. Performance optimization
3. Code organization
4. Error handling
5. Best practices
6. TypeScript types
```

### Refactoring Prompt:

```
Quyidagi kodni refactor qiling:

[KODINGIZNI KIRITING]

Goals:
1. DRY (Don't Repeat Yourself)
2. SOLID principles
3. Clean code
4. Better naming
5. Remove unused code
```

### Testing Prompt:

```
Quyidagi function uchun test yozing:

[FUNCTION KODINI KIRITING]

Framework: Jest yoki Vitest
Test cases:
1. Happy path
2. Edge cases
3. Error cases
4. Mocking external dependencies
```

---

**Bu promptlar bilan siz to'liq professional loyiha yaratishingiz mumkin!** 🎉

**Eslatma:** Har bir prompt AI assistant ga individual task sifatida yuboring. Bir vaqtda ko'p task bermang.
