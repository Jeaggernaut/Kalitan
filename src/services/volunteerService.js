import api from './api'

const BASE = '/volunteers'

export async function registerVolunteer(payload) {
  const response = await api.post(`${BASE}/register`, payload)
  return response.data
}

export const getVolunteers = async () => {
  return api.get(BASE)
}

export default { registerVolunteer, getVolunteers }
