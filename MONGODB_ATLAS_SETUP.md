# 🗄️ MongoDB Atlas Configuration - OptoMarket.uz

**Database:** MongoDB Atlas Cloud  
**Status:** ✅ Configured

---

## 📝 Connection Details

**Connection String:**
```
mongodb+srv://akramfarmonov998_db_user:Er9F2ERiKYQUUBBX@cluster0.nxc5sbb.mongodb.net/optommarket?retryWrites=true&w=majority&appName=Cluster0
```

**Database Name:** `optommarket`  
**Cluster:** `cluster0.nxc5sbb.mongodb.net`

---

## ⚙️ Backend Configuration

### 1. Update `.env` file

**File:** `backend/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://akramfarmonov998_db_user:Er9F2ERiKYQUUBBX@cluster0.nxc5sbb.mongodb.net/optommarket?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=optommarket_secret_key_2024_change_in_production
JWT_EXPIRE=7d
```

### 2. Ko'chirish (copy qilish)

`backend` papkasida yangi `.env` fayl yarating va yuqoridagi ma'lumotlarni kiriting.

---

## 🚀 Test Qilish

### 1. Backend-ni ishga tushiring

```bash
cd backend
npm install  # agar install qilmagan bo'lsangiz
npm run dev
```

### 2. Expected Terminal Output

```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
✓ Host: cluster0.nxc5sbb.mongodb.net
```

### 3. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "dbName": "optommarket",
  "timestamp": "2024-10-22T03:37:00.000Z"
}
```

---

## 📦 Database Seed

MongoDB Atlas cloud database-ga ma'lumot to'ldirish:

```bash
cd backend
npm run seed
```

**Expected Output:**
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Created 5 categories
✓ Created 6 products
✓ Created test user
✅ Database seeded successfully!

Test credentials:
Email: test@optommarket.uz
Password: test123
```

---

## ✅ Advantages - MongoDB Atlas

### Cloud-based:
- ✅ Internetdan istalgan joydan kirishingiz mumkin
- ✅ Local MongoDB o'rnatish shart emas
- ✅ Automatic backups
- ✅ Free tier available

### No Local Setup Needed:
- ❌ `net start MongoDB` kerak emas
- ❌ Local MongoDB o'rnatish kerak emas
- ✅ Faqat internet connection kerak

---

## 🔒 Security Notes

⚠️ **IMPORTANT:** `.env` faylingizni **HECH QACHON** Git-ga push qilmang!

### .gitignore check:

`backend/.gitignore` faylida quyidagi qator bo'lishi kerak:
```
.env
.env.local
.env.production
```

✅ Sizning loyihangizda bu allaqachon configured

---

## 🐛 Troubleshooting

### Error: "Authentication failed"
**Yechim:** Parol to'g'ri ekanligini tekshiring:
```
Password: Er9F2ERiKYQUUBBX
```

### Error: "Network timeout"
**Yechim:** 
1. Internet connectionni tekshiring
2. MongoDB Atlas IP Whitelist-ga `0.0.0.0/0` qo'shing (development uchun)

### Error: "Database name not specified"
**Yechim:** Connection string-da `/optommarket` qo'shilganligini tekshiring

---

## 📊 MongoDB Atlas Dashboard

**Access your cluster:**
1. https://cloud.mongodb.com
2. Login with your credentials
3. Select: Cluster0
4. Browse Collections → `optommarket` database

**You'll see:**
- `users` collection
- `products` collection
- `categories` collection

---

## 🎯 QADAM-BAQADAM INSTRUCTION

### QADAM 1: .env Faylini Yaratish ✅

```bash
cd backend
# Windows-da:
copy .env.example .env

# Yoki manual yarating va ichiga quyidagilarni kiriting:
```

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://akramfarmonov998_db_user:Er9F2ERiKYQUUBBX@cluster0.nxc5sbb.mongodb.net/optommarket?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=optommarket_secret_key_2024_change_in_production
JWT_EXPIRE=7d
```

### QADAM 2: Dependencies O'rnatish

```bash
cd backend
npm install
```

### QADAM 3: Database Seed Qilish

```bash
npm run seed
```

✅ **Expected:** Ma'lumotlar cloud database-ga yuklandi

### QADAM 4: Backend Ishga Tushirish

```bash
npm run dev
```

✅ **Expected:**
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Database: optommarket
✓ Host: cluster0.nxc5sbb.mongodb.net
```

### QADAM 5: Frontend Ishga Tushirish

**Yangi terminal:**

```bash
cd frontend
npm install
npm run dev
```

✅ **Expected:** Frontend `http://localhost:3000` da ochildi

### QADAM 6: Test

1. Browser: `http://localhost:3000`
2. Login: `test@optommarket.uz` / `test123`
3. ✅ Dashboard opens
4. ✅ Products visible

---

## ✅ SUCCESS CHECKLIST

- [ ] `.env` fayl yaratildi
- [ ] MongoDB Atlas connection string qo'shildi
- [ ] `npm install` bajarildi
- [ ] `npm run seed` bajarildi
- [ ] Backend ishga tushdi
- [ ] Terminal-da "MongoDB connected successfully" ko'rinmoqda
- [ ] Health endpoint 200 OK qaytaradi
- [ ] Frontend ishga tushdi
- [ ] Login ishlayapti

---

## 🎉 READY!

Endi sizning MongoDB Atlas cloud database-ingiz tayyor!

**Next:**
1. Backend-ni ishga tushiring: `cd backend && npm run dev`
2. Frontend-ni ishga tushiring: `cd frontend && npm run dev`
3. Browser-da test qiling: `http://localhost:3000`

---

**✅ MongoDB Atlas Configuration Complete!**
