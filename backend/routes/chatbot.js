const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Store conversation history (production da database da saqlash kerak)
const conversationHistory = {};

router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Default userId if not provided
    const effectiveUserId = userId || 'guest';

    // User uchun conversation history yaratish yoki olish
    if (!conversationHistory[effectiveUserId]) {
      conversationHistory[effectiveUserId] = [
        {
          role: 'system',
          content: `Siz OPTOMMARKET-ning AI asistenti siz. 
Siz buyerga mahsulotlar haqida, narxlar haqida, buyurtmalar haqida savollarga javob berasiz.
Siz xushmuomala, tez va foydali javoblarni berasiz.
Mahsulotlar kategoriyalari: Oziq-ovqat, Texnika, Kiyim, Kitoblar.
Yetkazib berish: 24 soat ichida O'zbekiston bo'ylab, bepul.
To'lov: Naqd, Plastik karta, Click, Payme.
Juda murakkab savollar uchun "admin@optommarket.uz ga yozing" deysiz.
Har doim Uzbek tilida gaplashing va do'stona munosabatda bo'ling.`
        }
      ];
    }

    // User message ni history ga qo'shish
    conversationHistory[effectiveUserId].push({
      role: 'user',
      content: message
    });

    // Check if OpenAI API key exists
    if (!OPENAI_API_KEY) {
      return res.json({
        message: 'Kechirasiz, AI xizmati hozircha faol emas. Iltimos, admin@optommarket.uz ga murojaat qiling.',
        timestamp: new Date()
      });
    }

    // OpenAI API ga request yuborish
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: conversationHistory[effectiveUserId],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    // AI response ni history ga qo'shish
    conversationHistory[effectiveUserId].push({
      role: 'assistant',
      content: aiMessage
    });

    res.json({
      message: aiMessage,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    
    // Fallback response
    res.json({
      message: 'Salom! Men OPTOMMARKET AI asistentiman. Hozirda texnik ishlar olib borilmoqda. Mahsulotlar, narxlar va buyurtmalar haqida savollaringiz bo\'lsa, admin@optommarket.uz ga yozing yoki +998901234567 ga qo\'ng\'iroq qiling. Rahmat! 😊',
      timestamp: new Date()
    });
  }
});

// Clear conversation history
router.post('/chat/clear/:userId', (req, res) => {
  const { userId } = req.params;
  delete conversationHistory[userId];
  res.json({ message: 'Suhbat tarixi o\'chirildi' });
});

// Get conversation stats (for admin)
router.get('/stats', (req, res) => {
  const stats = {
    totalConversations: Object.keys(conversationHistory).length,
    conversations: Object.keys(conversationHistory).map(userId => ({
      userId,
      messageCount: conversationHistory[userId].length - 1 // Exclude system message
    }))
  };
  res.json(stats);
});

module.exports = router;
