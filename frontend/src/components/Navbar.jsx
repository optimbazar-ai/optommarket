import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard, Moon, Sun, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useDarkMode } from '../context/DarkModeContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { getCartCount } = useCart()
  const { isDark, toggleDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const cartCount = getCartCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-dark-surface shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">OptomMarket.uz</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition">
              Bosh sahifa
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition">
              Mahsulotlar
            </Link>
            <Link to="/categories" className="text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition">
              Kategoriyalar
            </Link>
            <Link to="/blog" className="text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition">
              Blog
            </Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
            
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin' : user?.role === 'seller' ? '/seller' : '/dashboard'}
                  className="flex items-center space-x-1 text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>
                    {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'seller' ? 'Sotuvchi Panel' : 'Dashboard'}
                  </span>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600 dark:text-dark-muted" />
                  <span className="text-sm text-gray-700 dark:text-dark-text">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 dark:text-dark-text hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Chiqish</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                  Kirish
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-bg"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-dark-text" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg font-medium"
            >
              🏠 Bosh sahifa
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg font-medium"
            >
              🛍️ Mahsulotlar
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg font-medium"
            >
              📂 Kategoriyalar
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg font-medium"
            >
              📝 Blog
            </Link>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-border space-y-1">
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-dark-muted">
                  Salom, {user?.name}!
                </div>
                <Link
                  to={user?.role === 'admin' ? '/admin' : user?.role === 'seller' ? '/seller' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg font-medium"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'seller' ? 'Sotuvchi Panel' : 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Chiqish
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-dark-border space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-medium"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
