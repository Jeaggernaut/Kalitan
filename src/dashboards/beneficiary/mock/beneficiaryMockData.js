import {
  Bell,
  CircleHelp,
  ClipboardList,
  History,
  Home,
  PackageCheck,
  UserRound,
} from 'lucide-react'

export const beneficiaryProfile = {
  name: 'Maria Lopez',
  initials: 'ML',
  location: 'Poza Rica, Veracruz',
  association: 'Asociacion Manos Unidas',
  notifications: 2,
}

export const beneficiaryNavigation = [
  { label: 'Inicio', icon: Home, active: true },
  { label: 'Mis apoyos', icon: PackageCheck },
  { label: 'Historial', icon: History },
  { label: 'Mis solicitudes', icon: ClipboardList },
  { label: 'Notificaciones', icon: Bell },
  { label: 'Mi perfil', icon: UserRound },
  { label: 'Ayuda', icon: CircleHelp },
]

export const nextSupport = {
  business: 'Panaderia Buen Sabor',
  food: 'Paquete de pan y reposteria',
  dateTime: 'Hoy, 5:30 PM',
  deliveryPoint: 'Biblioteca Municipal Norte',
  status: 'En camino',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=640&q=80',
}

export const quickAccessItems = [
  { label: 'Apoyos disponibles', icon: PackageCheck, tone: 'green' },
  { label: 'Mis solicitudes', icon: ClipboardList, tone: 'purple' },
  { label: 'Notificaciones', icon: Bell, tone: 'yellow' },
  { label: 'Mi perfil', icon: UserRound, tone: 'blue' },
]

export const availableSupports = [
  {
    id: 'support-1',
    business: 'Mercado San Martin',
    food: 'Frutas y verduras variadas',
    schedule: 'Hoy, 6:00 PM',
    deliveryPoint: 'Centro Comunitario Norte',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'support-2',
    business: 'Restaurante Verde Vida',
    food: 'Comida preparada',
    schedule: 'Manana, 12:00 PM',
    deliveryPoint: 'Casa de la Cultura',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'support-3',
    business: 'Pasteleria Dulce Momento',
    food: 'Reposteria variada',
    schedule: 'Manana, 4:30 PM',
    deliveryPoint: 'Centro Comunitario Norte',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=420&q=80',
  },
]

export const supportHistory = [
  {
    id: 'history-1',
    business: 'Panaderia Buen Sabor',
    food: 'Paquete de pan',
    date: '18/05/2026',
    status: 'Entregado',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'history-2',
    business: 'Restaurante Verde Vida',
    food: 'Comida preparada',
    date: '15/05/2026',
    status: 'Completado',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'history-3',
    business: 'Mercado San Martin',
    food: 'Frutas y verduras',
    date: '11/05/2026',
    status: 'Entregado',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=220&q=80',
  },
]

export const requestTimeline = [
  { label: 'Solicitud enviada', detail: 'Mercado San Martin', status: 'Completado', tone: 'green' },
  { label: 'En revision', detail: 'Validacion de disponibilidad', status: 'En revision', tone: 'purple' },
  { label: 'En camino', detail: 'Panaderia Buen Sabor', status: 'En camino', tone: 'blue' },
  { label: 'Entregado', detail: 'Restaurante Verde Vida', status: 'Entregado', tone: 'green' },
]

export const notifications = [
  { id: 'notification-1', message: 'Tu apoyo de Panaderia Buen Sabor esta en camino.', read: false },
  { id: 'notification-2', message: 'Hay nuevos apoyos disponibles cerca de ti.', read: false },
  { id: 'notification-3', message: 'Gracias por confirmar tu entrega anterior.', read: true },
]
