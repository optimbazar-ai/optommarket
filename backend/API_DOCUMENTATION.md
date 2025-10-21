# OPTOMMARKET Backend API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "database": "Connected ✅",
  "timestamp": "2025-10-21T04:38:00.000Z",
  "environment": "development"
}
```

---

## User Endpoints

### Register New User
```
POST /api/users/register
```
Body:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "phone": "+998901234567",
  "address": "Tashkent, Uzbekistan"
}
```

### Login User
```
POST /api/users/login
```
Body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get User Profile (Protected)
```
GET /api/users/profile
Headers: Authorization: Bearer <token>
```

### Update User Profile (Protected)
```
PUT /api/users/profile
Headers: Authorization: Bearer <token>
```
Body:
```json
{
  "phone": "+998901234567",
  "address": "New address"
}
```

### Get All Users (Admin Only)
```
GET /api/users
Headers: Authorization: Bearer <admin_token>
```

---

## Product Endpoints

### Get All Products (Public)
```
GET /api/products
GET /api/products?limit=20&offset=0
GET /api/products?category=Oziq-ovqat
GET /api/products?search=guruch
```

### Get Product by ID (Public)
```
GET /api/products/:id
```

### Create Product (Admin Only)
```
POST /api/products
Headers: Authorization: Bearer <admin_token>
```
Body:
```json
{
  "name": "Guruch 50kg",
  "description": "Yuqori sifatli guruch",
  "price": 250000,
  "quantity": 100,
  "category": "Oziq-ovqat",
  "sku": "GURUCH-50KG",
  "image_url": "https://example.com/image.jpg"
}
```

### Update Product (Admin Only)
```
PUT /api/products/:id
Headers: Authorization: Bearer <admin_token>
```

### Delete Product (Admin Only)
```
DELETE /api/products/:id
Headers: Authorization: Bearer <admin_token>
```

### Get Low Stock Products (Admin Only)
```
GET /api/products/stock/low?threshold=10
Headers: Authorization: Bearer <admin_token>
```

---

## Order Endpoints

### Create Order (Protected)
```
POST /api/orders
Headers: Authorization: Bearer <token>
```
Body:
```json
{
  "total_price": 500000,
  "shipping_address": "Tashkent, Chilonzor 12",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 250000
    }
  ]
}
```

### Get User's Orders (Protected)
```
GET /api/orders/my-orders
Headers: Authorization: Bearer <token>
```

### Get All Orders (Admin Only)
```
GET /api/orders
Headers: Authorization: Bearer <admin_token>
```

### Get Order by ID (Protected)
```
GET /api/orders/:id
Headers: Authorization: Bearer <token>
```

### Update Order Status (Admin Only)
```
PUT /api/orders/:id/status
Headers: Authorization: Bearer <admin_token>
```
Body:
```json
{
  "status": "completed"
}
```

### Get Orders by Status (Admin Only)
```
GET /api/orders/status/:status
Headers: Authorization: Bearer <admin_token>
```

---

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Token is received after successful login or registration.

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
