"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
import { DashboardHeader } from "../../components/DashboardHeader"
import { DataTable } from "../../components/DataTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Search,
  Filter,
  Calendar,
  MapPin,
  Building
} from "lucide-react"

export default function NetworkingPage() {
  // Mock networking data
  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Tech Entrepreneur",
      company: "StartupX",
      location: "Lagos, Nigeria",
      connectionDate: "2024-12-10",
      lastContact: "2 days ago",
      status: "Connected",
      mutualConnections: 5,
      events: ["WED 4.0", "WED 3.0"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Investor",
      company: "Growth Ventures",
      location: "Abuja, Nigeria",
      connectionDate: "2024-12-05",
      lastContact: "1 week ago",
      status: "Connected",
      mutualConnections: 8,
      events: ["WED 4.0"]
    },
    {
      id: 3,
      name: "Aisha Ibrahim",
      title: "E-commerce Expert",
      company: "Digital Markets",
      location: "Kaduna, Nigeria",
      connectionDate: "2024-11-28",
      lastContact: "3 days ago",
      status: "Connected",
      mutualConnections: 3,
      events: ["WED 3.0", "WED 2.0"]
    },
    {
      id: 4,
      name: "David Okafor",
      title: "Marketing Director",
      company: "Brand Solutions",
      location: "Port Harcourt, Nigeria",
      connectionDate: "2024-11-20",
      lastContact: "1 month ago",
      status: "Pending",
      mutualConnections: 2,
      events: ["WED 4.0"]
    }
  ]

  const connectionColumns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {value.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.title}</p>
          </div>
        </div>
      )
    },
    {
      key: "company",
      label: "Company",
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {row.location}
          </p>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge variant={value === "Connected" ? "default" : "secondary"}>
          {value}
        </Badge>
      )
    },
    {
      key: "mutualConnections",
      label: "Mutual",
      render: (value: number) => (
        <span className="text-sm text-gray-600">{value} mutual</span>
      )
    },
    {
      key: "lastContact",
      label: "Last Contact",
      sortable: true,
    }
  ]

  const upcomingEvents = [
    {
      name: "WED 4.0 Networking Session",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      attendees: 150
    },
    {
      name: "Startup Pitch Night",
      date: "Dec 20, 2024",
      time: "6:00 PM",
      attendees: 80
    }
  ]

  return (
    <DashboardLayout userType="user">
      <DashboardHeader
        title="Networking"
        subtitle="Connect with entrepreneurs, investors, and industry experts"
        showSearch={true}
        notifications={3}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Find Connections
            </Button>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Connections</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <UserPlus className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Events Attended</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connections Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="My Connections"
            data={connections}
            columns={connectionColumns}
            actions={[
              {
                label: "Send Message",
                onClick: (row) => console.log("Message:", row.name),
              },
              {
                label: "View Profile",
                onClick: (row) => console.log("View profile:", row.name),
              },
              {
                label: "Schedule Meeting",
                onClick: (row) => console.log("Schedule meeting with:", row.name),
              }
            ]}
          />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Networking Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.date} at {event.time}</p>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {event.attendees} expected attendees
                  </p>
                  <Button size="sm" className="w-full mt-3">
                    RSVP
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="h-4 w-4 mr-2" />
                Import LinkedIn Contacts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Bulk Messages
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Find by Company
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Group Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Connection Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Alex Thompson", "Fatima Hassan", "Robert Williams"].map((name, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-gray-500">2 mutual connections</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 