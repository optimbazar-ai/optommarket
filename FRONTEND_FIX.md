# 🔧 FRONTEND NETWORK ERROR FIX

## Muammo
Frontend backend bilan bog'lana olmayapti - "Network Error"

## Sabab
Frontend **Vite** ishlatmoqda, lekin `.env.local` faylda `VITE_API_URL` yo'q.

## Yechim

### 1. Frontend `.env.local` yaratish

```bash
cd frontend
```

`.env.local` faylni yarating va quyidagini kiriting:

```env
# Vite Configuration
VITE_API_URL=http://localhost:5000/api

# For Next.js (if needed)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=OPTOMMARKET
```

### 2. Serverni qayta ishga tushirish

Terminal da (frontend papkada):
```bash
npm run dev
```

### 3. Browser cache tozalash
1. Ctrl + Shift + R (hard refresh)
2. Yoki: DevTools → Application → Clear storage

---

## Production uchun (Vercel/Netlify)

### Vercel Environment Variables:
```env
VITE_API_URL=https://optommarket-backend.onrender.com/api
NEXT_PUBLIC_API_URL=https://optommarket-backend.onrender.com/api
NEXT_PUBLIC_APP_NAME=OPTOMMARKET
```

### Netlify Environment Variables:
```env
VITE_API_URL=https://optommarket-backend.onrender.com/api
```

---

## Tezkor Test

1. **Frontend yaratish:**
```bash
cd frontend
echo VITE_API_URL=http://localhost:5000/api > .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api >> .env.local
npm run dev
```

2. **Browser da test:**
- http://localhost:3000 ga o'ting
- Login sahifasiga o'ting
- Network error yo'qolishi kerak

---

## CORS Tekshirish

Agar hali ham network error bo'lsa, backend CORS sozlamalarini tekshiring:

Backend `server.js` da:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://optommarket.vercel.app'
];
```

---

## Qo'shimcha Debug

Browser console da:
```javascript
console.log(import.meta.env.VITE_API_URL);
// Should output: http://localhost:5000/api
```

Agar `undefined` bo'lsa - `.env.local` faylni to'g'ri yaratmadingiz yoki serverni qayta ishga tushirmadingiz.
