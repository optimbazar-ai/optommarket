import { useState, useEffect } from 'react'
import { User, Building2, CreditCard, Lock, Mail, Phone, MapPin, Save, AlertCircle, CheckCircle, Shield, DollarSign, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const SellerSettings = () => {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: {
      street: '',
      city: '',
      region: '',
      postalCode: ''
    }
  })

  const [sellerData, setSellerData] = useState({
    inn: '',
    bankAccount: '',
    bankName: '',
    bio: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        companyName: user.companyName || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          region: user.address?.region || '',
          postalCode: user.address?.postalCode || ''
        }
      })

      setSellerData({
        inn: user.sellerInfo?.inn || '',
        bankAccount: user.sellerInfo?.bankAccount || '',
        bankName: user.sellerInfo?.bankName || '',
        bio: user.sellerInfo?.bio || ''
      })
    }
  }, [user])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setProfileData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }))
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSellerChange = (e) => {
    const { name, value } = e.target
    setSellerData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await api.put('/auth/profile', {
        ...profileData,
        sellerInfo: sellerData
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.success) {
        setSuccess('Profil muvaffaqiyatli yangilandi')
        // Update auth context if needed
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Profilni yangilashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Yangi parollar mos kelmayapti')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
      return
    }

    setLoading(true)

    try {
      const response = await api.put('/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.success) {
        setSuccess('Parol muvaffaqiyatli o\'zgartirildi')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Parolni o\'zgartirishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profil ma\'lumotlari', icon: User },
    { id: 'business', label: 'Biznes ma\'lumotlari', icon: Building2 },
    { id: 'payment', label: 'To\'lov ma\'lumotlari', icon: CreditCard },
    { id: 'security', label: 'Xavfsizlik', icon: Lock }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl shadow-lg p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8" />
              Profil sozlamalari
            </h1>
            <p className="text-blue-100">Hisobingizni boshqaring va ma'lumotlarni yangilang</p>
          </div>
          
          {/* Seller Status */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Reyting</span>
            </div>
            <p className="text-2xl font-bold">{user?.sellerInfo?.rating?.toFixed(1) || '0.0'}</p>
            <p className="text-sm text-blue-100">{user?.sellerInfo?.reviewCount || 0} sharh</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border mb-6">
        <div className="flex flex-wrap border-b border-gray-200 dark:border-dark-border">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setError('')
                  setSuccess('')
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-dark-muted hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-dark-bg'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    To'liq ism *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+998 90 123 45 67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Kompaniya nomi
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={profileData.companyName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="border-t border-gray-200 dark:border-dark-border pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Manzil
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                      Ko'cha
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={profileData.address.street}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                      Shahar
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={profileData.address.city}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                      Viloyat
                    </label>
                    <input
                      type="text"
                      name="address.region"
                      value={profileData.address.region}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          )}

          {/* Business Tab */}
          {activeTab === 'business' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Bio / Kompaniya haqida
                </label>
                <textarea
                  name="bio"
                  value={sellerData.bio}
                  onChange={handleSellerChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Kompaniyangiz va faoliyatingiz haqida qisqacha ma'lumot..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  STIR / INN
                </label>
                <input
                  type="text"
                  name="inn"
                  value={sellerData.inn}
                  onChange={handleSellerChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="123456789"
                />
                <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
                  Soliq to'lovchi identifikatsiya raqami
                </p>
              </div>

              {/* Stats Display */}
              <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Jami sotuvlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                    {user?.sellerInfo?.totalSales || 0}
                  </p>
                </div>

                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Reyting</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                    {user?.sellerInfo?.rating?.toFixed(1) || '0.0'}
                  </p>
                </div>

                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-dark-muted">Holat</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                    {user?.sellerInfo?.verified ? '✅ Tasdiqlangan' : '⏳ Kutilmoqda'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Bank nomi *
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={sellerData.bankName}
                  onChange={handleSellerChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Masalan: Xalq Banki"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Hisob raqami (IBAN) *
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={sellerData.bankAccount}
                  onChange={handleSellerChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="UZ00 0000 0000 0000 0000 0000 0000"
                />
                <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
                  To'lovlar ushbu hisob raqamiga o'tkaziladi
                </p>
              </div>

              {/* Balance Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-dark-muted mb-1">Joriy balans</p>
                    <p className="text-3xl font-bold text-green-600">
                      {new Intl.NumberFormat('uz-UZ').format(user?.sellerInfo?.balance || 0)} so'm
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-600 opacity-50" />
                </div>
                <p className="text-sm text-gray-600 dark:text-dark-muted mt-4">
                  Komissiya: {user?.sellerInfo?.commission || 10}%
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Joriy parol *
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Yangi parol *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Yangi parolni tasdiqlang *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Parol talablari:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                  <li>• Kamida 6 ta belgi</li>
                  <li>• Katta va kichik harflar</li>
                  <li>• Raqamlar va maxsus belgilar tavsiya etiladi</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Lock className="w-5 h-5" />
                  {loading ? 'Saqlanmoqda...' : 'Parolni o\'zgartirish'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerSettings
