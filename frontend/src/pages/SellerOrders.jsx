import { useState, useEffect } from 'react'
import { Eye, Package, Search, Filter, Download, RefreshCw, MapPin, Phone, Mail } from 'lucide-react'
import { ordersAPI } from '../services/api'

const SellerOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      setOrders(response.data)
    } catch (error) {
      console.error('Error loading orders:', error)
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

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white',
      'confirmed': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
      'processing': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
      'shipped': 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white',
      'delivered': 'bg-gradient-to-r from-green-400 to-green-500 text-white',
      'cancelled': 'bg-gradient-to-r from-red-400 to-red-500 text-white'
    }
    return colors[status] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
  }

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Kutilmoqda',
      'confirmed': 'Tasdiqlandi',
      'processing': 'Tayyorlanmoqda',
      'shipped': 'Yo\'lda',
      'delivered': 'Yetkazildi',
      'cancelled': 'Bekor qilindi'
    }
    return texts[status] || status
  }

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.includes(searchTerm)

    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus

    return matchesSearch && matchesStatus
  })

  const clearFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
  }

  const showOrderDetails = (order) => {
    const items = order.items.map(item =>
      `• ${item.name} (${item.quantity} dona) - ${formatPrice(item.price)}`
    ).join('\n')

    alert(`Buyurtma #${order.orderNumber}\n\n📅 Sana: ${formatDate(order.createdAt)}\n👤 Mijoz: ${order.customerInfo.fullName}\n📞 Telefon: ${order.customerInfo.phone}\n📧 Email: ${order.customerInfo.email}\n\n🏠 Manzil: ${order.shippingAddress.city}, ${order.shippingAddress.address}\n\n📦 Mahsulotlar:\n${items}\n\n💰 Jami: ${formatPrice(order.totalPrice)}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-gray-600 font-medium">Buyurtmalar yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Buyurtmalar</h1>
                    <p className="text-gray-600 mt-1">Buyurtmalaringizni boshqaring va kuzating</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadOrders}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Yangilash
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buyurtma raqami, mijoz ismi yoki telefon qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-w-[200px]"
              >
                <option value="all">Barcha holatlar</option>
                <option value="pending">⏳ Kutilmoqda</option>
                <option value="confirmed">✅ Tasdiqlandi</option>
                <option value="processing">⚙️ Tayyorlanmoqda</option>
                <option value="shipped">🚚 Yo'lda</option>
                <option value="delivered">📦 Yetkazildi</option>
                <option value="cancelled">❌ Bekor qilindi</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {(searchTerm || filterStatus !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Tozalash
              </button>
            )}
          </div>

          {/* Filter Summary */}
          {(searchTerm || filterStatus !== 'all') && (
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">Filtrlar:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Qidiruv: "{searchTerm}"
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  Holat: {getStatusText(filterStatus)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterStatus !== 'all' ? 'Buyurtmalar topilmadi' : 'Hozircha buyurtmalar yo\'q'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all'
                  ? 'Qidiruv kriteriyalaringizga mos buyurtmalar yo\'q. Filtrlarni o\'zgartirib ko\'ring.'
                  : 'Yangi buyurtmalar kelganda bu yerda ko\'rinadi.'
                }
              </p>
              {(searchTerm || filterStatus !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  Barcha buyurtmalarni ko'rish
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Buyurtma</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mijoz</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Aloqa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Manzil</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sana</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Summa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Holat</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-sm">#{order.orderNumber.slice(-3)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">#{order.orderNumber}</p>
                            <p className="text-xs text-gray-500">{order.items.length} mahsulot</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{order.customerInfo.fullName}</p>
                          <p className="text-xs text-gray-500">{order.customerInfo.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{order.customerInfo.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-900">{order.shippingAddress.city}</p>
                            <p className="text-xs text-gray-500 truncate max-w-32">{order.shippingAddress.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">{formatDate(order.createdAt).split(',')[0]}</span>
                          <span className="text-xs text-gray-500">{formatDate(order.createdAt).split(',')[1]}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{formatPrice(order.totalPrice)}</p>
                          <p className="text-xs text-gray-500">shu jumladan yetkazib berish</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)} shadow-sm`}>
                          {getStatusText(order.orderStatus)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => showOrderDetails(order)}
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200 font-medium"
                          title="Tafsilotlarni ko'rish"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">Ko'rish</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Orders */}
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium opacity-90">Jami buyurtmalar</p>
                  <p className="text-3xl font-bold mt-1">{filteredOrders.length}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs opacity-80">Filtrlangan</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-80">Aktiv</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Download className="w-6 h-6" />
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium opacity-90">Jami summa</p>
                  <p className="text-2xl font-bold mt-1">
                    {formatPrice(filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0))}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs opacity-80">Filtrlangan</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span className="text-xs opacity-80">Daromad</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium opacity-90">Kutilayotgan</p>
                  <p className="text-3xl font-bold mt-1">
                    {filteredOrders.filter(o => o.orderStatus === 'pending').length}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs opacity-80">Diqqat talab</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-80">Urgent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerOrders
