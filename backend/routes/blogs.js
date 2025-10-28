const express = require('express');
const router = express.Router();
const { Blog } = require('../models/mongodb');
const { triggerBlogGeneration } = require('../services/scheduler');

// Get all blogs (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    if (!Blog) {
      return res.status(503).json({ 
        error: 'MongoDB not connected',
        blogs: []
      });
    }
    
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');
    
    const total = await Blog.countDocuments({ published: true });
    
    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    if (!Blog) {
      return res.status(503).json({ error: 'MongoDB not connected' });
    }
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Manual trigger blog generation (admin only - add auth middleware later)
router.post('/generate', async (req, res) => {
  try {
    const blog = await triggerBlogGeneration();
    
    if (!blog) {
      return res.status(500).json({ error: 'Blog generation failed' });
    }
    
    res.json({
      message: 'Blog generated successfully',
      blog
    });
  } catch (error) {
    console.error('Generate blog error:', error);
    res.status(500).json({ error: 'Failed to generate blog' });
  }
});

// Like a blog
router.post('/:id/like', async (req, res) => {
  try {
    if (!Blog) {
      return res.status(503).json({ error: 'MongoDB not connected' });
    }
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    blog.likes += 1;
    await blog.save();
    
    res.json({ likes: blog.likes });
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({ error: 'Failed to like blog' });
  }
});

module.exports = router;
