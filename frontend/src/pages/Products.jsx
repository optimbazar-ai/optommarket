import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, SlidersHorizontal, Grid, List, ArrowUpDown, X, Package } from 'lucide-react'
import { productsAPI, categoriesAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [searchParams])

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll()
      setCategories(data.data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (searchParams.get('search')) params.search = searchParams.get('search')
      if (searchParams.get('category')) params.category = searchParams.get('category')
      if (searchParams.get('minPrice')) params.minPrice = searchParams.get('minPrice')
      if (searchParams.get('maxPrice')) params.maxPrice = searchParams.get('maxPrice')
      
      const data = await productsAPI.getAll(params)
      setProducts(data.data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const newParams = {}
    if (filters.search) newParams.search = filters.search
    if (filters.category) newParams.category = filters.category
    if (filters.minPrice) newParams.minPrice = filters.minPrice
    if (filters.maxPrice) newParams.maxPrice = filters.maxPrice
    setSearchParams(newParams)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-2">
                  Barcha mahsulotlar
                </h1>
                <p className="text-gray-600 dark:text-dark-muted text-lg">
                  {products.length > 0 ? `${products.length} ta mahsulot topildi` : 'Mahsulotlarni tanlang'}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-bg'
                      }`}
                      title="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-bg'
                      }`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Toggle Filters Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filtrlar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Filter className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">Filtrlar</h2>
              </div>
              <button
                onClick={() => {
                  setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: 'newest' })
                  setSearchParams({})
                }}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <X className="w-4 h-4" />
                Tozalash
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                  Qidirish
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mahsulot nomi yoki tavsif..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                    Kategoriya
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Barchasi</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                    Min narx (so'm)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                    Max narx (so'm)
                  </label>
                  <input
                    type="number"
                    placeholder="Cheksiz"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-3">
                    Saralash
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="newest">Eng yangi</option>
                    <option value="price-asc">Arzon → Qimmat</option>
                    <option value="price-desc">Qimmat → Arzon</option>
                    <option value="name-asc">Nomi (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Qo'llash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <p className="text-gray-600 dark:text-dark-muted font-medium">Mahsulotlar yuklanmoqda...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">
              Mahsulot topilmadi
            </h3>
            <p className="text-gray-600 dark:text-dark-muted mb-8 max-w-md mx-auto">
              Sizning qidiruv kriteriyalaringizga mos mahsulot yo'q. Filtrlarni o'zgartirib ko'ring.
            </p>
            <button
              onClick={() => {
                setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: 'newest' })
                setSearchParams({})
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {products.map((product, index) => (
              <div 
                key={product._id}
                className="animate-fade-in"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
