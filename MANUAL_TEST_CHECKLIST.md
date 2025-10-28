# 🧪 OptoMarket.uz - To'liq Manual Test Checklist

**Sana:** 2025-10-22
**Tester:** [Sizning ismingiz]
**Status:** TESTING

---

## 🚀 1. SETUP - Serverlarni Ishga Tushirish

### Backend Server
```bash
# Terminal 1
cd e:\loyihalarim\optommarketuz\backend
npm run dev
```

**Tekshirish:**
- [ ] Server ishga tushdi (port 5000)
- [ ] MongoDB'ga ulandi
- [ ] Console'da ✅ belgilari ko'rinadi
- [ ] Xatolik yo'q

**Kutilgan natija:**
```
✓ Server running on port 5000
✓ Environment: development
✓ API available at: http://localhost:5000/api
```

### Frontend Server
```bash
# Terminal 2
cd e:\loyihalarim\optommarketuz\frontend
npm run dev
```

**Tekshirish:**
- [ ] Server ishga tushdi (port 3000)
- [ ] Build muvaffaqiyatli
- [ ] Browser avtomatik ochildi yoki: http://localhost:3000
- [ ] Console'da xatolik yo'q

---

## 💾 2. DATABASE SETUP

### A. Kategoriyalar Qo'shish
```bash
cd backend
npm run seed-categories
```

**Tekshirish:**
- [ ] Script muvaffaqiyatli bajarildi
- [ ] "Categories seeded successfully" message
- [ ] MongoDB'da `categories` collection yaratildi

### B. Admin Yaratish
```bash
npm run create-admin
```

**Credentials:**
- Email: `admin@optommarket.uz`
- Password: `admin123`

**Tekshirish:**
- [ ] "Admin user created successfully" message
- [ ] MongoDB'da user yaratildi
- [ ] Role: admin

### C. Seller Yaratish
```bash
npm run create-seller
```

**Credentials:**
- Email: `seller@optommarket.uz`
- Password: `seller123`

**Tekshirish:**
- [ ] "Seller user created successfully" message
- [ ] MongoDB'da user yaratildi
- [ ] Role: seller

---

## 🌐 3. PUBLIC PAGES TEST

### Homepage (`http://localhost:3000`)

**Hero Section:**
- [ ] Background image/gradient ko'rinadi
- [ ] Heading va tagline
- [ ] CTA buttons (Mahsulotlar, Sotuvchi bo'lish)
- [ ] Buttons clickable

**Featured Products:**
- [ ] "Mashhur mahsulotlar" section
- [ ] Product cards ko'rinadi (agar DB'da mahsulot bo'lsa)
- [ ] Cards clickable

**Categories:**
- [ ] "Kategoriyalar" section
- [ ] Category cards
- [ ] Icons va names

**Stats Counter:**
- [ ] Counters ko'rinadi
- [ ] Animation ishlaydi (agar bor bo'lsa)

**Footer:**
- [ ] Footer links
- [ ] Contact info
- [ ] Social icons

**Console Check:**
- [ ] Console'da error yo'q

---

### Products Page (`/products`)

**Navigation:**
- [ ] Navbar'dan "Mahsulotlar"ga o'tish
- [ ] URL: `/products`

**Filters Section:**
- [ ] Search input
- [ ] Category filter dropdown
- [ ] Price range inputs
- [ ] "Filtrlarni qo'llash" button

**Products Grid:**
- [ ] Product cards grid layout
- [ ] Har bir card:
  - [ ] Rasm (yoki placeholder)
  - [ ] Nomi
  - [ ] Narx
  - [ ] Category badge
  - [ ] Stock info
  - [ ] "Batafsil" button

**Empty State:**
- [ ] Mahsulot yo'q bo'lsa message ko'rinadi

**Test Cases:**
1. Search ishlashi:
   - [ ] Text kiriting
   - [ ] Natijalar filtrlandi
2. Category filter:
   - [ ] Kategoriya tanlang
   - [ ] Faqat o'sha kategoriya ko'rinadi
3. Price filter:
   - [ ] Min/Max narx kiriting
   - [ ] Filter qo'llang
   - [ ] Natijalar to'g'ri

---

### Product Detail (`/products/:id`)

**Navigation:**
- [ ] Product carddan click qiling
- [ ] Detail page ochildi

**Product Info:**
- [ ] Rasm carousel (agar bir nechta rasm bo'lsa)
- [ ] Product name
- [ ] Description
- [ ] Price (regular va wholesale)
- [ ] Stock status
- [ ] Category
- [ ] Brand (agar bor bo'lsa)

**Actions:**
- [ ] Quantity selector (+ / -)
- [ ] "Savatga qo'shish" button
- [ ] Button ishlaydi

**Related Products:**
- [ ] "O'xshash mahsulotlar" section
- [ ] 3-4 ta card

---

### Cart (`/cart`)

**Empty Cart:**
- [ ] "Savatingiz bo'sh" message
- [ ] "Mahsulotlarga o'tish" button

**With Items:**
1. Mahsulot qo'shing (product detail'dan)
2. Cart'ga o'ting (`/cart`)

**Cart Items:**
- [ ] Mahsulot ro'yxati
- [ ] Har bir item:
  - [ ] Rasm
  - [ ] Nomi
  - [ ] Narx
  - [ ] Quantity selector
  - [ ] Subtotal
  - [ ] Remove button (trash icon)

**Actions:**
- [ ] Quantity + ishlaydi (total yangilanadi)
- [ ] Quantity - ishlaydi
- [ ] Remove ishlaydi

**Summary:**
- [ ] Subtotal to'g'ri
- [ ] Total to'g'ri
- [ ] "Checkout" button

---

### Checkout (`/checkout`)

**Pre-requisite:** Cart'da mahsulot bo'lishi kerak

**Form Sections:**
1. **Shaxsiy ma'lumotlar:**
   - [ ] To'liq ism
   - [ ] Telefon
   - [ ] Email

2. **Yetkazib berish manzili:**
   - [ ] Viloyat dropdown
   - [ ] Shahar/Tuman
   - [ ] Ko'cha
   - [ ] Uy raqami

3. **To'lov usuli:**
   - [ ] Naqd
   - [ ] Click
   - [ ] Payme
   - [ ] Radio buttons

**Promo Code:**
- [ ] Input
- [ ] "Qo'llash" button
- [ ] (Test: hozir ishlamaydi, placeholder)

**Order Summary:**
- [ ] Mahsulotlar ro'yxati
- [ ] Subtotal
- [ ] Yetkazib berish
- [ ] Total

**Submit:**
- [ ] "Buyurtma berish" button
- [ ] Validation ishlaydi (bo'sh maydonlar)
- [ ] Submit after filling form
- [ ] Redirect to success page

---

### Order Success (`/order-success/:id`)

**After Checkout:**
- [ ] Success page ochildi
- [ ] Order number
- [ ] Success message
- [ ] Order details summary
- [ ] "Buyurtmalarim" link

---

## 🔐 4. AUTHENTICATION TEST

### Register (`/register`)

**Test 1: Customer Registration**
- [ ] Form ochildi
- [ ] Barcha maydonlar:
  - [ ] To'liq ism
  - [ ] Email
  - [ ] Parol
  - [ ] Telefon
  - [ ] Rol: **Xaridor** (default)
  - [ ] Kompaniya nomi (optional)

- [ ] Validation:
  - [ ] Email format
  - [ ] Parol min 6 char
  - [ ] Required fields

- [ ] Submit:
  - [ ] "Ro'yxatdan o'tish" clicked
  - [ ] Success message
  - [ ] Redirect to dashboard

**Test 2: Seller Registration**
- [ ] Rol: **Sotuvchi** tanlash
- [ ] Kompaniya nomi (required for seller)
- [ ] Submit
- [ ] Success
- [ ] Redirect to `/seller`

---

### Login (`/login`)

**Test 1: Seller Login**
- Email: `seller@optommarket.uz`
- Password: `seller123`

- [ ] Email kiriting
- [ ] Password kiriting
- [ ] "Kirish" clicked
- [ ] Success
- [ ] Redirect to `/seller`
- [ ] User info navbar'da

**Test 2: Admin Login**
- Email: `admin@optommarket.uz`
- Password: `admin123`

- [ ] Login
- [ ] Redirect to `/admin`
- [ ] Admin navbar

**Test 3: Invalid Login**
- [ ] Noto'g'ri credentials
- [ ] Error message ko'rinadi
- [ ] Login sahifasida qoladi

---

## 👤 5. SELLER PANEL TEST

**Pre-requisite:** Seller sifatida login

### Seller Dashboard (`/seller`)

**Layout:**
- [ ] Sidebar navigation
- [ ] Logo
- [ ] User info (top-right)
- [ ] Logout button

**Welcome Section:**
- [ ] User name
- [ ] Greeting
- [ ] Current date

**Statistics Cards (4 ta):**
- [ ] Jami buyurtmalar
- [ ] Kutilayotgan
- [ ] Jami daromad
- [ ] Shu oy daromad

**Recent Orders:**
- [ ] So'nggi 5 ta order table
- [ ] Agar order yo'q: empty message

**Quick Actions:**
- [ ] 3 ta card
- [ ] Buyurtmalar
- [ ] Mahsulotlar
- [ ] Statistika
- [ ] Cards clickable

---

### Seller Products (`/seller/products`)

**✅ FIXED - Bu sahifa avval blank edi, hozir ishlaydi**

**Products List:**
- [ ] Header
- [ ] "Mahsulot qo'shish" button

**Filters:**
- [ ] Search input
- [ ] Category dropdown

**Products Grid:**
- [ ] Grid layout (3 columns)
- [ ] Har bir product card:
  - [ ] Rasm
  - [ ] Nomi
  - [ ] Description (2 lines)
  - [ ] Narx (formatted)
  - [ ] Ulgurji narx
  - [ ] Stock
  - [ ] Approval status badge:
    - ⏳ Kutilmoqda (yellow)
    - ✅ Tasdiqlangan (green)
    - ❌ Rad etilgan (red)
  - [ ] Ko'rildi count
  - [ ] Sotildi count
  - [ ] "Tahrirlash" button
  - [ ] "O'chirish" button

**Empty State:**
- [ ] Mahsulot yo'q message
- [ ] "Birinchi mahsulotni qo'shish" button

---

### Add Product Test

**Steps:**
1. [ ] "Mahsulot qo'shish" clicked
2. [ ] Modal ochildi

**Modal Form:**
- [ ] Mahsulot nomi *
- [ ] Tavsif *
- [ ] Narxi (so'm) *
- [ ] Ulgurji narx
- [ ] Kategoriya * (dropdown - kategoriyalar ko'rinadi)
- [ ] Brend
- [ ] Rasm URL (vergul bilan)
- [ ] Ombor soni *
- [ ] Min. buyurtma *
- [ ] O'lchov birligi * (dropdown)

**Fill Form:**
- Nomi: `Test Mahsulot`
- Tavsif: `Bu test mahsulot`
- Narx: `100000`
- Kategoriya: Biror kategoriya
- Stock: `50`
- Min order: `1`
- Unit: `dona`

**Submit:**
- [ ] "Qo'shish" clicked
- [ ] Success message
- [ ] Modal yopildi
- [ ] Mahsulot ro'yxatda paydo bo'ldi
- [ ] Status: **Kutilmoqda** (pending)

---

### Edit Product Test

**Steps:**
1. [ ] Product card'da "Tahrirlash" clicked
2. [ ] Modal ochildi
3. [ ] Mavjud ma'lumotlar ko'rinadi

**Edit:**
- [ ] Nomni o'zgartiring
- [ ] Narxni o'zgartiring
- [ ] "Saqlash" clicked
- [ ] Success message
- [ ] O'zgarishlar ko'rinadi

---

### Delete Product Test

**Steps:**
1. [ ] "O'chirish" (trash) clicked
2. [ ] Confirmation dialog
3. [ ] "OK" clicked
4. [ ] Success message
5. [ ] Mahsulot ro'yxatdan o'chdi

---

### Seller Orders (`/seller/orders`)

**Pre-requisite:** Order bo'lishi kerak (checkout qiling)

**Orders List:**
- [ ] Orders table/grid
- [ ] Har bir order:
  - [ ] Order number
  - [ ] Customer info
  - [ ] Date
  - [ ] Items list
  - [ ] Total price
  - [ ] Status badge
  - [ ] Payment status

**Filters:**
- [ ] Status filter dropdown
- [ ] Search

**Order Details:**
- [ ] Order expand yoki detail page
- [ ] To'liq ma'lumotlar

**Status Change:**
- [ ] Status dropdown (agar allowed)
- [ ] Status o'zgartirish
- [ ] Success message

---

### Seller Analytics (`/seller/analytics`)

**Header:**
- [ ] Title
- [ ] Time range selector (week/month/year)

**Statistics Cards (4 ta):**
- [ ] Jami daromad (with growth %)
- [ ] Jami buyurtmalar (with growth %)
- [ ] Jami mahsulotlar
- [ ] O'rtacha buyurtma

**Charts:**

1. **Sales Dynamics (Line Chart):**
   - [ ] Chart render bo'ldi
   - [ ] X axis (dates)
   - [ ] Y axis (values)
   - [ ] 2 lines (revenue, orders)
   - [ ] Tooltip ishlaydi
   - [ ] Legend

2. **Category Distribution (Pie Chart):**
   - [ ] Pie chart
   - [ ] Slices
   - [ ] Labels with %
   - [ ] Colors
   - [ ] Tooltip

3. **Revenue Breakdown (Bar Chart):**
   - [ ] Bar chart
   - [ ] Bars
   - [ ] Labels
   - [ ] Tooltip

**Top Products Table:**
- [ ] Table
- [ ] Rank (#)
- [ ] Product name
- [ ] Sold count
- [ ] Views
- [ ] Revenue
- [ ] Empty state (agar ma'lumot yo'q)

---

### Seller Payments (`/seller/payments`)

**Header:**
- [ ] Gradient background
- [ ] Title
- [ ] "Pul chiqarish" button

**Statistics Cards (4 ta):**
- [ ] Joriy balans
- [ ] Jami sotuvlar
- [ ] Komissiya %
- [ ] Kutilmoqda (pending)

**Bank Info:**
- [ ] Bank nomi
- [ ] Hisob raqami
- [ ] (Agar yo'q: "Bank ma'lumotlarini kiriting" message)

**Withdrawals Table:**
- [ ] Sana
- [ ] Summa
- [ ] Bank
- [ ] Status badge
- [ ] Notes/Rejection reason
- [ ] Empty state

---

### Withdrawal Request Test

**Pre-requisite:** Bank info settings'da kiritilgan bo'lishi kerak

**Steps:**
1. [ ] "Pul chiqarish" clicked
2. [ ] Modal ochildi

**Modal Form:**
- [ ] Summa input
- [ ] Min/Max info
- [ ] Notes textarea

**Test 1: Valid Request**
- Summa: `100000` (min amount)
- Notes: `Test withdrawal`
- [ ] "Yuborish" clicked
- [ ] Success message
- [ ] Modal yopildi
- [ ] Table'da paydo bo'ldi
- [ ] Status: Kutilmoqda

**Test 2: Invalid Amount (too low)**
- Summa: `50000`
- [ ] Submit
- [ ] Error: "Minimum 100,000 so'm"

**Test 3: Insufficient Balance**
- Summa: `999999999`
- [ ] Submit
- [ ] Error: "Balans yetarli emas"

---

### Seller Settings (`/seller/settings`)

**Tabs (4 ta):**
- [ ] Profil ma'lumotlari
- [ ] Biznes ma'lumotlari
- [ ] To'lov ma'lumotlari
- [ ] Xavfsizlik

**Tab 1: Profil**

**Form:**
- [ ] To'liq ism
- [ ] Email (readonly?)
- [ ] Telefon
- [ ] Kompaniya nomi
- [ ] Ko'cha
- [ ] Shahar
- [ ] Viloyat

**Test:**
- [ ] Ma'lumotlarni o'zgartiring
- [ ] "Saqlash" clicked
- [ ] Success message
- [ ] O'zgarishlar saqlandi (refresh qiling)

**Tab 2: Biznes**

**Form:**
- [ ] Bio (textarea)
- [ ] STIR/INN

**Stats Display:**
- [ ] Jami sotuvlar
- [ ] Reyting
- [ ] Verification status badge

**Test:**
- [ ] Bio kiriting
- [ ] INN kiriting
- [ ] Save
- [ ] Success

**Tab 3: To'lov**

**Form:**
- [ ] Bank nomi
- [ ] Hisob raqami

**Display:**
- [ ] Joriy balans (large)
- [ ] Komissiya %

**Test:**
- [ ] Bank: `Xalq Banki`
- [ ] Account: `1234567890123456`
- [ ] Save
- [ ] Success
- [ ] Payments page'da ko'rinadi

**Tab 4: Xavfsizlik**

**Form:**
- [ ] Joriy parol
- [ ] Yangi parol
- [ ] Tasdiqlash parol

**Requirements:**
- [ ] Min 6 characters message

**Test:**
- Current: `seller123`
- New: `newseller123`
- Confirm: `newseller123`
- [ ] Submit
- [ ] Success
- [ ] Logout qiling
- [ ] Yangi parol bilan login qiling

---

## 🔐 6. ADMIN PANEL TEST

**Pre-requisite:** Admin sifatida login

### Admin Dashboard (`/admin`)

**Statistics Overview:**
- [ ] 4-6 ta stat cards
- [ ] Jami mahsulotlar
- [ ] Jami buyurtmalar
- [ ] Jami foydalanuvchilar
- [ ] Daromad

**Charts:**
- [ ] Sales chart
- [ ] Orders chart
- [ ] Recent data

**Recent Lists:**
- [ ] Recent orders
- [ ] Recent products
- [ ] Recent users

---

### Admin Products (`/admin/products`)

**Products List:**
- [ ] Barcha mahsulotlar
- [ ] Seller column (kim qo'shgan)
- [ ] Approval status filter
- [ ] Pending products highlight

**Product Card/Row:**
- [ ] Image
- [ ] Name
- [ ] Price
- [ ] Stock
- [ ] Seller name
- [ ] Status badge
- [ ] Actions

---

### Product Approval Test

**Pre-requisite:** Seller mahsulot qo'shgan (pending)

**Steps:**
1. [ ] Pending mahsulotni toping
2. [ ] Seller nomi ko'rinadi

**Test 1: Approve**
- [ ] "Tasdiqlash" / ✅ button
- [ ] Confirmation
- [ ] Tasdiqlash
- [ ] Status "approved" ga o'zgaradi
- [ ] Mahsulot public'da ko'rinadi (`/products`)

**Test 2: Reject**
- [ ] Yangi mahsulot qo'shing (seller sifatida)
- [ ] Admin panel'ga o'ting
- [ ] "Rad etish" / ❌ button
- [ ] Rejection reason prompt
- [ ] Reason: `Rasm sifatsiz`
- [ ] Submit
- [ ] Status "rejected" ga o'zgaradi
- [ ] Seller products page'da rejection reason ko'rinadi

---

### Admin Users (`/admin/users`)

**Users List:**
- [ ] Barcha users table/grid
- [ ] Email
- [ ] Name
- [ ] Role badge
- [ ] Verification status (sellers uchun)

**Stats:**
- [ ] Jami users
- [ ] Adminlar soni
- [ ] Sotuvchilar soni
- [ ] Xaridorlar soni

---

### Seller Verification Test

**Pre-requisite:** Yangi seller ro'yxatdan o'tgan

**Steps:**
1. [ ] Pending seller'ni toping
2. [ ] Status: ⏳ Kutilmoqda

**Test 1: Approve**
- [ ] ✅ "Tasdiqlash" button
- [ ] Confirmation dialog
- [ ] Confirm
- [ ] Status "approved" ga o'zgaradi
- [ ] Seller verified = true
- [ ] Seller barcha funksiyalardan foydalana oladi

**Test 2: Reject**
- [ ] Yangi seller yarating
- [ ] Admin panel
- [ ] ❌ "Rad etish" button
- [ ] Reason prompt: `Hujjatlar to'liq emas`
- [ ] Submit
- [ ] Status "rejected" ga o'zgaradi
- [ ] Seller settings'da rejection reason ko'rinadi

---

### Admin Orders (`/admin/orders`)

**Orders List:**
- [ ] Barcha orderlar
- [ ] Customer info
- [ ] Seller info
- [ ] Status
- [ ] Total
- [ ] Date

**Status Update:**
- [ ] Order select
- [ ] Status dropdown
- [ ] Change status
- [ ] Success

---

### Admin Categories (`/admin/categories`)

**Categories List:**
- [ ] Barcha kategoriyalar
- [ ] Name
- [ ] Active status
- [ ] Product count (?)

**Add Category:**
- [ ] "Add" button
- [ ] Modal
- [ ] Name
- [ ] Description
- [ ] Icon
- [ ] Submit
- [ ] Success

---

### Admin Settings (`/admin/settings`)

**Settings Sections:**
- [ ] Site settings
- [ ] Payment settings
- [ ] Email settings
- [ ] Etc.

---

## 🐛 7. XATOLIKLAR RO'YXATI

Test jarayonida topilgan xatoliklar:

### ❌ Critical (Ishlamaydi)
_Hozircha yo'q_

### ⚠️ High (Muhim)
_Hozircha yo'q_

### 🔸 Medium
_Hozircha yo'q_

### 🔹 Low (Kichik)
_Hozircha yo'q_

### 💡 Enhancement (Yaxshilanish)
_Hozircha yo'q_

---

## ✅ TEST NATIJASI

**Jami testlar:** [ ]
**O'tdi:** [ ]
**Muvaffaqiyatsiz:** [ ]
**Kutilmoqda:** [ ]

**Pass Rate:** __%

---

## 📝 IZOHLAR

_Test jarayonida qo'shimcha izohlar:_

1. 
2. 
3. 

---

## 🎯 KEYINGI QADAM

Test yakunlangandan keyin:
- [ ] Barcha xatoliklarni tuzatish
- [ ] Re-test qilish
- [ ] Image upload tizimini qo'shish

---

**Test boshlash vaqti:** _________
**Test tugash vaqti:** _________
**Umumiy vaqt:** _________

