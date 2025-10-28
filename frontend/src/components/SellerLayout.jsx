import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, LogOut, Store, User, Settings, Bell, Home, DollarSign } from 'lucide-react'

const SellerLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Check if user is seller
  if (!user || user.role !== 'seller') {
    navigate('/login')
    return null
  }

  const navItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Buyurtmalar' },
    { path: '/seller/products', icon: Package, label: 'Mahsulotlar' },
    { path: '/seller/analytics', icon: TrendingUp, label: 'Statistika' },
    { path: '/seller/payments', icon: DollarSign, label: 'To\'lovlar' },
    { path: '/seller/settings', icon: Settings, label: 'Sozlamalar' },
  ]

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 shadow-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">OptomMarket</h1>
                  <p className="text-xs text-blue-100">Sotuvchi Paneli</p>
                </div>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Home Button */}
              <Link
                to="/"
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Do'kon</span>
              </Link>

              {/* Notifications */}
              <button className="relative p-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-700"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-blue-100">Sotuvchi</p>
                </div>
                <div className="relative group">
                  <button className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
                    <span className="text-white font-bold text-sm">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                        <Settings className="w-4 h-4" />
                        Sozlamalar
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4" />
                        Chiqish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border mb-8 overflow-hidden">
          <nav className="flex flex-wrap">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-6 py-4 font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600'
                      : 'text-gray-600 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-dark-bg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {active && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-50 rounded-t"></div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Page Content */}
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SellerLayout
