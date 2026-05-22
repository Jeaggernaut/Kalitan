import Button from '../Button/Button'

const affiliationReasons = [
  { value: 'reduce-waste', label: 'Reducir desperdicio de alimentos', icon: '♧' },
  { value: 'social-impact', label: 'Generar impacto social y ambiental', icon: '♡' },
  { value: 'sustainability', label: 'Cumplir metas de sostenibilidad', icon: '⌁' },
]

export default function BusinessInfoStep({ data, errors, onChange, onNext }) {
  return (
    <div className="business-step">
      <StepHeader title="Información del negocio" text="Cuéntanos sobre tu negocio para comenzar la afiliación." />

      <div className="business-form-grid">
        <Field label="Nombre del negocio *" error={errors['businessInfo.businessName']} full>
          <input value={data.businessName} onChange={(event) => onChange('businessName', event.target.value)} placeholder="Ej. Panadería El Buen Pan" />
        </Field>

        <Field label="Tipo de negocio *" error={errors['businessInfo.businessType']}>
          <select value={data.businessType} onChange={(event) => onChange('businessType', event.target.value)}>
            <option value="">Selecciona el tipo de negocio</option>
            <option value="restaurant">Restaurante</option>
            <option value="bakery">Panadería</option>
            <option value="market">Mercado o tienda</option>
            <option value="hotel">Hotel</option>
            <option value="other">Otro</option>
          </select>
        </Field>

        <Field label="Giro / Industria *" error={errors['businessInfo.industry']}>
          <input value={data.industry} onChange={(event) => onChange('industry', event.target.value)} placeholder="Ej. Alimentos y bebidas" />
        </Field>

        <Field label="RFC (Opcional)">
          <input value={data.rfc} onChange={(event) => onChange('rfc', event.target.value)} placeholder="Ej. ABCD123456EFG" />
        </Field>

        <Field label="Número de empleados">
          <input value={data.employeesNumber} onChange={(event) => onChange('employeesNumber', event.target.value)} placeholder="Ej. 1-10" />
        </Field>

        <Field label="Descripción de tu negocio *" error={errors['businessInfo.description']} full>
          <textarea
            maxLength={200}
            value={data.description}
            onChange={(event) => onChange('description', event.target.value)}
            placeholder="Cuéntanos qué hace tu negocio y qué lo hace especial..."
          />
          <small>{data.description.length}/200</small>
        </Field>
      </div>

      <fieldset className="business-choice-group">
        <legend>¿Por qué quieres afiliar tu negocio a Kalitán? *</legend>
        <div className="business-choice-grid">
          {affiliationReasons.map((reason) => (
            <label className="business-choice" key={reason.value}>
              <input
                type="radio"
                name="affiliationReason"
                checked={data.affiliationReason === reason.value}
                onChange={() => onChange('affiliationReason', reason.value)}
              />
              <span>{reason.icon}</span>
              <strong>{reason.label}</strong>
            </label>
          ))}
        </div>
        {errors['businessInfo.affiliationReason'] && <p className="business-error">{errors['businessInfo.affiliationReason']}</p>}
      </fieldset>

      <p className="business-note">Al afiliarte, podrás conectar con organizaciones y personas que darán un mejor destino a tus excedentes.</p>

      <div className="business-actions business-actions--single">
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

function StepHeader({ title, text }) {
  return (
    <div className="business-step__header">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
