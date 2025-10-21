const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0, category, search } = req.query;

    let products;
    if (search) {
      products = await Product.search(search);
    } else if (category) {
      products = await Product.getByCategory(category);
    } else {
      products = await Product.getAll(parseInt(limit), parseInt(offset));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get low stock products (admin only)
router.get('/stock/low', verifyToken, isAdmin, async (req, res) => {
  try {
    const { threshold = 10 } = req.query;
    const products = await Product.getLowStock(parseInt(threshold));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
