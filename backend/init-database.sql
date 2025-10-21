-- OPTOMMARKET DATABASE INITIALIZATION SCRIPT

-- Drop tables if exist (careful in production!)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  image_url TEXT,
  sku VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Insert sample products
INSERT INTO products (name, description, price, quantity, category, image_url, sku) VALUES
('Laptop HP ProBook 450', 'Professional business laptop', 850.00, 15, 'Texnika', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 'TECH-001'),
('iPhone 15 Pro', 'Latest Apple smartphone', 1200.00, 25, 'Texnika', 'https://images.unsplash.com/photo-1592286927505-08d6d6c2a1d0?w=500', 'TECH-002'),
('Samsung Galaxy S24', 'Flagship Android phone', 950.00, 30, 'Texnika', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500', 'TECH-003'),
('Sony Headphones WH-1000XM5', 'Noise cancelling headphones', 350.00, 50, 'Texnika', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'TECH-004'),
('MacBook Pro 16"', 'High-performance laptop', 2500.00, 10, 'Texnika', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 'TECH-005'),
('Dell Monitor 27"', '4K UHD Monitor', 450.00, 20, 'Texnika', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', 'TECH-006'),
('Logitech MX Master 3', 'Wireless mouse', 99.00, 100, 'Texnika', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500', 'TECH-007'),
('Mechanical Keyboard RGB', 'Gaming keyboard', 120.00, 75, 'Texnika', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', 'TECH-008'),
('Canon EOS R6', 'Professional camera', 2200.00, 8, 'Texnika', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', 'TECH-009'),
('iPad Pro 12.9"', 'Apple tablet', 1100.00, 18, 'Texnika', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 'TECH-010'),
('Men T-Shirt Cotton', 'Premium cotton t-shirt', 25.00, 200, 'Kiyim', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'CLOTH-001'),
('Women Dress Summer', 'Elegant summer dress', 45.00, 150, 'Kiyim', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', 'CLOTH-002'),
('Rice 5kg Pack', 'Premium basmati rice', 12.00, 500, 'Oziq-ovqat', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500', 'FOOD-001'),
('Olive Oil 1L', 'Extra virgin olive oil', 15.00, 300, 'Oziq-ovqat', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500', 'FOOD-002'),
('JavaScript Book', 'Complete JavaScript guide', 35.00, 80, 'Kitoblar', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', 'BOOK-001'),
('Python Programming', 'Learn Python from scratch', 40.00, 60, 'Kitoblar', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500', 'BOOK-002');

-- Success message
SELECT 'Database initialized successfully!' AS message,
       (SELECT COUNT(*) FROM users) AS users_count,
       (SELECT COUNT(*) FROM products) AS products_count,
       (SELECT COUNT(*) FROM orders) AS orders_count;
