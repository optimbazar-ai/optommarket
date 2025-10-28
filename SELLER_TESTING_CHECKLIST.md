# ✅ Seller Tizimi Test Checklist

Test qilish uchun to'liq ro'yxat. Har bir funksiyani tekshiring.

---

## 🎯 Pre-Test Setup

### Backend
```bash
cd backend
npm install
npm run dev
```
Server port: `5000`

### Frontend  
```bash
cd frontend
npm install
npm run dev
```
Server port: `3000`

### Test Akkauntlar
```bash
# Admin yaratish
cd backend
npm run create-admin

# Seller yaratish
npm run create-seller
```

---

## 1️⃣ Seller Registration & Login

### Registration (`/register`)
- [ ] Sahifa ochiladi
- [ ] Barcha maydonlar ko'rinadi
- [ ] "Sotuvchi" rolini tanla
- [ ] Formani to'ldirish
- [ ] Email validation ishlaydi
- [ ] Parol strength check
- [ ] "Ro'yxatdan o'tish" tugmasi ishlaydi
- [ ] Muvaffaqiyatli registration message
- [ ] Avtomatik `/seller` ga redirect

### Login (`/login`)
- [ ] Sahifa ochiladi
- [ ] Email/Password maydonlari
- [ ] "Kirish" tugmasi ishlaydi
- [ ] Noto'g'ri credentials xato beradi
- [ ] To'g'ri credentials bilan kirish
- [ ] Seller rolida `/seller` ga redirect
- [ ] Token saqlanadi (localStorage)

---

## 2️⃣ Seller Dashboard (`/seller`)

### Layout & Navigation
- [ ] Dashboard ochiladi
- [ ] Top navbar ko'rinadi
- [ ] Logo va branding
- [ ] User menu (dropdown)
- [ ] Logout tugmasi ishlaydi
- [ ] Navigation tabs:
  - [ ] Dashboard
  - [ ] Buyurtmalar
  - [ ] Mahsulotlar
  - [ ] Statistika
  - [ ] To'lovlar
  - [ ] Sozlamalar

### Welcome Section
- [ ] User ismi ko'rinadi
- [ ] Avatar/Initial
- [ ] Bugungi sana
- [ ] Greeting message

### Statistics Cards
- [ ] Jami buyurtmalar (count)
- [ ] Kutilayotgan (pending count)
- [ ] Jami daromad (total revenue)
- [ ] Shu oy daromad (monthly revenue)
- [ ] Hamma kartalar to'g'ri hisoblanadi

### Recent Orders Table
- [ ] So'nggi 5 ta buyurtma
- [ ] Order number
- [ ] Customer info
- [ ] Date
- [ ] Price
- [ ] Status badge
- [ ] Bo'sh holat (no orders message)

### Quick Actions
- [ ] 3 ta action card
- [ ] Buyurtmalarga o'tish
- [ ] Mahsulotlarga o'tish
- [ ] Statistikaga o'tish
- [ ] Hover effects

---

## 3️⃣ Seller Products (`/seller/products`)

### Products List
- [ ] Sahifa ochiladi
- [ ] "Mahsulot qo'shish" tugmasi
- [ ] Search input ishlaydi
- [ ] Category filter ishlaydi
- [ ] Mahsulotlar grid layout (3 columns)

### Product Card
- [ ] Rasm ko'rinadi (yoki placeholder)
- [ ] Mahsulot nomi
- [ ] Tavsif (2 line clamp)
- [ ] Narx (formatted)
- [ ] Ulgurji narx
- [ ] Stock count
- [ ] Approval status badge:
  - [ ] ⏳ Kutilmoqda (yellow)
  - [ ] ✅ Tasdiqlangan (green)
  - [ ] ❌ Rad etilgan (red)
- [ ] Ko'rildi count
- [ ] Sotildi count
- [ ] Rejection reason (agar rad etilgan)
- [ ] "Tahrirlash" tugmasi
- [ ] "O'chirish" tugmasi

### Add Product Modal
- [ ] Modal ochiladi
- [ ] Barcha maydonlar ko'rinadi:
  - [ ] Mahsulot nomi *
  - [ ] Tavsif *
  - [ ] Narx *
  - [ ] Ulgurji narx
  - [ ] Kategoriya * (dropdown)
  - [ ] Brend
  - [ ] Rasm URL
  - [ ] Ombor soni *
  - [ ] Min. buyurtma *
  - [ ] O'lchov birligi *
- [ ] Validation ishlaydi
- [ ] "Qo'shish" tugmasi
- [ ] "Bekor qilish" tugmasi
- [ ] Muvaffaqiyatli qo'shildi message
- [ ] Status: "pending" bo'lib saqlanadi
- [ ] Modal yopiladi
- [ ] Ro'yxat yangilanadi

### Edit Product
- [ ] "Tahrirlash" tugmasi ishlaydi
- [ ] Modal ochiladi
- [ ] Mavjud ma'lumotlar ko'rsatiladi
- [ ] Ma'lumotlarni o'zgartirish
- [ ] "Saqlash" tugmasi ishlaydi
- [ ] Muvaffaqiyatli yangilandi message
- [ ] Ro'yxat yangilanadi

### Delete Product
- [ ] "O'chirish" tugmasi ishlaydi
- [ ] Confirmation dialog
- [ ] "Bekor qilish" ishlaydi
- [ ] "Tasdiqlash" mahsulotni o'chiradi
- [ ] Success message
- [ ] Ro'yxat yangilanadi

### Empty State
- [ ] Mahsulot yo'q bo'lsa message
- [ ] Icon
- [ ] "Birinchi mahsulotni qo'shish" tugmasi

---

## 4️⃣ Seller Orders (`/seller/orders`)

### Orders List
- [ ] Sahifa ochiladi
- [ ] Faqat o'z mahsulotlaridagi orderlar
- [ ] Status filter dropdown
- [ ] Search ishlaydi
- [ ] Orders table/grid

### Order Card/Row
- [ ] Order number
- [ ] Customer info (name, phone)
- [ ] Date
- [ ] Items list
- [ ] Total price
- [ ] Status badge
- [ ] Payment status
- [ ] "Ko'rish" yoki expand tugmasi

### Order Details
- [ ] To'liq ma'lumotlar
- [ ] Items bilan
- [ ] Delivery address
- [ ] Status change dropdown (agar allowed)
- [ ] Status yangilash ishlaydi

---

## 5️⃣ Seller Analytics (`/seller/analytics`)

### Page Layout
- [ ] Sahifa ochiladi
- [ ] Header with title
- [ ] Time range selector (week/month/year)

### Statistics Cards
- [ ] Jami daromad (with growth %)
- [ ] Jami buyurtmalar (with growth %)
- [ ] Jami mahsulotlar
- [ ] O'rtacha buyurtma

### Charts
- [ ] Sales Line Chart
  - [ ] X axis (dates)
  - [ ] Y axis (revenue/orders)
  - [ ] Tooltip ishlaydi
  - [ ] Legend
- [ ] Category Pie Chart
  - [ ] Slices
  - [ ] Labels with %
  - [ ] Colors
  - [ ] Tooltip
- [ ] Revenue Bar Chart
  - [ ] Bars
  - [ ] Labels
  - [ ] Tooltip

### Top Products Table
- [ ] Rank (#)
- [ ] Product name
- [ ] Sold count
- [ ] Views count
- [ ] Revenue
- [ ] Bo'sh holat message

---

## 6️⃣ Seller Payments (`/seller/payments`)

### Page Layout
- [ ] Sahifa ochiladi
- [ ] Header gradient
- [ ] "Pul chiqarish" tugmasi

### Statistics Cards
- [ ] Joriy balans (formatted)
- [ ] Jami sotuvlar
- [ ] Komissiya %
- [ ] Kutilmoqda (pending withdrawals)

### Bank Info Section
- [ ] Bank nomi ko'rinadi
- [ ] Hisob raqami ko'rinadi
- [ ] Agar yo'q bo'lsa message

### Withdrawals Table
- [ ] Sana
- [ ] Summa
- [ ] Bank info
- [ ] Status badge:
  - [ ] ⏳ Kutilmoqda
  - [ ] ✅ Tasdiqlangan
  - [ ] ✅ Bajarildi
  - [ ] ❌ Rad etilgan
- [ ] Notes/Rejection reason
- [ ] Bo'sh holat message

### Withdrawal Modal
- [ ] "Pul chiqarish" tugmasi ochadi
- [ ] Summa input
- [ ] Min/Max validation
- [ ] Notes textarea
- [ ] "Yuborish" tugmasi
- [ ] "Bekor qilish" tugmasi
- [ ] Validation errors
- [ ] Muvaffaqiyat message
- [ ] Ro'yxat yangilanadi
- [ ] Balance tekshiriladi

### Error Cases
- [ ] Balance yetarli emas error
- [ ] Minimum 100k error
- [ ] Bank info yo'q error

---

## 7️⃣ Seller Settings (`/seller/settings`)

### Tabs Navigation
- [ ] 4 ta tab:
  - [ ] Profil ma'lumotlari
  - [ ] Biznes ma'lumotlari
  - [ ] To'lov ma'lumotlari
  - [ ] Xavfsizlik
- [ ] Active tab highlight
- [ ] Tab switching

### Profil Tab
- [ ] User info form:
  - [ ] To'liq ism
  - [ ] Email
  - [ ] Telefon
  - [ ] Kompaniya nomi
- [ ] Address fields:
  - [ ] Ko'cha
  - [ ] Shahar
  - [ ] Viloyat
- [ ] "Saqlash" tugmasi
- [ ] Update ishlaydi
- [ ] Success message

### Biznes Tab
- [ ] Bio textarea
- [ ] STIR/INN input
- [ ] Statistics display:
  - [ ] Jami sotuvlar
  - [ ] Reyting
  - [ ] Verification status
- [ ] "Saqlash" tugmasi

### To'lov Tab
- [ ] Bank nomi input
- [ ] Hisob raqami input
- [ ] Balance display (large, formatted)
- [ ] Komissiya display
- [ ] "Saqlash" tugmasi

### Xavfsizlik Tab
- [ ] Joriy parol input
- [ ] Yangi parol input
- [ ] Tasdiqlash parol input
- [ ] Password requirements info
- [ ] "Parolni o'zgartirish" tugmasi
- [ ] Validation:
  - [ ] Parollar mos kelishi
  - [ ] Min 6 character
  - [ ] Joriy parol to'g'ri
- [ ] Success message

---

## 8️⃣ Admin Seller Management (`/admin/users`)

### Users List
- [ ] Sahifa ochiladi (admin sifatida)
- [ ] Barcha userlar ko'rinadi
- [ ] Statistics cards:
  - [ ] Jami users
  - [ ] Adminlar
  - [ ] Sotuvchilar
  - [ ] Xaridorlar

### Seller Verification
- [ ] Seller verification status badge:
  - [ ] ⏳ Kutilmoqda
  - [ ] ✅ Tasdiqlangan
  - [ ] ❌ Rad etilgan
- [ ] Pending sellerlar uchun buttons:
  - [ ] ✅ Tasdiqlash (green)
  - [ ] ❌ Rad etish (red)

### Approve Seller
- [ ] ✅ tugma ishlaydi
- [ ] Confirmation dialog
- [ ] Tasdiqlash ishlaydi
- [ ] Status "approved" ga o'zgaradi
- [ ] User verified = true
- [ ] Ro'yxat yangilanadi

### Reject Seller
- [ ] ❌ tugma ishlaydi
- [ ] Rejection reason prompt
- [ ] Reason kiritilmasa cancel
- [ ] Rad etish ishlaydi
- [ ] Status "rejected" ga o'zgaradi
- [ ] Reason saqlanadi
- [ ] Ro'yxat yangilanadi

### Other Actions
- [ ] Admin qilish/olib tashlash
- [ ] User o'chirish
- [ ] Role o'zgartirish

---

## 9️⃣ Admin Product Approval (`/admin/products`)

### Products List
- [ ] Barcha mahsulotlar
- [ ] Seller nomi ko'rinadi
- [ ] Approval status filter
- [ ] Pending products highlight

### Approve Product
- [ ] Tasdiqlash modal/button
- [ ] Status "approved" ga o'zgaradi
- [ ] Active = true
- [ ] Mahsulot do'konda ko'rinadi

### Reject Product
- [ ] Rad etish button
- [ ] Rejection reason input
- [ ] Status "rejected" ga o'zgaradi
- [ ] Reason saqlanadi
- [ ] Seller ko'radi rejection reason

---

## 🔟 Admin Withdrawals (`/admin` panel)

> Note: Agar alohida admin withdrawals sahifasi bo'lsa

### Withdrawals List
- [ ] Pending so'rovlar
- [ ] Seller info
- [ ] Amount
- [ ] Bank details
- [ ] Status

### Approve Withdrawal
- [ ] Tasdiqlash button
- [ ] Confirmation
- [ ] Status "approved"
- [ ] Balance deducted
- [ ] Seller balansidan yechiladi

### Reject Withdrawal
- [ ] Rad etish button
- [ ] Rejection reason
- [ ] Status "rejected"
- [ ] Balance o'zgarmaydi

### Complete Withdrawal
- [ ] "Bajarildi" button
- [ ] Status "completed"
- [ ] Completed date saqlanadi

---

## 1️⃣1️⃣ Integration Tests

### Full Flow: Seller Registration → Product → Order → Payment

#### Step 1: Register
- [ ] Seller ro'yxatdan o'tdi
- [ ] Profil to'ldirildi
- [ ] Bank info kiritildi

#### Step 2: Verification
- [ ] Admin tasdiqladi
- [ ] Status "approved"
- [ ] verified = true

#### Step 3: Add Product
- [ ] Mahsulot qo'shildi
- [ ] Status "pending"

#### Step 4: Admin Approve
- [ ] Admin mahsulotni tasdiqladi
- [ ] Status "approved"
- [ ] Mahsulot do'konda ko'rinadi

#### Step 5: Customer Order
- [ ] Customer buyurtma berdi
- [ ] Order seller dashboardda ko'rinadi

#### Step 6: Process Order
- [ ] Seller holat o'zgartirdi
- [ ] Status: confirmed → processing → shipped → delivered

#### Step 7: Payment
- [ ] Order delivered
- [ ] Commission hisoblanadi
- [ ] Seller balansiga qo'shiladi

#### Step 8: Withdrawal
- [ ] Seller pul chiqarish so'rovi
- [ ] Admin tasdiqladi
- [ ] Balance yechildi
- [ ] Status: approved → completed

---

## 1️⃣2️⃣ Error Handling & Edge Cases

### Authentication
- [ ] Invalid credentials
- [ ] Expired token
- [ ] Wrong role access
- [ ] Unauthorized page redirect

### Validation
- [ ] Empty fields
- [ ] Invalid email format
- [ ] Short password
- [ ] Negative numbers
- [ ] Max length exceeded

### Business Logic
- [ ] Insufficient balance
- [ ] Minimum withdrawal not met
- [ ] Product already exists
- [ ] Missing bank info
- [ ] Order not found

### Network
- [ ] API down
- [ ] Slow connection
- [ ] Loading states
- [ ] Error messages
- [ ] Retry functionality

---

## 1️⃣3️⃣ UI/UX Tests

### Responsive Design
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Navigation adapts
- [ ] Tables scroll
- [ ] Modals responsive

### Dark Mode
- [ ] Toggle ishlaydi
- [ ] Colors o'zgaradi
- [ ] Contrast yaxshi
- [ ] All pages support

### Accessibility
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Alt text on images
- [ ] Color contrast

### Performance
- [ ] Fast page load
- [ ] Smooth animations
- [ ] No lag on interactions
- [ ] Images optimized
- [ ] Charts render quickly

---

## 1️⃣4️⃣ Browser Compatibility

### Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Features
- [ ] LocalStorage
- [ ] Fetch API
- [ ] CSS Grid/Flexbox
- [ ] ES6 features

---

## ✅ Final Checklist

### Code Quality
- [ ] No console errors
- [ ] No warnings
- [ ] Clean code
- [ ] Comments where needed
- [ ] Proper error handling

### Documentation
- [ ] README.md updated
- [ ] API endpoints documented
- [ ] User guides created
- [ ] Setup instructions clear

### Deployment Ready
- [ ] Environment variables set
- [ ] Database migrations
- [ ] Seeds ready
- [ ] Production build works

---

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________

Total Tests: ___
Passed: ___
Failed: ___
Skipped: ___

Pass Rate: ___%

Critical Issues: ___
Minor Issues: ___
Enhancements: ___

Notes:
_______________________
_______________________
```

---

## 🐛 Bug Report Template

```
Title: _______________________
Severity: [Critical/High/Medium/Low]
Priority: [P0/P1/P2/P3]

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:
_______________________

Actual Result:
_______________________

Screenshots:
[Attach if needed]

Environment:
- Browser: _______
- OS: _______
- Date: _______
```

---

**Happy Testing! 🧪**

Barcha testlar o'tkazilgandan keyin production ga ready bo'ladi.
