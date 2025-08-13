"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
import { PaymentVerificationCard } from "../../components/PaymentVerificationCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

export default function ParticipantPaymentPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const initializeUserPayment = useMutation(api.users.initializeUserPayment)

  // Get user data from localStorage
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

  const handlePaymentSubmitted = () => {
    // Refresh user data after payment submission
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading) {
    return (
      <DashboardLayout userType="user">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading payment details...</p>
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
              <p className="text-gray-600 mb-6">Please log in to access your payment page.</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const getPaymentStatusInfo = () => {
    switch (currentUser.paymentStatus) {
      case "approved":
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          title: "Payment Verified",
          description: "Your payment has been successfully verified. You can now access all event features.",
          alertType: "success"
        }
      case "pending":
        return {
          icon: <Clock className="h-6 w-6 text-yellow-600" />,
          title: "Payment Under Review",
          description: "Your payment receipt is being reviewed. We'll notify you within 24-48 hours.",
          alertType: "warning"
        }
      case "rejected":
        return {
          icon: <XCircle className="h-6 w-6 text-red-600" />,
          title: "Payment Verification Failed",
          description: currentUser.paymentRejectionReason || "Please contact support for assistance.",
          alertType: "error"
        }
      default:
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-600" />,
          title: "Payment Required",
          description: "Complete your payment to access event features.",
          alertType: "error"
        }
    }
  }

  const statusInfo = getPaymentStatusInfo()
  const paymentAmount = currentUser.userType === "participant" ? 7000 : 12000

  return (
    <DashboardLayout userType="user">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Payment Verification
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete your payment to access WED 4.0 features
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Payment Status Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {statusInfo.icon}
                {statusInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className={`border-${statusInfo.alertType === 'success' ? 'green' : statusInfo.alertType === 'warning' ? 'yellow' : 'red'}-200 bg-${statusInfo.alertType === 'success' ? 'green' : statusInfo.alertType === 'warning' ? 'yellow' : 'red'}-50`}>
                <AlertDescription className={`text-${statusInfo.alertType === 'success' ? 'green' : statusInfo.alertType === 'warning' ? 'yellow' : 'red'}-800`}>
                  {statusInfo.description}
                </AlertDescription>
              </Alert>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₦{paymentAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Required Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold capitalize">
                    <Badge className={`${
                      currentUser.paymentStatus === 'approved' ? 'bg-green-600' : 
                      currentUser.paymentStatus === 'pending' ? 'bg-yellow-600' : 
                      'bg-red-600'
                    } text-white`}>
                      {currentUser.paymentStatus || 'Unpaid'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">Payment Status</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold capitalize">
                    <Badge variant="outline">
                      {currentUser.userType}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">Registration Type</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Verification Component */}
          <PaymentVerificationCard 
            user={currentUser} 
            onPaymentSubmitted={handlePaymentSubmitted}
          />

          {/* Help Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  If you're experiencing issues with your payment or have questions about the verification process, 
                  please don't hesitate to contact our support team.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <p><strong>Email:</strong> <a href="mailto:wedzazzauversion@gmail.com" className="text-red-600 hover:underline">wedzazzauversion@gmail.com</a></p>
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/08140135206" className="text-red-600 hover:underline">08140135206</a></p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Payment Guidelines</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Ensure payment amount matches exactly</li>
                      <li>Keep your transaction receipt safe</li>
                      <li>Allow 24-48 hours for verification</li>
                      <li>Contact support if payment is rejected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
