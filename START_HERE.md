# 🚀 START HERE - OptoMarket.uz

**MongoDB Atlas** bilan configured! ✅

---

## ⚡ Tez Boshlash (3 qadam)

### ✅ QADAM 1: Backend Dependencies

```bash
cd backend
npm install
```

### ✅ QADAM 2: Database Seed

```bash
npm run seed
```

**Test credentials:**
- Email: `test@optommarket.uz`
- Password: `test123`

### ✅ QADAM 3: Ishga Tushirish

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected:
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Expected:
```
VITE ready in 500ms
➜ Local: http://localhost:3000/
```

---

## 🌐 Test Qilish

### 1. Browser
```
http://localhost:3000
```

### 2. Login
```
Email: test@optommarket.uz
Password: test123
```

### 3. API Test
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

---

## 📊 MongoDB Atlas Info

**Connection:** ✅ Configured  
**Database:** `optommarket`  
**Cluster:** `cluster0.nxc5sbb.mongodb.net`

**Afzalliklari:**
- ✅ Cloud-based (internetdan kirish mumkin)
- ✅ Local MongoDB kerak emas
- ✅ Automatic backups
- ✅ Free tier

---

## 📚 To'liq Dokumentatsiya

| Fayl | Maqsad |
|------|--------|
| **MONGODB_ATLAS_SETUP.md** | MongoDB Atlas configuration |
| **QUICK_START.md** | 5 daqiqada boshlash |
| **IMPLEMENTATION_GUIDE.md** | Har qadam uchun guide |
| **TESTING_CHECKLIST.md** | Test checklist |
| **README.md** | To'liq dokumentatsiya |

---

## ✅ Current Status

- [x] MongoDB Atlas connection configured
- [x] `.env` file created
- [x] Backend ready
- [x] Frontend ready
- [x] Documentation complete

---

## 🎯 Next Steps

1. ✅ `cd backend && npm install` (running...)
2. ⏳ `npm run seed` (keyingi)
3. ⏳ `npm run dev` (keyingi)
4. ⏳ Frontend ishga tushirish

---

## 🆘 Yordam

**Xatolik bo'lsa:**
- `MONGODB_ATLAS_SETUP.md` → Troubleshooting
- `IMPLEMENTATION_GUIDE.md` → Har qadam uchun
- Terminal logsni o'qing

---

**✅ Everything is configured and ready to go!**

**Keyingi buyruq:**
```bash
cd backend
npm run seed
```
