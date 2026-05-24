import { useMemo, useState } from 'react'
import { login as loginRequest, logout as logoutRequest, register as registerRequest } from '../services/authService'
import { AuthContext } from './authContext'

const AUTH_STORAGE_KEY = 'kalitan-auth-session'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
  } catch {
    return null
  }
}

function saveSession(session) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  const login = async (credentials) => {
    const nextSession = await loginRequest(credentials)
    saveSession(nextSession)
    setSession(nextSession)
    return nextSession
  }

  const register = async (payload) => {
    const nextSession = await registerRequest(payload)
    saveSession(nextSession)
    setSession(nextSession)
    return nextSession
  }

  const logout = async () => {
    await logoutRequest()
    clearSession()
    setSession(null)
  }

  const value = useMemo(() => ({
    user: session?.user ?? null,
    token: session?.token ?? '',
    isAuthenticated: Boolean(session?.user),
    login,
    logout,
    register,
  }), [session])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
