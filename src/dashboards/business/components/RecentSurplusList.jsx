import { useNavigate } from 'react-router-dom'
import { useBusiness } from '../../../hooks/useBusiness'
import DashboardSection from './DashboardSection'

const statusClass = {
  Rescatado: 'is-rescued',
  'En proceso': 'is-process',
  Publicado: 'is-published',
}

export default function RecentSurplusList() {
  const { activeBusiness } = useBusiness()
  const navigate = useNavigate()
  const recentSurplus = activeBusiness.surpluses.slice(0, 4)

  return (
    <DashboardSection
      title="Excedentes recientes"
      className="business-recent"
      action={<button className="business-chip" type="button" onClick={() => navigate('/dashboard/business/excedentes')}>Ver todos</button>}
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
