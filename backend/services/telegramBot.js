const TelegramBot = require('node-telegram-bot-api');

let bot = null;
let botInitialized = false;

// Initialize Telegram Bot
const initializeTelegramBot = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.log('⚠️  Telegram bot token not configured - Bot disabled');
    return null;
  }

  try {
    bot = new TelegramBot(token, { 
      polling: false // Polling disabled for production (use webhooks instead)
    });
    
    botInitialized = true;
    console.log('✓ Telegram bot initialized');
    console.log('ℹ️  Telegram bot polling o\'chirilgan (production issue)');
    
    return bot;
  } catch (error) {
    console.error('✗ Telegram bot initialization failed:', error.message);
    return null;
  }
};

// Send message to Telegram channel/group
const sendTelegramMessage = async (chatId, message, options = {}) => {
  if (!bot || !botInitialized) {
    console.log('⚠️  Telegram bot not initialized - Message not sent');
    return false;
  }

  try {
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      ...options
    });
    console.log('✓ Telegram message sent');
    return true;
  } catch (error) {
    console.error('✗ Telegram message send failed:', error.message);
    return false;
  }
};

// Send new product notification
const notifyNewProduct = async (product) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return false;

  const message = `
🆕 <b>Yangi mahsulot qo'shildi!</b>

📦 <b>${product.name}</b>
💰 Narx: ${product.price.toLocaleString('uz-UZ')} so'm
📁 Kategoriya: ${product.category}
🏷️ Brend: ${product.brand || 'Noma\'lum'}

${product.description ? product.description.substring(0, 150) + '...' : ''}

🔗 Saytda ko'rish: ${process.env.FRONTEND_URL}/products/${product.id}
  `.trim();

  return await sendTelegramMessage(chatId, message);
};

// Send new order notification
const notifyNewOrder = async (order, user) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return false;

  const message = `
🛒 <b>Yangi buyurtma!</b>

👤 Mijoz: ${user.name || user.email}
📞 Tel: ${user.phone || 'Ko\'rsatilmagan'}
💰 Summa: ${order.totalAmount.toLocaleString('uz-UZ')} so'm
📦 Mahsulotlar soni: ${order.items?.length || 1}
📅 Vaqt: ${new Date().toLocaleString('uz-UZ')}

🔗 Admin panel: ${process.env.FRONTEND_URL}/admin/orders
  `.trim();

  return await sendTelegramMessage(chatId, message);
};

// Send promotion notification
const notifyPromotion = async (promotion) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return false;

  const message = `
🔥 <b>Yangi Chegirma!</b>

📦 ${promotion.productName}
💰 Eski narx: <s>${promotion.originalPrice.toLocaleString('uz-UZ')} so'm</s>
💸 Yangi narx: <b>${promotion.discountedPrice.toLocaleString('uz-UZ')} so'm</b>
🎁 Chegirma: ${promotion.discountPercent}%

⏰ Amal qilish muddati: ${new Date(promotion.endDate).toLocaleDateString('uz-UZ')}

🔗 Xarid qilish: ${process.env.FRONTEND_URL}/products/${promotion.productId}
  `.trim();

  return await sendTelegramMessage(chatId, message);
};

module.exports = {
  initializeTelegramBot,
  sendTelegramMessage,
  notifyNewProduct,
  notifyNewOrder,
  notifyPromotion,
  getBot: () => bot
};
