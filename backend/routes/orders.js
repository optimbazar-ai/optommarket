const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create new order (authenticated users)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { total_price, shipping_address, items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const order = await Order.create({
      user_id: req.user.id,
      total_price,
      shipping_address,
      items
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's own orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(req.params.id, status);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by status (admin only)
router.get('/status/:status', verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.getByStatus(req.params.status);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete order (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await Order.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
