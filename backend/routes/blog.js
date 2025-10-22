import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /api/blog - Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-__v');

    const total = await Blog.countDocuments({ published: true });

    res.json({
      success: true,
      data: blogs,
      total,
      hasMore: parseInt(skip) + blogs.length < total
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Blog postlarini yuklashda xatolik yuz berdi'
    });
  }
});

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    }).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post topilmadi'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Blog postni yuklashda xatolik yuz berdi'
    });
  }
});

export default router;
