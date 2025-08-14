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
  Upload,
  Image as ImageIcon,
  MessageCircle,
  Phone
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Input } from "@/components/ui/input"

export default function VendorPaymentPage() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bank_transfer")
  const [copiedAccount, setCopiedAccount] = useState("")
  const [uploadedReceipt, setUploadedReceipt] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    amount: "12000", // Fixed amount for vendors
    referenceNumber: "",
    paymentDate: new Date().toISOString().split('T')[0],
    bankName: "UBA Bank"
  })

  // Check if payment is already submitted
  const isPaymentSubmitted = currentVendor?.paymentStatus === "pending" || currentVendor?.paymentStatus === "approved"

  const submitVendorPayment = useMutation(api.vendors.uploadPaymentReceipt)

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

  // Bank account details
  const bankAccounts = [
    {
      bank: "UBA Bank",
      accountName: "Zazzau Version Entrepreneurs",
      accountNumber: "1027308809",
      accountType: "Current Account"
    }
  ]

  // WhatsApp contact for receipt submission
  const whatsappNumber = "08140135206"

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(""), 2000)
  }

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await response.json()

      if (data.secure_url) {
        setUploadedReceipt(data.secure_url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload receipt. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmitPayment = async () => {
    if (!currentVendor || !uploadedReceipt) {
      alert("Please upload your payment receipt");
      return;
    }

    if (!paymentForm.amount || !paymentForm.referenceNumber) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Upload payment receipt and update vendor status
      await submitVendorPayment({
        vendorId: currentVendor._id,
        receiptUrl: uploadedReceipt,
        paymentDetails: {
          amount: parseFloat(paymentForm.amount),
          paymentMethod: "Bank Transfer",
          referenceNumber: paymentForm.referenceNumber,
          paymentDate: paymentForm.paymentDate,
          bankName: paymentForm.bankName
        }
      });

      alert("Payment receipt submitted successfully! Our team will verify it within 24-48 hours.");
      
      // Update local storage
      const updatedVendor = {
        ...currentVendor,
        paymentStatus: "pending",
        paymentReceipt: uploadedReceipt,
        paymentSubmittedAt: Date.now()
      };
      localStorage.setItem('currentVendor', JSON.stringify(updatedVendor));
      setCurrentVendor(updatedVendor);
    } catch (error) {
      console.error("Payment submission failed:", error);
      alert("Failed to submit payment. Please ensure all details are correct and try again. If the problem persists, contact support.");
    }
  };

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading payment details...</span>
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
              <p className="text-gray-600 mb-6">Please log in as a vendor to access this page.</p>
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
                We have received your payment receipt. Please allow up to 24 hours for verification.
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
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bank_transfer">
                    <Building className="h-4 w-4 mr-2" />
                    Bank Transfer
                  </TabsTrigger>
                  <TabsTrigger value="online_payment" disabled>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Online Payment (Coming Soon)
                  </TabsTrigger>
                </TabsList>

                {/* Bank Transfer Content */}
                <TabsContent value="bank_transfer">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bank Transfer Instructions</CardTitle>
                      <CardDescription>
                        Please transfer the total amount to one of the accounts below.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
                        <p className="text-sm text-blue-800">
                          Use your <strong className="font-bold">Company Name</strong> as the payment reference or narration.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bankAccounts.map((account, index) => (
                          <div key={index} className="border p-4 rounded-lg">
                            <h4 className="font-semibold">{account.bank}</h4>
                            <p className="text-sm text-gray-500">{account.accountName}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-mono tracking-wider">{account.accountNumber}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyAccount(account.accountNumber)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                {copiedAccount === account.accountNumber ? "Copied!" : "Copy"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Payment Submission Form */}
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold">Confirm Your Payment</h3>
                        <p className="text-sm text-gray-600">
                          After making the transfer, please fill out this form and upload your payment receipt.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="amount">Amount Paid (₦)</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder={paymentDetails.price.toString()}
                              value={paymentForm.amount}
                              onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                              required
                              disabled={isPaymentSubmitted}
                            />
                          </div>
                          <div>
                            <Label htmlFor="paymentDate">Payment Date</Label>
                            <Input
                              id="paymentDate"
                              type="date"
                              value={paymentForm.paymentDate}
                              onChange={(e) => setPaymentForm({...paymentForm, paymentDate: e.target.value})}
                              required
                              disabled={isPaymentSubmitted}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="referenceNumber">Transaction Reference</Label>
                          <Input
                            id="referenceNumber"
                            placeholder="e.g., Your company name or transaction ID"
                            value={paymentForm.referenceNumber}
                            onChange={(e) => setPaymentForm({...paymentForm, referenceNumber: e.target.value})}
                            required
                            disabled={isPaymentSubmitted}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="bankName">Bank Name (From which you paid)</Label>
                          <Input
                            id="bankName"
                            placeholder="e.g., Access Bank, GTBank"
                            value={paymentForm.bankName}
                            onChange={(e) => setPaymentForm({...paymentForm, bankName: e.target.value})}
                            disabled={isPaymentSubmitted}
                          />
                        </div>

                        {/* Upload Receipt */}
                        <div className="space-y-2">
                          <Label htmlFor="receipt">Upload Payment Receipt *</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="receipt"
                              className="hidden"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleReceiptUpload}
                              disabled={isPaymentSubmitted}
                            />
                            {isUploading ? (
                              <div className="flex flex-col items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-2" />
                                <p className="text-sm text-gray-600">Uploading...</p>
                              </div>
                            ) : uploadedReceipt ? (
                              <div className="flex flex-col items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-green-500 mb-2" />
                                <p className="text-sm font-medium text-green-600">Receipt Uploaded Successfully!</p>
                                <Button variant="link" size="sm" onClick={() => document.getElementById('receipt')?.click()}>
                                  Change file
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <Button variant="outline" size="sm" onClick={() => document.getElementById('receipt')?.click()}>
                                  Choose File
                                </Button>
                                <p className="text-xs text-gray-500 mt-2">JPEG, PNG, or WebP (Max 5MB)</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={handleSubmitPayment}
                          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isPaymentSubmitted || !uploadedReceipt || !paymentForm.referenceNumber || isUploading}
                        >
                          {isUploading ? "Uploading..." : "Submit Payment Confirmation"}
                        </Button>

                        {/* WhatsApp Alternative */}
                        <div className="border-t pt-4 mt-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Alternative: Send via WhatsApp
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            You can also send your payment receipt directly to our WhatsApp number
                          </p>
                          <Button
                            onClick={() => {
                              const message = `Hello! I'm submitting my payment receipt for WED 4.0 vendor booth.

Company: ${currentVendor.companyName}
Amount Paid: ₦${paymentDetails.price.toLocaleString()}
Reference: ${paymentForm.referenceNumber || 'Please provide reference number'}

I will send the receipt image in the next message.`

                              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, '_blank')
                            }}
                            variant="outline"
                            className="w-full border-green-500 text-green-600 hover:bg-green-50"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Send to WhatsApp: {whatsappNumber}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Online Payment Content (Disabled) */}
                <TabsContent value="online_payment">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold">Coming Soon</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Online payment with Paystack will be available shortly.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right side - Payment Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-semibold">{currentVendor.companyName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Booth Type:</span>
                    <span className="font-semibold">{paymentDetails.description}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total Amount Due:</span>
                    <span className="font-bold text-red-600">₦{paymentDetails.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status:</span>
                    <div>
                      <Badge
                        className={
                          currentVendor.paymentStatus === "paid" ? "bg-green-100 text-green-800"
                          : currentVendor.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                        }
                      >
                        {(currentVendor.paymentStatus || "unpaid").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>If you have any questions or issues with your payment, please contact our support team.</p>
                  <p>
                    <strong>Email:</strong> <a href="mailto:support@zve.com" className="text-red-600 hover:underline">support@zve.com</a>
                  </p>
                  <p>
                    <strong>Phone:</strong> <a href="tel:+2348012345678" className="text-red-600 hover:underline">+234 801 234 5678</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
