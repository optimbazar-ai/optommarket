import express from 'express';
import blogGeneratorService from '../services/blogGeneratorService.js';
import telegramService from '../services/telegramService.js';
import Product from '../models/Product.js';

const router = express.Router();

// Test blog generation
router.post('/generate-blog', async (req, res) => {
  try {
    console.log('🧪 Manual blog generation test...');
    const posts = await blogGeneratorService.generateDailyPosts(2);
    
    res.json({
      success: true,
      message: 'Blog posts generated successfully',
      count: posts.length,
      posts: posts.map(p => ({
        title: p.title,
        slug: p.slug,
        category: p.category
      }))
    });
  } catch (error) {
    console.error('❌ Blog generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Blog generation failed',
      error: error.message
    });
  }
});

// Test product promotion
router.post('/promote-product', async (req, res) => {
  try {
    console.log('🧪 Manual product promotion test...');
    
    // Get random featured product
    const products = await Product.find({ featured: true }).limit(1);
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No featured products found'
      });
    }
    
    const product = products[0];
    
    // Send to Telegram
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    if (!channelId) {
      return res.status(400).json({
        success: false,
        message: 'TELEGRAM_CHANNEL_ID not configured'
      });
    }
    
    const message = `
🔥 <b>${product.name}</b>

📦 Kategoriya: ${product.category?.name || 'N/A'}
💰 Narx: ${product.price?.toLocaleString('uz-UZ')} so'm
📊 Omborda: ${product.stock} dona

${product.description?.substring(0, 200)}...

🛒 Buyurtma berish: https://optommarket.netlify.app/products/${product._id}
    `.trim();
    
    await telegramService.sendMessage(message, channelId);
    
    res.json({
      success: true,
      message: 'Product promoted successfully',
      product: {
        name: product.name,
        price: product.price
      }
    });
  } catch (error) {
    console.error('❌ Product promotion error:', error);
    res.status(500).json({
      success: false,
      message: 'Product promotion failed',
      error: error.message
    });
  }
});

// Test Telegram connection
router.get('/telegram-test', async (req, res) => {
  try {
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    
    if (!adminChatId) {
      return res.status(400).json({
        success: false,
        message: 'TELEGRAM_ADMIN_CHAT_ID not configured'
      });
    }
    
    await telegramService.sendMessage(
      '✅ <b>Test Message</b>\n\nTelegram bot is working correctly!',
      adminChatId
    );
    
    res.json({
      success: true,
      message: 'Test message sent to admin'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Telegram test failed',
      error: error.message
    });
  }
});

// Get cron job status
router.get('/cron-status', async (req, res) => {
  try {
    const Product = (await import('../models/Product.js')).default;
    const Blog = (await import('../models/Blog.js')).default;
    
    const productCount = await Product.countDocuments();
    const featuredCount = await Product.countDocuments({ featured: true });
    const blogCount = await Blog.countDocuments();
    
    res.json({
      success: true,
      data: {
        products: {
          total: productCount,
          featured: featuredCount
        },
        blogs: {
          total: blogCount
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          telegramBotConfigured: !!process.env.TELEGRAM_BOT_TOKEN,
          telegramChannelConfigured: !!process.env.TELEGRAM_CHANNEL_ID,
          geminiConfigured: !!process.env.GEMINI_API_KEY
        },
        cronJobs: {
          blogGenerator: 'Scheduled at 09:00 daily',
          productPromotion: 'Scheduled at 10:00, 14:00, 18:00 daily'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
