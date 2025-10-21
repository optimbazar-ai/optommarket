const pool = require('./db');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create({ username, email, password, phone, address, role = 'customer' }) {
    try {
      const password_hash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (username, email, password_hash, phone, address, role) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, phone, address, role, created_at`,
        [username, email, password_hash, phone, address, role]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  // Find user by username
  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT id, username, email, phone, address, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Get all users (admin only)
  static async getAll() {
    const result = await pool.query(
      'SELECT id, username, email, phone, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  // Update user
  static async update(id, updates) {
    const { phone, address } = updates;
    const result = await pool.query(
      `UPDATE users SET phone = $1, address = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 RETURNING id, username, email, phone, address, role`,
      [phone, address, id]
    );
    return result.rows[0];
  }

  // Delete user
  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return { message: 'User deleted successfully' };
  }
}

module.exports = User;
