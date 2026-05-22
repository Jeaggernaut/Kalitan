import api from './api'

export const getSurplus = async () => {
  return api.get('/surplus')
}

export const createSurplus = async (payload) => {
  return api.post('/surplus', payload)
}
