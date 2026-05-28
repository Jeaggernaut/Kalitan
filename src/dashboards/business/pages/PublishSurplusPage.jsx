import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Leaf,
  MapPin,
  Package,
  Thermometer,
  Timer,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBusiness } from '../../../hooks/useBusiness'
import { subscriptionPlans } from '../mock/businessMockData'
import './PublishSurplusPage.css'

const CATEGORIES = ['Frutas', 'Verduras', 'Panadería', 'Abarrotes', 'Comida preparada', 'Bebidas', 'Lácteos', 'Otros']
const UNITS = ['kg', 'cajas', 'piezas', 'paquetes', 'litros', 'porciones']
const EXPIRY_OPTIONS = ['Menos de 2 horas', '2 a 6 horas', '6 a 24 horas', '1 a 3 días', 'Más de 3 días']
const TEMP_OPTIONS = ['Temperatura ambiente', '4°C (refrigerado)', '0°C (congelado)', '-18°C (ultracongelado)']

const CATEGORY_IMAGES = {
  Frutas: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=420&q=80',
  Verduras: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=420&q=80',
  Panadería: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=420&q=80',
  Abarrotes: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=420&q=80',
  'Comida preparada': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=420&q=80',
  Bebidas: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=420&q=80',
  Lácteos: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=420&q=80',
  Otros: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=420&q=80',
}

const STEPS = [
  { number: 1, label: 'Información', description: 'Datos del excedente' },
  { number: 2, label: 'Detalles', description: 'Características' },
  { number: 3, label: 'Ubicación', description: 'Lugar y entrega' },
  { number: 4, label: 'Publicación', description: 'Revisión y confirmación' },
]

const TIPS = [
  { Icon: Package, text: 'Toma fotos claras y reales del producto' },
  { Icon: Timer, text: 'Describe el estado actual del alimento' },
  { Icon: AlertTriangle, text: 'Si es perecedero, márcalo como tal' },
  { Icon: Clock, text: 'Publica con anticipación para maximizar rescates' },
]

export default function PublishSurplusPage({ notify }) {
  const { activeBusiness, createSurplus } = useBusiness()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    category: 'Frutas',
    description: '',
    quantity: '',
    unit: 'kg',
    date: new Date().toISOString().slice(0, 10),
    pickupTime: '18:00',
    perishable: true,
    expiresIn: '6 a 24 horas',
    temperature: 'Temperatura ambiente',
    refrigeration: false,
    address: activeBusiness.profile.address,
    reference: '',
    schedule: '',
    immediateDelivery: false,
    image: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateStep = (s) => {
    const next = {}
    if (s === 1) {
      if (!form.name.trim()) next.name = 'El nombre es obligatorio'
      if (!form.description.trim()) next.description = 'La descripción es obligatoria'
      if (!form.quantity || Number(form.quantity) <= 0) next.quantity = 'Ingresa una cantidad válida'
    }
    if (s === 3) {
      if (!form.address.trim()) next.address = 'La dirección es obligatoria'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => { if (validateStep(step)) setStep((s) => s + 1) }
  const goBack = () => setStep((s) => s - 1)
  const cancel = () => navigate('/dashboard/business/excedentes')

  const publish = (draft = false) => {
    const img = form.image.trim() || CATEGORY_IMAGES[form.category] || activeBusiness.profile.logo
    createSurplus({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      amount: `${form.quantity} ${form.unit}`,
      quantity: form.quantity,
      unit: form.unit,
      date: form.date,
      pickupTime: form.pickupTime,
      perishable: form.perishable,
      expiresIn: form.perishable ? form.expiresIn : null,
      temperature: form.perishable ? form.temperature : null,
      refrigeration: form.perishable ? form.refrigeration : false,
      priority: form.perishable ? 'Alta' : 'Normal',
      address: form.address,
      reference: form.reference,
      schedule: form.schedule,
      immediateDelivery: form.immediateDelivery,
      image: img,
      status: draft ? 'Pausado' : 'Publicado',
    })
    notify(draft ? 'Borrador guardado correctamente' : 'Excedente publicado correctamente')
    navigate('/dashboard/business/excedentes', { replace: true })
  }

  const currentPlan = subscriptionPlans.find((p) => p.id === activeBusiness.subscription.planId) ?? subscriptionPlans[1]

  return (
    <div className="publish-surplus-page">
      <section className="business-page-header">
        <div>
          <span>Negocio</span>
          <h2>Publicar excedente</h2>
          <p>Comparte alimentos que aún pueden aprovecharse y genera un impacto real.</p>
        </div>
        <button type="button" className="publish-btn publish-btn--ghost" onClick={cancel}>
          Cancelar
        </button>
      </section>

      <div className="publish-steps">
        {STEPS.map((s, i) => (
          <div key={s.number} className={`publish-step${step === s.number ? ' is-active' : ''}${step > s.number ? ' is-done' : ''}`}>
            <div className="publish-step__dot">
              {step > s.number ? <Check size={13} /> : s.number}
            </div>
            <div className="publish-step__meta">
              <strong>{s.label}</strong>
              <span>{s.description}</span>
            </div>
            {i < STEPS.length - 1 && <div className="publish-step__connector" />}
          </div>
        ))}
      </div>

      <div className="publish-layout">
        <div className="publish-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="publish-step-body business-section"
            >
              {step === 1 && <StepBasicInfo form={form} update={update} errors={errors} />}
              {step === 2 && <StepDetails form={form} update={update} />}
              {step === 3 && <StepLocation form={form} update={update} errors={errors} />}
              {step === 4 && <StepConfirm form={form} update={update} />}
            </motion.div>
          </AnimatePresence>

          <div className="publish-nav">
            <div className="publish-nav__left">
              {step > 1 && (
                <button type="button" className="publish-btn publish-btn--outline" onClick={goBack}>
                  <ChevronLeft size={17} /> Anterior
                </button>
              )}
            </div>
            <div className="publish-nav__right">
              {step < 4 ? (
                <button type="button" className="publish-btn publish-btn--primary" onClick={goNext}>
                  Siguiente <ChevronRight size={17} />
                </button>
              ) : (
                <>
                  <button type="button" className="publish-btn publish-btn--outline" onClick={() => publish(true)}>
                    Guardar borrador
                  </button>
                  <button type="button" className="publish-btn publish-btn--primary" onClick={() => publish(false)}>
                    <Leaf size={17} /> Publicar excedente
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <aside className="publish-sidebar">
          <SubscriptionSidePanel subscription={activeBusiness.subscription} plan={currentPlan} />
          <TipsSidePanel />
        </aside>
      </div>
    </div>
  )
}

function StepBasicInfo({ form, update, errors }) {
  return (
    <div className="publish-form">
      <div className="publish-form__section-header">
        <h3>Información básica</h3>
        <p>Nombre, categoría, cantidad y horario del excedente.</p>
      </div>
      <div className="publish-form-grid publish-form-grid--2">
        <label className="publish-label">
          Nombre del excedente <span className="publish-required">*</span>
          <input
            className={errors.name ? 'has-error' : ''}
            value={form.name}
            placeholder="Ej. Pan del día, Verduras orgánicas"
            onChange={(e) => update('name', e.target.value)}
          />
          {errors.name && <small className="publish-error">{errors.name}</small>}
          <span className="publish-hint">Ej. Pan del día, Verduras orgánicas, Frutas de temporada</span>
        </label>
        <label className="publish-label">
          Categoría <span className="publish-required">*</span>
          <select value={form.category} onChange={(e) => update('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <label className="publish-label">
        Descripción <span className="publish-required">*</span>
        <textarea
          className={errors.description ? 'has-error' : ''}
          value={form.description}
          placeholder="Cajas mixtas de plátano, manzana y cítricos en excelente estado."
          rows={3}
          onChange={(e) => update('description', e.target.value)}
        />
        {errors.description && <small className="publish-error">{errors.description}</small>}
        <span className="publish-hint">Describe brevemente el excedente que estás publicando.</span>
      </label>

      <div className="publish-form-grid publish-form-grid--2">
        <label className="publish-label">
          Cantidad disponible <span className="publish-required">*</span>
          <div className="publish-quantity-row">
            <input
              type="number"
              min="0.1"
              step="0.1"
              className={errors.quantity ? 'has-error' : ''}
              value={form.quantity}
              placeholder="80"
              onChange={(e) => update('quantity', e.target.value)}
            />
            <select value={form.unit} onChange={(e) => update('unit', e.target.value)}>
              {UNITS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          {errors.quantity && <small className="publish-error">{errors.quantity}</small>}
        </label>
        <div />
      </div>

      <div className="publish-form-grid publish-form-grid--2">
        <label className="publish-label">
          Fecha de disponibilidad <span className="publish-required">*</span>
          <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
        </label>
        <label className="publish-label">
          Hora límite de recolección <span className="publish-required">*</span>
          <input type="time" value={form.pickupTime} onChange={(e) => update('pickupTime', e.target.value)} />
        </label>
      </div>
    </div>
  )
}

function StepDetails({ form, update }) {
  return (
    <div className="publish-form">
      <div className="publish-form__section-header">
        <h3>Estado y prioridad</h3>
        <p>Indica si el producto es perecedero para priorizarlo correctamente.</p>
      </div>

      <div className="publish-perishable-question">
        <div className="publish-perishable-header">
          <div>
            <strong>¿Es un producto perecedero? <span className="publish-required">*</span></strong>
            <p>Esto ayuda a los voluntarios a priorizar la recolección.</p>
          </div>
          {form.perishable && (
            <span className="publish-priority-badge">
              <AlertTriangle size={13} /> Alta prioridad
            </span>
          )}
        </div>

        <div className="publish-perishable-options">
          <label className={`publish-radio-card${form.perishable ? ' is-selected' : ''}`}>
            <input type="radio" name="perishable" checked={form.perishable} onChange={() => update('perishable', true)} />
            <div>
              <strong>Sí, es perecedero</strong>
              <p>Se echará a perder en poco tiempo.</p>
            </div>
          </label>
          <label className={`publish-radio-card${!form.perishable ? ' is-selected' : ''}`}>
            <input type="radio" name="perishable" checked={!form.perishable} onChange={() => update('perishable', false)} />
            <div>
              <strong>No, no es perecedero</strong>
              <p>Puede conservarse por más tiempo.</p>
            </div>
          </label>
        </div>

        <div className="publish-why-card">
          <Clock size={18} />
          <div>
            <strong>¿Por qué es importante?</strong>
            <p>Los excedentes perecederos se muestran primero a los voluntarios cercanos para evitar desperdicio.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {form.perishable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="publish-perishable-extra"
          >
            <div className="publish-priority-message">
              <Leaf size={15} />
              Este excedente se priorizará para evitar desperdicio.
            </div>

            <div className="publish-form-grid publish-form-grid--3">
              <label className="publish-label">
                Tiempo antes de vencer
                <select value={form.expiresIn} onChange={(e) => update('expiresIn', e.target.value)}>
                  {EXPIRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="publish-label">
                <Thermometer size={14} /> Temperatura recomendada
                <select value={form.temperature} onChange={(e) => update('temperature', e.target.value)}>
                  {TEMP_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="publish-label publish-label--checkbox">
                <div className="publish-checkbox-row">
                  <input type="checkbox" checked={form.refrigeration} onChange={(e) => update('refrigeration', e.target.checked)} />
                  <div>
                    <strong>Necesita refrigeración</strong>
                    <p>El voluntario debe disponer de equipo de frío.</p>
                  </div>
                </div>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StepLocation({ form, update, errors }) {
  return (
    <div className="publish-form">
      <div className="publish-form__section-header">
        <h3>Ubicación y entrega</h3>
        <p>Indica dónde y cuándo puede recogerse el excedente.</p>
      </div>

      <label className="publish-label">
        Ubicación de recolección <span className="publish-required">*</span>
        <div className="publish-address-row">
          <input
            className={errors.address ? 'has-error' : ''}
            value={form.address}
            placeholder="Ej. Av. 20 de Noviembre 125, Poza Rica, Veracruz"
            onChange={(e) => update('address', e.target.value)}
          />
          <button type="button" className="publish-map-btn">
            <MapPin size={15} /> Seleccionar en mapa
          </button>
        </div>
        {errors.address && <small className="publish-error">{errors.address}</small>}
        <span className="publish-hint">Dirección donde el voluntario recogerá el excedente.</span>
      </label>

      <label className="publish-label">
        Referencia (opcional)
        <input
          value={form.reference}
          placeholder="Ej. Entrada lateral, preguntar por el encargado"
          onChange={(e) => update('reference', e.target.value)}
        />
      </label>

      <div className="publish-map-mock">
        <MapPin size={26} />
        <span>Vista de mapa disponible próximamente</span>
      </div>

      <div className="publish-form-grid publish-form-grid--2">
        <label className="publish-label">
          Horario de recolección
          <input
            value={form.schedule}
            placeholder="Ej. 17:00 – 20:00"
            onChange={(e) => update('schedule', e.target.value)}
          />
        </label>
        <label className="publish-label publish-label--checkbox publish-label--vcenter">
          <div className="publish-checkbox-row">
            <input type="checkbox" checked={form.immediateDelivery} onChange={(e) => update('immediateDelivery', e.target.checked)} />
            <div>
              <strong>Entrega inmediata</strong>
              <p>El excedente puede recogerse ahora mismo.</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}

function StepConfirm({ form, update }) {
  const img = form.image.trim() || CATEGORY_IMAGES[form.category]
  const qty = Number(form.quantity) || 0
  const peopleEstimate = Math.round(qty * 3.5)
  const co2Estimate = (qty * 0.4).toFixed(1)

  return (
    <div className="publish-confirm">
      <div className="publish-form__section-header">
        <h3>Revisión y publicación</h3>
        <p>Revisa los datos antes de publicar. Podrás editar este excedente en cualquier momento.</p>
      </div>

      <div className="publish-confirm-grid">
        <div className="publish-confirm-image">
          <img src={img} alt={form.name || 'Excedente'} />
          <label className="publish-label">
            URL de imagen (opcional)
            <input
              value={form.image}
              placeholder="https://images.unsplash.com/..."
              onChange={(e) => update('image', e.target.value)}
            />
          </label>
        </div>

        <div className="publish-confirm-data">
          {form.perishable && (
            <div className="publish-confirm-perishable">
              <AlertTriangle size={14} /> Alta prioridad · Producto perecedero
            </div>
          )}

          <h2 className="publish-confirm-name">{form.name || '—'}</h2>

          <div className="publish-confirm-badges">
            <span className="publish-category-tag">{form.category}</span>
            {form.perishable && <span className="publish-perishable-tag">Perecedero</span>}
            {form.refrigeration && <span className="publish-cold-tag">Refrigeración</span>}
          </div>

          <p className="publish-confirm-desc">{form.description || '—'}</p>

          <ul className="publish-confirm-details">
            <li><Package size={14} /><span><strong>{form.quantity} {form.unit}</strong> disponibles</span></li>
            <li><Clock size={14} /><span>{form.date} · Hasta las <strong>{form.pickupTime}</strong></span></li>
            <li><MapPin size={14} /><span>{form.address || '—'}</span></li>
            {form.perishable && form.expiresIn && (
              <li><Timer size={14} /><span>Vence en: <strong>{form.expiresIn}</strong></span></li>
            )}
            {form.perishable && form.temperature && (
              <li><Thermometer size={14} /><span>Temperatura: <strong>{form.temperature}</strong></span></li>
            )}
          </ul>

          <div className="publish-confirm-impact">
            <Leaf size={16} />
            <div>
              <strong>Impacto estimado</strong>
              <p>~{peopleEstimate} personas beneficiadas · {co2Estimate} kg CO₂ evitado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubscriptionSidePanel({ subscription, plan }) {
  const usagePercent = (used, limit) => {
    if (!limit) return Math.min((used / 20) * 100, 100)
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="publish-sidebar-card business-section">
      <div className="publish-sidebar-card__header">
        <h3>Tu suscripción actual</h3>
        <span className="status-pill is-activo">{subscription.status}</span>
      </div>

      <div className="publish-sidebar-plan">
        <strong className="publish-sidebar-plan__name">{subscription.plan}</strong>
        <div className="publish-sidebar-plan__price">
          <span>{subscription.price}</span>
          <small>{subscription.period}</small>
        </div>
        <p className="publish-sidebar-plan__renewal">Renovación el {subscription.nextPayment}</p>
      </div>

      <ul className="publish-sidebar-benefits">
        {(plan?.features ?? subscription.benefits).slice(0, 5).map((b) => (
          <li key={b}><Check size={12} /> {b}</li>
        ))}
      </ul>

      <button type="button" className="publish-btn publish-btn--outline publish-btn--full">
        Gestionar suscripción
      </button>

      <div className="publish-sidebar-usage">
        <div className="publish-sidebar-usage__header">
          <h4>Uso de tu plan</h4>
          <span>{subscription.cycle}</span>
        </div>

        <div className="publish-usage-row">
          <div className="publish-usage-row__labels">
            <span>Excedentes publicados</span>
            <strong>
              {subscription.usage.surpluses.used} / {subscription.usage.surpluses.limit ?? '∞'}
            </strong>
          </div>
          <div className="publish-usage-bar">
            <div style={{ width: `${usagePercent(subscription.usage.surpluses.used, subscription.usage.surpluses.limit)}%` }} />
          </div>
        </div>

        <div className="publish-usage-row">
          <div className="publish-usage-row__labels">
            <span>Donaciones realizadas</span>
            <strong>
              {subscription.usage.donations.used} / {subscription.usage.donations.limit ?? '∞'}
            </strong>
          </div>
          <div className="publish-usage-bar">
            <div style={{ width: `${usagePercent(subscription.usage.donations.used, subscription.usage.donations.limit)}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TipsSidePanel() {
  return (
    <div className="publish-sidebar-card business-section">
      <h3>Consejos para publicar mejor</h3>
      <ul className="publish-tips-list">
        {TIPS.map(({ Icon, text }) => (
          <li key={text}>
            <span className="publish-tip-icon"><Icon size={15} /></span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}
