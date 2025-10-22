# 🚀 ADMIN PANEL - QUICK START GUIDE

## 🔐 Login Credentials

```
Email: admin@optommarket.uz
Password: admin123
```

⚠️ **Change password in production!**

---

## 🌐 Access URLs

**Login Page:** `http://localhost:3001/login`  
**Admin Dashboard:** `http://localhost:3001/admin`

---

## 📊 Admin Panel Pages

### 1. Dashboard (`/admin`)
- **Jami buyurtmalar** - Orders count
- **Daromad** - Total revenue
- **Foydalanuvchilar** - Users count
- **Mahsulotlar** - Products count
- **Ombor** - Total stock
- **Recent orders** - Last 5 orders
- **Low stock** - Products < 10 units

### 2. Mahsulotlar (`/admin/products`)
**Actions:**
- ➕ **Add:** Click "Yangi mahsulot"
- ✏️ **Edit:** Click edit icon
- 🗑️ **Delete:** Click delete icon

**Form Fields:**
- Name (required)
- Description
- Price (required)
- Wholesale Price
- Stock (required)
- Min Order Quantity
- Category (required)
- Brand
- Unit (piece/kg/box/pack)
- Images (URLs)
- Featured checkbox

### 3. Buyurtmalar (`/admin/orders`)
**Actions:**
- 📊 **View:** All orders with details
- 🔄 **Update Status:** Use dropdown

**Status Flow:**
```
Kutilmoqda → Tasdiqlandi → Tayyorlanmoqda → Yo'lda → Yetkazildi
```

**Order Info:**
- Order number
- Customer (name, email, phone)
- Amount & payment method
- Items count
- Date

### 4. Foydalanuvchilar (`/admin/users`)
**Actions:**
- 🛡️ **Make Admin:** Click shield icon (blue)
- 🛡️ **Remove Admin:** Click shield icon (orange)
- 🗑️ **Delete User:** Click delete icon

**User Roles:**
- 🔴 **Admin** - Full access
- 🔵 **Sotuvchi** - Seller
- 🟢 **Xaridor** - Buyer

### 5. Statistika (`/admin/analytics`)
**Charts:**
- 📈 **Sales Trend:** 30-day revenue & orders
- 📊 **Top Products:** Best sellers (top 10)
- 🥧 **Categories:** Distribution pie chart

**Metrics:**
- Total revenue (last 30 days)
- Total orders (last 30 days)
- Average order value

---

## ⌨️ Keyboard Shortcuts

- `Esc` - Close modals
- `Ctrl + S` - Save forms (in modals)
- `Ctrl + R` - Refresh page

---

## 🎨 Status Colors

**Orders:**
- 🟡 **Kutilmoqda** (Pending) - Yellow
- 🔵 **Tasdiqlandi** (Confirmed) - Blue
- 🟣 **Tayyorlanmoqda** (Processing) - Purple
- 🟦 **Yo'lda** (Shipped) - Indigo
- 🟢 **Yetkazildi** (Delivered) - Green
- 🔴 **Bekor qilindi** (Cancelled) - Red

**Stock:**
- 🟢 **Normal** (>= 10) - Green
- 🔴 **Low** (< 10) - Red

---

## 🛠️ Common Tasks

### Create New Product
1. Go to Products page
2. Click "Yangi mahsulot"
3. Fill form:
   - Name: "Samsung Galaxy S24"
   - Price: 12000000
   - Wholesale Price: 11000000
   - Stock: 50
   - Min Order: 5
   - Category: Elektronika
4. Click "Yaratish"

### Update Order Status
1. Go to Orders page
2. Find order
3. Click status dropdown
4. Select new status
5. Status updates automatically

### Make User Admin
1. Go to Users page
2. Find user
3. Click blue shield icon 🛡️
4. Confirm
5. User becomes admin

---

## 🐛 Troubleshooting

### Can't login?
- Check email: `admin@optommarket.uz`
- Check password: `admin123`
- Clear browser cache
- Check backend is running (port 5000)

### Page not loading?
- Check frontend is running (port 3001)
- Check backend is running (port 5000)
- Check MongoDB is connected
- Open DevTools (F12) → Console for errors

### Charts not showing?
- Check if there's data in database
- Wait for data to load
- Check console for errors
- Refresh page

### Can't delete user?
- Can't delete yourself
- Try with different admin account

---

## 📱 Mobile View

- Hamburger menu (☰) in top-left
- Click to open sidebar
- Click outside to close
- All features accessible

---

## 🔒 Security Tips

1. **Change admin password** immediately
2. Don't share credentials
3. Logout when done
4. Use strong passwords
5. Regular backups
6. Monitor user activities

---

## 📞 Need Help?

- Check `QADAM_7_ADMIN_PANEL.md` for detailed docs
- Check console (F12) for errors
- Check backend logs
- Contact support

---

**Made with ❤️ for OptoMarket.uz**
