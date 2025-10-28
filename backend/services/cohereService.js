import { CohereClient } from 'cohere-ai';

class CohereService {
  constructor() {
    this.client = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    if (!process.env.COHERE_API_KEY) {
      console.log('⚠️ COHERE_API_KEY topilmadi');
      return;
    }

    this.client = new CohereClient({
      token: process.env.COHERE_API_KEY
    });

    this.initialized = true;
    console.log('✓ Cohere AI initialized (backup)');
  }

  async generateText(prompt) {
    this.initialize();

    if (!this.client) {
      throw new Error('Cohere API key topilmadi');
    }

    if (!prompt || !prompt.trim()) {
      throw new Error('Prompt bo\'sh bo\'lishi mumkin emas');
    }

    try {
      // Use new Chat API instead of deprecated Generate API
      const response = await this.client.chat({
        message: prompt,
        model: 'command',
        temperature: 0.7,
        maxTokens: 2048,
        promptTruncation: 'AUTO'
      });

      if (!response.text) {
        throw new Error('Cohere javob bera olmadi');
      }

      return response.text.trim();
    } catch (error) {
      console.error('Cohere text generation xatosi:', error);
      throw error;
    }
  }
}

const cohereService = new CohereService();
export default cohereService;
