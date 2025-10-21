'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-200 transition">
            🛒 <span>OPTOMMARKET</span>
          </Link>

          <div className="hidden md:flex gap-6 items-center">
            <Link href="/products" className="hover:text-blue-200 transition">
              📦 Mahsulotlar
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/orders" className="hover:text-blue-200 transition">
                  📋 Buyurtmalarim
                </Link>
                <Link href="/profile" className="hover:text-blue-200 transition">
                  👤 Profil
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Chiqish
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200 transition">
                  Kirish
                </Link>
                <Link 
                  href="/register" 
                  className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}

            <Link href="/cart" className="relative bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition">
              🛒 Savat
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/cart" className="relative">
              🛒 Savat ({itemCount})
            </Link>
          </div>
        </div>

        {user && (
          <div className="mt-2 text-sm text-blue-100">
            Salom, {user.username}! 👋
          </div>
        )}
      </div>
    </nav>
  );
}
