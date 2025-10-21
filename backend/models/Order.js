const pool = require('./db');

class Order {
  // Create new order
  static async create({ user_id, total_price, status = 'pending', shipping_address, items }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_price, status, shipping_address) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, total_price, status, shipping_address]
      );
      const order = orderResult.rows[0];

      // Create order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES ($1, $2, $3, $4)`,
          [order.id, item.product_id, item.quantity, item.price]
        );

        // Update product stock
        await client.query(
          'UPDATE products SET quantity = quantity - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Get all orders
  static async getAll() {
    const result = await pool.query(`
      SELECT o.*, u.username, u.email 
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    return result.rows;
  }

  // Get order by ID with items
  static async findById(id) {
    const orderResult = await pool.query(`
      SELECT o.*, u.username, u.email, u.phone
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `, [id]);

    if (orderResult.rows.length === 0) return null;

    const order = orderResult.rows[0];

    // Get order items
    const itemsResult = await pool.query(`
      SELECT oi.*, p.name as product_name, p.sku
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id]);

    order.items = itemsResult.rows;
    return order;
  }

  // Get orders by user ID
  static async findByUserId(user_id) {
    const result = await pool.query(`
      SELECT o.* 
      FROM orders o
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [user_id]);
    return result.rows;
  }

  // Update order status
  static async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }

  // Delete order
  static async delete(id) {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    return { message: 'Order deleted successfully' };
  }

  // Get orders by status
  static async getByStatus(status) {
    const result = await pool.query(`
      SELECT o.*, u.username, u.email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.status = $1
      ORDER BY o.created_at DESC
    `, [status]);
    return result.rows;
  }
}

module.exports = Order;
