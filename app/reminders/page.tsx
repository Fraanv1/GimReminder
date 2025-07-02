"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Send, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data for members with pending payments
const pendingMembers = [
  { id: 1, name: "Sarah Wilson", phone: "+1234567891", daysOverdue: 15, amount: 75 },
  { id: 2, name: "Emma Davis", phone: "+1234567893", daysOverdue: 10, amount: 75 },
  { id: 3, name: "Alex Rodriguez", phone: "+1234567895", daysOverdue: 5, amount: 75 },
  { id: 4, name: "Lisa Chen", phone: "+1234567896", daysOverdue: 20, amount: 75 },
]

const reminderTemplates = [
  {
    id: 1,
    name: "Friendly Reminder",
    message:
      "Hi {name}! This is a friendly reminder that your gym membership payment of ${amount} is due. Please make your payment to continue enjoying our services. Thank you!",
  },
  {
    id: 2,
    name: "Urgent Notice",
    message:
      "Hi {name}, your gym membership payment of ${amount} is now {days} days overdue. Please settle your payment immediately to avoid suspension of services.",
  },
  {
    id: 3,
    name: "Final Notice",
    message:
      "FINAL NOTICE: Hi {name}, your gym membership payment of ${amount} is seriously overdue ({days} days). Please pay immediately or your membership will be suspended.",
  },
]

export default function RemindersPage() {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [customMessage, setCustomMessage] = useState(reminderTemplates[0].message)
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [sentReminders, setSentReminders] = useState<number[]>([])

  const handleMemberSelect = (memberId: number, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId])
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(pendingMembers.map((m) => m.id))
    } else {
      setSelectedMembers([])
    }
  }

  const sendReminders = () => {
    selectedMembers.forEach((memberId) => {
      const member = pendingMembers.find((m) => m.id === memberId)
      if (member) {
        const personalizedMessage = customMessage
          .replace("{name}", member.name)
          .replace("{amount}", member.amount.toString())
          .replace("{days}", member.daysOverdue.toString())

        // In production, integrate with WhatsApp Business API
        const whatsappUrl = `https://wa.me/${member.phone.replace("+", "")}?text=${encodeURIComponent(personalizedMessage)}`
        window.open(whatsappUrl, "_blank")
      }
    })

    setSentReminders([...sentReminders, ...selectedMembers])
    setSelectedMembers([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Reminders</h1>
              <p className="text-gray-600 mt-2">Send WhatsApp reminders to members with pending payments</p>
            </div>
            <Link href="/">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Members with Pending Payments
              </CardTitle>
              <CardDescription>Select members to send payment reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedMembers.length === pendingMembers.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="font-medium">
                    Select All ({pendingMembers.length} members)
                  </Label>
                </div>

                {pendingMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={(checked) => handleMemberSelect(member.id, checked as boolean)}
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={member.daysOverdue > 15 ? "destructive" : "secondary"}>
                        {member.daysOverdue} days overdue
                      </Badge>
                      <p className="text-sm font-medium mt-1">${member.amount}</p>
                      {sentReminders.includes(member.id) && (
                        <div className="flex items-center text-green-600 text-xs mt-1">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Sent
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Composer */}
          <Card>
            <CardHeader>
              <CardTitle>Compose Reminder Message</CardTitle>
              <CardDescription>Customize your reminder message or use a template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Message Templates</Label>
                <div className="grid gap-2 mt-2">
                  {reminderTemplates.map((template, index) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(index)
                        setCustomMessage(template.message)
                      }}
                      className="justify-start"
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="message">Custom Message</Label>
                <Textarea
                  id="message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your reminder message..."
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use {"{name}"}, {"{amount}"}, and {"{days}"} as placeholders
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Ready to Send</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMembers.length} member{selectedMembers.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    WhatsApp
                  </Badge>
                </div>

                <Button
                  onClick={sendReminders}
                  disabled={selectedMembers.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send WhatsApp Reminders ({selectedMembers.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
