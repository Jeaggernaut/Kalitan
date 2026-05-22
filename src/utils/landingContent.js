export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Planes', href: '#planes' },
]

export const quickStats = [
  { value: '150 MXN', label: 'suscripción mensual para negocios' },
  { value: '0 costo', label: 'para voluntarios, asociaciones y beneficiarios' },
  { value: '100%', label: 'trazabilidad de donaciones' },
]

export const howItWorks = [
  {
    step: '01',
    title: 'El negocio publica excedentes',
    text: 'Registra alimentos disponibles, horarios, cantidad y condiciones de recolección desde un panel simple.',
  },
  {
    step: '02',
    title: 'La red coordina el rescate',
    text: 'Voluntarios y asociaciones reciben oportunidades cercanas para recolectar y distribuir con seguimiento.',
  },
  {
    step: '03',
    title: 'Kalitán reporta el impacto',
    text: 'Cada donación queda trazada con métricas, historial y reportes útiles para responsabilidad social.',
  },
]

export const benefits = [
  'Publicación rápida de excedentes y disponibilidad.',
  'Panel administrativo para gestionar donaciones.',
  'Conexión con voluntarios, asociaciones y beneficiarios.',
  'Modelo económico accesible para negocios locales.',
]

export const impactCards = [
  {
    value: 'Menos desperdicio',
    label: 'Alimentos aprovechables salen del ciclo de descarte y llegan a comunidades.',
  },
  {
    value: 'Más comunidad',
    label: 'Negocios, voluntarios y asociaciones trabajan desde una misma operación.',
  },
  {
    value: 'Mejor evidencia',
    label: 'Reportes claros para medir donaciones, frecuencia, beneficiarios y recorridos.',
  },
]

export const metrics = [
  { value: '+1,400', label: 'negocios de alimentos potenciales en la región' },
  { value: '15-25%', label: 'desperdicio diario estimado en operación alimentaria' },
  { value: '$150', label: 'MXN al mes para negocios afiliados' },
  { value: '4 roles', label: 'negocio, voluntario, asociación y beneficiario' },
]

export const plans = [
  {
    name: 'Negocio Afiliado',
    price: '$150 MXN',
    period: '/ mes',
    featured: true,
    description: 'Para comercios que quieren reducir desperdicio y medir impacto social.',
    features: [
      'Gestión de excedentes',
      'Trazabilidad de donaciones',
      'Panel administrativo',
      'Reportes de impacto',
      'Seguimiento de entregas',
    ],
  },
  {
    name: 'Voluntarios',
    price: 'Gratis',
    period: '',
    description: 'Para personas que apoyan rescates y entregas comunitarias.',
    features: ['Alertas de oportunidades', 'Historial de participación', 'Coordinación de rutas'],
  },
  {
    name: 'Asociaciones',
    price: 'Gratis',
    period: '',
    description: 'Para organizaciones que reciben, coordinan y distribuyen alimentos.',
    features: ['Recepción organizada', 'Registro de entregas', 'Gestión de beneficiarios'],
  },
  {
    name: 'Beneficiarios',
    price: 'Gratis',
    period: '',
    description: 'Para comunidades y personas que reciben apoyo alimentario.',
    features: ['Acceso sin costo', 'Entrega coordinada', 'Comunicación transparente'],
  },
]
