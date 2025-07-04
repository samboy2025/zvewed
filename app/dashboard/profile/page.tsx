"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
import { UserProfileCard } from "../../components/UserProfileCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [refreshKey])

  const handleProfileUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading) {
    return (
      <DashboardLayout userType="user">
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading profile...</span>
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
              <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
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
              Profile Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* User Profile Card */}
          <UserProfileCard
            userData={currentUser}
            onUpdate={handleProfileUpdate}
          />

          {/* Event Registration Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                Event Registration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">WED 4.0</span>
                    <Badge className="bg-green-600">Registered</Badge>
                  </div>
                  <p className="text-sm text-green-700">Main Event - October 4, 2025</p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">Networking</span>
                    <Badge variant="outline" className="border-blue-300 text-blue-600">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-blue-700">Pre-Event Session - October 3, 2025</p>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Pitch Competition</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Register to participate</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/dashboard/events">Manage Event Registrations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
