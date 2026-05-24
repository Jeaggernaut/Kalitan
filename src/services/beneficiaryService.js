import {
  availableSupports,
  beneficiaryProfile,
  nextSupport,
  notifications,
  requestTimeline,
  supportHistory,
} from '../dashboards/beneficiary/mock/beneficiaryMockData'

const mockResponse = (data) => Promise.resolve(data)

export function getBeneficiaryDashboard() {
  return mockResponse({
    profile: beneficiaryProfile,
    nextSupport,
    availableSupports,
    history: supportHistory,
    requests: requestTimeline,
    notifications,
  })
}

export function getAvailableSupports() {
  return mockResponse(availableSupports)
}

export function requestSupport(supportId) {
  return mockResponse({
    success: true,
    supportId,
    status: 'En revision',
  })
}

export function getBeneficiaryHistory() {
  return mockResponse(supportHistory)
}

export function getBeneficiaryNotifications() {
  return mockResponse(notifications)
}
