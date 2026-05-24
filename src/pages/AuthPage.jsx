import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import AuthForm from '../components/Auth/AuthForm'
import AuthIllustration from '../components/Auth/AuthIllustration'
import { getDashboardPathByRole } from '../data/roles'
import { useAuth } from '../hooks/useAuth'
import '../components/Auth/Auth.css'

const validModes = ['login', 'register']

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const mode = useMemo(() => {
    const pathMode = location.pathname.endsWith('/register') ? 'register' : 'login'
    const requestedMode = searchParams.get('mode') ?? pathMode
    return validModes.includes(requestedMode) ? requestedMode : 'login'
  }, [location.pathname, searchParams])

  const initialType = searchParams.get('type') ?? ''

  useEffect(() => {
    document.title = mode === 'register'
      ? 'Registrarse | Kalitán'
      : 'Iniciar sesión | Kalitán'
  }, [mode])

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardPathByRole(user.role), { replace: true })
    }
  }, [isAuthenticated, navigate, user])

  const handleModeChange = (nextMode) => {
    navigate(`/auth?mode=${nextMode}`)
  }

  return (
    <section className="auth-page">
      <div className="auth-page__shell">
        <AuthForm mode={mode} initialType={initialType} onModeChange={handleModeChange} />
        <AuthIllustration />
      </div>
    </section>
  )
}
