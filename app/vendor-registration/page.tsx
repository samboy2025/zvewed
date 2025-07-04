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
import { Store, Package, Users, Zap, CheckCircle, AlertCircle } from "lucide-react"

export default function VendorRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  const createVendorRegistration = useMutation(api.vendors.createVendorRegistration)

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
    boothSize: "",
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
      const vendorId = await createVendorRegistration({
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
      
      console.log("Vendor registration created with ID:", vendorId)
      setSubmitStatus("success")
      
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

  // Success message component
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700">Vendor Registration Submitted!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your interest in exhibiting at WED 4.0. We will contact you soon with booth details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your vendor registration has been submitted successfully. We will review your application and contact you with booth assignment and payment details.
                  </p>
                  <Button onClick={() => setSubmitStatus("idle")} className="bg-red-600 hover:bg-red-700">
                    Submit Another Registration
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
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Vendor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4">WED 4.0 Vendor Exhibition Registration</h1>
            <p className="text-gray-600">
              Showcase your products and services to 500+ entrepreneurs and industry professionals at our 2-day event focused on business resilience
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Vendor Registration Form
              </CardTitle>
              <CardDescription>
                Join our WED 4.0 vendor exhibition and connect with potential customers and partners focused on business resilience
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
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Company Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.yourcompany.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Business Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("businessType", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                          <SelectItem value="freelancer">Freelancer/Consultant</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select onValueChange={(value) => handleInputChange("industry", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail/E-commerce</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="marketing">Marketing/Advertising</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                      <Select onValueChange={(value) => handleInputChange("yearsInBusiness", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years in business" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10-plus">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="boothSize">Preferred Booth Size *</Label>
                      <Select onValueChange={(value) => handleInputChange("boothSize", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select booth size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (3m x 2m)</SelectItem>
                          <SelectItem value="medium">Medium (3m x 3m)</SelectItem>
                          <SelectItem value="large">Large (3m x 4m)</SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="productServices">Products/Services Description *</Label>
                    <Textarea
                      id="productServices"
                      value={formData.productServices}
                      onChange={(e) => handleInputChange("productServices", e.target.value)}
                      placeholder="Describe your products or services in detail"
                      rows={3}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="Who is your target audience? What type of customers are you looking for?"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="objectives">Exhibition Objectives</Label>
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) => handleInputChange("objectives", e.target.value)}
                      placeholder="What do you hope to achieve by participating in this exhibition?"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousExperience">Previous Exhibition Experience</Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                      placeholder="Tell us about your previous exhibition experience, if any"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                      placeholder="Any special requirements for your booth (electrical, internet, etc.)"
                      rows={3}
                      disabled={isSubmitting}
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
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the vendor exhibition terms and conditions *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive communications about future exhibitions
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Registration..." : "Submit Vendor Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
