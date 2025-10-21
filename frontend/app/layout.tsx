'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <CartProvider>
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
        </CartProvider>
      </body>
    </html>
  )
}
