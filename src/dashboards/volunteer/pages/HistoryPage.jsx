import { motion } from 'framer-motion'
import {
  Building2,
  Calendar,
  Filter,
  Leaf,
  Package,
  Search,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { rescueHistory } from '../mock/volunteerMockData'

const statusClass = {
  Completado: 'is-completed',
  Cancelado: 'is-cancelled',
  'No realizado': 'is-no-show',
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
}

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = rescueHistory.filter((r) => {
    const matchSearch = search === '' ||
      r.business.toLowerCase().includes(search.toLowerCase()) ||
      r.food.toLowerCase().includes(search.toLowerCase()) ||
      r.association.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === '' || r.status === statusFilter
    const matchFrom = dateFrom === '' || r.date >= dateFrom
    const matchTo = dateTo === '' || r.date <= dateTo
    return matchSearch && matchStatus && matchFrom && matchTo
  })

  const totals = {
    completed: rescueHistory.filter((r) => r.status === 'Completado').length,
    cancelled: rescueHistory.filter((r) => r.status !== 'Completado').length,
  }

  const hasFilters = search || statusFilter || dateFrom || dateTo
  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
    setDateFrom('')
    setDateTo('')
  }

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Historial</h2>
          <p className="vpage__subtitle">{totals.completed} completados · {totals.cancelled} no completados</p>
        </div>
      </div>

      <div className="vpage__filters">
        <div className="vpage__search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Buscar por negocio, alimento o asociación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="vpage__filter-group">
          <Filter size={16} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Estado</option>
            <option value="Completado">Completado</option>
            <option value="Cancelado">Cancelado</option>
            <option value="No realizado">No realizado</option>
          </select>
          <div className="vpage__date-range">
            <Calendar size={15} />
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} title="Desde" />
            <span>—</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} title="Hasta" />
          </div>
          {hasFilters && (
            <button type="button" className="vpage__clear-btn" onClick={clearFilters}>
              <X size={15} /> Limpiar
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="vpage__empty">
          <Package size={40} />
          <p>No hay registros con esos filtros.</p>
          {hasFilters && <button type="button" onClick={clearFilters}>Limpiar filtros</button>}
        </div>
      ) : (
        <div className="volunteer-panel vhistory-table-wrap">
          <table className="vhistory-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Negocio</th>
                <th>Asociación</th>
                <th>Alimento</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Impacto</th>
                <th>CO₂</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {filtered.map((r) => (
                <motion.tr key={r.id} variants={itemVariants}>
                  <td><Calendar size={13} /> {r.date}</td>
                  <td>{r.business}</td>
                  <td><Building2 size={13} /> {r.association}</td>
                  <td>{r.food}</td>
                  <td><Package size={13} /> {r.amount}</td>
                  <td>
                    <span className={`vstatus-badge ${statusClass[r.status]}`}>{r.status}</span>
                  </td>
                  <td>
                    {r.impact !== '—' ? (
                      <span className="vhistory-impact"><Users size={13} /> {r.impact}</span>
                    ) : '—'}
                  </td>
                  <td>
                    {r.co2 !== '—' ? (
                      <span className="vhistory-co2"><Leaf size={13} /> {r.co2}</span>
                    ) : '—'}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
