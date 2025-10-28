# 🔧 VERCEL VITE LOYIHA TO'G'RILASH

## ❌ Asosiy Muammo

Frontend **VITE** loyihasi, lekin Vercel uni **Next.js** sifatida deploy qilyapti!

---

## ✅ YECHIM (2 Variant)

### VARIANT 1: Vercel Dashboard (Tavsiya etiladi)

#### 1. Settings → Build & Development Settings

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 2. Environment Variables

**O'chirish:**
- `NEXT_PUBLIC_API_URL` ❌

**Qo'shish:**
```
Key: VITE_API_URL
Value: https://optommarket-backend.onrender.com/api
Environments: ✅ Production, ✅ Preview
```

#### 3. Redeploy

**Deployments** → Oxirgi deployment → **Redeploy**

---

### VARIANT 2: vercel.json (Avtomatik)

`vercel.json` fayli qo'shildi:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Keyingi qadam:**
1. Git push qiling
2. Vercel avtomatik yangi deploy boshlaydi
3. Environment variable `VITE_API_URL` qo'shing

---

## 📋 To'liq Checklist

### Vercel Dashboard da:

- [ ] Settings → General
- [ ] Framework Preset: **Vite** (not Next.js)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables → Delete `NEXT_PUBLIC_API_URL`
- [ ] Environment Variables → Add `VITE_API_URL`
- [ ] Save changes
- [ ] Redeploy

### Deploy Logs Tekshirish:

```bash
✓ Building Vite app...
✓ Build completed
✓ Deployment ready
```

### Browser Test:

```javascript
// Console da
console.log(import.meta.env.VITE_API_URL)
// Ko'rsatishi kerak: https://optommarket-backend.onrender.com/api
```

---

## 🎯 Bu Marta Ishlaydi!

Chunki:
1. ✅ To'g'ri framework (Vite)
2. ✅ To'g'ri build command
3. ✅ To'g'ri environment variable nomi
4. ✅ To'g'ri output directory

---

## 📸 Agar Yordam Kerak Bo'lsa

Vercel Settings screenshot yuboring:
- Build & Development Settings
- Environment Variables

Men aniq ko'rsataman!
