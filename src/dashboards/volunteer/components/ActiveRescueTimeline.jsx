import { activeRescueSteps } from '../mock/volunteerMockData'

export default function ActiveRescueTimeline() {
  return (
    <section className="volunteer-panel volunteer-timeline-panel">
      <h2>Mis rescates en proceso</h2>
      <div className="volunteer-timeline">
        {activeRescueSteps.map((step) => {
          const Icon = step.icon
          return (
            <article className={step.active ? 'is-active' : ''} key={step.title}>
              <div className="volunteer-timeline__icon">
                <Icon size={24} />
                <span>✓</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.time}</small>
            </article>
          )
        })}
      </div>
    </section>
  )
}
