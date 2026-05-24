import DashboardSection from './DashboardSection'
import { recentSurplus } from '../mock/businessMockData'

const statusClass = {
  Rescatado: 'is-rescued',
  'En proceso': 'is-process',
  Publicado: 'is-published',
}

export default function RecentSurplusList() {
  return (
    <DashboardSection
      title="Excedentes recientes"
      className="business-recent"
      action={<button className="business-chip" type="button">Ver todos</button>}
    >
      <div className="business-surplus-list">
        {recentSurplus.map((item) => (
          <article key={`${item.name}-${item.date}`}>
            <img src={item.image} alt="" loading="lazy" />
            <div>
              <h3>{item.name}</h3>
              <p>{item.amount}</p>
            </div>
            <div className="business-surplus-list__meta">
              <span className={statusClass[item.status]}>{item.status}</span>
              <small>{item.date}</small>
            </div>
          </article>
        ))}
      </div>
    </DashboardSection>
  )
}
