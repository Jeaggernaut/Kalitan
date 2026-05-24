import { associationAgenda } from '../mock/associationMockData'

export default function AssociationAgenda() {
  return (
    <section className="association-panel association-agenda">
      <div className="association-panel__header">
        <h2>Mi agenda</h2>
        <button type="button">Hoy⌄</button>
      </div>
      <div className="association-agenda__list">
        {associationAgenda.map((item) => (
          <article className={`association-agenda__item is-${item.tone}`} key={`${item.time}-${item.action}`}>
            <time>{item.time}</time>
            <div>
              <h3>{item.action}</h3>
              <p>{item.place}</p>
            </div>
            <span>{item.status}</span>
          </article>
        ))}
      </div>
      <button className="association-link-button" type="button">Ver agenda completa →</button>
    </section>
  )
}
