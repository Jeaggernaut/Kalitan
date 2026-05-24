export const ROLES = {
  BUSINESS: 'BUSINESS',
  VOLUNTEER: 'VOLUNTEER',
  ASSOCIATION: 'ASSOCIATION',
  BENEFICIARY: 'BENEFICIARY',
  ADMIN: 'ADMIN',
}

export const ROLE_DASHBOARD_PATHS = {
  [ROLES.BUSINESS]: '/dashboard/business',
  [ROLES.VOLUNTEER]: '/dashboard/volunteer',
  [ROLES.ASSOCIATION]: '/dashboard/association',
  [ROLES.BENEFICIARY]: '/dashboard/beneficiary',
  [ROLES.ADMIN]: '/dashboard/admin',
}

export const ACCOUNT_TYPE_TO_ROLE = {
  BUSINESS: ROLES.BUSINESS,
  VOLUNTEER: ROLES.VOLUNTEER,
  ASSOCIATION: ROLES.ASSOCIATION,
  BENEFICIARY: ROLES.BENEFICIARY,
}

export function getDashboardPathByRole(role) {
  return ROLE_DASHBOARD_PATHS[role] ?? '/'
}
