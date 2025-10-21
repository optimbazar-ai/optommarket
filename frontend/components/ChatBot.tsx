'use client';
import { useState, useEffect, useRef } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/hooks/useAuth';

export default function ChatBot() {
  const { user } = useAuth();
  const userId = user?.id?.toString() || null;
  const { messages, input, setInput, sendMessage, loading, clearChat } = useChatbot(userId);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 z-50 animate-pulse"
          title="AI Asistent"
        >
          <span className="text-3xl">🤖</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[500px] border-2 border-blue-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">🤖 OPTOMMARKET AI</h2>
              <p className="text-xs text-blue-100">24/7 Online</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-sm bg-blue-800 px-3 py-1 rounded-lg hover:bg-blue-900 transition"
                title="Suhbatni o'chirish"
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-red-300 transition"
                title="Yopish"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  <span className={`text-xs block mt-1 ${
                    msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString('uz-UZ', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Xabar yozing..."
                className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                📤
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI bilan suhbatlashmoqdasiz
            </p>
          </div>
        </div>
      )}
    </>
  );
}
