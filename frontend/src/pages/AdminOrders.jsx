import { useState, useEffect } from 'react'
import { Eye, RefreshCw } from 'lucide-react'
import { adminAPI } from '../services/api'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await adminAPI.getOrders()
      setOrders(response.data)
    } catch (err) {
      console.error('Error loading orders:', err)
      setError('Buyurtmalarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId)
    try {
      await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus })
      await loadOrders()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Statusni yangilashda xatolik')
    } finally {
      setUpdating(null)
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

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Kutilmoqda',
      confirmed: 'Tasdiqlandi',
      processing: 'Tayyorlanmoqda',
      shipped: 'Yo\'lda',
      delivered: 'Yetkazildi',
      cancelled: 'Bekor qilindi'
    }
    return labels[status] || status
  }

  const getPaymentMethodLabel = (method) => {
    const labels = {
      cash: 'Naqd',
      click: 'Click',
      payme: 'Payme'
    }
    return labels[method] || method
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Buyurtmalar</h1>
        <button
          onClick={loadOrders}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Yangilash
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mijoz</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Summa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">To'lov</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Holat</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sana</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono">
                      #{order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerInfo.fullName}</p>
                        <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                        <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-900">{formatPrice(order.totalPrice)}</p>
                      <p className="text-xs text-gray-600">{order.items.length} mahsulot</p>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </span>
                        <p className={`text-xs mt-1 ${
                          order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {order.paymentStatus === 'paid' ? 'To\'langan' : 'Kutilmoqda'}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer ${getStatusColor(order.orderStatus)}`}
                      >
                        <option value="pending">Kutilmoqda</option>
                        <option value="confirmed">Tasdiqlandi</option>
                        <option value="processing">Tayyorlanmoqda</option>
                        <option value="shipped">Yo'lda</option>
                        <option value="delivered">Yetkazildi</option>
                        <option value="cancelled">Bekor qilindi</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {/* View order details */}}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Ko'rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    Buyurtmalar yo'q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Jami buyurtmalar</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Kutilmoqda</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.orderStatus === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Jarayonda</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => ['confirmed', 'processing', 'shipped'].includes(o.orderStatus)).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Yetkazilgan</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.orderStatus === 'delivered').length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
