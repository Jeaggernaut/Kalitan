import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { useState } from 'react'
import { updateAvailability } from '../../../services/volunteerService'
import { allDays, allTransports, allZones, volunteerAvailability } from '../mock/volunteerMockData'

export default function AvailabilityPage({ notify }) {
  const [form, setForm] = useState({ ...volunteerAvailability })
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const toggleDay = (day) => {
    const days = form.days.includes(day)
      ? form.days.filter((d) => d !== day)
      : [...form.days, day]
    update('days', days)
  }

  const toggleZone = (zone) => {
    const zones = form.zones.includes(zone)
      ? form.zones.filter((z) => z !== zone)
      : [...form.zones, zone]
    update('zones', zones)
  }

  const handleSave = async () => {
    setLoading(true)
    const result = await updateAvailability(form)
    setLoading(false)
    notify(result.message)
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
          <h2 className="vpage__title">Disponibilidad</h2>
          <p className="vpage__subtitle">Configura cuándo y dónde puedes apoyar</p>
        </div>
        <div className="vavail-status-wrap">
          <span className="vavail-status-label">Estado:</span>
          <button
            type="button"
            className={`vavail-toggle${form.isAvailable ? ' is-on' : ''}`}
            onClick={() => update('isAvailable', !form.isAvailable)}
          >
            <span />
            {form.isAvailable ? 'Disponible' : 'No disponible'}
          </button>
        </div>
      </div>

      <div className="vavail-layout">
        <div className="volunteer-panel vavail-section">
          <h3>Días disponibles</h3>
          <p>Selecciona los días en que puedes realizar rescates</p>
          <div className="vavail-days">
            {allDays.map((day) => (
              <button
                key={day}
                type="button"
                className={`vavail-day-btn${form.days.includes(day) ? ' is-selected' : ''}`}
                onClick={() => toggleDay(day)}
              >
                {day.slice(0, 2)}
                <span>{day}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="volunteer-panel vavail-section">
          <h3>Horarios preferidos</h3>
          <p>Indica en qué horas puedes apoyar</p>
          <div className="vavail-times">
            <div className="vform-row">
              <div className="vform-field">
                <label>Mañana — inicio</label>
                <input type="time" value={form.morningStart} onChange={(e) => update('morningStart', e.target.value)} />
              </div>
              <div className="vform-field">
                <label>Mañana — fin</label>
                <input type="time" value={form.morningEnd} onChange={(e) => update('morningEnd', e.target.value)} />
              </div>
            </div>
            <div className="vform-row">
              <div className="vform-field">
                <label>Tarde — inicio</label>
                <input type="time" value={form.afternoonStart} onChange={(e) => update('afternoonStart', e.target.value)} />
              </div>
              <div className="vform-field">
                <label>Tarde — fin</label>
                <input type="time" value={form.afternoonEnd} onChange={(e) => update('afternoonEnd', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="volunteer-panel vavail-section">
          <h3>Transporte y radio</h3>
          <div className="vform-row">
            <div className="vform-field">
              <label>Medio de transporte</label>
              <select value={form.transport} onChange={(e) => update('transport', e.target.value)}>
                {allTransports.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="vform-field">
              <label>Radio máximo: {form.maxRadius} km</label>
              <input
                type="range"
                min={1}
                max={30}
                value={form.maxRadius}
                onChange={(e) => update('maxRadius', Number(e.target.value))}
              />
              <div className="vavail-range-labels">
                <span>1 km</span>
                <span>30 km</span>
              </div>
            </div>
          </div>
        </div>

        <div className="volunteer-panel vavail-section">
          <h3>Zonas de apoyo</h3>
          <p>Selecciona las zonas donde puedes apoyar</p>
          <div className="vavail-zones">
            {allZones.map((zone) => (
              <button
                key={zone}
                type="button"
                className={`vavail-zone-btn${form.zones.includes(zone) ? ' is-selected' : ''}`}
                onClick={() => toggleZone(zone)}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        <div className="vavail-actions">
          <button
            type="button"
            className="vaction-btn is-primary"
            onClick={handleSave}
            disabled={loading}
          >
            <Save size={18} />
            {loading ? 'Guardando...' : 'Guardar disponibilidad'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
