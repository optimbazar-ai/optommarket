import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createSeller = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const existingSeller = await User.findOne({ email: 'seller@optommarket.uz' });
    
    if (existingSeller) {
      console.log('❌ Seller user already exists!');
      console.log('Email: seller@optommarket.uz');
      process.exit(1);
    }

    const seller = await User.create({
      name: 'Test Sotuvchi',
      email: 'seller@optommarket.uz',
      password: 'seller123',
      role: 'seller',
      phone: '+998901234567',
      companyName: 'Test Company'
    });

    console.log('✅ Seller user created successfully!');
    console.log('Email: seller@optommarket.uz');
    console.log('Password: seller123');
    console.log('Role: seller');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createSeller();
