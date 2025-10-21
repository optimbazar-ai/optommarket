const pool = require('./db');

class Product {
  // Create new product
  static async create({ name, description, price, quantity, category, image_url, sku }) {
    try {
      const result = await pool.query(
        `INSERT INTO products (name, description, price, quantity, category, image_url, sku) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, description, price, quantity, category, image_url, sku]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get all products
  static async getAll(limit = 100, offset = 0) {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  // Get product by ID
  static async findById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Get products by category
  static async getByCategory(category) {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC',
      [category]
    );
    return result.rows;
  }

  // Search products
  static async search(searchTerm) {
    const result = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1
       ORDER BY created_at DESC`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  }

  // Update product
  static async update(id, updates) {
    const { name, description, price, quantity, category, image_url } = updates;
    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name), 
           description = COALESCE($2, description), 
           price = COALESCE($3, price), 
           quantity = COALESCE($4, quantity), 
           category = COALESCE($5, category), 
           image_url = COALESCE($6, image_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [name, description, price, quantity, category, image_url, id]
    );
    return result.rows[0];
  }

  // Update stock quantity
  static async updateStock(id, quantity) {
    const result = await pool.query(
      'UPDATE products SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0];
  }

  // Delete product
  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return { message: 'Product deleted successfully' };
  }

  // Get low stock products
  static async getLowStock(threshold = 10) {
    const result = await pool.query(
      'SELECT * FROM products WHERE quantity <= $1 ORDER BY quantity ASC',
      [threshold]
    );
    return result.rows;
  }
}

module.exports = Product;
