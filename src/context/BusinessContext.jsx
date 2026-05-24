import { useState } from 'react'
import { mockBusinesses } from '../dashboards/business/mock/mockBusinesses'
import { BusinessContext } from './businessContext'

export function BusinessProvider({ children }) {
  const [businesses, setBusinesses] = useState(mockBusinesses)
  const [activeBusinessId, setActiveBusinessId] = useState(mockBusinesses[0].id)

  const activeBusiness = businesses.find((business) => business.id === activeBusinessId) ?? businesses[0]

  const selectBusiness = (businessId) => {
    setActiveBusinessId(businessId)
  }

  const updateActiveBusiness = (updater) => {
    setBusinesses((currentBusinesses) => currentBusinesses.map((business) => (
      business.id === activeBusinessId ? updater(business) : business
    )))
  }

  const createSurplus = (payload) => {
    const nextSurplus = {
      id: `sur-${Date.now()}`,
      image: payload.image || activeBusiness.profile.logo,
      status: 'Publicado',
      ...payload,
    }
    updateActiveBusiness((business) => ({ ...business, surpluses: [nextSurplus, ...business.surpluses] }))
    return nextSurplus
  }

  const updateSurplus = (surplusId, payload) => {
    let updatedSurplus
    updateActiveBusiness((business) => ({
      ...business,
      surpluses: business.surpluses.map((surplus) => {
        if (surplus.id !== surplusId) return surplus
        updatedSurplus = { ...surplus, ...payload }
        return updatedSurplus
      }),
    }))
    return updatedSurplus
  }

  const deleteSurplus = (surplusId) => {
    updateActiveBusiness((business) => ({
      ...business,
      surpluses: business.surpluses.filter((surplus) => surplus.id !== surplusId),
    }))
  }

  const updateProfile = (payload) => {
    updateActiveBusiness((business) => ({ ...business, profile: { ...business.profile, ...payload } }))
  }

  const value = {
    activeBusiness,
    activeBusinessId,
    businesses,
    createSurplus,
    deleteSurplus,
    selectBusiness,
    updateProfile,
    updateSurplus,
  }

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  )
}
