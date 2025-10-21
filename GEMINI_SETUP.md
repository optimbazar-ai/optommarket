# 🤖 Google Gemini API Setup Guide

## Nega Gemini?

✅ **BEPUL** - OpenAI dan ko'ra generous free tier
✅ **TEZKOR** - Gemini 1.5 Flash juda tez
✅ **KUCHLI** - GPT-3.5 dan yaxshiroq natijalar
✅ **ODDIY** - Oson integratsiya

---

## 1️⃣ Google AI Studio Account

### Kirish
1. https://aistudio.google.com ga o'ting
2. Google account bilan sign in qiling
3. Terms & Conditions ga rozi bo'ling

---

## 2️⃣ API Key Olish

### Steps:
1. AI Studio dashboardda **"Get API Key"** tugmasini bosing
2. **"Create API key in new project"** ni tanlang
3. API Key yaratiladi (format: `AIza...`)
4. **COPY** tugmasini bosing va safe joyda saqlang

⚠️ **MUHIM**: Bu key bir marta ko'rsatiladi! Yo'qotmang!

---

## 3️⃣ Backend .env Setup

### Windows:
```powershell
cd e:\loyihalarim\optommarket\backend
notepad .env
```

### .env fayliga qo'shing:
```env
DATABASE_URL=postgresql://your_neon_connection
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=AIzaSy... # <-- SIZNING KEYINGIZ
```

⚠️ **XAVFSIZLIK**: 
- `.env` fayli `.gitignore` da bo'lishi kerak
- HECH QACHON GitHub ga commit qilmang

---

## 4️⃣ Package O'rnatish

```bash
cd backend
npm install @google/generative-ai
```

Verify:
```bash
npm list @google/generative-ai
# Output: @google/generative-ai@0.x.x
```

---

## 5️⃣ Server Restart

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 OPTOMMARKET Backend Server
🌐 URL: http://localhost:5000
🤖 Chatbot: POST http://localhost:5000/api/chatbot/chat
```

Agar `⚠️ GEMINI_API_KEY` warning ko'rsangiz - .env ni tekshiring!

---

## 6️⃣ Test Qilish

### Terminal (cURL):
```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Salom! Siz kim?",
    "userId": "test123"
  }'
```

### Expected Response:
```json
{
  "message": "Salom! Men OPTOMMARKET AI asistentiyam...",
  "timestamp": "2025-10-21T...",
  "model": "Gemini 1.5 Flash"
}
```

### Frontend Test:
1. Browser: http://localhost:3000
2. 🤖 tugmasini bosing
3. "Salom!" deb yozing
4. AI javob berishi kerak (Uzbek tilida)

---

## 7️⃣ API Limits (Free Tier)

| Feature | Limit |
|---------|-------|
| Requests/minute | 15 |
| Requests/day | 1,500 |
| Tokens/request | Unlimited |
| Cost | **FREE** |

Katta loyihalar uchun: https://ai.google.dev/pricing

---

## 8️⃣ Troubleshooting

### ❌ "GEMINI_API_KEY sozlanmagan"
**Sabab**: .env faylidagi key noto'g'ri yoki yo'q

**Hal qilish**:
```bash
# .env faylini tekshiring
cat backend/.env | grep GEMINI

# Key bor-yo'qligini tekshiring
echo $GEMINI_API_KEY  # (Linux/Mac)
```

### ❌ "API key not valid"
**Sabab**: Key noto'g'ri copy qilingan

**Hal qilish**:
1. Google AI Studio ga qaytib yangi key yarating
2. To'liq copy qiling (bo'sh joy bo'lmasin)
3. .env fayliga qaytadan qo'shing
4. Server restart qiling

### ❌ "Rate limit exceeded"
**Sabab**: 15 requests/minute limitdan oshdi

**Hal qilish**:
- 1-2 minut kutish
- Yoki paid plan-ga o'tish

---

## 9️⃣ Production Deployment

### Render.com:
1. Dashboard → Environment
2. Add variable: `GEMINI_API_KEY` = `your_key`
3. Save & Deploy

### Vercel (Frontend):
- Frontend API key kerak emas
- Faqat backend da kerak

---

## 🔟 Features

### Implemented:
✅ Uzbek language support
✅ Conversation history (20 messages)
✅ System prompt customization
✅ Error handling with fallbacks
✅ Clear chat functionality
✅ Multiple concurrent users
✅ Statistics endpoint

### Model:
- **Name**: Gemini 1.5 Flash
- **Speed**: ~1-2 seconds response
- **Quality**: Better than GPT-3.5
- **Language**: Uzbek (native support)

---

## 📊 Comparison: OpenAI vs Gemini

| Feature | OpenAI GPT-3.5 | Google Gemini |
|---------|----------------|---------------|
| Free Tier | $5 credit (3 months) | Unlimited (with limits) |
| Cost (1000 tokens) | $0.002 | **FREE** |
| Speed | Fast | **Faster** |
| Uzbek Support | Good | **Better** |
| Setup | Complex | **Simple** |

---

## ✅ Migration Complete!

Chatbot endi Google Gemini API bilan ishlaydi!

**Test messages**:
- "Mahsulotlar haqida ma'lumot"
- "Narxlar qancha?"
- "Yetkazib berish qanday?"
- "Chegirmalar bormi?"

**Tayyor!** 🎉
