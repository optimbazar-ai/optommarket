# 🚀 SEO Quick Setup - 30 Daqiqada

Google va Yandex uchun tezkor sozlash.

---

## ✅ Qilingan Ishlar

### 1. Technical SEO
- ✅ SEO component kengaytirildi (JSON-LD, structured data)
- ✅ robots.txt optimallashtirildi (Google, Yandex, Bing)
- ✅ Sitemap API yaratildi (4 ta sitemap)
- ✅ Google Analytics integratsiyasi
- ✅ Yandex Metrika integratsiyasi
- ✅ Meta teglar optimallashtirildi

---

## 🎯 Hozir Qilish Kerak (30 daqiqa)

### 1. Google Search Console (10 daqiqa)

**A. Saytni qo'shish:**
1. https://search.google.com/search-console ga kiring
2. "Add property" → `optommarket.uz`
3. Verification method: **HTML tag**
4. Kodni oling va `index.html` ga qo'shing:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```
5. "Verify" tugmasini bosing

**B. Sitemap yuborish:**
1. Sitemaps → "Add new sitemap"
2. Quyidagilarni qo'shing:
   ```
   https://optommarket.uz/api/seo/sitemap.xml
   https://optommarket.uz/api/seo/sitemap-products.xml
   https://optommarket.uz/api/seo/sitemap-blog.xml
   ```

---

### 2. Yandex Webmaster (10 daqiqa)

**A. Saytni qo'shish:**
1. https://webmaster.yandex.com ga kiring
2. "Add site" → `https://optommarket.uz`
3. Verification: **Meta tag**
4. Kodni oling va `SEO.jsx` da mavjud joyga qo'ying:
   ```jsx
   <meta name="yandex-verification" content="YOUR_CODE" />
   ```
5. "Check" tugmasini bosing

**B. Sitemap yuborish:**
1. Indexing → Sitemaps
2. Add sitemap: `https://optommarket.uz/api/seo/sitemap.xml`

---

### 3. Analytics Setup (10 daqiqa)

**A. Google Analytics:**
1. https://analytics.google.com ga kiring
2. Create property → "OptoMarket.uz"
3. Measurement ID ni oling (G-XXXXXXXXXX)
4. `.env` faylga qo'shing:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

**B. Yandex Metrika:**
1. https://metrika.yandex.com ga kiring
2. "Add counter" → "OptoMarket.uz"
3. Counter ID ni oling (masalan: 12345678)
4. `.env` faylga qo'shing:
   ```env
   VITE_YANDEX_METRIKA_ID=12345678
   ```

**C. Server restart:**
```bash
cd frontend
npm run dev
```

---

## 📊 Natijalarni Tekshirish

### 1. Sitemap Test (hozir)
```bash
# Browser da oching:
https://optommarket.uz/api/seo/sitemap.xml
https://optommarket.uz/api/seo/sitemap-products.xml
https://optommarket.uz/api/seo/sitemap-categories.xml
https://optommarket.uz/api/seo/sitemap-blog.xml
```

### 2. robots.txt Test (hozir)
```bash
# Browser da oching:
https://optommarket.uz/robots.txt
```

### 3. Structured Data Test (hozir)
1. https://search.google.com/test/rich-results ga kiring
2. URL kiriting: `https://optommarket.uz`
3. "Test URL" tugmasini bosing
4. Xatoliklar bo'lmasligi kerak

### 4. Mobile-Friendly Test (hozir)
1. https://search.google.com/test/mobile-friendly ga kiring
2. URL kiriting: `https://optommarket.uz`
3. "Test URL" tugmasini bosing

### 5. PageSpeed Test (hozir)
1. https://pagespeed.web.dev ga kiring
2. URL kiriting: `https://optommarket.uz`
3. Score: 90+ bo'lishi kerak

---

## 🎯 Keyingi 7 Kun

### Kun 1-2: Indexing
- [ ] Google Search Console da "Request Indexing" (10 sahifa)
- [ ] Yandex Webmaster da "Reindex" (10 sahifa)
- [ ] Social media profiles yaratish

### Kun 3-4: Content
- [ ] Blog posts tekshirish (AI har kuni 5 ta yaratadi)
- [ ] Product descriptions optimizatsiya
- [ ] Category pages content qo'shish

### Kun 5-7: Monitoring
- [ ] Google Search Console tekshirish (indexed pages)
- [ ] Yandex Webmaster tekshirish
- [ ] Analytics data ko'rish
- [ ] Errors fix qilish

---

## 📈 Kutilayotgan Natijalar

### 1 hafta:
- ✅ 50+ sahifa indexed
- ✅ Brand name bo'yicha topiladi
- ✅ Analytics data keladi

### 1 oy:
- ✅ 500+ sahifa indexed
- ✅ 100+ organic visitors/day
- ✅ 5-10 kalit so'z TOP 50 da

### 3 oy:
- ✅ 1,000+ organic visitors/day
- ✅ 20+ kalit so'z TOP 10 da
- ✅ "optom savdo uzbekistan" TOP 20 da

---

## 🔧 Environment Variables

**Frontend `.env`:**
```env
VITE_API_URL=https://api.optommarket.uz
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_YANDEX_METRIKA_ID=12345678
```

**Backend `.env`:**
```env
FRONTEND_URL=https://optommarket.uz
BACKEND_URL=https://api.optommarket.uz
```

---

## 📚 To'liq Dokumentatsiya

Batafsil ma'lumot: `SEO_OPTIMIZATION_GUIDE.md`

---

## ✅ Checklist

### Hozir:
- [ ] Google Search Console setup
- [ ] Yandex Webmaster setup
- [ ] Google Analytics ID
- [ ] Yandex Metrika ID
- [ ] Sitemaps yuborish
- [ ] Verification codes

### 1 hafta:
- [ ] Request indexing
- [ ] Social media
- [ ] Content optimization
- [ ] Performance check

### 1 oy:
- [ ] Rankings check
- [ ] Analytics review
- [ ] Content audit
- [ ] Link building

---

**Boshlash:** Hozir!  
**Vaqt:** 30 daqiqa  
**Natija:** Google va Yandex da ko'rinish! 🚀
