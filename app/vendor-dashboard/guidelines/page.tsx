"use client"

import { VendorDashboardLayout } from "../../components/VendorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Info,
  Download,
  Clock,
  Package,
  Users,
  Camera,
  Volume2,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VendorGuidelinesPage() {
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

  const exhibitionRules = [
    {
      title: "Setup & Dismantling",
      icon: Clock,
      rules: [
        "Setup must be completed by 10:00 PM on October 3rd",
        "No setup or modifications allowed during exhibition hours",
        "Dismantling begins after 6:00 PM on October 5th",
        "All materials must be removed by 10:00 PM on October 5th",
        "Vendors are responsible for cleaning their booth area"
      ]
    },
    {
      title: "Booth Display",
      icon: Package,
      rules: [
        "Displays must stay within allocated booth boundaries",
        "Maximum display height: 2.5 meters",
        "No blocking of neighboring booths or walkways",
        "Company signage must be professional and secure",
        "All electrical equipment must be safety certified"
      ]
    },
    {
      title: "Staff & Conduct",
      icon: Users,
      rules: [
        "Maximum 4 staff members per booth at any time",
        "All staff must wear vendor badges visibly",
        "Professional attire required at all times",
        "Respectful interaction with visitors and other vendors",
        "No aggressive marketing tactics allowed"
      ]
    },
    {
      title: "Marketing & Promotion",
      icon: Volume2,
      rules: [
        "Distribution of materials only within your booth",
        "No loudspeakers or sound systems without approval",
        "Photography allowed only with subject consent",
        "Social media promotion encouraged with #WED4",
        "No disparaging competitors or their products"
      ]
    }
  ]

  const safetyGuidelines = [
    "Keep emergency exits clear at all times",
    "Report any safety hazards immediately",
    "No open flames or hazardous materials",
    "First aid station located at main entrance",
    "Emergency evacuation procedures posted in each hall",
    "Security available 24/7 during the event"
  ]

  const prohibitedItems = [
    "Weapons or dangerous objects",
    "Illegal substances",
    "Live animals (except service animals)",
    "Flammable liquids or gases",
    "Food preparation equipment (unless pre-approved)",
    "Items that may damage the venue"
  ]

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading guidelines...</span>
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
              Exhibition Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Important rules and guidelines for WED 4.0 exhibitors
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
          {/* Important Notice */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Please Read Carefully</AlertTitle>
            <AlertDescription>
              All vendors must comply with these guidelines. Violation may result in removal from the exhibition without refund.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="rules" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-6">
              {/* Exhibition Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exhibitionRules.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <section.icon className="h-5 w-5 text-red-600" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.rules.map((rule, ruleIndex) => (
                          <li key={ruleIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Code of Conduct */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Code of Conduct
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    WED 4.0 is committed to providing a professional and harassment-free experience for everyone.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Professional Behavior</p>
                        <p className="text-sm text-gray-600">Maintain professional conduct at all times</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Respect for Others</p>
                        <p className="text-sm text-gray-600">Treat all participants with respect and courtesy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Fair Competition</p>
                        <p className="text-sm text-gray-600">Compete fairly and ethically with other vendors</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Environmental Responsibility</p>
                        <p className="text-sm text-gray-600">Minimize waste and use eco-friendly materials when possible</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              {/* Safety Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Safety Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {safetyGuidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Prohibited Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Prohibited Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      The following items are strictly prohibited at the venue:
                    </AlertDescription>
                  </Alert>
                  <ul className="space-y-2">
                    {prohibitedItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Event Security</h4>
                      <p className="text-sm text-gray-600">24/7 during event</p>
                      <p className="text-sm font-medium">+234 803 111 2222</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Medical Emergency</h4>
                      <p className="text-sm text-gray-600">First aid available on-site</p>
                      <p className="text-sm font-medium">+234 803 333 4444</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Event Manager</h4>
                      <p className="text-sm text-gray-600">For urgent issues</p>
                      <p className="text-sm font-medium">+234 803 555 6666</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Venue Management</h4>
                      <p className="text-sm text-gray-600">Facility issues</p>
                      <p className="text-sm font-medium">+234 803 777 8888</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              {/* Downloadable Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-600" />
                    Exhibition Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Download important documents for your reference
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Vendor Handbook (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Floor Plan & Booth Layout
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Setup & Dismantling Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Health & Safety Protocols
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Marketing Guidelines
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                    <h4 className="font-medium mb-2">Exhibition Agreement</h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>
                        By participating in WED 4.0, you agree to abide by all rules and guidelines set forth by the organizers.
                      </p>
                      <p>
                        <strong>1. Booth Assignment:</strong> Booth assignments are final and non-transferable. Changes may only be made by event management.
                      </p>
                      <p>
                        <strong>2. Payment:</strong> Full payment must be received before booth setup. No refunds after September 1, 2025.
                      </p>
                      <p>
                        <strong>3. Liability:</strong> Vendors are responsible for their own property. Event organizers are not liable for loss or damage.
                      </p>
                      <p>
                        <strong>4. Insurance:</strong> Vendors are encouraged to obtain their own insurance coverage for the event.
                      </p>
                      <p>
                        <strong>5. Compliance:</strong> Failure to comply with guidelines may result in removal without refund.
                      </p>
                    </div>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      You agreed to these terms during registration. For questions, contact legal@wed4.com
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
