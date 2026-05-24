import {
  Bell,
  Box,
  CalendarDays,
  CheckCircle2,
  Cloud,
  FileBarChart,
  Heart,
  Home,
  MapPin,
  PackageCheck,
  ReceiptText,
  Settings,
  Store,
  Truck,
  UserRoundCog,
  Users,
} from 'lucide-react'

export const associationProfile = {
  name: 'Asociación Manos Unidas',
  shortName: 'Manos Unidas',
  initials: 'AM',
  type: 'Asociación receptora',
  rating: '4.8',
  reviews: '56',
  location: [20.5333, -97.45],
}

export const associationNavigation = [
  { label: 'Inicio', icon: Home, active: true },
  { label: 'Entregas pendientes', icon: Truck },
  { label: 'Alimentos recibidos', icon: Box },
  { label: 'Beneficiarios atendidos', icon: Users },
  { label: 'Solicitudes', icon: ReceiptText },
  { label: 'Historial de recepciones', icon: CalendarDays },
  { label: 'Reportes', icon: FileBarChart },
  { label: 'Mi impacto', icon: Heart },
  { label: 'Perfil de la asociación', icon: UserRoundCog },
  { label: 'Voluntarios', icon: Users },
  { label: 'Configuración', icon: Settings },
]

export const associationMetrics = [
  { label: 'Entregas este mes', value: '24', delta: '+26%', icon: PackageCheck, tone: 'green' },
  { label: 'Alimentos recibidos', value: '1,248 kg', delta: '+18%', icon: Box, tone: 'yellow' },
  { label: 'Beneficiarios atendidos', value: '856', delta: '+21%', icon: Users, tone: 'purple' },
  { label: 'CO₂ evitado', value: '632 kg', delta: '+17%', icon: Cloud, tone: 'blue' },
]

export const pendingDeliveries = [
  {
    id: 'delivery-1',
    business: 'Panadería Buen Sabor',
    food: 'Pan artesanal del día',
    amount: '15 kg de pan',
    dateTime: 'Hoy, 4:00 PM',
    status: 'En camino',
    coordinates: [20.5362, -97.4488],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'delivery-2',
    business: 'Mercado San Martín',
    food: 'Frutas y verduras variadas',
    amount: '22 kg de alimentos',
    dateTime: 'Hoy, 5:30 PM',
    status: 'En camino',
    coordinates: [20.5288, -97.4568],
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'delivery-3',
    business: 'Restaurante Verde Vida',
    food: 'Comida preparada',
    amount: '10 kg de comida',
    dateTime: 'Mañana, 12:00 PM',
    status: 'Programado',
    coordinates: [20.5414, -97.4395],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=220&q=80',
  },
  {
    id: 'delivery-4',
    business: 'Pastelería Dulce Momento',
    food: 'Repostería variada',
    amount: '8 kg de repostería',
    dateTime: 'Mañana, 2:30 PM',
    status: 'Programado',
    coordinates: [20.5246, -97.4448],
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=220&q=80',
  },
]

export const associationAgenda = [
  { time: '4:00 PM', action: 'Recepción de Panadería Buen Sabor', place: '15 kg de pan', status: 'En camino', tone: 'green' },
  { time: '5:30 PM', action: 'Recepción de Mercado San Martín', place: '22 kg de alimentos', status: 'En camino', tone: 'green' },
  { time: '12:00 PM', action: 'Recepción de Restaurante Verde Vida', place: '10 kg de comida', status: 'Programado', tone: 'blue' },
  { time: '2:30 PM', action: 'Recepción de Pastelería Dulce Momento', place: '8 kg de repostería', status: 'Programado', tone: 'blue' },
]

export const receivedFoodData = [
  { month: 'Dic', kg: 420 },
  { month: 'Ene', kg: 540 },
  { month: 'Feb', kg: 760 },
  { month: 'Mar', kg: 920 },
  { month: 'Abr', kg: 1060 },
  { month: 'May', kg: 1248 },
]

export const foodDistributionData = [
  { name: 'Panadería', value: 523, percent: '42%' },
  { name: 'Frutas y verduras', value: 348, percent: '28%' },
  { name: 'Comida preparada', value: 249, percent: '20%' },
  { name: 'Repostería', value: 128, percent: '10%' },
]

export const receptionTimeline = [
  { title: 'Donación publicada', description: 'Pan artesanal del día', time: '08:30 am', icon: Store, active: true },
  { title: 'Voluntario asignado', description: 'Juan Pérez', time: '09:15 am', icon: Users, active: true },
  { title: 'En ruta', description: 'Entrega en camino', time: '09:45 am', icon: Truck, active: true },
  { title: 'Recepción completada', description: 'Validación pendiente', time: '10:20 am', icon: CheckCircle2, active: false },
]

export const associationImpact = {
  people: 856,
  foodKg: 1248,
  co2Kg: 632,
  donations: 24,
}

export const topbarIcons = {
  notification: Bell,
  location: MapPin,
}
