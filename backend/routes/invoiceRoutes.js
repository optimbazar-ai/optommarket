import express from 'express';
import Order from '../models/Order.js';
import { generateInvoiceHTML } from '../utils/invoiceGenerator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/invoices/:orderId
 * @desc    Get invoice HTML for an order
 * @access  Private
 */
router.get('/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.product', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Buyurtma topilmadi'
      });
    }

    // Check if user owns this order or is admin
    if (order.user && order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Ruxsat yo\'q'
      });
    }

    const invoiceHTML = generateInvoiceHTML(order);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(invoiceHTML);
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Xatolik yuz berdi',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/invoices/:orderId/download
 * @desc    Download invoice as HTML file
 * @access  Private
 */
router.get('/:orderId/download', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.product', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Buyurtma topilmadi'
      });
    }

    // Check permissions
    if (order.user && order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Ruxsat yo\'q'
      });
    }

    const invoiceHTML = generateInvoiceHTML(order);
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${order.orderNumber}.html"`);
    res.send(invoiceHTML);
  } catch (error) {
    console.error('Error downloading invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Xatolik yuz berdi',
      error: error.message
    });
  }
});

export default router;
