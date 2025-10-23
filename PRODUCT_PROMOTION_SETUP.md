# 🛍️ Mahsulot Promotion - Tezkor Yo'riqnoma

Yangi cron job qo'shildi - har kuni mahsulotlarni Telegram kanalga avtomatik marketing bilan chiqarish.

---

## ✅ Nima Qo'shildi?

### 1. Yangi Fayl
- `backend/jobs/dailyProductPromotion.js` - Asosiy cron job

### 2. Yangilangan Fayllar
- `backend/server.js` - Cron job ni ishga tushirish
- `backend/routes/admin.js` - Manual ishga tushirish endpoint
- `README.md` - Automation features qo'shildi
- `CRON_JOBS_GUIDE.md` - To'liq dokumentatsiya

---

## ⏰ Ishlash Tartibi

### Avtomatik:
- **10:00** - Ertalabki promotion
- **14:00** - Tushlik promotion  
- **18:00** - Kechki promotion

### Har safar:
1. Yangi mahsulotlarni topadi (oxirgi 24 soat)
2. Agar yangi bo'lmasa - featured/popular mahsulotlarni tanlaydi
3. Har bir mahsulot uchun AI bilan marketing yaratadi
4. Telegram kanalga rasm va to'liq ma'lumot bilan yuboradi
5. Kunlik statistika yuboradi

---

## 🚀 Ishga Tushirish

### 1. Environment Variables
`.env` faylida tekshiring:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=https://optommarket.uz
BACKEND_URL=https://api.optommarket.uz
```

### 2. Server Restart
```bash
cd backend
npm run dev
```

Konsolda ko'rasiz:
```
⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)
```

---

## 🧪 Test Qilish

### Manual ishga tushirish (Admin):
```bash
POST http://localhost:5000/api/admin/jobs/run-product-promotion
Headers: Authorization: Bearer <admin_token>
```

### Yoki kodda:
```javascript
import dailyProductPromotion from './jobs/dailyProductPromotion.js';
await dailyProductPromotion.runNow();
```

---

## 📱 Telegram Xabar Namunasi

```
🆕 YANGI MAHSULOT!

Samsung Galaxy S24

🔥 Ajoyib sifat va arzon narx! Optom xaridlarda maxsus chegirmalar. Bugun buyurtma bering!

📝 Eng so'nggi Samsung flagmani. 256GB xotira, 12GB RAM, 200MP kamera...

💰 Narx: 8,500,000 so'm
💎 Optom narx: 7,800,000 so'm
📦 Minimum: 5 dona
📊 Omborda: 50 dona

📁 Kategoriya: Elektronika
🏢 Sotuvchi: TechStore UZ

🛒 Buyurtma berish →

#OptoMarket #OptomSavdo #Uzbekistan
```

---

## 📊 Natijalar

### Kunlik:
- 3-9 ta mahsulot e'lon qilinadi
- AI bilan professional marketing
- Telegram kanalda faollik

### Haftalik:
- 21-63 ta mahsulot
- Doimiy yangi kontent
- Mijozlarni jalb qilish

### Oylik:
- ~90-270 ta mahsulot
- Brand awareness
- Savdo hajmini oshirish

---

## 🎯 Afzalliklar

✅ **Avtomatik** - Qo'lda ish kerak emas  
✅ **AI Marketing** - Professional xabarlar  
✅ **Telegram** - Keng auditoriya  
✅ **Yangi mahsulotlar** - Avtomatik e'lon  
✅ **Featured mahsulotlar** - Doimiy marketing  
✅ **Vaqt tejash** - 24/7 ishlaydi  
✅ **Biznes o'sishi** - Ko'proq mijozlar  

---

## 📚 Qo'shimcha

To'liq dokumentatsiya: `CRON_JOBS_GUIDE.md`

---

**Yaratilgan:** 2025-10-23  
**Status:** ✅ Tayyor  
**Test:** ✅ Muvaffaqiyatli
