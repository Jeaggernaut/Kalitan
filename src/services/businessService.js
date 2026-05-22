import api from './api'

export function getBusinesses(params) {
  return api.get('/businesses', { params })
}

export function createBusiness(payload) {
  return api.post('/businesses', payload)
}

export function getBusinessImpact(businessId) {
  return api.get(`/businesses/${businessId}/impact`)
}
