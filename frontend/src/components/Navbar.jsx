import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  const cartCount = getCartCount()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-600">OptoMarket.uz</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Bosh sahifa
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition">
              Mahsulotlar
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition">
              Kategoriyalar
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-primary-600 transition"
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
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Chiqish</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Kirish
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
