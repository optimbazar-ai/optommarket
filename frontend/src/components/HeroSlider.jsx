import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = ({ products = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Agar mahsulotlar bo'lmasa, default slides (plastik idishlar)
  const defaultSlides = [
    {
      id: 1,
      title: "Sous idish 25-50-80 ML",
      subtitle: "Yuqori sifatli plastik idishlar optom narxlarda. Restoran va kafe uchun ideal tanlov!",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
      cta: "Mahsulotlarni ko'rish",
      link: "/products",
      gradient: "from-blue-600 to-purple-600",
      badge: "🔥 Ommabop"
    },
    {
      id: 2,
      title: "Plastik kosa razmerlari har-xil",
      subtitle: "Mikroto'lqinli pechda ishlatish mumkin. Turli o'lchamlarda mavjud",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
      cta: "Batafsil ma'lumot",
      link: "/products",
      gradient: "from-purple-600 to-pink-600",
      badge: "✨ Yangi"
    },
    {
      id: 3,
      title: "ZIP paketlar har-xil o'lchamlari mavjud",
      subtitle: "Qayta ishlatish mumkin. Oziq-ovqat saqlash uchun xavfsiz",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800",
      cta: "Buyurtma berish",
      link: "/products",
      gradient: "from-pink-600 to-red-600",
      badge: "💰 Chegirma"
    },
    {
      id: 4,
      title: "(F 15) Pishiriqlar uchun plastik idish",
      subtitle: "Shaffof va chidamli. Pishiriqlar va salatlar uchun",
      image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800",
      cta: "Ko'rish",
      link: "/products",
      gradient: "from-red-600 to-orange-600",
      badge: "⭐ Top"
    },
    {
      id: 5,
      title: "Bir martalik plastik stakan 200 ML",
      subtitle: "Ekologik toza va arzon. Tadbirlar uchun eng yaxshi tanlov",
      image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800",
      cta: "Xarid qilish",
      link: "/products",
      gradient: "from-orange-600 to-yellow-600",
      badge: "🎯 Aksiya"
    }
  ];

  // Mahsulotlardan slides yaratish
  const slides = products.length > 0 
    ? products.slice(0, 5).map(product => ({
        id: product._id,
        title: product.name,
        subtitle: product.description?.substring(0, 100) || "Premium sifat, arzon narx",
        price: product.price,
        image: product.images?.[0] || "/placeholder.jpg",
        cta: "Buyurtma berish",
        link: `/products/${product._id}`,
        gradient: "from-blue-600 to-purple-600",
        isProduct: true
      }))
    : defaultSlides;

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-full">
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  {/* Left Content */}
                  <div className="text-white space-y-6">
                    {(slide.isProduct || slide.badge) && (
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                        {slide.isProduct ? (
                          <>
                            <TrendingUp className="w-4 h-4" />
                            <span>Mashhur mahsulot</span>
                          </>
                        ) : (
                          <span>{slide.badge}</span>
                        )}
                      </div>
                    )}
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/90 max-w-lg">
                      {slide.subtitle}
                    </p>

                    {slide.isProduct && slide.price && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold">
                          {slide.price.toLocaleString('uz-UZ')}
                        </span>
                        <span className="text-xl">so'm</span>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                      >
                        {slide.isProduct ? (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            {slide.cta}
                          </>
                        ) : (
                          slide.cta
                        )}
                      </Link>
                      
                      {!slide.isProduct && (
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                        >
                          Mahsulotlar
                        </Link>
                      )}
                    </div>

                    {/* Stats */}
                    {!slide.isProduct && (
                      <div className="flex gap-8 pt-4">
                        <div>
                          <div className="text-3xl font-bold">10K+</div>
                          <div className="text-white/80">Mahsulotlar</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">5K+</div>
                          <div className="text-white/80">Mijozlar</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">99%</div>
                          <div className="text-white/80">Qoniqish</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Image/Icon */}
                  <div className="hidden md:flex items-center justify-center">
                    {slide.isProduct && slide.image ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6" />
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="relative w-full max-w-md h-80 object-cover rounded-3xl shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl transform rotate-6" />
                        <div className="relative bg-white/20 backdrop-blur-xl p-16 rounded-3xl">
                          <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            } h-2 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
