require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./models/db');
const { connectMongoDB } = require('./models/mongodb');
const { initializeTelegramBot } = require('./services/telegramBot');
const { initializeSchedulers } = require('./services/scheduler');

// Import routes
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const chatbotRoutes = require('./routes/chatbot');
const adminRoutes = require('./routes/admin');
const blogsRoutes = require('./routes/blogs');
const promotionsRoutes = require('./routes/promotions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://optommarket.vercel.app',
      'https://optommarket-frontend.vercel.app',
      'https://optom-market-vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean)
  : [
      'http://localhost:3000', 
      'http://127.0.0.1:3000',
      'http://localhost:5000', 
      'http://127.0.0.1:5000',
      ...(process.env.REPLIT_DEV_DOMAIN ? [
        `https://${process.env.REPLIT_DEV_DOMAIN}`,
        `https://${process.env.REPLIT_DEV_DOMAIN}:5000`
      ] : [])
    ];

// Temporary: Allow all origins for testing
app.use(cors({
  origin: true, // Allow all origins temporarily
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400,
}));

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});
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
      orders: '/api/orders',
      chatbot: '/api/chatbot/chat',
      admin: '/api/admin'
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
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/promotions', promotionsRoutes);

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

// Initialize MongoDB, Telegram Bot, and Schedulers
const initializeServices = async () => {
  console.log('\n🔧 Initializing services...');
  
  // Environment variables check
  console.log('\n📋 Environment Variables:');
  console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Loaded' : '✗ Missing'}`);
  console.log(`- MONGODB_URI: ${process.env.MONGODB_URI ? '✓ Loaded' : '✗ Missing'}`);
  console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? '✓ Loaded' : '✗ Missing'}`);
  console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? `✓ Loaded (${process.env.GEMINI_API_KEY.substring(0, 10)}...)` : '✗ Missing'}`);
  console.log();
  
  // Connect to MongoDB (optional)
  const mongoConnected = await connectMongoDB();
  
  // Initialize Telegram Bot (optional)
  initializeTelegramBot();
  
  // Initialize Schedulers (only if MongoDB is connected)
  if (mongoConnected) {
    initializeSchedulers();
  } else {
    console.log('⚠️  Schedulers disabled (MongoDB required)');
  }
};

// Start Server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 OPTOMMARKET Backend Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Database: ${process.env.DATABASE_URL ? 'Configured ✅' : 'Not configured ❌'}`);
  console.log(`🤖 Chatbot: POST http://localhost:${PORT}/api/chatbot/chat`);
  console.log(`${'='.repeat(50)}\n`);
  
  // Initialize services
  await initializeServices();
  
  console.log(`\n✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API available at: http://localhost:${PORT}/api`);
});

module.exports = app;
