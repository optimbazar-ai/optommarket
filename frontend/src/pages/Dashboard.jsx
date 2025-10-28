import { useAuth } from '../context/AuthContext'
import { User, Mail, Phone, Building, Shield } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{user.email}</span>
              </div>

              {user.phone && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
              )}

              {user.companyName && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span>{user.companyName}</span>
                </div>
              )}

              <div className="flex items-center space-x-3 text-gray-700">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button className="btn btn-outline w-full">
                Profilni tahrirlash
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Xush kelibsiz, {user.name}!</h3>
            <p className="text-primary-100">
              OptomMarket.uz platformasidan foydalanganingiz uchun rahmat.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-gray-600 text-sm mb-2">Jami buyurtmalar</h4>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-gray-600 text-sm mb-2">Faol buyurtmalar</h4>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-gray-600 text-sm mb-2">Saralangan</h4>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">So'nggi faoliyat</h3>
            <div className="text-center py-12 text-gray-500">
              <p>Hozircha faoliyat yo'q</p>
              <p className="text-sm mt-2">Mahsulotlarni ko'rib chiqing va buyurtma bering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
