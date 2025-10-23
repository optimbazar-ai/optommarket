import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Delete existing admin
    await User.deleteOne({ email: 'admin@optommarket.uz' });
    console.log('🗑️  Old admin deleted');

    // Create new admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@optommarket.uz',
      password: 'admin123',
      phone: '+998901234567',
      role: 'admin',
      companyName: 'OptoMarket Administration'
    });

    console.log('✅ Admin user reset successfully!');
    console.log('\nNew Admin Credentials:');
    console.log('Email: admin@optommarket.uz');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password in production!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting admin user:', error);
    process.exit(1);
  }
};

resetAdmin();
