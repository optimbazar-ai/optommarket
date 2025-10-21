const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('⚠️ GEMINI_API_KEY ni .env fayliga qo\'shish shart!');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

// Conversation history (production da database da saqlash kerak)
const conversationHistory = {};

// System prompt - Gemini uchun
const SYSTEM_PROMPT = `Siz OPTOMMARKET-ning professional AI asistenti siz.

VAZIFALAR:
1. Buyerlarga optom savdo haqida tez va foydali javoblar bering
2. Mahsulotlar haqida ma'lumot bering
3. Narxlar va chegirmalar haqida gaplashing
4. Buyurtmalar va yetkazib berish haqida tushuntiring
5. Muammo bo'lsa admin bilan bog'lanishni taklif qiling

QOIDALAR:
- Faqat Uzbek tilida gaplashing
- Juda xushmuomala va mehribon bo'ling
- Vaqt behuda sarflamay tez javob bering
- Noma'lum savollarga "Bilmayman, admin bilan bog'lanish tavsiya qilaman" deb ayting
- Har doim optimist va ijobiy bo'ling

MA'LUMOTLAR:
- Bu e-commerce platform (optom savdo)
- Mahsulot kategoriyalari: Oziq-ovqat, Texnika, Kiyim, Kitoblar
- Yetkazib berish: 1-3 kun ichida, O'zbekiston bo'ylab
- To'lov: Naqd, Plastik karta, Click, Payme
- 24/7 qo'llab-quvvatlash
- Telefon: +998901234567
- Email: support@optommarket.uz`;

router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Default userId if not provided
    const effectiveUserId = userId || 'guest';

    if (!message.trim()) {
      return res.status(400).json({ error: 'Xabar bo\'sh bo\'lolmaydi' });
    }

    if (!genAI) {
      return res.status(500).json({
        error: 'AI xizmat hozircha mavjud emas',
        message: 'GEMINI_API_KEY sozlanmagan'
      });
    }

    // User uchun conversation history yaratish
    if (!conversationHistory[effectiveUserId]) {
      conversationHistory[effectiveUserId] = [];
    }

    // Gemini model yaratish
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Conversation history va yangi message bilan
    const chat = model.startChat({
      history: conversationHistory[effectiveUserId].map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    // User message ni yubor
    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

    // History ga user message qo'shish
    conversationHistory[effectiveUserId].push({
      role: 'user',
      content: message,
    });

    // History ga AI response qo'shish
    conversationHistory[effectiveUserId].push({
      role: 'assistant',
      content: aiResponse,
    });

    // History 20 dan ortiq bo'lsa, eng eskilarini o'chirish
    if (conversationHistory[effectiveUserId].length > 20) {
      conversationHistory[effectiveUserId] = conversationHistory[effectiveUserId].slice(-20);
    }

    res.json({
      message: aiResponse,
      timestamp: new Date(),
      model: 'Gemini 1.5 Flash',
    });

  } catch (error) {
    console.error('🔴 Chatbot error:', error.message);
    
    // Fallback response agar API fail bo'lsa
    const fallbackResponses = [
      'Kechirasiz, hozir biroz band. Iltimos qayta urinib ko\'ring.',
      'AI xizmat vaqtincha ishlamayapti. Admin: +998901234567',
      'Texnik muammo yuz berdi. Tezda hal qilinadi!',
    ];
    
    const fallbackMessage = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    res.status(500).json({
      error: 'AI xizmatda muammo',
      message: fallbackMessage,
      timestamp: new Date(),
    });
  }
});

// Clear conversation
router.post('/chat/clear/:userId', (req, res) => {
  const { userId } = req.params;
  if (conversationHistory[userId]) {
    delete conversationHistory[userId];
  }
  res.json({
    message: '✅ Suhbat tarixi o\'chirildi',
    timestamp: new Date(),
  });
});

// Chat history ko'rish (debug uchun)
router.get('/chat/history/:userId', (req, res) => {
  const { userId } = req.params;
  const history = conversationHistory[userId] || [];
  res.json({
    userId,
    messageCount: history.length,
    history: history.slice(-5), // Oxirgi 5 ta message
  });
});

// Statistika
router.get('/stats', (req, res) => {
  const totalUsers = Object.keys(conversationHistory).length;
  const totalMessages = Object.values(conversationHistory).reduce(
    (sum, msgs) => sum + msgs.length,
    0
  );

  res.json({
    totalActiveUsers: totalUsers,
    totalMessages,
    timestamp: new Date(),
  });
});

module.exports = router;
