import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// TEST MODE URLs
const CLICK_TEST_URL = 'https://test-payment.click.uz/pay';
const PAYME_TEST_URL = 'https://test-payment.payme.uz/pay';

// POST /api/payments/click/init - Initialize Click payment
router.post('/click/init', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    
    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and amount are required'
      });
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Generate payment URL (TEST MODE)
    const paymentUrl = `${CLICK_TEST_URL}?order_id=${orderId}&amount=${amount}&merchant_id=test_merchant&return_url=${process.env.FRONTEND_URL || 'http://localhost:3000'}/order-success/${orderId}`;
    
    // Save payment URL to order
    order.paymentUrl = paymentUrl;
    await order.save();
    
    res.json({
      success: true,
      paymentUrl,
      message: 'Click payment initialized (TEST MODE)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing Click payment',
      error: error.message
    });
  }
});

// POST /api/payments/click/callback - Click payment callback
router.post('/click/callback', async (req, res) => {
  try {
    const { order_id, status, transaction_id } = req.body;
    
    const order = await Order.findById(order_id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (status === 'success') {
      order.paymentStatus = 'paid';
      order.paidAt = Date.now();
      order.orderStatus = 'confirmed';
    } else {
      order.paymentStatus = 'failed';
    }
    
    await order.save();
    
    res.json({
      success: true,
      message: 'Payment status updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing callback',
      error: error.message
    });
  }
});

// POST /api/payments/payme/init - Initialize Payme payment
router.post('/payme/init', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    
    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and amount are required'
      });
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Payme uses tiyin (1 so'm = 100 tiyin)
    const amountInTiyin = amount * 100;
    
    // Generate payment URL (TEST MODE)
    const paymentUrl = `${PAYME_TEST_URL}?order_id=${orderId}&amount=${amountInTiyin}&merchant_id=test_merchant&return_url=${process.env.FRONTEND_URL || 'http://localhost:3000'}/order-success/${orderId}`;
    
    // Save payment URL to order
    order.paymentUrl = paymentUrl;
    await order.save();
    
    res.json({
      success: true,
      paymentUrl,
      message: 'Payme payment initialized (TEST MODE)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing Payme payment',
      error: error.message
    });
  }
});

// POST /api/payments/payme/callback - Payme payment callback
router.post('/payme/callback', async (req, res) => {
  try {
    const { order_id, status, transaction_id } = req.body;
    
    const order = await Order.findById(order_id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (status === 'success') {
      order.paymentStatus = 'paid';
      order.paidAt = Date.now();
      order.orderStatus = 'confirmed';
    } else {
      order.paymentStatus = 'failed';
    }
    
    await order.save();
    
    res.json({
      success: true,
      message: 'Payment status updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing callback',
      error: error.message
    });
  }
});

// GET /api/payments/status/:orderId - Get payment status
router.get('/status/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        paidAt: order.paidAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment status',
      error: error.message
    });
  }
});

export default router;
