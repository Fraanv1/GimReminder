"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Phone, Mail, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Member } from "@/lib/types"

// Mock data - replace with database
const initialMembers: Member[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1234567890",
    email: "john@email.com",
    status: "active",
    lastPayment: "2024-01-15",
    amount: 75,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    phone: "+1234567891",
    email: "sarah@email.com",
    status: "pending",
    lastPayment: "2023-12-15",
    amount: 75,
  },
  {
    id: 3,
    name: "Mike Johnson",
    phone: "+1234567892",
    email: "mike@email.com",
    status: "active",
    lastPayment: "2024-01-10",
    amount: 75,
  },
  {
    id: 4,
    name: "Emma Davis",
    phone: "+1234567893",
    email: "emma@email.com",
    status: "pending",
    lastPayment: "2023-12-20",
    amount: 75,
  },
  {
    id: 5,
    name: "Chris Brown",
    phone: "+1234567894",
    email: "chris@email.com",
    status: "active",
    lastPayment: "2024-01-12",
    amount: 75,
  },
]

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", phone: "", email: "", amount: 75 })

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMember = () => {
    const member: Member = {
      id: members.length + 1,
      ...newMember,
      status: "active",
      lastPayment: new Date().toISOString().split("T")[0],
    }
    setMembers([...members, member])
    setNewMember({ name: "", phone: "", email: "", amount: 75 })
    setIsAddDialogOpen(false)
  }

  const sendWhatsAppReminder = (member: (typeof members)[0]) => {
    // WhatsApp API integration would go here
    const message = `Hi ${member.name}! This is a friendly reminder that your gym membership payment of $${member.amount} is due. Please make your payment to continue enjoying our services. Thank you!`
    const whatsappUrl = `https://wa.me/${member.phone.replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Members Management</h1>
              <p className="text-gray-600 mt-2">Manage your gym members and their payments</p>
            </div>
            <Link href="/">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>Add a new member to your gym</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="member@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Monthly Fee</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newMember.amount}
                    onChange={(e) => setNewMember({ ...newMember, amount: Number(e.target.value) })}
                    placeholder="75"
                  />
                </div>
                <Button onClick={handleAddMember} className="w-full">
                  Add Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {member.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">${member.amount}/month</p>
                      <p className="text-xs text-muted-foreground">Last payment: {member.lastPayment}</p>
                    </div>

                    <Badge variant={member.status === "active" ? "default" : "destructive"}>
                      {member.status === "active" ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" /> Active
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="mr-1 h-3 w-3" /> Pending
                        </>
                      )}
                    </Badge>

                    {member.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => sendWhatsAppReminder(member)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="mr-1 h-3 w-3" />
                        WhatsApp Reminder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No members found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
