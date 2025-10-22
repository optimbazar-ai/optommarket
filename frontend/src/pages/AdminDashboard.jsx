import { useState, useEffect } from 'react'
import { ShoppingBag, DollarSign, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react'
import { adminAPI } from '../services/api'

const AdminDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard()
      setData(response.data)
    } catch (err) {
      console.error('Error loading dashboard:', err)
      setError('Dashboard ma\'lumotlarini yuklashda xatolik')
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    
    const labels = {
      pending: 'Kutilmoqda',
      confirmed: 'Tasdiqlandi',
      processing: 'Tayyorlanmoqda',
      shipped: 'Yo\'lda',
      delivered: 'Yetkazildi',
      cancelled: 'Bekor qilindi'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  const stats = data?.stats || {}
  const recentOrders = data?.recentOrders || []
  const lowStockProducts = data?.lowStockProducts || []

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Buyurtmalar</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daromad</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(stats.totalRevenue || 0).split(' ')[0]}K
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Foydalanuvchilar</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mahsulotlar</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts || 0}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ombor</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStock || 0}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">So'nggi buyurtmalar</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mijoz</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Summa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Holat</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sana</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">#{order.orderNumber}</td>
                    <td className="py-3 px-4 text-sm">{order.customerInfo.fullName}</td>
                    <td className="py-3 px-4 text-sm font-semibold">{formatPrice(order.totalPrice)}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.orderStatus)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    Buyurtmalar yo'q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Products */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-semibold">Kam qolgan mahsulotlar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mahsulot</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Qoldiq</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{product.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                        {product.stock} dona
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
