import { motion } from 'framer-motion'
import { Bell, Eye, Key, LogOut, Moon, Save, Shield } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useTheme } from '../../../hooks/useTheme'

export default function SettingsPage({ notify }) {
  const { isDark, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [notifSettings, setNotifSettings] = useState({
    newRescues: true,
    reminders: true,
    badges: true,
    newsletter: false,
  })

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showStats: true,
  })

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwLoading, setPwLoading] = useState(false)

  const toggleNotif = (key) => setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  const togglePrivacy = (key) => setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (pwForm.next !== pwForm.confirm) {
      notify('Las contraseñas no coinciden.')
      return
    }
    setPwLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setPwLoading(false)
    setPwForm({ current: '', next: '', confirm: '' })
    notify('Contraseña actualizada correctamente.')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Configuración</h2>
          <p className="vpage__subtitle">Preferencias y ajustes de tu cuenta</p>
        </div>
      </div>

      <div className="vsettings-layout">
        <div className="volunteer-panel vsettings-section">
          <div className="vsettings-section__head">
            <Moon size={20} />
            <h3>Apariencia</h3>
          </div>
          <div className="vsettings-row">
            <div>
              <strong>Modo oscuro</strong>
              <span>Cambiar entre tema claro y oscuro</span>
            </div>
            <button
              type="button"
              className={`vsettings-toggle${isDark ? ' is-on' : ''}`}
              onClick={toggleTheme}
            >
              <span />
            </button>
          </div>
        </div>

        <div className="volunteer-panel vsettings-section">
          <div className="vsettings-section__head">
            <Bell size={20} />
            <h3>Notificaciones</h3>
          </div>
          {[
            { key: 'newRescues', label: 'Nuevos rescates disponibles', desc: 'Aviso cuando hay rescates cerca de ti' },
            { key: 'reminders', label: 'Recordatorios de rescate', desc: 'Aviso 30 minutos antes de tu rescate' },
            { key: 'badges', label: 'Logros y reconocimientos', desc: 'Aviso al desbloquear un badge' },
            { key: 'newsletter', label: 'Novedades de Kalitán', desc: 'Actualizaciones y noticias del proyecto' },
          ].map((item) => (
            <div key={item.key} className="vsettings-row">
              <div>
                <strong>{item.label}</strong>
                <span>{item.desc}</span>
              </div>
              <button
                type="button"
                className={`vsettings-toggle${notifSettings[item.key] ? ' is-on' : ''}`}
                onClick={() => toggleNotif(item.key)}
              >
                <span />
              </button>
            </div>
          ))}
        </div>

        <div className="volunteer-panel vsettings-section">
          <div className="vsettings-section__head">
            <Eye size={20} />
            <h3>Privacidad</h3>
          </div>
          {[
            { key: 'showProfile', label: 'Mostrar perfil público', desc: 'Otros voluntarios pueden ver tu perfil' },
            { key: 'showStats', label: 'Mostrar estadísticas', desc: 'Tu impacto es visible para la comunidad' },
          ].map((item) => (
            <div key={item.key} className="vsettings-row">
              <div>
                <strong>{item.label}</strong>
                <span>{item.desc}</span>
              </div>
              <button
                type="button"
                className={`vsettings-toggle${privacy[item.key] ? ' is-on' : ''}`}
                onClick={() => togglePrivacy(item.key)}
              >
                <span />
              </button>
            </div>
          ))}
        </div>

        <div className="volunteer-panel vsettings-section">
          <div className="vsettings-section__head">
            <Key size={20} />
            <h3>Seguridad</h3>
          </div>
          <form className="vpassword-form" onSubmit={handlePasswordChange}>
            <div className="vform-field">
              <label>Contraseña actual</label>
              <input
                type="password"
                value={pwForm.current}
                onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
            <div className="vform-row">
              <div className="vform-field">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  value={pwForm.next}
                  onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <div className="vform-field">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" className="vaction-btn is-secondary" disabled={pwLoading}>
              <Save size={16} />
              {pwLoading ? 'Cambiando...' : 'Cambiar contraseña'}
            </button>
          </form>
        </div>

        <div className="volunteer-panel vsettings-section vsettings-danger">
          <div className="vsettings-section__head">
            <Shield size={20} />
            <h3>Cuenta</h3>
          </div>
          <div className="vsettings-row">
            <div>
              <strong>Cerrar sesión</strong>
              <span>Salir de tu cuenta en este dispositivo</span>
            </div>
            <button type="button" className="vaction-btn is-danger" onClick={handleLogout}>
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
