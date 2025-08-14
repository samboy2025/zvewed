"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard, 
  Upload, 
  Copy, 
  Check, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  Phone,
  Banknote
} from "lucide-react"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

interface PaymentVerificationCardProps {
  user: any
  onPaymentSubmitted?: () => void
}

export function PaymentVerificationCard({ user, onPaymentSubmitted }: PaymentVerificationCardProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedReceipt, setUploadedReceipt] = useState<string>("")
  const [copiedAccount, setCopiedAccount] = useState("")
  const [paymentForm, setPaymentForm] = useState({
    amount: user?.userType === "participant" ? "7000" : "12000",
    referenceNumber: "",
    paymentDate: new Date().toISOString().split('T')[0],
    bankName: "UBA Bank"
  })

  // Always call the hook, handle errors in the submission function
  const submitPaymentReceipt = useMutation(api.users.submitPaymentReceipt)

  // Mock submission function for when Convex is not available
  const mockSubmitPayment = async (args: any) => {
    // Mock implementation - update localStorage
    const updatedUser = {
      ...user,
      paymentReceipt: args.receiptUrl,
      paymentDetails: args.paymentDetails,
      paymentStatus: "pending",
      paymentSubmittedAt: Date.now()
    }

    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    // Also update mock users for admin
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    const existingUserIndex = mockUsers.findIndex((u: any) => u._id === user._id)
    if (existingUserIndex >= 0) {
      mockUsers[existingUserIndex] = updatedUser
    } else {
      mockUsers.push(updatedUser)
    }
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers))

    return { success: true }
  }

  const bankDetails = {
    accountName: "Zazzau Version Entrepreneurs",
    bankName: "UBA Bank",
    accountNumber: "1027308809"
  }

  const whatsappNumber = "08140135206"
  const paymentAmount = user?.userType === "participant" ? 7000 : 12000

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedAccount(type)
    setTimeout(() => setCopiedAccount(""), 2000)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP) or PDF')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed: ${response.status}`)
      }

      const data = await response.json()
      setUploadedReceipt(data.secure_url)
      setIsUploading(false)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload receipt. Please try again.")
      setIsUploading(false)
    }
  }

  const handleSubmitPayment = async () => {
    if (!user?._id || !uploadedReceipt) {
      alert("Please upload your payment receipt")
      return
    }

    if (!paymentForm.referenceNumber) {
      alert("Please enter the payment reference number")
      return
    }

    const paymentData = {
      userId: user._id,
      receiptUrl: uploadedReceipt,
      paymentDetails: {
        amount: parseFloat(paymentForm.amount),
        paymentMethod: "Bank Transfer",
        referenceNumber: paymentForm.referenceNumber,
        paymentDate: paymentForm.paymentDate,
        bankName: paymentForm.bankName
      }
    }

    try {
      await submitPaymentReceipt(paymentData)
      alert("Payment receipt submitted successfully! Our team will verify it within 24-48 hours.")
      onPaymentSubmitted?.()
    } catch (error) {
      console.error("Submission failed:", error)
      alert("Failed to submit payment receipt. Please check your connection and try again. If the problem persists, contact support.")
    }
  }

  const openWhatsApp = () => {
    const message = `Hello! I'm submitting my payment receipt for WED 4.0.
    
Name: ${user?.firstName} ${user?.lastName}
User Type: ${user?.userType}
Amount Paid: ₦${paymentAmount.toLocaleString()}
Reference: ${paymentForm.referenceNumber || 'Please provide reference number'}

I will send the receipt image in the next message.`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
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
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Payment Required</Badge>
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
            <XCircle className="h-4 w-4 text-red-600" />
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

            {/* Bank Details */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 text-gray-800">Bank Transfer Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bankDetails.accountName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountName, "name")}
                    >
                      {copiedAccount === "name" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bank:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bankDetails.bankName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.bankName, "bank")}
                    >
                      {copiedAccount === "bank" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">{bankDetails.accountNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountNumber, "account")}
                    >
                      {copiedAccount === "account" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Submission Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Submit Payment Receipt</h3>
              
              {/* Option 1: Upload Receipt */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Option 1: Upload Receipt
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="reference">Payment Reference Number *</Label>
                    <Input
                      id="reference"
                      value={paymentForm.referenceNumber}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, referenceNumber: e.target.value }))}
                      placeholder="Enter transaction reference"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="receipt">Upload Receipt *</Label>
                    <Input
                      id="receipt"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {uploadedReceipt && <p className="text-sm text-green-600 mt-1">Receipt uploaded successfully!</p>}
                  </div>
                  
                  <Button 
                    onClick={handleSubmitPayment}
                    disabled={!uploadedReceipt || !paymentForm.referenceNumber || isUploading}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Submit Payment Receipt
                  </Button>
                </div>
              </div>

              {/* Option 2: WhatsApp */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Option 2: Send via WhatsApp
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Send your payment receipt directly to our WhatsApp number
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
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
