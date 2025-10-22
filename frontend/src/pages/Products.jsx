import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
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
    maxPrice: ''
  })

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Mahsulotlar</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Mahsulot qidirish..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Qidirish
            </button>
          </div>

          {/* Category and Price Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategoriya
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input"
              >
                <option value="">Barcha kategoriyalar</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min narx
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max narx
              </label>
              <input
                type="number"
                placeholder="100000000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="input"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Mahsulot topilmadi</h3>
          <p className="text-gray-600">Boshqa filtrlarni sinab ko'ring</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">{products.length} ta mahsulot topildi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
