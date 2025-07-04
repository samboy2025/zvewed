"use client"

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Building, 
  Store, 
  FileText, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Activity,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  Crown,
  Award,
  Medal,
  Handshake,
  Package,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Use the comprehensive dashboard stats
  const dashboardStats = useQuery(api.admin.getDashboardStats)
  const payments = useQuery(api.payments.getAllPayments)
  
  // Loading state
  if (!dashboardStats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  // Extract data from comprehensive stats
  const { users, registrations, events, recentActivity, payments: paymentStats } = dashboardStats
  
  const totalRegistrations = registrations.total
  const pendingRegistrations = registrations.participants // Assuming participants are registrations
  const approvedRegistrations = registrations.total - registrations.participants // Simplified

  const totalSponsors = registrations.sponsors
  const pendingSponsors = Math.floor(registrations.sponsors * 0.3) // Mock pending
  const approvedSponsors = registrations.sponsors - pendingSponsors
  const paidSponsors = Math.floor(approvedSponsors * 0.8) // Mock paid

  const totalVendors = registrations.vendors
  const pendingVendors = Math.floor(registrations.vendors * 0.4) // Mock pending
  const approvedVendors = registrations.vendors - pendingVendors
  const paidVendors = Math.floor(approvedVendors * 0.7) // Mock paid

  const totalUsers = users.total
  const activeUsers = users.active
  const participants = users.participants
  const speakers = users.participants // Using participants as speakers for now

  const quickActions = [
    {
      title: "Manage Participants",
      description: "View and manage participant registrations",
      icon: Users,
      href: "/admin/participants",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      count: totalRegistrations
    },
    {
      title: "Manage Sponsors",
      description: "Review and approve sponsor applications",
      icon: Building,
      href: "/admin/sponsors",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      count: totalSponsors
    },
    {
      title: "Manage Vendors",
      description: "Handle vendor exhibition registrations",
      icon: Store,
      href: "/admin/vendors",
      color: "text-green-600",
      bgColor: "bg-green-50",
      count: totalVendors
    },
    {
      title: "Manage Users",
      description: "User account management and profiles",
      icon: UserCheck,
      href: "/admin/users",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      count: totalUsers
    }
  ]

  const recentStats = [
    {
      title: "Total Registrations",
      value: totalRegistrations,
      change: "+12%",
      changeType: "positive",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Total Sponsors",
      value: totalSponsors,
      change: "+8%",
      changeType: "positive",
      icon: Crown,
      color: "text-purple-600"
    },
    {
      title: "Total Vendors",
      value: totalVendors,
      change: "+15%",
      changeType: "positive",
      icon: Package,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: activeUsers,
      change: "+5%",
      changeType: "positive",
      icon: UserCheck,
      color: "text-orange-600"
    },
    {
      title: "Total Revenue",
      value: `₦${(paymentStats?.totalAmount || 0).toLocaleString()}`,
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the WED 4.0 administration panel</p>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {recentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <Badge variant="secondary">{action.count}</Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Participant Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Participant Registrations
            </CardTitle>
            <CardDescription>Overview of participant registration status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Registrations</span>
                <span className="text-2xl font-bold text-blue-600">{totalRegistrations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Review</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-lg font-semibold text-yellow-600">{pendingRegistrations}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Approved</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{approvedRegistrations}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/admin/participants">
                  <Button className="w-full">View All Participants</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsor Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Sponsor Applications
            </CardTitle>
            <CardDescription>Sponsorship application overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Applications</span>
                <span className="text-2xl font-bold text-purple-600">{totalSponsors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Review</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-lg font-semibold text-yellow-600">{pendingSponsors}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Approved</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{approvedSponsors}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Payment Received</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{paidSponsors}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/admin/sponsors">
                  <Button className="w-full">View All Sponsors</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Vendor Registrations
            </CardTitle>
            <CardDescription>Vendor exhibition applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Applications</span>
                <span className="text-2xl font-bold text-green-600">{totalVendors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Review</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-lg font-semibold text-yellow-600">{pendingVendors}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Approved</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{approvedVendors}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Payment Received</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{paidVendors}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/admin/vendors">
                  <Button className="w-full">View All Vendors</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>User account overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Users</span>
                <span className="text-2xl font-bold text-orange-600">{totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Users</span>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">{activeUsers}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Participants</span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-semibold text-blue-600">{participants}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Speakers</span>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="text-lg font-semibold text-purple-600">{speakers}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/admin/users">
                  <Button className="w-full">View All Users</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest registrations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity?.slice(0, 5).map((activity, index) => {
                const getActivityIcon = () => {
                  if (activity.action === "Payment") return <DollarSign className="h-4 w-4 text-green-600" />
                  if (activity.type === "vendor") return <Store className="h-4 w-4 text-purple-600" />
                  if (activity.type === "sponsor") return <Building className="h-4 w-4 text-orange-600" />
                  return <Users className="h-4 w-4 text-blue-600" />
                }
                
                const getActivityColor = () => {
                  if (activity.action === "Payment") return "bg-green-100"
                  if (activity.type === "vendor") return "bg-purple-100"
                  if (activity.type === "sponsor") return "bg-orange-100"
                  return "bg-blue-100"
                }
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${getActivityColor()} rounded-full flex items-center justify-center`}>
                        {getActivityIcon()}
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {activity.action}
                      </Badge>
                      {activity.action === "Payment" && (
                        <Badge variant={activity.status === "approved" ? "default" : "secondary"}>
                          {activity.status}
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )
              })}
              {(!recentActivity || recentActivity.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No recent activity to display</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 