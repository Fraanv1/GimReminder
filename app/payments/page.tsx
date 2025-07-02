"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, DollarSign, Calendar, Filter } from "lucide-react"
import Link from "next/link"

// Mock payment data
const initialPayments = [
  { id: 1, memberName: "John Doe", amount: 75, date: "2024-01-15", status: "completed", method: "cash" },
  { id: 2, memberName: "Mike Johnson", amount: 75, date: "2024-01-10", status: "completed", method: "card" },
  { id: 3, memberName: "Chris Brown", amount: 75, date: "2024-01-12", status: "completed", method: "transfer" },
  { id: 4, memberName: "Sarah Wilson", amount: 75, date: "2023-12-15", status: "pending", method: "cash" },
  { id: 5, memberName: "Emma Davis", amount: 75, date: "2023-12-20", status: "pending", method: "card" },
]

const members = ["John Doe", "Sarah Wilson", "Mike Johnson", "Emma Davis", "Chris Brown", "Alex Rodriguez", "Lisa Chen"]

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    memberName: "",
    amount: 75,
    method: "cash",
    date: new Date().toISOString().split("T")[0],
  })

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddPayment = () => {
    const payment = {
      id: payments.length + 1,
      ...newPayment,
      status: "completed" as const,
    }
    setPayments([payment, ...payments])
    setNewPayment({
      memberName: "",
      amount: 75,
      method: "cash",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)
  }

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
              <p className="text-gray-600 mt-2">Track all gym membership payments</p>
            </div>
            <Link href="/">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">From completed payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${pendingAmount}</div>
              <p className="text-xs text-muted-foreground">Outstanding payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.filter((p) => p.date.startsWith("2024-01")).length}</div>
              <p className="text-xs text-muted-foreground">Payments received</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>Add a new payment record</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="member">Member</Label>
                  <Select
                    value={newPayment.memberName}
                    onValueChange={(value) => setNewPayment({ ...newPayment, memberName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="method">Payment Method</Label>
                  <Select
                    value={newPayment.method}
                    onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newPayment.date}
                    onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddPayment} className="w-full">
                  Record Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>All payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.memberName}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)} • {payment.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-lg">${payment.amount}</p>
                    </div>
                    <Badge variant={payment.status === "completed" ? "default" : "destructive"}>{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payments found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
