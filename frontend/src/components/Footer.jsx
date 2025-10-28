import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">OptomMarket.uz</h3>
            <p className="text-sm">
              O'zbekistondagi eng yirik optom savdo platformasi. 
              Ishonchli va qulay xaridlar uchun bizni tanlang.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Aloqa</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+998 99 644-84-44</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@optommarket.uz</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Toshkent, O'zbekiston</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Tez havolalar</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Biz haqimizda</a></li>
              <li><a href="#" className="hover:text-white">Foydalanish shartlari</a></li>
              <li><a href="#" className="hover:text-white">Maxfiylik siyosati</a></li>
              <li><a href="#" className="hover:text-white">Yordam</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 OptomMarket.uz. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
