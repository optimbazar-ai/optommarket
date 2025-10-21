'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <CartProvider>
      {isAdminPage ? (
        // Admin pages: No Navbar/Footer, only content
        <>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </>
      ) : (
        // Regular pages: With Navbar, Footer, and ChatBot
        <>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              {children}
            </main>
            <Footer />
          </div>
          <ChatBot />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </>
      )}
    </CartProvider>
  );
}
