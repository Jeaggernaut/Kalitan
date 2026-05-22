import Button from '../Button/Button'

export default function BusinessContactStep({ data, errors, onChange, onBack, onNext }) {
  return (
    <div className="business-step">
      <div className="business-step__header">
        <h2>Contacto y ubicación</h2>
        <p>Indícanos quién será el responsable y dónde se encuentra el negocio.</p>
      </div>

      <div className="business-form-grid">
        <Field label="Nombre del responsable *" error={errors['contactLocation.responsibleName']}>
          <input value={data.responsibleName} onChange={(event) => onChange('responsibleName', event.target.value)} placeholder="Ej. Laura Martínez" />
        </Field>

        <Field label="Correo electrónico *" error={errors['contactLocation.email']}>
          <input value={data.email} onChange={(event) => onChange('email', event.target.value)} placeholder="contacto@negocio.com" type="email" />
        </Field>

        <Field label="Teléfono *" error={errors['contactLocation.phone']}>
          <input value={data.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder="33 1234 5678" />
        </Field>

        <Field label="Dirección *" error={errors['contactLocation.address']}>
          <input value={data.address} onChange={(event) => onChange('address', event.target.value)} placeholder="Calle, número y colonia" />
        </Field>

        <Field label="Ciudad *" error={errors['contactLocation.city']}>
          <input value={data.city} onChange={(event) => onChange('city', event.target.value)} placeholder="Zapopan" />
        </Field>

        <Field label="Estado *" error={errors['contactLocation.state']}>
          <input value={data.state} onChange={(event) => onChange('state', event.target.value)} placeholder="Jalisco" />
        </Field>

        <Field label="Código postal *" error={errors['contactLocation.zipCode']}>
          <input value={data.zipCode} onChange={(event) => onChange('zipCode', event.target.value)} placeholder="45100" />
        </Field>

        <Field label="Referencias de ubicación" full>
          <textarea value={data.locationReferences} onChange={(event) => onChange('locationReferences', event.target.value)} placeholder="Frente al parque, local con toldo verde..." />
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
