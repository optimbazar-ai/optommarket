const pool = require('./db');

const initDatabase = async () => {
  try {
    console.log('🔄 Creating database tables...\n');

    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // PRODUCTS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        quantity INT DEFAULT 0,
        category VARCHAR(100),
        image_url VARCHAR(500),
        sku VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Products table created');

    // ORDERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        total_price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Orders table created');

    // ORDER_ITEMS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id),
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `);
    console.log('✅ Order_items table created');

    // Insert sample products
    const checkProducts = await pool.query('SELECT COUNT(*) FROM products');
    if (checkProducts.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO products (name, description, price, quantity, category, sku) VALUES
        ('Guruch 50kg', 'Yuqori sifatli guruch', 250000, 100, 'Oziq-ovqat', 'GURUCH-50KG'),
        ('Un 25kg', 'Premium un', 120000, 150, 'Oziq-ovqat', 'UN-25KG'),
        ('Shakar 50kg', 'Oq shakar', 200000, 80, 'Oziq-ovqat', 'SHAKAR-50KG'),
        ('Yog 10L', 'Kungaboqar yog\'i', 180000, 60, 'Oziq-ovqat', 'YOG-10L'),
        ('Makaron 5kg', 'Italiya makaron', 45000, 200, 'Oziq-ovqat', 'MAKARON-5KG');
      `);
      console.log('✅ Sample products inserted');
    }

    console.log('\n🎉 Database initialization completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
    process.exit(1);
  }
};

initDatabase();
