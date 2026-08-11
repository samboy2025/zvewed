"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Store, CheckCircle, AlertCircle } from "lucide-react"
import BackToTopButton from "../components/BackToTopButton"
import Link from "next/link"

export default function VendorRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const createVendor = useMutation(api.vendors.createVendor)

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    businessType: "",
    industry: "",
    yearsInBusiness: "",
    productServices: "",
    targetAudience: "",
    boothSize: "standard", // default to standard
    specialRequirements: "",
    marketingMaterials: "",
    previousExperience: "",
    objectives: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      setErrorMessage("You must agree to the terms and conditions")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const vendorId = await createVendor({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || undefined,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        businessType: formData.businessType,
        industry: formData.industry,
        yearsInBusiness: formData.yearsInBusiness,
        productServices: formData.productServices,
        targetAudience: formData.targetAudience || undefined,
        boothSize: formData.boothSize,
        specialRequirements: formData.specialRequirements || undefined,
        marketingMaterials: formData.marketingMaterials || undefined,
        previousExperience: formData.previousExperience || undefined,
        objectives: formData.objectives || undefined,
        agreeToTerms: formData.agreeToTerms,
        agreeToMarketing: formData.agreeToMarketing,
      })

      console.log("Vendor created with ID:", vendorId)
      setSubmitStatus("success")

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        businessType: "",
        industry: "",
        yearsInBusiness: "",
        productServices: "",
        targetAudience: "",
        boothSize: "standard",
        specialRequirements: "",
        marketingMaterials: "",
        previousExperience: "",
        objectives: "",
        agreeToTerms: false,
        agreeToMarketing: false,
      })
    } catch (error) {
      console.error("Vendor registration error:", error)
      setErrorMessage("Failed to submit vendor registration. Please try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error status when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen py-12 bg-gray-50 text-black">
        <BackToTopButton />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center bg-white border border-gray-100 shadow-xl">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700">Vendor Application Received!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your interest in exhibiting at WED 5.0. We will contact you soon with booth details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your vendor application has been submitted successfully. Our team will review your application and
                    contact you within 48 hours to confirm your booth assignment and guide you on the next steps.
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                    <Link href="/login">Login to Your Vendor Portal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 text-black">
      <BackToTopButton />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-600 text-white">WED 5.0 Vendor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4 text-black">WED 5.0 Vendor Exhibition Registration</h1>
            <p className="text-gray-600">
              Join our WED 5.0 vendor exhibition and connect with potential customers and partners focused on building resilient enterprises.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Event Dates:</strong> October 3–4, 2026 | <strong>Venue:</strong> NAERLS Ultra Modern Hall, ABU Zaria
            </p>
          </div>

          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Store className="h-5 w-5 text-red-600" />
                Exhibitor Application Form
              </CardTitle>
              <CardDescription>
                Expose your business to 400-500 participants across both days of the anniversary edition.
              </CardDescription>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700 text-sm">{errorMessage}</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 border-red-100 text-black">Business Information</h3>
                  <div>
                    <Label htmlFor="companyName" className="text-black">Company/Business Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson" className="text-black">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-black">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-black">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-black">Website/Social Media Link</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://..."
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-black">Business Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-black">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-black">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 border-red-100 text-black">Business Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessType" className="text-black">Type of Business *</Label>
                      <Select onValueChange={(value) => handleInputChange("businessType", value)} disabled={isSubmitting}>
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="retail">Retail/Wholesale</SelectItem>
                          <SelectItem value="manufacturer">Manufacturing</SelectItem>
                          <SelectItem value="service">Service Provider</SelectItem>
                          <SelectItem value="agro">Agribusiness/Food Processing</SelectItem>
                          <SelectItem value="tech">Tech Startup</SelectItem>
                          <SelectItem value="creative">Creative/Media/Fashion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness" className="text-black">Years in Business *</Label>
                      <Select onValueChange={(value) => handleInputChange("yearsInBusiness", value)} disabled={isSubmitting}>
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="more-than-5">More than 5 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-black">Industry Category *</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      placeholder="e.g. Agriculture, Fashion, Technology, Food"
                      required
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="productServices" className="text-black">Description of Products/Services to Exhibit *</Label>
                    <Textarea
                      id="productServices"
                      value={formData.productServices}
                      onChange={(e) => handleInputChange("productServices", e.target.value)}
                      placeholder="What products or services will you showcase at your booth?"
                      required
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetAudience" className="text-black">Who is your target audience?</Label>
                    <Input
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="e.g. Students, youth entrepreneurs, corporate partners"
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                </div>

                {/* Booth Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 border-red-100 text-black">Booth Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="boothSize" className="text-black">Booth Size Preference *</Label>
                      <Select
                        value={formData.boothSize}
                        onValueChange={(value) => handleInputChange("boothSize", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select booth size" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="standard">Standard Booth (₦25,000)</SelectItem>
                          <SelectItem value="premium">Premium Booth (Custom Setup)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="specialRequirements" className="text-black">Special Requirements</Label>
                      <Input
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        placeholder="e.g. Power outlet, extra chairs, near entrance"
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="objectives" className="text-black">What are your primary goals for exhibiting at WED 5.0?</Label>
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) => handleInputChange("objectives", e.target.value)}
                      placeholder="e.g. Direct sales, lead generation, brand awareness"
                      rows={3}
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      required
                      disabled={isSubmitting}
                      className="border-gray-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor="terms" className="text-sm text-black">
                      I agree to the exhibitor terms and conditions *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                      disabled={isSubmitting}
                      className="border-gray-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor="marketing" className="text-sm text-black">
                      I agree to receive communications from the organizers
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Complete Exhibitor Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
