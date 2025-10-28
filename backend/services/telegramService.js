import TelegramBot from 'node-telegram-bot-api';

class TelegramService {
  constructor() {
    this.bot = null;
    this.chatId = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHANNEL_ID;

    if (!token || !chatId) {
      console.warn('⚠️ Telegram bot sozlamalari topilmadi. .env faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHANNEL_ID ni belgilang.');
      return;
    }

    try {
      this.bot = new TelegramBot(token, { polling: false });
      this.chatId = chatId;
      this.initialized = true;
      console.log('✓ Telegram bot initialized');
    } catch (error) {
      console.error('Telegram bot initialization error:', error);
    }
  }

  async sendBlogPost(post) {
    if (!this.initialized) {
      console.warn('Telegram bot initialized emas. Post yuborilmadi.');
      return { success: false, message: 'Bot not initialized' };
    }

    try {
      const message = this.formatBlogPost(post);
      
      if (post.image) {
        // Send with image
        await this.bot.sendPhoto(this.chatId, post.image, {
          caption: message,
          parse_mode: 'HTML'
        });
      } else {
        // Send text only
        await this.bot.sendMessage(this.chatId, message, {
          parse_mode: 'HTML'
        });
      }

      console.log(`✓ Blog post "${post.title}" Telegram kanalga yuborildi`);
      return { success: true };
    } catch (error) {
      console.error('Telegram post yuborishda xatolik:', error);
      return { success: false, message: error.message };
    }
  }

  formatBlogPost(post) {
    const title = `<b>${post.title}</b>`;
    const excerpt = post.excerpt || post.content.substring(0, 200) + '...';
    const category = post.category ? `\n\n📁 Kategoriya: <i>${post.category}</i>` : '';
    const baseUrl = (process.env.FRONTEND_URL || 'https://optommarket.uz').replace(/\/$/, '');
    const link = `\n\n🔗 <a href="${baseUrl}/blog/${post.slug}">Batafsil o'qish</a>`;
    
    return `${title}\n\n${excerpt}${category}${link}`;
  }

  async sendProduct(product) {
    if (!this.initialized) {
      console.warn('Telegram bot initialized emas. Mahsulot yuborilmadi.');
      return { success: false, message: 'Bot not initialized' };
    }

    try {
      const message = this.formatProduct(product);
      
      if (product.images && product.images.length > 0) {
        // Send with image
        await this.bot.sendPhoto(this.chatId, product.images[0], {
          caption: message,
          parse_mode: 'HTML'
        });
      } else {
        // Send text only
        await this.bot.sendMessage(this.chatId, message, {
          parse_mode: 'HTML'
        });
      }

      console.log(`✓ Mahsulot "${product.name}" Telegram kanalga yuborildi`);
      return { success: true };
    } catch (error) {
      console.error('Telegram mahsulot yuborishda xatolik:', error);
      return { success: false, message: error.message };
    }
  }

  formatProduct(product) {
    const title = `🆕 <b>${product.name}</b>`;
    const description = product.description ? `\n\n${product.description.substring(0, 250)}...` : '';
    const price = `\n\n💰 <b>Narx:</b> ${product.price.toLocaleString('uz-UZ')} so'm`;
    const minOrder = product.minOrderQuantity ? `\n📦 <b>Minimum buyurtma:</b> ${product.minOrderQuantity} dona` : '';
    const category = product.category?.name ? `\n\n📁 <i>${product.category.name}</i>` : '';
    const baseUrl = (process.env.FRONTEND_URL || 'https://optommarket.uz').replace(/\/$/, '');
    const link = `\n\n🛒 <a href="${baseUrl}/products/${product._id}">Buyurtma berish</a>`;
    
    return `${title}${description}${price}${minOrder}${category}${link}`;
  }

  async sendPromoCode(promo) {
    if (!this.initialized) {
      console.warn('Telegram bot initialized emas. Promo yuborilmadi.');
      return { success: false, message: 'Bot not initialized' };
    }

    try {
      const message = this.formatPromoCode(promo);
      
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'HTML'
      });

      console.log(`✓ Promo kod "${promo.code}" Telegram kanalga yuborildi`);
      return { success: true };
    } catch (error) {
      console.error('Telegram promo yuborishda xatolik:', error);
      return { success: false, message: error.message };
    }
  }

  formatPromoCode(promo) {
    const emoji = '🎁';
    const title = `${emoji} <b>YANGI CHEGIRMA!</b>`;
    const code = `\n\n🎫 Promo kod: <code>${promo.code}</code>`;
    const discount = promo.discountType === 'percentage' 
      ? `\n💯 Chegirma: <b>${promo.discountValue}%</b>`
      : `\n💰 Chegirma: <b>${promo.discountValue.toLocaleString('uz-UZ')} so'm</b>`;
    const minAmount = promo.minOrderAmount ? `\n\n📊 Minimal buyurtma: ${promo.minOrderAmount.toLocaleString('uz-UZ')} so'm` : '';
    const validUntil = promo.validUntil 
      ? `\n\n⏰ Amal qilish muddati: ${new Date(promo.validUntil).toLocaleDateString('uz-UZ')}`
      : '';
    const description = promo.description ? `\n\n📝 ${promo.description}` : '';
    const baseUrl = (process.env.FRONTEND_URL || 'https://optommarket.uz').replace(/\/$/, '');
    const link = `\n\n🛍️ <a href="${baseUrl}/products">Xarid qilish</a>`;
    
    return `${title}${code}${discount}${minAmount}${validUntil}${description}${link}`;
  }

  async sendMessage(text) {
    if (!this.initialized) {
      console.warn('Telegram bot initialized emas.');
      return { success: false };
    }

    try {
      await this.bot.sendMessage(this.chatId, text, { parse_mode: 'HTML' });
      return { success: true };
    } catch (error) {
      console.error('Telegram message yuborishda xatolik:', error);
      return { success: false, message: error.message };
    }
  }
}

const telegramService = new TelegramService();
export default telegramService;
