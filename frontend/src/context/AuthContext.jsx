import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      loadUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const loadUser = async () => {
    try {
      const data = await authAPI.getMe()
      setUser(data.data)
    } catch (error) {
      console.error('Failed to load user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    console.log('🔐 AuthContext login started...')
    const data = await authAPI.login(email, password)
    console.log('✅ Login response:', data)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    console.log('✅ Token saved, user set:', data.user)
    return data
  }

  const register = async (userData) => {
    const data = await authAPI.register(userData)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
