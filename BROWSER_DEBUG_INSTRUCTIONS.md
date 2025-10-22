# 🐛 Browser Debug Instructions

## Ekran Oq Bo'lsa (White Screen)

### 1. Browser-ni yangilang
- Press `Ctrl + Shift + R` (hard refresh)
- Yoki `F5` (normal refresh)

### 2. Developer Tools-ni oching
- Press `F12`
- Yoki `Right click → Inspect`

### 3. Console tab-ga o'ting
- Qizil xatoliklarni qidiring
- Xato matnini ko'ring

### 4. Common Errors:

#### Error: "useCart must be used within CartProvider"
**Yechim:** CartProvider main.jsx-da to'g'ri o'rnatilgan
```javascript
// main.jsx da
<CartProvider>
  <App />
</CartProvider>
```

#### Error: "Cannot read property of undefined"
**Yechim:** Biror component prop kutmoqda

#### Error: "Failed to fetch" yoki "Network Error"
**Yechim:** Backend ishlamayapti
- Check: `http://localhost:5000/api/health`
- Backend terminalda: `npm run dev`

### 5. Network Tab-ni tekshiring
- F12 → Network tab
- Sahifani refresh qiling
- Qizil (failed) request-larni qidiring

### 6. Sources Tab
- F12 → Sources
- `main.jsx` ni toping
- Breakpoint qo'ying

### 7. Quick Fix Commands

**Backend restart:**
```bash
cd backend
npm run dev
```

**Frontend restart:**
```bash
cd frontend
npm run dev
```

**Clear browser cache:**
- Ctrl + Shift + Delete
- Clear "Cached images and files"

**Clear localStorage:**
```javascript
// Browser console-da
localStorage.clear()
location.reload()
```

### 8. Test URLs

**Simple test:**
- http://localhost:3001

**Backend test:**
- http://localhost:5000/api/health

**Admin test:**
- http://localhost:3001/login
- Email: admin@optommarket.uz
- Password: admin123

### 9. Common Issues

#### Issue: Oq ekran, console-da xato yo'q
**Reason:** CSS yuklanmagan
**Fix:** Hard refresh (Ctrl + Shift + R)

#### Issue: "Module not found"
**Reason:** npm install to'liq bajarmagan
**Fix:** 
```bash
cd frontend
rm -rf node_modules
npm install
```

#### Issue: Port busy
**Reason:** Eski process hali ishlamoqda
**Fix:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [PID] /F
```

### 10. Current Status Check

```bash
# Backend check
curl http://localhost:5000/api/health
# Expected: {"status":"OK","database":"Connected"}

# Frontend check
curl http://localhost:3001
# Expected: HTML code

# MongoDB check (in backend terminal log)
# Should see: "✓ MongoDB connected successfully"
```

### 11. If Still White Screen

1. **Check vite terminal output:**
   - Look for errors in frontend terminal
   - Look for "✓ ready in XXms"

2. **Try incognito mode:**
   - Ctrl + Shift + N (Chrome)
   - No cache, no extensions

3. **Check browser compatibility:**
   - Use Chrome or Firefox
   - Update to latest version

4. **Rebuild:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

### 12. Working App Should Show:

**Home Page (/):**
- Navbar with logo
- Hero section
- Categories (4-6 cards)
- Featured products
- Footer

**Login Page (/login):**
- Email input
- Password input
- "Kirish" button

**Admin Panel (/admin):**
- Only accessible after admin login
- Blue sidebar
- Dashboard with stats

---

## ✅ Success Indicators

- ✅ No console errors
- ✅ Navbar visible
- ✅ Home page content shows
- ✅ Network tab shows 200 OK for API calls
- ✅ Cart icon shows in navbar

## 🆘 Emergency Fallback

If nothing works, restore from backup:
```bash
cd frontend/src
cp App-backup.jsx App.jsx
```

Then restart Vite:
```bash
npm run dev
```

---

**Made with ❤️ for debugging OptoMarket.uz**
