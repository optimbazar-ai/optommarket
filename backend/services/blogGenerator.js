const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Blog } = require('../models/mongodb');

// Blog topics for wholesale/retail business
const blogTopics = [
  'Optom savdo biznesini qanday boshlash mumkin',
  'Kichik biznes uchun mahsulot tanlash maslahatlari',
  'Onlayn savdo platformalaridan foydalanish',
  'Mahsulot sifatini qanday tekshirish kerak',
  'Yetkazib berish xizmatlarini tashkil qilish',
  'Mijozlar bilan ishlash san\'ati',
  'Inventar boshqaruvi: samarali usullar',
  'Kichik biznes uchun marketing strategiyalari',
  'Raqamli to\'lov tizimlari va ularning afzalliklari',
  'Mahsulot narxlarini to\'g\'ri belgilash',
  'Savdo biznesida tez-tez uchraydigan xatolar',
  'Mahsulot ta\'minoti: ishonchli yetkazib beruvchilarni topish'
];

// Generate blog post using AI
const generateBlogPost = async (topic) => {
  const apiKey = process.env.GEMINI_API_KEY?.split(',')[0]?.trim();
  if (!apiKey) {
    console.log('⚠️  GEMINI_API_KEY not configured - Blog generation failed');
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `
O'zbek tilida professional blog post yozing:

Mavzu: "${topic}"

Talablar:
- 800-1200 so'z hajmida
- Kirish, asosiy qism va xulosa bo'limlari bo'lsin
- Praktik maslahat va misollar bering
- SEO uchun optimallashtiring
- Professional va tushunarli tilda yozing
- Emoji ishlatish mumkin (5-7 ta)

Format:
Faqat blog matnini yozing, sarlavha kerak emas (u avtomatik qo'shiladi).
`.trim();

  try {
    console.log(`📝 Generating blog: "${topic}"`);
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();
    
    // Generate excerpt (first 2 sentences)
    const sentences = content.split(/[.!?]+\s/).filter(s => s.length > 20);
    const excerpt = sentences.slice(0, 2).join('. ') + '.';
    
    // Extract tags from topic
    const tags = topic
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 5);
    
    console.log('✅ Blog generated successfully');
    
    return {
      title: topic,
      content,
      excerpt,
      tags,
      author: 'OPTOMMARKET AI',
      published: true
    };
  } catch (error) {
    console.error('✗ Blog generation failed:', error.message);
    return null;
  }
};

// Generate and save daily blog
const generateDailyBlog = async () => {
  try {
    console.log('📅 Starting daily blog generation...');
    
    // Check MongoDB connection
    if (!Blog) {
      console.log('⚠️  MongoDB not connected - Blog generation skipped');
      return;
    }
    
    // Get random topic
    const topic = blogTopics[Math.floor(Math.random() * blogTopics.length)];
    
    // Check if blog with this topic already exists
    const existingBlog = await Blog.findOne({ title: topic });
    if (existingBlog) {
      console.log('ℹ️  Blog with this topic already exists - Skipping');
      return;
    }
    
    // Generate blog
    const blogData = await generateBlogPost(topic);
    if (!blogData) {
      console.log('⚠️  Blog generation failed');
      return;
    }
    
    // Save to database
    const blog = new Blog(blogData);
    await blog.save();
    
    console.log('✅ Daily blog saved to database');
    console.log(`📰 Title: ${blog.title}`);
    console.log(`📝 Content length: ${blog.content.length} characters`);
    
    return blog;
  } catch (error) {
    console.error('✗ Daily blog generation error:', error.message);
    return null;
  }
};

module.exports = {
  generateDailyBlog,
  generateBlogPost
};
