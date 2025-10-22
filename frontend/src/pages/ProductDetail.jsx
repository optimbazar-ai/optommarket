import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, ShoppingCart, Check } from 'lucide-react'
import { productsAPI } from '../services/api'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Mahsulot topilmadi</h2>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Mahsulotlarga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Orqaga
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
          {product.images && product.images[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-32 h-32 text-gray-400" />
          )}
        </div>

        {/* Details */}
        <div>
          {product.featured && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded mb-4">
              ⭐ Top mahsulot
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {product.brand && (
            <p className="text-lg text-gray-600 mb-4">Brend: {product.brand}</p>
          )}

          {product.category && (
            <p className="text-gray-600 mb-4">
              Kategoriya: <span className="font-medium">{product.category.name}</span>
            </p>
          )}

          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.wholesalePrice || product.price)}
              </span>
              {product.wholesalePrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Minimal buyurtma: {product.minOrderQuantity} {product.unit}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Tavsif:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">Omborda</p>
              <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} ${product.unit}` : 'Tugagan'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">O'lchov birligi</p>
              <p className="font-semibold">{product.unit}</p>
            </div>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miqdor
                </label>
                <input
                  type="number"
                  min={product.minOrderQuantity}
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 0))}
                  className="input w-32"
                />
              </div>

              <button 
                onClick={handleAddToCart}
                className={`btn w-full flex items-center justify-center space-x-2 text-lg py-3 transition-colors ${
                  added ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'
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

              <p className="text-center text-gray-600">
                Jami: <span className="font-bold text-xl text-primary-600">
                  {formatPrice((product.wholesalePrice || product.price) * quantity)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
