# ⏰ Cron Jobs - Avtomatik Vazifalar

OptoMarket.uz platformasida 2 ta avtomatik cron job ishlaydi.

---

## 📋 Cron Jobs Ro'yxati

### 1. 📝 Kunlik Blog Generator
**Fayl:** `backend/jobs/dailyBlogGenerator.js`

#### Ishlash vaqti:
- **Har kuni soat 09:00** (Toshkent vaqti)
- Cron pattern: `'0 9 * * *'`

#### Vazifasi:
- Gemini AI yordamida 5 ta professional blog maqola yaratadi
- Har bir maqola 800-1200 so'zdan iborat
- O'zbek tilida yoziladi
- Avtomatik nashr qilinadi
- Telegram kanalga yuboriladi

#### Mavzular (20 ta):
- Optom savdoda muvaffaqiyat sirlari
- Kichik biznesni qanday boshlash
- Marketing strategiyalari
- Moliyaviy hisobni yuritish
- Inventar boshqaruvi
- va boshqalar...

#### Kategoriyalar:
- Biznes
- Marketing
- Moliya
- Logistika
- Texnologiya
- Maslahatlar
- Yangiliklar

---

### 2. 🛍️ Kunlik Mahsulot Promotion
**Fayl:** `backend/jobs/dailyProductPromotion.js`

#### Ishlash vaqti:
- **Kuniga 3 marta:**
  - 10:00 (Ertalabki)
  - 14:00 (Tushlik)
  - 18:00 (Kechki)
- Timezone: `Asia/Tashkent`

#### Vazifasi:
1. **Yangi mahsulotlarni topish**
   - Oxirgi 24 soatda qo'shilgan mahsulotlarni tanlaydi
   - Maksimal 3 ta mahsulot

2. **Agar yangi mahsulot bo'lmasa:**
   - Featured mahsulotlarni tanlaydi
   - Eng ko'p ko'rilgan mahsulotlarni tanlaydi
   - Eng ko'p sotilgan mahsulotlarni tanlaydi

3. **AI bilan marketing yaratish:**
   - Har bir mahsulot uchun Gemini AI dan marketing matni yaratadi
   - Qisqa va ta'sirchan (2-3 jumla)
   - Emoji bilan bezatiladi

4. **Telegram kanalga yuborish:**
   - Mahsulot rasmi bilan
   - Marketing xabari bilan
   - To'liq ma'lumot (narx, optom narx, stock, kategoriya)
   - Sotuvchi nomi
   - Buyurtma berish linki
   - Hashtaglar

5. **Kunlik statistika:**
   - E'lon qilingan mahsulotlar soni
   - Bugun qo'shilgan mahsulotlar
   - Jami mahsulotlar soni

---

## 🎯 Telegram Xabar Formati

### Blog Post:
```
📝 Blog Sarlavhasi

Qisqacha mazmun...

📁 Kategoriya: Biznes

🔗 Batafsil o'qish
```

### Mahsulot Promotion:
```
🆕 YANGI MAHSULOT!

Mahsulot Nomi

🔥 Ajoyib sifat va arzon narx! Optom xaridlarda maxsus chegirmalar. Bugun buyurtma bering!

📝 Mahsulot tavsifi...

💰 Narx: 100,000 so'm
💎 Optom narx: 85,000 so'm
📦 Minimum: 10 dona
📊 Omborda: 500 dona

📁 Kategoriya: Elektronika
🏢 Sotuvchi: ABC Company

🛒 Buyurtma berish →

#OptoMarket #OptomSavdo #Uzbekistan
```

---

## 🔧 Manual Ishga Tushirish

### Blog Generator:
```javascript
// Backend kodda
import dailyBlogGenerator from './jobs/dailyBlogGenerator.js';
await dailyBlogGenerator.runNow();
```

### Product Promotion:
```javascript
// Backend kodda
import dailyProductPromotion from './jobs/dailyProductPromotion.js';
await dailyProductPromotion.runNow();
```

### API orqali (Admin faqat):
```bash
# Product Promotion
POST /api/admin/jobs/run-product-promotion
Headers: Authorization: Bearer <admin_token>
```

---

## 📊 Statistika

### Blog Generator:
- **Kunlik:** 5 ta maqola
- **Oylik:** ~150 ta maqola
- **Yillik:** ~1,825 ta maqola

### Product Promotion:
- **Kunlik:** 3-9 ta mahsulot (har safar 3 tagacha)
- **Haftalik:** 21-63 ta mahsulot
- **Oylik:** ~90-270 ta mahsulot

---

## ⚙️ Sozlamalar

### Environment Variables (.env):
```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel

# AI
GEMINI_API_KEY=your_gemini_api_key

# URLs
FRONTEND_URL=https://optommarket.uz
BACKEND_URL=https://api.optommarket.uz
```

---

## 🛡️ Xavfsizlik va Optimallashtirish

### Bir vaqtning o'zida faqat 1 ta jarayon:
```javascript
if (this.isRunning) {
  console.log('⏳ Allaqachon ishlamoqda...');
  return;
}
```

### API cheklashlarini oldini olish:
```javascript
// Har bir post o'rtasida kutish
await this.delay(2000); // Blog uchun
await this.delay(3000); // Mahsulot uchun
```

### Xatoliklarni ushlash:
```javascript
try {
  // Vazifa
} catch (error) {
  console.error('Xatolik:', error);
  // Telegram ga xabar yuborish
  await telegramService.sendMessage(`⚠️ Xatolik: ${error.message}`);
}
```

---

## 📝 Loglar

### Server ishga tushganda:
```
⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)
⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)
```

### Vazifa bajarilganda:
```
🚀 Kunlik blog post generation boshlandi: 23.10.2025, 09:00:00
🤖 5 ta blog post yaratilmoqda...
📝 Post 1/5: Optom savdoda muvaffaqiyat sirlari
✓ Post yaratildi: Optom savdoda muvaffaqiyat sirlari
✅ 5/5 ta post muvaffaqiyatli yaratildi va nashr qilindi
```

```
🚀 Ertalabki mahsulot promotion boshlandi: 23.10.2025, 10:00:00
✓ 3 ta mahsulot tanlandi
✓ Mahsulot "Samsung Galaxy S24" marketing bilan yuborildi
✅ 3 ta mahsulot muvaffaqiyatli e'lon qilindi
```

---

## 🎯 Foydalari

### Marketing:
- ✅ Avtomatik kontent yaratish
- ✅ Telegram kanalda faollik
- ✅ SEO uchun yangi maqolalar
- ✅ Mahsulotlarni targ'ib qilish
- ✅ Mijozlarni jalb qilish

### Vaqt tejash:
- ✅ Qo'lda blog yozishga hojat yo'q
- ✅ Mahsulotlarni qo'lda e'lon qilishga hojat yo'q
- ✅ 24/7 avtomatik ishlaydi

### Biznes rivojlantirish:
- ✅ Doimiy yangi kontent
- ✅ Professional marketing
- ✅ Mijozlar bilan aloqa
- ✅ Brand awareness

---

## 🔍 Monitoring

### Tekshirish:
1. Server loglarini ko'rish
2. Telegram kanalda yangi postlarni tekshirish
3. Database da yangi blog/mahsulot e'lonlarini tekshirish

### Muammolarni hal qilish:

**Agar blog yaratilmasa:**
- Gemini API key ni tekshiring
- Internet aloqasini tekshiring
- Database connection ni tekshiring

**Agar Telegram ga yuborilmasa:**
- Telegram bot token ni tekshiring
- Channel ID ni tekshiring
- Bot kanalga admin qilinganligini tekshiring

---

**Yaratilgan:** 2025-10-23  
**Versiya:** 1.0.0  
**Status:** ✅ Ishlamoqda
