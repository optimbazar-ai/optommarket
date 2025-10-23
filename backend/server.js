import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
import adminAuth from './middleware/adminAuth.js';

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

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Root - Welcome message
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'OptoMarket.uz API',
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

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminAuth, adminRoutes);
app.use('/api/promo-codes', promoCodeRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/seo', seoRoutes);

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
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
  console.log(`✓ API available at: http://localhost:${PORT}/api`);
});
