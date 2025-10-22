import PromoCode from '../models/PromoCode.js';
import telegramService from '../services/telegramService.js';

// @desc    Get all promo codes (Admin only)
// @route   GET /api/promo-codes
// @access  Private/Admin
export const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find()
      .populate('createdBy', 'name email')
      .populate('applicableCategories', 'name')
      .sort('-createdAt');

    res.json({
      success: true,
      data: promoCodes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create promo code
// @route   POST /api/promo-codes
// @access  Private/Admin
export const createPromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.create({
      ...req.body,
      createdBy: req.user.id
    });

    // Send to Telegram channel
    await telegramService.sendPromoCode(promoCode);

    res.status(201).json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Validate promo code
// @route   POST /api/promo-codes/validate
// @access  Public
export const validatePromoCode = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase() 
    });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo kod topilmadi'
      });
    }

    if (!promoCode.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Promo kod yaroqsiz yoki muddati tugagan'
      });
    }

    const discount = promoCode.calculateDiscount(orderAmount);

    res.json({
      success: true,
      data: {
        code: promoCode.code,
        description: promoCode.description,
        discountAmount: discount,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Apply promo code (increment usage)
// @route   POST /api/promo-codes/apply
// @access  Private
export const applyPromoCode = async (req, res) => {
  try {
    const { code } = req.body;

    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase() 
    });

    if (!promoCode || !promoCode.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Promo kod yaroqsiz'
      });
    }

    promoCode.usedCount += 1;
    await promoCode.save();

    res.json({
      success: true,
      message: 'Promo kod muvaffaqiyatli qo\'llandi'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update promo code
// @route   PUT /api/promo-codes/:id
// @access  Private/Admin
export const updatePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo kod topilmadi'
      });
    }

    res.json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete promo code
// @route   DELETE /api/promo-codes/:id
// @access  Private/Admin
export const deletePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndDelete(req.params.id);

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo kod topilmadi'
      });
    }

    res.json({
      success: true,
      message: 'Promo kod o\'chirildi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
