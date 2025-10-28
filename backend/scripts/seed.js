import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const categories = [
  {
    name: 'Elektronika',
    slug: 'elektronika',
    description: 'Kompyuter, telefon va boshqa elektronika',
    icon: '💻'
  },
  {
    name: 'Kiyim-kechak',
    slug: 'kiyim-kechak',
    description: 'Erkaklar, ayollar va bolalar kiyimi',
    icon: '👕'
  },
  {
    name: 'Oziq-ovqat',
    slug: 'oziq-ovqat',
    description: 'Mahsulotlar va ichimliklar',
    icon: '🍎'
  },
  {
    name: 'Maishiy texnika',
    slug: 'maishiy-texnika',
    description: 'Uy uchun texnika va asboblar',
    icon: '🏠'
  },
  {
    name: 'Qurilish materiallari',
    slug: 'qurilish-materiallari',
    description: 'Bino va ta\'mirlash uchun materiallar',
    icon: '🔨'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    try {
      await Category.collection.drop();
      console.log('✓ Dropped categories collection');
    } catch (err) {
      if (err.code !== 26) console.log('Categories collection does not exist');
    }
    
    try {
      await Product.collection.drop();
      console.log('✓ Dropped products collection');
    } catch (err) {
      if (err.code !== 26) console.log('Products collection does not exist');
    }
    
    try {
      await User.collection.drop();
      console.log('✓ Dropped users collection');
    } catch (err) {
      if (err.code !== 26) console.log('Users collection does not exist');
    }
    
    console.log('✓ Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✓ Created ${createdCategories.length} categories`);

    // Create sample products
    const products = [
      {
        name: 'Samsung Galaxy S24',
        description: 'Eng yangi Samsung flagman telefoni, 256GB xotira',
        price: 12000000,
        wholesalePrice: 11000000,
        category: createdCategories[0]._id,
        stock: 50,
        minOrderQuantity: 5,
        unit: 'dona',
        brand: 'Samsung',
        featured: true,
        images: ['https://via.placeholder.com/400x400?text=Samsung+S24']
      },
      {
        name: 'Apple iPhone 15 Pro',
        description: 'iPhone 15 Pro, 512GB, Titanum Blue',
        price: 18000000,
        wholesalePrice: 17000000,
        category: createdCategories[0]._id,
        stock: 30,
        minOrderQuantity: 3,
        unit: 'dona',
        brand: 'Apple',
        featured: true,
        images: ['https://via.placeholder.com/400x400?text=iPhone+15+Pro']
      },
      {
        name: 'Erkaklar ko\'ylagi',
        description: 'Klassik erkaklar ko\'ylagi, 100% paxta',
        price: 150000,
        wholesalePrice: 120000,
        category: createdCategories[1]._id,
        stock: 200,
        minOrderQuantity: 10,
        unit: 'dona',
        brand: 'Local Brand',
        images: ['https://via.placeholder.com/400x400?text=Koylak']
      },
      {
        name: 'Non mahsulotlari to\'plami',
        description: 'Turli xil nonlar va shirinliklar',
        price: 50000,
        wholesalePrice: 40000,
        category: createdCategories[2]._id,
        stock: 100,
        minOrderQuantity: 20,
        unit: 'quti',
        featured: true,
        images: ['https://via.placeholder.com/400x400?text=Non']
      },
      {
        name: 'Sovutgich Samsung',
        description: 'Ikki kamerali sovutgich, 350L hajm',
        price: 5000000,
        wholesalePrice: 4500000,
        category: createdCategories[3]._id,
        stock: 20,
        minOrderQuantity: 2,
        unit: 'dona',
        brand: 'Samsung',
        images: ['https://via.placeholder.com/400x400?text=Sovutgich']
      },
      {
        name: 'Sement M500',
        description: 'Yuqori sifatli qurilish sementi',
        price: 45000,
        wholesalePrice: 40000,
        category: createdCategories[4]._id,
        stock: 500,
        minOrderQuantity: 50,
        unit: 'kg',
        images: ['https://via.placeholder.com/400x400?text=Sement']
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✓ Created ${createdProducts.length} products`);

    // Create test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@optommarket.uz',
      password: 'test123',
      phone: '+998901234567',
      role: 'seller',
      companyName: 'Test Company LLC'
    });
    console.log('✓ Created test user (email: test@optommarket.uz, password: test123)');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('Email: test@optommarket.uz');
    console.log('Password: test123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
