import { beneficiaryMockData } from '../dashboards/beneficiary/mock/beneficiaryMockData'

export const BENEFICIARY_ENDPOINTS = {
  dashboard: '/api/beneficiary/dashboard',
  supports: '/api/beneficiary/supports',
  history: '/api/beneficiary/history',
  requests: '/api/beneficiary/requests',
  notifications: '/api/beneficiary/notifications',
  profile: '/api/beneficiary/profile',
}

const delay = (ms = 180) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

const clone = (data) => JSON.parse(JSON.stringify(data))

export async function getDashboard() {
  await delay()
  return clone(beneficiaryMockData)
}

export async function getSupports() {
  await delay()
  return clone(beneficiaryMockData.supports)
}

export async function getHistory() {
  await delay()
  return clone(beneficiaryMockData.history)
}

export async function getRequests() {
  await delay()
  return clone(beneficiaryMockData.requests)
}

export async function getNotifications() {
  await delay()
  return clone(beneficiaryMockData.notifications)
}

export async function updateProfile(profile) {
  await delay(240)
  return {
    success: true,
    profile: clone(profile),
  }
}

export async function requestSupport(supportId) {
  await delay(220)
  return {
    success: true,
    supportId,
    status: 'En revision',
  }
}

export const getBeneficiaryDashboard = getDashboard
export const getAvailableSupports = getSupports
export const getBeneficiaryHistory = getHistory
export const getBeneficiaryNotifications = getNotifications
