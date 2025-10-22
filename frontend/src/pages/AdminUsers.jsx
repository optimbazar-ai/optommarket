import { useState, useEffect } from 'react'
import { Shield, ShieldOff, Trash2, RefreshCw } from 'lucide-react'
import { adminAPI } from '../services/api'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const response = await adminAPI.getUsers()
      setUsers(response.data)
    } catch (err) {
      console.error('Error loading users:', err)
      setError('Foydalanuvchilarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAdmin = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'seller' : 'admin'
    
    if (!confirm(`Foydalanuvchini ${newRole === 'admin' ? 'admin qilish' : 'admin huquqini olib tashlash'}ni tasdiqlaysizmi?`)) {
      return
    }

    try {
      await adminAPI.updateUserRole(userId, newRole)
      await loadUsers()
    } catch (err) {
      console.error('Error updating role:', err)
      alert('Rolni yangilashda xatolik')
    }
  }

  const handleDelete = async (userId) => {
    if (!confirm('Foydalanuvchini o\'chirishni tasdiqlaysizmi?')) return

    try {
      await adminAPI.deleteUser(userId)
      await loadUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
      alert(err.message || 'Foydalanuvchini o\'chirishda xatolik')
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-red-100 text-red-800',
      seller: 'bg-blue-100 text-blue-800',
      buyer: 'bg-green-100 text-green-800'
    }
    
    const labels = {
      admin: 'Admin',
      seller: 'Sotuvchi',
      buyer: 'Xaridor'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role] || 'bg-gray-100 text-gray-800'}`}>
        {labels[role] || role}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Foydalanuvchilar</h1>
        <button
          onClick={loadUsers}
          className="btn btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Yangilash
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Jami foydalanuvchilar</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Adminlar</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Sotuvchilar</p>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'seller').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Xaridorlar</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'buyer').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Foydalanuvchi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Telefon</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rol</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ro'yxatdan o'tgan</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      {user.companyName && (
                        <p className="text-sm text-gray-600">{user.companyName}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.phone || '-'}
                  </td>
                  <td className="py-3 px-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleAdmin(user._id, user.role)}
                        className={`p-2 rounded-lg transition ${
                          user.role === 'admin'
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title={user.role === 'admin' ? 'Admin huquqini olib tashlash' : 'Admin qilish'}
                      >
                        {user.role === 'admin' ? (
                          <ShieldOff className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
