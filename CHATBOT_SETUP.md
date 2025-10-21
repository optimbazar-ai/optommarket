# 🤖 AI CHATBOT SETUP GUIDE

## OpenAI API Key Setup

### 1. OpenAI Account yaratish
1. https://platform.openai.com ga kiring
2. Sign up qiling (Google/GitHub orqali)
3. Email ni verify qiling

### 2. API Key olish
1. Platform dashboardga kiring
2. Chap tarafdan "API Keys" ni tanlang
3. "Create new secret key" tugmasini bosing
4. Key nomini kiriting (masalan: "optommarket-chatbot")
5. Key ni NUSXALAB OLING (faqat bir marta ko'rsatiladi!)
6. Key quyidagi formatda bo'ladi: `sk-proj-...` yoki `sk-...`

### 3. Backend .env fayliga qo'shish

**Windows:**
```powershell
cd e:\loyihalarim\optommarket\backend
notepad .env
```

**.env fayliga qo'shing:**
```env
DATABASE_URL=postgresql://your_neon_connection_string
JWT_SECRET=your_super_secret_key_12345
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=sk-your_actual_openai_key_here
```

**MUHIM:** 
- `sk-your_actual_openai_key_here` ni o'zingizning haqiqiy key bilan almashtiring
- Bu faylni HECH QACHON GitHub ga commit qilmang!
- `.env` fayli `.gitignore` da bo'lishi kerak

### 4. Server ni restart qiling

Terminal da:
```bash
cd backend
npm run dev
```

Output:
```
🚀 OPTOMMARKET Backend Server
🌐 URL: http://localhost:5000
🤖 Chatbot: POST http://localhost:5000/api/chatbot/chat
```

### 5. Frontend ni ishga tushiring

Yangi terminal:
```bash
cd frontend
npm run dev
```

### 6. Test qiling

1. Browser: http://localhost:3000
2. Pastki o'ng burchakda 🤖 tugmasini bosing
3. Xabar yozing: "Salom!"
4. AI javob berishi kerak

## Xatoliklar va Yechimlar

### ❌ "AI xizmati mavjud emas"
- `.env` faylidagi `OPENAI_API_KEY` ni tekshiring
- Key to'g'ri formatda ekanligini tekshiring (sk- bilan boshlanishi kerak)
- Backend serverni restart qiling

### ❌ "API key invalid"
- OpenAI platformda key hali active ekanligini tekshiring
- Yangi key yaratib, qaytadan urinib ko'ring
- Billing sozlanganligini tekshiring

### ❌ Rate limit error
- OpenAI free tier: 3 requests/minute limit
- Paid account: https://platform.openai.com/account/billing

## API Pricing (OpenAI GPT-3.5-turbo)

- **Free tier**: $5 credit (3 oy)
- **Pay-as-you-go**: ~$0.002 per 1K tokens
- **1 suhbat (~500 so'z)**: ~$0.01

## Fallback Response

Agar OpenAI API ishlamasa, chatbot default javob qaytaradi:
```
"Salom! Men OPTOMMARKET AI asistentiman. Hozirda texnik ishlar olib borilmoqda..."
```

## Production Setup

Production uchun:
1. OpenAI API key ni environment variable sifatida Render/Vercel da sozlang
2. Rate limiting qo'shing
3. Conversation history ni database da saqlang
4. Monitoring va logging qo'shing

## Test Commands

Backend test:
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Salom!", "userId": "test123"}'
```

Expected response:
```json
{
  "message": "Assalomu aleykum! OPTOMMARKET ga xush kelibsiz...",
  "timestamp": "2025-10-21T..."
}
```

## Chatbot Features

✅ 24/7 AI support
✅ Uzbek language
✅ Conversation history
✅ Real-time responses
✅ Error handling
✅ Clear chat functionality
✅ User-specific conversations
✅ Fallback responses

## Tayyor!

Chatbot ishga tushirildi! 🎉
