# 🔍 LOGIN MUAMMOSINI DEBUG QILISH

## 1️⃣ Browser Console Tekshirish

### Sahifani oching:
https://optom-market.vercel.app/login

### F12 bosing → Console

### Quyidagi komandalarni yozing:

```javascript
// 1. Environment variable tekshirish
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)

// 2. Window object tekshirish
console.log('Window:', window.location.href)

// 3. Network requests tekshirish
// Network tab ga o'ting, login qiling
// Request URL nimaga ketayapti?
```

### Screenshot yuboring:
- Console messages
- Network tab (login request)

---

## 2️⃣ Render.com Backend Logs

### Dashboard ga o'ting:
https://dashboard.render.com

### Logs tekshiring:

Login qilganingizda qanday log chiqyapti?

#### Variant A - Request kelmayapti:
```
# Hech narsa yo'q - frontend backend ga ulanmagan
```

#### Variant B - Request kelyapti:
```
POST /api/auth/login - Origin: https://optom-market.vercel.app
🔐 Login attempt: admin@optommarket.uz
👤 User found: Yes
🔑 Password valid: true
✅ Login successful
```

#### Variant C - Error:
```
❌ Login error: [xato matni]
```

---

## 3️⃣ Vercel Build Logs

### Vercel Deployments:

1. Oxirgi deployment ni oching
2. **Build Logs** ni ko'ring
3. Xato bormi?

```
✓ Environment variables:
  NEXT_PUBLIC_API_URL
```

Bu ko'rinishi kerak!

---

## 4️⃣ Network Tab Tekshirish

### Browser da:

1. F12 → Network tab
2. Login sahifaga o'ting
3. Email/password kiriting
4. **Kirish** tugmasini bosing
5. Network tab da request paydo bo'ladimi?

#### Kutilayotgan:
```
POST https://optommarket-backend.onrender.com/api/auth/login
Status: 200 OK (yoki 401/500)
```

#### Agar request yo'q bo'lsa:
Frontend kod xato - JavaScript error bor

#### Agar request 404:
URL noto'g'ri

#### Agar request 500:
Backend xatosi

---

## 5️⃣ Tezkor Test

### Browser console da:

```javascript
// API URL test
fetch('https://optommarket-backend.onrender.com/api/health')
  .then(r => r.json())
  .then(data => console.log('Backend:', data))
  .catch(err => console.error('Error:', err))
```

Bu backend ishlayotganini tekshiradi.

---

## 📸 Menga Yuboring

Screenshot qiling:

1. ✅ Browser Console (login paytida)
2. ✅ Browser Network tab (login request)
3. ✅ Render.com Logs (login paytida)
4. ✅ Vercel Environment Variables sahifasi

---

## 🎯 Keyingi Qadam

Screenshot larga qarab men aniq muammoni topaman va tuzataman!
