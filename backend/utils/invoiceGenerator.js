/**
 * Invoice/Check generator for Uzbekistan
 * Generates HTML invoice for printing
 */

export const generateInvoiceHTML = (order) => {
  const currentDate = new Date().toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  return `
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice - ${order.orderNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      padding: 20px;
      background: white;
    }
    
    .invoice {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #333;
      padding: 30px;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px solid #333;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    
    .header h1 {
      font-size: 32px;
      color: #2563eb;
      margin-bottom: 5px;
    }
    
    .header p {
      color: #666;
      font-size: 14px;
    }
    
    .invoice-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    
    .info-block {
      flex: 1;
    }
    
    .info-block h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .info-block p {
      margin: 5px 0;
      font-size: 14px;
    }
    
    .order-number {
      text-align: center;
      background: #f3f4f6;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    
    .order-number strong {
      font-size: 20px;
      color: #2563eb;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    th {
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-size: 14px;
      border-bottom: 2px solid #333;
    }
    
    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }
    
    .text-right {
      text-align: right;
    }
    
    .totals {
      margin-left: auto;
      width: 300px;
    }
    
    .totals table {
      margin-bottom: 0;
    }
    
    .totals td {
      border: none;
      padding: 8px 12px;
    }
    
    .totals .grand-total {
      background: #2563eb;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #333;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    
    .payment-method {
      display: inline-block;
      padding: 8px 16px;
      background: #fef3c7;
      color: #92400e;
      border-radius: 6px;
      font-weight: bold;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .invoice {
        border: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="invoice">
    <!-- Header -->
    <div class="header">
      <h1>🛒 OptoMarket.uz</h1>
      <p>O'zbekistondagi eng yirik optom savdo platformasi</p>
      <p>📞 +998 90 123-45-67 | 📧 info@optommarket.uz</p>
    </div>
    
    <!-- Order Number -->
    <div class="order-number">
      <strong>BUYURTMA № ${order.orderNumber}</strong>
      <p style="margin-top: 5px; color: #666;">Sana: ${currentDate}</p>
    </div>
    
    <!-- Invoice Info -->
    <div class="invoice-info">
      <div class="info-block">
        <h3>Mijoz ma'lumotlari:</h3>
        <p><strong>${order.customerInfo.fullName}</strong></p>
        <p>📱 ${order.customerInfo.phone}</p>
        <p>📧 ${order.customerInfo.email}</p>
      </div>
      
      <div class="info-block">
        <h3>Yetkazib berish manzili:</h3>
        <p><strong>${order.shippingAddress.region}</strong></p>
        <p>${order.shippingAddress.city}</p>
        <p>${order.shippingAddress.address}</p>
      </div>
    </div>
    
    <!-- Payment Method -->
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="payment-method">
        💳 To'lov: ${getPaymentMethodText(order.paymentMethod)}
      </span>
    </div>
    
    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th style="width: 50px;">№</th>
          <th>Mahsulot nomi</th>
          <th class="text-right" style="width: 100px;">Narxi</th>
          <th class="text-right" style="width: 80px;">Soni</th>
          <th class="text-right" style="width: 120px;">Summa</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td class="text-right">${formatPrice(item.price)}</td>
            <td class="text-right">${item.quantity}</td>
            <td class="text-right"><strong>${formatPrice(item.total)}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <!-- Totals -->
    <div class="totals">
      <table>
        <tr>
          <td>Mahsulotlar:</td>
          <td class="text-right"><strong>${formatPrice(order.totalPrice)}</strong></td>
        </tr>
        <tr>
          <td>Yetkazib berish:</td>
          <td class="text-right"><strong>${formatPrice(order.shippingPrice)}</strong></td>
        </tr>
        <tr class="grand-total">
          <td>JAMI TO'LOV:</td>
          <td class="text-right">${formatPrice(order.totalPrice + order.shippingPrice)}</td>
        </tr>
      </table>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p><strong>Rahmat! Xaridingiz uchun tashakkur!</strong></p>
      <p style="margin-top: 10px;">
        Savollar bo'lsa: +998 90 123-45-67 | info@optommarket.uz
      </p>
      <p style="margin-top: 10px; font-size: 10px;">
        © ${new Date().getFullYear()} OptoMarket.uz - Barcha huquqlar himoyalangan
      </p>
    </div>
  </div>
  
  <script>
    // Auto print on load (optional)
    // window.onload = () => window.print();
  </script>
</body>
</html>
  `;
};

function getPaymentMethodText(method) {
  const methods = {
    'click': 'Click',
    'payme': 'Payme',
    'cash': 'Naqd pul (yetkazganda)'
  };
  return methods[method] || method;
}
