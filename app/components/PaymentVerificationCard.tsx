"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageCircle,
  Phone,
  Banknote,
  ShoppingCart,
  ArrowRight
} from "lucide-react"
import { useState } from "react"

interface PaymentVerificationCardProps {
  user: any
  onPaymentSubmitted?: () => void
}

export function PaymentVerificationCard({ user, onPaymentSubmitted }: PaymentVerificationCardProps) {
  const whatsappNumber = "+2348109569323"
  const paymentAmount = user?.userType === "participant" ? 7000 : 12000

  const handlePaystackPayment = () => {
    // Open Paystack payment link in new tab
    window.open("https://paystack.com/buy/regular-ticket-wed4", "_blank")
  }

  const openWhatsApp = () => {
    const message = `Hello! I'm submitting my payment proof for WED 4.0.
    
Name: ${user?.firstName} ${user?.lastName}
User Type: ${user?.userType}
Amount Paid: ₦${paymentAmount.toLocaleString()}

I will send the payment proof in the next message.`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const getPaymentStatusBadge = () => {
    switch (user?.paymentStatus) {
      case "approved":
        return <Badge className="bg-green-600 text-white"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-600 text-white"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-600 text-white"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline"><CreditCard className="h-3 w-3 mr-1" />Payment Required</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-red-600" />
            Payment Verification
          </div>
          {getPaymentStatusBadge()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Payment Status Alert */}
        {user?.paymentStatus === "approved" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your payment has been verified! You can now access your QR code and event ID.
            </AlertDescription>
          </Alert>
        )}

        {user?.paymentStatus === "pending" && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your payment receipt is under review. We'll notify you within 24-48 hours.
            </AlertDescription>
          </Alert>
        )}

        {user?.paymentStatus === "rejected" && (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-800" />
            <AlertDescription className="text-red-800">
              Payment verification failed: {user?.paymentRejectionReason || "Please contact support"}
            </AlertDescription>
          </Alert>
        )}

        {(!user?.paymentStatus || user?.paymentStatus === "unpaid") && (
          <>
            {/* Payment Amount */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Payment Required</h3>
              </div>
              <p className="text-red-700 text-lg font-bold">
                Amount: ₦{paymentAmount.toLocaleString()}
              </p>
              <p className="text-red-600 text-sm">
                {user?.userType === "participant" ? "Participant Registration Fee" : "Vendor Booth Fee"}
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
                Send to WhatsApp: {whatsappNumber}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
