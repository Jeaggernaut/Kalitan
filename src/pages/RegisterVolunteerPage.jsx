import { useState } from 'react'
import './RegisterVolunteerPage.css'
import Button from '../components/Button/Button'
import volunteerImage from '../assets/voluntarios.png'

const steps = ['Información personal', 'Disponibilidad', 'Preferencias', 'Confirmación']

const benefits = [
  {
    icon: '♡',
    title: 'Impacto real',
    text: 'Ayuda directamente a reducir el desperdicio y apoyar a más personas.',
  },
  {
    icon: '◔',
    title: 'Desarrollo personal',
    text: 'Aprende nuevas habilidades y crece junto a una comunidad comprometida.',
  },
  {
    icon: '○',
    title: 'Flexibilidad',
    text: 'Elige cuándo y cómo quieres participar, nos adaptamos a tu tiempo.',
  },
  {
    icon: '▣',
    title: 'Certificado',
    text: 'Recibe un certificado que acredita tu participación como voluntario.',
  },
]

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const scheduleOptions = [
  { label: 'Mañana', time: '8:00 AM - 12:00 PM', icon: '☼' },
  { label: 'Tarde', time: '12:00 PM - 6:00 PM', icon: '☀' },
  { label: 'Noche', time: '6:00 PM - 9:00 PM', icon: '☾' },
  { label: 'Flexible', time: '', icon: '↻' },
]

const activityOptions = [
  { icon: '▣', label: 'Rescate de alimentos' },
  { icon: '◇', label: 'Clasificación y empaque' },
  { icon: '▰', label: 'Entrega a comunidades' },
  { icon: '▤', label: 'Apoyo en eventos' },
  { icon: '⌁', label: 'Comunicación y difusión' },
]

const preferenceBenefits = [
  {
    icon: '♡',
    title: 'Impacto real',
    text: 'Ayuda a reducir el desperdicio de alimentos y a mejorar vidas.',
  },
  {
    icon: '◔',
    title: 'Desarrollo personal',
    text: 'Adquiere nuevas habilidades y vive experiencias significativas.',
  },
  {
    icon: '♣',
    title: 'Comunidad',
    text: 'Conecta con personas que comparten tu interés por un mundo mejor.',
  },
  {
    icon: '▣',
    title: 'Certificado',
    text: 'Recibe un reconocimiento por tu compromiso y dedicación.',
  },
]

export default function RegisterVolunteerPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = (event) => {
    event.preventDefault()
    setCurrentStep((step) => Math.min(step + 1, steps.length))
  }

  return (
    <section className="volunteer-register">
      <div className="volunteer-register__form-side">
        <div className="volunteer-register__intro">
          <div className="volunteer-register__title-row">
            <span className="volunteer-register__heart">♡</span>
            <div>
              <h1>Conviértete en voluntario</h1>
              <p>Únete a nuestra comunidad y ayuda a transformar excedentes en bienestar para más personas.</p>
            </div>
          </div>
        </div>

        <div className={`volunteer-steps volunteer-steps--step-${currentStep}`} aria-label="Progreso de registro">
          {steps.map((step, index) => (
            <div
              className={`volunteer-steps__item ${index + 1 === currentStep ? 'is-active' : ''} ${index + 1 < currentStep ? 'is-done' : ''}`}
              key={step}
            >
              <button type="button" onClick={() => setCurrentStep(index + 1)}>
                {index + 1 < currentStep ? '✓' : index + 1}
              </button>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <form className="volunteer-form" onSubmit={handleSubmit} noValidate>
          {currentStep === 1 && <PersonalInfoStep />}
          {currentStep === 2 && <AvailabilityStep onBack={() => setCurrentStep(1)} />}
          {currentStep === 3 && <PreferencesStep onBack={() => setCurrentStep(2)} />}
          {currentStep === 4 && (
            <ConfirmationStep
              onBack={() => setCurrentStep(3)}
              onEdit={(step) => setCurrentStep(step)}
            />
          )}
        </form>
      </div>

      <aside className="volunteer-register__visual-side">
        <div className="volunteer-register__visual-content" key={currentStep}>
          {currentStep === 1 ? (
            <>
              <div className="volunteer-hero-card">
                <img src={volunteerImage} alt="Voluntarios entregando alimentos" />
                <div className="volunteer-hero-card__badge">
                  <span>♣</span>
                  <div>
                    <strong>Cada acción cuenta</strong>
                    <p>Juntos podemos reducir el desperdicio y alimentar comunidades.</p>
                  </div>
                </div>
              </div>

              <div className="volunteer-benefits">
                <h2>Beneficios de ser voluntario</h2>
                <div className="volunteer-benefits__grid">
                  {benefits.map((benefit) => (
                    <article className="volunteer-benefit" key={benefit.title}>
                      <span className="volunteer-benefit__icon">{benefit.icon}</span>
                      <div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="volunteer-register__tagline">
                <div className="volunteer-register__drawing" aria-hidden="true">
                  <span>♡ ♡ ♡</span>
                  <strong>⌂</strong>
                </div>
                <p>Transformamos excedentes en bienestar social</p>
              </div>
            </>
          ) : currentStep === 3 ? (
            <PreferencesAside />
          ) : currentStep === 4 ? (
            <ConfirmationAside />
          ) : (
            <AvailabilityAside />
          )}
        </div>
      </aside>
    </section>
  )
}

function PersonalInfoStep() {
  return (
    <div className="availability-card personal-info-card">
      <div className="volunteer-form__header">
        <h2>Información personal</h2>
        <p>Cuéntanos un poco sobre ti para crear tu perfil de voluntario.</p>
      </div>

      <div className="volunteer-form__grid">
        <label>
          Nombre completo *
          <input type="text" placeholder="Ej. Juan Perez Garcia" required />
        </label>

        <label>
          Correo electrónico *
          <input type="email" placeholder="ejemplo@correo.com" required />
        </label>

        <label>
          Teléfono *
          <input type="tel" placeholder="55 1234 5678" required />
        </label>

        <label>
          Fecha de nacimiento *
          <input type="date" required />
        </label>

        <label className="volunteer-form__wide">
          Dirección *
          <input type="text" placeholder="Colonia, Ciudad, Estado" required />
        </label>

        <label>
          Contraseña *
          <input type="password" placeholder="Crea una contraseña segura" required />
        </label>

        <label>
          Confirmar contraseña *
          <input type="password" placeholder="Repite tu contraseña" required />
        </label>
      </div>

      <p className="volunteer-form__notice">
        <span>▣</span>
        Tu información está protegida. Solo la utilizaremos para coordinar actividades de voluntariado.
      </p>

      <div className="volunteer-form__actions">
        <Button type="submit" variant="primary">Siguiente</Button>
        <p>¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p>
      </div>
    </div>
  )
}

function AvailabilityStep({ onBack }) {
  return (
    <>
      <div className="availability-card">
        <div className="availability-card__header">
          <span>▣</span>
          <div>
            <h2>Disponibilidad</h2>
            <p>Cuéntanos cuándo puedes apoyar en rescates de excedentes.</p>
          </div>
        </div>

        <div className="availability-grid">
          <fieldset className="availability-section">
            <legend>▣ Días disponibles</legend>
            <div className="availability-days">
              {days.map((day, index) => (
                <label className="availability-check" key={day}>
                  <input type="checkbox" defaultChecked={index < 5} />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="availability-section">
            <legend>◷ Horario preferido</legend>
            <div className="schedule-options">
              {scheduleOptions.map((option, index) => (
                <label className="schedule-option" key={option.label}>
                  <input type="radio" name="schedule" defaultChecked={index === 0} />
                  <span className="schedule-option__icon">{option.icon}</span>
                  <span>
                    <strong>{option.label}</strong>
                    {option.time && <small>{option.time}</small>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="availability-section">
            <span className="availability-field-title">☷ Frecuencia de participación</span>
            <select defaultValue="2-3">
              <option value="1">Una vez por semana</option>
              <option value="2-3">Dos o tres veces por semana</option>
              <option value="4">Cuatro o más veces por semana</option>
            </select>
          </label>

          <label className="availability-section">
            <span className="availability-field-title">⌖ Zona donde puedes apoyar</span>
            <input type="text" defaultValue="Poza Rica, Veracruz" />
          </label>

          <fieldset className="availability-section">
            <legend>▰ ¿Tienes transporte propio?</legend>
            <div className="pill-options">
              {['Sí', 'No', 'A veces'].map((option, index) => (
                <label className="pill-option" key={option}>
                  <input type="radio" name="transport" defaultChecked={index === 0} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="availability-section">
            <legend>◉ Radio máximo de traslado</legend>
            <div className="pill-options pill-options--distance">
              {['1 km', '3 km', '5 km', '10 km'].map((option, index) => (
                <label className="pill-option" key={option}>
                  <input type="radio" name="distance" defaultChecked={index === 1} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="availability-section availability-section--wide">
            <span className="availability-field-title">✎ Nota adicional (opcional)</span>
            <textarea defaultValue="Por las tardes entre semana tengo mayor disponibilidad." />
          </label>
        </div>

        <div className="availability-actions">
          <button className="availability-back" type="button" onClick={onBack}>← Atrás</button>
          <Button type="submit" variant="primary">Siguiente →</Button>
        </div>
      </div>
    </>
  )
}

function PreferencesStep({ onBack }) {
  return (
    <div className="availability-card preferences-card">
      <div className="availability-card__header">
        <span>♡</span>
        <div>
          <h2>Preferencias</h2>
          <p>Cuéntanos en qué te gustaría colaborar.</p>
        </div>
      </div>

      <div className="preferences-form">
        <fieldset className="preferences-section preferences-section--wide">
          <legend>¿Qué actividades te interesan más? <span>(Selecciona una o más)</span></legend>
          <div className="activity-options">
            {activityOptions.map((option, index) => (
              <label className="activity-option" key={option.label}>
                <input type="checkbox" defaultChecked={index === 0} />
                <span className="activity-option__check">✓</span>
                <span className="activity-option__icon">{option.icon}</span>
                <strong>{option.label}</strong>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="preferences-section preferences-section--wide">
          <span className="availability-field-title">¿Tienes habilidades especiales que quisieras aportar?</span>
          <input type="text" placeholder="Ej. Primeros auxilios, manejo, diseño, fotografía, etc." />
        </label>

        <label className="preferences-section">
          <span className="availability-field-title">¿Por qué quieres ser voluntario en Kalitán?</span>
          <select defaultValue="">
            <option value="" disabled>Selecciona tu motivación</option>
            <option value="impacto">Generar impacto social</option>
            <option value="aprender">Aprender y colaborar</option>
            <option value="comunidad">Apoyar a mi comunidad</option>
          </select>
        </label>

        <label className="preferences-section">
          <span className="availability-field-title">¿Cómo te enteraste de nosotros?</span>
          <select defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            <option value="redes">Redes sociales</option>
            <option value="amigos">Amigos o familia</option>
            <option value="evento">Evento comunitario</option>
          </select>
        </label>

        <p className="preferences-note preferences-section--wide">
          <span>☼</span>
          Tu ayuda es fundamental para reducir el desperdicio de alimentos y generar un impacto real en nuestra comunidad.
        </p>
      </div>

      <div className="availability-actions">
        <button className="availability-back" type="button" onClick={onBack}>← Atrás</button>
        <Button type="submit" variant="primary">Siguiente →</Button>
      </div>
    </div>
  )
}

function ConfirmationStep({ onBack, onEdit }) {
  return (
    <div className="availability-card confirmation-card">
      <div className="availability-card__header">
        <span>▣</span>
        <div>
          <h2>Confirma tu información</h2>
          <p>Revisa tus datos antes de completar tu registro como voluntario.</p>
        </div>
      </div>

      <div className="confirmation-summary">
        <SummarySection
          icon="♙"
          title="Información personal"
          onEdit={() => onEdit(1)}
          columns={[
            ['Nombre completo:', 'Juan Pérez García'],
            ['Correo electrónico:', 'juan.perez@email.com'],
            ['Teléfono:', '55 1234 5678'],
            ['Fecha de nacimiento:', '15/05/1995'],
            ['Dirección:', 'Poza Rica, Veracruz, México'],
          ]}
        />

        <SummarySection
          icon="▦"
          title="Disponibilidad"
          onEdit={() => onEdit(2)}
          columns={[
            ['Días disponibles:', 'Lunes, Miércoles, Viernes, Sábado y Domingo'],
            ['Horario preferido:', 'Mañana (8:00 AM - 12:00 PM)\nTarde (12:00 PM - 6:00 PM)'],
            ['Frecuencia:', 'Dos o tres veces por semana'],
            ['Zona donde puedes apoyar:', 'Poza Rica, Veracruz'],
            ['Transporte propio:', 'Sí'],
            ['Radio máximo de traslado:', '5 km'],
            ['Nota adicional:', 'Por las tardes entre semana tengo mayor disponibilidad.'],
          ]}
        />

        <SummarySection
          icon="♡"
          title="Preferencias"
          onEdit={() => onEdit(3)}
          columns={[
            ['Actividades de interés:', 'Rescate de alimentos, Entrega a comunidades, Apoyo en eventos'],
            ['Habilidades:', 'Manejo, organización, atención a personas'],
            ['Motivación:', 'Quiero ayudar a reducir el desperdicio de alimentos y apoyar a quienes más lo necesitan.'],
          ]}
        />
      </div>

      <label className="confirmation-terms">
        <input type="checkbox" />
        <span>
          Confirmo que la información proporcionada es correcta y acepto los <a href="#terms">términos y condiciones</a> para ser voluntario en Kalitán.
        </span>
      </label>

      <div className="availability-actions">
        <button className="availability-back" type="button" onClick={onBack}>← Atrás</button>
        <Button type="submit" variant="primary">Finalizar registro ✓</Button>
      </div>
    </div>
  )
}

function SummarySection({ icon, title, columns, onEdit }) {
  return (
    <section className="summary-section">
      <div className="summary-section__top">
        <div className="summary-section__title">
          <span>{icon}</span>
          <h3>{title}</h3>
        </div>
        <button type="button" onClick={onEdit}>✎ Editar</button>
      </div>

      <div className="summary-section__grid">
        {columns.map(([label, value]) => (
          <div className="summary-field" key={label}>
            <strong>{label}</strong>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function AvailabilityAside() {
  return (
    <div className="availability-aside">
      <img src={volunteerImage} alt="Voluntarios entregando alimentos" className="availability-aside__image" />

      <article className="availability-aside__card availability-aside__card--time">
        <span>◔</span>
        <div>
          <h2>Tu tiempo hace la diferencia</h2>
          <p>Cada hora que dedicas ayuda a que más alimentos lleguen a quienes más lo necesitan.</p>
        </div>
      </article>

      <article className="availability-aside__card">
        <span>☼</span>
        <div>
          <h2>Consejos</h2>
          <ul>
            <li>Sé realista con tu disponibilidad para poder coordinar mejor los rescates.</li>
            <li>Puedes actualizar tu disponibilidad cuando lo necesites.</li>
            <li>Entre más flexible seas, más comunidades podremos apoyar juntos.</li>
          </ul>
        </div>
      </article>

      <article className="availability-aside__card availability-aside__card--compact">
        <span>▣</span>
        <div>
          <h2>Tu información está protegida</h2>
          <p>Solo la utilizaremos para coordinar actividades de voluntariado.</p>
        </div>
      </article>
    </div>
  )
}

function PreferencesAside() {
  return (
    <div className="availability-aside preferences-aside">
      <img src={volunteerImage} alt="Voluntarios clasificando alimentos" className="availability-aside__image" />

      <article className="availability-aside__card availability-aside__card--compact">
        <span>♣</span>
        <div>
          <h2>Gracias a voluntarios como tú</h2>
          <p>Podemos rescatar más alimentos y ayudar a quienes más lo necesitan.</p>
        </div>
      </article>

      <article className="preferences-benefits-card">
        <h2>Beneficios de ser voluntario</h2>
        <div className="preferences-benefits-card__list">
          {preferenceBenefits.map((benefit) => (
            <div className="preferences-benefit" key={benefit.title}>
              <span>{benefit.icon}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

function ConfirmationAside() {
  return (
    <div className="availability-aside confirmation-aside">
      <img src={volunteerImage} alt="Voluntarios revisando alimentos" className="availability-aside__image" />

      <article className="availability-aside__card availability-aside__card--time">
        <span>✓</span>
        <div>
          <h2>¡Ya casi eres parte del cambio!</h2>
          <p>Revisa que todo esté correcto y completa tu registro para empezar a generar impacto.</p>
        </div>
      </article>

      <article className="next-steps-card">
        <h2>¿Qué sigue?</h2>
        <div className="next-steps-card__list">
          <NextStep icon="◉" title="Revisaremos tu información" text="Nuestro equipo verificará tus datos y disponibilidad." />
          <NextStep icon="✉" title="Te daremos la bienvenida" text="Recibirás un correo con tu acceso y guía para comenzar." />
          <NextStep icon="♡" title="Empieza a generar impacto" text="Únete a rescates, apoya comunidades y transforma excedentes en bienestar." />
        </div>
      </article>

      <article className="availability-aside__card availability-aside__card--compact">
        <span>▣</span>
        <div>
          <h2>Tu información está protegida</h2>
          <p>Tus datos personales son confidenciales y solo se usarán para coordinar actividades de voluntariado.</p>
        </div>
      </article>

      <article className="availability-aside__card availability-aside__card--compact">
        <span>♬</span>
        <div>
          <h2>¿Necesitas ayuda?</h2>
          <p>Escríbenos a voluntarios@kalitan.org o llámanos al 33 1234 5678</p>
        </div>
      </article>
    </div>
  )
}

function NextStep({ icon, title, text }) {
  return (
    <div className="next-step">
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}
