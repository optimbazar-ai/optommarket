import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Package, Calendar, CreditCard, ShoppingBag } from 'lucide-react'
import { ordersAPI } from '../services/api'

const OrderSuccess = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadOrder()
  }, [id])

  const loadOrder = async () => {
    try {
      const response = await ordersAPI.getById(id)
      setOrder(response.data)
    } catch (err) {
      console.error('Error loading order:', err)
      setError('Buyurtma topilmadi')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Kutilmoqda',
      'confirmed': 'Tasdiqlandi',
      'processing': 'Tayyorlanmoqda',
      'shipped': 'Yo\'lda',
      'delivered': 'Yetkazildi',
      'cancelled': 'Bekor qilindi'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': 'text-yellow-600 bg-yellow-100',
      'confirmed': 'text-blue-600 bg-blue-100',
      'processing': 'text-purple-600 bg-purple-100',
      'shipped': 'text-indigo-600 bg-indigo-100',
      'delivered': 'text-green-600 bg-green-100',
      'cancelled': 'text-red-600 bg-red-100'
    }
    return colorMap[status] || 'text-gray-600 bg-gray-100'
  }

  const getPaymentMethodText = (method) => {
    const methodMap = {
      'cash': 'Naqd pul',
      'click': 'Click',
      'payme': 'Payme'
    }
    return methodMap[method] || method
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Buyurtma topilmadi'}</h2>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Mahsulotlarga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Muvaffaqiyat!</h1>
        <p className="text-lg text-gray-600">
          Buyurtmangiz qabul qilindi
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Order Number */}
          <div className="flex items-start gap-3">
            <Package className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Buyurtma raqami</p>
              <p className="font-semibold text-lg">#{order.orderNumber}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Sana</p>
              <p className="font-semibold">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-primary-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">To'lov usuli</p>
              <p className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 mt-1"></div>
            <div>
              <p className="text-sm text-gray-600">Holat</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                {getStatusText(order.orderStatus)}
              </span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Jami summa:</span>
            <span className="text-3xl font-bold text-primary-600">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Mijoz ma'lumotlari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">To'liq ism:</p>
            <p className="font-medium">{order.customerInfo.fullName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{order.customerInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Telefon:</p>
            <p className="font-medium">{order.customerInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Manzil:</p>
            <p className="font-medium">
              {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Buyurtma tarkibi</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
              <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                {item.product?.images && item.product.images[0] ? (
                  <img
                    src={item.product.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>
              <div className="font-semibold">
                {formatPrice(item.total)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-800 text-center">
          <strong>Rahmat!</strong> Operatorlarimiz tez orada siz bilan bog'lanishadi va buyurtmani tasdiqlashadi.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/products" className="btn btn-primary flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Yana Sotib Olish
        </Link>
        <Link to="/dashboard" className="btn btn-outline flex items-center justify-center gap-2">
          <Package className="w-5 h-5" />
          Buyurtmalarimni Ko'rish
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
