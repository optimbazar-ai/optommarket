import { useState, useEffect } from 'react'
import { DollarSign, CreditCard, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Plus, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const SellerPayments = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [withdrawals, setWithdrawals] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadWithdrawals()
  }, [])

  const loadWithdrawals = async () => {
    try {
      setLoading(true)
      const response = await api.get('/withdrawals', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setWithdrawals(response.data.data || [])
    } catch (error) {
      console.error('Error loading withdrawals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!user.sellerInfo?.bankAccount || !user.sellerInfo?.bankName) {
      setError('Iltimos, avval sozlamalarda bank ma\'lumotlarini kiriting')
      return
    }

    const withdrawAmount = parseFloat(amount)
    if (withdrawAmount < 100000) {
      setError('Minimal chiqarib olish summasi 100,000 so\'m')
      return
    }

    if (withdrawAmount > (user.sellerInfo?.balance || 0)) {
      setError('Balans yetarli emas')
      return
    }

    try {
      await api.post('/withdrawals', {
        amount: withdrawAmount,
        notes
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      
      setSuccess('Chiqarib olish so\'rovi yuborildi')
      setShowModal(false)
      setAmount('')
      setNotes('')
      loadWithdrawals()
      
      // Reload user to update balance
      window.location.reload()
    } catch (err) {
      setError(err.response?.data?.message || 'Xatolik yuz berdi')
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

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    }
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    }
    const labels = {
      pending: 'Kutilmoqda',
      approved: 'Tasdiqlangan',
      completed: 'Bajarildi',
      rejected: 'Rad etilgan'
    }

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    )
  }

  const stats = {
    balance: user?.sellerInfo?.balance || 0,
    totalSales: user?.sellerInfo?.totalSales || 0,
    commission: user?.sellerInfo?.commission || 10,
    pendingWithdrawals: withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8" />
              To'lovlar va Balans
            </h1>
            <p className="text-green-100">Moliyaviy hisobotlar va pul chiqarish</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 font-medium shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Pul chiqarish
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Joriy balans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                {formatPrice(stats.balance)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-muted">
            Chiqarish mumkin bo'lgan summa
          </p>
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Jami sotuvlar</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                {stats.totalSales}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-muted">
            Barcha vaqt davomida
          </p>
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Komissiya</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                {stats.commission}%
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-muted">
            Har bir sotuvdan
          </p>
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Kutilmoqda</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                {formatPrice(stats.pendingWithdrawals)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-muted">
            Tasdiqlanmagan chiqimlar
          </p>
        </div>
      </div>

      {/* Bank Info */}
      {user.sellerInfo?.bankAccount && (
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">
            Bank ma'lumotlari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-1">Bank nomi</p>
              <p className="font-medium text-gray-900 dark:text-dark-text">{user.sellerInfo.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted mb-1">Hisob raqami</p>
              <p className="font-medium text-gray-900 dark:text-dark-text font-mono">{user.sellerInfo.bankAccount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawals History */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-600" />
            Chiqimlar tarixi
          </h3>
        </div>

        {withdrawals.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">
              Hozircha chiqimlar yo'q
            </h4>
            <p className="text-gray-600 dark:text-dark-muted mb-6">
              Balansingizdan pul chiqarib olish uchun so'rov yuboring
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Pul chiqarish
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tl-lg">
                    Sana
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Summa
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Bank
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Holat
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tr-lg">
                    Izoh
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                {withdrawals.map(withdrawal => (
                  <tr key={withdrawal._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600 dark:text-dark-muted">
                        {formatDate(withdrawal.createdAt)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                        {formatPrice(withdrawal.amount)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900 dark:text-dark-text">{withdrawal.bankName}</p>
                      <p className="text-sm text-gray-600 dark:text-dark-muted font-mono">{withdrawal.bankAccount}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(withdrawal.status)}
                    </td>
                    <td className="py-4 px-4">
                      {withdrawal.status === 'rejected' && withdrawal.rejectionReason && (
                        <p className="text-sm text-red-600">{withdrawal.rejectionReason}</p>
                      )}
                      {withdrawal.notes && (
                        <p className="text-sm text-gray-600 dark:text-dark-muted">{withdrawal.notes}</p>
                      )}
                      {withdrawal.completedAt && (
                        <p className="text-xs text-gray-500 dark:text-dark-muted">
                          Bajarildi: {formatDate(withdrawal.completedAt)}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                Pul chiqarish
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Summa (so'm) *
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="100000"
                  max={stats.balance}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="100000"
                />
                <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                  Minimal: 100,000 so'm | Maksimal: {formatPrice(stats.balance)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Izoh (ixtiyoriy)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Qo'shimcha ma'lumot..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setAmount('')
                    setNotes('')
                    setError('')
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200 font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium"
                >
                  Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerPayments
