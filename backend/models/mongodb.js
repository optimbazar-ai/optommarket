const mongoose = require('mongoose');

// MongoDB Connection
const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('⚠️  MongoDB URI not configured - MongoDB features disabled');
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✓ MongoDB connected successfully');
    console.log(`✓ Database: ${mongoose.connection.db.databaseName}`);
    console.log(`✓ Host: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    return false;
  }
};

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  author: { type: String, default: 'OPTOMMARKET AI' },
  tags: [String],
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Promotion Schema
const promotionSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  discountPercent: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true },
  userId: { type: Number },
  productId: { type: Number },
  data: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

// Models
const Blog = mongoose.model('Blog', blogSchema);
const Promotion = mongoose.model('Promotion', promotionSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = {
  connectMongoDB,
  Blog,
  Promotion,
  Analytics,
  mongoose
};
