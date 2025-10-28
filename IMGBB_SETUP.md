# 🖼️ ImgBB Setup Guide

## 1. ImgBB API Key olish

### Ro'yxatdan o'tish:
1. **https://imgbb.com/** ga o'ting
2. **"Sign Up"** tugmasini bosing
3. Email va parol kiriting (yoki Google bilan)
4. Akkauntni tasdiqlang

### API Key olish:
1. Login qiling
2. **https://api.imgbb.com/** ga o'ting
3. **"Get API Key"** tugmasini bosing
4. API Key ko'rsatiladi:

```
Your API Key: 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

**MUHIM:** Bu key'ni xavfsiz saqlang!

---

## 2. Backend .env fayliga qo'shish

`backend/.env` faylini oching va quyidagini qo'shing:

```env
# ImgBB Configuration
IMGBB_API_KEY=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

**O'z API key'ingizni qo'ying!**

---

## 3. Production (Render) uchun

### Render Dashboard'da:

1. **https://dashboard.render.com/** ga o'ting
2. Backend service'ni tanlang
3. **Environment** tabga o'ting
4. **Add Environment Variable** tugmasini bosing

Qo'shing:

```
IMGBB_API_KEY = 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

5. **Save Changes** tugmasini bosing
6. Service avtomatik restart bo'ladi

---

## 4. Test qilish

### Local'da:
1. Backend serverni restart qiling:
   ```bash
   cd backend
   npm run dev
   ```

2. Frontend'da rasm yuklang

3. Console'da ImgBB URL ko'rinishi kerak:
   ```
   https://i.ibb.co/abc123/image.jpg
   ```

### Production'da:
1. Deploy tugashini kuting
2. https://optom-market.vercel.app/ ga o'ting
3. Rasm yuklang
4. ImgBB'da saqlanadi!

---

## 5. ImgBB Dashboard

### Rasmlarni ko'rish:
1. **https://imgbb.com/profile** ga o'ting
2. **"Albums"** yoki **"Images"** tabga o'ting
3. Barcha yuklangan rasmlar ko'rinadi

---

## ✅ Afzalliklar

### ImgBB bilan:
- ☁️ **Cloud Storage** - Serverda joy egallamaydi
- 🌍 **Global CDN** - Tez yuklash
- 💰 **100% BEPUL** - Cheklovsiz!
- 🚀 **Tez** - API juda tez
- 🔒 **Xavfsiz** - HTTPS
- 🌐 **Global** - Har yerdan ishlaydi (O'zbekiston ham!)

### Cloudinary vs ImgBB:
| Feature | Cloudinary | ImgBB |
|---------|-----------|-------|
| Narx | 25GB bepul | Cheklovsiz bepul |
| O'zbekiston | ❌ Yo'q | ✅ Ishlaydi |
| Setup | Murakkab | Oson |
| API | Kuchli | Yetarli |
| CDN | Ha | Ha |

---

## 🔧 Qanday ishlaydi?

### Upload jarayoni:

1. **User** frontend'da rasm tanlaydi
2. **Frontend** backend'ga yuboradi
3. **Backend** vaqtinchalik `/uploads` ga saqlaydi
4. **Backend** ImgBB API'ga yuklaydi
5. **ImgBB** URL qaytaradi
6. **Backend** local faylni o'chiradi
7. **Frontend** ImgBB URL'ni ko'rsatadi

### Natija:
```
https://i.ibb.co/abc123/mahsulot-rasm.jpg
```

Bu URL to'g'ridan-to'g'ri ImgBB CDN'dan!

---

## 📊 Limitlar

### Free Plan:
- ✅ **Storage:** Cheklovsiz
- ✅ **Bandwidth:** Cheklovsiz
- ✅ **Requests:** 1000/soat
- ✅ **Max file size:** 32MB
- ✅ **Formats:** JPG, PNG, GIF, WEBP, BMP

Bizning loyiha uchun juda yetarli! 🎉

---

## 🚨 Troubleshooting

### 1. "API key not configured"
**Yechim:** `.env` fayilda `IMGBB_API_KEY` borligini tekshiring

### 2. "Upload failed"
**Yechim:** 
- API key to'g'riligini tekshiring
- Internet ulanishini tekshiring
- Rasm 32MB dan kichik ekanligini tekshiring

### 3. "Rate limit exceeded"
**Yechim:** 1000 request/soat limitidan oshgan. Bir oz kuting.

---

## 🎉 Tayyor!

ImgBB API key'ni `.env` ga qo'shgach:
1. ✅ Rasmlar ImgBB'da saqlanadi
2. ✅ Production'da ishlaydi
3. ✅ Tez va bepul
4. ✅ O'zbekistondan ishlaydi!

**Next:** Backend serverni restart qiling va test qiling! 🚀

---

## 📞 Links

- **ImgBB Website:** https://imgbb.com/
- **API Docs:** https://api.imgbb.com/
- **API Key:** https://api.imgbb.com/ (login kerak)
- **Support:** support@imgbb.com
