"use client"

import { DashboardLayout } from "../components/DashboardLayout"
import { QRCodeCard } from "../components/QRCodeCard"
import { UserProfileCard } from "../components/UserProfileCard"
import { PaymentVerificationCard } from "../components/PaymentVerificationCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  ArrowRight,
  Loader2,
  User,
  Clock,
  MapPin,
  Lock,
  CreditCard
} from "lucide-react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useEffect, useState } from "react"

export default function UserDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const initializeUserPayment = useMutation(api.users.initializeUserPayment)

  // Get user data from localStorage (from login)
  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)

      // Initialize payment if not already set
      if (user._id && !user.paymentStatus && (user.userType === "participant" || user.userType === "vendor")) {
        initializeUserPayment({ userId: user._id })
          .then(() => {
            // Refresh user data
            setRefreshKey(prev => prev + 1)
          })
          .catch(console.error)
      }
    }
    setIsLoading(false)
  }, [refreshKey, initializeUserPayment])

  // Mock events data for the current user
  const recentEvents = [
    {
      id: 1,
      name: "World Entrepreneurship Day 4.0",
      date: "October 4, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Zaria, Kaduna State",
      status: "Registered",
      type: "Main Event",
      theme: "Rebuild, Reinvent, Rise",
      description: "Join 400+ entrepreneurs for a transformative experience focused on economic resilience and sustainable growth."
    },
    {
      id: 2,
      name: "Pre-Event Networking Session",
      date: "October 3, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual Event",
      status: "Upcoming",
      type: "Networking",
      description: "Connect with fellow entrepreneurs before the main event."
    },
    {
      id: 3,
      name: "Innovation Pitch Competition",
      date: "October 4, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Main Auditorium",
      status: "Registration Open",
      type: "Competition",
      description: "Showcase your innovative ideas to a panel of expert judges and investors."
    }
  ]

  const handleProfileUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userName = `${currentUser.firstName} ${currentUser.lastName}`
  const eventId = `WED4-${currentUser._id?.slice(-8).toUpperCase() || 'USER123'}`

  // Check if user needs to pay and if payment is approved
  const needsPayment = currentUser.userType === "participant" || currentUser.userType === "vendor"
  const paymentApproved = currentUser.paymentStatus === "approved"
  const canAccessQRCode = !needsPayment || paymentApproved

  const handlePaymentSubmitted = () => {
    // Refresh user data after payment submission
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    setRefreshKey(prev => prev + 1)
  }

  return (
    <DashboardLayout userType="user">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Here's your WED 4.0 dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white capitalize text-xs">
              {currentUser.userType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {currentUser.status}
            </Badge>
            {needsPayment && (
              <Badge className={`text-xs ${
                paymentApproved ? 'bg-green-600 text-white' :
                currentUser.paymentStatus === 'pending' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {currentUser.paymentStatus === 'approved' ? 'Paid' :
                 currentUser.paymentStatus === 'pending' ? 'Payment Pending' :
                 'Payment Required'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-4 sm:space-y-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Payment Verification Section */}
          {needsPayment && (
            <div className="mb-6">
              <PaymentVerificationCard
                user={currentUser}
                onPaymentSubmitted={handlePaymentSubmitted}
              />
            </div>
          )}

          {/* QR Code Section - Show only if payment is approved or not required */}
          {canAccessQRCode ? (
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <QRCodeCard
                  eventId={eventId}
                  userName={userName}
                  userType={currentUser.userType}
                  eventName="WED 4.0"
                />
              </div>
            </div>
          ) : (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  QR Code Locked
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete your payment verification to access your event QR code and ID.
                </p>
                <Alert className="border-red-200 bg-red-50">
                  <CreditCard className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Payment of ₦{currentUser.userType === "participant" ? "7,000" : "12,000"} is required to access event features.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
