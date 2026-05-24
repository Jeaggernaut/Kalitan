import { agendaItems } from '../mock/volunteerMockData'

export default function VolunteerAgenda() {
  return (
    <section className="volunteer-panel volunteer-agenda">
      <div className="volunteer-panel__header">
        <h2>Mi agenda</h2>
        <button type="button">Hoy⌄</button>
      </div>
      <div className="volunteer-agenda__list">
        {agendaItems.map((item) => (
          <article className={`volunteer-agenda__item is-${item.tone}`} key={`${item.time}-${item.action}`}>
            <time>{item.time}</time>
            <div>
              <h3>{item.action}</h3>
              <p>{item.place}</p>
            </div>
            <span>{item.status}</span>
          </article>
        ))}
      </div>
      <button className="volunteer-link-button" type="button">Ver todas mis rutas →</button>
    </section>
  )
}
