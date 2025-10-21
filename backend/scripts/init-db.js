const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDatabase() {
  console.log('📊 Database initialization boshlandi...\n');

  try {
    // Read SQL file
    const sqlFile = path.join(__dirname, '..', 'init-database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('📄 SQL file o\'qildi: init-database.sql');
    console.log('🔄 Database tables yaratilmoqda...\n');

    // Execute SQL
    await pool.query(sql);

    console.log('✅ Tables muvaffaqiyatli yaratildi!\n');

    // Verify products
    const productsResult = await pool.query('SELECT COUNT(*) as count FROM products');
    const productsCount = productsResult.rows[0].count;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ DATABASE INITIALIZATION SUCCESS!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📦 Products inserted: ${productsCount}`);
    console.log(`🗄️  Tables created: users, products, orders, order_items`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Show sample products
    const sampleProducts = await pool.query('SELECT id, name, price, category FROM products LIMIT 5');
    console.log('📋 Sample Products:');
    sampleProducts.rows.forEach(p => {
      console.log(`   ${p.id}. ${p.name} - $${p.price} (${p.category})`);
    });
    console.log('\n🎉 Database tayyor! Backend va frontend test qilishingiz mumkin.\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\n📝 Details:', error);
    console.error('\n💡 Yechim:');
    console.error('   1. backend/.env faylida DATABASE_URL to\'g\'ri ekanligini tekshiring');
    console.error('   2. Neon DB connection active ekanligini tekshiring');
    console.error('   3. Internet connection stable ekanligini tekshiring\n');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

console.log('\n🚀 OPTOMMARKET - Database Initialization\n');
initDatabase();
