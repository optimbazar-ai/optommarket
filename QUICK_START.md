# 🚀 Quick Start Guide - OptoMarket.uz

Loyihani 5 daqiqada ishga tushiring!

## ⚡ Tez boshlash

### 1. MongoDB-ni ishga tushiring

**Windows:**
```bash
net start MongoDB
```

**MacOS/Linux:**
```bash
brew services start mongodb-community
```

### 2. Backend-ni ishga tushiring

```bash
cd backend
npm install
npm run seed
npm run dev
```

✅ Ko'rish kerak:
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
```

### 3. Frontend-ni ishga tushiring

**Yangi terminal oching:**

```bash
cd frontend
npm install
npm run dev
```

✅ Ko'rish kerak:
```
VITE v5.x.x ready in 500ms
➜ Local: http://localhost:3000/
```

### 4. Browser-da oching

```
http://localhost:3000
```

### 5. Test login qiling

```
Email: test@optommarket.uz
Password: test123
```

## 🎯 Test Commands

### Backend test:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

### Login test:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@optommarket.uz","password":"test123"}'
```

## ✅ Success Checklist

- [ ] Backend: `http://localhost:5000/api/health` → 200 OK
- [ ] Frontend: `http://localhost:3000` → Page loads
- [ ] Login works with test credentials
- [ ] Products page shows items
- [ ] No console errors

## 🐛 Quick Fixes

**Port busy?**
```bash
# Kill backend
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill frontend
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**MongoDB not connecting?**
```bash
# Start MongoDB
net start MongoDB

# Check status
mongosh
```

**Dependencies missing?**
```bash
# Reinstall
cd backend && npm install
cd ../frontend && npm install
```

## 📚 More Info

- **Full Guide:** `IMPLEMENTATION_GUIDE.md`
- **Testing:** `TESTING_CHECKLIST.md`
- **README:** `README.md`

---

**Ready to go! 🎉**
