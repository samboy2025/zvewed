"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
import { DashboardHeader } from "../../components/DashboardHeader"
import { DataTable } from "../../components/DataTable"
import { StatsCard } from "../../components/StatsCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { 
  Users, 
  UserCheck, 
  UserX, 
  Mail,
  Phone,
  Download,
  Filter,
  Plus,
  Search,
  MapPin,
  Building
} from "lucide-react"

export default function ParticipantsPage() {
  // Fetch data from Convex
  const registrations = useQuery(api.registrations.getAllRegistrations)
  const stats = useQuery(api.registrations.getRegistrationStats)

  // Loading state
  if (registrations === undefined || stats === undefined) {
    return (
      <DashboardLayout userType="admin">
        <DashboardHeader
          title="Participants Management"
          subtitle="Loading participant data..."
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading participants...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const participantColumns = [
    {
      key: "name",
      label: "Participant",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium text-gray-900">{`${row.firstName} ${row.lastName}`}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      key: "organization",
      label: "Organization",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value || "Not specified"}</p>
          <p className="text-sm text-gray-500">{row.position || "N/A"}</p>
        </div>
      )
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => (
        <Badge variant="outline">
          {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Badge>
      )
    },
    {
      key: "location",
      label: "Location",
      render: (value: string, row: any) => (
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {`${row.city}, ${row.state}`}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge 
          variant={
            value === "confirmed" ? "default" : 
            value === "pending" ? "secondary" : 
            "outline"
          }
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (value: string) => (
        <Badge 
          variant={
            value === "paid" ? "default" : 
            value === "pending" ? "secondary" : 
            "destructive"
          }
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: "createdAt",
      label: "Registered",
      sortable: true,
      render: (value: number) => {
        const date = new Date(value)
        return date.toLocaleDateString()
      }
    }
  ]

  return (
    <DashboardLayout userType="admin">
      <DashboardHeader
        title="Participants Management"
        subtitle="Manage event registrations, approvals, and communications"
        showSearch={true}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Bulk Email
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Participant
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Registered"
          value={stats.total.toString()}
          description="All participants"
          icon={Users}
          trend={{ value: 23, label: "from last week", type: "up" }}
        />
        <StatsCard
          title="Confirmed"
          value={stats.confirmed.toString()}
          description="Approved participants"
          icon={UserCheck}
          trend={{ value: 15, label: "this week", type: "up" }}
        />
        <StatsCard
          title="Pending Review"
          value={stats.pending.toString()}
          description="Awaiting approval"
          icon={UserX}
          trend={{ value: 8, label: "from yesterday", type: "down" }}
        />
        <StatsCard
          title="Payments Received"
          value={stats.paid.toString()}
          description="Participants paid"
          icon={Building}
          trend={{ value: 12, label: "this month", type: "up" }}
        />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="wed-4">WED 4.0</SelectItem>
                  <SelectItem value="wed-3">WED 3.0</SelectItem>
                  <SelectItem value="networking">Networking Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="aspiring-entrepreneur">Aspiring Entrepreneur</SelectItem>
                  <SelectItem value="established-business">Established Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants Table */}
      <DataTable
        title={`All Participants (${registrations.length})`}
        data={registrations}
        columns={participantColumns}
        actions={[
          {
            label: "View Details",
            onClick: (row) => console.log("View participant:", row),
          },
          {
            label: "Send Email",
            onClick: (row) => console.log("Email participant:", row.email),
          },
          {
            label: "Approve",
            onClick: (row) => console.log("Approve:", row),
          },
          {
            label: "Edit",
            onClick: (row) => console.log("Edit participant:", row),
          },
          {
            label: "Remove",
            onClick: (row) => console.log("Remove participant:", row),
          }
        ]}
      />
    </DashboardLayout>
  )
} 