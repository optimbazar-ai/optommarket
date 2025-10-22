# 🚀 Seller (Sotuvchi) Tezkor Boshlash Qo'llanmasi

## 📋 Mundarija
1. [Ro'yxatdan o'tish](#1-royxatdan-otish)
2. [Profil sozlash](#2-profil-sozlash)
3. [Admin tasdig'ini kutish](#3-admin-tasdigini-kutish)
4. [Mahsulot qo'shish](#4-mahsulot-qoshish)
5. [Buyurtmalarni boshqarish](#5-buyurtmalarni-boshqarish)
6. [Pul chiqarish](#6-pul-chiqarish)

---

## 1. Ro'yxatdan o'tish

### Test Seller Akkaunt
Tez test qilish uchun tayyor akkaunt:
```
Email: seller@optommarket.uz
Password: seller123
```

### Yangi Seller Yaratish

#### A) Backend orqali (Dev uchun)
```bash
cd backend
npm run create-seller
```

#### B) Frontend orqali
1. `http://localhost:3000/register` ga o'ting
2. Formani to'ldiring:
   - **To'liq ism**: Ismingiz
   - **Email**: sizning@email.com
   - **Parol**: Kamida 6 ta belgi
   - **Telefon**: +998901234567
   - **Rol**: **Sotuvchi** tanlang ✅
   - **Kompaniya nomi**: Kompaniyangiz
3. "Ro'yxatdan o'tish" tugmasini bosing

---

## 2. Profil Sozlash

### Kirish
1. `http://localhost:3000/login` ga o'ting
2. Email va parolingizni kiriting
3. Kirish tugmasini bosing
4. Avtomatik `/seller` sahifasiga yo'naltirilasiz

### Profil To'ldirish
1. **Sozlamalar** (`/seller/settings`) ga o'ting
2. Quyidagi ma'lumotlarni to'ldiring:

#### 📝 Profil Ma'lumotlari
- To'liq ism
- Email
- Telefon
- Kompaniya nomi
- Manzil (ko'cha, shahar, viloyat)

#### 🏢 Biznes Ma'lumotlari
- **STIR/INN**: Soliq identifikatori
- **Bio**: Kompaniya haqida qisqacha

#### 💳 To'lov Ma'lumotlari (Muhim!)
- **Bank nomi**: Masalan: Xalq Banki
- **Hisob raqami**: UZ00 0000 0000 0000 0000 0000 0000

> ⚠️ **Diqqat**: Pul chiqarish uchun bank ma'lumotlari kerak!

---

## 3. Admin Tasdiq'ini Kutish

### Holat Tekshirish
1. Sozlamalar sahifasida **"Biznes ma'lumotlari"** bo'limiga o'ting
2. **Holat** ko'rsatkichni ko'ring:
   - ⏳ **Kutilmoqda** - Admin tekshirmoqda
   - ✅ **Tasdiqlangan** - Barcha funksiyalar ochiq
   - ❌ **Rad etilgan** - Sababi ko'rsatiladi

### Admin Tasdiqlashi (Dev uchun)
1. Admin panel: `http://localhost:3000/admin/users`
2. Seller ro'yxatini toping
3. ✅ yashil tugmani bosing (Tasdiqlash)
4. Yoki ❌ qizil tugmani bosing (Rad etish + sabab)

---

## 4. Mahsulot Qo'shish

### Birinchi Mahsulot
1. **Mahsulotlar** (`/seller/products`) sahifasiga o'ting
2. **"Mahsulot qo'shish"** tugmasini bosing
3. Formani to'ldiring:

#### Asosiy Ma'lumotlar
- **Nomi**: Samsung Galaxy A54
- **Tavsif**: Batafsil tavsif...
- **Narxi**: 3500000 so'm
- **Ulgurji narx**: 3200000 so'm (ixtiyoriy)
- **Kategoriya**: Tanlang
- **Brend**: Samsung (ixtiyoriy)

#### Rasm
- **Rasm URL**: https://example.com/image.jpg
- Bir nechta rasm uchun vergul bilan ajrating

#### Ombor
- **Ombor soni**: 100
- **Min. buyurtma**: 1
- **O'lchov birligi**: dona/kg/quti...

4. **"Qo'shish"** tugmasini bosing

### ⏳ Tasdiq Kutish
- Mahsulot **"Kutilmoqda"** holati bilan saqlanadi
- Admin tasdiqlashi kerak
- Tasdiqlangandan keyin mijozlar ko'ra oladi

### Mahsulotni Tahrirlash
1. Mahsulot kartochkasida **"Tahrirlash"** tugmasini bosing
2. Ma'lumotlarni yangilang
3. **"Saqlash"** tugmasini bosing

### Mahsulotni O'chirish
1. Mahsulot kartochkasida **Trash** tugmasini bosing
2. Tasdiqlang

---

## 5. Buyurtmalarni Boshqarish

### Buyurtmalar Ro'yxati
**Buyurtmalar** (`/seller/orders`) sahifasiga o'ting

Siz faqat **o'z mahsulotlaringiz bo'lgan buyurtmalarni** ko'rasiz.

### Holatlar
- 🟡 **Kutilmoqda** - Yangi buyurtma
- 🔵 **Tasdiqlandi** - Tasdiqlangan
- 🟣 **Tayyorlanmoqda** - Ishlab chiqarilmoqda
- 🔷 **Yo'lda** - Yetkazib berilmoqda
- 🟢 **Yetkazildi** - Muvaffaqiyatli
- 🔴 **Bekor qilindi** - Bekor qilingan

### Holatni O'zgartirish
1. Buyurtmani toping
2. Yangi holatni tanlang
3. Tasdiqlang

> 💡 **Maslahat**: Buyurtma holatini doimiy yangilab turing!

---

## 6. Pul Chiqarish

### Balansni Tekshirish
1. **To'lovlar** (`/seller/payments`) sahifasiga o'ting
2. **"Joriy balans"** kartochkasini ko'ring

### Pul Chiqarish So'rovi
1. **"Pul chiqarish"** tugmasini bosing
2. Modal oynada:
   - **Summa**: Kamida 100,000 so'm
   - **Izoh**: Qo'shimcha ma'lumot (ixtiyoriy)
3. **"Yuborish"** tugmasini bosing

### So'rov Holatlari
- ⏳ **Kutilmoqda** - Admin ko'rib chiqmoqda
- ✅ **Tasdiqlangan** - Balansdan yechildi
- ✅ **Bajarildi** - Pul o'tkazildi
- ❌ **Rad etilgan** - Sababi ko'rsatiladi

> ⚠️ **Muhim**: 
> - Minimal summa: 100,000 so'm
> - Bank ma'lumotlari kerak
> - Tasdiqlangandan keyin balansdan avtomatik yechiladi

---

## 📊 Dashboard Tushuntirish

### Statistika Kartalari
1. **Jami buyurtmalar** - Barcha vaqt
2. **Kutilayotgan** - Pending buyurtmalar
3. **Jami daromad** - Umumiy
4. **Shu oy daromad** - Oylik

### So'nggi Buyurtmalar
Oxirgi 5 ta buyurtma ko'rsatiladi

### Tez Amallar
- 📦 Buyurtmalar
- 📦 Mahsulotlar  
- 📊 Statistika

---

## 📈 Statistika Sahifasi

**Statistika** (`/seller/analytics`) sahifasida:

### Ko'rsatkichlar
- ✅ Savdo dinamikasi grafigi
- ✅ Kategoriyalar taqsimoti
- ✅ Top 5 mahsulotlar
- ✅ Daromad breakdown

### Filtrlar
- Oxirgi hafta
- Oxirgi oy
- Oxirgi yil

---

## 🎯 Eng Yaxshi Amaliyotlar

### Mahsulotlar
1. ✅ Aniq va batafsil tavsif yozing
2. ✅ Sifatli rasm qo'shing
3. ✅ To'g'ri kategoriya tanlang
4. ✅ Raqobatbardosh narx qo'ying
5. ✅ Ombor sonini doimiy yangilab turing

### Buyurtmalar
1. ✅ Tez javob bering
2. ✅ Holatni yangilab turing
3. ✅ O'z vaqtida yetkazib bering
4. ✅ Mijozlar bilan muloqot qiling

### Profil
1. ✅ To'liq ma'lumot kiriting
2. ✅ Bank rekvizitlarni to'g'ri kiriting
3. ✅ Bio yozing (SEO uchun)
4. ✅ Telefon raqamini aktiv tuting

---

## ❓ Ko'p So'raladigan Savollar

### Q: Mahsulotim nima uchun ko'rinmayapti?
**A:** Admin tomonidan tasdiqlanishi kerak. Holati "Kutilmoqda" bo'lsa, kutib turing.

### Q: Balansim qachon to'ldiriladi?
**A:** Buyurtma "Yetkazildi" holatiga o'tgandan keyin avtomatik hisoblanadi (komissiya ayirilib).

### Q: Pul chiqarishim nima uchun rad etildi?
**A:** To'lovlar sahifasida rad etish sababini ko'ring. Odatda:
- Bank ma'lumotlari noto'g'ri
- Minimal summa yetmaydi
- Boshqa texnik sabab

### Q: Komissiya qancha?
**A:** Default 10%. Admin o'zgartirishi mumkin. Sozlamalar > To'lov ma'lumotlarida ko'ring.

### Q: Mahsulotimni kim ko'radi?
**A:** Faqat "Tasdiqlangan" mahsulotlar bosh sahifada ko'rinadi.

---

## 🛠️ Texnik Yordam

### Muammo bo'lsa
1. Browser cache tozalang
2. Sahifani yangilang (F5)
3. Logout/Login qiling
4. Admin bilan bog'laning

### Debug
- Browser Console'ni oching (F12)
- Network tab'da requestlarni ko'ring
- Xatoliklarni screenshot qiling

---

## 📞 Aloqa

**Admin Panel**: `http://localhost:3000/admin`
**Seller Panel**: `http://localhost:3000/seller`
**API Docs**: Backend console'da ko'ring

---

## ✅ Checklist (Birinchi Marta)

- [ ] Ro'yxatdan o'tdim
- [ ] Profilni to'ldirdim
- [ ] Bank ma'lumotlarini kiritdim
- [ ] Admin tasdiq'ini kutdim
- [ ] Birinchi mahsulot qo'shdim
- [ ] Mahsulot tasdiqlandi
- [ ] Birinchi buyurtma keld
- [ ] Buyurtma holatini yangiladim
- [ ] Balansni tekshirdim
- [ ] Pul chiqardim

---

**Muvaffaqiyatli savdo! 🎉**

Savollar bo'lsa, adminlar bilan bog'laning.
