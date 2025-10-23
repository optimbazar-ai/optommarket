import cron from 'node-cron';
import Product from '../models/Product.js';
import telegramService from '../services/telegramService.js';
import geminiService from '../services/geminiService.js';

class DailyProductPromotion {
  constructor() {
    this.isRunning = false;
    this.marketingMessages = [
      '🔥 Bugungi maxsus taklif!',
      '⚡ Chegirmalar davom etmoqda!',
      '🎯 Optom narxlarda xarid qiling!',
      '💎 Sifatli mahsulotlar!',
      '🚀 Tez buyurtma bering!',
      '🌟 Eng yaxshi takliflar!',
      '💰 Tejamkor narxlar!',
      '📦 Tezkor yetkazib berish!'
    ];
  }

  start() {
    // Har kuni soat 10:00, 14:00 va 18:00 da ishga tushadi
    // Kuniga 3 marta mahsulot e'lon qilish
    const schedules = [
      { time: '0 10 * * *', label: 'Ertalabki' },
      { time: '0 14 * * *', label: 'Tushlik' },
      { time: '0 18 * * *', label: 'Kechki' }
    ];

    schedules.forEach(schedule => {
      cron.schedule(schedule.time, async () => {
        if (this.isRunning) {
          console.log('⏳ Mahsulot promotion allaqachon ishlamoqda...');
          return;
        }

        this.isRunning = true;
        console.log(`🚀 ${schedule.label} mahsulot promotion boshlandi:`, new Date().toLocaleString('uz-UZ'));

        try {
          await this.promoteProducts();
        } catch (error) {
          console.error('❌ Mahsulot promotion xatolik:', error);
          
          await telegramService.sendMessage(
            `⚠️ <b>Xatolik!</b>\n\n` +
            `Mahsulot promotion da muammo yuz berdi:\n` +
            `${error.message}`
          );
        } finally {
          this.isRunning = false;
        }
      }, {
        timezone: 'Asia/Tashkent'
      });
    });

    console.log('⏰ Kunlik mahsulot promotion ishga tushdi (10:00, 14:00, 18:00)');
  }

  async promoteProducts() {
    try {
      // 1. Avval yangi mahsulotlarni tekshirish (oxirgi 24 soatda qo'shilgan)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let products = await Product.find({
        createdAt: { $gte: yesterday },
        active: true,
        approvalStatus: 'approved',
        stock: { $gt: 0 }
      })
        .populate('category', 'name')
        .populate('createdBy', 'name companyName')
        .sort({ createdAt: -1 })
        .limit(3);

      // 2. Agar yangi mahsulot bo'lmasa, eng ko'p ko'rilgan yoki featured mahsulotlarni tanlash
      if (products.length === 0) {
        console.log('📦 Yangi mahsulot topilmadi, featured/popular mahsulotlarni tanlaymiz...');
        
        products = await Product.find({
          active: true,
          approvalStatus: 'approved',
          stock: { $gt: 0 }
        })
          .populate('category', 'name')
          .populate('createdBy', 'name companyName')
          .sort({ featured: -1, viewCount: -1, soldCount: -1 })
          .limit(3);
      }

      if (products.length === 0) {
        console.log('❌ Hech qanday mahsulot topilmadi');
        return;
      }

      console.log(`✓ ${products.length} ta mahsulot tanlandi`);

      // 3. Har bir mahsulot uchun marketing xabari yaratish va yuborish
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        
        try {
          // AI bilan marketing xabari yaratish
          const marketingText = await this.generateMarketingText(product);
          
          // Telegram ga yuborish
          await this.sendProductWithMarketing(product, marketingText);
          
          // API cheklashlarini oldini olish uchun kutish
          if (i < products.length - 1) {
            await this.delay(3000);
          }
        } catch (error) {
          console.error(`Mahsulot ${product.name} yuborishda xatolik:`, error.message);
        }
      }

      console.log(`✅ ${products.length} ta mahsulot muvaffaqiyatli e'lon qilindi`);

      // 4. Kunlik statistika yuborish
      await this.sendDailyStats(products);

    } catch (error) {
      console.error('Mahsulot promotion xatolik:', error);
      throw error;
    }
  }

  async generateMarketingText(product) {
    try {
      const prompt = `
Quyidagi mahsulot uchun qisqa va ta'sirchan marketing matni yozing (o'zbek tilida):

Mahsulot nomi: ${product.name}
Tavsif: ${product.description}
Narx: ${product.price} so'm
Kategoriya: ${product.category?.name || 'Umumiy'}

Talablar:
- 2-3 ta qisqa jumla
- Jozibali va ta'sirchan bo'lsin
- Xaridorni qiziqtirsin
- Emoji ishlatish mumkin
- Faqat matnni qaytaring, boshqa hech narsa yo'q

Misol: "🔥 Ajoyib sifat va arzon narx! Optom xaridlarda maxsus chegirmalar. Bugun buyurtma bering va tejang!"
`;

      const response = await geminiService.generateChatResponse([
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]);

      return response.trim();
    } catch (error) {
      console.error('AI marketing text generation xatolik:', error);
      // Agar AI ishlamasa, standart xabar qaytarish
      return this.getRandomMarketingMessage();
    }
  }

  async sendProductWithMarketing(product, marketingText) {
    if (!telegramService.initialized) {
      console.warn('Telegram bot initialized emas');
      return;
    }

    try {
      // Marketing xabari bilan mahsulot formatini yaratish
      const isNew = this.isNewProduct(product);
      const badge = isNew ? '🆕 YANGI MAHSULOT!' : '⭐ TAVSIYA QILAMIZ!';
      
      const title = `${badge}\n\n<b>${product.name}</b>`;
      const marketing = `\n\n${marketingText}`;
      const description = product.description 
        ? `\n\n📝 ${product.description.substring(0, 200)}${product.description.length > 200 ? '...' : ''}`
        : '';
      
      const price = `\n\n💰 <b>Narx:</b> ${product.price.toLocaleString('uz-UZ')} so'm`;
      
      const wholesalePrice = product.wholesalePrice 
        ? `\n💎 <b>Optom narx:</b> ${product.wholesalePrice.toLocaleString('uz-UZ')} so'm`
        : '';
      
      const minOrder = product.minOrderQuantity > 1
        ? `\n📦 <b>Minimum:</b> ${product.minOrderQuantity} ${product.unit || 'dona'}`
        : '';
      
      const stock = `\n📊 <b>Omborda:</b> ${product.stock} ${product.unit || 'dona'}`;
      
      const category = product.category?.name 
        ? `\n\n📁 Kategoriya: <i>${product.category.name}</i>`
        : '';
      
      const seller = product.createdBy?.companyName 
        ? `\n🏢 Sotuvchi: <i>${product.createdBy.companyName}</i>`
        : '';
      
      const link = `\n\n🛒 <a href="${process.env.FRONTEND_URL || 'https://optommarket.uz'}/products/${product._id}">Buyurtma berish →</a>`;
      
      const hashtags = `\n\n#OptoMarket #OptomSavdo #Uzbekistan`;
      
      const message = `${title}${marketing}${description}${price}${wholesalePrice}${minOrder}${stock}${category}${seller}${link}${hashtags}`;

      // Rasm bilan yoki rasmsiz yuborish
      if (product.images && product.images.length > 0) {
        const imageUrl = product.images[0].startsWith('http') 
          ? product.images[0]
          : `${process.env.BACKEND_URL || 'http://localhost:5000'}${product.images[0]}`;
        
        await telegramService.bot.sendPhoto(telegramService.chatId, imageUrl, {
          caption: message,
          parse_mode: 'HTML'
        });
      } else {
        await telegramService.bot.sendMessage(telegramService.chatId, message, {
          parse_mode: 'HTML'
        });
      }

      console.log(`✓ Mahsulot "${product.name}" marketing bilan yuborildi`);
    } catch (error) {
      console.error('Telegram mahsulot yuborishda xatolik:', error);
      throw error;
    }
  }

  async sendDailyStats(products) {
    try {
      const totalProducts = await Product.countDocuments({ 
        active: true, 
        approvalStatus: 'approved' 
      });
      
      const newToday = await Product.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        active: true,
        approvalStatus: 'approved'
      });

      const statsMessage = `
📊 <b>Bugungi statistika</b>

✅ E'lon qilingan: ${products.length} ta mahsulot
🆕 Bugun qo'shilgan: ${newToday} ta
📦 Jami mahsulotlar: ${totalProducts} ta

🌐 <a href="${process.env.FRONTEND_URL || 'https://optommarket.uz'}">OptoMarket.uz</a> - Ishonchli optom savdo platformasi!
      `.trim();

      await telegramService.sendMessage(statsMessage);
    } catch (error) {
      console.error('Statistika yuborishda xatolik:', error);
    }
  }

  isNewProduct(product) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return product.createdAt >= yesterday;
  }

  getRandomMarketingMessage() {
    return this.marketingMessages[Math.floor(Math.random() * this.marketingMessages.length)];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Manual ravishda ishga tushirish uchun
  async runNow() {
    if (this.isRunning) {
      console.log('⏳ Mahsulot promotion allaqachon ishlamoqda...');
      return { success: false, message: 'Already running' };
    }

    this.isRunning = true;
    console.log('🚀 Manual mahsulot promotion boshlandi');

    try {
      await this.promoteProducts();
      return { success: true };
    } catch (error) {
      console.error('❌ Manual promotion xatolik:', error);
      return { success: false, message: error.message };
    } finally {
      this.isRunning = false;
    }
  }
}

const dailyProductPromotion = new DailyProductPromotion();
export default dailyProductPromotion;
