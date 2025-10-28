# 🇺🇿 O'ZBEKISTON UCHUN MAXSUS FUNKSIYALAR

## ✅ QO'SHILGAN FUNKSIYALAR:

### 1. 📱 TELEFON VALIDATSIYA
**Location:** `frontend/src/utils/phoneValidation.js`

**Qo'llab-quvvatlanadigan operatorlar:**
- Beeline: 90, 91
- Ucell: 93, 94
- Uzmobile: 95, 97, 98, 99
- Humans: 33
- Perfectum: 88
- Mobiuz: 77

**Funksiyalar:**
```javascript
import { validateUzbekPhone, formatUzbekPhone, maskUzbekPhone } from './utils/phoneValidation'

// Validatsiya
const result = validateUzbekPhone('+998901234567')
// { isValid: true, formatted: '+998 90 123-45-67', operator: 'Beeline' }

// Format
const formatted = formatUzbekPhone('901234567')
// '+998 90 123-45-67'

// Mask (input uchun)
const masked = maskUzbekPhone('901234567')
// '+998 90 123-45-67'
```

**Component:** `frontend/src/components/PhoneInput.jsx`

---

### 2. 🗺️ VILOYATLAR BO'YICHA YETKAZISH
**Location:** `backend/data/regions.js`

**14 ta viloyat:**
1. Toshkent shahri - 0 so'm (BEPUL)
2. Toshkent viloyati - 30,000 so'm
3. Andijon - 50,000 so'm
4. Buxoro - 45,000 so'm
5. Jizzax - 35,000 so'm
6. Qashqadaryo - 50,000 so'm
7. Navoiy - 45,000 so'm
8. Namangan - 50,000 so'm
9. Samarqand - 40,000 so'm
10. Surxondaryo - 55,000 so'm
11. Sirdaryo - 35,000 so'm
12. Farg'ona - 50,000 so'm
13. Xorazm - 55,000 so'm
14. Qoraqalpog'iston - 60,000 so'm

**Component:** `frontend/src/components/RegionSelector.jsx`

---

### 3. 🤖 TELEGRAM BOT
**Location:** `backend/utils/telegramBot.js`

**Funksiyalar:**
- Yangi buyurtma xabarnomasi
- Buyurtma holati o'zgarishi
- Kam qoldiq xabarnomasi

**Sozlash:**

1. **Bot yaratish:**
   - Telegram'da @BotFather ga yozing
   - `/newbot` buyrug'i
   - Bot nomi va username kiriting
   - TOKEN olasiz

2. **Chat ID olish:**
   - @userinfobot ga yozing
   - Sizga chat ID beradi

3. **.env fayliga qo'shing:**
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_ADMIN_CHAT_ID=123456789
```

**Foydalanish:**
```javascript
import telegramBot from './utils/telegramBot.js'

// Yangi buyurtma
await telegramBot.notifyNewOrder(order)

// Holat o'zgarishi
await telegramBot.notifyStatusChange(order, 'confirmed')

// Kam qoldiq
await telegramBot.notifyLowStock(product)
```

---

### 4. 📄 INVOICE/CHECK PRINTING
**Location:** `backend/utils/invoiceGenerator.js`

**API Endpoints:**
- `GET /api/invoices/:orderId` - Invoice ko'rish
- `GET /api/invoices/:orderId/download` - Invoice yuklab olish

**Xususiyatlari:**
- O'zbek tilida
- Professional dizayn
- Print-ready
- Barcha buyurtma ma'lumotlari
- QR code (opsional)

**Foydalanish:**
```javascript
// Browser'da ochish
window.open(`/api/invoices/${orderId}`, '_blank')

// Print qilish
const printWindow = window.open(`/api/invoices/${orderId}`)
printWindow.onload = () => printWindow.print()
```

---

### 5. 📊 ORDER MODEL YANGILANDI
**Location:** `backend/models/Order.js`

**Yangi fieldlar:**
```javascript
shippingAddress: {
  region: String,      // Viloyat nomi
  regionCode: String,  // Viloyat kodi (TAS, SAM, etc.)
  city: String,
  address: String,
  postalCode: String
}

customerInfo: {
  phone: {
    type: String,
    match: /^\+998\d{9}$/  // O'zbek telefon formati
  }
}
```

---

## 🔧 SETUP BOSQICHLARI:

### Backend:

1. **Telegram Bot sozlash:**
```bash
# .env faylga qo'shing
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_ADMIN_CHAT_ID=your_chat_id
```

2. **Server restart:**
```bash
cd backend
npm run dev
```

### Frontend:

1. **Componentlarni import qilish:**
```javascript
import PhoneInput from './components/PhoneInput'
import RegionSelector from './components/RegionSelector'
```

2. **Ishlatish (misol):**
```jsx
<PhoneInput 
  value={phone}
  onChange={setPhone}
  required
/>

<RegionSelector
  value={regionCode}
  onChange={setRegionCode}
  showDeliveryInfo
  required
/>
```

---

## 📱 TELEGRAM BOT BUYRUQLARI (Kelajakda):

Botga qo'shish mumkin:
- `/orders` - Yangi buyurtmalar
- `/stats` - Statistika
- `/low_stock` - Kam qolgan mahsulotlar
- `/sales` - Bugungi savdo

---

## 🎯 KEYINGI QADAMLAR:

1. ✅ Telegram bot .env sozlang
2. ✅ Checkout page'da PhoneInput va RegionSelector ishlatish
3. ✅ Order yaratishda Telegram xabar yuborish
4. ✅ Invoice print tugmasi qo'shish
5. ✅ Test qilish

---

## 🐛 MUAMMOLAR VA YECHIMLAR:

**Telegram bot ishlamayapti:**
- `.env` faylni tekshiring
- Token to'g'riligini @BotFather da tekshiring
- Chat ID to'g'ri ekanini tekshiring

**Telefon validatsiya ishlamayapti:**
- `phoneValidation.js` import qilinganligini tekshiring
- `+998` format bilan kiriting

**Viloyat tanlab bo'lmayapti:**
- `RegionSelector` component to'g'ri import qilinganligini tekshiring

---

## 📞 YORDAM:

Savol bo'lsa:
- GitHub Issues
- Telegram: @yourusername
- Email: support@optommarket.uz

---

**© 2024 OptoMarket.uz - O'zbekiston uchun moslashtirilgan**
