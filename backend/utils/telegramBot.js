import axios from 'axios';

class TelegramBot {
  constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
  }

  /**
   * Send message to Telegram
   * @param {string} message - Message text
   * @param {string} chatId - Optional chat ID (default: admin chat)
   */
  async sendMessage(message, chatId = null) {
    if (!this.token) {
      console.warn('⚠️ Telegram bot token not configured');
      return;
    }

    try {
      const targetChatId = chatId || this.chatId;
      
      await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: targetChatId,
        text: message,
        parse_mode: 'HTML'
      });

      console.log('✅ Telegram message sent successfully');
    } catch (error) {
      console.error('❌ Error sending Telegram message:', error.message);
    }
  }

  /**
   * Send new order notification
   * @param {Object} order - Order object
   */
  async notifyNewOrder(order) {
    const message = `
🆕 <b>YANGI BUYURTMA!</b>

📦 <b>Buyurtma:</b> #${order.orderNumber}
👤 <b>Mijoz:</b> ${order.customerInfo.fullName}
📱 <b>Telefon:</b> ${order.customerInfo.phone}
📧 <b>Email:</b> ${order.customerInfo.email}

📍 <b>Manzil:</b>
${order.shippingAddress.region}
${order.shippingAddress.city}, ${order.shippingAddress.address}

💰 <b>Summa:</b> ${this.formatPrice(order.totalPrice)} so'm
🚚 <b>Yetkazish:</b> ${this.formatPrice(order.shippingPrice)} so'm
💳 <b>To'lov:</b> ${this.getPaymentMethodText(order.paymentMethod)}

📋 <b>Mahsulotlar:</b>
${order.items.map(item => `• ${item.name} x${item.quantity} - ${this.formatPrice(item.total)} so'm`).join('\n')}

<b>JAMI:</b> ${this.formatPrice(order.totalPrice + order.shippingPrice)} so'm
    `.trim();

    await this.sendMessage(message);
  }

  /**
   * Send order status update
   * @param {Object} order - Order object
   * @param {string} newStatus - New status
   */
  async notifyStatusChange(order, newStatus) {
    const message = `
🔄 <b>BUYURTMA HOLATI O'ZGARTIRILDI</b>

📦 <b>Buyurtma:</b> #${order.orderNumber}
👤 <b>Mijoz:</b> ${order.customerInfo.fullName}
📱 <b>Telefon:</b> ${order.customerInfo.phone}

📊 <b>Yangi holat:</b> ${this.getStatusText(newStatus)}
💰 <b>Summa:</b> ${this.formatPrice(order.totalPrice + order.shippingPrice)} so'm
    `.trim();

    await this.sendMessage(message);
  }

  /**
   * Send low stock alert
   * @param {Object} product - Product object
   */
  async notifyLowStock(product) {
    const message = `
⚠️ <b>KAM QOLDI!</b>

📦 <b>Mahsulot:</b> ${product.name}
📊 <b>Qoldiq:</b> ${product.stock} ${product.unit}
🏷️ <b>Kategoriya:</b> ${product.category?.name || 'N/A'}

Yangi zaxira qo'shish tavsiya etiladi!
    `.trim();

    await this.sendMessage(message);
  }

  // Helper methods
  formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price);
  }

  getPaymentMethodText(method) {
    const methods = {
      'click': 'Click',
      'payme': 'Payme',
      'cash': 'Naqd pul'
    };
    return methods[method] || method;
  }

  getStatusText(status) {
    const statuses = {
      'pending': '⏳ Kutilmoqda',
      'confirmed': '✅ Tasdiqlandi',
      'processing': '🔄 Tayyorlanmoqda',
      'shipped': '🚚 Yo\'lda',
      'delivered': '✅ Yetkazildi',
      'cancelled': '❌ Bekor qilindi'
    };
    return statuses[status] || status;
  }
}

export default new TelegramBot();
