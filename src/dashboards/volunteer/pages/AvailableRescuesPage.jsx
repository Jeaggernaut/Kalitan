import { motion } from 'framer-motion'
import L from 'leaflet'
import {
  CheckCircle2,
  Clock,
  Filter,
  MapPin,
  Package,
  Search,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import { acceptRescue } from '../../../services/volunteerService'
import { allFoodTypes, availableRescues, volunteerProfile } from '../mock/volunteerMockData'

const statusColor = { Disponible: '#22c55e', 'Próximo a vencer': '#f59e0b', 'En proceso': '#7c3aed' }
const statusClass = { Disponible: 'is-available', 'Próximo a vencer': 'is-expiring', 'En proceso': 'is-process' }

function createMarkerIcon(color) {
  return L.divIcon({
    className: '',
    html: `<span class="volunteer-map-marker" style="--marker-color:${color}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12],
  })
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function AvailableRescuesPage({ notify }) {
  const [search, setSearch] = useState('')
  const [foodFilter, setFoodFilter] = useState('')
  const [distanceFilter, setDistanceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState('')
  const [accepted, setAccepted] = useState([])
  const [view, setView] = useState('list')

  const filtered = availableRescues.filter((r) => {
    if (accepted.includes(r.id)) return false
    const matchSearch = search === '' || r.business.toLowerCase().includes(search.toLowerCase()) || r.food.toLowerCase().includes(search.toLowerCase())
    const matchFood = foodFilter === '' || r.foodType === foodFilter
    const matchDist = distanceFilter === '' || parseFloat(r.distance) <= parseFloat(distanceFilter)
    const matchStatus = statusFilter === '' || r.status === statusFilter
    return matchSearch && matchFood && matchDist && matchStatus
  })

  const handleAccept = async (id) => {
    setLoading(id)
    await acceptRescue(id)
    setLoading('')
    setAccepted((prev) => [...prev, id])
    notify('¡Rescate aceptado! Ya aparece en Mis rescates.')
  }

  const clearFilters = () => {
    setSearch('')
    setFoodFilter('')
    setDistanceFilter('')
    setStatusFilter('')
  }

  const hasFilters = search || foodFilter || distanceFilter || statusFilter

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Rescates disponibles</h2>
          <p className="vpage__subtitle">Hay {filtered.length} rescates cerca de ti ahora mismo</p>
        </div>
        <div className="vpage__header-actions">
          <button
            className={`vpill-btn${view === 'list' ? ' is-active' : ''}`}
            type="button"
            onClick={() => setView('list')}
          >
            Lista
          </button>
          <button
            className={`vpill-btn${view === 'map' ? ' is-active' : ''}`}
            type="button"
            onClick={() => setView('map')}
          >
            Mapa
          </button>
        </div>
      </div>

      <div className="vpage__filters">
        <div className="vpage__search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Buscar por negocio o alimento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="vpage__filter-group">
          <Filter size={16} />
          <select value={foodFilter} onChange={(e) => setFoodFilter(e.target.value)}>
            <option value="">Tipo de alimento</option>
            {allFoodTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={distanceFilter} onChange={(e) => setDistanceFilter(e.target.value)}>
            <option value="">Distancia máxima</option>
            <option value="1">Hasta 1 km</option>
            <option value="2">Hasta 2 km</option>
            <option value="3">Hasta 3 km</option>
            <option value="5">Hasta 5 km</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Estado</option>
            <option value="Disponible">Disponible</option>
            <option value="Próximo a vencer">Próximo a vencer</option>
          </select>
          {hasFilters && (
            <button type="button" className="vpage__clear-btn" onClick={clearFilters}>
              <X size={15} /> Limpiar
            </button>
          )}
        </div>
      </div>

      {view === 'map' && (
        <div className="volunteer-panel vpage__map-panel">
          <div className="volunteer-map" style={{ height: 400 }}>
            <MapContainer
              center={volunteerProfile.location}
              zoom={14}
              scrollWheelZoom={false}
              zoomControl={false}
              className="volunteer-map__container"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="bottomright" />
              <Marker position={volunteerProfile.location} icon={createMarkerIcon('#3b82f6')}>
                <Popup><strong>Tu ubicación</strong></Popup>
              </Marker>
              {filtered.map((r) => (
                <Marker key={r.id} position={r.coordinates} icon={createMarkerIcon(statusColor[r.status] ?? '#22c55e')}>
                  <Popup>
                    <strong>{r.business}</strong><br />
                    {r.food}<br />
                    {r.amount} · {r.distance}<br />
                    {r.schedule}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="vpage__empty">
          <Package size={40} />
          <p>No hay rescates disponibles con esos filtros.</p>
          {hasFilters && <button type="button" onClick={clearFilters}>Limpiar filtros</button>}
        </div>
      ) : (
        <motion.div
          className="vrescues-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {filtered.map((rescue) => (
            <motion.article key={rescue.id} className="vrescue-card volunteer-panel" variants={itemVariants}>
              <img src={rescue.image} alt={rescue.food} />
              <div className="vrescue-card__body">
                <div className="vrescue-card__top">
                  <h3>{rescue.food}</h3>
                  <span className={`vstatus-badge ${statusClass[rescue.status] ?? 'is-available'}`}>
                    {rescue.status}
                  </span>
                </div>
                <p className="vrescue-card__business">{rescue.business} · {rescue.businessType}</p>
                <p className="vrescue-card__desc">{rescue.description}</p>
                <div className="vrescue-card__meta">
                  <span><MapPin size={14} /> {rescue.distance}</span>
                  <span><Package size={14} /> {rescue.amount}</span>
                  <span><Clock size={14} /> {rescue.schedule}</span>
                </div>
                <p className="vrescue-card__address"><MapPin size={13} /> {rescue.address}</p>
              </div>
              <div className="vrescue-card__actions">
                <button
                  type="button"
                  className="vrescue-card__accept-btn"
                  onClick={() => handleAccept(rescue.id)}
                  disabled={loading === rescue.id}
                >
                  <CheckCircle2 size={17} />
                  {loading === rescue.id ? 'Aceptando...' : 'Aceptar rescate'}
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
