"use client"

import { SponsorDashboardLayout } from "../components/SponsorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QRCodeCard } from "../components/QRCodeCard"
import { 
  Store,
  Package,
  Users,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Loader2,
  Building2,
  Crown,
  Award,
  Medal,
  Handshake
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"

export default function SponsorDashboardPage() {
  const [currentSponsor, setCurrentSponsor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    organizationType: "",
    industry: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'rejected': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'unpaid': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const updateSponsorProfile = useMutation(api.sponsors.updateSponsorProfile)
  const updatePaymentReceipt = useMutation(api.sponsors.uploadPaymentReceipt)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      const data = JSON.parse(sponsorData)
      setCurrentSponsor(data)
      // Also ensure it's saved under sponsorData
      localStorage.setItem('sponsorData', JSON.stringify(data))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (currentSponsor) {
      setFormData({
        organizationName: currentSponsor.organizationName || '',
        contactPerson: currentSponsor.contactPerson || '',
        phone: currentSponsor.phone || '',
        website: currentSponsor.website || '',
        address: currentSponsor.address || '',
        city: currentSponsor.city || '',
        state: currentSponsor.state || '',
        organizationType: currentSponsor.organizationType || '',
        industry: currentSponsor.industry || '',
      })
    }
  }, [currentSponsor])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      await updateSponsorProfile({
        sponsorId: currentSponsor._id as any,
        ...formData
      })
      const updatedSponsor = { ...currentSponsor, ...formData }
      localStorage.setItem('currentSponsor', JSON.stringify(updatedSponsor))
      alert('Sponsor profile updated successfully!')
    } catch (error) {
      console.error('Failed to update sponsor profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  const handleUploadReceipt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        await updatePaymentReceipt({
          sponsorId: currentSponsor._id as any,
          receiptUrl: data.secure_url,
          paymentDetails: {
            amount: 1000,
            paymentMethod: 'Bank Transfer',
            referenceNumber: 'REF12345',
            paymentDate: '2025-07-04',
          },
        })

        alert('Payment receipt uploaded successfully!')

        // Optionally update the localStorage and UI here
      }
    } catch (error) {
      console.error('Failed to upload receipt:', error)
      alert('Failed to upload receipt. Please try again.')
    }
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

  if (!currentSponsor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in as a sponsor to access this dashboard.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Handle sponsor data - could be from sponsor table or user table
  const userName = currentSponsor.contactPerson || `${currentSponsor.firstName} ${currentSponsor.lastName}`
  const eventId = `WED4-SPON-${currentSponsor._id?.slice(-8).toUpperCase() || 'SPONSOR123'}`
  
  // Ensure sponsor has required fields for display
  const sponsorStatus = currentSponsor.status || 'pending'
  const paymentStatus = currentSponsor.paymentStatus || 'unpaid'

  return (
    <SponsorDashboardLayout>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Sponsor Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
              Welcome back, {currentSponsor.organizationName || currentSponsor.organization || userName}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Badge className={`text-white capitalize text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 ${getStatusColor(sponsorStatus)}`}>
              {sponsorStatus}
            </Badge>
            <Badge className={`text-white capitalize text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 ${getPaymentStatusColor(paymentStatus)}`}>
              {paymentStatus}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* QR Code Card - Full width on top */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md">
              <QRCodeCard
                eventId={eventId}
                userName={userName}
                userType="sponsor"
                eventName="WED 4.0"
              />
            </div>
          </div>
          {/* Status Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
            {/* Application Status */}
            <Card className="h-full">
              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Application Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-2">
                <Badge className={`${getStatusColor(sponsorStatus)} text-white mb-1.5 sm:mb-2 text-[10px] sm:text-xs`}>
                  {sponsorStatus.toUpperCase()}
                </Badge>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {sponsorStatus === 'approved' && "Your application has been approved!"}
                  {sponsorStatus === 'pending' && "Your application is under review"}
                  {sponsorStatus === 'rejected' && "Please contact us for more information"}
                </p>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card className="h-full">
              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Payment Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-2">
                <Badge className={`${getPaymentStatusColor(paymentStatus)} text-white mb-1.5 sm:mb-2 text-[10px] sm:text-xs`}>
                  {paymentStatus.toUpperCase()}
                </Badge>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {paymentStatus === 'paid' && "Payment completed successfully"}
                  {paymentStatus === 'pending' && "Payment verification in progress"}
                  {paymentStatus === 'unpaid' && "Payment required"}
                </p>
              </CardContent>
            </Card>

            {/* Sponsorship Details */}
            <Card className="h-full sm:col-span-2 lg:col-span-1">
              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Sponsorship Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-2">
                {sponsorStatus === 'approved' ? (
                  <div>
                    <div className="text-base sm:text-lg font-bold text-red-600 mb-0.5 sm:mb-1 capitalize">{currentSponsor.sponsorshipLevel || 'Silver'}</div>
                    <p className="text-xs sm:text-sm text-gray-600">₦{currentSponsor.sponsorshipAmount || '500,000'}</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Pending Approval</div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Details will be shared after approval</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Organization Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Organization Details */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Organization Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                    {currentSponsor.organizationName || currentSponsor.organization || userName}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {currentSponsor.organizationType || 'Corporate'} - {currentSponsor.industry || 'Business'}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Contact:</span>
                    <span className="truncate">{currentSponsor.contactPerson || userName} {currentSponsor.position ? `(${currentSponsor.position})` : ''}</span>
                  </div>

                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Phone:</span>
                    <span className="truncate">{currentSponsor.phone}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Email:</span>
                    <span className="truncate break-all">{currentSponsor.email}</span>
                  </div>

                  {currentSponsor.website && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm">
                      <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium flex-shrink-0">Website:</span>
                      <a 
                        href={currentSponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline truncate"
                      >
                        {currentSponsor.website}
                      </a>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Location:</span>
                    <span className="truncate">{currentSponsor.city || 'Not specified'}, {currentSponsor.state || 'Not specified'}</span>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <Button asChild variant="outline" className="w-full text-xs sm:text-sm">
                    <Link href="/sponsor-dashboard/profile">Edit Organization Information</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Benefits */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Sponsorship Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                {currentSponsor.sponsorshipLevel && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {currentSponsor.sponsorshipLevel === 'platinum' && <Crown className="h-5 w-5 text-purple-600" />}
                      {currentSponsor.sponsorshipLevel === 'gold' && <Award className="h-5 w-5 text-yellow-600" />}
                      {currentSponsor.sponsorshipLevel === 'silver' && <Medal className="h-5 w-5 text-gray-600" />}
                      {currentSponsor.sponsorshipLevel === 'in-kind' && <Handshake className="h-5 w-5 text-blue-600" />}
                      <h4 className="font-semibold text-base capitalize">
                        {currentSponsor.sponsorshipLevel} Sponsor
                      </h4>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                      {currentSponsor.sponsorshipLevel === 'platinum' && (
                        <>
                          <li>• Logo on all event materials</li>
                          <li>• Premium exhibition booth</li>
                          <li>• Keynote speaking opportunity</li>
                          <li>• VIP networking access</li>
                        </>
                      )}
                      {currentSponsor.sponsorshipLevel === 'gold' && (
                        <>
                          <li>• Logo visibility on major materials</li>
                          <li>• Standard exhibition booth</li>
                          <li>• Panel speaking opportunity</li>
                          <li>• Media recognition</li>
                        </>
                      )}
                      {currentSponsor.sponsorshipLevel === 'silver' && (
                        <>
                          <li>• Social media mentions</li>
                          <li>• Branded materials distribution</li>
                          <li>• Program recognition</li>
                          <li>• Networking opportunities</li>
                        </>
                      )}
                      {currentSponsor.sponsorshipLevel === 'in-kind' && (
                        <>
                          <li>• Service/product showcase</li>
                          <li>• Customized branding benefits</li>
                          <li>• Official partnership recognition</li>
                          <li>• Targeted exposure</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}

                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-xs sm:text-sm">
                    <Link href="/sponsor-dashboard/benefits">View Full Benefits</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                <span>Payment & Receipt Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {paymentStatus === 'unpaid' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Payment Required</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Please complete your sponsorship payment to secure your benefits.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Amount Due:</strong> ₦{currentSponsor.sponsorshipAmount || '500,000'}</p>
                    <p><strong>Bank:</strong> Zenith Bank</p>
                    <p><strong>Account Name:</strong> Zeal Ventures Enterprise</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                  </div>
                </div>
              )}

              {paymentStatus === 'pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">Payment Verification In Progress</h4>
                  <p className="text-sm text-blue-700">
                    Your payment receipt has been submitted and is being verified. We'll notify you once confirmed.
                  </p>
                </div>
              )}

              {paymentStatus === 'paid' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-green-800 mb-2">Payment Confirmed</h4>
                  <p className="text-sm text-green-700">
                    Thank you! Your sponsorship payment has been confirmed.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="receipt-upload" className="text-sm font-medium">Upload Payment Receipt</Label>
                  <p className="text-xs text-gray-500 mb-2">Upload a clear image of your payment receipt or transaction confirmation</p>
                  <Input
                    id="receipt-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadReceipt}
                    disabled={paymentStatus === 'paid'}
                    className="w-full"
                  />
                </div>

                {currentSponsor.paymentReceipt && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Uploaded Receipt:</p>
                    <a 
                      href={currentSponsor.paymentReceipt} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 underline text-sm"
                    >
                      View Receipt
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Information */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                <span>WED 4.0 Event Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-red-800 text-sm sm:text-base mb-1 sm:mb-2">Event Dates</h4>
                  <p className="text-red-700 text-xs sm:text-sm">October 4-5, 2025</p>
                  <p className="text-red-600 text-[10px] sm:text-xs">2 Days of Impact</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 text-sm sm:text-base mb-1 sm:mb-2">Expected Attendance</h4>
                  <p className="text-blue-700 text-xs sm:text-sm">400+ Entrepreneurs</p>
                  <p className="text-blue-600 text-[10px] sm:text-xs">Key Decision Makers</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 text-sm sm:text-base mb-1 sm:mb-2">Networking</h4>
                  <p className="text-green-700 text-xs sm:text-sm">VIP Reception</p>
                  <p className="text-green-600 text-[10px] sm:text-xs">October 3, 2025</p>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600">
                  <strong>Theme:</strong> "Rebuild, Reinvent, Rise - Navigating Nigeria's Economy with Resilience"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SponsorDashboardLayout>
  )
}
