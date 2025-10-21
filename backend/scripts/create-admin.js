const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function createAdmin() {
  console.log('\n🔐 ADMIN USER YARATISH\n');

  try {
    // Check if admin already exists
    const checkResult = await pool.query(
      "SELECT * FROM users WHERE email = 'admin@optommarket.uz'"
    );

    if (checkResult.rows.length > 0) {
      console.log('⚠️  Admin user allaqachon mavjud!');
      console.log('\n📋 Admin User Ma\'lumotlari:');
      console.log('   Email: admin@optommarket.uz');
      console.log('   Role:', checkResult.rows[0].role);
      console.log('\n💡 Login qilish uchun parolni eslaysizmi?');
      console.log('   Agar yo\'q bo\'lsa, database-dan o\'chirib qayta yarating.\n');
      process.exit(0);
    }

    // Create admin user
    const password = 'admin123'; // Default password
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, phone, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, username, email, role, created_at`,
      ['admin', 'admin@optommarket.uz', passwordHash, '+998901234567', 'admin']
    );

    console.log('✅ Admin user muvaffaqiyatli yaratildi!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   Email:    admin@optommarket.uz');
    console.log('   Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📊 User Details:');
    console.log('   ID:', result.rows[0].id);
    console.log('   Username:', result.rows[0].username);
    console.log('   Email:', result.rows[0].email);
    console.log('   Role:', result.rows[0].role);
    console.log('   Created:', result.rows[0].created_at);
    
    console.log('\n🎯 KEYINGI QADAMLAR:');
    console.log('   1. Login page: http://localhost:3000/login');
    console.log('   2. Email: admin@optommarket.uz');
    console.log('   3. Password: admin123');
    console.log('   4. Kirish tugmasini bosing');
    console.log('   5. Navbar-da "⚙️ Admin Panel" button ko\'rinadi');
    console.log('   6. Click → Admin Dashboard\n');
    
    console.log('⚠️  IMPORTANT: Production-da parolni o\'zgartiring!\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === '23505') {
      console.error('\n💡 Admin user allaqachon mavjud (email yoki username duplicate)');
      console.error('   Database-dan o\'chirib qayta yarating yoki boshqa email ishlating.\n');
    } else if (error.code === '42P01') {
      console.error('\n💡 "users" table mavjud emas!');
      console.error('   Avval database initialization qiling:');
      console.error('   node scripts/init-db.js\n');
    } else {
      console.error('\n💡 Yechim:');
      console.error('   1. backend/.env faylida DATABASE_URL to\'g\'ri ekanligini tekshiring');
      console.error('   2. Neon DB connection active ekanligini tekshiring');
      console.error('   3. Database initialized ekanligini tekshiring (init-db.js)\n');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

console.log('\n🚀 OPTOMMARKET - Admin User Creation\n');
createAdmin();
