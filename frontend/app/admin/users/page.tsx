'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/constants';
import toast from 'react-hot-toast';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  orders_count: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Foydalanuvchilarni olishda xatolik');

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Users error:', error);
      toast.error('Foydalanuvchilarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async (userId: number, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    
    if (!confirm(`Rostdan ham bu foydalanuvchini ${newRole} qilmoqchimisiz?`)) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      toast.success(data.message);
      fetchUsers();
    } catch (error: any) {
      console.error('Role toggle error:', error);
      toast.error(error.message || 'Role o\'zgartirishda xatolik');
    }
  };

  const handleDelete = async (userId: number, username: string) => {
    if (!confirm(`Rostdan ham ${username} ni o'chirmoqchimisiz?`)) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      toast.success(data.message);
      fetchUsers();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'O\'chirishda xatolik');
    }
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.role === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">👥 Foydalanuvchilar Boshqaruvi</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Barchasi ({users.length})
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            👑 Adminlar ({users.filter(u => u.role === 'admin').length})
          </button>
          <button
            onClick={() => setFilter('customer')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'customer' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            👤 Mijozlar ({users.filter(u => u.role === 'customer').length})
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foydalanuvchi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefon</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyurtmalar</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ro'yxatdan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#{user.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{user.phone || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                        : 'bg-green-100 text-green-800 border border-green-300'
                    }`}>
                      {user.role === 'admin' ? '👑 Admin' : '👤 Mijoz'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{user.orders_count}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        className={`text-xs px-3 py-1 rounded font-medium ${
                          user.role === 'admin'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                        }`}
                      >
                        {user.role === 'admin' ? '⬇ Admin olib tashlash' : '⬆ Admin qilish'}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.username)}
                        className="text-xs px-3 py-1 rounded font-medium bg-red-100 text-red-800 hover:bg-red-200"
                      >
                        ❌ O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 py-4">Foydalanuvchilar yo'q</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Jami Foydalanuvchilar</p>
              <p className="text-3xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Adminlar</p>
              <p className="text-3xl font-bold text-gray-800">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="text-4xl">👑</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Mijozlar</p>
              <p className="text-3xl font-bold text-gray-800">
                {users.filter(u => u.role === 'customer').length}
              </p>
            </div>
            <div className="text-4xl">👤</div>
          </div>
        </div>
      </div>
    </div>
  );
}
