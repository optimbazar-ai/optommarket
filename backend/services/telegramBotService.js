import TelegramBot from 'node-telegram-bot-api';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

class TelegramBotService {
  constructor() {
    this.bot = null;
    this.initialized = false;
    this.userSessions = new Map(); // Store user conversation state
  }

  initialize() {
    if (this.initialized) return;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.warn('⚠️ Telegram bot token topilmadi');
      return;
    }

    // Faqat production da bot ishlasin (localhost da emas)
    // BACKEND_URL orqali production ni aniqlash
    const backendUrl = process.env.BACKEND_URL || '';
    const isLocalhost = backendUrl.includes('localhost') || backendUrl.includes('127.0.0.1');
    
    if (isLocalhost) {
      console.log('ℹ️ Telegram bot localhost da ishlamaydi');
      return;
    }
    
    console.log('🚀 Telegram bot production da ishga tushmoqda...');

    try {
      // Polling o'rniga webhook ishlatish (conflict oldini olish)
      this.bot = new TelegramBot(token, { 
        polling: {
          interval: 2000,
          autoStart: true,
          params: {
            timeout: 10
          }
        }
      });
      
      // Eski webhook ni o'chirish
      this.bot.deleteWebHook().then(() => {
        console.log('🗑️ Eski webhook o\'chirildi');
      }).catch(err => {
        console.log('⚠️ Webhook o\'chirish xatolik:', err.message);
      });
      
      this.initialized = true;
      this.setupCommands();
      this.setupCallbackHandlers();
      console.log('✅ Telegram interactive bot ishga tushdi');
    } catch (error) {
      console.error('❌ Telegram bot initialization error:', error);
    }
  }

  setupCommands() {
    // /start command
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const firstName = msg.from.first_name || 'Mijoz';
      
      const welcomeMessage = `
🎉 <b>Xush kelibsiz, ${firstName}!</b>

OptoMarket.uz - O'zbekistondagi №1 optom savdo platformasi!

🛍️ <b>Nima qila olasiz:</b>
• Mahsulotlarni ko'rish
• Narxlarni bilish
• Buyurtma berish
• Buyurtmani kuzatish
• Yordam olish

👇 <b>Quyidagi tugmalardan birini tanlang:</b>
      `.trim();

      const keyboard = {
        inline_keyboard: [
          [
            { text: '🛍️ Mahsulotlar', callback_data: 'products' },
            { text: '📁 Kategoriyalar', callback_data: 'categories' }
          ],
          [
            { text: '🔍 Qidirish', callback_data: 'search' },
            { text: '📦 Buyurtmalarim', callback_data: 'my_orders' }
          ],
          [
            { text: '💬 Yordam', callback_data: 'help' },
            { text: '📞 Aloqa', callback_data: 'contact' }
          ]
        ]
      };

      await this.bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    });

    // /help command
    this.bot.onText(/\/help/, async (msg) => {
      const chatId = msg.chat.id;
      
      const helpMessage = `
📖 <b>YORDAM</b>

<b>Asosiy buyruqlar:</b>
/start - Botni ishga tushirish
/products - Mahsulotlar ro'yxati
/categories - Kategoriyalar
/search - Mahsulot qidirish
/orders - Buyurtmalarim
/contact - Aloqa ma'lumotlari
/help - Yordam

<b>Qanday buyurtma berish mumkin?</b>
1️⃣ Mahsulotlarni ko'ring
2️⃣ Kerakli mahsulotni tanlang
3️⃣ "Buyurtma berish" tugmasini bosing
4️⃣ Ma'lumotlaringizni kiriting
5️⃣ Tasdiqlang!

<b>Savol-javob:</b>
Har qanday savolingiz bo'lsa, bizga yozing!
Operatorlarimiz tez orada javob berishadi.

📞 <b>Telefon:</b> +998 90 123 45 67
🌐 <b>Sayt:</b> optommarket.uz
      `.trim();

      await this.bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'HTML'
      });
    });

    // /products command
    this.bot.onText(/\/products/, async (msg) => {
      await this.showProducts(msg.chat.id);
    });

    // /categories command
    this.bot.onText(/\/categories/, async (msg) => {
      await this.showCategories(msg.chat.id);
    });

    // /search command
    this.bot.onText(/\/search/, async (msg) => {
      const chatId = msg.chat.id;
      this.userSessions.set(chatId, { state: 'searching' });
      
      await this.bot.sendMessage(chatId, 
        '🔍 Qidirmoqchi bo\'lgan mahsulot nomini yozing:', 
        { parse_mode: 'HTML' }
      );
    });

    // /orders command
    this.bot.onText(/\/orders/, async (msg) => {
      await this.showMyOrders(msg.chat.id, msg.from);
    });

    // /contact command
    this.bot.onText(/\/contact/, async (msg) => {
      const chatId = msg.chat.id;
      
      const contactMessage = `
📞 <b>ALOQA MA'LUMOTLARI</b>

🏢 <b>OptoMarket.uz</b>
O'zbekistondagi №1 optom savdo platformasi

📱 <b>Telefon:</b> +998 90 123 45 67
📧 <b>Email:</b> info@optommarket.uz
🌐 <b>Sayt:</b> https://optommarket.uz

📍 <b>Manzil:</b>
Toshkent sh., Chilonzor tumani
Bunyodkor ko'chasi, 1-uy

⏰ <b>Ish vaqti:</b>
Dushanba-Shanba: 09:00 - 18:00
Yakshanba: Dam olish

💬 <b>Telegram:</b> @OptoMarketUz
📱 <b>Instagram:</b> @optommarket.uz
      `.trim();

      await this.bot.sendMessage(chatId, contactMessage, {
        parse_mode: 'HTML'
      });
    });

    // Handle text messages (for search and chat)
    this.bot.on('message', async (msg) => {
      if (msg.text && !msg.text.startsWith('/')) {
        const chatId = msg.chat.id;
        const session = this.userSessions.get(chatId);

        if (session && session.state === 'searching') {
          await this.searchProducts(chatId, msg.text);
          this.userSessions.delete(chatId);
        } else {
          // Forward to admin (live chat)
          await this.forwardToAdmin(msg);
        }
      }
    });
  }

  setupCallbackHandlers() {
    this.bot.on('callback_query', async (query) => {
      const chatId = query.message.chat.id;
      const data = query.data;

      // Answer callback query to remove loading state
      try {
        await this.bot.answerCallbackQuery(query.id);
      } catch (error) {
        // Ignore "query too old" errors
        if (!error.message.includes('query is too old')) {
          console.error('Callback query error:', error.message);
        }
      }

      // Handle different callbacks
      if (data === 'start') {
        // Show main menu again
        const welcomeMessage = `
🎉 <b>Bosh Menyu</b>

OptoMarket.uz - O'zbekistondagi №1 optom savdo platformasi!

👇 <b>Quyidagi tugmalardan birini tanlang:</b>
        `.trim();

        const keyboard = {
          inline_keyboard: [
            [
              { text: '🛍️ Mahsulotlar', callback_data: 'products' },
              { text: '📁 Kategoriyalar', callback_data: 'categories' }
            ],
            [
              { text: '🔍 Qidirish', callback_data: 'search' },
              { text: '📦 Buyurtmalarim', callback_data: 'my_orders' }
            ],
            [
              { text: '💬 Yordam', callback_data: 'help' },
              { text: '📞 Aloqa', callback_data: 'contact' }
            ]
          ]
        };

        await this.bot.sendMessage(chatId, welcomeMessage, {
          parse_mode: 'HTML',
          reply_markup: keyboard
        });
      } else if (data === 'products') {
        await this.showProducts(chatId);
      } else if (data === 'categories') {
        await this.showCategories(chatId);
      } else if (data === 'search') {
        this.userSessions.set(chatId, { state: 'searching' });
        await this.bot.sendMessage(chatId, '🔍 Mahsulot nomini yozing:');
      } else if (data === 'my_orders') {
        await this.showMyOrders(chatId, query.from);
      } else if (data === 'help') {
        await this.bot.sendMessage(chatId, 
          '💬 Savolingizni yozing, operatorlarimiz javob berishadi!',
          { parse_mode: 'HTML' }
        );
      } else if (data === 'contact') {
        // Send contact info
        const contactMessage = `
📞 <b>ALOQA MA'LUMOTLARI</b>

🏢 <b>OptoMarket.uz</b>
O'zbekistondagi №1 optom savdo platformasi

📱 <b>Telefon:</b> +998 90 123 45 67
📧 <b>Email:</b> info@optommarket.uz
🌐 <b>Sayt:</b> https://optommarket.uz

📍 <b>Manzil:</b>
Toshkent sh., Chilonzor tumani
Bunyodkor ko'chasi, 1-uy

⏰ <b>Ish vaqti:</b>
Dushanba-Shanba: 09:00 - 18:00
Yakshanba: Dam olish

💬 <b>Telegram:</b> @OptoMarketUz
📱 <b>Instagram:</b> @optommarket.uz
        `.trim();

        await this.bot.sendMessage(chatId, contactMessage, {
          parse_mode: 'HTML'
        });
      } else if (data.startsWith('category_')) {
        const categoryId = data.replace('category_', '');
        await this.showCategoryProducts(chatId, categoryId);
      } else if (data.startsWith('product_')) {
        const productId = data.replace('product_', '');
        await this.showProductDetail(chatId, productId);
      } else if (data.startsWith('order_')) {
        const productId = data.replace('order_', '');
        await this.startOrderProcess(chatId, productId, query.from);
      }
    });
  }

  async showProducts(chatId, page = 1) {
    try {
      const limit = 10;
      const skip = (page - 1) * limit;

      console.log('🔍 Telegram bot: Mahsulotlar qidirilmoqda...');

      const products = await Product.find({ 
        active: true,
        stock: { $gt: 0 }
      })
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Product.countDocuments({ 
        active: true,
        stock: { $gt: 0 }
      });

      console.log(`📊 Topilgan mahsulotlar: ${products.length} / ${total}`);

      if (products.length === 0) {
        console.log('❌ Mahsulotlar yo\'q');
        await this.bot.sendMessage(chatId, '❌ Hozircha mahsulotlar yo\'q');
        return;
      }

      const message = `
🛍️ <b>MAHSULOTLAR</b>

Sahifa ${page} / ${Math.ceil(total / limit)}
Jami: ${total} ta mahsulot
      `.trim();

      const keyboard = {
        inline_keyboard: products.map(p => [
          { 
            text: `${p.name} - ${p.price.toLocaleString('uz-UZ')} so'm`, 
            callback_data: `product_${p._id}` 
          }
        ])
      };

      // Add pagination
      const paginationRow = [];
      if (page > 1) {
        paginationRow.push({ text: '⬅️ Oldingi', callback_data: `products_page_${page - 1}` });
      }
      if (page < Math.ceil(total / limit)) {
        paginationRow.push({ text: 'Keyingi ➡️', callback_data: `products_page_${page + 1}` });
      }
      if (paginationRow.length > 0) {
        keyboard.inline_keyboard.push(paginationRow);
      }

      keyboard.inline_keyboard.push([{ text: '🏠 Bosh menyu', callback_data: 'start' }]);

      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    } catch (error) {
      console.error('Error showing products:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi');
    }
  }

  async showCategories(chatId) {
    try {
      const categories = await Category.find({ active: true }).sort({ name: 1 });

      if (categories.length === 0) {
        await this.bot.sendMessage(chatId, '❌ Kategoriyalar topilmadi');
        return;
      }

      const message = `
📁 <b>KATEGORIYALAR</b>

Kategoriyani tanlang:
      `.trim();

      const keyboard = {
        inline_keyboard: categories.map(c => [
          { text: `📁 ${c.name}`, callback_data: `category_${c._id}` }
        ])
      };

      keyboard.inline_keyboard.push([{ text: '🏠 Bosh menyu', callback_data: 'start' }]);

      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    } catch (error) {
      console.error('Error showing categories:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi');
    }
  }

  async showCategoryProducts(chatId, categoryId) {
    try {
      const category = await Category.findById(categoryId);
      const products = await Product.find({ 
        category: categoryId,
        active: true,
        stock: { $gt: 0 }
      }).limit(10);

      if (products.length === 0) {
        await this.bot.sendMessage(chatId, `❌ ${category.name} kategoriyasida mahsulotlar yo'q`);
        return;
      }

      const message = `
📁 <b>${category.name.toUpperCase()}</b>

${category.description || ''}

Jami: ${products.length} ta mahsulot
      `.trim();

      const keyboard = {
        inline_keyboard: products.map(p => [
          { 
            text: `${p.name} - ${p.price.toLocaleString('uz-UZ')} so'm`, 
            callback_data: `product_${p._id}` 
          }
        ])
      };

      keyboard.inline_keyboard.push([{ text: '⬅️ Kategoriyalar', callback_data: 'categories' }]);

      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    } catch (error) {
      console.error('Error showing category products:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi');
    }
  }

  async showProductDetail(chatId, productId) {
    try {
      const product = await Product.findById(productId)
        .populate('category', 'name')
        .populate('createdBy', 'companyName');

      if (!product) {
        await this.bot.sendMessage(chatId, '❌ Mahsulot topilmadi');
        return;
      }

      const message = `
🛍️ <b>${product.name}</b>

${product.description}

💰 <b>Narx:</b> ${product.price.toLocaleString('uz-UZ')} so'm
${product.wholesalePrice ? `💎 <b>Optom narx:</b> ${product.wholesalePrice.toLocaleString('uz-UZ')} so'm\n` : ''}
📦 <b>Minimum:</b> ${product.minOrderQuantity || 1} ${product.unit || 'dona'}
📊 <b>Omborda:</b> ${product.stock} ${product.unit || 'dona'}
📁 <b>Kategoriya:</b> ${product.category?.name || 'N/A'}
${product.brand ? `🏷️ <b>Brend:</b> ${product.brand}\n` : ''}
${product.createdBy?.companyName ? `🏢 <b>Sotuvchi:</b> ${product.createdBy.companyName}\n` : ''}

🌐 <b>Saytda ko'rish:</b> ${process.env.FRONTEND_URL || 'https://optommarket.uz'}/products/${product._id}
      `.trim();

      const keyboard = {
        inline_keyboard: [
          [{ text: '🛒 Buyurtma berish', callback_data: `order_${product._id}` }],
          [{ text: '⬅️ Orqaga', callback_data: 'products' }]
        ]
      };

      // Send with image if available
      if (product.images && product.images.length > 0) {
        const imageUrl = product.images[0].startsWith('http') 
          ? product.images[0]
          : `${process.env.BACKEND_URL || 'http://localhost:5000'}${product.images[0]}`;

        await this.bot.sendPhoto(chatId, imageUrl, {
          caption: message,
          parse_mode: 'HTML',
          reply_markup: keyboard
        });
      } else {
        await this.bot.sendMessage(chatId, message, {
          parse_mode: 'HTML',
          reply_markup: keyboard
        });
      }
    } catch (error) {
      console.error('Error showing product detail:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi');
    }
  }

  async searchProducts(chatId, query) {
    try {
      const products = await Product.find({
        $text: { $search: query },
        active: true,
        approvalStatus: 'approved',
        stock: { $gt: 0 }
      })
        .populate('category', 'name')
        .limit(10);

      if (products.length === 0) {
        await this.bot.sendMessage(chatId, 
          `❌ "${query}" bo'yicha mahsulot topilmadi\n\n🔍 Boshqa nom bilan qidiring yoki /products ni bosing`
        );
        return;
      }

      const message = `
🔍 <b>QIDIRUV NATIJALARI</b>

"${query}" bo'yicha ${products.length} ta mahsulot topildi:
      `.trim();

      const keyboard = {
        inline_keyboard: products.map(p => [
          { 
            text: `${p.name} - ${p.price.toLocaleString('uz-UZ')} so'm`, 
            callback_data: `product_${p._id}` 
          }
        ])
      };

      keyboard.inline_keyboard.push([{ text: '🏠 Bosh menyu', callback_data: 'start' }]);

      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    } catch (error) {
      console.error('Error searching products:', error);
      await this.bot.sendMessage(chatId, '❌ Qidiruv xatolik');
    }
  }

  async startOrderProcess(chatId, productId, user) {
    try {
      const product = await Product.findById(productId);
      
      const message = `
✅ <b>BUYURTMA BERISH</b>

Mahsulot: ${product.name}
Narx: ${product.price.toLocaleString('uz-UZ')} so'm

📞 <b>Buyurtma berish uchun:</b>

1️⃣ Saytga kiring: ${process.env.FRONTEND_URL || 'https://optommarket.uz'}
2️⃣ Mahsulotni savatga qo'shing
3️⃣ Checkout qiling

yoki

📱 <b>Telefon qiling:</b> +998 90 123 45 67
💬 <b>Yozing:</b> Operatorlarimiz yordam berishadi!

Sizning Telegram: @${user.username || user.first_name}
      `.trim();

      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML'
      });

      // Notify admin
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
      if (adminChatId) {
        await this.bot.sendMessage(adminChatId, 
          `🔔 <b>Yangi buyurtma so'rovi!</b>\n\n` +
          `Mijoz: @${user.username || user.first_name}\n` +
          `Mahsulot: ${product.name}\n` +
          `Narx: ${product.price.toLocaleString('uz-UZ')} so'm`,
          { parse_mode: 'HTML' }
        );
      }
    } catch (error) {
      console.error('Error starting order:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi');
    }
  }

  async showMyOrders(chatId, user) {
    const message = `
📦 <b>BUYURTMALARIM</b>

Buyurtmalaringizni ko'rish uchun:

1️⃣ Saytga kiring: ${process.env.FRONTEND_URL || 'https://optommarket.uz'}
2️⃣ Login qiling
3️⃣ "Dashboard" ga o'ting

yoki

📱 Telefon: +998 90 123 45 67
Telegram: @${user.username || user.first_name}

Operatorlarimiz buyurtmalaringiz haqida ma'lumot berishadi!
    `.trim();

    await this.bot.sendMessage(chatId, message, {
      parse_mode: 'HTML'
    });
  }

  async forwardToAdmin(msg) {
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (!adminChatId) return;

    const userName = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
    const forwardMessage = `
💬 <b>Yangi xabar!</b>

👤 Mijoz: ${userName}
📱 Chat ID: ${msg.chat.id}

💬 Xabar:
${msg.text}
    `.trim();

    await this.bot.sendMessage(adminChatId, forwardMessage, {
      parse_mode: 'HTML'
    });

    await this.bot.sendMessage(msg.chat.id, 
      '✅ Xabaringiz yuborildi! Tez orada javob beramiz.',
      { parse_mode: 'HTML' }
    );
  }
}

const telegramBotService = new TelegramBotService();
export default telegramBotService;
