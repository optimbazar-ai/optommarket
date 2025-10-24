import express from 'express';
import geminiService from '../services/geminiService.js';
import cohereService from '../services/cohereService.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// AI service with fallback
async function generateTextWithFallback(prompt) {
  // Try Gemini first
  try {
    console.log('🤖 Trying Gemini AI...');
    const result = await geminiService.generateText(prompt);
    console.log('✅ Gemini AI success');
    return { text: result, provider: 'Gemini' };
  } catch (geminiError) {
    console.log('⚠️ Gemini failed, trying Cohere...');
    
    // Try Cohere as fallback
    try {
      const result = await cohereService.generateText(prompt);
      console.log('✅ Cohere AI success');
      return { text: result, provider: 'Cohere' };
    } catch (cohereError) {
      console.error('❌ Both AI services failed');
      console.error('Gemini error:', geminiError.message);
      console.error('Cohere error:', cohereError.message);
      throw new Error('Barcha AI xizmatlari ishlamadi. Keyinroq qayta urinib ko\'ring.');
    }
  }
}

// POST /api/ai/chat - generate chatbot response using Gemini
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: "'message' maydoni kerak"
      });
    }

    const formattedHistory = Array.isArray(history) ? history : [];

    const conversation = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const responseText = await geminiService.generateChatResponse(conversation);

    const updatedHistory = [
      ...conversation,
      {
        role: 'model',
        parts: [{ text: responseText }]
      }
    ];

    res.json({
      success: true,
      data: {
        response: responseText,
        history: updatedHistory
      }
    });
  } catch (error) {
    console.error('AI chat route error:', error);
    const message = error?.message || 'AI javobini olishda xatolik yuz berdi';
    res.status(500).json({
      success: false,
      message
    });
  }
});

// POST /api/ai/tts - text to speech
router.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        message: "'text' maydoni kerak"
      });
    }

    const audio = await geminiService.generateSpeech(text);

    res.json({
      success: true,
      data: audio
    });
  } catch (error) {
    console.error('AI TTS route error:', error);
    const message = error?.message || 'Matnni ovozga o\'tkazishda xatolik yuz berdi';
    res.status(500).json({
      success: false,
      message
    });
  }
});

// POST /api/ai/generate-description - generate product description
router.post('/generate-description', protect, async (req, res) => {
  try {
    const { productName, category, brand, price, type = 'short' } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: 'Mahsulot nomi kerak'
      });
    }

    const prompt = type === 'short' 
      ? `Sen professional marketing mutaxassisisan. Quyidagi mahsulot uchun jozibador va SEO-optimallashtirilgan QISQA tavsif yoz (maksimal 400 belgi):

Mahsulot: ${productName}
${category ? `Kategoriya: ${category}` : ''}
${brand ? `Brend: ${brand}` : ''}
${price ? `Narxi: ${price} so'm` : ''}

Tavsif quyidagi talablarga javob berishi kerak:
- O'zbek tilida
- Jozibador va e'tiborni tortuvchi
- SEO uchun kalit so'zlar bilan
- Mijozlarni xarid qilishga undovchi
- Professional va tushunarli
- Maksimal 400 belgi

Faqat tavsif matnini yoz, boshqa hech narsa yo'q:`
      : `Sen professional marketing va copywriting mutaxassisisan. Quyidagi mahsulot uchun to'liq, batafsil va SEO-optimallashtirilgan tavsif yoz (1000-2000 belgi):

Mahsulot: ${productName}
${category ? `Kategoriya: ${category}` : ''}
${brand ? `Brend: ${brand}` : ''}
${price ? `Narxi: ${price} so'm` : ''}

Batafsil tavsif quyidagilarni o'z ichiga olishi kerak:
- Mahsulot xususiyatlari va afzalliklari
- Qo'llanilish sohalari va vaziyatlari
- Texnik parametrlar (agar mavjud bo'lsa)
- Foydalanish bo'yicha maslahatlar
- Nima uchun bu mahsulotni tanlash kerak
- SEO uchun kalit so'zlar
- Professional va ishonchli yondashuv

Matnni quyidagi formatda yoz:
- Bo'limlar (paragraflar)
- Tushunarli va o'qish qulay
- O'zbek tilida
- 1000-2000 belgi

Faqat tavsif matnini yoz, boshqa hech narsa yo'q:`;

    const result = await generateTextWithFallback(prompt);

    // Clean up the response
    const cleanedDescription = result.text
      .trim()
      .replace(/```/g, '')
      .replace(/\*\*/g, '')
      .replace(/^(Tavsif:|Description:)/i, '')
      .trim();

    res.json({
      success: true,
      data: {
        description: cleanedDescription,
        type: type,
        provider: result.provider // Qaysi AI ishlatilganini ko'rsatish
      }
    });
  } catch (error) {
    console.error('AI description generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Tavsif yaratishda xatolik yuz berdi'
    });
  }
});

export default router;
