import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import { availableRescues, volunteerProfile } from '../mock/volunteerMockData'

const statusColor = {
  Disponible: '#22c55e',
  'En proceso': '#7c3aed',
  Completado: '#eab308',
  Voluntario: '#3b82f6',
}

function createMarkerIcon(status) {
  return L.divIcon({
    className: '',
    html: `<span class="volunteer-map-marker" style="--marker-color: ${statusColor[status]}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12],
  })
}

export default function RescueMap() {
  return (
    <section className="volunteer-panel volunteer-map-card">
      <div className="volunteer-panel__header">
        <h2>Rescates cerca de ti</h2>
        <button type="button">Ver mapa completo →</button>
      </div>

      <div className="volunteer-map">
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
          <Marker position={volunteerProfile.location} icon={createMarkerIcon('Voluntario')}>
            <Popup>
              <strong>Tu ubicación simulada</strong>
              <br />
              Poza Rica, Veracruz
            </Popup>
          </Marker>
          {availableRescues.map((rescue) => (
            <Marker key={rescue.id} position={rescue.coordinates} icon={createMarkerIcon(rescue.status)}>
              <Popup>
                <strong>{rescue.business}</strong>
                <br />
                {rescue.food}
                <br />
                {rescue.distance} · {rescue.schedule}
                <br />
                Estado: {rescue.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="volunteer-map-legend">
        <span><i style={{ background: statusColor.Disponible }} /> Disponibles</span>
        <span><i style={{ background: statusColor['En proceso'] }} /> En proceso</span>
        <span><i style={{ background: statusColor.Completado }} /> Completados</span>
      </div>
    </section>
  )
}
