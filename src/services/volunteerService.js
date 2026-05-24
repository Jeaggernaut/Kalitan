import {
  activeRescueSteps,
  agendaItems,
  availableRescues,
  impactSummary,
  volunteerMetrics,
  volunteerProfile,
} from '../dashboards/volunteer/mock/volunteerMockData'

function mockResponse(data, delay = 250) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay)
  })
}

export function getVolunteerDashboard() {
  return mockResponse({
    profile: volunteerProfile,
    metrics: volunteerMetrics,
    availableRescues,
    agenda: agendaItems,
    impact: impactSummary,
    activeRescueSteps,
  })
}

export function getAvailableRescues() {
  return mockResponse(availableRescues)
}

export function acceptRescue(rescueId) {
  return mockResponse({ success: true, rescueId })
}

export function getVolunteerImpact() {
  return mockResponse(impactSummary)
}

export function getVolunteerAgenda() {
  return mockResponse(agendaItems)
}
