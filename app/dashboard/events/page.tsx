"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  ArrowRight,
  Loader2,
  Clock,
  MapPin,
  Plus
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MyEventsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  // Mock events data for the current user
  const userEvents = [
    {
      id: 1,
      name: "World Entrepreneurship Day 4.0",
      date: "October 4, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Zaria, Kaduna State",
      status: "Registered",
      type: "Main Event",
      theme: "Rebuild, Reinvent, Rise",
      description: "Join 400+ entrepreneurs for a transformative experience focused on economic resilience and sustainable growth.",
      registrationDate: "June 15, 2025",
      ticketId: "WED4-001234"
    },
    {
      id: 2,
      name: "Pre-Event Networking Session",
      date: "October 3, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual Event",
      status: "Upcoming",
      type: "Networking",
      description: "Connect with fellow entrepreneurs before the main event.",
      registrationDate: "July 1, 2025",
      ticketId: "NET-005678"
    },
    {
      id: 3,
      name: "Innovation Pitch Competition",
      date: "October 4, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Main Auditorium",
      status: "Registration Open",
      type: "Competition",
      description: "Showcase your innovative ideas to a panel of expert judges and investors.",
      registrationDate: null,
      ticketId: null
    }
  ]

  if (isLoading) {
    return (
      <DashboardLayout userType="user">
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading events...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!currentUser) {
    return (
      <DashboardLayout userType="user">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">Please log in to view your events.</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const registeredEvents = userEvents.filter(event => 
    event.status === "Registered" || event.status === "Upcoming"
  )
  
  const availableEvents = userEvents.filter(event => 
    event.status === "Registration Open"
  )

  return (
    <DashboardLayout userType="user">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              My Events
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your event registrations and participation
            </p>
          </div>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/register">
              <Plus className="h-4 w-4 mr-2" />
              Register for Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-6xl mx-auto">
        {/* Registered Events */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Registered Events ({registeredEvents.length})
          </h2>
          
          {registeredEvents.length > 0 ? (
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                      {/* Event Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                              {event.name}
                            </h3>
                            <div className="flex gap-2">
                              <Badge 
                                variant={event.status === "Registered" ? "default" : "secondary"}
                                className={event.status === "Registered" ? "bg-green-600" : ""}
                              >
                                {event.status}
                              </Badge>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                          </div>
                          
                          {event.theme && (
                            <p className="text-sm font-medium text-red-600 italic mb-2">
                              Theme: {event.theme}
                            </p>
                          )}
                          
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          
                          {/* Event Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          {/* Registration Details */}
                          {event.registrationDate && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-800">
                                <strong>Registered:</strong> {event.registrationDate}
                              </p>
                              {event.ticketId && (
                                <p className="text-sm text-green-800">
                                  <strong>Ticket ID:</strong> {event.ticketId}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Ticket
                        </Button>
                        {event.status === "Registered" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Get QR Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No registered events</h3>
                <p className="text-gray-600 mb-4">
                  You haven't registered for any events yet.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/register">Register for WED 4.0</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Events */}
        {availableEvents.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Events ({availableEvents.length})
            </h2>
            
            <div className="space-y-4">
              {availableEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow border-dashed">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                              {event.name}
                            </h3>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="border-red-300 text-red-600">
                                {event.status}
                              </Badge>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  )
}
