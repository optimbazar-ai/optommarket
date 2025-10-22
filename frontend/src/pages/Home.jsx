import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, TrendingUp, Shield, Truck, Sparkles, Star, Users, Package, CheckCircle, Zap, BookOpen, Calendar, Eye } from 'lucide-react'
import { productsAPI, categoriesAPI, blogAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes, blogRes] = await Promise.all([
        productsAPI.getAll({ featured: true }),
        categoriesAPI.getAll(),
        blogAPI.getAll({ limit: 3 })
      ])
      
      setFeaturedProducts(productsRes.data.slice(0, 4))
      setCategories(categoriesRes.data.slice(0, 6))
      setBlogPosts(blogRes.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="OptoMarket.uz - O'zbekistondagi eng yirik optom savdo platformasi"
        description="10,000+ mahsulotlar, raqobatbardosh narxlar va tez yetkazib berish. Biznesingiz uchun eng yaxshi optom savdo platformasi."
        keywords="optom savdo, wholesale, uzbekistan, mahsulotlar, biznes, optom narxlar, optom bozor"
        url="https://optommarket.uz"
      />
      <div className="bg-white dark:bg-dark-bg">
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-900 dark:via-purple-900 dark:to-blue-950 text-white py-24 md:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                O'zbekistondagi №1 optom savdo platformasi
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Biznesingiz uchun
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  eng yaxshi tanlov
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                10,000+ mahsulotlar, raqobatbardosh narxlar va tez yetkazib berish. 
                Biznesingizni yangi bosqichga olib chiqing!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="group relative px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    Mahsulotlarni ko'rish
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/register" 
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-blue-200">Mahsulotlar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5K+</div>
                  <div className="text-sm text-blue-200">Mijozlar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99%</div>
                  <div className="text-sm text-blue-200">Qoniqish</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Package className="w-48 h-48 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Nima uchun bizni tanlashadi?
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-muted">
              Biznesingiz uchun eng yaxshi xizmat va shart-sharoitlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3">
                  Katta assortiment
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  10,000+ turli kategoriyalardagi mahsulotlar
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3">
                  Qulay narxlar
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Optom narxlarda 20-40% chegirmalar
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3">
                  100% Ishonchli
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Sertifikatlangan va kafolatlangan
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-dark-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3">
                  Tez yetkazish
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  O'zbekiston bo'ylab 24-48 soat ichida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Mashhur kategoriyalar
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-muted">
              Sizning biznesingiz uchun kerakli mahsulotlar
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="group relative"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon || '📦'}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-dark-text">
                      {category.name}
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 dark:text-dark-muted">
                      Ko'rish
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-2">
                Top mahsulotlar
              </h2>
              <p className="text-gray-600 dark:text-dark-muted">
                Eng ko'p sotilayotgan va mashhur mahsulotlar
              </p>
            </div>
            <Link 
              to="/products" 
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              <span className="hidden sm:inline">Barchasi</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-2">
                Yangiliklar va maqolalar
              </h2>
              <p className="text-gray-600 dark:text-dark-muted">
                Biznes va optom savdo bo'yicha foydali ma'lumotlar
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-dark-muted line-clamp-3 mb-4">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                        Batafsil
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      {post.category && (
                        <span className="text-xs px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-dark-muted">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Hozircha maqolalar yo'q</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4 text-yellow-400" />
            Maxsus takliflar
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Biznesingizni yangi bosqichga
            <span className="block">olib chiqing!</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Ro'yxatdan o'ting va maxsus chegirmalar, tezkor yetkazib berish va professional yordam oling
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Hoziroq boshlash
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Mahsulotlarni ko'rish
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400" />
              <div className="font-semibold">Xavfsiz to'lov</div>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="font-semibold">Yuqori sifat</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-400" />
              <div className="font-semibold">5000+ mijoz</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default Home
