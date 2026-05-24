import {
  associationAgenda,
  associationImpact,
  associationMetrics,
  associationProfile,
  foodDistributionData,
  pendingDeliveries,
  receivedFoodData,
  receptionTimeline,
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
    impact: associationImpact,
    receivedFoodData,
    foodDistributionData,
    timeline: receptionTimeline,
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

export function getAssociationMap() {
  return mockResponse({
    association: associationProfile.location,
    deliveries: pendingDeliveries,
  })
}
