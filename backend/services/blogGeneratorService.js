import geminiService from './geminiService.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';
import telegramService from './telegramService.js';

class BlogGeneratorService {
  constructor() {
    this.topics = [
      'Optom savdoda muvaffaqiyat sirlari',
      'Kichik biznesni qanday boshlash mumkin',
      'Optom narxlarda chegirmalar olish yo\'llari',
      'Mahsulot sifatini qanday tekshirish kerak',
      'Yetkazib berish xizmatlari va tanlash ko\'rsatmalari',
      'Onlayn optom savdo platformalari afzalliklari',
      'Mijozlar bilan ishlash sirlar va maslahatlar',
      'Moliyaviy hisobni to\'g\'ri yuritish',
      'Marketing strategiyalari optom savdo uchun',
      'Inventar boshqaruvining eng yaxshi usullari',
      'Elektron tijoratda raqobat ustunligi',
      'Mahsulot tanlash va assortiment shakllantirish',
      'Narx belgilash strategiyalari',
      'Biznes rivojlantirish bosqichlari',
      'Raqamli marketing vositalari',
      'Xaridorlar loyalligini oshirish',
      'Savdo jarayonini avtomatlashtirish',
      'Logistika va omborxona boshqaruvi',
      'Sotish hajmini oshirish usullari',
      'Biznes rejalashtirish asoslari'
    ];

    this.categories = [
      'Biznes',
      'Marketing',
      'Moliya',
      'Logistika',
      'Texnologiya',
      'Maslahatlar',
      'Yangiliklar'
    ];
  }

  async generateDailyPosts(count = 5) {
    console.log(`🤖 ${count} ta blog post yaratilmoqda...`);
    
    const results = [];
    const adminUser = await this.getAdminUser();

    if (!adminUser) {
      console.error('❌ Admin foydalanuvchi topilmadi');
      return results;
    }

    for (let i = 0; i < count; i++) {
      try {
        const topic = this.getRandomTopic();
        const category = this.getRandomCategory();
        
        console.log(`📝 Post ${i + 1}/${count}: ${topic}`);
        
        const post = await this.generatePost(topic, category, adminUser._id);
        
        if (post) {
          results.push(post);
          
          // Telegram kanalga yuborish
          await telegramService.sendBlogPost(post);
          
          // API cheklashlarini oldini olish uchun kutish
          await this.delay(2000);
        }
      } catch (error) {
        console.error(`Post ${i + 1} yaratishda xatolik:`, error.message);
      }
    }

    console.log(`✅ ${results.length}/${count} ta post muvaffaqiyatli yaratildi va nashr qilindi`);
    return results;
  }

  async generatePost(topic, category, authorId) {
    try {
      // Gemini AI dan maqola yaratish
      const content = await this.generateContent(topic, category);
      
      if (!content) {
        throw new Error('AI content yaratmadi');
      }

      // Slug yaratish
      const slug = this.createSlug(content.title);

      // Blog post yaratish
      const post = await Blog.create({
        title: content.title,
        slug: slug,
        content: content.body,
        excerpt: content.excerpt,
        category: category,
        tags: content.tags || [],
        author: authorId,
        published: true,
        metaDescription: content.excerpt.substring(0, 160)
      });

      console.log(`✓ Post yaratildi: ${post.title}`);
      return post;
    } catch (error) {
      console.error('Post yaratishda xatolik:', error);
      throw error;
    }
  }

  async generateContent(topic, category) {
    const prompt = `
Optom savdo platformasi OptomMarket.uz uchun "${topic}" mavzusida professional blog maqola yozing.

Talablar:
- Maqola o'zbek tilida bo'lishi kerak
- Kategoriya: ${category}
- Jami 800-1200 so'zdan iborat bo'lsin
- Qisqacha mazmun (excerpt) 150-200 belgi
- 3-5 ta kalit so'z (tags)
- Maqola qiziqarli, foydali va professional bo'lishi kerak
- Optom savdo, biznes rivojlantirish, elektron tijorat mavzulariga tegishli bo'lsin

Javobni quyidagi JSON formatida bering:
{
  "title": "Maqola sarlavhasi",
  "excerpt": "Qisqacha mazmun",
  "body": "To'liq maqola matni (HTML teglar bilan)",
  "tags": ["tag1", "tag2", "tag3"]
}
`;

    try {
      const response = await geminiService.generateChatResponse([
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]);

      // JSON ni parse qilish
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI javobida JSON topilmadi');
      }

      const content = JSON.parse(jsonMatch[0]);
      return content;
    } catch (error) {
      console.error('AI content generation xatolik:', error);
      throw error;
    }
  }

  createSlug(title) {
    const timestamp = Date.now();
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
    
    return `${baseSlug}-${timestamp}`;
  }

  getRandomTopic() {
    return this.topics[Math.floor(Math.random() * this.topics.length)];
  }

  getRandomCategory() {
    return this.categories[Math.floor(Math.random() * this.categories.length)];
  }

  async getAdminUser() {
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.warn('Admin topilmadi, birinchi foydalanuvchidan foydalanamiz');
      admin = await User.findOne();
    }

    return admin;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const blogGeneratorService = new BlogGeneratorService();
export default blogGeneratorService;
