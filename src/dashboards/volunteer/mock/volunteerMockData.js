import {
  Award,
  Box,
  CalendarDays,
  Clock,
  Cloud,
  Gift,
  HeartHandshake,
  Home,
  Leaf,
  PackageCheck,
  Route,
  Settings,
  User,
  Users,
} from 'lucide-react'

export const volunteerProfile = {
  name: 'Juan Pérez',
  firstName: 'Juan',
  initials: 'JP',
  status: 'Disponible',
  rating: '4.9',
  reviews: '128',
  location: [20.5333, -97.45],
}

export const volunteerNavigation = [
  { label: 'Inicio', icon: Home, active: true },
  { label: 'Rescates disponibles', icon: Box },
  { label: 'Mis rescates', icon: Gift },
  { label: 'Rutas de entrega', icon: Route },
  { label: 'Historial', icon: Clock },
  { label: 'Mi impacto', icon: Leaf },
  { label: 'Reconocimientos', icon: Award },
  { label: 'Mi perfil', icon: User },
  { label: 'Disponibilidad', icon: CalendarDays },
  { label: 'Configuración', icon: Settings },
]

export const volunteerMetrics = [
  { label: 'Rescates completados', value: '28', delta: '+27%', icon: PackageCheck, tone: 'green' },
  { label: 'Personas beneficiadas', value: '356', delta: '+18%', icon: Users, tone: 'purple' },
  { label: 'Alimentos rescatados', value: '642 kg', delta: '+23%', icon: Leaf, tone: 'yellow' },
  { label: 'CO₂ evitado', value: '128 kg', delta: '+16%', icon: Cloud, tone: 'blue' },
]

export const availableRescues = [
  {
    id: 'rescue-1',
    business: 'Panadería Buen Sabor',
    food: 'Pan artesanal del día',
    distance: '1.2 km',
    schedule: 'Disponible hasta 7:00 PM',
    amount: '15 kg de pan',
    status: 'Disponible',
    coordinates: [20.5358, -97.449],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'rescue-2',
    business: 'Mercado San Martín',
    food: 'Frutas y verduras variadas',
    distance: '2.5 km',
    schedule: 'Disponible hasta 6:00 PM',
    amount: '22 kg de alimentos',
    status: 'Disponible',
    coordinates: [20.5288, -97.4568],
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'rescue-3',
    business: 'Restaurante Verde Vida',
    food: 'Comida preparada',
    distance: '3.1 km',
    schedule: 'Disponible hasta 5:30 PM',
    amount: '10 kg de comida',
    status: 'En proceso',
    coordinates: [20.5414, -97.4395],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'rescue-4',
    business: 'Pastelería Dulce Momento',
    food: 'Repostería del día',
    distance: '1.8 km',
    schedule: 'Disponible hasta 8:00 PM',
    amount: '8 kg de repostería',
    status: 'Completado',
    coordinates: [20.5246, -97.4448],
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=220&q=80',
  },
]

export const agendaItems = [
  {
    time: '4:00 PM',
    action: 'Recoger en Panadería Buen Sabor',
    place: '15 kg de pan · 1.2 km',
    status: 'En camino',
    tone: 'green',
  },
  {
    time: '5:30 PM',
    action: 'Entregar a Asociación Manos Unidas',
    place: '15 kg de pan',
    status: 'Pendiente',
    tone: 'purple',
  },
]

export const impactSummary = {
  progress: 78,
  people: 356,
  foodKg: 642,
  co2Kg: 128,
}

export const impactChartData = [
  { name: 'Logrado', value: impactSummary.progress },
  { name: 'Pendiente', value: 100 - impactSummary.progress },
]

export const activeRescueSteps = [
  { title: 'Rescate aceptado', description: 'Panadería Buen Sabor', time: '4:00 PM', icon: PackageCheck, active: true },
  { title: 'En camino', description: 'Recogiendo alimentos', time: '4:15 PM', icon: Route, active: true },
  { title: 'Entregado', description: 'Asociación Manos Unidas', time: '5:30 PM', icon: Gift, active: false },
  { title: 'Completado', description: 'Personas beneficiadas', time: 'Próximamente', icon: HeartHandshake, active: false },
]
