import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, ShoppingCart, Check, Star, Box, Truck, Shield, Tag } from 'lucide-react'
import { productsAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import ShareButtons from '../components/ShareButtons'
import SEO from '../components/SEO'

// Extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const data = await productsAPI.getById(id)
      setProduct(data.data)
      setQuantity(data.data.minOrderQuantity || 1)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-gray-600 dark:text-dark-muted font-medium">Mahsulot ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">Mahsulot topilmadi</h2>
          <p className="text-gray-600 dark:text-dark-muted mb-8">Kechirasiz, bu mahsulot mavjud emas yoki o'chirilgan.</p>
          <button onClick={() => navigate('/products')} className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium">
            Mahsulotlarga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={`${product?.name || 'Mahsulot'} - OptomMarket.uz`}
        description={product?.description || 'Mahsulot tafsilotlari'}
        keywords={`${product?.name}, ${product?.category?.name}, optom savdo, uzbekistan`}
        url={`https://optommarket.uz/products/${id}`}
        image={product?.images?.[0] || '/og-image.jpg'}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Orqaga</span>
          </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <div className="bg-white dark:bg-dark-surface rounded-2xl aspect-square flex items-center justify-center overflow-hidden shadow-lg border border-gray-100 dark:border-dark-border">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={`${product.name} - ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-32 h-32 text-gray-400" />
                )}
              </div>
              
              {/* Image badges */}
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Top mahsulot
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-200 dark:border-dark-border hover:border-primary-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-primary-600/10" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* YouTube Video */}
            {product.videoUrl && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-dark-border">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(product.videoUrl)}`}
                    title="Product Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-border">
            {/* Header */}
            <div className="mb-6">
              {product.brand && (
                <p className="text-sm text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
                {product.name}
              </h1>

              {product.category && (
                <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-lg mb-4">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-4">
                <ShareButtons 
                  title={product.name}
                  description={product.description}
                  url={`https://optommarket.uz/products/${product._id}`}
                />
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-6 border border-primary-100 dark:border-primary-900/30">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(product.wholesalePrice || product.price)}
                </span>
                {product.wholesalePrice && (
                  <div>
                    <span className="text-xl text-gray-500 dark:text-dark-muted line-through block">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      -{Math.round((1 - product.wholesalePrice / product.price) * 100)}% chegirma
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-dark-text">
                <Box className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Minimal buyurtma: {product.minOrderQuantity} {product.unit}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-600" />
                Mahsulot haqida
              </h3>
              <p className="text-gray-700 dark:text-dark-muted leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-2">
                  <Box className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Omborda</p>
                </div>
                <p className={`text-xl font-bold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.stock > 0 ? `${product.stock} ${product.unit}` : 'Tugagan'}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
                  <p className="text-sm text-gray-600 dark:text-dark-muted">O'lchov</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-dark-text">{product.unit}</p>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                    Miqdorni tanlang
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text font-bold hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={product.minOrderQuantity}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 0))}
                      className="w-24 text-center text-xl font-bold px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-dark-text font-bold hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 dark:text-dark-muted">
                      (max: {product.stock})
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-dark-bg dark:to-dark-border rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-dark-muted font-medium">Jami narx:</span>
                    <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {formatPrice((product.wholesalePrice || product.price) * quantity)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-3 text-lg py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    added 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Savatga qo'shildi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      <span>Savatga qo'shish</span>
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                    <p className="text-xs text-gray-600 dark:text-dark-muted">Tez yetkazish</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                    <p className="text-xs text-gray-600 dark:text-dark-muted">Kafolat</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                    <p className="text-xs text-gray-600 dark:text-dark-muted">Sifat</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetail
