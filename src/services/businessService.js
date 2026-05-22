import api from './api'

export const getBusinesses = async () => {
  return api.get('/businesses')
}

export async function registerBusinessAffiliation(data) {
  const response = await api.post('/businesses/affiliation', data)
  return response.data
}

export default { getBusinesses, registerBusinessAffiliation }
