export default function BusinessStepProgress({ steps, currentStep, completedSteps, onStepClick }) {
  return (
    <nav className={`business-stepper business-stepper--step-${currentStep}`} aria-label="Progreso de afiliación">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber <= completedSteps
        const isActive = stepNumber === currentStep

        return (
          <div className={`business-stepper__item ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`} key={step}>
            <button type="button" onClick={() => onStepClick(stepNumber)}>
              {isDone && !isActive ? '✓' : stepNumber}
            </button>
            <span>{step}</span>
          </div>
        )
      })}
    </nav>
  )
}
