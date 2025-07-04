"use client"

import { VendorDashboardLayout } from "../components/VendorDashboardLayout"
import { QRCodeCard } from "../components/QRCodeCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VendorDashboard() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get vendor data from localStorage
  useEffect(() => {
    const vendorData = localStorage.getItem('currentVendor')
    if (vendorData) {
      setCurrentVendor(JSON.parse(vendorData))
    }
    setIsLoading(false)
  }, [])

  // Mock booth assignment data
  const boothInfo = {
    boothNumber: "B-15",
    section: "Technology Zone",
    size: "3m x 3m",
    location: "Main Exhibition Hall",
    setupTime: "October 3, 2025 - 6:00 PM",
    eventDates: "October 4-5, 2025"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading vendor dashboard...</span>
        </div>
      </div>
    )
  }

  if (!currentVendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in as a vendor to access this dashboard.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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

  // Handle vendor name - could be from vendor table or user table
  const vendorName = currentVendor.companyName || currentVendor.organization || `${currentVendor.firstName} ${currentVendor.lastName}`
  const eventId = `VEN4-${currentVendor._id?.slice(-8).toUpperCase() || 'VEN123'}`
  
  // Ensure vendor has required fields for display
  const vendorStatus = currentVendor.status || 'pending'
  const paymentStatus = currentVendor.paymentStatus || 'unpaid'

  return (
    <VendorDashboardLayout>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Vendor Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
              Welcome back, {vendorName}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Badge className={`text-white capitalize text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 ${getStatusColor(vendorStatus)}`}>
              {vendorStatus}
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
          {/* QR Code Section - Show only if approved */}
          {vendorStatus === 'approved' && (
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <QRCodeCard
                    eventId={eventId}
                    userName={vendorName}
                    userType="Vendor"
                    eventName="WED 4.0"
                  />
                </div>
              </div>
            </div>
          )}

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
                <Badge className={`${getStatusColor(vendorStatus)} text-white mb-1.5 sm:mb-2 text-[10px] sm:text-xs`}>
                  {vendorStatus.toUpperCase()}
                </Badge>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {vendorStatus === 'approved' && "Your application has been approved!"}
                  {vendorStatus === 'pending' && "Your application is under review"}
                  {vendorStatus === 'rejected' && "Please contact us for more information"}
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
                  {paymentStatus === 'unpaid' && "Payment required to confirm booth"}
                </p>
                {paymentStatus === 'unpaid' && vendorStatus === 'approved' && (
                  <Button asChild className="w-full mt-3 bg-red-600 hover:bg-red-700" size="sm">
                    <Link href="/vendor-dashboard/payment">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Make Payment
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Booth Assignment */}
            <Card className="h-full sm:col-span-2 lg:col-span-1">
              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Booth Assignment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-2">
                {vendorStatus === 'approved' ? (
                  <div>
                    <div className="text-base sm:text-lg font-bold text-red-600 mb-0.5 sm:mb-1">{boothInfo.boothNumber}</div>
                    <p className="text-xs sm:text-sm text-gray-600">{boothInfo.section}</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Pending Approval</div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Booth will be assigned after approval</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Company Details */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Store className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                    {currentVendor.companyName}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
                    {currentVendor.productServices}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Contact:</span>
                    <span className="truncate">{currentVendor.contactPerson}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Phone:</span>
                    <span className="truncate">{currentVendor.phone}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Email:</span>
                    <span className="truncate break-all">{currentVendor.email}</span>
                  </div>
                  
                  {currentVendor.website && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm">
                      <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium flex-shrink-0">Website:</span>
                      <a 
                        href={currentVendor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline truncate"
                      >
                        {currentVendor.website}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium flex-shrink-0">Location:</span>
                    <span className="truncate">{currentVendor.city}, {currentVendor.state}</span>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <Button asChild variant="outline" className="w-full text-xs sm:text-sm">
                    <Link href="/vendor-dashboard/profile">Edit Company Information</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booth Details */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span className="truncate">Exhibition Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Business Type</p>
                    <p className="text-xs sm:text-sm font-medium capitalize truncate">{currentVendor.businessType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Industry</p>
                    <p className="text-xs sm:text-sm font-medium capitalize truncate">{currentVendor.industry}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Years in Business</p>
                    <p className="text-xs sm:text-sm font-medium">{currentVendor.yearsInBusiness}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Booth Size</p>
                    <p className="text-xs sm:text-sm font-medium capitalize">{currentVendor.boothSize}</p>
                  </div>
                </div>

                {currentVendor.status === 'approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-800 text-sm sm:text-base mb-1.5 sm:mb-2">Booth Assignment</h4>
                    <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-green-700">
                      <p><strong>Booth:</strong> {boothInfo.boothNumber}</p>
                      <p><strong>Section:</strong> {boothInfo.section}</p>
                      <p><strong>Size:</strong> {boothInfo.size}</p>
                      <p className="text-[10px] sm:text-xs"><strong>Setup Time:</strong> {boothInfo.setupTime}</p>
                    </div>
                  </div>
                )}

                {currentVendor.objectives && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Exhibition Objectives</p>
                    <p className="text-xs sm:text-sm line-clamp-3">{currentVendor.objectives}</p>
                  </div>
                )}

                <div className="pt-3 sm:pt-4 border-t border-gray-200 space-y-2">
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-xs sm:text-sm">
                    <Link href="/vendor-dashboard/guidelines">Exhibition Guidelines</Link>
                  </Button>
                  {currentVendor.paymentStatus === 'unpaid' && (
                    <Button asChild variant="outline" className="w-full text-xs sm:text-sm">
                      <Link href="/vendor-dashboard/payment">Complete Payment</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <p className="text-red-600 text-[10px] sm:text-xs">2 Days of Exhibition</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-blue-800 text-sm sm:text-base mb-1 sm:mb-2">Expected Visitors</h4>
                  <p className="text-blue-700 text-xs sm:text-sm">400+ Entrepreneurs</p>
                  <p className="text-blue-600 text-[10px] sm:text-xs">Business Professionals & Investors</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-green-800 text-sm sm:text-base mb-1 sm:mb-2">Setup Time</h4>
                  <p className="text-green-700 text-xs sm:text-sm">October 3, 2025</p>
                  <p className="text-green-600 text-[10px] sm:text-xs">6:00 PM - 10:00 PM</p>
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
    </VendorDashboardLayout>
  )
}
