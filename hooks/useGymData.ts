"use client"
import { useLocalStorage } from "./useLocalStorage"
import type { Member, Payment, Reminder, GymStats } from "@/lib/types"

// Datos iniciales de ejemplo
const initialMembers: Member[] = [
  {
    id: 1,
    name: "Juan Pérez",
    phone: "+1234567890",
    email: "juan@email.com",
    status: "active",
    lastPayment: "2024-01-15",
    amount: 75,
    joinDate: "2023-06-01",
  },
  {
    id: 2,
    name: "María García",
    phone: "+1234567891",
    email: "maria@email.com",
    status: "pending",
    /* lastPayment se omitirá para demostrar opcionalidad */
    amount: 75,
    joinDate: "2023-05-15",
  },
  {
    id: 3,
    name: "Carlos López",
    phone: "+1234567892",
    email: "carlos@email.com",
    status: "active",
    lastPayment: "2024-01-10",
    amount: 75,
    joinDate: "2023-08-20",
  },
]

const initialPayments: Payment[] = [
  {
    id: 1,
    memberId: 1,
    memberName: "Juan Pérez",
    amount: 75,
    date: "2024-01-15",
    status: "completed",
    method: "cash",
  },
  {
    id: 2,
    memberId: 3,
    memberName: "Carlos López",
    amount: 75,
    date: "2024-01-10",
    status: "completed",
    method: "card",
  },
]

export function useGymData() {
  const [members, setMembers] = useLocalStorage<Member[]>("gym-members", initialMembers)
  const [payments, setPayments] = useLocalStorage<Payment[]>("gym-payments", initialPayments)
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("gym-reminders", [])

  // Calcular estadísticas
  const stats: GymStats = {
    totalMembers: members.length,
    activeMembers: members.filter((m) => m.status === "active").length,
    pendingPayments: members.filter((m) => m.status === "pending").length,
    monthlyRevenue: payments
      .filter((p) => p.status === "completed" && p.date.startsWith("2024-01"))
      .reduce((sum, p) => sum + p.amount, 0),
    newMembersThisMonth: members.filter((m) => m.joinDate && m.joinDate.startsWith("2024-01")).length,
    churnRate: 0, // Calcular según tus necesidades
  }

  // Funciones para manejar miembros
  const addMember = (memberData: Omit<Member, "id">) => {
    const newMember: Member = {
      ...memberData,
      id: Math.max(...members.map((m) => m.id), 0) + 1,
    }
    setMembers([...members, newMember])
    return newMember
  }

  const updateMember = (id: number, updates: Partial<Member>) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }

  const deleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
    // También eliminar pagos relacionados
    setPayments(payments.filter((p) => p.memberId !== id))
  }

  // Funciones para manejar pagos
  const addPayment = (paymentData: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Math.max(...payments.map((p) => p.id), 0) + 1,
    }
    setPayments([newPayment, ...payments])

    // Actualizar estado del miembro si el pago está completado
    if (newPayment.status === "completed") {
      updateMember(newPayment.memberId, {
        status: "active",
        lastPayment: newPayment.date,
      })
    }

    return newPayment
  }

  const updatePayment = (id: number, updates: Partial<Payment>) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  // Funciones para manejar recordatorios
  const addReminder = (reminderData: Omit<Reminder, "id">) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Math.max(...reminders.map((r) => r.id), 0) + 1,
    }
    setReminders([newReminder, ...reminders])
    return newReminder
  }

  return {
    // Datos
    members,
    payments,
    reminders,
    stats,

    // Funciones para miembros
    addMember,
    updateMember,
    deleteMember,

    // Funciones para pagos
    addPayment,
    updatePayment,

    // Funciones para recordatorios
    addReminder,

    // Funciones de utilidad
    setMembers,
    setPayments,
    setReminders,
  }
}
