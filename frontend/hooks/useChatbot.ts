import { useState } from 'react';
import apiClient from '@/lib/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

export const useChatbot = (userId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      message: 'Salom! 👋 OPTOMMARKET AI asistentiga xush kelibsiz. Men sizga mahsulotlar, narxlar, va buyurtmalar haqida yordam bera olamanman. Nima bilan yordam bera olaman?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // User message ni add qil
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.post('/chatbot/chat', {
        message,
        userId: userId || 'guest',
      });

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        message: response.data.message,
        timestamp: response.data.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        message: '❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring yoki admin@optommarket.uz ga murojaat qiling.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    const effectiveUserId = userId || 'guest';
    try {
      await apiClient.post(`/chatbot/chat/clear/${effectiveUserId}`);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          message: 'Salom! 👋 Suhbat o\'chirildi. Qanday yordam bera olamanman?',
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Clear chat error:', error);
    }
  };

  return { messages, input, setInput, sendMessage, loading, clearChat };
};
