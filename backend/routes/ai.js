import express from 'express';
import geminiService from '../services/geminiService.js';

const router = express.Router();

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

export default router;
