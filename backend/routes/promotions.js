const express = require('express');
const router = express.Router();
const { getActivePromotions } = require('../services/promotionScheduler');
const { triggerPromotionGeneration } = require('../services/scheduler');
const { Promotion } = require('../models/mongodb');

// Get all active promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await getActivePromotions();
    res.json({ promotions });
  } catch (error) {
    console.error('Get promotions error:', error);
    res.status(500).json({ error: 'Failed to fetch promotions' });
  }
});

// Get promotion by product ID
router.get('/product/:productId', async (req, res) => {
  try {
    if (!Promotion) {
      return res.status(503).json({ error: 'MongoDB not connected' });
    }
    
    const promotion = await Promotion.findOne({
      productId: parseInt(req.params.productId),
      active: true,
      endDate: { $gte: new Date() }
    });
    
    if (!promotion) {
      return res.status(404).json({ error: 'No active promotion for this product' });
    }
    
    res.json(promotion);
  } catch (error) {
    console.error('Get promotion error:', error);
    res.status(500).json({ error: 'Failed to fetch promotion' });
  }
});

// Manual trigger promotion generation (admin only - add auth middleware later)
router.post('/generate', async (req, res) => {
  try {
    const promotion = await triggerPromotionGeneration();
    
    if (!promotion) {
      return res.status(500).json({ error: 'Promotion generation failed' });
    }
    
    res.json({
      message: 'Promotion generated successfully',
      promotion
    });
  } catch (error) {
    console.error('Generate promotion error:', error);
    res.status(500).json({ error: 'Failed to generate promotion' });
  }
});

module.exports = router;
