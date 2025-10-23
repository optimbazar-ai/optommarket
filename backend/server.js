import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
import adminAuth from './middleware/adminAuth.js';
import { 
  apiLimiter, 
  authLimiter, 
  paymentLimiter, 
  adminLimiter, 
  searchLimiter 
} from './middleware/rateLimiter.js';
import { 
  productsCache, 
  productCache, 
  categoriesCache, 
  blogCache,
  clearCache,
  getCacheStats 
} from './middleware/cache.js';

// Load env vars FIRST!
dotenv.config();

// Routes (import AFTER dotenv.config)
import healthRoutes from './routes/health.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';
import promoCodeRoutes from './routes/promoCodeRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import withdrawalRoutes from './routes/withdrawals.js';
import uploadRoutes from './routes/upload.js';
import aiRoutes from './routes/ai.js';
import blogRoutes from './routes/blog.js';
import seoRoutes from './routes/seo.js';
import testRoutes from './routes/test.js';
import telegramService from './services/telegramService.js';
import telegramBotService from './services/telegramBotService.js';
import dailyBlogGenerator from './jobs/dailyBlogGenerator.js';
import dailyProductPromotion from './jobs/dailyProductPromotion.js';

// Debug: Check if env vars are loaded
console.log('🔍 Environment Variables Check:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✓ Loaded' : '❌ Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✓ Loaded' : '❌ Missing');
console.log('- GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? `✓ Loaded (${process.env.GEMINI_API_KEY.substring(0, 10)}...)` : '❌ Missing');
console.log('');

// Connect to database
connectDB();

// Initialize Telegram services
telegramService.initialize();
telegramBotService.initialize();

// Start daily blog generator cron job
dailyBlogGenerator.start();

// Start daily product promotion cron job
dailyProductPromotion.start();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
  crossOriginEmbedderPolicy: false
}));

// Compression middleware - Ma'lumotlarni siqish
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // Compression level (0-9, 6 is optimal)
}));

// CORS middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://optommarket.netlify.app',
    'https://optommarket.vercel.app',
    /^https:\/\/optommarket-.*\.vercel\.app$/
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting - Barcha API route'lar uchun
app.use('/api/', apiLimiter);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root URL - Welcome message
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OptomMarket.uz Backend API',
    version: '1.0.0',
    status: 'Running',
    documentation: '/api',
    endpoints: {
      api: '/api',
      health: '/api/health',
      products: '/api/products',
      categories: '/api/categories'
    }
  });
});

// API Root - Welcome message
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'OptomMarket.uz API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      orders: '/api/orders',
      upload: '/api/upload'
    }
  });
});

// Routes with specific rate limiting and caching
app.use('/api/health', healthRoutes);
app.use('/api/products', searchLimiter, productRoutes); // Search limiter for products
app.use('/api/auth', authLimiter, authRoutes); // Strict limiter for auth
app.use('/api/categories', categoriesCache, categoryRoutes); // Cache categories
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes); // Strict limiter for payments
app.use('/api/admin', adminAuth, adminLimiter, adminRoutes); // Admin limiter
app.use('/api/promo-codes', promoCodeRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/blog', blogCache, blogRoutes); // Cache blog posts
app.use('/api/seo', seoRoutes);
app.use('/api/test', testRoutes);

// Cache management endpoint (admin only)
app.post('/api/admin/cache/clear', adminAuth, (req, res) => {
  try {
    const { type } = req.body;
    if (type) {
      clearCache(type);
      res.json({ success: true, message: `Cache cleared: ${type}` });
    } else {
      clearCache();
      res.json({ success: true, message: 'All cache cleared' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Cache clear failed' });
  }
});

// Cache stats endpoint (admin only)
app.get('/api/admin/cache/stats', adminAuth, (req, res) => {
  try {
    const stats = getCacheStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get cache stats' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  
  const apiUrl = process.env.BACKEND_URL 
    ? `${process.env.BACKEND_URL}/api`
    : `http://localhost:${PORT}/api`;
  console.log(`✓ API available at: ${apiUrl}`);
});
