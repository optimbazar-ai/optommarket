import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Ensure product has _id field
      const productId = product._id || product.id
      if (!productId) {
        console.error('Product missing ID:', product)
        return prevCart
      }

      const existingItem = prevCart.find(item => {
        const itemId = item.product._id || item.product.id
        return itemId === productId
      })
      
      if (existingItem) {
        return prevCart.map(item => {
          const itemId = item.product._id || item.product.id
          return itemId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        })
      }
      
      return [...prevCart, { product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.wholesalePrice || item.product.price
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
