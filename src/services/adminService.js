import { adminMockData } from '../dashboards/admin/mock/adminMockData'

export const ADMIN_ENDPOINTS = {
  dashboard: '/api/admin/dashboard',
  users: '/api/admin/users',
  businesses: '/api/admin/businesses',
  associations: '/api/admin/associations',
  surpluses: '/api/admin/surpluses',
  reports: '/api/admin/reports',
}

const delay = (ms = 180) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

export async function getAdminSnapshot() {
  await delay()
  return adminMockData
}
