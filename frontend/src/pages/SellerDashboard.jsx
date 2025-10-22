import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Package, TrendingUp, DollarSign, Eye, Clock, Star, Users, Target, ArrowUpRight } from 'lucide-react'
import { ordersAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const SellerDashboard = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    thisMonthRevenue: 0
  })

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getAll()
      const allOrders = response.data

      // Calculate stats
      const total = allOrders.length
      const pending = allOrders.filter(o => o.orderStatus === 'pending').length
      const revenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0)

      // This month's revenue
      const now = new Date()
      const thisMonth = allOrders.filter(o => {
        const orderDate = new Date(o.createdAt)
        return orderDate.getMonth() === now.getMonth() &&
               orderDate.getFullYear() === now.getFullYear()
      })
      const monthRevenue = thisMonth.reduce((sum, o) => sum + o.totalPrice, 0)

      setStats({
        totalOrders: total,
        pendingOrders: pending,
        totalRevenue: revenue,
        thisMonthRevenue: monthRevenue
      })

      setOrders(allOrders.slice(0, 5)) // Last 5 orders
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
      month: 'short',
      year: 'numeric'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-gray-600 font-medium">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Header */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {user?.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">
                      Salom, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-dark-muted mt-1 text-lg">
                      Sotuvchi panelingizga xush kelibsiz
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-dark-surface px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Bugun</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                    {new Date().toLocaleDateString('uz-UZ', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Orders */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-70" />
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium opacity-90">Jami buyurtmalar</p>
                <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">Barcha vaqt</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-80">Faol</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-70" />
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium opacity-90">Kutilayotgan</p>
                <p className="text-3xl font-bold mt-1">{stats.pendingOrders}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">Yangi buyurtmalar</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-80">Diqqat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-70" />
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium opacity-90">Jami daromad</p>
                <p className="text-2xl font-bold mt-1">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">Barcha vaqt</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  <span className="text-xs opacity-80">Muvaffaqiyat</span>
                </div>
              </div>
            </div>
          </div>

          {/* This Month Revenue */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-70" />
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium opacity-90">Shu oy daromad</p>
                <p className="text-2xl font-bold mt-1">{formatPrice(stats.thisMonthRevenue)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">Oylik statistika</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  <span className="text-xs opacity-80">O'sish</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-border px-6 py-4 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Package className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">So'nggi buyurtmalar</h2>
              </div>
              <Link
                to="/seller/orders"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                <Eye className="w-4 h-4" />
                Barchasini ko'rish
              </Link>
            </div>
          </div>

          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">Hozircha buyurtmalar yo'q</h3>
                <p className="text-gray-500 dark:text-dark-muted">Yangi buyurtmalar kelganda bu yerda ko'rinadi</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tl-lg">Buyurtma</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">Mijoz</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">Sana</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">Summa</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tr-lg">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                    {orders.map((order, index) => (
                      <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-150">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                              <span className="text-primary-600 font-bold text-sm">#{order.orderNumber.slice(-3)}</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-dark-text">#{order.orderNumber}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-dark-text">{order.customerInfo.fullName}</p>
                            <p className="text-sm text-gray-500 dark:text-dark-muted">{order.customerInfo.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-dark-muted">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {formatDate(order.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-900 dark:text-dark-text text-lg">
                            {formatPrice(order.totalPrice)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)} shadow-sm`}>
                            {getStatusText(order.orderStatus)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/seller/orders"
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-dark-muted group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Buyurtmalar</h3>
              <p className="text-gray-600 dark:text-dark-muted text-sm leading-relaxed">Buyurtmalarni ko'ring va boshqaring, holatini o'zgartiring</p>
            </div>
          </Link>

          <Link
            to="/seller/products"
            className="group relative overflow-hidden bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors duration-300">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-dark-muted group-hover:text-green-600 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Mahsulotlar</h3>
              <p className="text-gray-600 dark:text-dark-muted text-sm leading-relaxed">Mahsulotlaringizni qo'shing, tahrirlang va boshqaring</p>
            </div>
          </Link>

          <Link
            to="/seller/analytics"
            className="group relative overflow-hidden bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-dark-muted group-hover:text-purple-600 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Statistika</h3>
              <p className="text-gray-600 dark:text-dark-muted text-sm leading-relaxed">Savdo hisobotlari, grafiklar va tahlillar</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard
