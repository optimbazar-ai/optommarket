import express from 'express';
import Withdrawal from '../models/Withdrawal.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET /api/withdrawals - Get withdrawals (seller sees their own, admin sees all)
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    if (req.user.role === 'seller') {
      query.seller = req.user._id;
    }
    
    const withdrawals = await Withdrawal.find(query)
      .populate('seller', 'name email companyName')
      .populate('processedBy', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: withdrawals.length,
      data: withdrawals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching withdrawals',
      error: error.message
    });
  }
});

// POST /api/withdrawals - Create withdrawal request (seller only)
router.post('/', authorize('seller'), async (req, res) => {
  try {
    const { amount, notes } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Check if seller has enough balance
    if (!user.sellerInfo || user.sellerInfo.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }
    
    // Check if seller has bank account info
    if (!user.sellerInfo.bankAccount || !user.sellerInfo.bankName) {
      return res.status(400).json({
        success: false,
        message: 'Please add bank account information in settings'
      });
    }
    
    // Minimum withdrawal amount
    if (amount < 100000) {
      return res.status(400).json({
        success: false,
        message: 'Minimum withdrawal amount is 100,000 so\'m'
      });
    }
    
    const withdrawal = await Withdrawal.create({
      seller: req.user._id,
      amount,
      bankAccount: user.sellerInfo.bankAccount,
      bankName: user.sellerInfo.bankName,
      notes
    });
    
    res.status(201).json({
      success: true,
      message: 'Withdrawal request created successfully',
      data: withdrawal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating withdrawal request',
      error: error.message
    });
  }
});

// PUT /api/withdrawals/:id/approve - Approve/reject withdrawal (admin only)
router.put('/:id/approve', authorize('admin'), async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const withdrawal = await Withdrawal.findById(req.params.id);
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal not found'
      });
    }
    
    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Withdrawal already processed'
      });
    }
    
    withdrawal.status = status;
    withdrawal.processedBy = req.user._id;
    withdrawal.processedAt = Date.now();
    
    if (status === 'rejected') {
      withdrawal.rejectionReason = rejectionReason || 'No reason provided';
    } else if (status === 'approved') {
      // Deduct from seller balance
      const seller = await User.findById(withdrawal.seller);
      seller.sellerInfo.balance -= withdrawal.amount;
      await seller.save();
    }
    
    await withdrawal.save();
    
    res.json({
      success: true,
      message: `Withdrawal ${status} successfully`,
      data: withdrawal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing withdrawal',
      error: error.message
    });
  }
});

// PUT /api/withdrawals/:id/complete - Mark as completed (admin only)
router.put('/:id/complete', authorize('admin'), async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal not found'
      });
    }
    
    if (withdrawal.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Withdrawal must be approved first'
      });
    }
    
    withdrawal.status = 'completed';
    withdrawal.completedAt = Date.now();
    await withdrawal.save();
    
    res.json({
      success: true,
      message: 'Withdrawal marked as completed',
      data: withdrawal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing withdrawal',
      error: error.message
    });
  }
});

export default router;
