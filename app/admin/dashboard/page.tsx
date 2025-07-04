"use client"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  Building,
  Package,
  UserCheck,
  DollarSign,
  Clock,
  Activity,
  AlertCircle
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function AdminDashboard() {
  // Fetch comprehensive dashboard statistics
  const dashboardStats = useQuery(api.admin.getDashboardStats)

  // Loading state
  if (!dashboardStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const monthlyData = dashboardStats.monthlySignups
  
  const userTypeData = [
    { name: 'Participants', value: dashboardStats.users.participants, color: '#6B7280' },
    { name: 'Vendors', value: dashboardStats.users.vendors, color: '#8B5CF6' },
    { name: 'Sponsors', value: dashboardStats.users.sponsors, color: '#3B82F6' },
    { name: 'Admins', value: dashboardStats.users.admins, color: '#10B981' },
  ]

  // Helper function to format time ago
  function formatTimeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome to the WED 4.0 admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.users.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.users.active} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{dashboardStats.payments.approvedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.payments.approved} approved payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.events.active}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.events.upcoming} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.registrations.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.registrations.vendors} vendors, {dashboardStats.registrations.sponsors} sponsors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Registrations Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Monthly Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#EF4444" name="Participants" />
                <Bar dataKey="vendors" fill="#8B5CF6" name="Vendors" />
                <Bar dataKey="sponsors" fill="#3B82F6" name="Sponsors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Payment Status */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.recentActivity.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.action === 'Registered' ? 'bg-green-500' : 
                    activity.action === 'Payment' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action === 'Registered' ? 
                        `Registered as ${activity.type}` : 
                        activity.action === 'Payment' ? 
                        `Payment ${activity.status} - ₦${activity.amount?.toLocaleString()}` : 
                        activity.action
                      }
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTimeAgo(activity.date)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">Approved</span>
                </div>
                <div className="text-sm font-medium">
                  {dashboardStats.payments.approved} (₦{dashboardStats.payments.approvedAmount.toLocaleString()})
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">Pending</span>
                </div>
                <div className="text-sm font-medium">
                  {dashboardStats.payments.pending}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm">Total Revenue</span>
                </div>
                <div className="text-sm font-medium">
                  ₦{dashboardStats.payments.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
