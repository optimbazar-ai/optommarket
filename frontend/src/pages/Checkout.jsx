import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, CreditCard, Shield, Truck, Headphones } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { ordersAPI, paymentsAPI } from '../services/api'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateForm = () => {
    const { fullName, email, phone, address, city } = formData

    if (!fullName || !email || !phone || !address || !city) {
      setError('Barcha majburiy maydonlarni to\'ldiring')
      return false
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      setError('Email noto\'g\'ri formatda')
      return false
    }

    // Phone validation (+998XXXXXXXXX)
    const phoneRegex = /^\+998\d{9}$/
    if (!phoneRegex.test(phone)) {
      setError('Telefon noto\'g\'ri formatda (+998XXXXXXXXX)')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    if (cart.length === 0) {
      setError('Savatchangiz bo\'sh')
      return
    }

    setLoading(true)

    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.wholesalePrice || item.product.price
        })),
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: getCartTotal(),
        notes: formData.notes
      }

      // Create order
      const response = await ordersAPI.create(orderData)
      const order = response.data

      // Clear cart
      clearCart()

      // Handle payment based on method
      if (formData.paymentMethod === 'click') {
        // Initialize Click payment
        const paymentResponse = await paymentsAPI.initClick(order._id, order.totalPrice)
        window.location.href = paymentResponse.paymentUrl
      } else if (formData.paymentMethod === 'payme') {
        // Initialize Payme payment
        const paymentResponse = await paymentsAPI.initPayme(order._id, order.totalPrice)
        window.location.href = paymentResponse.paymentUrl
      } else {
        // Cash payment - go directly to success page
        navigate(`/order-success/${order._id}`)
      }
    } catch (err) {
      console.error('Order error:', err)
      setError(err.message || 'Buyurtma yaratishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Savatchangiz bo'sh</h2>
          <p className="text-gray-600 mb-8">Buyurtma berish uchun mahsulot qo'shing</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Mahsulotlarga o'tish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Buyurtmani rasmiylashtirish</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Customer Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shaxsiy ma'lumotlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To'liq ism *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input"
                    placeholder="Ismingiz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+998901234567"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: +998XXXXXXXXX</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Yetkazib berish manzili</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manzil *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input"
                    placeholder="Ko'cha, uy raqami"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shahar *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input"
                    placeholder="Toshkent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pochta indeksi
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="input"
                    placeholder="100000"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold mb-4">To'lov usuli</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Naqd pul</span>
                    <p className="text-sm text-gray-600">Mahsulotni qabul qilganda to'lash</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="click"
                    checked={formData.paymentMethod === 'click'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Click</span>
                    <p className="text-sm text-gray-600">Online to'lov (TEST MODE)</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payme"
                    checked={formData.paymentMethod === 'payme'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Payme</span>
                    <p className="text-sm text-gray-600">Online to'lov (TEST MODE)</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-green-600" />
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qo'shimcha izoh
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input"
                rows="3"
                placeholder="Buyurtma haqida qo'shimcha ma'lumot..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg py-3"
            >
              {loading ? 'Yuklanmoqda...' : 'Buyurtmani Tasdiqlash'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Buyurtma xulosasi</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product._id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    {item.product.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {formatPrice(item.product.wholesalePrice || item.product.price)}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {formatPrice((item.product.wholesalePrice || item.product.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish:</span>
                <span className="text-green-600 font-medium">Bepul</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Jami:</span>
                <span className="text-primary-600">{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span>Xavfsiz to'lov</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-5 h-5 text-blue-600 mr-2" />
                <span>Tez yetkazib berish</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                <span>24/7 qo'llab-quvvatlash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
