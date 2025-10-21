export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🛒 OPTOMMARKET</h3>
            <p className="text-gray-400">
              O'zbekiston uchun zamonaviy optom savdo platformasi. 
              AI chatbot bilan jihozlangan.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Tez Havolalar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white">Mahsulotlar</a></li>
              <li><a href="/about" className="hover:text-white">Biz haqimizda</a></li>
              <li><a href="/contact" className="hover:text-white">Aloqa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Aloqa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +998 90 123 45 67</li>
              <li>📧 info@optommarket.uz</li>
              <li>📍 Toshkent, O'zbekiston</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 OPTOMMARKET. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
