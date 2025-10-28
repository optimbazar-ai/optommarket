# 🚀 ADVANCED FEATURES DOCUMENTATION

## OPTOMMARKET - Avtomatlashtirilgan Funksiyalar

---

## 📋 Mavjud Funksiyalar

### 1️⃣ MongoDB Integration
- **Blogs** - AI tomonidan yaratilgan blog postlar
- **Promotions** - Avtomatik chegirmalar va aksiyalar
- **Analytics** - Foydalanuvchi harakatlari tahlili

### 2️⃣ Telegram Bot Integration
- **Yangi mahsulot** - Telegram kanaliga bildirishnoma
- **Yangi buyurtma** - Admin guruhga real-time xabar
- **Promotion** - Chegirmalar haqida e'lon

### 3️⃣ AI Description Generator
- **Qisqa tavsif** - 60-80 so'z (mahsulot kartochkasi uchun)
- **To'liq tavsif** - 200-300 so'z (mahsulot sahifasi uchun)
- **Multi-key rotation** - API limit muammosi yo'q

### 4️⃣ Blog Generator (Scheduled)
- **Avtomatik** - Har kuni soat 09:00 da
- **AI-powered** - Gemini 2.5 Flash
- **SEO optimized** - Tags, excerpt, metadata

### 5️⃣ Promotion Scheduler (Scheduled)
- **3 marta kuniga** - 10:00, 14:00, 18:00
- **Random chegirma** - 10-40%
- **Auto-notification** - Telegram orqali

---

## 🛠️ O'RNATISH

### 1. Kerakli Paketlar
```bash
cd backend
npm install
```

Yangi paketlar:
- `node-cron` - Scheduled tasks
- `node-telegram-bot-api` - Telegram bot

### 2. Environment Variables

#### Development (.env)
```env
# PostgreSQL (Required)
DATABASE_URL=postgresql://user:password@host/optommarket_db

# MongoDB (Optional)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/optommarket

# Gemini AI (Required - multiple keys)
GEMINI_API_KEY=AIzaSy...key1,AIzaSy...key2

# Telegram Bot (Optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

#### Production (Render.com)
1. Dashboard → optommarket-backend → Environment
2. Quyidagi o'zgaruvchilarni qo'shing:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `TELEGRAM_BOT_TOKEN` - @BotFather dan olingan token
   - `TELEGRAM_CHAT_ID` - Kanal yoki guruh ID

---

## 📱 TELEGRAM BOT SOZLASH

### 1. Bot Yaratish
```
1. Telegram da @BotFather ni toping
2. /newbot buyrug'ini yuboring
3. Bot nomini kiriting (masalan: OptomMarket Bot)
4. Username kiriting (masalan: optommarket_bot)
5. Token oling: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

### 2. Kanal ID Olish
```
1. Telegram da yangi kanal yarating
2. Bot ni kanalga admin qiling
3. @userinfobot dan foydalanib ID oling
4. Yoki: https://api.telegram.org/bot<TOKEN>/getUpdates
```

### 3. Test
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=<CHAT_ID>&text=Test message"
```

---

## 🗄️ MONGODB ATLAS SOZLASH

### 1. Bepul Cluster Yaratish
```
1. https://www.mongodb.com/cloud/atlas ga o'ting
2. Sign up (GitHub bilan)
3. Create Free Cluster
4. Region: AWS / Frankfurt (yoki yaqin joy)
5. Cluster Name: optommarket
```

### 2. Database User
```
1. Database Access → Add New Database User
2. Username: optommarket_user
3. Password: (kuchli parol yarating)
4. Database User Privileges: Read and write to any database
```

### 3. Network Access
```
1. Network Access → Add IP Address
2. Allow Access from Anywhere: 0.0.0.0/0
3. (Production da faqat Render IP larini qo'shing)
```

### 4. Connection String
```
1. Cluster → Connect → Connect your application
2. Driver: Node.js, Version: 4.1 or later
3. Copy connection string:
   mongodb+srv://optommarket_user:<password>@cluster.mongodb.net/optommarket?retryWrites=true&w=majority
4. <password> ni o'z parolingiz bilan almashtiring
```

---

## 🔌 API ENDPOINTS

### Blogs API

#### Get all blogs
```http
GET /api/blogs?page=1&limit=10
```

Response:
```json
{
  "blogs": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

#### Get single blog
```http
GET /api/blogs/:id
```

#### Manual blog generation (admin)
```http
POST /api/blogs/generate
```

#### Like a blog
```http
POST /api/blogs/:id/like
```

### Promotions API

#### Get active promotions
```http
GET /api/promotions
```

#### Get promotion for product
```http
GET /api/promotions/product/:productId
```

#### Manual promotion generation (admin)
```http
POST /api/promotions/generate
```

---

## ⏰ SCHEDULER SCHEDULE

### Blog Generator
- **Vaqt**: Har kuni 09:00 (Toshkent vaqti)
- **Cron**: `0 4 * * *` (UTC)
- **Funksiya**: AI yordamida yangi blog post yaratish

### Promotion Scheduler
- **10:00**: `0 5 * * *` (UTC) - Tonggi aksiya
- **14:00**: `0 9 * * *` (UTC) - Tushlik aksiya
- **18:00**: `0 13 * * *` (UTC) - Kechki aksiya

### Expired Promotions Cleanup
- **Vaqt**: Har soat
- **Cron**: `0 * * * *`
- **Funksiya**: Muddati o'tgan aksiyalarni o'chirish

---

## 🧪 TESTING

### 1. Manual Blog Generation
```bash
curl -X POST http://localhost:5000/api/blogs/generate
```

### 2. Manual Promotion Generation
```bash
curl -X POST http://localhost:5000/api/promotions/generate
```

### 3. Check Telegram Bot
```bash
# Server loglarida ko'rish kerak:
✓ Telegram bot initialized
ℹ️ Telegram bot polling o'chirilgan (production issue)
```

### 4. Check MongoDB Connection
```bash
# Server loglarida:
✓ MongoDB connected successfully
✓ Database: optommarket
✓ Host: cluster.mongodb.net
```

### 5. Check Schedulers
```bash
# Server loglarida:
⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)
⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)
```

---

## 🐛 TROUBLESHOOTING

### MongoDB Not Connected
```
⚠️ MongoDB URI not configured - MongoDB features disabled
```
**Yechim**: `.env` faylida `MONGODB_URI` ni tekshiring

### Telegram Bot Failed
```
✗ Telegram bot initialization failed: 401 Unauthorized
```
**Yechim**: `TELEGRAM_BOT_TOKEN` noto'g'ri

### Schedulers Disabled
```
⚠️ Schedulers disabled (MongoDB required)
```
**Yechim**: MongoDB birinchi ulanishi kerak

### Gemini API Quota Exceeded
```
✗ Gemini AI failed: 429 Too Many Requests
```
**Yechim**: Qo'shimcha API key qo'shing (comma bilan):
```env
GEMINI_API_KEY=key1,key2,key3
```

---

## 📊 PRODUCTION DEPLOYMENT

### Render.com Environment Variables

Quyidagilarni qo'shing:

```env
# Required
DATABASE_URL=postgresql://...neon.tech/optommarket_db
JWT_SECRET=32_characters_or_more
GEMINI_API_KEY=AIzaSy...key1,AIzaSy...key2
FRONTEND_URL=https://optommarket.vercel.app

# Optional (but recommended)
MONGODB_URI=mongodb+srv://...cluster.mongodb.net/optommarket
TELEGRAM_BOT_TOKEN=123456789:ABC...
TELEGRAM_CHAT_ID=-1001234567890
```

### MongoDB Atlas Production Settings

1. **Network Access**: Render.com IP manzillarini qo'shing
2. **Database User**: Kuchli parol ishlating
3. **Backup**: Avtomatik backup yoqing (M10+ clusters)

---

## 🎯 FEATURES STATUS

| Feature | Status | Dependecy |
|---------|--------|-----------|
| PostgreSQL | ✅ Working | Required |
| MongoDB | ✅ Working | Optional |
| Telegram Bot | ✅ Working | Optional |
| AI Description | ✅ Working | Gemini API |
| Blog Generator | ✅ Working | MongoDB |
| Promotion Scheduler | ✅ Working | MongoDB |
| Schedulers | ✅ Working | MongoDB |

---

## 📞 SUPPORT

### Agar muammo bo'lsa:

1. **Server logs** ni tekshiring
2. **Environment variables** ni tasdiqlang
3. **MongoDB Atlas** connectivity test qiling
4. **Telegram Bot** tokenni tekshiring

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] npm install bajarildi
- [ ] .env fayl to'ldirildi
- [ ] MongoDB Atlas sozlandi (optional)
- [ ] Telegram Bot yaratildi (optional)
- [ ] Local serverda test qilindi
- [ ] Render.com ga environment variables qo'shildi
- [ ] Production da test qilindi
- [ ] Logs tekshirildi - xatolik yo'q

---

## 🎉 SUCCESS!

Agar hammasi to'g'ri ishlasa, server logida ko'rasiz:

```
==================================================
🚀 OPTOMMARKET Backend Server
==================================================
🌐 URL: http://localhost:5000
📊 Environment: development
🔗 Database: Configured ✅
🤖 Chatbot: POST http://localhost:5000/api/chatbot/chat
==================================================

🔧 Initializing services...

📋 Environment Variables:
- DATABASE_URL: ✓ Loaded
- MONGODB_URI: ✓ Loaded
- JWT_SECRET: ✓ Loaded
- GEMINI_API_KEY: ✓ Loaded (AIzaSyALtx...)

✓ MongoDB connected successfully
✓ Database: optommarket
✓ Host: cluster.mongodb.net
✓ Telegram bot initialized
ℹ️ Telegram bot polling o'chirilgan (production issue)

📅 Initializing schedulers...
⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)
⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)
⏰ Eski promotion lar tozalash ishga tushdi (har soatda)
✅ All schedulers initialized

✓ Server running on port 5000
✓ Environment: development
✓ API available at: http://localhost:5000/api
```

**Platform is READY! 🚀**
