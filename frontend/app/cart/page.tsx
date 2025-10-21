'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Buyurtma berish uchun tizimga kiring!');
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Savat Bo'sh</h1>
          <p className="text-gray-600 mb-8">Hozircha savatingizda mahsulot yo'q</p>
          <Link 
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Mahsulotlarni ko'rish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🛒 Savat</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 transition"
        >
          Tozalash
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex gap-4">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl">
                  📦
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-green-600 font-bold text-xl mb-3">
                  {item.price.toLocaleString()} so'm
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-200 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-200 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️ O'chirish
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Jami</p>
                <p className="font-bold text-xl">
                  {(item.price * item.quantity).toLocaleString()} so'm
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Jami</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar ({items.length})</span>
                <span>{total.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish</span>
                <span className="text-green-600">Bepul</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl">
                <span>Jami</span>
                <span className="text-green-600">{total.toLocaleString()} so'm</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Buyurtma Berish
            </button>

            <Link
              href="/products"
              className="block w-full text-center bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition mt-3"
            >
              Davom ettirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
