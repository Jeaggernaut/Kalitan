import {
  BarChart3,
  Bell,
  Box,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Leaf,
  LineChart,
  PackageCheck,
  ReceiptText,
  Settings,
  Store,
  Truck,
  Users,
} from 'lucide-react'

export const businessProfile = {
  name: 'Panadería Buen Sabor',
  type: 'Negocio',
  initials: 'PB',
}

export const businessNavigation = [
  { label: 'Inicio', icon: Home, active: true },
  { label: 'Excedentes', icon: PackageCheck },
  { label: 'Donaciones realizadas', icon: Box },
  { label: 'Solicitudes', icon: ClipboardList },
  { label: 'Trazabilidad', icon: Truck },
  { label: 'Reportes', icon: FileText },
  { label: 'Métricas', icon: BarChart3 },
  { label: 'Suscripción', icon: CreditCard },
  { label: 'Facturación', icon: ReceiptText },
  { label: 'Perfil del negocio', icon: Store },
  { label: 'Configuración', icon: Settings },
]

export const businessMetrics = [
  {
    label: 'Excedentes publicados',
    value: '24',
    suffix: 'este mes',
    delta: '+20%',
    icon: Leaf,
  },
  {
    label: 'Rescates completados',
    value: '18',
    suffix: 'este mes',
    delta: '+12%',
    icon: PackageCheck,
  },
  {
    label: 'Personas beneficiadas',
    value: '1,248',
    suffix: 'este mes',
    delta: '+18%',
    icon: Users,
  },
  {
    label: 'CO₂ evitado',
    value: '320 kg',
    suffix: 'este mes',
    delta: '+15%',
    icon: Leaf,
  },
]

export const impactData = [
  { month: 'Dic', people: 370 },
  { month: 'Ene', people: 570 },
  { month: 'Feb', people: 620 },
  { month: 'Mar', people: 780 },
  { month: 'Abr', people: 900 },
  { month: 'May', people: 1248 },
]

export const recentSurplus = [
  {
    name: 'Pan artesanal del día',
    amount: '15 kg de pan',
    status: 'Rescatado',
    date: '22/05/2026',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=180&q=80',
  },
  {
    name: 'Conchas y cuernitos',
    amount: '8 kg de pan dulce',
    status: 'Rescatado',
    date: '21/05/2026',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=180&q=80',
  },
  {
    name: 'Pasteles individuales',
    amount: '12 unidades',
    status: 'En proceso',
    date: '20/05/2026',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=180&q=80',
  },
  {
    name: 'Bollería variada',
    amount: '10 kg de pan',
    status: 'Publicado',
    date: '22/05/2026',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=180&q=80',
  },
]

export const subscription = {
  plan: 'Plan Básico',
  price: '$150',
  period: 'MXN / mes',
  status: 'Activo',
  nextPayment: '22/06/2026',
}

export const traceabilitySteps = [
  {
    title: 'Excedente publicado',
    description: 'Pan artesanal del día',
    time: '22/05/2026 - 08:30 am',
    icon: Store,
  },
  {
    title: 'Rescatado por voluntario',
    description: 'Juan Pérez',
    time: '22/05/2026 - 09:15 am',
    icon: PackageCheck,
  },
  {
    title: 'En ruta de entrega',
    description: 'En camino a asociación',
    time: '22/05/2026 - 09:45 am',
    icon: Truck,
  },
  {
    title: 'Entregado',
    description: 'Asociación Manos Unidas',
    time: '22/05/2026 - 10:20 am',
    icon: Users,
  },
]

export const topbarActions = {
  notificationIcon: Bell,
  chartIcon: LineChart,
}
