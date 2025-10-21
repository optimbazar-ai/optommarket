# 🗄️ DATABASE SETUP GUIDE

## OPTOMMARKET - PostgreSQL (Neon DB)

---

## 📋 MUAMMO: "relation products does not exist"

**Sabab:** Database-da tables yaratilmagan.

**Yechim:** SQL script-ni Neon DB-da run qilish.

---

## 🚀 OPTION 1: NEON WEB CONSOLE (RECOMMENDED)

### Step 1: Neon Console-ga Kiring
1. Go to: https://console.neon.tech
2. Login with your account
3. Select project: `optommarket_db`

### Step 2: SQL Editor-ni Oching
1. Left sidebar → **SQL Editor**
2. Or click **"New Query"**

### Step 3: SQL Script-ni Copy Qiling
1. Open file: `backend/init-database.sql`
2. Copy all content (Ctrl+A, Ctrl+C)
3. Paste into Neon SQL Editor

### Step 4: Run Script
1. Click **"Run"** button (or Ctrl+Enter)
2. Wait for completion (~5-10 seconds)
3. Check results:
   ```
   ✅ Database initialized successfully!
   ✅ 0 users
   ✅ 16 products
   ✅ 0 orders
   ```

### Step 5: Verify
```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Expected: users, products, orders, order_items
```

---

## 🛠️ OPTION 2: PSQL COMMAND LINE

### Requirements:
- `psql` installed
- Database URL from Neon

### Steps:
```bash
# 1. Get DATABASE_URL from backend/.env
echo $DATABASE_URL

# 2. Run script
psql "YOUR_DATABASE_URL" -f backend/init-database.sql

# 3. Verify
psql "YOUR_DATABASE_URL" -c "SELECT COUNT(*) FROM products;"
```

---

## 🧪 OPTION 3: NODE.JS SCRIPT

Create: `backend/scripts/init-db.js`

```javascript
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  try {
    console.log('📊 Initializing database...');
    
    const sql = fs.readFileSync(
      path.join(__dirname, '..', 'init-database.sql'),
      'utf8'
    );
    
    await pool.query(sql);
    
    console.log('✅ Database initialized successfully!');
    
    const result = await pool.query('SELECT COUNT(*) FROM products');
    console.log(`📦 Products count: ${result.rows[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initDatabase();
```

**Run:**
```bash
cd backend
node scripts/init-db.js
```

---

## ✅ VERIFICATION

### Test Backend API:
```bash
# 1. Health check
curl http://localhost:5000/api/health

# 2. Get products
curl http://localhost:5000/api/products

# Expected: Array of 16 products
```

### Test Frontend:
1. Open: http://localhost:3000
2. Home page should show products
3. No "Route not found" error

---

## 📊 DATABASE SCHEMA

### Tables Created:

**1. users**
- id (PK)
- username (unique)
- email (unique)
- password_hash
- phone
- role (customer/admin)
- created_at
- updated_at

**2. products**
- id (PK)
- name
- description
- price
- quantity
- category
- image_url
- sku (unique)
- created_at
- updated_at

**3. orders**
- id (PK)
- user_id (FK → users)
- total_amount
- status (pending/confirmed/shipped/delivered/cancelled)
- created_at
- updated_at

**4. order_items**
- id (PK)
- order_id (FK → orders)
- product_id (FK → products)
- quantity
- price
- created_at

### Indexes:
- products: category
- orders: user_id, status
- order_items: order_id, product_id

---

## 🎯 SAMPLE DATA

**16 Products inserted:**
- 10x Texnika (Tech products)
- 2x Kiyim (Clothing)
- 2x Oziq-ovqat (Food)
- 2x Kitoblar (Books)

**Price range:** $12 - $2,500

---

## 🔧 TROUBLESHOOTING

### ❌ "permission denied for schema public"

**Solution:**
```sql
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
```

### ❌ "SSL connection required"

**Solution:** Neon requires SSL. Connection string should have `?sslmode=require`

### ❌ "too many connections"

**Solution:** Neon free tier has connection limits. Wait a minute or upgrade plan.

---

## 🔄 RESET DATABASE (CAREFUL!)

If you need to start fresh:

```sql
-- This will DELETE ALL DATA!
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then run init-database.sql again
```

---

## 🎉 SUCCESS INDICATORS

After running script:

✅ **Neon Console:**
- Query status: Success
- Rows affected: 16 (products)

✅ **Backend:**
```bash
curl http://localhost:5000/api/products
# Returns: Array of 16 products
```

✅ **Frontend:**
- http://localhost:3000 shows products
- No "Route not found" error

---

## 📝 NEXT STEPS

1. ✅ Run SQL script in Neon
2. ✅ Verify products exist
3. ✅ Restart backend (if needed)
4. ✅ Refresh frontend
5. ✅ Test home page
6. ✅ Create admin user (see ADMIN_SETUP.md)

---

## 🚀 QUICK FIX SUMMARY

```bash
# 1. Go to Neon Console
https://console.neon.tech

# 2. Open SQL Editor

# 3. Copy-paste from: backend/init-database.sql

# 4. Click "Run"

# 5. Verify:
curl http://localhost:5000/api/products

# 6. Refresh frontend:
http://localhost:3000

# DONE! ✅
```

---

**DATABASE IS NOW READY!** 🎉
