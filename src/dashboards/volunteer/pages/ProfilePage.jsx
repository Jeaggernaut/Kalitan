import { motion } from 'framer-motion'
import { Camera, Save, X } from 'lucide-react'
import { useState } from 'react'
import { updateProfile } from '../../../services/volunteerService'
import { allTransports, allZones, volunteerProfile } from '../mock/volunteerMockData'

export default function ProfilePage({ notify }) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ ...volunteerProfile })
  const [skillInput, setSkillInput] = useState('')

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const addSkill = () => {
    const skill = skillInput.trim()
    if (skill && !form.skills.includes(skill)) {
      update('skills', [...form.skills, skill])
    }
    setSkillInput('')
  }

  const removeSkill = (skill) => update('skills', form.skills.filter((s) => s !== skill))

  const handleSave = async () => {
    setLoading(true)
    const result = await updateProfile(form)
    setLoading(false)
    if (result.success) {
      setEditing(false)
      notify('Perfil actualizado correctamente.')
    }
  }

  const handleCancel = () => {
    setForm({ ...volunteerProfile })
    setEditing(false)
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
          <h2 className="vpage__title">Mi perfil</h2>
          <p className="vpage__subtitle">Información personal y preferencias</p>
        </div>
        {!editing ? (
          <button type="button" className="vaction-btn is-secondary" onClick={() => setEditing(true)}>
            Editar perfil
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button type="button" className="vaction-btn is-ghost" onClick={handleCancel}>
              <X size={16} /> Cancelar
            </button>
            <button type="button" className="vaction-btn is-primary" onClick={handleSave} disabled={loading}>
              <Save size={16} /> {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </div>

      <div className="vprofile-layout">
        <div className="volunteer-panel vprofile-avatar-card">
          <div className="vprofile-avatar">
            <span>{form.initials}</span>
            {editing && (
              <button type="button" className="vprofile-avatar__upload" aria-label="Cambiar avatar">
                <Camera size={18} />
              </button>
            )}
          </div>
          <h3>{form.name}</h3>
          <span className="vstatus-badge is-available">{form.status}</span>
          <p className="vprofile-join">Voluntario desde {form.joinDate}</p>
        </div>

        <div className="vprofile-form-card volunteer-panel">
          <h3>Información personal</h3>
          <div className="vprofile-form">
            <div className="vform-field">
              <label>Nombre completo</label>
              <input
                type="text"
                value={form.name}
                disabled={!editing}
                onChange={(e) => update('name', e.target.value)}
              />
            </div>
            <div className="vform-field">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={form.email}
                disabled={!editing}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div className="vform-field">
              <label>Teléfono</label>
              <input
                type="tel"
                value={form.phone}
                disabled={!editing}
                onChange={(e) => update('phone', e.target.value)}
              />
            </div>
            <div className="vform-field">
              <label>Dirección</label>
              <input
                type="text"
                value={form.address}
                disabled={!editing}
                onChange={(e) => update('address', e.target.value)}
              />
            </div>
            <div className="vform-field">
              <label>Medio de transporte</label>
              <select
                value={form.transport}
                disabled={!editing}
                onChange={(e) => update('transport', e.target.value)}
              >
                {allTransports.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="vform-field">
              <label>Zona de apoyo principal</label>
              <select
                value={form.zone}
                disabled={!editing}
                onChange={(e) => update('zone', e.target.value)}
              >
                {allZones.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>

          <div className="vprofile-skills">
            <label>Habilidades</label>
            <div className="vskills-list">
              {form.skills.map((skill) => (
                <span key={skill} className="vskill-tag">
                  {skill}
                  {editing && (
                    <button type="button" onClick={() => removeSkill(skill)} aria-label="Eliminar habilidad">
                      <X size={13} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {editing && (
              <div className="vskills-add">
                <input
                  type="text"
                  placeholder="Agregar habilidad..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                />
                <button type="button" className="vaction-btn is-secondary" onClick={addSkill}>
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
