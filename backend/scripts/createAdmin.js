import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@optommarket.uz' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email: admin@optommarket.uz');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@optommarket.uz',
      password: 'admin123',
      phone: '+998901234567',
      role: 'admin',
      companyName: 'OptomMarket Administration'
    });

    console.log('✅ Admin user created successfully!');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@optommarket.uz');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password in production!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
