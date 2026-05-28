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
  address: 'Av. 20 de Noviembre 125, Col. Cazones, Poza Rica, Veracruz',
  phone: '+52 782 123 9087',
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
    category: 'Panadería',
    description: 'Piezas mixtas de masa madre y pan blanco.',
    amount: '15 kg',
    quantity: '15',
    unit: 'kg',
    status: 'Rescatado',
    date: '2026-05-22',
    pickupTime: '20:00',
    perishable: true,
    expiresIn: '6 a 24 horas',
    temperature: 'Temperatura ambiente',
    refrigeration: false,
    priority: 'Alta',
    address: 'Av. 20 de Noviembre 125, Col. Cazones, Poza Rica, Veracruz',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-002',
    name: 'Conchas y cuernitos',
    category: 'Panadería',
    description: 'Pan dulce de producción matutina.',
    amount: '8 kg',
    quantity: '8',
    unit: 'kg',
    status: 'Publicado',
    date: '2026-05-21',
    pickupTime: '19:30',
    perishable: true,
    expiresIn: '6 a 24 horas',
    temperature: 'Temperatura ambiente',
    refrigeration: false,
    priority: 'Alta',
    address: 'Av. 20 de Noviembre 125, Col. Cazones, Poza Rica, Veracruz',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-003',
    name: 'Pasteles individuales',
    category: 'Panadería',
    description: 'Porciones refrigeradas listas para comedor.',
    amount: '12 unidades',
    quantity: '12',
    unit: 'piezas',
    status: 'En proceso',
    date: '2026-05-20',
    pickupTime: '18:00',
    perishable: true,
    expiresIn: '2 a 6 horas',
    temperature: '4°C (refrigerado)',
    refrigeration: true,
    priority: 'Alta',
    address: 'Av. 20 de Noviembre 125, Col. Cazones, Poza Rica, Veracruz',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=420&q=80',
  },
  {
    id: 'sur-004',
    name: 'Bollería variada',
    category: 'Panadería',
    description: 'Piezas surtidas para desayuno comunitario.',
    amount: '10 kg',
    quantity: '10',
    unit: 'kg',
    status: 'Pausado',
    date: '2026-05-19',
    pickupTime: '21:00',
    perishable: false,
    expiresIn: null,
    temperature: null,
    refrigeration: false,
    priority: 'Normal',
    address: 'Av. 20 de Noviembre 125, Col. Cazones, Poza Rica, Veracruz',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=420&q=80',
  },
]

export const donations = [
  { id: 'don-001', food: 'Pan artesanal del día', association: 'Banco de Alimentos Poza Rica', date: '2026-05-22', status: 'Entregada', amount: '15 kg' },
  { id: 'don-002', food: 'Conchas y cuernitos', association: 'Comedor Comunitario Cazones', date: '2026-05-21', status: 'Entregada', amount: '8 kg' },
  { id: 'don-003', food: 'Pasteles individuales', association: 'Casa Hogar Poza Rica', date: '2026-05-20', status: 'En traslado', amount: '12 unidades' },
  { id: 'don-004', food: 'Bollería variada', association: 'Red Solidaria Poza Rica', date: '2026-05-18', status: 'Programada', amount: '10 kg' },
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

export const subscriptionPlans = [
  {
    id: 'basico',
    name: 'Plan Básico',
    price: '$150',
    period: 'MXN / mes',
    description: 'Ideal para negocios pequeños que inician su impacto.',
    popular: false,
    features: [
      'Hasta 40 excedentes mensuales',
      'Panel de operación básico',
      'Trazabilidad simple',
      'Reportes mensuales PDF',
      'Soporte estándar por correo',
    ],
  },
  {
    id: 'impacto',
    name: 'Plan Impacto',
    price: '$690',
    period: 'MXN / mes',
    description: 'Para negocios en crecimiento con alto volumen de rescates.',
    popular: true,
    badge: 'Más popular',
    features: [
      'Publicaciones ilimitadas de excedentes',
      'Métricas avanzadas y analítica',
      'Publicaciones prioritarias',
      'Reportes exportables',
      'Donaciones destacadas',
      'Soporte prioritario',
      'Sin comisiones por donación',
    ],
  },
  {
    id: 'empresa',
    name: 'Plan Empresa',
    price: '$1,490',
    period: 'MXN / mes',
    description: 'Para empresas con múltiples sucursales y operaciones avanzadas.',
    popular: false,
    features: [
      'Todo lo del Plan Impacto',
      'Múltiples sucursales',
      'Analytics avanzados',
      'API (próximamente)',
      'Integraciones personalizadas',
      'Soporte premium 24/7',
      'Onboarding dedicado',
    ],
  },
]

export const subscription = {
  planId: 'basico',
  plan: 'Plan Básico',
  price: '$150',
  period: 'MXN / mes',
  status: 'Activo',
  nextPayment: '22/06/2026',
  renewalDate: '2026-06-22',
  startDate: '2026-05-22',
  paymentMethod: 'Mastercard ****8810',
  cycle: '22 May – 22 Jun',
  usage: {
    surpluses: { used: 4, limit: 40 },
    donations: { used: 2, limit: 40 },
  },
  benefits: [
    'Hasta 40 excedentes mensuales',
    'Panel de operación básico',
    'Trazabilidad simple',
    'Reportes mensuales PDF',
    'Soporte estándar por correo',
  ],
}

export const invoices = [
  { id: 'FAC-2026-005', date: '2026-05-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico – Mayo 2026', method: 'Mastercard ****8810', period: 'May 2026' },
  { id: 'FAC-2026-004', date: '2026-04-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico – Abril 2026', method: 'Mastercard ****8810', period: 'Abr 2026' },
  { id: 'FAC-2026-003', date: '2026-03-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico – Marzo 2026', method: 'Mastercard ****8810', period: 'Mar 2026' },
  { id: 'FAC-2026-002', date: '2026-02-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico – Feb 2026', method: 'Mastercard ****8810', period: 'Feb 2026' },
  { id: 'FAC-2026-001', date: '2026-01-01', amount: '$150 MXN', status: 'Pagada', concept: 'Plan Básico – Ene 2026', method: 'Mastercard ****8810', period: 'Ene 2026' },
]

export const activity = [
  'Bollería variada fue pausada para revisión.',
  'Comedor Comunitario Cazones confirmó recepción de pan dulce.',
  'Se publicó un nuevo excedente disponible.',
  'Factura FAC-2026-005 marcada como pagada.',
]

export const topbarActions = {
  notificationIcon: Bell,
  chartIcon: LineChart,
}
