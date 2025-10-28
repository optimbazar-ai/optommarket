# Telegram Bot va AI Blog Generator Sozlash

## 1. Telegram Bot Yaratish

### Bot yaratish qadamlari:

1. **BotFather bilan suhbat boshlang**: Telegram'da `@BotFather` ni qidiring
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom kiriting (masalan: `OptoMarket Blog Bot`)
4. Bot uchun username kiriting (masalan: `@optommarket_blog_bot`)
5. BotFather sizga **Bot Token** beradi. Uni saqlab qo'ying!

### Telegram Kanal yaratish:

1. Telegram'da yangi kanal yarating
2. Kanal turini tanlang: **Public** yoki **Private**
3. Kanal username qo'ying (masalan: `@optommarket_news`)
4. **Botni kanalga admin qilib qo'shing**
5. Kanalning **Chat ID** sini olish uchun:
   - Botni kanalga qo'shing
   - Kanal public bo'lsa: `@your_channel_username`
   - Kanal private bo'lsa: Chat ID ni olish kerak (masalan: `-1001234567890`)

### Chat ID ni olish:

1. Botni kanalga admin qilib qo'shing
2. Kanalda biror xabar yozing
3. Brauzerda ochilgan URL'dan chat ID ni ko'ring yoki botni `@getidsbot` orqali aniqlang

## 2. .env Faylini Sozlash

Backend papkangizda `.env` fayliga quyidagi sozlamalarni qo'shing:

```env
# Telegram Bot Settings
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHANNEL_ID=@your_channel_username
# yoki private kanal uchun: -1001234567890

# Frontend URL (blog postlarga havola uchun)
FRONTEND_URL=https://optommarket.uz
# yoki local: http://localhost:5173
```

## 3. Dependencies O'rnatish

Backend papkasida:

```bash
npm install
```

Yangi dependencies:
- `node-telegram-bot-api` - Telegram bot
- `node-cron` - Kunlik avtomatik ishlar

## 4. Ishga Tushirish

```bash
npm run dev
# yoki
npm start
```

Konsolda quyidagi xabarlar ko'rinishi kerak:
- `✓ Telegram bot initialized`
- `⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)`

## 5. Xususiyatlar

### 1. Avtomatik Blog Generation:
- **Vaqt**: Har kuni soat 09:00 (Toshkent vaqti)
- **Soni**: 5 ta blog post
- **Mavzular**: Optom savdo, biznes, marketing, logistika
- **Til**: O'zbek tili
- **AI**: Gemini AI tomonidan yaratiladi

### Blog Postlar:
- Avtomatik saytga qo'shiladi va nashr qilinadi
- Telegram kanalga yuboriladi
- Har bir post:
  - Sarlavha
  - To'liq maqola matni (800-1200 so'z)
  - Qisqacha mazmun
  - Kategoriya
  - Kalit so'zlar (tags)

### 2. Mahsulot Notification:
- Admin paneldan yangi mahsulot qo'shilganda avtomatik Telegram kanalga yuboriladi
- Mahsulot ma'lumotlari:
  - 🆕 Mahsulot nomi
  - Tavsif (250 belgigacha)
  - 💰 Narx
  - 📦 Minimal buyurtma miqdori
  - 📁 Kategoriya
  - 🛒 Buyurtma berish havolasi
  - Mahsulot rasmi (agar mavjud bo'lsa)

### 3. Promo Kod va Marketing Aksiyalar:
- Admin paneldan yangi promo kod yaratilganda avtomatik Telegram kanalga yuboriladi
- Promo kod ma'lumotlari:
  - 🎁 Aksiya sarlavhasi
  - 🎫 Promo kod (nusxalash uchun)
  - 💯 Chegirma miqdori (foiz yoki so'm)
  - 📊 Minimal buyurtma summasi
  - ⏰ Amal qilish muddati
  - 📝 Qo'shimcha ma'lumot
  - 🛍️ Xarid qilish havolasi

### Manual Ishga Tushirish:
Admin paneldan manual blog generation:
```
POST /api/admin/blog/generate
Authorization: Bearer {admin_token}
```

## 6. Telegram Kanalda Ko'rinishi

### Blog Post:
```
**Blog Post Sarlavhasi**

Qisqacha mazmun matni...

📁 Kategoriya: Biznes

🔗 Batafsil o'qish
```

### Mahsulot:
```
🆕 **Mahsulot Nomi**

Mahsulot tavsifi lorem ipsum dolor sit amet...

💰 **Narx:** 150,000 so'm
📦 **Minimum buyurtma:** 10 dona

📁 Elektronika

🛒 Buyurtma berish
```

### Promo Kod:
```
🎁 **YANGI CHEGIRMA!**

🎫 Promo kod: SUMMER2024
💯 Chegirma: **25%**

📊 Minimal buyurtma: 500,000 so'm

⏰ Amal qilish muddati: 31.12.2024

📝 Yozgi maxsus aksiya barcha mahsulotlar uchun

🛍️ Xarid qilish
```

## 7. Test Qilish

### 1. Blog Post Test:
Postman yoki Thunder Client'dan:
```
POST http://localhost:5000/api/admin/blog/generate
Headers:
  Authorization: Bearer {your_admin_token}
```

### 2. Mahsulot Test:
Admin paneldan:
- Admin → Products → "Add Product" tugmasi
- Mahsulot ma'lumotlarini to'ldiring
- "Save" bosing
- Telegram kanalda yangi mahsulot paydo bo'lishini kuzating

### 3. Promo Kod Test:
Admin paneldan:
- Admin → Promo Codes (yoki Settings)
- "Add Promo Code" tugmasi
- Promo kod ma'lumotlarini to'ldiring
- "Save" bosing
- Telegram kanalda yangi aksiya paydo bo'lishini kuzating

### 4. Telegram Test:
- Kanalda yangi postlar/mahsulotlar/promo kodlar paydo bo'lishini kuzating
- Bot admin sifatida qo'shilganligini tekshiring
- Havolalar ishlashini tekshiring

## 8. Muammolar va Yechimlar

### Bot ishlamayapti:
- ✅ `TELEGRAM_BOT_TOKEN` to'g'ri ekanligini tekshiring
- ✅ Bot kanalda admin ekanligini tekshiring
- ✅ `TELEGRAM_CHANNEL_ID` to'g'ri formatda ekanligini tekshiring

### AI blog yaratmayapti:
- ✅ `GEMINI_API_KEY` sozlanganligini tekshiring
- ✅ Admin foydalanuvchi mavjudligini tekshiring
- ✅ MongoDB ulanganligini tekshiring

### Cron job ishlamayapti:
- ✅ Server ishlab turganligini tekshiring
- ✅ Timezone to'g'ri ekanligini tekshiring (Asia/Tashkent)
- ✅ Console loglarni kuzating

## 9. Qo'shimcha Sozlamalar

### Vaqtni o'zgartirish:
`backend/jobs/dailyBlogGenerator.js` faylida:
```javascript
// Har kuni soat 12:00 da
cron.schedule('0 12 * * *', async () => {
  // ...
});

// Har 6 soatda
cron.schedule('0 */6 * * *', async () => {
  // ...
});
```

### Post sonini o'zgartirish:
```javascript
// 10 ta post yaratish
const posts = await blogGeneratorService.generateDailyPosts(10);
```

## 10. Xavfsizlik

- ⚠️ `.env` faylini hech qachon Git'ga yukmang
- ⚠️ Bot token'ni ulashmang
- ⚠️ Admin API'larni faqat autentifikatsiya bilan ishlatilishi kerak
- ⚠️ Rate limiting qo'shing (juda ko'p so'rovlardan himoya)

## Qo'llab-quvvatlash

Muammo yuz berganda:
1. Console loglarni tekshiring
2. Telegram Bot API status'ni tekshiring
3. .env sozlamalarini qayta tekshiring
4. Dependencies to'liq o'rnatilganligini tasdiqlang

Muvaffaqiyatli sozlash! 🎉
