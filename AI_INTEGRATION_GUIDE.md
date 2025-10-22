# 🤖 AI INTEGRATION - GEMINI API

**Created:** 2025-10-22  
**Status:** ✅ TAYYOR - O'RNATISH KERAK

---

## 📋 OVERVIEW

OptoMarket.uz platformasiga Google Gemini AI API orqali 3 ta asosiy feature qo'shildi:

1. 💬 **AI Chatbot** - Website va Telegram
2. ✍️ **Description Generator** - Mahsulot tavsiflari
3. 📝 **SEO Blog Generator** - Blog postlar

---

## 🏗️ ARXITEKTURA

### Backend

```
backend/
├── services/
│   ├── geminiService.js      ✅ AI service (core)
│   └── telegramBot.js         ✅ Telegram bot integration
└── routes/
    └── ai.js                  ✅ AI API endpoints
```

### Frontend

```
frontend/
└── src/
    └── components/
        └── Chatbot.jsx        ✅ Website chatbot component
```

---

## 🔧 O'RNATISH

### 1️⃣ Dependencies O'rnatish

```powershell
# Backend
cd backend
npm install @google/generative-ai node-telegram-bot-api
```

**Package'lar:**
- `@google/generative-ai` - Google Gemini AI SDK
- `node-telegram-bot-api` - Telegram bot integration

### 2️⃣ Environment Variables

`backend/.env` ga qo'shing:

```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Telegram Bot (ixtiyoriy)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id
```

#### Gemini API Key Olish

1. **Google AI Studio** ga kiring: https://makersuite.google.com/app/apikey
2. **Create API Key** bosing
3. **API key** ni nusxalang
4. `.env` fayliga qo'shing

#### Telegram Bot Token Olish

1. **Telegram** da **@BotFather** ni toping
2. `/newbot` buyrug'ini yuboring
3. **Bot nomi** va **username** kiriting
4. **Token** ni oling
5. `.env` fayliga qo'shing

#### Admin Chat ID Olish

1. **@userinfobot** ni toping
2. Bot'ga `/start` yuboring
3. **Your ID** ni ko'ring
4. `.env` fayliga qo'shing

### 3️⃣ Backend Serverni Restart Qilish

```powershell
cd backend
npm run dev
```

**Kutilgan natija:**
```
✓ Server running on port 5000
✓ MongoDB connected successfully
✓ Telegram bot initialized successfully
```

### 4️⃣ Frontend (Avtomatik)

Frontend'da qo'shimcha o'rnatish kerak emas. Chatbot component Layout'ga qo'shilgan.

---

## 📡 API ENDPOINTS

### Base URL
```
http://localhost:5000/api/ai
```

### 1. Chat Endpoint

**POST** `/api/ai/chat`

**Body:**
```json
{
  "message": "Qanday mahsulotlar bor?",
  "context": {
    "userName": "Akmal",
    "currentPage": "/products"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "OptoMarket.uz platformasida 10,000+ turli mahsulotlar mavjud...",
    "timestamp": "2025-10-22T15:30:00.000Z"
  }
}
```

**Usage:** Website chatbot, Telegram bot

---

### 2. Generate Description

**POST** `/api/ai/generate-description`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Samsung Galaxy S24",
  "category": "Smartfonlar",
  "brand": "Samsung",
  "price": 12000000,
  "features": ["5G", "128GB", "Qora rang"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "Samsung Galaxy S24 - zamonaviy texnologiyalar...",
    "generatedAt": "2025-10-22T15:30:00.000Z"
  }
}
```

**Access:** Sellers and Admins only

---

### 3. Generate Blog Post

**POST** `/api/ai/generate-blog`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "topic": "Smartfonlarni tanlashda nimaga e'tibor berish kerak",
  "keywords": ["smartfon", "tanlash", "texnologiya"],
  "targetAudience": "umumiy"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Smartfonlarni Tanlashda Nimaga E'tibor Berish Kerak",
    "metaDescription": "Smartfon tanlashda e'tibor berilishi kerak bo'lgan...",
    "content": "<p>Smartfonlar...</p>",
    "keywords": ["smartfon", "tanlash", "texnologiya"],
    "generatedAt": "2025-10-22T15:30:00.000Z"
  }
}
```

**Access:** Admins only

---

### 4. Enhance Description

**POST** `/api/ai/enhance-description`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "productId": "6123456789abcdef12345678",
  "currentDescription": "Bu yaxshi telefon"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Bu yaxshi telefon",
    "enhanced": "Samsung Galaxy S24 - zamonaviy...",
    "generatedAt": "2025-10-22T15:30:00.000Z"
  }
}
```

---

### 5. Get Recommendations

**POST** `/api/ai/recommendations`

**Body:**
```json
{
  "recentViews": ["Smartfon", "Noutbuk"],
  "purchaseHistory": ["Telefon g'ilofi"],
  "preferences": {
    "brand": "Samsung",
    "priceRange": "high"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "suggestions": ["Smartfonlar", "Kompyuter aksessuarlari"],
    "products": [...]
  }
}
```

---

## 💬 WEBSITE CHATBOT

### Features

- ✅ **Real-time AI chat** - Gemini API
- ✅ **Context-aware** - Sahifa va user ma'lumotlari
- ✅ **Typing indicator** - Loading animation
- ✅ **Quick replies** - Tez javoblar
- ✅ **Message history** - Suhbat tarixi
- ✅ **Dark mode support**
- ✅ **Responsive design**

### UI Components

```
┌─────────────────────────────┐
│ 🤖 AI Yordamchi    ⓧ       │ Header
├─────────────────────────────┤
│                             │
│  🤖 Salom! Yordam kerakmi? │ AI message
│                             │
│         Mahsulotlar? 👤     │ User message
│                             │
│  🤖 Typing...               │ Loading
│                             │
├─────────────────────────────┤
│ Tez javoblar:               │ Quick Replies
│ [Mahsulotlar] [Yetkazish]  │
├─────────────────────────────┤
│ [Xabar yozing...] [Yuborish]│ Input
└─────────────────────────────┘
```

### Usage

Chatbot avtomatik qo'shilgan barcha public sahifalarga (`Layout` component orqali).

**Test qilish:**
1. Website'ni oching
2. O'ng pastdagi 💬 tugmasini bosing
3. Savol yozing
4. AI javob beradi!

---

## 📱 TELEGRAM BOT

### Features

- ✅ **AI-powered responses** - Gemini API
- ✅ **Command support** - `/start`, `/help`, etc.
- ✅ **Natural language** - Oddiy til
- ✅ **Context memory** - Suhbat tarixi
- ✅ **Inline keyboards** - Kategoriyalar
- ✅ **Admin notifications**

### Commands

| Command | Tavsif |
|---------|--------|
| `/start` | Botni boshlash |
| `/help` | Yordam xabari |
| `/products` | Mahsulotlar ro'yxati |
| `/categories` | Kategoriyalar |
| `/clear` | Suhbatni tozalash |

### Usage

1. **Telegram** da bot'ni toping (username: sizning bot username'ingiz)
2. `/start` bosing
3. Savol yuboring
4. AI javob beradi!

**Misol:**
```
User: Smartfonlar qancha?
Bot: OptoMarket.uz da smartfonlar narxi 2,000,000 so'mdan boshlanadi...
```

---

## ✍️ DESCRIPTION GENERATOR

### Use Case

Seller mahsulot qo'shganda AI yordamida professional tavsif yaratish.

### Integration

Seller Products formiga qo'shish kerak:

```jsx
// SellerProducts.jsx

const handleGenerateDescription = async () => {
  try {
    const response = await axios.post('/api/ai/generate-description', {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: formData.price
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    setFormData(prev => ({
      ...prev,
      description: response.data.data.description
    }));
  } catch (error) {
    console.error('Failed to generate description:', error);
  }
};

// Form'da:
<button onClick={handleGenerateDescription}>
  ✨ AI bilan yaratish
</button>
```

---

## 📝 SEO BLOG GENERATOR

### Use Case

Admin blog post yaratganda AI SEO-optimized content yaratish.

### Features

- ✅ **SEO-optimized** - Kalit so'zlar
- ✅ **Meta tags** - Title, description
- ✅ **HTML formatted** - Tayyor content
- ✅ **Keyword density** - Optimal
- ✅ **800-1000 so'z** - To'liq post

### Integration

Admin Blog page'ga qo'shish:

```jsx
// AdminBlog.jsx

const handleGenerateBlog = async () => {
  const response = await axios.post('/api/ai/generate-blog', {
    topic: blogTopic,
    keywords: ['smartfon', 'texnologiya'],
    targetAudience: 'umumiy'
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const { title, content, metaDescription, keywords } = response.data.data;
  
  // Set form values
  setFormData({
    title,
    content,
    metaDescription,
    keywords
  });
};
```

---

## 🧪 TESTING

### 1. Test Chatbot (Website)

```bash
# Frontend running bo'lishi kerak
http://localhost:3000

# Steps:
1. Open website
2. Click chatbot icon (bottom right)
3. Type: "Qanday mahsulotlar bor?"
4. Check AI response
```

### 2. Test Chatbot (Telegram)

```bash
# Telegram app
1. Search for your bot (@your_bot_username)
2. Send: /start
3. Send: "Mahsulotlar haqida"
4. Check AI response
```

### 3. Test Description Generator

```bash
# Postman or curl
POST http://localhost:5000/api/ai/generate-description
Headers: Authorization: Bearer <token>
Body:
{
  "name": "Test Product",
  "category": "Electronics",
  "price": 1000000
}

# Check response.data.description
```

### 4. Test Blog Generator

```bash
POST http://localhost:5000/api/ai/generate-blog
Headers: Authorization: Bearer <admin_token>
Body:
{
  "topic": "Test Blog Topic",
  "keywords": ["test", "blog"]
}

# Check response.data.title and content
```

---

## 🔐 SECURITY

### API Key Protection

- ✅ `.env` faylida saqlash
- ✅ `.gitignore` da ignore qilish
- ✅ Backend'da foydalanish (frontend'ga bermaslik)
- ✅ Rate limiting qo'shish (optional)

### Authentication

- ✅ **Chatbot**: Public (authentication yo'q)
- ✅ **Description Generator**: Sellers va Admins
- ✅ **Blog Generator**: Faqat Admins
- ✅ **Enhance Description**: Owner yoki Admin

---

## 💰 COST ESTIMATION

### Gemini API Pricing

- **Free tier**: 60 requests/minute
- **Pay-as-you-go**: $0.00025 per 1K characters

### Monthly Estimate

```
Scenario: 1000 foydalanuvchi, 100 chat/day

Chatbot: 100 * 500 chars = 50K chars/day = 1.5M/month
Cost: 1.5M * $0.00025 / 1000 = ~$0.375/month

Description Generator: 50 requests/day = 1500/month  
Cost: 1500 * 200 chars * $0.00025 / 1000 = ~$0.075/month

Blog Generator: 10 requests/month
Cost: 10 * 1000 chars * $0.00025 / 1000 = ~$0.0025/month

TOTAL: ~$0.50/month (juda arzon!)
```

**Free tier** yetarli normal foydalanish uchun!

---

## 🚀 DEPLOYMENT

### Production Checklist

- [ ] `GEMINI_API_KEY` production `.env` da
- [ ] `TELEGRAM_BOT_TOKEN` to'g'ri configured
- [ ] Backend deployed va ishlamoqda
- [ ] Frontend chatbot enabled
- [ ] Telegram bot webhook configured (optional)
- [ ] Error handling tested
- [ ] Rate limiting enabled
- [ ] Logs monitored

### Environment Variables (Production)

```env
GEMINI_API_KEY=production_key_here
TELEGRAM_BOT_TOKEN=production_bot_token
TELEGRAM_ADMIN_CHAT_ID=admin_chat_id
NODE_ENV=production
```

---

## 📊 MONITORING

### Logs

```javascript
// Backend logs
console.log('AI Chat Request:', message);
console.log('AI Response:', response);
console.error('AI Error:', error);
```

### Metrics

- **Response time**: AI response vaqti
- **Success rate**: Muvaffaqiyatli requestlar %
- **Error rate**: Xatoliklar soni
- **Usage**: API usage (Gemini dashboard)

---

## 🐛 TROUBLESHOOTING

### Muammo 1: "GEMINI_API_KEY not defined"

**Sabab:** `.env` faylida API key yo'q

**Yechim:**
```bash
# .env ga qo'shing:
GEMINI_API_KEY=your_key_here

# Backend restart:
npm run dev
```

### Muammo 2: Chatbot javob bermayapti

**Sabab:** Backend ishlamayapti yoki CORS

**Yechim:**
```bash
# Backend check:
curl http://localhost:5000/api/health

# CORS check (server.js):
app.use(cors({ origin: 'http://localhost:3000' }));
```

### Muammo 3: Telegram bot ishlamayapti

**Sabab:** Token noto'g'ri yoki polling xatolik

**Yechim:**
```bash
# Token check:
echo $TELEGRAM_BOT_TOKEN

# Bot restart:
npm run dev

# Logs check:
# Console'da "Telegram bot initialized" ko'rinishi kerak
```

### Muammo 4: "Rate limit exceeded"

**Sabab:** Gemini API free tier limiti

**Yechim:**
```bash
# Wait 1 minute
# Or upgrade to paid plan
# Or add request queuing
```

---

## 🎯 NEXT STEPS

### Phase 1: UI Enhancements (Optional)
- [ ] Description Generator button in product form
- [ ] Blog Generator page in admin panel
- [ ] AI suggestions in seller dashboard
- [ ] Chat history save to database

### Phase 2: Advanced Features
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Image analysis (product photos)
- [ ] Sentiment analysis (reviews)

### Phase 3: Analytics
- [ ] AI usage dashboard
- [ ] Popular questions tracking
- [ ] Conversion rate improvement
- [ ] A/B testing

---

## 📚 RESOURCES

### Documentation

- **Gemini AI**: https://ai.google.dev/docs
- **Telegram Bots**: https://core.telegram.org/bots
- **Node Telegram Bot API**: https://github.com/yagop/node-telegram-bot-api

### Support

- **GitHub Issues**: Project repository
- **Telegram**: @your_support_channel
- **Email**: support@optommarket.uz

---

## ✅ SUMMARY

**Status:** ✅ Tayyor - Faqat API key qo'shish qoldi

**Files Created:**
- ✅ `backend/services/geminiService.js` - AI core service
- ✅ `backend/services/telegramBot.js` - Telegram integration
- ✅ `backend/routes/ai.js` - API endpoints
- ✅ `frontend/src/components/Chatbot.jsx` - Website chatbot

**Dependencies:**
```bash
npm install @google/generative-ai node-telegram-bot-api
```

**Environment Variables:**
```env
GEMINI_API_KEY=your_key_here
TELEGRAM_BOT_TOKEN=your_token_here (optional)
TELEGRAM_ADMIN_CHAT_ID=your_chat_id (optional)
```

**Ready to use!** 🚀

