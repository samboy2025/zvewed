"use client"

import { DashboardLayout } from "../../components/DashboardLayout"
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
  AlertCircle,
  ShoppingCart,
  ArrowRight,
  MessageCircle,
  Phone
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

  const handlePaystackPayment = () => {
    // Open Paystack payment link in new tab
    window.open("https://paystack.com/buy/regular-ticket-wed4", "_blank")
  }

  const openWhatsApp = () => {
    const whatsappNumber = "+2348109569323"
    const message = `Hello! I'm submitting my payment proof for WED 4.0.
    
Name: ${currentUser?.firstName} ${currentUser?.lastName}
User Type: ${currentUser?.userType}
Amount Paid: ₦${currentUser?.userType === "participant" ? 7000 : 12000}

I will send the payment proof in the next message.`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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
          description: "Your payment proof is being reviewed. We'll notify you within 24-48 hours.",
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

          {/* Payment Section */}
          {(!currentUser.paymentStatus || currentUser.paymentStatus === "unpaid") && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  Complete Your Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Amount Display */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
                  <div className="text-3xl font-bold text-red-900 mb-2">
                    ₦{paymentAmount.toLocaleString()}
                  </div>
                  <p className="text-red-800 font-medium">
                    {currentUser.userType === "participant" ? "Participant Registration Fee" : "Vendor Booth Fee"}
                  </p>
                </div>

                {/* Paystack Payment Button */}
                <div className="text-center">
                  <Button
                    onClick={handlePaystackPayment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                    size="lg"
                  >
                    <ShoppingCart className="h-6 w-6 mr-3" />
                    Pay with Paystack
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    You will be redirected to Paystack's secure payment page
                  </p>
                </div>

                {/* Payment Instructions */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Click the "Pay with Paystack" button above</li>
                    <li>You'll be redirected to Paystack's secure payment page</li>
                    <li>Complete your payment using any of the available methods</li>
                    <li>After successful payment, send proof to our WhatsApp</li>
                    <li>We'll verify and update your status within 24 hours</li>
                  </ol>
                </div>

                {/* WhatsApp Contact */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Send Payment Proof via WhatsApp
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    After completing your payment, send the payment proof to our WhatsApp number for verification.
                  </p>
                  <Button 
                    onClick={openWhatsApp}
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send to WhatsApp: +234 810 956 9323
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/2348109569323" className="text-red-600 hover:underline">+234 810 956 9323</a></p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Payment Guidelines</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Ensure payment amount matches exactly</li>
                      <li>Keep your transaction receipt safe</li>
                      <li>Send payment proof via WhatsApp</li>
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
