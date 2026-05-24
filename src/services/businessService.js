import { mockBusinesses } from '../dashboards/business/mock/mockBusinesses'

let businessesStore = mockBusinesses.map((business) => ({
  ...business,
  metrics: business.metrics,
  surpluses: [...business.surpluses],
}))

const wait = (payload, delay = 280) => new Promise((resolve) => {
  window.setTimeout(() => resolve(payload), delay)
})

const getActiveBusiness = () => businessesStore[0]

export function getBusinesses() {
  return wait(businessesStore)
}

export function createBusiness(payload) {
  const nextBusiness = { id: `business-${Date.now()}`, ...payload }
  businessesStore = [nextBusiness, ...businessesStore]
  return wait(nextBusiness)
}

export function getBusinessImpact() {
  return wait(getActiveBusiness().reports)
}

export function getDashboard() {
  const business = getActiveBusiness()
  return wait({
    profile: business.profile,
    metrics: business.metrics,
    impactData: business.impactData,
    surpluses: business.surpluses,
    donations: business.donations,
    activity: business.activity,
    subscription: business.subscription,
  })
}

export function getSurpluses() {
  return wait(getActiveBusiness().surpluses)
}

export function createSurplus(payload) {
  const nextSurplus = {
    id: `sur-${Date.now()}`,
    status: 'Publicado',
    image: payload.image || getActiveBusiness().profile.logo,
    ...payload,
  }
  businessesStore = businessesStore.map((business, index) => (
    index === 0 ? { ...business, surpluses: [nextSurplus, ...business.surpluses] } : business
  ))
  return wait(nextSurplus)
}

export function updateSurplus(id, payload) {
  let updatedSurplus = null
  businessesStore = businessesStore.map((business, index) => {
    if (index !== 0) return business
    return {
      ...business,
      surpluses: business.surpluses.map((surplus) => {
        if (surplus.id !== id) return surplus
        updatedSurplus = { ...surplus, ...payload }
        return updatedSurplus
      }),
    }
  })
  return wait(updatedSurplus)
}

export function deleteSurplus(id) {
  businessesStore = businessesStore.map((business, index) => (
    index === 0
      ? { ...business, surpluses: business.surpluses.filter((surplus) => surplus.id !== id) }
      : business
  ))
  return wait({ ok: true })
}

export function getReports() {
  return wait(getActiveBusiness().reports)
}

export function getMetrics() {
  return wait(getActiveBusiness().analytics)
}

export function getInvoices() {
  return wait(getActiveBusiness().invoices)
}

export function updateBusinessProfile(payload) {
  businessesStore = businessesStore.map((business, index) => (
    index === 0 ? { ...business, profile: { ...business.profile, ...payload } } : business
  ))
  return wait(getActiveBusiness().profile)
}

export function getDonations() {
  return wait(getActiveBusiness().donations)
}
