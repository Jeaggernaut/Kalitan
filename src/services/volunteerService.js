import {
  activeRescueSteps,
  agendaItems,
  availableRescues,
  deliveryRoute,
  impactMonthly,
  impactSummary,
  myRescues,
  recognitions,
  rescueHistory,
  volunteerAvailability,
  volunteerMetrics,
  volunteerProfile,
} from '../dashboards/volunteer/mock/volunteerMockData'

function mockResponse(data, delay = 260) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone ? structuredClone(data) : JSON.parse(JSON.stringify(data))), delay)
  })
}

// GET /api/volunteer/dashboard
export function getDashboard() {
  return mockResponse({
    profile: volunteerProfile,
    metrics: volunteerMetrics,
    availableRescues,
    agenda: agendaItems,
    impact: impactSummary,
    activeRescueSteps,
  })
}

// GET /api/volunteer/rescues/available
export function getAvailableRescues(filters = {}) {
  let result = [...availableRescues]
  if (filters.foodType) result = result.filter((r) => r.foodType === filters.foodType)
  if (filters.maxDistance) result = result.filter((r) => parseFloat(r.distance) <= filters.maxDistance)
  if (filters.status) result = result.filter((r) => r.status === filters.status)
  return mockResponse(result)
}

// POST /api/volunteer/rescues/:id/accept
export function acceptRescue(rescueId) {
  return mockResponse({ success: true, rescueId, message: 'Rescate aceptado correctamente.' })
}

// GET /api/volunteer/rescues/my
export function getMyRescues() {
  return mockResponse(myRescues)
}

// PUT /api/volunteer/rescues/:id/status
export function updateRescueStatus(rescueId, status) {
  return mockResponse({ success: true, rescueId, status, message: `Estado actualizado a "${status}".` })
}

// GET /api/volunteer/routes
export function getRoutes() {
  return mockResponse(deliveryRoute)
}

// GET /api/volunteer/history
export function getHistory(filters = {}) {
  let result = [...rescueHistory]
  if (filters.status) result = result.filter((r) => r.status === filters.status)
  if (filters.dateFrom) result = result.filter((r) => r.date >= filters.dateFrom)
  if (filters.dateTo) result = result.filter((r) => r.date <= filters.dateTo)
  return mockResponse(result)
}

// GET /api/volunteer/impact
export function getImpact() {
  return mockResponse({ summary: impactSummary, monthly: impactMonthly })
}

// GET /api/volunteer/recognitions
export function getRecognitions() {
  return mockResponse(recognitions)
}

// PUT /api/volunteer/profile
export function updateProfile(data) {
  return mockResponse({ success: true, profile: { ...volunteerProfile, ...data }, message: 'Perfil actualizado correctamente.' })
}

// PUT /api/volunteer/availability
export function updateAvailability(data) {
  return mockResponse({ success: true, availability: { ...volunteerAvailability, ...data }, message: 'Disponibilidad actualizada.' })
}

// Legacy alias
export function getVolunteerDashboard() { return getDashboard() }
export function getVolunteerImpact() { return getImpact() }
export function getVolunteerAgenda() { return mockResponse(agendaItems) }
