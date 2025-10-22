import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Blog from '../models/Blog.js';
import dailyBlogGenerator from '../jobs/dailyBlogGenerator.js';
import telegramService from '../services/telegramService.js';

const router = express.Router();

// GET /api/admin/dashboard - Dashboard statistics (filtered for sellers)
router.get('/dashboard', async (req, res) => {
  try {
    let totalOrders, totalProducts, totalStock, recentOrders, lowStockProducts, totalRevenue;
    
    if (req.user.role === 'seller') {
      // Seller statistics - only their products and related orders
      const productQuery = { createdBy: req.user._id };
      
      totalProducts = await Product.countDocuments(productQuery);
      
      const stockData = await Product.aggregate([
        { $match: productQuery },
        { $group: { _id: null, total: { $sum: '$stock' } } }
      ]);
      totalStock = stockData[0]?.total || 0;
      
      lowStockProducts = await Product.find({ ...productQuery, stock: { $lt: 10 } })
        .select('name stock')
        .limit(5);
      
      // Get seller's products
      const sellerProducts = await Product.find(productQuery).select('_id');
      const productIds = sellerProducts.map(p => p._id.toString());
      
      // Get all orders and filter for seller's products
      const allOrders = await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name')
        .sort('-createdAt');
      
      const sellerOrders = allOrders.filter(order => 
        order.items.some(item => productIds.includes(item.product?._id?.toString()))
      );
      
      totalOrders = sellerOrders.length;
      recentOrders = sellerOrders.slice(0, 5);
      
      // Calculate revenue from seller's orders
      totalRevenue = sellerOrders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.totalPrice, 0);
        
    } else {
      // Admin statistics - all data
      totalOrders = await Order.countDocuments();
      const totalUsers = await User.countDocuments();
      totalProducts = await Product.countDocuments();
      
      const revenueData = await Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]);
      totalRevenue = revenueData[0]?.total || 0;
      
      const stockData = await Product.aggregate([
        { $group: { _id: null, total: { $sum: '$stock' } } }
      ]);
      totalStock = stockData[0]?.total || 0;
      
      recentOrders = await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name')
        .sort('-createdAt')
        .limit(5);
      
      lowStockProducts = await Product.find({ stock: { $lt: 10 } })
        .select('name stock')
        .limit(5);
    }
    
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          totalRevenue,
          totalProducts,
          totalStock
        },
        recentOrders,
        lowStockProducts,
        ordersByStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// GET /api/admin/products - Get all products (admin sees all, seller sees only their own)
router.get('/products', async (req, res) => {
  try {
    let query = {};
    
    // If user is seller, only show their products
    if (req.user.role === 'seller') {
      query.createdBy = req.user._id;
    }
    // Admin sees all products (no filter)
    
    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// POST /api/admin/products - Create product
router.post('/products', async (req, res) => {
  try {
    // Add createdBy field
    const productData = {
      ...req.body,
      createdBy: req.user._id
    };
    
    const product = await Product.create(productData);
    
    // Populate category for Telegram message
    await product.populate('category', 'name');
    
    // Send to Telegram channel
    await telegramService.sendProduct(product);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/products/:id', async (req, res) => {
  try {
    // Find product first to check ownership
    const existingProduct = await Product.findById(req.params.id);
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // If user is seller, check if they own this product
    if (req.user.role === 'seller' && existingProduct.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own products'
      });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    // Find product first to check ownership
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // If user is seller, check if they own this product
    if (req.user.role === 'seller' && product.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own products'
      });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// PUT /api/admin/products/:id/approve - Approve/Reject product (admin only)
router.put('/products/:id/approve', async (req, res) => {
  try {
    // Only admins can approve products
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can approve products'
      });
    }

    const { approvalStatus, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(approvalStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid approval status'
      });
    }

    const updateData = {
      approvalStatus,
      active: approvalStatus === 'approved'
    };

    if (approvalStatus === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: `Product ${approvalStatus === 'approved' ? 'approved' : 'rejected'} successfully`,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product approval status',
      error: error.message
    });
  }
});

// GET /api/admin/orders - Get all orders (admin sees all, seller sees orders with their products)
router.get('/orders', async (req, res) => {
  try {
    let orders;
    
    if (req.user.role === 'seller') {
      // Seller: Get orders that contain their products
      const sellerProducts = await Product.find({ createdBy: req.user._id }).select('_id');
      const productIds = sellerProducts.map(p => p._id.toString());
      
      // Find orders that have at least one product from this seller
      const allOrders = await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name')
        .sort('-createdAt');
      
      // Filter orders that contain seller's products
      orders = allOrders.filter(order => 
        order.items.some(item => productIds.includes(item.product?._id?.toString()))
      );
    } else {
      // Admin: Get all orders
      orders = await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name')
        .sort('-createdAt');
    }
    
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

// PUT /api/admin/orders/:id/status - Update order status
router.put('/orders/:id/status', async (req, res) => {
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
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['admin', 'seller', 'buyer'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    // Prevent deleting yourself
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }
    
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// PUT /api/admin/users/:id/verify-seller - Verify seller (admin only)
router.put('/users/:id/verify-seller', async (req, res) => {
  try {
    const { verificationStatus, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'seller') {
      return res.status(400).json({
        success: false,
        message: 'User is not a seller'
      });
    }

    user.sellerInfo = user.sellerInfo || {};
    user.sellerInfo.verificationStatus = verificationStatus;
    user.sellerInfo.verified = verificationStatus === 'approved';

    if (verificationStatus === 'rejected' && rejectionReason) {
      user.sellerInfo.rejectionReason = rejectionReason;
    }

    await user.save();

    res.json({
      success: true,
      message: `Seller ${verificationStatus === 'approved' ? 'approved' : 'rejected'} successfully`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying seller',
      error: error.message
    });
  }
});

// GET /api/admin/analytics/sales - Sales analytics
router.get('/analytics/sales', async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $match: { paymentStatus: 'paid' }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);
    
    res.json({
      success: true,
      data: salesData.map(item => ({
        date: item._id,
        orders: item.orders,
        revenue: item.revenue
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales analytics',
      error: error.message
    });
  }
});

// GET /api/admin/analytics/top-products - Top selling products
router.get('/analytics/top-products', async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          soldCount: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }
      },
      { $sort: { soldCount: -1 } },
      { $limit: 10 }
    ]);
    
    res.json({
      success: true,
      data: topProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top products',
      error: error.message
    });
  }
});

// GET /api/admin/analytics/categories - Category distribution
router.get('/analytics/categories', async (req, res) => {
  try {
    const categoryData = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$category',
          name: { $first: '$categoryInfo.name' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: categoryData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category analytics',
      error: error.message
    });
  }
});

// ==================== BLOG ROUTES ====================

// GET /api/admin/blog - Get all blog posts
router.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
});

// POST /api/admin/blog - Create blog post
router.post('/blog', async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Blog post created',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
});

// PUT /api/admin/blog/:id - Update blog post
router.put('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post updated',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
});

// DELETE /api/admin/blog/:id - Delete blog post
router.delete('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
});

// PUT /api/admin/blog/:id/publish - Toggle publish status
router.put('/blog/:id/publish', async (req, res) => {
  try {
    const { published } = req.body;
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { published },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: `Blog post ${published ? 'published' : 'unpublished'}`,
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating publish status',
      error: error.message
    });
  }
});

// POST /api/admin/blog/generate - AI blog generation
router.post('/blog/generate', async (req, res) => {
  try {
    const result = await dailyBlogGenerator.runNow();
    
    if (result.success) {
      res.json({
        success: true,
        message: `${result.posts.length} ta blog post muvaffaqiyatli yaratildi va nashr qilindi`,
        data: result.posts
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message || 'Blog generation xatolik'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AI blog generation xatolik',
      error: error.message
    });
  }
});

// ==================== ENHANCED CATEGORY ROUTES ====================

// GET /api/admin/categories - Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// POST /api/admin/categories - Create category
router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
});

// PUT /api/admin/categories/:id - Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Category updated',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
});

// DELETE /api/admin/categories/:id - Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Category deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
});

// ==================== ENHANCED USER ROUTES ====================

// GET /api/admin/users/stats - Get user statistics
router.get('/users/stats', async (req, res) => {
  try {
    const total = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const sellerCount = await User.countDocuments({ role: 'seller' });
    const buyerCount = await User.countDocuments({ role: 'buyer' });
    
    // Get new users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        total,
        adminCount,
        sellerCount,
        buyerCount,
        newUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user stats',
      error: error.message
    });
  }
});

// GET /api/admin/users/:id/orders - Get user's orders
router.get('/users/:id/orders', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate('items.product', 'name price')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user orders',
      error: error.message
    });
  }
});

// ==================== ADVANCED STATISTICS ====================

// GET /api/admin/stats/detailed - Get detailed statistics
router.get('/stats/detailed', async (req, res) => {
  try {
    // Total revenue
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;
    
    // Monthly revenue (current month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyRevenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const monthlyRevenue = monthlyRevenueData[0]?.total || 0;
    
    // Top products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          soldCount: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);
    
    // User growth (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Order trend (last 7 days)
    const orderTrend = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalRevenue,
        monthlyRevenue,
        topProducts,
        userGrowth,
        orderTrend
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching detailed stats',
      error: error.message
    });
  }
});

export default router;
