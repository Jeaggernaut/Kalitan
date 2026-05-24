import {
  associationAgenda,
  associationMetrics,
  associationProfile,
  associationRequests,
  pendingDeliveries,
  receivedFoods,
  recentActivity,
  receptionHistory,
} from '../dashboards/association/mock/associationMockData'

function mockResponse(data, delay = 250) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay)
  })
}

export function getAssociationDashboard() {
  return mockResponse({
    profile: associationProfile,
    metrics: associationMetrics,
    deliveries: pendingDeliveries,
    agenda: associationAgenda,
    receivedFoods,
    receptionHistory,
    requests: associationRequests,
    recentActivity,
  })
}

export function getPendingDeliveries() {
  return mockResponse(pendingDeliveries)
}

export function getAssociationMetrics() {
  return mockResponse(associationMetrics)
}

export function getAssociationAgenda() {
  return mockResponse(associationAgenda)
}

export function getReceivedFoods() {
  return mockResponse(receivedFoods)
}

export function getReceptionHistory() {
  return mockResponse(receptionHistory)
}

export function getAssociationMap() {
  return mockResponse({
    association: associationProfile.location,
    deliveries: pendingDeliveries,
  })
}

export function updateAssociationProfile(payload) {
  return mockResponse({ ...associationProfile, ...payload })
}
