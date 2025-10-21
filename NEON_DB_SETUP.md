# NEON DB SETUP GUIDE

## Step 1: Neon.tech ga kirish
1. https://neon.tech ga kiring
2. Google yoki GitHub orqali sign up qiling
3. Dashboard ga o'ting

## Step 2: Yangi Project yaratish
1. "Create Project" tugmasini bosing
2. Project nomi: **optommarket_db**
3. Region: **Asia** (yaqinroq server tanlang)
4. PostgreSQL version: **16** (latest)

## Step 3: Connection String olish
1. Project yaratilgandan keyin, Dashboard da connection string ko'rinadi
2. Format quyidagicha bo'ladi:
```
postgresql://[user]:[password]@[host]/[database]
```

Misol:
```
postgresql://optomuser:Ab3xK9pqR2mN@ep-cool-darkness-123456.us-east-2.aws.neon.tech/optommarket_db?sslmode=require
```

## Step 4: Backend/.env faylini yangilash

**WINDOWS**:
```powershell
cd backend
notepad .env
```

**`.env` fayliga quyidagini yozing:**
```env
DATABASE_URL=postgresql://[SIZNING_CONNECTION_STRING]
JWT_SECRET=your_super_secret_key_12345
PORT=5000
NODE_ENV=development
```

**MUHIM**: `[SIZNING_CONNECTION_STRING]` ni Neon dan olgan haqiqiy string bilan almashtiring!

## Step 5: Connection testini o'tkazish
Backend papkasida:
```bash
npm run init-db
```

Agar hammasi to'g'ri bo'lsa, quyidagi xabar chiqadi:
```
✅ Database connected successfully!
✅ Users table created
✅ Products table created
✅ Orders table created
✅ Order_items table created
✅ Sample products inserted
🎉 Database initialization completed successfully!
```

## Xatolik bo'lsa:
- Connection string ni tekshiring
- Neon.tech da database aktiv ekanligini tekshiring
- Internet connection ni tekshiring
- `.env` faylda bo'sh joy yoki qo'shtirnoq belgisi yo'qligini tekshiring

## Tayyor!
Database tayyorlangandan keyin:
```bash
npm run dev
```
Server ishga tushadi va API endpoints test qilishingiz mumkin!
