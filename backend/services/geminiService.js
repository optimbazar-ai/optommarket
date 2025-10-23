import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.client = null;
    this.textModel = null;
    this.ttsModel = null;
    this.textModelInitialized = false;
    this.ttsModelInitialized = false;
  }

  ensureClient() {
    if (this.client) return;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY topilmadi. chatbot ishlashi uchun .env faylida kalitni belgilang.');
    }

    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  initializeTextModel() {
    if (this.textModelInitialized) return;

    this.ensureClient();

    const modelName = process.env.GEMINI_MODEL || 'gemini-pro';
    this.textModel = this.client.getGenerativeModel({ model: modelName });

    this.textModelInitialized = true;
    console.log(`✓ Gemini AI initialized with model: ${modelName}`);
  }

  initializeTtsModel() {
    if (this.ttsModelInitialized) return;

    this.ensureClient();

    const ttsModelName = process.env.GEMINI_TTS_MODEL || 'gemini-pro';
    this.ttsModel = this.client.getGenerativeModel({ model: ttsModelName });

    this.ttsModelInitialized = true;
    console.log(`✓ Gemini TTS model initialized: ${ttsModelName}`);
  }

  async generateChatResponse(history) {
    this.initializeTextModel();

    try {
      const result = await this.textModel.generateContent({
        contents: history,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      });

      const response = result.response?.text();
      if (!response) {
        throw new Error('Model javob bera olmadi');
      }

      return response.trim();
    } catch (error) {
      console.error('Gemini chat xatosi:', error);
      throw error;
    }
  }

  async generateSpeech(text) {
    this.initializeTtsModel();

    if (!text || !text.trim()) {
      throw new Error('Matn bo\'sh bo\'lishi mumkin emas');
    }

    try {
      const result = await this.ttsModel.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text }]
          }
        ],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: process.env.GEMINI_TTS_VOICE || 'Puck'
              }
            }
          }
        }
      });

      const audioPart = result.response?.candidates?.[0]?.content?.parts?.find(
        part => part.inlineData?.data && part.inlineData?.mimeType
      );

      if (!audioPart) {
        throw new Error('TTS javobida audio topilmadi');
      }

      return {
        audioData: audioPart.inlineData.data,
        mimeType: audioPart.inlineData.mimeType
      };
    } catch (error) {
      console.error('Gemini TTS xatosi:', error);
      throw error;
    }
  }
}

const geminiService = new GeminiService();
export default geminiService;
