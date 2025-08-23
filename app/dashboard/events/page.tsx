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
  CheckCircle
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

  // Current event data
  const currentEvent = {
    id: 1,
    name: "World Entrepreneurship Day 4.0",
    date: "October 4, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Zaria, Kaduna State",
    status: "Registered",
    type: "Main Event",
    theme: "Rebuild, Reinvent, Rise",
    description: "Join 400+ entrepreneurs for a transformative experience focused on economic resilience and sustainable growth. This flagship event brings together business leaders, innovators, and entrepreneurs to explore strategies for navigating Nigeria's economic landscape with resilience and innovation.",
    registrationDate: "June 15, 2025",
    ticketId: "WED4-001234",
    highlights: [
      "Keynote speeches from industry leaders",
      "Panel discussions on economic resilience",
      "Networking sessions with entrepreneurs",
      "Innovation showcase and pitch competitions",
      "Exhibition of business solutions",
      "Workshops on business sustainability"
    ]
  }

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

  return (
    <DashboardLayout userType="user">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              My Event
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Your WED 4.0 event details and registration
            </p>
          </div>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/dashboard">
              <ArrowRight className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Current Event Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Event Header */}
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge className="bg-green-600 text-white">
                      {currentEvent.status}
                    </Badge>
                    <Badge variant="outline">{currentEvent.type}</Badge>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {currentEvent.name}
                  </h2>
                  
                  <p className="text-lg font-medium text-red-600 italic mb-4">
                    Theme: {currentEvent.theme}
                  </p>
                  
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {currentEvent.description}
                  </p>
                </div>
                
                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">{currentEvent.date}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Clock className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-900">{currentEvent.time}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{currentEvent.location}</p>
                  </div>
                </div>
                
                {/* Event Highlights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentEvent.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Registration Details */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Registration Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700">
                        <strong>Registration Date:</strong>
                      </p>
                      <p className="text-green-800">{currentEvent.registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">
                        <strong>Ticket ID:</strong>
                      </p>
                      <p className="text-green-800 font-mono">{currentEvent.ticketId}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="lg" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Event Schedule
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Venue Map
                  </Button>
                  {currentEvent.status === "Registered" && (
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 flex-1">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Get QR Code
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
