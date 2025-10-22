import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-32 h-32 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">Savatchangiz bo'sh</h2>
          <p className="text-gray-600 dark:text-dark-muted mb-8">
            Mahsulotlarni ko'rib chiqing va savatga qo'shing
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Package className="w-5 h-5" />
            Mahsulotlarga o'tish
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">Savat</h1>
                  <p className="text-gray-600 dark:text-dark-muted">{cart.length} ta mahsulot</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              const price = item.product.wholesalePrice || item.product.price
              const total = price * item.quantity

              return (
                <div 
                  key={item.product._id} 
                  className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6 hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.product._id}`}
                      className="w-28 h-28 bg-gray-100 dark:bg-dark-bg rounded-xl flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                    {item.product.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="w-10 h-10" />
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="font-bold text-lg text-gray-900 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.brand && (
                        <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">{item.product.brand}</p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-dark-muted mt-2 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Narx: <span className="font-semibold">{formatPrice(price)}</span>
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                            className="p-3 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700 dark:text-dark-text" />
                          </button>
                          <span className="px-6 py-2 font-bold text-gray-900 dark:text-dark-text">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                            className="p-3 hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700 dark:text-dark-text" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">O'chirish</span>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-dark-muted mb-1">Jami</p>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(total)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6">Buyurtma xulosasi</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-dark-muted">
                  <span>Mahsulotlar ({cart.length} ta):</span>
                  <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-dark-muted">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Yetkazib berish:
                  </span>
                  <span className={getCartTotal() >= 3000000 ? "text-green-600 dark:text-green-400 font-bold" : "font-semibold"}>
                    {getCartTotal() >= 3000000 ? 'BEPUL' : 'Checkout\'da hisoblanadi'}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-dark-border pt-4 flex justify-between text-2xl font-bold">
                  <span className="text-gray-900 dark:text-dark-text">Jami:</span>
                  <span className="text-primary-600 dark:text-primary-400">{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-3"
              >
                To'lovga o'tish
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block w-full text-center px-6 py-3 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              >
                Xaridni davom ettirish
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-muted">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span><strong>Bepul yetkazish</strong> 3,000,000 so'mdan ortiq buyurtmalar uchun</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-muted">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span><strong>Xavfsiz to'lov</strong> 100% himoyalangan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
