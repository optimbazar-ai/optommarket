import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Guest orders allowed
  },
  orderNumber: {
    type: String,
    unique: true,
    required: false // Will be auto-generated
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    total: Number
  }],
  customerInfo: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/
    },
    phone: {
      type: String,
      required: true,
      match: /^\+998\d{9}$/
    }
  },
  shippingAddress: {
    region: {
      type: String,
      required: true
    },
    regionCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    postalCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['click', 'payme', 'cash'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  shippingPrice: {
    type: Number,
    default: 0
  },
  notes: String,
  paymentUrl: String,
  paidAt: Date,
  deliveredAt: Date
}, {
  timestamps: true
});

// Generate order number before validation
orderSchema.pre('validate', async function(next) {
  if (this.isNew && !this.orderNumber) {
    try {
      const count = await mongoose.model('Order').countDocuments();
      this.orderNumber = `ORD-${Date.now()}-${String(count + 1).padStart(5, '0')}`;
      console.log('✅ Generated order number:', this.orderNumber);
    } catch (error) {
      console.error('❌ Error generating order number:', error);
    }
  }
  next();
});

// Calculate item totals
orderSchema.pre('save', function(next) {
  this.items.forEach(item => {
    item.total = item.price * item.quantity;
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
