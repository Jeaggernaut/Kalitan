import {
  Bell,
  Box,
  CalendarDays,
  Cloud,
  Home,
  MapPin,
  PackageCheck,
  ReceiptText,
  Settings,
  Truck,
  UserRoundCog,
} from 'lucide-react'

export const associationProfile = {
  name: 'Banco de Alimentos Poza Rica',
  shortName: 'Alimentos Poza Rica',
  initials: 'BA',
  type: 'Asociación receptora',
  description: 'Recibimos alimentos rescatados y los distribuimos en comedores comunitarios de Poza Rica.',
  address: 'Calle Fresno 19, Col. Centro, Poza Rica, Veracruz',
  hours: 'Lunes a sábado, 9:00 am - 7:00 pm',
  contact: 'recepcion@manosunidas.org · +52 782 123 4400',
  location: [20.5333, -97.45],
  logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=420&q=80',
}

export const associationNavigation = [
  { label: 'Inicio', icon: Home, path: '/dashboard/association/inicio' },
  { label: 'Entregas pendientes', icon: Truck, path: '/dashboard/association/entregas-pendientes' },
  { label: 'Alimentos recibidos', icon: Box, path: '/dashboard/association/alimentos-recibidos' },
  { label: 'Solicitudes', icon: ReceiptText, path: '/dashboard/association/solicitudes' },
  { label: 'Historial de recepciones', icon: CalendarDays, path: '/dashboard/association/historial' },
  { label: 'Perfil de la asociación', icon: UserRoundCog, path: '/dashboard/association/perfil' },
  { label: 'Configuración', icon: Settings, path: '/dashboard/association/configuracion' },
]

export const associationMetrics = [
  { label: 'Entregas este mes', value: '24', delta: '+6 vs abril', icon: PackageCheck },
  { label: 'Alimentos recibidos', value: '1,248 kg', delta: 'Promedio 52 kg/día', icon: Box },
  { label: 'CO₂ evitado', value: '632 kg', delta: 'Estimado operativo', icon: Cloud },
]

export const pendingDeliveries = [
  {
    id: 'delivery-1',
    business: 'Panadería Buen Sabor',
    food: 'Pan artesanal del día',
    category: 'Panadería',
    amount: '15 kg',
    time: '4:00 PM',
    date: 'Hoy',
    status: 'En camino',
    driver: 'Juan Pérez',
    coordinates: [20.5362, -97.4488],
    notes: 'Entrega directa al comedor principal.',
  },
  {
    id: 'delivery-2',
    business: 'Mercado Cazones',
    food: 'Frutas y verduras variadas',
    category: 'Frutas y verduras',
    amount: '22 kg',
    time: '5:30 PM',
    date: 'Hoy',
    status: 'En camino',
    driver: 'María López',
    coordinates: [20.5288, -97.4568],
    notes: 'Revisar cajas al recibir.',
  },
  {
    id: 'delivery-3',
    business: 'Restaurante Verde Vida',
    food: 'Comida preparada',
    category: 'Preparados',
    amount: '10 kg',
    time: '12:00 PM',
    date: 'Mañana',
    status: 'Programado',
    driver: 'Pendiente',
    coordinates: [20.5414, -97.4395],
    notes: 'Requiere refrigeración al llegar.',
  },
  {
    id: 'delivery-4',
    business: 'Pastelería Dulce Momento',
    food: 'Repostería variada',
    category: 'Repostería',
    amount: '8 kg',
    time: '2:30 PM',
    date: 'Mañana',
    status: 'Programado',
    driver: 'Ana Torres',
    coordinates: [20.5246, -97.4448],
    notes: 'Separar para merienda comunitaria.',
  },
]

export const associationAgenda = pendingDeliveries.map((delivery) => ({
  id: `agenda-${delivery.id}`,
  time: delivery.time,
  business: delivery.business,
  status: delivery.status,
  foodType: delivery.category,
}))

export const receivedFoods = [
  { id: 'food-1', category: 'Panadería', amount: '180 kg', date: 'Mayo 2026', lastReception: 'Pan artesanal · 22 mayo' },
  { id: 'food-2', category: 'Frutas y verduras', amount: '340 kg', date: 'Mayo 2026', lastReception: 'Cajas mixtas · 21 mayo' },
  { id: 'food-3', category: 'Preparados', amount: '96 kg', date: 'Mayo 2026', lastReception: 'Comida lista · 20 mayo' },
  { id: 'food-4', category: 'Repostería', amount: '64 kg', date: 'Mayo 2026', lastReception: 'Pan dulce · 19 mayo' },
]

export const receptionHistory = [
  { id: 'rec-1', food: 'Pan artesanal del día', business: 'Panadería Buen Sabor', deliveredBy: 'Juan Pérez', time: 'Hoy, 10:25 AM', status: 'Recibido', amount: '15 kg' },
  { id: 'rec-2', food: 'Frutas y verduras variadas', business: 'Mercado Cazones', deliveredBy: 'María López', time: 'Ayer, 6:10 PM', status: 'Recibido', amount: '22 kg' },
  { id: 'rec-3', food: 'Comida preparada', business: 'Restaurante Verde Vida', deliveredBy: 'Diego Ruiz', time: '20 mayo, 1:20 PM', status: 'Validado', amount: '10 kg' },
  { id: 'rec-4', food: 'Repostería variada', business: 'Pastelería Dulce Momento', deliveredBy: 'Ana Torres', time: '19 mayo, 4:40 PM', status: 'Recibido', amount: '8 kg' },
]

export const associationRequests = [
  { id: 'req-1', title: 'Pan para comedor vespertino', category: 'Panadería', quantity: '20 kg', status: 'Abierta', window: 'Hoy, 6:00 PM' },
  { id: 'req-2', title: 'Fruta para desayunos', category: 'Frutas', quantity: '30 kg', status: 'En revisión', window: 'Mañana, 8:00 AM' },
  { id: 'req-3', title: 'Preparados refrigerados', category: 'Preparados', quantity: '12 kg', status: 'Completada', window: '20 mayo' },
]

export const recentActivity = [
  'Juan Pérez confirmó entrega de Panadería Buen Sabor.',
  'Mercado Cazones actualizó cantidad a 22 kg.',
  'Recepción de Restaurante Verde Vida fue validada.',
  'Nueva solicitud creada para fruta de desayuno.',
]

export const topbarIcons = {
  notification: Bell,
  location: MapPin,
}
