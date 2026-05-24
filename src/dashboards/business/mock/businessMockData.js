import {
  BarChart3,
  Bell,
  Box,
  CreditCard,
  FileText,
  Home,
  Leaf,
  LineChart,
  PackageCheck,
  ReceiptText,
  Store,
} from 'lucide-react'

export const businessProfile = {
  name: 'Panadería Buen Sabor',
  type: 'Negocio',
  initials: 'PB',
  description: 'Panadería artesanal con producción diaria y excedentes listos para rescate social.',
  address: 'Av. Reforma 125, Centro, CDMX',
  phone: '+52 55 1234 9087',
  hours: 'Lunes a sábado, 7:00 am - 8:00 pm',
  logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=420&q=80',
  images: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=420&q=80',
    'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=420&q=80',
  ],
  preferences: {
    notifications: true,
    privacy: 'Solo asociaciones verificadas',
    theme: 'Sistema',
  },
}

export const businessNavigation = [
  { label: 'Inicio', icon: Home, path: '/dashboard/business/inicio' },
  { label: 'Excedentes', icon: PackageCheck, path: '/dashboard/business/excedentes' },
  { label: 'Donaciones realizadas', icon: Box, path: '/dashboard/business/donaciones' },
  { label: 'Reportes', icon: FileText, path: '/dashboard/business/reportes' },
  { label: 'Métricas', icon: BarChart3, path: '/dashboard/business/metricas' },
  { label: 'Suscripción', icon: CreditCard, path: '/dashboard/business/suscripcion' },
  { label: 'Facturación', icon: ReceiptText, path: '/dashboard/business/facturacion' },
  { label: 'Perfil del negocio', icon: Store, path: '/dashboard/business/perfil' },
]

export const businessMetrics = [
  { label: 'Excedentes publicados', value: '24', suffix: 'este mes', delta: '+20%', icon: Leaf },
  { label: 'Rescates completados', value: '18', suffix: 'este mes', delta: '+12%', icon: PackageCheck },
  { label: 'CO₂ evitado', value: '320 kg', suffix: 'este mes', delta: '+15%', icon: Leaf },
]

export const impactData = [
  { month: 'Dic', people: 370, food: 160, co2: 110 },
  { month: 'Ene', people: 570, food: 210, co2: 140 },
  { month: 'Feb', people: 620, food: 260, co2: 180 },
  { month: 'Mar', people: 780, food: 310, co2: 220 },
  { month: 'Abr', people: 900, food: 370, co2: 270 },
  { month: 'May', people: 1248, food: 420, co2: 320 },
]

export const recentSurplus = [
  {
    id: 'sur-001',
    name: 'Pan artesanal del día',
    description: 'Piezas mixtas de masa madre y pan blanco.',
    amount: '15 kg',
    status: 'Rescatado',
    date: '2026-05-22',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-002',
    name: 'Conchas y cuernitos',
    description: 'Pan dulce de producción matutina.',
    amount: '8 kg',
    status: 'Publicado',
    date: '2026-05-21',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-003',
    name: 'Pasteles individuales',
    description: 'Porciones refrigeradas listas para comedor.',
    amount: '12 unidades',
    status: 'En proceso',
    date: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-004',
    name: 'Bollería variada',
    description: 'Piezas surtidas para desayuno comunitario.',
    amount: '10 kg',
    status: 'Pausado',
    date: '2026-05-19',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=420&q=80',
  },
]

export const donations = [
  { id: 'don-001', food: 'Pan artesanal del día', association: 'Asociación Manos Unidas', date: '2026-05-22', status: 'Entregada', amount: '15 kg' },
  { id: 'don-002', food: 'Conchas y cuernitos', association: 'Comedor La Esperanza', date: '2026-05-21', status: 'Entregada', amount: '8 kg' },
  { id: 'don-003', food: 'Pasteles individuales', association: 'Casa Hogar Norte', date: '2026-05-20', status: 'En traslado', amount: '12 unidades' },
  { id: 'don-004', food: 'Bollería variada', association: 'Red Solidaria Sur', date: '2026-05-18', status: 'Programada', amount: '10 kg' },
]

export const reports = {
  summary: [
    { label: 'Alimentos rescatados', value: '420 kg' },
    { label: 'CO₂ evitado', value: '320 kg' },
    { label: 'Rescates mensuales', value: '18' },
  ],
  monthlyRescues: [
    { month: 'Ene', rescues: 9, food: 180, co2: 120 },
    { month: 'Feb', rescues: 12, food: 230, co2: 160 },
    { month: 'Mar', rescues: 14, food: 280, co2: 210 },
    { month: 'Abr', rescues: 16, food: 350, co2: 260 },
    { month: 'May', rescues: 18, food: 420, co2: 320 },
  ],
}

export const metrics = {
  growth: [
    { month: 'Ene', rescues: 9, performance: 72 },
    { month: 'Feb', rescues: 12, performance: 78 },
    { month: 'Mar', rescues: 14, performance: 82 },
    { month: 'Abr', rescues: 16, performance: 86 },
    { month: 'May', rescues: 18, performance: 91 },
  ],
  topFoods: [
    { name: 'Pan', value: 42 },
    { name: 'Pan dulce', value: 28 },
    { name: 'Pasteles', value: 18 },
    { name: 'Bollería', value: 12 },
  ],
}

export const invoices = [
  { id: 'FAC-2026-001', date: '2026-05-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico mensual' },
  { id: 'FAC-2026-002', date: '2026-04-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico mensual' },
  { id: 'FAC-2026-003', date: '2026-03-01', amount: '$150 MXN', status: 'Pendiente', concept: 'Plan Básico mensual' },
]

export const subscription = {
  plan: 'Plan Básico',
  price: '$150',
  period: 'MXN / mes',
  status: 'Activo',
  nextPayment: '22/06/2026',
  renewalDate: '2026-06-22',
  benefits: ['Hasta 40 excedentes mensuales', 'Reportes mensuales', 'Soporte por correo'],
}

export const activity = [
  'Bollería variada fue pausada para revisión.',
  'Comedor La Esperanza confirmó recepción de pan dulce.',
  'Se publicó un nuevo excedente disponible.',
  'Factura FAC-2026-001 marcada como pagada.',
]

export const topbarActions = {
  notificationIcon: Bell,
  chartIcon: LineChart,
}
