import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sahifa topilmadi</h2>
        <p className="text-gray-600 mb-8">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center space-x-2">
          <Home className="w-5 h-5" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
