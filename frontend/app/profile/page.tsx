'use client';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">👤 Profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Shaxsiy Ma'lumotlar</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Username</label>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Rol</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? '👑 Admin' : '👤 Foydalanuvchi'}
              </span>
            </div>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Tahrirlash
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Tez Havolalar</h2>

          <div className="space-y-3">
            <a 
              href="/orders" 
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Buyurtmalarim</p>
                  <p className="text-sm text-gray-600">Barcha buyurtmalarni ko'rish</p>
                </div>
                <span className="text-2xl">📋</span>
              </div>
            </a>

            <a 
              href="/cart" 
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Savat</p>
                  <p className="text-sm text-gray-600">Savatdagi mahsulotlar</p>
                </div>
                <span className="text-2xl">🛒</span>
              </div>
            </a>

            <a 
              href="/products" 
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Mahsulotlar</p>
                  <p className="text-sm text-gray-600">Barcha mahsulotlar</p>
                </div>
                <span className="text-2xl">📦</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Jami Buyurtmalar</p>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Jami Xarajat</p>
          <p className="text-3xl font-bold">0 so'm</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Bonus Ballar</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
