import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  wholesalePrice: {
    type: Number,
    min: [0, 'Wholesale price cannot be negative']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  minOrderQuantity: {
    type: Number,
    default: 1,
    min: [1, 'Minimum order quantity must be at least 1']
  },
  images: [{
    type: String
  }],
  videoUrl: {
    type: String,
    trim: true
  },
  unit: {
    type: String,
    enum: ['dona', 'kg', 'quti', 'metr', 'litr', 'toplam'],
    default: 'dona'
  },
  brand: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  // Seller and approval fields
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String,
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  // Sales tracking
  soldCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for search and performance
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1 }); // Category filter
productSchema.index({ price: 1 }); // Price sorting
productSchema.index({ featured: 1, active: 1 }); // Featured/active products
productSchema.index({ approvalStatus: 1 }); // Admin approval filter
productSchema.index({ createdBy: 1 }); // Seller's products
productSchema.index({ soldCount: -1 }); // Best sellers (descending)
productSchema.index({ createdAt: -1 }); // Newest products (descending)
productSchema.index({ viewCount: -1 }); // Most viewed (descending)

// Compound index for common queries
productSchema.index({ active: 1, approvalStatus: 1, category: 1 }); // Active approved products by category

const Product = mongoose.model('Product', productSchema);

export default Product;
