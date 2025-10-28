const pool = require('../models/db');
const { Promotion } = require('../models/mongodb');
const { notifyPromotion } = require('./telegramBot');

// Generate random promotion for a product
const generatePromotion = async () => {
  try {
    console.log('🎁 Starting promotion generation...');
    
    // Get random product from PostgreSQL
    const result = await pool.query(`
      SELECT id, name, price, category, brand 
      FROM products 
      WHERE price > 5000 
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    
    if (result.rows.length === 0) {
      console.log('⚠️  No products available for promotion');
      return null;
    }
    
    const product = result.rows[0];
    
    // Generate discount (10-40%)
    const discountPercent = [10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 6)];
    const discountedPrice = Math.round(product.price * (1 - discountPercent / 100));
    
    // Set promotion duration (3-7 days)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 3);
    
    const promotionData = {
      productId: product.id,
      productName: product.name,
      discountPercent,
      originalPrice: product.price,
      discountedPrice,
      startDate,
      endDate,
      description: `${product.name} uchun maxsus chegirma! ${discountPercent}% arzonroq!`,
      active: true
    };
    
    console.log('✅ Promotion generated:', {
      product: product.name,
      discount: `${discountPercent}%`,
      oldPrice: product.price,
      newPrice: discountedPrice
    });
    
    return promotionData;
  } catch (error) {
    console.error('✗ Promotion generation error:', error.message);
    return null;
  }
};

// Save promotion to MongoDB
const savePromotion = async (promotionData) => {
  try {
    if (!Promotion) {
      console.log('⚠️  MongoDB not connected - Promotion not saved');
      return null;
    }
    
    // Check if active promotion exists for this product
    const existingPromotion = await Promotion.findOne({
      productId: promotionData.productId,
      active: true,
      endDate: { $gte: new Date() }
    });
    
    if (existingPromotion) {
      console.log('ℹ️  Active promotion already exists for this product');
      return existingPromotion;
    }
    
    // Create new promotion
    const promotion = new Promotion(promotionData);
    await promotion.save();
    
    console.log('✅ Promotion saved to database');
    return promotion;
  } catch (error) {
    console.error('✗ Promotion save error:', error.message);
    return null;
  }
};

// Generate and notify promotion
const runPromotionScheduler = async () => {
  try {
    console.log('⏰ Running promotion scheduler...');
    
    // Generate promotion
    const promotionData = await generatePromotion();
    if (!promotionData) return;
    
    // Save to database
    const promotion = await savePromotion(promotionData);
    if (!promotion) return;
    
    // Send Telegram notification
    await notifyPromotion(promotion);
    
    console.log('✅ Promotion scheduler completed successfully');
    return promotion;
  } catch (error) {
    console.error('✗ Promotion scheduler error:', error.message);
    return null;
  }
};

// Get active promotions
const getActivePromotions = async () => {
  try {
    if (!Promotion) {
      console.log('⚠️  MongoDB not connected');
      return [];
    }
    
    const promotions = await Promotion.find({
      active: true,
      endDate: { $gte: new Date() }
    }).sort({ createdAt: -1 }).limit(10);
    
    return promotions;
  } catch (error) {
    console.error('✗ Get promotions error:', error.message);
    return [];
  }
};

// Deactivate expired promotions
const deactivateExpiredPromotions = async () => {
  try {
    if (!Promotion) return;
    
    const result = await Promotion.updateMany(
      {
        active: true,
        endDate: { $lt: new Date() }
      },
      {
        $set: { active: false }
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log(`✅ Deactivated ${result.modifiedCount} expired promotions`);
    }
  } catch (error) {
    console.error('✗ Deactivate promotions error:', error.message);
  }
};

module.exports = {
  generatePromotion,
  savePromotion,
  runPromotionScheduler,
  getActivePromotions,
  deactivateExpiredPromotions
};
