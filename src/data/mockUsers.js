import { ROLES } from './roles'

export const mockUsers = [
  {
    id: 1,
    fullName: 'Negocio Demo Kalitán',
    email: 'negocio@kalitan.com',
    password: '12345678',
    role: ROLES.BUSINESS,
  },
  {
    id: 2,
    fullName: 'Voluntario Demo',
    email: 'voluntario@kalitan.com',
    password: '12345678',
    role: ROLES.VOLUNTEER,
  },
  {
    id: 3,
    fullName: 'Asociación Receptora Demo',
    email: 'asociacion@kalitan.com',
    password: '12345678',
    role: ROLES.ASSOCIATION,
  },
  {
    id: 4,
    fullName: 'Beneficiario Demo',
    email: 'beneficiario@kalitan.com',
    password: '12345678',
    role: ROLES.BENEFICIARY,
  },
  {
    id: 5,
    fullName: 'Admin Kalitán',
    email: 'admin@kalitan.com',
    password: '12345678',
    role: ROLES.ADMIN,
  },
]
