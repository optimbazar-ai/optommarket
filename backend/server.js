require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./models/db');

// Import routes
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: '🎉 OPTOMMARKET Backend API ishga tushdi!',
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Health Check with Database
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      database: 'Connected ✅',
      timestamp: result.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'Disconnected ❌',
      error: err.message
    });
  }
});

// API Routes
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/chatbot', chatbotRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 OPTOMMARKET Backend Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Database: ${process.env.DATABASE_URL ? 'Configured ✅' : 'Not configured ❌'}`);
  console.log(`🤖 Chatbot: POST http://localhost:${PORT}/api/chatbot/chat`);
  console.log(`${'='.repeat(50)}\n`);
});

module.exports = app;
