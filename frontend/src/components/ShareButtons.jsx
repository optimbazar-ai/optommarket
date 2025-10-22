import { Facebook, MessageCircle, Send, Link2, Check } from 'lucide-react'
import { useState } from 'react'

const ShareButtons = ({ 
  title = 'OptoMarket.uz', 
  description = 'Eng yaxshi optom savdo platformasi',
  url = window.location.href 
}) => {
  const [copied, setCopied] = useState(false)

  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(fbUrl, '_blank', 'width=600,height=400')
  }

  const shareOnTelegram = () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    window.open(tgUrl, '_blank')
  }

  const shareOnWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`
    window.open(waUrl, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-dark-muted font-medium mr-2">
        Ulashish:
      </span>
      
      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        title="Facebook'da ulashish"
      >
        <Facebook className="w-4 h-4" />
      </button>

      {/* Telegram */}
      <button
        onClick={shareOnTelegram}
        className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        title="Telegram'da ulashish"
      >
        <Send className="w-4 h-4" />
      </button>

      {/* WhatsApp */}
      <button
        onClick={shareOnWhatsApp}
        className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
        title="WhatsApp'da ulashish"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className={`p-2 rounded-lg transition-colors ${
          copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-border'
        }`}
        title="Havola nusxalash"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default ShareButtons
