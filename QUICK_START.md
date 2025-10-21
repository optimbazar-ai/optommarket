# 🚀 OPTOMMARKET - QUICK START GUIDE

**Get your e-commerce platform running in 10 minutes!**

---

## ⚡ PREREQUISITES

Before starting, make sure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **Git** installed ([Download](https://git-scm.com/))
- ✅ **PostgreSQL Database** (Neon DB recommended)
- ✅ **Google Gemini API Key** (optional, for chatbot)
- ✅ Terminal/PowerShell access

**Check versions:**
```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
git --version     # Should be 2.0.0 or higher
```

---

## 📥 STEP 1: CLONE REPOSITORY

```bash
# Clone from GitHub
git clone https://github.com/optimbazar-ai/optommarket.git

# Navigate to project
cd optommarket

# Verify files
ls
# You should see: backend/, frontend/, README.md, etc.
```

**Alternative: Download ZIP**
```
https://github.com/optimbazar-ai/optommarket/archive/refs/heads/main.zip
```

---

## 🗄️ STEP 2: DATABASE SETUP

### **Option A: Neon DB (Recommended)**

1. Go to [Neon.tech](https://neon.tech/)
2. Sign up (free account)
3. Create new project: "optommarket"
4. Copy connection string:
   ```
   postgresql://username:password@host/dbname?sslmode=require
   ```

### **Option B: Local PostgreSQL**

```bash
# Install PostgreSQL locally
# Create database
createdb optommarket_db

# Connection string:
postgresql://localhost/optommarket_db
```

---

## 🔧 STEP 3: BACKEND SETUP

```bash
# Navigate to backend
cd backend

# Install dependencies (takes 2-3 minutes)
npm install

# Create .env file
cp .env.example .env
```

### **Edit .env file:**

**Windows (Notepad):**
```bash
notepad .env
```

**Mac/Linux (nano):**
```bash
nano .env
```

**Add your values:**
```env
DATABASE_URL=postgresql://your_neon_connection_string
JWT_SECRET=your_random_secret_key_min_32_chars
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_optional
```

**Generate JWT_SECRET:**
```bash
# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Mac/Linux
openssl rand -base64 32
```

### **Initialize Database:**

```bash
# Create tables and insert sample data
node scripts/init-db.js
```

**Expected output:**
```
🔧 Initializing OPTOMMARKET Database
✅ Database initialized successfully!
📊 Sample data:
   - 16 products inserted
   - 4 tables created
```

### **Create Admin User:**

```bash
node scripts/create-admin.js
```

**Expected output:**
```
✅ Admin user created!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LOGIN CREDENTIALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Email:    admin@optommarket.uz
   Password: admin123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### **Start Backend Server:**

```bash
npm run dev
```

**Expected output:**
```
==================================================
🚀 OPTOMMARKET Backend Server
==================================================
🌐 URL: http://localhost:5000
📊 Environment: development
🔗 Database: Configured ✅
🤖 Chatbot: POST http://localhost:5000/api/chatbot/chat
==================================================

✅ Database connected successfully!
```

**Keep this terminal running!** ✅

---

## 🎨 STEP 4: FRONTEND SETUP

**Open NEW terminal window** (keep backend running!)

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies (takes 3-4 minutes)
npm install

# Create .env.local file
cp .env.example .env.local
```

### **Edit .env.local file:**

**Windows (Notepad):**
```bash
notepad .env.local
```

**Mac/Linux (nano):**
```bash
nano .env.local
```

**Add:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### **Start Frontend Server:**

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Environments: .env.local

✓ Ready in 5s
```

**Keep this terminal running too!** ✅

---

## 🎉 STEP 5: ACCESS THE APPLICATION

### **Open Browser:**

**1. Home Page**
```
http://localhost:3000
```
- Should show hero section
- 8 featured products
- Navbar with links
- Footer

**2. Products Page**
```
http://localhost:3000/products
```
- 16 products in grid
- Search bar
- Category filter

**3. Login Page**
```
http://localhost:3000/login
```

**4. Admin Login**
```
Email:    admin@optommarket.uz
Password: admin123
```

**5. Admin Panel**
```
http://localhost:3000/admin
```
After login, you should see:
- Sidebar (left)
- Dashboard with stats
- Charts and tables

---

## ✅ VERIFICATION CHECKLIST

**Backend (Terminal 1):**
- [ ] npm install completed
- [ ] .env file created and filled
- [ ] Database initialized (16 products)
- [ ] Admin user created
- [ ] Server running on http://localhost:5000
- [ ] "Database connected successfully!" message

**Frontend (Terminal 2):**
- [ ] npm install completed
- [ ] .env.local file created
- [ ] Server running on http://localhost:3000
- [ ] "Ready in X seconds" message

**Browser:**
- [ ] http://localhost:3000 opens
- [ ] Products visible on home page
- [ ] Navbar rendered
- [ ] Footer rendered
- [ ] Login page accessible
- [ ] Can login with admin credentials
- [ ] Admin panel accessible after login

---

## 🔧 TROUBLESHOOTING

### ❌ "Database connection error"

**Fix:**
```bash
# Check DATABASE_URL in backend/.env
# Make sure it's the correct Neon connection string
# Test connection:
cd backend
node -e "const {Pool} = require('pg'); const pool = new Pool({connectionString: process.env.DATABASE_URL}); pool.query('SELECT NOW()', (err, res) => { console.log(err ? err : res.rows); pool.end(); });"
```

### ❌ "Port 5000 already in use"

**Fix:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### ❌ "Port 3000 already in use"

**Fix:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### ❌ "Cannot find module 'xyz'"

**Fix:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### ❌ "Admin login doesn't work"

**Fix:**
```bash
# Re-create admin user
cd backend
node scripts/create-admin.js

# If says "already exists", login with:
# Email: admin@optommarket.uz
# Password: admin123
```

### ❌ "Products not showing"

**Fix:**
```bash
# Re-initialize database
cd backend
node scripts/init-db.js
```

### ❌ "Cannot connect to backend"

**Check:**
1. Backend server running? (Terminal 1)
2. URL correct in `.env.local`?
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. No typos? No trailing slash?
4. Backend on port 5000? Check backend terminal.

---

## 📊 WHAT YOU SHOULD SEE

### **Backend Terminal (Terminal 1):**
```
🚀 OPTOMMARKET Backend Server
🌐 URL: http://localhost:5000
✅ Database connected successfully!

[Server is running and waiting for requests]
```

### **Frontend Terminal (Terminal 2):**
```
▲ Next.js 14.0.4
- Local: http://localhost:3000
✓ Ready in 5s

[Compiling pages as you navigate]
```

### **Browser (http://localhost:3000):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Navbar: 🛒 OPTOMMARKET | Links | Cart
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hero Section:
  🛒 OPTOMMARKET
  O'zbekiston uchun zamonaviy optom savdo
  [Mahsulotlarni ko'rish 🚀]

Features: ⚡ 💯 🤖

Products Grid: [8 product cards]

Footer: Company info, Links, Contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 NEXT STEPS

### **After Setup:**

1. **Explore Features**
   - Browse products
   - Add to cart
   - Create account
   - Place order
   - Login as admin
   - Manage products

2. **Customize**
   - Change colors in `tailwind.config.ts`
   - Add your logo
   - Update company info in Footer
   - Add more products in database

3. **Deploy to Production**
   - See `DEPLOYMENT_GUIDE.md`
   - Backend → Render
   - Frontend → Vercel
   - Database → Neon (already there!)

---

## 📚 ADDITIONAL RESOURCES

- **Full Documentation:** See all `.md` files in root
- **API Reference:** `backend/API_DOCUMENTATION.md`
- **Testing Guide:** `TESTING_CHECKLIST.md` (100+ test cases)
- **Admin Guide:** `ADMIN_SETUP.md`
- **Deployment:** `DEPLOYMENT_GUIDE.md`
- **Troubleshooting:** `ADMIN_LOGIN_FIX.md`

---

## ⏱️ ESTIMATED TIME

| Step | Time |
|------|------|
| Clone repository | 1 min |
| Database setup | 2 min |
| Backend npm install | 3 min |
| Backend configuration | 2 min |
| Frontend npm install | 4 min |
| Frontend configuration | 1 min |
| **Total** | **~10-15 minutes** |

---

## 🎊 SUCCESS!

If you can:
- ✅ Open http://localhost:3000
- ✅ See products on home page
- ✅ Login with admin credentials
- ✅ Access admin panel at http://localhost:3000/admin

**CONGRATULATIONS! 🎉**  
Your OPTOMMARKET platform is running successfully!

---

## 💡 TIPS

1. **Always run both servers** (backend + frontend)
2. **Keep terminals open** while developing
3. **Check backend logs** if frontend has issues
4. **Use F12 (DevTools)** to see browser console errors
5. **Read error messages** carefully - they usually tell you what's wrong

---

## 🆘 NEED HELP?

**Check documentation:**
- Common issues: `ADMIN_LOGIN_FIX.md`
- Database problems: `DATABASE_SETUP.md`
- Deployment: `DEPLOYMENT_GUIDE.md`

**Debug steps:**
1. Check both terminals for errors
2. Verify .env files are correct
3. Make sure database is initialized
4. Confirm both servers are running
5. Check browser console (F12)

---

**Happy Coding! 🚀**

*OPTOMMARKET - O'zbekiston uchun zamonaviy optom savdo platformasi*
