import { motion } from 'framer-motion'
import L from 'leaflet'
import {
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Package,
} from 'lucide-react'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import { updateRescueStatus } from '../../../services/volunteerService'
import { deliveryRoute } from '../mock/volunteerMockData'

function createMarkerIcon(color, label) {
  return L.divIcon({
    className: '',
    html: `<div class="vroute-marker" style="--mc:${color}"><span>${label}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -16],
  })
}

const routeStatuses = ['Sin iniciar', 'En camino al origen', 'Recogido', 'En camino al destino', 'Entregado']

export default function RoutesPage({ notify }) {
  const [routeStatus, setRouteStatus] = useState(deliveryRoute.status === 'En proceso' ? 1 : 0)
  const [loading, setLoading] = useState(false)

  const advance = async () => {
    if (routeStatus >= routeStatuses.length - 1) return
    setLoading(true)
    await updateRescueStatus('myrescue-1', routeStatuses[routeStatus + 1])
    setRouteStatus((s) => s + 1)
    setLoading(false)
    if (routeStatus + 1 === routeStatuses.length - 1) {
      notify('¡Entrega completada! Excelente trabajo.')
    } else {
      notify(`Estado actualizado: ${routeStatuses[routeStatus + 1]}`)
    }
  }

  const isFinished = routeStatus === routeStatuses.length - 1

  const stops = [
    {
      label: 'Tú',
      coords: deliveryRoute.volunteerLocation,
      color: '#3b82f6',
      name: 'Tu ubicación simulada',
      detail: 'Poza Rica, Veracruz',
      type: 'volunteer',
    },
    {
      label: 'A',
      coords: deliveryRoute.pickupPoint.coords,
      color: '#22c55e',
      name: deliveryRoute.pickupPoint.name,
      detail: deliveryRoute.pickupPoint.address,
      type: 'pickup',
      time: deliveryRoute.pickupPoint.estimatedTime,
      dist: deliveryRoute.pickupPoint.distance,
    },
    {
      label: 'B',
      coords: deliveryRoute.deliveryPoint.coords,
      color: '#8b5cf6',
      name: deliveryRoute.deliveryPoint.name,
      detail: deliveryRoute.deliveryPoint.address,
      type: 'delivery',
      time: deliveryRoute.deliveryPoint.estimatedTime,
      dist: deliveryRoute.deliveryPoint.distance,
    },
  ]

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Rutas de entrega</h2>
          <p className="vpage__subtitle">Ruta activa · {deliveryRoute.food} · {deliveryRoute.amount}</p>
        </div>
        <div className="vroute-status-badge">
          <span className="vroute-status-dot" />
          {routeStatuses[routeStatus]}
        </div>
      </div>

      <div className="vroute-layout">
        <div className="volunteer-panel vroute-map-panel">
          <div className="volunteer-map" style={{ height: 440 }}>
            <MapContainer
              center={deliveryRoute.volunteerLocation}
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
              {stops.map((stop) => (
                <Marker key={stop.label} position={stop.coords} icon={createMarkerIcon(stop.color, stop.label)}>
                  <Popup>
                    <strong>{stop.name}</strong><br />{stop.detail}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="vroute-map-legend">
            <span><i style={{ background: '#3b82f6' }} /> Voluntario</span>
            <span><i style={{ background: '#22c55e' }} /> Origen</span>
            <span><i style={{ background: '#8b5cf6' }} /> Destino</span>
          </div>
        </div>

        <div className="vroute-sidebar">
          <div className="volunteer-panel vroute-info-card">
            <h3>Resumen de ruta</h3>
            <div className="vroute-stats">
              <div className="vroute-stat">
                <Navigation size={18} />
                <div>
                  <strong>{deliveryRoute.totalDistance}</strong>
                  <span>Distancia total</span>
                </div>
              </div>
              <div className="vroute-stat">
                <Clock size={18} />
                <div>
                  <strong>{deliveryRoute.totalTime}</strong>
                  <span>Tiempo estimado</span>
                </div>
              </div>
              <div className="vroute-stat">
                <Package size={18} />
                <div>
                  <strong>{deliveryRoute.amount}</strong>
                  <span>{deliveryRoute.food}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="volunteer-panel vroute-stops-card">
            <h3>Paradas</h3>
            <div className="vroute-stops-list">
              {stops.slice(1).map((stop, i) => (
                <div key={stop.label} className="vroute-stop-item">
                  <div className="vroute-stop-badge" style={{ background: stop.color }}>
                    {stop.label}
                  </div>
                  <div className="vroute-stop-body">
                    <strong>{stop.name}</strong>
                    <span><MapPin size={13} /> {stop.detail}</span>
                    <div className="vroute-stop-meta">
                      <span><Clock size={13} /> {stop.time}</span>
                      <span><Navigation size={13} /> {stop.dist}</span>
                    </div>
                  </div>
                  <div className={`vroute-stop-indicator${routeStatus > i + 1 ? ' is-done' : ''}`}>
                    {routeStatus > i + 1 && <CheckCircle2 size={18} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="vroute-progress">
            {routeStatuses.map((s, i) => (
              <div key={s} className={`vroute-progress-step${i <= routeStatus ? ' is-active' : ''}`}>
                <div className="vroute-progress-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          {!isFinished ? (
            <button
              type="button"
              className="vaction-btn is-primary is-full"
              onClick={advance}
              disabled={loading}
            >
              <Navigation size={18} />
              {routeStatus === 0 ? 'Iniciar ruta' : `Avanzar: ${routeStatuses[routeStatus + 1]}`}
            </button>
          ) : (
            <div className="vroute-done-banner">
              <CheckCircle2 size={24} />
              <span>¡Entrega completada! Gracias por tu compromiso.</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
