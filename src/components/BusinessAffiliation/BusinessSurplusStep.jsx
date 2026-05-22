import Button from '../Button/Button'

const surplusTypes = ['Pan y repostería', 'Frutas y verduras', 'Comida preparada', 'Lácteos', 'Abarrotes', 'Bebidas']

export default function BusinessSurplusStep({ data, errors, onChange, onBack, onNext }) {
  const toggleSurplusType = (type) => {
    const nextTypes = data.surplusTypes.includes(type)
      ? data.surplusTypes.filter((item) => item !== type)
      : [...data.surplusTypes, type]

    onChange('surplusTypes', nextTypes)
  }

  return (
    <div className="business-step">
      <div className="business-step__header">
        <h2>Sobre tus excedentes</h2>
        <p>Ayúdanos a entender qué tipo de alimentos podríamos rescatar.</p>
      </div>

      <fieldset className="business-choice-group">
        <legend>Tipo de excedentes *</legend>
        <div className="business-surplus-options">
          {surplusTypes.map((type) => (
            <label className="business-pill" key={type}>
              <input type="checkbox" checked={data.surplusTypes.includes(type)} onChange={() => toggleSurplusType(type)} />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors['surplusInfo.surplusTypes'] && <p className="business-error">{errors['surplusInfo.surplusTypes']}</p>}
      </fieldset>

      <div className="business-form-grid">
        <Field label="Frecuencia de excedentes *" error={errors['surplusInfo.surplusFrequency']}>
          <select value={data.surplusFrequency} onChange={(event) => onChange('surplusFrequency', event.target.value)}>
            <option value="">Selecciona una frecuencia</option>
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
            <option value="occasional">Ocasional</option>
          </select>
        </Field>

        <Field label="Horario disponible para recolección *" error={errors['surplusInfo.pickupSchedule']}>
          <input value={data.pickupSchedule} onChange={(event) => onChange('pickupSchedule', event.target.value)} placeholder="Ej. 6:00 PM - 8:00 PM" />
        </Field>

        <Field label="Volumen aproximado *" error={errors['surplusInfo.approxVolume']}>
          <input value={data.approxVolume} onChange={(event) => onChange('approxVolume', event.target.value)} placeholder="Ej. 5-10 kg por día" />
        </Field>

        <Field label="¿Requiere refrigeración? *" error={errors['surplusInfo.requiresRefrigeration']}>
          <select value={data.requiresRefrigeration} onChange={(event) => onChange('requiresRefrigeration', event.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
            <option value="mixed">Depende del excedente</option>
          </select>
        </Field>

        <Field label="Notas adicionales" full>
          <textarea value={data.additionalNotes} onChange={(event) => onChange('additionalNotes', event.target.value)} placeholder="Comparte detalles útiles para coordinar la recolección." />
        </Field>
      </div>

      <div className="business-actions">
        <button className="business-back" type="button" onClick={onBack}>← Atrás</button>
        <Button type="button" onClick={onNext}>Siguiente →</Button>
      </div>
    </div>
  )
}

function Field({ label, error, full = false, children }) {
  return (
    <label className={full ? 'business-field business-field--full' : 'business-field'}>
      <span>{label}</span>
      {children}
      {error && <p className="business-error">{error}</p>}
    </label>
  )
}
