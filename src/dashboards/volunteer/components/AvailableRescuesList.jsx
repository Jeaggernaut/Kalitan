import { Crosshair, Filter, MapPin } from 'lucide-react'
import RescueCard from './RescueCard'
import { availableRescues } from '../mock/volunteerMockData'

export default function AvailableRescuesList() {
  return (
    <section className="volunteer-panel volunteer-rescues">
      <div className="volunteer-panel__header">
        <div>
          <h2>Rescates disponibles</h2>
          <p>Hay excedentes cerca de ti</p>
        </div>
        <div className="volunteer-rescues__actions">
          <button type="button"><MapPin size={17} /> Mi ubicación</button>
          <button type="button"><Filter size={17} /> Filtros</button>
          <button type="button" aria-label="Centrar búsqueda"><Crosshair size={17} /></button>
        </div>
      </div>

      <div className="volunteer-rescues__list">
        {availableRescues.map((rescue) => (
          <RescueCard rescue={rescue} key={rescue.id} />
        ))}
      </div>

      <button className="volunteer-link-button" type="button">Ver más rescates →</button>
    </section>
  )
}
