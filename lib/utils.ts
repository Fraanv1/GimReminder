import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilidades para formatear fechas
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateLong(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Utilidades para formatear dinero
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Utilidades para teléfonos
export function formatPhone(phone: string): string {
  // Remover caracteres no numéricos excepto +
  const cleaned = phone.replace(/[^\d+]/g, "")

  // Si no empieza con +, agregar +1 (US)
  if (!cleaned.startsWith("+")) {
    return `+1${cleaned}`
  }

  return cleaned
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+\d{10,15}$/
  return phoneRegex.test(formatPhone(phone))
}

// Utilidades para email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utilidades para calcular días
export function daysSince(date: string | Date): number {
  const d = new Date(date)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - d.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function isOverdue(lastPayment?: string, daysTolerance = 30): boolean {
  if (!lastPayment) return false
  return daysSince(lastPayment) > daysTolerance
}

// Utilidades para WhatsApp
export function createWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = formatPhone(phone).replace("+", "")
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

// Utilidades para generar mensajes de recordatorio
export function generateReminderMessage(
  memberName: string,
  amount: number,
  daysOverdue: number,
  template = "default",
): string {
  const templates = {
    default: `Hola ${memberName}! Te recordamos que tu pago mensual del gimnasio de $${amount} está pendiente. Por favor realiza tu pago para continuar disfrutando de nuestros servicios. ¡Gracias!`,
    urgent: `Hola ${memberName}, tu pago del gimnasio de $${amount} tiene ${daysOverdue} días de retraso. Por favor realiza el pago inmediatamente para evitar la suspensión de servicios.`,
    final: `AVISO FINAL: Hola ${memberName}, tu pago de $${amount} está seriamente atrasado (${daysOverdue} días). Paga inmediatamente o tu membresía será suspendida.`,
  }

  return templates[template as keyof typeof templates] || templates.default
}

// Utilidades para estadísticas
export function calculateGrowthPercentage(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

export function getMonthName(monthIndex: number): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  return months[monthIndex] || "Mes inválido"
}

// Utilidades para validación de formularios
export function validateMemberForm(data: {
  name: string
  phone: string
  email: string
  amount: number
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push("El nombre es requerido")
  }

  if (!isValidPhone(data.phone)) {
    errors.push("El teléfono debe tener un formato válido")
  }

  if (!isValidEmail(data.email)) {
    errors.push("El email debe tener un formato válido")
  }

  if (data.amount <= 0) {
    errors.push("El monto debe ser mayor a 0")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
