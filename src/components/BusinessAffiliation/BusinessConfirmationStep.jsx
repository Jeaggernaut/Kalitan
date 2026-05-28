import Button from '../Button/Button'

export default function BusinessConfirmationStep({
  data,
  acceptedTerms,
  errors,
  status,
  onAcceptedTermsChange,
  onBack,
  onEdit,
  onFinish,
}) {
  return (
    <div className="business-step">
      <div className="business-step__header">
        <h2>Confirmación</h2>
        <p>Revisa tu información antes de finalizar la afiliación.</p>
      </div>

      <Summary title="Información del negocio" onEdit={() => onEdit(1)}>
        <SummaryItem label="Nombre" value={data.businessInfo.businessName || 'Panadería El Buen Pan'} />
        <SummaryItem label="Tipo" value={data.businessInfo.businessType || 'Panadería'} />
        <SummaryItem label="Giro" value={data.businessInfo.industry || 'Alimentos y bebidas'} />
        <SummaryItem label="Empleados" value={data.businessInfo.employeesNumber || '1-10'} />
        <SummaryItem label="Motivo" value={data.businessInfo.affiliationReason || 'Generar impacto social'} />
      </Summary>

      <Summary title="Contacto y ubicación" onEdit={() => onEdit(2)}>
        <SummaryItem label="Responsable" value={data.contactLocation.responsibleName || 'Laura Martínez'} />
        <SummaryItem label="Correo" value={data.contactLocation.email || 'contacto@negocio.com'} />
        <SummaryItem label="Teléfono" value={data.contactLocation.phone || '33 1234 5678'} />
        <SummaryItem label="Dirección" value={data.contactLocation.address || 'Poza Rica, Veracruz'} />
      </Summary>

      <Summary title="Sobre tus excedentes" onEdit={() => onEdit(3)}>
        <SummaryItem label="Tipos" value={data.surplusInfo.surplusTypes.join(', ') || 'Pan, frutas y verduras'} />
        <SummaryItem label="Frecuencia" value={data.surplusInfo.surplusFrequency || 'Diario'} />
        <SummaryItem label="Horario" value={data.surplusInfo.pickupSchedule || '6:00 PM - 8:00 PM'} />
        <SummaryItem label="Volumen" value={data.surplusInfo.approxVolume || '5-10 kg'} />
        <SummaryItem label="Refrigeración" value={data.surplusInfo.requiresRefrigeration || 'Depende del excedente'} />
      </Summary>

      <label className="business-terms">
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => onAcceptedTermsChange(event.target.checked)} />
        <span>Acepto los términos y condiciones de afiliación de negocio en Kalitán.</span>
      </label>
      {errors.terms && <p className="business-error">{errors.terms}</p>}

      {status.success && <p className="business-status business-status--success">{status.success}</p>}
      {status.error && <p className="business-status business-status--error">{status.error}</p>}

      <div className="business-actions">
        <button className="business-back" type="button" onClick={onBack}>← Atrás</button>
        <Button type="button" onClick={onFinish} disabled={status.loading}>
          {status.loading ? 'Enviando...' : 'Finalizar afiliación ✓'}
        </Button>
      </div>
    </div>
  )
}

function Summary({ title, onEdit, children }) {
  return (
    <section className="business-summary">
      <div className="business-summary__header">
        <h3>{title}</h3>
        <button type="button" onClick={onEdit}>✎ Editar</button>
      </div>
      <div className="business-summary__grid">{children}</div>
    </section>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="business-summary__item">
      <strong>{label}</strong>
      <p>{value}</p>
    </div>
  )
}
