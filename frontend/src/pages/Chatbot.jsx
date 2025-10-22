import { useEffect, useRef, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const INITIAL_HISTORY = [
  {
    role: 'user',
    parts: [{ text: 'Salom, sen kimsan?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Men Google tomonidan yaratilgan katta til modeli, Gemini man.' }]
  }
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'model',
    text: 'Salom! Men Gemini. Menga savol bering.'
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [chatHistory, setChatHistory] = useState(INITIAL_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMessage]);
    setChatHistory(prev => [
      ...prev,
      {
        role: 'user',
        parts: [{ text: trimmed }]
      }
    ]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmed,
          history: chatHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server xatosi');
      }

      const data = await response.json();
      const aiText = data?.data?.response || 'Kechirasiz, javob olishda muammo bo‘ldi.';

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'model',
          text: aiText
        }
      ]);

      if (Array.isArray(data?.data?.history)) {
        setChatHistory(data.data.history);
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            role: 'model',
            parts: [{ text: aiText }]
          }
        ]);
      }
    } catch (error) {
      console.error('Chatbot xatosi:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'error',
          text: error.message || 'Kechirasiz, xatolik yuz berdi. Qaytadan urinib ko‘ring.'
        }
      ]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const renderMessageClass = sender => {
    if (sender === 'user') return 'justify-end';
    return 'justify-start';
  };

  const renderBubbleClass = sender => {
    if (sender === 'user') {
      return 'bg-green-100 text-green-900';
    }
    if (sender === 'error') {
      return 'bg-red-100 text-red-900';
    }
    return 'bg-blue-100 text-blue-900';
  };

  return (
    <div className="bg-gray-100 font-sans flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-[70vh] flex flex-col overflow-hidden">
        <header className="bg-blue-600 text-white p-4 text-center rounded-t-lg">
          <h1 className="text-xl font-semibold">Mening Gemini Chatbotim</h1>
        </header>

        <main
          ref={chatBoxRef}
          id="chat-box"
          className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50"
        >
          {messages.map(message => (
            <div key={message.id} className={`flex ${renderMessageClass(message.sender)}`}>
              <div
                className={`${renderBubbleClass(message.sender)} p-3 rounded-lg max-w-xs shadow`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </main>

        {isLoading && (
          <div id="loading-indicator" className="p-4 flex items-center justify-start">
            <div className="bg-gray-200 p-3 rounded-lg shadow flex space-x-1">
              <span className="loading-dots">
                <span className="w-2 h-2 bg-gray-500 rounded-full inline-block animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full inline-block animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full inline-block animate-pulse"></span>
              </span>
            </div>
          </div>
        )}

        <footer className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              id="user-input"
              placeholder="Xabaringizni yozing..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              id="send-button"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow disabled:opacity-50"
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
            >
              Yuborish
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chatbot;
