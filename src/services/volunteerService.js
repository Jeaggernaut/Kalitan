import api from './api'

export function getVolunteers(params) {
  return api.get('/volunteers', { params })
}

export function registerVolunteer(payload) {
  return api.post('/volunteers/register', payload)
}

export function getVolunteerActivity(volunteerId) {
  return api.get(`/volunteers/${volunteerId}/activity`)
}
