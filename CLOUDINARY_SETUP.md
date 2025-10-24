# 🖼️ Cloudinary Setup Guide

## 1. Cloudinary akkaunt yaratish

### Ro'yxatdan o'tish:
1. **https://cloudinary.com/** ga o'ting
2. **"Sign Up for Free"** tugmasini bosing
3. Email va parol kiriting
4. Akkauntni tasdiqlang

---

## 2. API Credentials olish

### Dashboard'ga kirish:
1. Cloudinary'ga login qiling
2. **Dashboard** sahifasiga o'ting
3. **Account Details** bo'limida quyidagilar ko'rinadi:

```
Cloud Name: dxxxxxxxxx
API Key: 123456789012345
API Secret: xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 3. Backend .env fayliga qo'shish

`backend/.env` faylini oching va quyidagilarni qo'shing:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dxxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

**MUHIM:** 
- O'z credentials'laringizni qo'ying!
- Bu ma'lumotlarni hech kimga bermang!
- `.env` fayli `.gitignore`'da bo'lishi kerak

---

## 4. Production (Render) uchun

### Render Dashboard'da:

1. **https://dashboard.render.com/** ga o'ting
2. Backend service'ni tanlang
3. **Environment** tabga o'ting
4. **Add Environment Variable** tugmasini bosing

Quyidagilarni qo'shing:

```
CLOUDINARY_CLOUD_NAME = dxxxxxxxxx
CLOUDINARY_API_KEY = 123456789012345
CLOUDINARY_API_SECRET = xxxxxxxxxxxxxxxxxxxxxxxx
```

5. **Save Changes** tugmasini bosing
6. Service avtomatik restart bo'ladi

---

## 5. Test qilish

### Local'da:
1. Backend serverni restart qiling: `npm run dev`
2. Frontend'da rasm yuklang
3. Console'da Cloudinary URL ko'rinishi kerak:
   ```
   https://res.cloudinary.com/dxxxxxxxxx/image/upload/v1234567890/optommarket/filename.jpg
   ```

### Production'da:
1. Deploy tugashini kuting
2. https://optom-market.vercel.app/ ga o'ting
3. Rasm yuklang
4. Cloudinary Dashboard'da rasmlar ko'rinadi

---

## 6. Cloudinary Dashboard

### Rasmlarni ko'rish:
1. **Media Library** tabga o'ting
2. **optommarket** papkasini oching
3. Barcha yuklangan rasmlar ko'rinadi

### Rasmlarni boshqarish:
- ✅ Ko'rish
- ✅ O'chirish
- ✅ Transform qilish
- ✅ URL olish

---

## ✅ Afzalliklar

### Cloudinary bilan:
- ☁️ **Cloud Storage** - Serverda joy egallamaydi
- 🚀 **CDN** - Tez yuklash (global)
- 🔄 **Auto Transform** - Automatic resize/optimize
- 💰 **25GB Bepul** - Oyiga 25GB storage
- 🌍 **Global Access** - Dunyoning istalgan yeridan
- 🔒 **Secure** - HTTPS va access control

### Render/Vercel'siz:
- ❌ Files yo'qoladi har deploy'da
- ❌ Limited storage
- ❌ Slow loading
- ❌ No CDN

---

## 🔧 Qo'shimcha sozlamalar

### Image transformations:

`backend/config/cloudinary.js` faylida:

```javascript
transformation: [
  { width: 1000, height: 1000, crop: 'limit' }, // Max size
  { quality: 'auto' }, // Auto quality
  { fetch_format: 'auto' } // Auto format (WebP if supported)
]
```

### Folder structure:

```
optommarket/
  ├── products/
  ├── categories/
  ├── users/
  └── blog/
```

---

## 📞 Support

- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Free Plan:** 25GB storage, 25GB bandwidth/month
- **Support:** support@cloudinary.com

---

## 🎉 Tayyor!

Cloudinary sozlangach:
1. ✅ Rasmlar cloud'da saqlanadi
2. ✅ Production'da ishlaydi
3. ✅ Tez va xavfsiz
4. ✅ Bepul 25GB!

**Next:** Backend serverni restart qiling va test qiling! 🚀
