import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, ArrowRight, BookOpen } from 'lucide-react'
import { blogAPI } from '../services/api'
import SEO from '../components/SEO'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const res = await blogAPI.getAll({ limit: 12 })
      setPosts(res.data || [])
      setTotal(res.total || 0)
      setHasMore(res.hasMore || false)
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Blog - OptoMarket.uz"
        description="Biznes va optom savdo bo'yicha foydali maqolalar, yangiliklar va maslahatlar"
        keywords="blog, yangiliklar, maqolalar, biznes, optom savdo"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-800 dark:to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog va Yangiliklar
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Biznes va optom savdo bo'yicha foydali maqolalar, yangiliklar va maslahatlar
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">Yuklanmoqda...</p>
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="mb-8 text-gray-600 dark:text-dark-muted">
                  <p>{total} ta maqola topildi</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link
                      key={post._id}
                      to={`/blog/${post.slug}`}
                      className="group bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {post.image && (
                        <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          {post.category && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                                {post.category}
                              </span>
                            </div>
                          )}
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
                            Batafsil o'qish
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-700" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
                  Hozircha maqolalar yo'q
                </h3>
                <p className="text-gray-600 dark:text-dark-muted mb-8">
                  Tez orada yangi maqolalar qo'shiladi
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Bosh sahifaga qaytish
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Blog
