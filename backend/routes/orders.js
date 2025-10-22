import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders - Get all orders (auth required)
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    
    // Regular users can only see their own orders
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }
    
    const orders = await Order.find(query)
      .populate('items.product', 'name images')
      .populate('user', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images brand')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { items, customerInfo, shippingAddress, paymentMethod, notes } = req.body;
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }
    
    // Validate and populate items with product data
    const orderItems = [];
    let totalPrice = 0;
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }
      
      const itemPrice = product.wholesalePrice || product.price;
      const itemTotal = itemPrice * item.quantity;
      
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: itemPrice,
        total: itemTotal
      });
      
      totalPrice += itemTotal;
    }
    
    // Create order
    const order = await Order.create({
      user: req.user?.id || null,
      items: orderItems,
      customerInfo,
      shippingAddress,
      paymentMethod,
      totalPrice,
      notes
    });
    
    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }
    
    // Populate order data
    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name images');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// PUT /api/orders/:id/status - Update order status (admin only)
router.put('/:id/status', protect, authorize('admin', 'seller'), async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (orderStatus) {
      order.orderStatus = orderStatus;
      
      if (orderStatus === 'delivered') {
        order.deliveredAt = Date.now();
      }
    }
    
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
      
      if (paymentStatus === 'paid') {
        order.paidAt = Date.now();
      }
    }
    
    await order.save();
    
    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

// DELETE /api/orders/:id - Cancel order
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if user owns the order or is admin
    if (order.user && order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }
    
    // Can only cancel pending orders
    if (order.orderStatus !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that is already being processed'
      });
    }
    
    order.orderStatus = 'cancelled';
    await order.save();
    
    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }
    
    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
});

export default router;
