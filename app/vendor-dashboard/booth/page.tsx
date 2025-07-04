"use client"

import { VendorDashboardLayout } from "../../components/VendorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Package,
  MapPin,
  Ruler,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Users,
  Zap,
  Loader2,
  Calendar,
  Info
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VendorBoothDetailsPage() {
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

  // Mock booth assignment data based on vendor status
  const getBoothDetails = () => {
    if (!currentVendor || currentVendor.status !== 'approved') {
      return null
    }

    // Generate booth details based on vendor data
    const boothSizes = {
      small: { dimensions: "3m x 2m", area: "6 sqm" },
      medium: { dimensions: "3m x 3m", area: "9 sqm" },
      large: { dimensions: "3m x 4m", area: "12 sqm" },
      custom: { dimensions: "Custom", area: "Varies" }
    }

    const boothSize = boothSizes[currentVendor.boothSize as keyof typeof boothSizes] || boothSizes.medium

    return {
      boothNumber: `B-${Math.floor(Math.random() * 50) + 1}`,
      section: currentVendor.industry === 'technology' ? 'Technology Zone' : 
               currentVendor.industry === 'manufacturing' ? 'Manufacturing Hall' :
               currentVendor.industry === 'services' ? 'Services Pavilion' : 'Main Exhibition Hall',
      size: boothSize.dimensions,
      area: boothSize.area,
      location: "Ground Floor, Main Exhibition Hall",
      setupDate: "October 3, 2025",
      setupTime: "6:00 PM - 10:00 PM",
      eventDates: "October 4-5, 2025",
      eventTime: "9:00 AM - 6:00 PM daily",
      includes: [
        "1 table (180cm x 75cm)",
        "2 chairs",
        "Company name board",
        "1 power socket (220V)",
        "Basic lighting",
        "Wi-Fi access"
      ],
      additionalServices: [
        { name: "Extra table", price: "₦5,000" },
        { name: "Extra chair", price: "₦2,500" },
        { name: "Banner stand", price: "₦10,000" },
        { name: "TV/Monitor rental", price: "₦25,000" },
        { name: "Additional power socket", price: "₦5,000" }
      ]
    }
  }

  const boothDetails = getBoothDetails()

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading booth details...</span>
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
              Booth Details
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Your exhibition booth information and setup details
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
          {currentVendor.status !== 'approved' ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Booth Assignment Pending</AlertTitle>
              <AlertDescription>
                Your booth will be assigned once your vendor application is approved and payment is confirmed.
                Current status: <Badge className="ml-2" variant="secondary">{currentVendor.status}</Badge>
              </AlertDescription>
            </Alert>
          ) : (
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="setup">Setup Info</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Booth Assignment Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-red-600" />
                      Your Booth Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Booth Number</p>
                          <p className="text-2xl font-bold text-red-600">{boothDetails?.boothNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Section</p>
                          <p className="font-medium">{boothDetails?.section}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="font-medium flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {boothDetails?.location}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Booth Size</p>
                          <p className="font-medium flex items-center gap-1">
                            <Ruler className="h-4 w-4 text-gray-400" />
                            {boothDetails?.size} ({boothDetails?.area})
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Business Type</p>
                          <p className="font-medium capitalize">{currentVendor.businessType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Industry</p>
                          <p className="font-medium capitalize">{currentVendor.industry}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Included in Your Booth
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {boothDetails?.includes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-600 rounded-full" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentVendor.specialRequirements && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Special Requirements</AlertTitle>
                        <AlertDescription>
                          {currentVendor.specialRequirements}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Floor Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      Exhibition Floor Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Interactive floor plan will be available soon</p>
                      <Button variant="outline" disabled>
                        <Download className="h-4 w-4 mr-2" />
                        Download Floor Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="setup" className="space-y-6">
                {/* Setup Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-red-600" />
                      Setup Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Setup Day</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Date:</span>
                            <span>{boothDetails?.setupDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Time:</span>
                            <span>{boothDetails?.setupTime}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Exhibition Days</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Dates:</span>
                            <span>{boothDetails?.eventDates}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Time:</span>
                            <span>{boothDetails?.eventTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important Setup Guidelines</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          <li>All booth setup must be completed by 10:00 PM on October 3rd</li>
                          <li>Bring your vendor badge for entry (available at registration desk)</li>
                          <li>No setup allowed during exhibition hours</li>
                          <li>Dismantling begins after 6:00 PM on October 5th</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Setup Checklist */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-600" />
                      Setup Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Company banner/signage",
                        "Product samples/displays",
                        "Business cards and brochures",
                        "Demonstration equipment",
                        "Extension cords (if needed)",
                        "Marketing materials",
                        "Staff badges/uniforms",
                        "Payment terminal (if applicable)"
                      ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{item}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                {/* Additional Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-red-600" />
                      Additional Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Enhance your booth with additional services. Contact us to add these to your package.
                    </p>
                    <div className="space-y-3">
                      {boothDetails?.additionalServices.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <span className="font-medium">{service.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-red-600">{service.price}</span>
                            <Button size="sm" variant="outline">Request</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Support Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-red-600" />
                      Exhibition Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        Need assistance with your booth setup or have special requests? Our support team is here to help.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Technical Support</h4>
                        <p className="text-sm text-gray-600 mb-1">For booth setup and technical issues</p>
                        <p className="text-sm font-medium">tech@wed4.com</p>
                        <p className="text-sm font-medium">+234 803 456 7890</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">General Inquiries</h4>
                        <p className="text-sm text-gray-600 mb-1">For general exhibition questions</p>
                        <p className="text-sm font-medium">info@wed4.com</p>
                        <p className="text-sm font-medium">+234 805 678 9012</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
