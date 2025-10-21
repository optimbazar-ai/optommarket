const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const { verifyToken } = require('../middleware/auth');

// Admin-only middleware
const adminOnly = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }
    
    if (result.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Admin ruxsati kerak! Kirish taqiqlangan.' });
    }
    
    next();
  } catch (err) {
    console.error('Admin check error:', err);
    res.status(500).json({ error: 'Server xatolik' });
  }
};

// All admin routes require authentication and admin role
router.use(verifyToken);
router.use(adminOnly);

// ==================== DASHBOARD ====================
router.get('/dashboard', async (req, res) => {
  try {
    // Total orders
    const ordersResult = await pool.query('SELECT COUNT(*) as count FROM orders');
    const totalOrders = parseInt(ordersResult.rows[0].count);

    // Total revenue
    const revenueResult = await pool.query('SELECT SUM(total_amount) as revenue FROM orders');
    const totalRevenue = parseFloat(revenueResult.rows[0].revenue || 0);

    // Total users
    const usersResult = await pool.query('SELECT COUNT(*) as count FROM users');
    const totalUsers = parseInt(usersResult.rows[0].count);

    // Total products
    const productsResult = await pool.query('SELECT COUNT(*) as count FROM products');
    const totalProducts = parseInt(productsResult.rows[0].count);

    // Total stock
    const stockResult = await pool.query('SELECT SUM(quantity) as stock FROM products');
    const totalStock = parseInt(stockResult.rows[0].stock || 0);

    // Recent orders (last 5)
    const recentOrders = await pool.query(`
      SELECT o.id, u.username, u.email, o.total_amount, o.status, o.created_at
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    // Low stock products (quantity < 10)
    const lowStock = await pool.query(`
      SELECT id, name, quantity, price, category
      FROM products
      WHERE quantity < 10
      ORDER BY quantity ASC
      LIMIT 10
    `);

    res.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalUsers,
        totalProducts,
        totalStock,
      },
      recentOrders: recentOrders.rows,
      lowStockProducts: lowStock.rows,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Dashboard ma\'lumotlarini olishda xatolik' });
  }
});

// ==================== PRODUCTS ====================

// Get all products
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, description, price, quantity, category, image_url, sku, created_at
      FROM products
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'Mahsulotlarni olishda xatolik' });
  }
});

// Create product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, quantity, category, image_url, sku } = req.body;

    // Validation
    if (!name || !price || quantity === undefined) {
      return res.status(400).json({ error: 'Name, price, va quantity majburiy' });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, quantity, category, image_url, sku)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, description, price, quantity, category, image_url, sku]
    );

    res.status(201).json({
      message: '✅ Mahsulot muvaffaqiyatli qo\'shildi',
      product: result.rows[0],
    });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Mahsulot qo\'shishda xatolik' });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category, image_url, sku } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = $1, description = $2, price = $3, quantity = $4,
           category = $5, image_url = $6, sku = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [name, description, price, quantity, category, image_url, sku, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }

    res.json({
      message: '✅ Mahsulot muvaffaqiyatli yangilandi',
      product: result.rows[0],
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Mahsulotni yangilashda xatolik' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists in orders
    const orderCheck = await pool.query(
      'SELECT COUNT(*) as count FROM order_items WHERE product_id = $1',
      [id]
    );

    if (parseInt(orderCheck.rows[0].count) > 0) {
      return res.status(400).json({
        error: 'Bu mahsulot buyurtmalarda ishlatilgan, o\'chirish mumkin emas',
      });
    }

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }

    res.json({
      message: '✅ Mahsulot muvaffaqiyatli o\'chirildi',
      product: result.rows[0],
    });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Mahsulotni o\'chirishda xatolik' });
  }
});

// ==================== ORDERS ====================

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.id, o.user_id, u.username, u.email, o.total_amount, o.status, o.created_at,
             COUNT(oi.id) as items_count
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id, u.username, u.email
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ error: 'Buyurtmalarni olishda xatolik' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Noto\'g\'ri status' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Buyurtma topilmadi' });
    }

    res.json({
      message: '✅ Status muvaffaqiyatli o\'zgartirildi',
      order: result.rows[0],
    });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: 'Status o\'zgartirishda xatolik' });
  }
});

// ==================== USERS ====================

// Get all users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, username, email, phone, role, created_at,
             (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as orders_count
      FROM users
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Foydalanuvchilarni olishda xatolik' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Don't allow changing own role
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'O\'z rolingizni o\'zgartira olmaysiz' });
    }

    const validRoles = ['customer', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Noto\'g\'ri role' });
    }

    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role',
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }

    res.json({
      message: `✅ Role muvaffaqiyatli o'zgartirildi: ${role}`,
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Update user role error:', err);
    res.status(500).json({ error: 'Role o\'zgartirishda xatolik' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow deleting yourself
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'O\'zingizni o\'chira olmaysiz' });
    }

    // Check if user has orders
    const orderCheck = await pool.query(
      'SELECT COUNT(*) as count FROM orders WHERE user_id = $1',
      [id]
    );

    if (parseInt(orderCheck.rows[0].count) > 0) {
      return res.status(400).json({
        error: 'Bu foydalanuvchining buyurtmalari bor, o\'chirish mumkin emas',
      });
    }

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, username, email',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }

    res.json({
      message: '✅ Foydalanuvchi muvaffaqiyatli o\'chirildi',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Foydalanuvchini o\'chirishda xatolik' });
  }
});

// ==================== ANALYTICS ====================

// Sales analytics (last 30 days)
router.get('/analytics/sales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DATE(created_at) as date, 
             COUNT(*) as orders,
             SUM(total_amount) as revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Sales analytics error:', err);
    res.status(500).json({ error: 'Sotuvlar statistikasini olishda xatolik' });
  }
});

// Top products analytics
router.get('/analytics/products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.name, SUM(oi.quantity) as total_sold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      GROUP BY p.name
      ORDER BY total_sold DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Products analytics error:', err);
    res.status(500).json({ error: 'Mahsulotlar statistikasini olishda xatolik' });
  }
});

module.exports = router;
