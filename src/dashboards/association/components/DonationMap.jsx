import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import { associationProfile, pendingDeliveries } from '../mock/associationMockData'

const statusColor = {
  'En camino': '#22c55e',
  Programado: '#8b5cf6',
  Recibido: '#eab308',
  Asociación: '#3b82f6',
}

function createMarkerIcon(status) {
  return L.divIcon({
    className: '',
    html: `<span class="association-map-marker" style="--marker-color: ${statusColor[status]}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12],
  })
}

export default function DonationMap() {
  return (
    <section className="association-panel association-map-card">
      <div className="association-panel__header">
        <h2>Donaciones recientes en el mapa</h2>
        <button type="button">Ver mapa completo →</button>
      </div>
      <div className="association-map">
        <MapContainer
          center={associationProfile.location}
          zoom={14}
          scrollWheelZoom={false}
          zoomControl={false}
          className="association-map__container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <Marker position={associationProfile.location} icon={createMarkerIcon('Asociación')}>
            <Popup>
              <strong>{associationProfile.name}</strong>
              <br />
              Ubicación de recepción
            </Popup>
          </Marker>
          {pendingDeliveries.map((delivery) => (
            <Marker key={delivery.id} position={delivery.coordinates} icon={createMarkerIcon(delivery.status)}>
              <Popup>
                <strong>{delivery.business}</strong>
                <br />
                {delivery.food}
                <br />
                {delivery.amount} · {delivery.dateTime}
                <br />
                Estado: {delivery.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="association-map-legend">
        <span><i style={{ background: statusColor['En camino'] }} /> Entregas en camino</span>
        <span><i style={{ background: statusColor.Asociación }} /> Nuestra ubicación</span>
        <span><i style={{ background: statusColor.Programado }} /> Programado</span>
        <span><i style={{ background: statusColor.Recibido }} /> Recibido</span>
      </div>
    </section>
  )
}
