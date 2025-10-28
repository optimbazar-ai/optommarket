# 🚀 SEO Optimization Guide - OptoMarket.uz

Google va Yandex da oldingi o'rinlarni egallash uchun to'liq SEO strategiyasi.

---

## 📋 Qilingan Ishlar

### ✅ 1. Technical SEO

#### Meta Teglar (SEO.jsx)
- ✅ Title va Description optimallashtirildi
- ✅ Keywords kengaytirildi (10+ kalit so'z)
- ✅ Open Graph (Facebook, Instagram)
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD)
- ✅ Canonical URLs
- ✅ Language va Geo tags
- ✅ Robot directives (Google, Yandex, Bing)

#### Robots.txt
- ✅ Google Bot uchun optimallashtirildi
- ✅ Yandex Bot uchun alohida sozlamalar
- ✅ Bing Bot uchun sozlamalar
- ✅ Crawl delay: 0.5 soniya (tezkor indekslash)
- ✅ Sitemap linklar

#### Sitemaps (Backend API)
- ✅ `/api/seo/sitemap.xml` - Asosiy sitemap index
- ✅ `/api/seo/sitemap-static.xml` - Statik sahifalar
- ✅ `/api/seo/sitemap-products.xml` - Barcha mahsulotlar (5000 gacha)
- ✅ `/api/seo/sitemap-categories.xml` - Kategoriyalar
- ✅ `/api/seo/sitemap-blog.xml` - Blog postlar
- ✅ Image sitemaps (mahsulot rasmlari)
- ✅ News sitemaps (blog uchun)

#### Structured Data
- ✅ Organization schema
- ✅ WebSite schema
- ✅ Product schema (narx, stock, rating)
- ✅ BlogPosting schema
- ✅ BreadcrumbList schema
- ✅ SearchAction schema

---

### ✅ 2. Analytics Integration

#### Google Analytics
- ✅ Page view tracking
- ✅ Event tracking
- ✅ E-commerce tracking
- ✅ Product view events
- ✅ Add to cart events
- ✅ Purchase events
- ✅ Search tracking

#### Yandex Metrika
- ✅ Page view tracking
- ✅ Goal tracking (reachGoal)
- ✅ E-commerce tracking
- ✅ Webvisor
- ✅ Click map
- ✅ Session replay

---

## 🎯 Keyingi Qadamlar

### 1. Google Search Console Sozlash

#### A. Saytni qo'shish
1. https://search.google.com/search-console ga kiring
2. "Add property" tugmasini bosing
3. Domain: `optommarket.uz` ni kiriting
4. DNS verification:
   ```
   TXT record: google-site-verification=YOUR_CODE
   ```

#### B. Sitemap yuborish
```
https://optommarket.uz/api/seo/sitemap.xml
https://optommarket.uz/api/seo/sitemap-products.xml
https://optommarket.uz/api/seo/sitemap-categories.xml
https://optommarket.uz/api/seo/sitemap-blog.xml
```

#### C. URL Inspection
- Asosiy sahifalarni tekshiring
- "Request Indexing" tugmasini bosing
- Har hafta yangi sahifalarni yuborish

---

### 2. Yandex Webmaster Sozlash

#### A. Saytni qo'shish
1. https://webmaster.yandex.com ga kiring
2. "Add site" tugmasini bosing
3. `https://optommarket.uz` ni kiriting
4. Meta tag verification:
   ```html
   <meta name="yandex-verification" content="YOUR_CODE" />
   ```

#### B. Sitemap yuborish
```
https://optommarket.uz/api/seo/sitemap.xml
```

#### C. Yandex Metrika ulash
1. https://metrika.yandex.com ga kiring
2. Yangi counter yarating
3. Counter ID ni `.env` ga qo'shing:
   ```env
   VITE_YANDEX_METRIKA_ID=your_counter_id
   ```

#### D. Yandex Turbo Pages
- Mobile uchun tezkor sahifalar
- RSS feed yaratish
- Turbo pages sozlash

---

### 3. Google Analytics Sozlash

#### A. Account yaratish
1. https://analytics.google.com ga kiring
2. Yangi property yarating
3. Measurement ID ni oling (G-XXXXXXXXXX)

#### B. .env faylga qo'shish
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### C. E-commerce sozlash
1. Admin > E-commerce Settings
2. Enable Enhanced E-commerce
3. Funnel steps sozlash

---

### 4. Content Optimization

#### A. Kalit So'zlar (Keywords)
**Asosiy:**
- optom savdo uzbekistan
- optom bozor toshkent
- ulgurji savdo online
- optom narxlar
- wholesale uzbekistan
- optom market uz
- biznes uchun mahsulotlar
- optom xarid qilish

**Long-tail:**
- optom savdo platformasi o'zbekistonda
- eng arzon optom narxlar toshkentda
- online optom bozor uzbekistan
- ishonchli optom savdo sayti
- optom mahsulotlar yetkazib berish bilan

#### B. Meta Descriptions (har sahifa uchun)
```javascript
// Home page
title: "OptoMarket.uz - O'zbekistondagi №1 Optom Savdo Platformasi | 10,000+ Mahsulot"
description: "✅ Eng arzon optom narxlar ✅ 10,000+ mahsulot ✅ Tezkor yetkazib berish ✅ Ishonchli sotuvchilar. Biznesingiz uchun eng yaxshi optom bozor!"

// Products page
title: "Optom Mahsulotlar - Arzon Narxlar va Katta Tanlash | OptoMarket.uz"
description: "10,000+ optom mahsulotlar: elektronika, kiyim, oziq-ovqat, qurilish materiallari va boshqalar. Raqobatbardosh narxlar va sifatli xizmat."

// Blog page
title: "Biznes Maslahatlari va Optom Savdo Yangiliklari | OptoMarket.uz Blog"
description: "Optom savdo, biznes rivojlantirish, marketing strategiyalari haqida foydali maqolalar. Har kuni yangi kontent!"
```

#### C. H1, H2, H3 Struktura
```html
<h1>O'zbekistondagi №1 Optom Savdo Platformasi</h1>
<h2>Nima uchun OptoMarket.uz?</h2>
<h3>10,000+ Mahsulotlar</h3>
<h3>Arzon Narxlar</h3>
<h3>Tezkor Yetkazib Berish</h3>
```

---

### 5. Performance Optimization

#### A. Image Optimization
```bash
# WebP formatga o'tkazish
npm install sharp

# Lazy loading
<img loading="lazy" src="..." alt="..." />

# Responsive images
<img srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1280w.jpg 1280w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1200px"
     src="image-640w.jpg" alt="..." />
```

#### B. Code Splitting
```javascript
// React lazy loading
const Products = lazy(() => import('./pages/Products'));
const Blog = lazy(() => import('./pages/Blog'));
```

#### C. Caching
```javascript
// Service Worker
// vite-plugin-pwa allaqachon mavjud
```

#### D. Minification
```bash
# Production build
npm run build

# Gzip compression (server-side)
```

---

### 6. Link Building

#### A. Internal Links
- ✅ Har sahifada 3-5 ta ichki link
- ✅ Breadcrumbs
- ✅ Related products
- ✅ Blog ichida cross-linking

#### B. External Links
- Social media profiles
- Business directories
- Industry websites
- Guest posting

#### C. Backlinks Strategy
1. **Telegram kanallar** - Har kuni 3 marta post
2. **Facebook/Instagram** - Haftalik postlar
3. **YouTube** - Mahsulot videolari
4. **Business directories:**
   - 2GIS
   - Yandex Maps
   - Google My Business
   - Kun.uz
   - Daryo.uz

---

### 7. Local SEO (O'zbekiston)

#### A. Google My Business
1. Business profile yaratish
2. Address, phone, hours
3. Photos (10+ rasm)
4. Reviews (mijozlardan)

#### B. Yandex Maps
1. Organization qo'shish
2. To'liq ma'lumot
3. Photos va reviews

#### C. 2GIS
1. Company profile
2. Kategoriya: Optom savdo
3. Contact information

---

### 8. Social Signals

#### A. Social Media Presence
- ✅ Telegram kanal (mavjud)
- Facebook page
- Instagram business
- YouTube channel
- LinkedIn company page

#### B. Social Sharing
```javascript
// ShareButtons component allaqachon mavjud
// Har sahifada share buttons qo'shish
```

---

### 9. Mobile Optimization

#### A. Mobile-First Design
- ✅ Responsive (TailwindCSS)
- ✅ PWA (Progressive Web App)
- ✅ Fast loading
- ✅ Touch-friendly

#### B. Mobile Speed
- Target: < 3 seconds load time
- Lighthouse score: > 90

---

### 10. Content Strategy

#### A. Blog Posts
- ✅ Har kuni 5 ta AI blog (mavjud)
- SEO optimized titles
- 800-1200 so'z
- Internal links
- Images with alt text

#### B. Product Descriptions
- Unique content (duplicate emas)
- 200-300 so'z
- Kalit so'zlar
- Bullet points
- Customer benefits

#### C. Category Pages
- Unique descriptions
- H1, H2 structure
- Filters va sorting
- Breadcrumbs

---

## 📊 Monitoring va Reporting

### Weekly Tasks
- [ ] Google Search Console tekshirish
- [ ] Yandex Webmaster tekshirish
- [ ] Analytics review
- [ ] New pages indexing
- [ ] Broken links check

### Monthly Tasks
- [ ] Keyword rankings
- [ ] Competitor analysis
- [ ] Content audit
- [ ] Backlinks check
- [ ] Technical SEO audit

### Tools
- Google Search Console
- Yandex Webmaster
- Google Analytics
- Yandex Metrika
- Ahrefs / SEMrush
- Screaming Frog

---

## 🎯 Expected Results

### 1 oy ichida:
- ✅ Google/Yandex da indekslash
- ✅ 50-100 sahifa indexed
- ✅ Brand name bo'yicha 1-chi o'rin

### 3 oy ichida:
- ✅ 500+ organic visitors/day
- ✅ 10+ kalit so'z TOP 10 da
- ✅ Domain Authority 20+

### 6 oy ichida:
- ✅ 2,000+ organic visitors/day
- ✅ 50+ kalit so'z TOP 10 da
- ✅ Domain Authority 30+
- ✅ "optom savdo uzbekistan" TOP 3

### 1 yil ichida:
- ✅ 5,000+ organic visitors/day
- ✅ 100+ kalit so'z TOP 10 da
- ✅ Domain Authority 40+
- ✅ Industry leader

---

## 📝 Checklist

### Immediate (Hozir)
- [x] SEO component optimized
- [x] Robots.txt updated
- [x] Sitemap API created
- [x] Analytics integrated
- [x] Structured data added
- [ ] Google Search Console setup
- [ ] Yandex Webmaster setup
- [ ] Google Analytics ID
- [ ] Yandex Metrika ID

### Short-term (1 hafta)
- [ ] Submit sitemaps
- [ ] Request indexing (100 sahifa)
- [ ] Social media profiles
- [ ] Google My Business
- [ ] Yandex Maps listing
- [ ] 2GIS listing

### Medium-term (1 oy)
- [ ] 50+ blog posts
- [ ] Internal linking strategy
- [ ] Image optimization
- [ ] Performance optimization
- [ ] Mobile optimization
- [ ] Schema markup expansion

### Long-term (3 oy)
- [ ] Link building campaign
- [ ] Content marketing
- [ ] Guest posting
- [ ] Influencer outreach
- [ ] Video content
- [ ] Podcast

---

## 🔧 Environment Variables

`.env` faylga qo'shing:

```env
# Frontend (.env)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_YANDEX_METRIKA_ID=XXXXXXXX
VITE_API_URL=https://api.optommarket.uz

# Backend (.env)
FRONTEND_URL=https://optommarket.uz
BACKEND_URL=https://api.optommarket.uz
```

---

## 📚 Resources

### Learning
- Google SEO Starter Guide
- Yandex SEO Guide
- Moz Beginner's Guide to SEO
- Ahrefs Blog

### Tools
- Google Search Console
- Yandex Webmaster
- Google Analytics
- Yandex Metrika
- Google PageSpeed Insights
- GTmetrix

---

**Yaratilgan:** 2025-10-23  
**Versiya:** 1.0.0  
**Status:** ✅ Tayyor  
**Maqsad:** Google va Yandex da TOP 10! 🚀
