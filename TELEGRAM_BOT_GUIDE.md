# 🤖 Telegram Bot - To'liq Yo'riqnoma

OptoMarket.uz uchun interaktiv Telegram bot.

---

## 🎯 Xususiyatlar

### ✅ Mijozlar Uchun:
- 🛍️ Mahsulotlarni ko'rish
- 📁 Kategoriyalar bo'yicha qidirish
- 🔍 Mahsulot qidirish (matn bo'yicha)
- 💰 Narxlarni bilish
- 📦 Buyurtma berish (saytga yo'naltirish)
- 💬 Live chat (operatorlar bilan)
- 📞 Aloqa ma'lumotlari
- ❓ Yordam

### ✅ Admin Uchun:
- 🔔 Yangi buyurtma bildirnomalari
- 📊 Buyurtma holati o'zgarishi
- ⚠️ Kam qolgan mahsulotlar
- 💬 Mijozlar xabarlari
- 📈 Statistika

---

## 🚀 Sozlash

### 1. BotFather orqali bot yaratish

1. Telegram da `@BotFather` ni toping
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting: `OptoMarket Bot`
4. Username kiriting: `OptoMarketUz_bot`
5. Token olasiz: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### 2. Environment Variables

`.env` faylga qo'shing:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHANNEL_ID=@optommarket_uz
TELEGRAM_ADMIN_CHAT_ID=123456789

# URLs
FRONTEND_URL=https://optommarket.uz
BACKEND_URL=https://api.optommarket.uz
```

### 3. Admin Chat ID olish

1. Bot bilan `/start` yuboring
2. https://api.telegram.org/bot<TOKEN>/getUpdates ga kiring
3. `chat.id` ni ko'ring va `.env` ga qo'shing

### 4. Server Restart

```bash
cd backend
npm run dev
```

**Kutilayotgan log:**
```
✅ Telegram interactive bot ishga tushdi
```

---

## 📱 Bot Buyruqlari

### Asosiy Buyruqlar:

| Buyruq | Tavsif |
|--------|--------|
| `/start` | Botni ishga tushirish, bosh menyu |
| `/help` | Yordam va ko'rsatmalar |
| `/products` | Mahsulotlar ro'yxati |
| `/categories` | Kategoriyalar |
| `/search` | Mahsulot qidirish |
| `/orders` | Buyurtmalarim |
| `/contact` | Aloqa ma'lumotlari |

---

## 🎨 Bot Interfeysi

### Bosh Menyu (Inline Keyboard):

```
┌─────────────────────────────────┐
│  🛍️ Mahsulotlar │ 📁 Kategoriyalar │
├─────────────────────────────────┤
│  🔍 Qidirish    │ 📦 Buyurtmalarim │
├─────────────────────────────────┤
│  💬 Yordam      │ 📞 Aloqa         │
└─────────────────────────────────┘
```

### Mahsulot Detali:

```
🛍️ Samsung Galaxy S24

Eng so'nggi Samsung flagmani...

💰 Narx: 8,500,000 so'm
💎 Optom narx: 7,800,000 so'm
📦 Minimum: 5 dona
📊 Omborda: 50 dona
📁 Kategoriya: Elektronika

┌──────────────────────┐
│  🛒 Buyurtma berish  │
├──────────────────────┤
│  ⬅️ Orqaga           │
└──────────────────────┘
```

---

## 🔄 Jarayonlar

### 1. Mahsulot Ko'rish

```
Mijoz: /products
Bot: Mahsulotlar ro'yxati (inline buttons)
Mijoz: [Mahsulot tanlaydi]
Bot: Mahsulot detali + rasm
```

### 2. Qidirish

```
Mijoz: /search
Bot: "Mahsulot nomini yozing:"
Mijoz: "Samsung"
Bot: Qidiruv natijalari (inline buttons)
```

### 3. Buyurtma Berish

```
Mijoz: [Mahsulot detali] → "🛒 Buyurtma berish"
Bot: Sayt linki + telefon raqam
Admin: Bildirishnoma oladi
```

### 4. Live Chat

```
Mijoz: "Narxi qancha?"
Bot: "✅ Xabaringiz yuborildi!"
Admin: Mijoz xabarini ko'radi
Admin: Javob beradi (manual)
```

---

## 💬 Xabar Formatlari

### Mahsulot E'loni (Kanal):

```
🆕 YANGI MAHSULOT!

Samsung Galaxy S24

🔥 Ajoyib sifat va arzon narx!

📝 Eng so'nggi Samsung flagmani...

💰 Narx: 8,500,000 so'm
💎 Optom narx: 7,800,000 so'm
📦 Minimum: 5 dona
📊 Omborda: 50 dona

📁 Kategoriya: Elektronika
🏢 Sotuvchi: TechStore UZ

🛒 Buyurtma berish →

#OptoMarket #OptomSavdo #Uzbekistan
```

### Buyurtma Bildirish (Admin):

```
🔔 Yangi buyurtma so'rovi!

Mijoz: @username
Mahsulot: Samsung Galaxy S24
Narx: 8,500,000 so'm
```

---

## 🎯 Features

### ✅ Implemented:

1. **Interactive Commands**
   - /start, /help, /products, /categories
   - /search, /orders, /contact

2. **Inline Keyboards**
   - Bosh menyu
   - Mahsulotlar ro'yxati
   - Kategoriyalar
   - Mahsulot detali

3. **Search Functionality**
   - Text-based search
   - Real-time results
   - Product suggestions

4. **Product Display**
   - With images
   - Full details
   - Pricing info
   - Stock status

5. **Live Chat**
   - Forward to admin
   - Auto-reply to customer
   - Admin notifications

6. **Notifications**
   - New order requests
   - Low stock alerts
   - Customer messages

---

## 📊 Statistika

### Bot Metrics:

- **Commands:** 7 ta
- **Inline Buttons:** 15+ ta
- **Auto-replies:** 5 ta
- **Admin notifications:** 3 tur

### Expected Usage:

- **Daily users:** 100-500
- **Messages:** 500-2000/day
- **Orders via bot:** 20-50/day

---

## 🔧 Customization

### Xabarlarni o'zgartirish:

`backend/services/telegramBotService.js` faylida:

```javascript
const welcomeMessage = `
🎉 Xush kelibsiz!
...
`;
```

### Tugmalarni qo'shish:

```javascript
const keyboard = {
  inline_keyboard: [
    [
      { text: '🆕 Yangi', callback_data: 'new_products' },
      { text: '🔥 Aksiya', callback_data: 'sales' }
    ]
  ]
};
```

### Callback handler:

```javascript
if (data === 'new_products') {
  await this.showNewProducts(chatId);
}
```

---

## 🚀 Keyingi Qadamlar

### Phase 2 (Keyingi hafta):

1. **To'liq buyurtma berish**
   - Bot ichida to'liq checkout
   - Manzil kiritish
   - To'lov tanlash
   - Tasdiqlash

2. **Buyurtma tracking**
   - Real-time holat
   - Yetkazib berish vaqti
   - Kuryer ma'lumotlari

3. **Wishlist**
   - Sevimlilar ro'yxati
   - Narx tushganda xabar

4. **Reviews**
   - Mahsulot baholash
   - Izoh qoldirish

### Phase 3 (Keyingi oy):

1. **AI Chatbot**
   - Gemini AI integration
   - Auto-responses
   - Product recommendations

2. **Payment Integration**
   - Click/Payme bot orqali
   - Invoice generation
   - Auto-confirmation

3. **Analytics**
   - User behavior
   - Popular products
   - Conversion tracking

---

## 🐛 Troubleshooting

### Bot javob bermasa:

1. Token to'g'riligini tekshiring
2. Polling enabled ekanligini tekshiring
3. Server loglarini ko'ring

### Xabarlar yuborilmasa:

1. Chat ID to'g'riligini tekshiring
2. Bot admin qilinganligini tekshiring (kanal uchun)
3. Network connection tekshiring

### Commands ishlamasa:

1. `/setcommands` BotFather da
2. Bot restart qiling
3. Cache clear qiling

---

## 📚 Resources

### Documentation:
- Telegram Bot API: https://core.telegram.org/bots/api
- node-telegram-bot-api: https://github.com/yagop/node-telegram-bot-api

### Tutorials:
- Creating Telegram Bots
- Inline Keyboards
- Webhook vs Polling

---

## ✅ Checklist

### Setup:
- [ ] BotFather orqali bot yaratish
- [ ] Token olish
- [ ] `.env` ga qo'shish
- [ ] Admin chat ID olish
- [ ] Server restart

### Testing:
- [ ] /start command
- [ ] Mahsulotlar ko'rish
- [ ] Qidirish
- [ ] Buyurtma berish
- [ ] Live chat

### Production:
- [ ] Webhook sozlash (opsional)
- [ ] Error handling
- [ ] Logging
- [ ] Monitoring

---

**Yaratilgan:** 2025-10-23  
**Versiya:** 1.0.0  
**Status:** ✅ Tayyor  
**Foydalanuvchilar:** Cheksiz! 🚀
