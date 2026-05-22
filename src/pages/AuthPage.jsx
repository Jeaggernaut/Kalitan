import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthForm from '../components/Auth/AuthForm'
import AuthIllustration from '../components/Auth/AuthIllustration'
import '../components/Auth/Auth.css'

const validModes = ['login', 'register']

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = useMemo(() => {
    const requestedMode = searchParams.get('mode') ?? 'login'
    return validModes.includes(requestedMode) ? requestedMode : 'login'
  }, [searchParams])

  const initialType = searchParams.get('type') ?? ''

  useEffect(() => {
    document.title = mode === 'register'
      ? 'Registrarse | Kalitán'
      : 'Iniciar sesión | Kalitán'
  }, [mode])

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
