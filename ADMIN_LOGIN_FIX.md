# 🔧 ADMIN PANEL LOGIN - FINAL FIX GUIDE

## 🎯 MUAMMO: Admin panel-ga kirish ishlamayapti

---

## ✅ YECHIM: 3 QADAM

### **QADAM 1: BACKEND RESTART (LOGS BILAN)**

```powershell
# Backend terminal
cd e:\loyihalarim\optommarket\backend

# Stop (Ctrl+C)
# Restart
npm run dev
```

**Ko'rish kerak:**
```
🚀 OPTOMMARKET Backend Server
🌐 URL: http://localhost:5000
```

---

### **QADAM 2: FRONTEND RESTART**

```powershell
# Frontend terminal
cd e:\loyihalarim\optommarket\frontend

# Stop (Ctrl+C)
# Restart
npm run dev
```

**Ko'rish kerak:**
```
▲ Next.js 14.0.4
- Local: http://localhost:3000
✓ Ready
```

---

### **QADAM 3: LOGIN TEST**

1. **Browser:** http://localhost:3000/login
2. **Credentials:**
   - Email: `admin@optommarket.uz`
   - Password: `admin123`
3. **Click:** "Kirish" tugmasi
4. **Check backend terminal:**
   ```
   Verifying token...
   Token decoded: { id: 1, email: 'admin@optommarket.uz', role: 'admin' }
   Profile request - req.user: { id: 1, email: '...', role: 'admin' }
   ```
5. **Result:** Avtomatik redirect → `/admin`

---

## 🔍 DIAGNOSTIKA

### **Agar hali ham ishlamasa:**

#### **A. Backend Logs Tekshirish**

**Login paytida backend terminal-da:**
```
✅ POST /api/users/login → 200 OK
✅ Verifying token...
✅ Token decoded: {...}
```

**Agar ko'rinmasa:**
- Backend restart qilinmagan
- Database connection muammosi
- JWT_SECRET set qilinmagan

#### **B. Browser Console (F12)**

**Login qilganingizda:**
```javascript
// Console-ga yozing:
localStorage.getItem('token')
// Token string ko'rinishi kerak

// Parse token:
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
// Output: { id: 1, email: '...', role: 'admin', iat: ..., exp: ... }
```

**Agar token yo'q:**
- Login API failed
- Check backend running

**Agar role yo'q:**
- Backend login response noto'g'ri
- Check database user role

#### **C. Database Check**

```powershell
# Backend terminal
cd backend
node
```

```javascript
const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.query('SELECT id, email, role FROM users WHERE email = $1', ['admin@optommarket.uz'])
  .then(r => console.log(r.rows))
  .then(() => process.exit());
```

**Expected:**
```javascript
[{
  id: 1,
  email: 'admin@optommarket.uz',
  role: 'admin'  // ← BU BO'LISHI KERAK!
}]
```

**Agar role != 'admin':**
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@optommarket.uz';
```

---

## 🛠️ AGAR HALI HAM ISHLAMASA - ALTERNATIVE FIX

### **Option 1: Manual Admin Panel Access**

Login qilganingizdan keyin **manual** ravishda:
```
http://localhost:3000/admin
```

Agar bu ishlasa:
- Admin panel to'g'ri
- Redirect logic muammosi
- `login/page.tsx`-ni tekshiring

### **Option 2: Simplify Redirect Logic**

**File:** `frontend/app/login/page.tsx`

```typescript
try {
  const result = await login(email, password);
  toast.success('Muvaffaqiyatli kirildi! 🎉');
  
  // Wait a bit for state to update
  setTimeout(() => {
    window.location.href = '/admin'; // Force navigation
  }, 500);
} catch (error: any) {
  toast.error(error.response?.data?.error || 'Login xatolik!');
}
```

### **Option 3: Direct localStorage Check**

**File:** `frontend/hooks/useAuth.ts`

```typescript
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Parse token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        username: payload.username || 'User',
        role: payload.role
      });
    } catch (e) {
      localStorage.removeItem('token');
    }
  }
}, []);
```

---

## 📊 WHAT WAS FIXED

### **Backend Changes:**

1. **`backend/middleware/auth.js`**
   - Added logging to JWT verification
   - Track token decode process

2. **`backend/routes/users.js`**
   - Added logging to `/profile` endpoint
   - Better error handling

### **Frontend (Already Done):**

1. **`frontend/hooks/useAuth.ts`**
   - Try/catch around fetchProfile
   - Don't block login if profile fails

2. **`frontend/app/login/page.tsx`**
   - Check `result.user.role`
   - Redirect admin to `/admin`

---

## ✅ SUCCESS INDICATORS

**Backend Terminal:**
```
Verifying token...
Token decoded: { id: 1, email: 'admin@optommarket.uz', role: 'admin', iat: ..., exp: ... }
Profile request - req.user: { id: 1, email: 'admin@optommarket.uz', role: 'admin' }
```

**Frontend:**
- Login successful toast
- Redirect to `/admin`
- Admin dashboard visible
- Sidebar with menu items

**Browser:**
- URL changes to `http://localhost:3000/admin`
- No errors in console
- Token in localStorage

---

## 🚨 COMMON ISSUES

### ❌ "Invalid or expired token"
**Fix:** JWT_SECRET in `.env` must match between login creation and verification
```bash
# backend/.env
JWT_SECRET=your_super_secret_key_here
```

### ❌ "User not found"
**Fix:** Admin user doesn't exist or ID mismatch
```bash
node backend/scripts/create-admin.js
```

### ❌ Profile endpoint 500 error
**Fix:** Already handled - frontend continues with login data

### ❌ Redirect doesn't work
**Fix:** Use `window.location.href = '/admin'` instead of `router.push()`

---

## 🎯 FINAL TEST CHECKLIST

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Admin user exists in database (role='admin')
- [ ] JWT_SECRET set in backend/.env
- [ ] NEXT_PUBLIC_API_URL set in frontend/.env.local
- [ ] Login page loads
- [ ] Can enter credentials
- [ ] "Kirish" button works
- [ ] Backend logs show token verification
- [ ] Redirect to /admin happens
- [ ] Admin dashboard shows

---

## 📞 IF ALL ELSE FAILS

**Quick workaround:**

1. Login as normal user
2. Open browser console (F12)
3. Type:
```javascript
localStorage.setItem('token', 'YOUR_ADMIN_TOKEN');
window.location.href = '/admin';
```

4. Or manually type in browser:
```
http://localhost:3000/admin
```

If you can access admin panel manually but not via login redirect, the problem is purely redirect logic, not authentication.

---

**RESTART BOTH SERVERS AND TRY AGAIN!** 🚀
