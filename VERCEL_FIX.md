# 🔧 VERCEL ENVIRONMENT VARIABLE FIX

## ❌ Muammo

Frontend **Next.js** loyihasi, lekin Vercel da `VITE_API_URL` ishlatilgan.

Next.js `NEXT_PUBLIC_` prefix talab qiladi!

---

## ✅ Yechim

### Vercel Dashboard da:

1. **Settings** → **Environment Variables**

2. **VITE_API_URL** ni o'chiring (agar bor bo'lsa)

3. **Yangi variable qo'shing:**
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://optommarket-backend.onrender.com/api
   ```

4. **Environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)

5. **Save Changes**

6. **Deployments** → **Redeploy**

---

## 🔍 Tekshirish

Deploy tugagach, browser console da:

```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
// Ko'rsatishi kerak: https://optommarket-backend.onrender.com/api
```

---

## 📝 Qo'shimcha

`lib/api.ts` fayl ishlatilmoqda:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

Bu to'g'ri Next.js usuli!

---

**Bu marta ishlaydi!** 🎯
