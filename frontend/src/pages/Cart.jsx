import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Savatchangiz bo'sh</h2>
          <p className="text-gray-600 mb-8">
            Mahsulotlarni ko'rib chiqing va savatga qo'shing
          </p>
          <Link to="/products" className="btn btn-primary inline-flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Mahsulotlarga o'tish
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Savat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = item.product.wholesalePrice || item.product.price
            const total = price * item.quantity

            return (
              <div key={item.product._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.product._id}`}
                    className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 overflow-hidden"
                  >
                    {item.product.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link
                      to={`/products/${item.product._id}`}
                      className="font-semibold text-lg hover:text-primary-600 transition"
                    >
                      {item.product.name}
                    </Link>
                    {item.product.brand && (
                      <p className="text-sm text-gray-600 mt-1">{item.product.brand}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Narx: {formatPrice(price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">O'chirish</span>
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-600">
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
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Buyurtma xulosasi</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar ({cart.length}):</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish:</span>
                <span className="text-green-600 font-medium">Bepul</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Jami:</span>
                <span className="text-primary-600">{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary w-full flex items-center justify-center gap-2 text-lg py-3"
            >
              Checkout
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/products"
              className="btn btn-secondary w-full mt-3 text-center"
            >
              Xaridni davom ettirish
            </Link>

            {/* Info */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center">
                <strong>Bepul yetkazib berish</strong> barcha buyurtmalar uchun
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
