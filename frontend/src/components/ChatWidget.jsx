import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Loader2, Sparkles, Volume2 } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'model',
    text: 'Salom! Men OptomMarket.uz yordamchi chatbotiman. Sizga qanday yordam bera olaman? 😊'
  }
]

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'model',
      parts: [{ text: 'Salom! Men OptomMarket.uz yordamchi chatbotiman.' }]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [speakingId, setSpeakingId] = useState(null)
  const chatBoxRef = useRef(null)
  const inputRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return

    setInputValue('')

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    }

    setMessages(prev => [...prev, userMessage])
    setChatHistory(prev => [
      ...prev,
      {
        role: 'user',
        parts: [{ text: trimmed }]
      }
    ])

    await sendRequest(trimmed, { addSummaryPrompt: false })
  }

  const handleSummarize = async () => {
    if (messages.length <= 1 || isLoading) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'error',
          text: 'Xulosa qilish uchun avval suhbatni boshlang.'
        }
      ])
      return
    }

    const summaryPrompt = 'Iltimos, shu paytgacha bo\'lgan suhbatimizni qisqacha xulosa qilib bering.'

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: 'Suhbatni xulosa qilish ✨'
      }
    ])

    setChatHistory(prev => [
      ...prev,
      {
        role: 'user',
        parts: [{ text: summaryPrompt }]
      }
    ])

    await sendRequest(summaryPrompt, { addSummaryPrompt: true })
  }

  const sendRequest = async (message, { addSummaryPrompt }) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          history: chatHistory
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Server xatosi')
      }

      const data = await response.json()
      const aiText = data?.data?.response || 'Kechirasiz, javob olishda muammo bo\'ldi.'

      if (Array.isArray(data?.data?.history)) {
        setChatHistory(data.data.history)
      } else {
        setChatHistory(prev => [
          ...prev,
          {
            role: 'model',
            parts: [{ text: aiText }]
          }
        ])
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'model',
          text: aiText
        }
      ])

      if (addSummaryPrompt) {
        setChatHistory(prev => [
          ...prev,
          {
            role: 'model',
            parts: [{ text: aiText }]
          }
        ])
      }

    } catch (error) {
      console.error('Chatbot xatosi:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'error',
          text: error.message || 'Kechirasiz, xatolik yuz berdi. Qaytadan urinib ko\'ring.'
        }
      ])
    } finally {
      setIsLoading(false)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
  }

  const handleSpeak = async (messageId, text) => {
    if (!text || isLoading) return

    stopCurrentAudio()
    setSpeakingId(messageId)

    try {
      const response = await fetch(`${API_URL}/ai/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'TTS server xatosi')
      }

      const data = await response.json()
      const audioBase64 = data?.data?.audioData
      const mimeType = data?.data?.mimeType || 'audio/wav'

      if (!audioBase64) {
        throw new Error('TTS javobida audio ma\'lumot topilmadi')
      }

      const audioUrl = base64ToObjectUrl(audioBase64, mimeType)
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.play()
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
        setSpeakingId(null)
      }
    } catch (error) {
      console.error('TTS xatosi:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'error',
          text: error.message || 'Matnni ovozga o\'tkazishda xatolik yuz berdi.'
        }
      ])
      setSpeakingId(null)
    }
  }

  const base64ToObjectUrl = (base64, mimeType) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    return URL.createObjectURL(blob)
  }

  const renderMessageClass = sender => {
    if (sender === 'user') return 'justify-end'
    return 'justify-start'
  }

  const renderBubbleClass = sender => {
    if (sender === 'user') return 'bg-green-100 text-green-900'
    if (sender === 'error') return 'bg-red-100 text-red-900'
    return 'bg-blue-100 text-blue-900'
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-transform duration-200 hover:scale-110"
          aria-label="Chatbotni ochish"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">OptomMarket Yordamchi</h3>
                <p className="text-xs text-white/80">Onlayn</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Chatbotni yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={chatBoxRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {messages.map(message => (
              <div key={message.id} className={`flex ${renderMessageClass(message.sender)}`}>
                <div
                  className={`${renderBubbleClass(message.sender)} relative p-3 rounded-lg max-w-[80%] shadow text-sm whitespace-pre-wrap`}
                >
                  {message.text}
                  {message.sender === 'model' && (
                    <button
                      onClick={() => handleSpeak(message.id, message.text)}
                      disabled={speakingId === message.id}
                      className="absolute -bottom-2 -right-2 bg-white text-primary-600 border border-primary-200 rounded-full p-1.5 shadow hover:bg-primary-50 disabled:opacity-60"
                      title="Ovozli o'qish"
                    >
                      {speakingId === message.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Yozilmoqda...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 bg-white space-y-2">
            <button
              onClick={handleSummarize}
              disabled={isLoading || messages.length <= 1}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium border border-primary-200 text-primary-600 rounded-lg hover:bg-primary-50 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Suhbatni xulosa qilish
            </button>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Xabaringizni yozing..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget
