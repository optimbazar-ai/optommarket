import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';

dotenv.config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    const existingCount = await Category.countDocuments();
    
    if (existingCount > 0) {
      console.log(`✓ Already have ${existingCount} categories`);
      process.exit(0);
    }

    const categories = [
      {
        name: 'Oziq-ovqat',
        slug: 'oziq-ovqat',
        description: 'Oziq-ovqat mahsulotlari'
      },
      {
        name: 'Ichimliklar',
        slug: 'ichimliklar',
        description: 'Ichimlik mahsulotlari'
      },
      {
        name: 'Uy-ro\'zg\'or',
        slug: 'uy-rozgor',
        description: 'Uy-ro\'zg\'or tovarlari'
      },
      {
        name: 'Elektronika',
        slug: 'elektronika',
        description: 'Elektronika mahsulotlari'
      }
    ];

    await Category.insertMany(categories);

    console.log(`✅ Created ${categories.length} categories successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedCategories();
