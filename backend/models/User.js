import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer'
  },
  companyName: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    region: String,
    postalCode: String
  },
  // Seller-specific fields
  sellerInfo: {
    verified: {
      type: Boolean,
      default: false
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    inn: String, // Individual Taxpayer Number
    bankAccount: String,
    bankName: String,
    bio: String,
    commission: {
      type: Number,
      default: 10 // 10% commission
    },
    balance: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Indexes for performance
// Note: email index already created by 'unique: true'
userSchema.index({ role: 1 }); // Role-based queries
userSchema.index({ 'sellerInfo.verified': 1 }); // Verified sellers
userSchema.index({ 'sellerInfo.verificationStatus': 1 }); // Seller approval
userSchema.index({ active: 1 }); // Active users
userSchema.index({ createdAt: -1 }); // Newest users

const User = mongoose.model('User', userSchema);

export default User;
