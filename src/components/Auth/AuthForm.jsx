import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboardPathByRole } from '../../data/roles'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const accountTypes = [
  { label: 'Negocio', value: 'BUSINESS' },
  { label: 'Voluntario', value: 'VOLUNTEER' },
  { label: 'Asociación receptora', value: 'ASSOCIATION' },
  { label: 'Beneficiario', value: 'BENEFICIARY' },
]

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: 'BUSINESS',
}

export default function AuthForm({ mode, initialType, onModeChange }) {
  const navigate = useNavigate()
  const auth = useAuth()
  const [formData, setFormData] = useState(() => ({
    ...initialForm,
    accountType: initialType === 'business' ? 'BUSINESS' : initialForm.accountType,
  }))
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const isRegister = mode === 'register'

  const title = isRegister ? 'Crea tu cuenta en Kalitán' : 'Inicia sesión'
  const description = isRegister
    ? 'Elige tu tipo de cuenta y empieza a participar en la red de rescate alimentario.'
    : 'Accede a tu panel para gestionar excedentes, rescates y reportes.'

  const selectedAccount = useMemo(
    () => accountTypes.find((type) => type.value === formData.accountType),
    [formData.accountType],
  )

  const updateField = (event) => {
    const { name, value } = event.target
    setFeedback({ type: '', message: '' })
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      return 'Ingresa correo electrónico y contraseña.'
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Ingresa un correo electrónico válido.'
    }

    if (formData.password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres.'
    }

    if (isRegister && !formData.fullName.trim()) {
      return 'Ingresa tu nombre completo.'
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden.'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateForm()

    if (validationError) {
      setFeedback({ type: 'error', message: validationError })
      return
    }

    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      if (isRegister) {
        const session = await auth.register({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          accountType: formData.accountType,
        })
        setFeedback({ type: 'success', message: `Cuenta ${selectedAccount?.label.toLowerCase()} creada correctamente.` })
        navigate(getDashboardPathByRole(session.user.role), { replace: true })
      } else {
        const session = await auth.login({
          email: formData.email.trim(),
          password: formData.password,
        })
        setFeedback({ type: 'success', message: 'Inicio de sesión correcto.' })
        navigate(getDashboardPathByRole(session.user.role), { replace: true })
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message ?? 'No fue posible completar la solicitud.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-card__header">
        <span>{isRegister ? 'Nuevo acceso' : 'Acceso seguro'}</span>
        <h1 id="auth-title">{title}</h1>
        <p>{description}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <label className="auth-field">
            Nombre completo
            <input
              name="fullName"
              value={formData.fullName}
              onChange={updateField}
              placeholder="Ej. Ana López Rivera"
              autoComplete="name"
            />
          </label>
        )}

        <label className="auth-field">
          Correo electrónico
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={updateField}
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          Contraseña
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={updateField}
            placeholder="Mínimo 8 caracteres"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
        </label>

        {isRegister && (
          <>
            <label className="auth-field">
              Confirmar contraseña
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={updateField}
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
              />
            </label>

            <fieldset className="auth-account-type">
              <legend>Tipo de cuenta</legend>
              <div>
                {accountTypes.map((type) => (
                  <label key={type.value}>
                    <input
                      type="radio"
                      name="accountType"
                      value={type.value}
                      checked={formData.accountType === type.value}
                      onChange={updateField}
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {feedback.message && (
          <p className={`auth-feedback auth-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
            {feedback.message}
          </p>
        )}

        <Button className="auth-form__submit" type="submit" variant="primary" disabled={loading}>
          {loading ? 'Procesando...' : isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="auth-switch">
        {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
        <button type="button" onClick={() => onModeChange(isRegister ? 'login' : 'register')}>
          {isRegister ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </section>
  )
}
