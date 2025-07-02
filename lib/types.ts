// Tipos principales para la aplicación del gimnasio

export interface Member {
  id: number
  name: string
  phone: string
  email: string
  status: "active" | "pending" | "suspended"
  lastPayment: string
  amount: number
  joinDate?: string
  notes?: string
}

export interface Payment {
  id: number
  memberId: number
  memberName: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  method: "cash" | "card" | "transfer" | "online"
  notes?: string
}

export interface Reminder {
  id: number
  memberId: number
  memberName: string
  message: string
  sentDate: string
  status: "sent" | "delivered" | "read" | "failed"
  type: "payment" | "general" | "renewal"
}

export interface GymStats {
  totalMembers: number
  activeMembers: number
  pendingPayments: number
  monthlyRevenue: number
  newMembersThisMonth: number
  churnRate: number
}

export interface ReminderTemplate {
  id: number
  name: string
  message: string
  type: "payment" | "general" | "renewal"
  isDefault: boolean
}

// Tipos para formularios
export interface NewMemberForm {
  name: string
  phone: string
  email: string
  amount: number
  joinDate?: string
  notes?: string
}

export interface NewPaymentForm {
  memberName: string
  amount: number
  method: Payment["method"]
  date: string
  notes?: string
}

// Tipos para filtros
export interface MemberFilters {
  status?: Member["status"]
  search?: string
  dateRange?: {
    from: string
    to: string
  }
}

export interface PaymentFilters {
  status?: Payment["status"]
  method?: Payment["method"]
  search?: string
  dateRange?: {
    from: string
    to: string
  }
}
