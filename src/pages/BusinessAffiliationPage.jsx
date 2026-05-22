import { useMemo, useState } from 'react'
import BusinessInfoStep from '../components/BusinessAffiliation/BusinessInfoStep'
import BusinessContactStep from '../components/BusinessAffiliation/BusinessContactStep'
import BusinessSurplusStep from '../components/BusinessAffiliation/BusinessSurplusStep'
import BusinessConfirmationStep from '../components/BusinessAffiliation/BusinessConfirmationStep'
import BusinessStepProgress from '../components/BusinessAffiliation/BusinessStepProgress'
import { registerBusinessAffiliation } from '../services/businessService'
import affiliationImage from '../assets/afiliar.png'
import '../components/BusinessAffiliation/BusinessAffiliation.css'

const steps = ['Información del negocio', 'Contacto y ubicación', 'Sobre tus excedentes', 'Confirmación']

const initialFormData = {
  businessInfo: {
    businessName: '',
    businessType: '',
    industry: '',
    rfc: '',
    employeesNumber: '',
    description: '',
    affiliationReason: '',
  },
  contactLocation: {
    responsibleName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    locationReferences: '',
  },
  surplusInfo: {
    surplusTypes: [],
    surplusFrequency: '',
    pickupSchedule: '',
    approxVolume: '',
    requiresRefrigeration: '',
    additionalNotes: '',
  },
}

const validations = {
  1: ['businessInfo.businessName', 'businessInfo.businessType', 'businessInfo.industry', 'businessInfo.description', 'businessInfo.affiliationReason'],
  2: ['contactLocation.responsibleName', 'contactLocation.email', 'contactLocation.phone', 'contactLocation.address', 'contactLocation.city', 'contactLocation.state', 'contactLocation.zipCode'],
  3: ['surplusInfo.surplusTypes', 'surplusInfo.surplusFrequency', 'surplusInfo.pickupSchedule', 'surplusInfo.approxVolume', 'surplusInfo.requiresRefrigeration'],
}

function getFieldValue(data, path) {
  return path.split('.').reduce((value, key) => value?.[key], data)
}

export default function BusinessAffiliationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, success: '', error: '' })

  const completedSteps = useMemo(() => currentStep - 1, [currentStep])

  const updateSection = (section, field, value) => {
    setFormData((data) => ({
      ...data,
      [section]: {
        ...data[section],
        [field]: value,
      },
    }))
    setErrors((current) => ({ ...current, [`${section}.${field}`]: '' }))
  }

  const validateStep = (step) => {
    if (step === 4) {
      if (!acceptedTerms) {
        setErrors({ terms: 'Acepta los términos para finalizar la afiliación.' })
        return false
      }
      return true
    }

    const nextErrors = {}
    validations[step].forEach((path) => {
      const value = getFieldValue(formData, path)
      const isEmptyArray = Array.isArray(value) && value.length === 0
      if (!value || isEmptyArray) {
        nextErrors[path] = 'Este campo es obligatorio.'
      }
    })

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goToStep = (step) => {
    setCurrentStep(step)
    setErrors({})
    setStatus({ loading: false, success: '', error: '' })
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((step) => Math.min(step + 1, steps.length))
    }
  }

  const previousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1))
    setErrors({})
  }

  const finishAffiliation = async () => {
    if (!validateStep(4)) return

    setStatus({ loading: true, success: '', error: '' })
    try {
      await registerBusinessAffiliation(formData)
      setStatus({ loading: false, success: 'Tu solicitud de afiliación fue enviada correctamente.', error: '' })
    } catch {
      setStatus({
        loading: false,
        success: '',
        error: 'No pudimos enviar la solicitud porque el backend aún no respondió. Inténtalo de nuevo más tarde.',
      })
    }
  }

  return (
    <section className="business-affiliation">
      <div className="business-affiliation__main">
        <header className="business-affiliation__intro">
          <span className="business-affiliation__icon">⌂</span>
          <div>
            <h1>Afília tu negocio</h1>
            <p>Únete a Kalitán y transforma tus excedentes en impacto positivo.</p>
          </div>
        </header>

        <BusinessStepProgress
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />

        <div className="business-affiliation__card">
          {currentStep === 1 && (
            <BusinessInfoStep
              data={formData.businessInfo}
              errors={errors}
              onChange={(field, value) => updateSection('businessInfo', field, value)}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <BusinessContactStep
              data={formData.contactLocation}
              errors={errors}
              onChange={(field, value) => updateSection('contactLocation', field, value)}
              onBack={previousStep}
              onNext={nextStep}
            />
          )}

          {currentStep === 3 && (
            <BusinessSurplusStep
              data={formData.surplusInfo}
              errors={errors}
              onChange={(field, value) => updateSection('surplusInfo', field, value)}
              onBack={previousStep}
              onNext={nextStep}
            />
          )}

          {currentStep === 4 && (
            <BusinessConfirmationStep
              data={formData}
              acceptedTerms={acceptedTerms}
              errors={errors}
              status={status}
              onAcceptedTermsChange={setAcceptedTerms}
              onBack={previousStep}
              onEdit={goToStep}
              onFinish={finishAffiliation}
            />
          )}
        </div>
      </div>

      <aside className="business-affiliation__sidebar">
        <img src={affiliationImage} alt="Negocio afiliado a Kalitán con alimentos excedentes" />

        <section className="business-sidebar-card">
          <h2>Beneficios de afiliar tu negocio</h2>
          <ul>
            <li>Reduce el desperdicio de alimentos</li>
            <li>Mejora tu imagen y reputación</li>
            <li>Cumple tus metas de sostenibilidad</li>
            <li>Contribuye a tu comunidad</li>
            <li>Recibe reportes de impacto</li>
          </ul>
        </section>

        <section className="business-sidebar-card business-sidebar-card--help">
          <h2>¿Necesitas ayuda?</h2>
          <p>Nuestro equipo está listo para ayudarte en cada paso del proceso.</p>
          <a href="mailto:negocios@kalitan.org">negocios@kalitan.org</a>
          <a href="tel:3312345678">33 1234 5678</a>
        </section>
      </aside>
    </section>
  )
}
