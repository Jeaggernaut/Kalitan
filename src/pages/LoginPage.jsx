import { useState } from 'react'
import Button from '../components/Button/Button'
import './LoginPage.css'

const roles = ['Negocio', 'Voluntario', 'Administrador']

export default function LoginPage() {
  const [role, setRole] = useState('Negocio')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Inicio de sesión listo para conectar con el backend.')
  }

  return (
    <section className="login-page">
      <div className="login-page__panel">
        <div className="login-page__intro">
          <span className="login-page__badge">Acceso seguro</span>
          <h1>Inicia sesión en Kalitán</h1>
          <p>Gestiona excedentes, rescates y entregas desde tu espacio de trabajo.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <fieldset className="login-form__roles">
            <legend>Tipo de cuenta</legend>
            <div>
              {roles.map((option) => (
                <label className="login-role" key={option}>
                  <input
                    type="radio"
                    name="role"
                    checked={role === option}
                    onChange={() => setRole(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="login-field">
            Correo electrónico
            <input type="email" placeholder="tu@correo.com" autoComplete="email" required />
          </label>

          <label className="login-field">
            Contraseña
            <input type="password" placeholder="Ingresa tu contraseña" autoComplete="current-password" required />
          </label>

          <div className="login-form__meta">
            <label>
              <input type="checkbox" />
              Recordarme
            </label>
            <a href="#recuperar">Olvidé mi contraseña</a>
          </div>

          <Button type="submit" variant="primary">Entrar al panel</Button>

          {message && <p className="login-form__message">{message}</p>}
        </form>
      </div>

      <aside className="login-page__aside">
        <div className="login-summary">
          <span>✓</span>
          <div>
            <h2>Operación clara y trazable</h2>
            <p>Consulta publicaciones, asignaciones y reportes de impacto desde una sola cuenta.</p>
          </div>
        </div>
        <div className="login-stats">
          <article>
            <strong>24/7</strong>
            <p>Seguimiento de actividad</p>
          </article>
          <article>
            <strong>3 roles</strong>
            <p>Acceso por perfil</p>
          </article>
        </div>
      </aside>
    </section>
  )
}
