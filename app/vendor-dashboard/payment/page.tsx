"use client"

import { VendorDashboardLayout } from "../../components/VendorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Info,
  Building,
  Copy,
  ExternalLink,
  Clock,
  FileText,
  Loader2,
  MessageCircle,
  Phone,
  ShoppingCart,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

export default function VendorPaymentPage() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paystack")

  // Check if payment is already submitted
  const isPaymentSubmitted = currentVendor?.paymentStatus === "pending" || currentVendor?.paymentStatus === "approved"

  // Get vendor data from localStorage
  useEffect(() => {
    const vendorData = localStorage.getItem('currentVendor')
    if (vendorData) {
      setCurrentVendor(JSON.parse(vendorData))
    }
    setIsLoading(false)
  }, [])

  // Fixed payment amount for vendors
  const paymentDetails = {
    price: 12000,
    description: "Vendor Booth Registration Fee"
  }

  // WhatsApp contact for payment proof
  const whatsappNumber = "+2348109569323"

  const handlePaystackPayment = () => {
    // Open Paystack payment link in new tab
    window.open("https://paystack.com/buy/vendor-stall-full-wed4", "_blank")
  }

  const openWhatsApp = () => {
    const message = `Hello! I'm submitting my payment proof for WED 4.0 Vendor Booth.
    
Company: ${currentVendor?.companyName}
Contact Person: ${currentVendor?.contactPerson}
Email: ${currentVendor?.email}
Amount Paid: ₦${paymentDetails.price.toLocaleString()}

I will send the payment proof in the next message.`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-spin" />
            <p className="text-gray-500">Loading payment details...</p>
          </div>
        </div>
      </VendorDashboardLayout>
    )
  }

  if (!currentVendor) {
    return (
      <VendorDashboardLayout>
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
      </VendorDashboardLayout>
    )
  }

  return (
    <VendorDashboardLayout>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Payment
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete your exhibition booth payment
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/vendor-dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Payment Status Alert */}
          {currentVendor.paymentStatus === "paid" && (
            <Alert className="border-green-600 bg-green-50 text-green-900 mb-6">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Payment Confirmed</AlertTitle>
              <AlertDescription>
                Thank you! Your payment has been confirmed. Your booth is reserved.
              </AlertDescription>
            </Alert>
          )}

          {currentVendor.paymentStatus === "pending" && (
            <Alert className="border-yellow-600 bg-yellow-50 text-yellow-900 mb-6">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Payment Pending Verification</AlertTitle>
              <AlertDescription>
                We have received your payment proof. Please allow up to 24 hours for verification.
              </AlertDescription>
            </Alert>
          )}

          {(!currentVendor.paymentStatus || currentVendor.paymentStatus === "unpaid") && (
            <Alert className="border-red-600 bg-red-50 text-red-900 mb-6">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Action Required: Complete Your Payment</AlertTitle>
              <AlertDescription>
                Your booth reservation is not complete until payment is received. Please complete the payment below.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Payment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method Tabs */}
              <Tabs value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="paystack">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Paystack Payment
                  </TabsTrigger>
                </TabsList>

                {/* Paystack Payment Content */}
                <TabsContent value="paystack">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paystack Payment</CardTitle>
                      <CardDescription>
                        Complete your payment securely through Paystack
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Payment Amount Display */}
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                        <div className="text-3xl font-bold text-blue-900 mb-2">
                          ₦{paymentDetails.price.toLocaleString()}
                        </div>
                        <p className="text-blue-800 font-medium">{paymentDetails.description}</p>
                      </div>

                      {/* Paystack Payment Button */}
                      <div className="text-center">
                        <Button
                          onClick={handlePaystackPayment}
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                          size="lg"
                          disabled={isPaymentSubmitted}
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
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right side - Payment Status & Help */}
            <div className="space-y-6">
              {/* Payment Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Payment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className={
                        currentVendor.paymentStatus === "paid" ? "bg-green-600" :
                        currentVendor.paymentStatus === "pending" ? "bg-yellow-600" :
                        "bg-red-600"
                      }>
                        {currentVendor.paymentStatus === "paid" ? "Paid" :
                         currentVendor.paymentStatus === "pending" ? "Pending" :
                         "Unpaid"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="font-semibold">₦{paymentDetails.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Booth Type:</span>
                      <span className="font-semibold capitalize">{currentVendor.boothSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    Send Payment Proof
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    After completing your payment, please send the payment proof to our WhatsApp number for verification.
                  </p>
                  <Button
                    onClick={openWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isPaymentSubmitted}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Send to WhatsApp
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {whatsappNumber}
                  </p>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600">
                      If you encounter any issues with payment or have questions, contact our support team.
                    </p>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> wedzazzauversion@gmail.com</p>
                      <p><strong>WhatsApp:</strong> {whatsappNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
