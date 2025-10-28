import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, ShoppingBag, Package, Users, Eye, Star, ArrowUp, ArrowDown, Calendar } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../services/api'

const SellerAnalytics = () => {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('month') // week, month, year
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    avgOrderValue: 0,
    revenueGrowth: 0,
    ordersGrowth: 0
  })
  const [salesData, setSalesData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      // Load products
      const productsRes = await api.get('/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const products = productsRes.data.data || []

      // Load orders
      const ordersRes = await api.get('/admin/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const orders = ordersRes.data.data || []

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
      const totalOrders = orders.length
      const totalProducts = products.length
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Calculate growth (mock data for now)
      const revenueGrowth = 15.3
      const ordersGrowth = 8.7

      setStats({
        totalRevenue,
        totalOrders,
        totalProducts,
        avgOrderValue,
        revenueGrowth,
        ordersGrowth
      })

      // Generate sales data for chart
      generateSalesData(orders)

      // Calculate top products
      calculateTopProducts(products)

      // Calculate category distribution
      calculateCategoryData(products)

    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSalesData = (orders) => {
    // Group orders by date
    const dateMap = new Map()
    
    orders.forEach(order => {
      const date = new Date(order.createdAt)
      const dateKey = `${date.getDate()}.${date.getMonth() + 1}`
      
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { date: dateKey, revenue: 0, orders: 0 })
      }
      
      const entry = dateMap.get(dateKey)
      entry.revenue += order.totalPrice
      entry.orders += 1
    })

    const data = Array.from(dateMap.values()).slice(-30)
    setSalesData(data)
  }

  const calculateTopProducts = (products) => {
    const sorted = [...products]
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 5)
      .map(p => ({
        name: p.name,
        sold: p.soldCount || 0,
        views: p.viewCount || 0,
        revenue: (p.soldCount || 0) * p.price
      }))
    
    setTopProducts(sorted)
  }

  const calculateCategoryData = (products) => {
    const categoryMap = new Map()
    
    products.forEach(product => {
      const categoryName = product.category?.name || 'Boshqa'
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, 0)
      }
      categoryMap.set(categoryName, categoryMap.get(categoryName) + 1)
    })

    const data = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value
    }))
    
    setCategoryData(data)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary-600" />
            Statistika va Hisobotlar
          </h1>
          <p className="text-gray-600 dark:text-dark-muted mt-2">
            Savdo va mahsulotlar bo'yicha batafsil tahlil
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="week">Oxirgi hafta</option>
            <option value="month">Oxirgi oy</option>
            <option value="year">Oxirgi yil</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <div className="flex items-center gap-1 text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
              <ArrowUp className="w-4 h-4" />
              {stats.revenueGrowth}%
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Jami daromad</p>
          <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 opacity-80" />
            <div className="flex items-center gap-1 text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
              <ArrowUp className="w-4 h-4" />
              {stats.ordersGrowth}%
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Jami buyurtmalar</p>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>

        {/* Total Products */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">Jami mahsulotlar</p>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>

        {/* Avg Order Value */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-sm opacity-90 mb-1">O'rtacha buyurtma</p>
          <p className="text-2xl font-bold">{formatPrice(stats.avgOrderValue)}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6">
            Savdo dinamikasi
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Daromad"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Buyurtmalar"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6">
            Kategoriyalar bo'yicha
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Top mahsulotlar
        </h3>

        {topProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-dark-muted">Hozircha ma'lumot yo'q</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tl-lg">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Mahsulot
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Sotildi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                    Ko'rildi
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text rounded-tr-lg">
                    Daromad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                        <span className="text-primary-600 font-bold">{index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900 dark:text-dark-text">{product.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900 dark:text-dark-text">
                          {product.sold}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600 dark:text-dark-muted">
                          {product.views}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-600">
                        {formatPrice(product.revenue)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6">
          Daromad taqsimoti
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData.slice(-7)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Daromad" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SellerAnalytics
