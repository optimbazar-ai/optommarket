import cron from 'node-cron';
import blogGeneratorService from '../services/blogGeneratorService.js';
import telegramService from '../services/telegramService.js';

class DailyBlogGenerator {
  constructor() {
    this.isRunning = false;
  }

  start() {
    // Har kuni soat 09:00 da ishga tushadi (Toshkent vaqti bo'yicha)
    // Format: second minute hour day month weekday
    cron.schedule('0 9 * * *', async () => {
      if (this.isRunning) {
        console.log('⏳ Blog generation allaqachon ishlamoqda...');
        return;
      }

      this.isRunning = true;
      console.log('🚀 Kunlik blog post generation boshlandi:', new Date().toLocaleString('uz-UZ'));

      try {
        // 5 ta post yaratish
        const posts = await blogGeneratorService.generateDailyPosts(5);
        
        // Natijani Telegram ga yuborish
        if (posts.length > 0) {
          await telegramService.sendMessage(
            `✅ <b>Kunlik blog yangilanishi</b>\n\n` +
            `${posts.length} ta yangi maqola yaratildi va nashr qilindi!\n\n` +
            `📅 Sana: ${new Date().toLocaleDateString('uz-UZ')}\n` +
            `⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`
          );
        }
      } catch (error) {
        console.error('❌ Kunlik blog generation xatolik:', error);
        
        // Xatolik haqida Telegram ga xabar
        await telegramService.sendMessage(
          `⚠️ <b>Xatolik!</b>\n\n` +
          `Kunlik blog yaratishda muammo yuz berdi:\n` +
          `${error.message}`
        );
      } finally {
        this.isRunning = false;
      }
    }, {
      timezone: 'Asia/Tashkent'
    });

    console.log('⏰ Kunlik blog generator ishga tushdi (har kuni 09:00 da)');
  }

  // Manual ravishda ishga tushirish uchun
  async runNow() {
    if (this.isRunning) {
      console.log('⏳ Blog generation allaqachon ishlamoqda...');
      return { success: false, message: 'Already running' };
    }

    this.isRunning = true;
    console.log('🚀 Manual blog generation boshlandi');

    try {
      const posts = await blogGeneratorService.generateDailyPosts(5);
      
      await telegramService.sendMessage(
        `✅ <b>Manual blog yaratish</b>\n\n` +
        `${posts.length} ta yangi maqola yaratildi!\n\n` +
        `📅 ${new Date().toLocaleDateString('uz-UZ')} ${new Date().toLocaleTimeString('uz-UZ')}`
      );

      return { success: true, posts };
    } catch (error) {
      console.error('❌ Manual blog generation xatolik:', error);
      return { success: false, message: error.message };
    } finally {
      this.isRunning = false;
    }
  }
}

const dailyBlogGenerator = new DailyBlogGenerator();
export default dailyBlogGenerator;
