'use client';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ORDER_STATUS_UZ } from '@/lib/constants';

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  shipping_address?: string;
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { data: orders, loading, error } = useFetch<Order[]>('/orders/my-orders');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📋 Mening Buyurtmalarim</h1>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ⚠️ Xatolik: {error}
        </div>
      )}

      {!loading && orders && orders.length === 0 && (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-2xl text-gray-600">😔 Hali buyurtmalar yo'q</p>
          <a href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
            Mahsulotlarni ko'rish →
          </a>
        </div>
      )}

      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Buyurtma #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {ORDER_STATUS_UZ[order.status] || order.status}
              </span>
            </div>

            {order.shipping_address && (
              <p className="text-sm text-gray-600 mb-3">
                📍 {order.shipping_address}
              </p>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-bold text-xl text-green-600">
                {order.total_price.toLocaleString()} so'm
              </span>
              <button className="text-blue-600 hover:underline">
                Batafsil →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
