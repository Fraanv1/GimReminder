import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, AlertTriangle, MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in production, this would come from your database
const stats = {
  totalMembers: 45,
  activeMembers: 38,
  pendingPayments: 7,
  monthlyRevenue: 2850,
}

const recentActivity = [
  { id: 1, member: "John Doe", action: "Payment received", amount: 75, time: "2 hours ago" },
  { id: 2, member: "Sarah Wilson", action: "Reminder sent", time: "4 hours ago" },
  { id: 3, member: "Mike Johnson", action: "New member registered", amount: 75, time: "1 day ago" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gym Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your gym members and payments efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMembers}</div>
              <p className="text-xs text-muted-foreground">Paid this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">Need reminders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your gym operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/members">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Members
                </Button>
              </Link>
              <Link href="/reminders">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
              </Link>
              <Link href="/payments">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payment History
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your gym</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{activity.member}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      {activity.amount && <p className="text-sm font-medium text-green-600">${activity.amount}</p>}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
