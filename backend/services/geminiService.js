import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.clients = [];
    this.currentClientIndex = 0;
    this.textModel = null;
    this.ttsModel = null;
    this.textModelInitialized = false;
    this.ttsModelInitialized = false;
  }

  ensureClients() {
    if (this.clients.length > 0) return;

    // Support multiple API keys
    const apiKeys = [];
    
    if (process.env.GEMINI_API_KEY) {
      apiKeys.push(process.env.GEMINI_API_KEY);
    }
    
    if (process.env.GEMINI_API_KEY_2) {
      apiKeys.push(process.env.GEMINI_API_KEY_2);
    }

    if (apiKeys.length === 0) {
      throw new Error('GEMINI_API_KEY topilmadi. chatbot ishlashi uchun .env faylida kalitni belgilang.');
    }

    // Initialize all clients
    this.clients = apiKeys.map(key => new GoogleGenerativeAI(key));
    console.log(`✓ Gemini: ${this.clients.length} ta API key yuklandi`);
  }

  getCurrentClient() {
    this.ensureClients();
    return this.clients[this.currentClientIndex];
  }

  rotateClient() {
    if (this.clients.length > 1) {
      this.currentClientIndex = (this.currentClientIndex + 1) % this.clients.length;
      console.log(`🔄 Gemini API key almashtirish: key ${this.currentClientIndex + 1}/${this.clients.length}`);
      return true;
    }
    return false;
  }

  initializeTextModel() {
    this.ensureClients();
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
    
    if (!this.textModelInitialized) {
      console.log(`✓ Gemini AI initialized with model: ${modelName}`);
      this.textModelInitialized = true;
    }
  }

  initializeTtsModel() {
    this.ensureClients();
    const ttsModelName = process.env.GEMINI_TTS_MODEL || 'gemini-2.0-flash-exp';
    
    if (!this.ttsModelInitialized) {
      console.log(`✓ Gemini TTS model initialized: ${ttsModelName}`);
      this.ttsModelInitialized = true;
    }
  }

  async generateChatResponse(history) {
    this.initializeTextModel();

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
    let lastError = null;

    // Try all available API keys
    for (let attempt = 0; attempt < this.clients.length; attempt++) {
      try {
        const client = this.getCurrentClient();
        const textModel = client.getGenerativeModel({ model: modelName });

        const result = await textModel.generateContent({
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
        lastError = error;
        
        // If quota exceeded (429) and we have more keys, rotate
        if (error.status === 429 && this.rotateClient()) {
          console.log(`⚠️ Gemini chat key ${attempt + 1} limit tugadi, keyingisini sinab ko'ramiz...`);
          continue;
        }
        
        // Otherwise throw error
        console.error('Gemini chat xatosi:', error);
        throw error;
      }
    }

    throw lastError;
  }

  async generateText(prompt) {
    this.initializeTextModel();

    if (!prompt || !prompt.trim()) {
      throw new Error('Prompt bo\'sh bo\'lishi mumkin emas');
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
    let lastError = null;

    // Try all available API keys
    for (let attempt = 0; attempt < this.clients.length; attempt++) {
      try {
        const client = this.getCurrentClient();
        const textModel = client.getGenerativeModel({ model: modelName });

        const result = await textModel.generateContent({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 2048
          }
        });

        const response = result.response?.text();
        if (!response) {
          throw new Error('Model javob bera olmadi');
        }

        return response.trim();
      } catch (error) {
        lastError = error;
        
        // If quota exceeded (429) and we have more keys, rotate
        if (error.status === 429 && this.rotateClient()) {
          console.log(`⚠️ Gemini key ${attempt + 1} limit tugadi, keyingisini sinab ko'ramiz...`);
          continue;
        }
        
        // Otherwise throw error
        console.error('Gemini text generation xatosi:', error);
        throw error;
      }
    }

    throw lastError;
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
