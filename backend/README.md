# OptoMarket.uz Backend API

REST API for OptoMarket.uz marketplace platform.

## 🚀 Quick Start

```bash
npm install
npm run seed  # Load sample data
npm run dev   # Start development server
```

## 📁 Structure

```
backend/
├── config/          # Database configuration
├── middleware/      # Auth & validation middleware
├── models/          # Mongoose models
│   ├── User.js
│   ├── Product.js
│   └── Category.js
├── routes/          # API routes
│   ├── auth.js
│   ├── products.js
│   ├── categories.js
│   └── health.js
├── scripts/         # Utility scripts
│   └── seed.js
├── .env            # Environment variables
└── server.js       # Entry point
```

## 🔧 Environment Variables

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/optommarket
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (protected)

## 🧪 Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@optommarket.uz","password":"test123"}'

# Get products
curl http://localhost:5000/api/products
```

## 📦 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (nodemon)
- `npm run seed` - Seed database with sample data

## 🔐 Authentication

API uses JWT for authentication. Include token in Authorization header:

```
Authorization: Bearer <token>
```

Protected routes require valid JWT token.

## 📝 Models

### User
- name, email, password
- phone, role, companyName
- address object
- timestamps

### Product
- name, description
- price, wholesalePrice
- category (ref)
- stock, minOrderQuantity
- images array
- unit, brand
- featured, active
- timestamps

### Category
- name, slug
- description, icon
- active
- timestamps

## 🛡️ Security

- Passwords hashed with bcryptjs
- JWT token authentication
- Protected routes middleware
- Input validation
- CORS enabled

---

**Backend API v1.0.0**
