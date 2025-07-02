// Constantes para la aplicación del gimnasio

export const PAYMENT_METHODS = [
  { value: "cash", label: "Efectivo" },
  { value: "card", label: "Tarjeta" },
  { value: "transfer", label: "Transferencia" },
  { value: "online", label: "Pago Online" },
] as const

export const MEMBER_STATUSES = [
  { value: "active", label: "Activo", color: "green" },
  { value: "pending", label: "Pendiente", color: "yellow" },
  { value: "suspended", label: "Suspendido", color: "red" },
] as const

export const PAYMENT_STATUSES = [
  { value: "completed", label: "Completado", color: "green" },
  { value: "pending", label: "Pendiente", color: "yellow" },
  { value: "failed", label: "Fallido", color: "red" },
] as const

export const REMINDER_TYPES = [
  { value: "payment", label: "Pago" },
  { value: "general", label: "General" },
  { value: "renewal", label: "Renovación" },
] as const

// Configuración por defecto
export const DEFAULT_SETTINGS = {
  monthlyFee: 75,
  paymentToleranceDays: 30,
  reminderFrequencyDays: 7,
  currency: "USD",
  timezone: "America/New_York",
} as const

// Plantillas de mensajes predeterminadas
export const DEFAULT_REMINDER_TEMPLATES = [
  {
    id: 1,
    name: "Recordatorio Amigable",
    type: "payment" as const,
    message:
      "Hola {name}! Te recordamos que tu pago mensual del gimnasio de ${amount} está pendiente. Por favor realiza tu pago para continuar disfrutando de nuestros servicios. ¡Gracias!",
    isDefault: true,
  },
  {
    id: 2,
    name: "Aviso Urgente",
    type: "payment" as const,
    message:
      "Hola {name}, tu pago del gimnasio de ${amount} tiene {days} días de retraso. Por favor realiza el pago inmediatamente para evitar la suspensión de servicios.",
    isDefault: false,
  },
  {
    id: 3,
    name: "Aviso Final",
    type: "payment" as const,
    message:
      "AVISO FINAL: Hola {name}, tu pago de ${amount} está seriamente atrasado ({days} días). Paga inmediatamente o tu membresía será suspendida.",
    isDefault: false,
  },
] as const

// Configuración de WhatsApp
export const WHATSAPP_CONFIG = {
  businessApiUrl: "https://graph.facebook.com/v18.0",
  webUrl: "https://wa.me",
  maxMessageLength: 4096,
  supportedFileTypes: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
} as const

// Límites y validaciones
export const VALIDATION_RULES = {
  memberName: {
    minLength: 2,
    maxLength: 100,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
  },
  email: {
    maxLength: 255,
  },
  amount: {
    min: 1,
    max: 10000,
  },
  message: {
    maxLength: 1000,
  },
} as const

// Configuración de paginación
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
} as const
