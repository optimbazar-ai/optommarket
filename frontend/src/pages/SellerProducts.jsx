import { useState, useEffect } from 'react'
import { Plus, Package, Edit, Trash2, Eye, Search, Filter, X, Save, Image as ImageIcon, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import ImageUpload from '../components/ImageUpload'

const SellerProducts = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    price: '',
    wholesalePrice: '',
    category: '',
    stock: '',
    minOrderQuantity: '1',
    unit: 'dona',
    brand: '',
    images: [],
    videoUrl: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setProducts(response.data)
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Mahsulotlarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : undefined,
        stock: parseInt(formData.stock),
        minOrderQuantity: parseInt(formData.minOrderQuantity),
        createdBy: user._id,
        approvalStatus: 'pending' // New products need approval
      }

      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setSuccess('Mahsulot muvaffaqiyatli yangilandi')
      } else {
        await api.post('/admin/products', productData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setSuccess('Mahsulot muvaffaqiyatli qo\'shildi va tasdiqlash kutilmoqda')
      }

      setShowModal(false)
      resetForm()
      loadProducts()
    } catch (error) {
      setError(error.response?.data?.message || 'Xatolik yuz berdi')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      detailedDescription: product.detailedDescription || '',
      price: product.price,
      wholesalePrice: product.wholesalePrice || '',
      category: product.category?._id || '',
      stock: product.stock,
      minOrderQuantity: product.minOrderQuantity,
      unit: product.unit,
      brand: product.brand || '',
      images: product.images || [],
      videoUrl: product.videoUrl || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Mahsulotni o\'chirishni xohlaysizmi?')) return

    try {
      await api.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setSuccess('Mahsulot o\'chirildi')
      loadProducts()
    } catch (error) {
      setError('O\'chirishda xatolik yuz berdi')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      detailedDescription: '',
      price: '',
      wholesalePrice: '',
      category: '',
      stock: '',
      minOrderQuantity: '1',
      unit: 'dona',
      brand: '',
      images: [],
      videoUrl: ''
    })
    setEditingProduct(null)
    setError('')
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category?._id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    }
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <AlertCircle className="w-4 h-4" />
    }
    const labels = {
      pending: 'Kutilmoqda',
      approved: 'Tasdiqlangan',
      rejected: 'Rad etilgan'
    }

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    )
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text flex items-center gap-3">
              <Package className="w-8 h-8 text-primary-600" />
              Mening mahsulotlarim
            </h1>
            <p className="text-gray-600 dark:text-dark-muted mt-2">
              Mahsulotlaringizni boshqaring va yangilarini qo'shing
            </p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="w-5 h-5" />
            Mahsulot qo'shish
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
          <button onClick={() => setError('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
          <button onClick={() => setSuccess('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Barcha kategoriyalar</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">
            Mahsulotlar topilmadi
          </h3>
          <p className="text-gray-600 dark:text-dark-muted mb-6">
            Hozircha mahsulotlaringiz yo'q. Yangi mahsulot qo'shing!
          </p>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            Birinchi mahsulotni qo'shish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 dark:bg-dark-bg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(product.approvalStatus)}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-dark-muted text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">
                      {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                    </p>
                    {product.wholesalePrice && (
                      <p className="text-sm text-gray-500 dark:text-dark-muted">
                        Ulgurji: {new Intl.NumberFormat('uz-UZ').format(product.wholesalePrice)} so'm
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-dark-muted">Ombor:</p>
                    <p className={`text-lg font-bold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock} {product.unit}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-600 dark:text-dark-muted">Ko'rildi</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-dark-text">{product.viewCount || 0}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-600 dark:text-dark-muted">Sotildi</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-dark-text">{product.soldCount || 0}</p>
                  </div>
                </div>

                {/* Rejection Reason */}
                {product.approvalStatus === 'rejected' && product.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800 font-medium mb-1">Rad etilish sababi:</p>
                    <p className="text-sm text-red-700">{product.rejectionReason}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
                {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-dark-text" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Mahsulot nomi *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Masalan: Samsung Galaxy A54"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Qisqa ta'rif *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  maxLength="500"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Mahsulot haqida qisqacha (max 500 belgi)..."
                />
                <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                  {formData.description.length}/500 belgi
                </p>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  Batafsil ma'lumot
                </label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  rows="6"
                  maxLength="5000"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Mahsulot haqida to'liq ma'lumot: xususiyatlari, qo'llanilishi, afzalliklari va h.k. (max 5000 belgi)"
                />
                <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                  {formData.detailedDescription.length}/5000 belgi
                </p>
              </div>

              {/* Price and Wholesale Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Narxi (so'm) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="100000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Ulgurji narx (so'm)
                  </label>
                  <input
                    type="number"
                    name="wholesalePrice"
                    value={formData.wholesalePrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="80000"
                  />
                </div>
              </div>

              {/* Category and Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Kategoriya *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Kategoriyani tanlang</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Brend
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Samsung"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <ImageUpload
                  images={formData.images}
                  onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))}
                  maxImages={5}
                  label="Mahsulot rasmlari"
                />
              </div>

              {/* YouTube Video URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                  YouTube Video Link (ixtiyoriy)
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  📹 YouTube video linkini qo'shing (masalan: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                </p>
              </div>

              {/* Stock, Min Order, Unit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Ombor soni *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Min. buyurtma *
                  </label>
                  <input
                    type="number"
                    name="minOrderQuantity"
                    value={formData.minOrderQuantity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    O'lchov birligi *
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="dona">Dona</option>
                    <option value="kg">Kg</option>
                    <option value="quti">Quti</option>
                    <option value="metr">Metr</option>
                    <option value="litr">Litr</option>
                    <option value="toplam">To'plam</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200 font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? 'Saqlash' : 'Qo\'shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerProducts
