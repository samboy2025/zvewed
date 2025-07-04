"use client"

import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Upload, DollarSign, Receipt, CreditCard, AlertCircle, CheckCircle, FileText, Download, Loader2 } from 'lucide-react'
import { SponsorDashboardLayout } from "../../components/SponsorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

export default function PaymentPage() {
  const router = useRouter()
  const [sponsorData, setSponsorData] = useState<any>(null)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptURL, setReceiptURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    transactionId: '',
    paymentMethod: '',
    paymentDate: '',
    notes: ''
  })

  const uploadPaymentReceipt = useMutation(api.sponsors.uploadPaymentReceipt)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      const data = JSON.parse(sponsorData)
      setSponsorData(data)
      // Also ensure it's saved under sponsorData
      localStorage.setItem('sponsorData', JSON.stringify(data))
      // Set payment amount based on sponsorship level
      const sponsorshipAmounts: any = {
        'Platinum': '50000',
        'Gold': '30000',
        'Silver': '20000',
        'Bronze': '10000'
      }
      setPaymentDetails(prev => ({
        ...prev,
        amount: sponsorshipAmounts[data.sponsorshipLevel] || ''
      }))
    } else {
      router.push('/sponsor-login')
    }
    setIsLoading(false)
  }, [router])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG) or PDF file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setReceiptFile(file)
      setReceiptURL('') // Clear previous URL
    }
  }

  const uploadToCloudinary = async () => {
    if (!receiptFile) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', receiptFile)
    formData.append('upload_preset', 'ml_default') // Using unsigned preset
    formData.append('folder', 'sponsor-receipts')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setReceiptURL(data.secure_url)
      setIsUploading(false)
      alert('Receipt uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload receipt. Please try again.')
      setIsUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!receiptURL) {
      alert('Please upload the receipt first')
      return
    }

    setIsSubmitting(true)
    try {
      if (sponsorData?._id) {
        await uploadPaymentReceipt({
          sponsorId: sponsorData._id,
          receiptURL,
          paymentDetails: {
            ...paymentDetails,
            submittedAt: new Date().toISOString()
          }
        })
        
        // Update local storage with payment status
        const updatedData = {
          ...sponsorData,
          paymentStatus: 'pending',
          paymentDetails: {
            ...paymentDetails,
            receiptURL,
            submittedAt: new Date().toISOString()
          }
        }
        localStorage.setItem('sponsorData', JSON.stringify(updatedData))
        localStorage.setItem('currentSponsor', JSON.stringify(updatedData))
        
        alert('Payment receipt submitted successfully! Our team will verify it within 24-48 hours.')
        router.push('/sponsor-dashboard')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit payment details. Please try again.')
    }
    setIsSubmitting(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading sponsor dashboard...</span>
        </div>
      </div>
    )
  }

  if (!sponsorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in as a sponsor to access this dashboard.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/sponsor-login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SponsorDashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <CreditCard className="mr-2" size={24} />
              Payment Submission
            </CardTitle>
          </CardHeader>
          <CardContent>

        {/* Payment Information Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mr-2 flex-shrink-0" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">Payment Instructions:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Please make the payment to our official bank account</li>
                <li>Upload a clear photo or PDF of your payment receipt</li>
                <li>Include transaction ID for faster verification</li>
                <li>Verification typically takes 24-48 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sponsorship Level and Amount */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Sponsorship Level</p>
              <p className="text-lg font-semibold text-red-700">{sponsorData.sponsorshipLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount Due</p>
              <p className="text-lg font-semibold text-red-700">₦{paymentDetails.amount}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Details Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={paymentDetails.transactionId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter transaction reference"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={paymentDetails.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="online_payment">Online Payment</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={paymentDetails.paymentDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Paid (₦)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={paymentDetails.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={paymentDetails.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Any additional information about the payment..."
                />
              </div>
            </div>
          </div>

          {/* Receipt Upload Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <Receipt className="mr-2" size={20} />
              Payment Receipt
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Receipt (Image or PDF, Max 5MB)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    required
                  />
                  {receiptFile && !receiptURL && (
                    <button
                      type="button"
                      onClick={uploadToCloudinary}
                      disabled={isUploading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 flex items-center"
                    >
                      <Upload className="mr-2" size={16} />
                      {isUploading ? 'Uploading...' : 'Upload Receipt'}
                    </button>
                  )}
                </div>
              </div>
              
              {receiptFile && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <FileText className="inline mr-1" size={16} />
                    Selected: {receiptFile.name}
                  </p>
                </div>
              )}
              
              {receiptURL && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-600 mr-2" size={20} />
                      <span className="text-green-800 font-medium">Receipt uploaded successfully!</span>
                    </div>
                    <a
                      href={receiptURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Download className="mr-1" size={16} />
                      View Receipt
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !receiptURL || isUploading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 flex items-center"
            >
              <DollarSign className="mr-2" size={20} />
              {isSubmitting ? 'Submitting...' : 'Submit Payment Details'}
            </button>
          </div>
        </form>
          </CardContent>
        </Card>
      </div>
    </SponsorDashboardLayout>
  )
}

