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
import { Crown, Award, Medal, Building, Target, Handshake, CheckCircle, AlertCircle } from "lucide-react"

export default function SponsorRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  const createSponsorRegistration = useMutation(api.sponsors.createSponsorRegistration)

  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    position: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    organizationType: "",
    industry: "",
    sponsorshipLevel: "",
    sponsorshipAmount: "",
    marketingObjectives: "",
    targetAudience: "",
    previousSponsorship: "",
    specialRequests: "",
    logoFile: "",
    marketingMaterials: "",
    speakerNomination: "",
    networkingPreferences: "",
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
      const sponsorId = await createSponsorRegistration({
        organizationName: formData.organizationName,
        contactPerson: formData.contactPerson,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || undefined,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        organizationType: formData.organizationType,
        industry: formData.industry,
        sponsorshipLevel: formData.sponsorshipLevel,
        sponsorshipAmount: formData.sponsorshipAmount,
        marketingObjectives: formData.marketingObjectives || undefined,
        targetAudience: formData.targetAudience || undefined,
        previousSponsorship: formData.previousSponsorship || undefined,
        specialRequests: formData.specialRequests || undefined,
        logoFile: formData.logoFile || undefined,
        marketingMaterials: formData.marketingMaterials || undefined,
        speakerNomination: formData.speakerNomination || undefined,
        networkingPreferences: formData.networkingPreferences || undefined,
        agreeToTerms: formData.agreeToTerms,
        agreeToMarketing: formData.agreeToMarketing,
      })
      
      console.log("Sponsor registration created with ID:", sponsorId)
      setSubmitStatus("success")
      
    } catch (error) {
      console.error("Sponsor registration error:", error)
      setErrorMessage("Failed to submit sponsorship application. Please try again.")
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

  const sponsorshipLevels = [
    {
      value: "platinum",
      label: "Platinum Sponsor",
      amount: "₦1,000,000+",
      icon: Crown,
      color: "text-purple-600",
      benefits: ["Logo on all materials", "Full booth", "Speaking slot"],
    },
    {
      value: "gold",
      label: "Gold Sponsor",
      amount: "₦500,000 – ₦999,999",
      icon: Award,
      color: "text-yellow-600",
      benefits: ["Logo visibility", "Booth space", "Media recognition"],
    },
    {
      value: "silver",
      label: "Silver Sponsor",
      amount: "₦250,000 – ₦499,999",
      icon: Medal,
      color: "text-gray-600",
      benefits: ["Social media mention", "Branded materials", "Program recognition"],
    },
    {
      value: "in-kind",
      label: "In-Kind Partner",
      amount: "Value-based",
      icon: Handshake,
      color: "text-blue-600",
      benefits: ["Provide services/products", "Customized branding benefits", "Official partnership recognition"],
    },
  ]

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
                <CardTitle className="text-2xl text-green-700">Sponsorship Application Submitted!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your interest in sponsoring WED 4.0. Our team will contact you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your sponsorship application has been submitted successfully. We will review your application and contact you with next steps.
                  </p>
                  <Button onClick={() => setSubmitStatus("idle")} className="bg-red-600 hover:bg-red-700">
                    Submit Another Application
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
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Sponsor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4">Become a WED 4.0 Sponsor</h1>
            <p className="text-gray-600">Partner with us to empower entrepreneurs to rebuild, reinvent, and rise through economic challenges</p>
          </div>

          {/* Sponsorship Levels Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-sm">Platinum Sponsor</CardTitle>
                <CardDescription className="font-bold text-lg text-gray-900">₦1,000,000+</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Logo on all materials</li>
                  <li>• Full booth</li>
                  <li>• Speaking slot</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-sm">Gold Sponsor</CardTitle>
                <CardDescription className="font-bold text-lg text-gray-900">₦500k – ₦999k</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Logo visibility</li>
                  <li>• Booth space</li>
                  <li>• Media recognition</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <Medal className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-sm">Silver Sponsor</CardTitle>
                <CardDescription className="font-bold text-lg text-gray-900">₦250k – ₦499k</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Social media mention</li>
                  <li>• Branded materials</li>
                  <li>• Program recognition</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader className="pb-2">
                <Handshake className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-sm">In-Kind Partner</CardTitle>
                <CardDescription className="font-bold text-lg text-gray-900">Services/Goods</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Provide services</li>
                  <li>• Customized benefits</li>
                  <li>• Partnership recognition</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Sponsorship Application Form
              </CardTitle>
              <CardDescription>Complete this form to begin your sponsorship partnership with WED 4.0</CardDescription>
              
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
                {/* Organization Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Organization Information
                  </h3>
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Primary Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Title *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
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
                      placeholder="https://www.yourorganization.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Organization Address *</Label>
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("organizationType", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                          <SelectItem value="government">Government Agency</SelectItem>
                          <SelectItem value="educational">Educational Institution</SelectItem>
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
                          <SelectItem value="finance">Finance/Banking</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail/Commerce</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="telecommunications">Telecommunications</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Sponsorship Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Sponsorship Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorshipLevel">Sponsorship Level *</Label>
                      <Select onValueChange={(value) => handleInputChange("sponsorshipLevel", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsorship level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">Platinum Sponsor (₦1,000,000+)</SelectItem>
                          <SelectItem value="gold">Gold Sponsor (₦500,000 – ₦999,999)</SelectItem>
                          <SelectItem value="silver">Silver Sponsor (₦250,000 – ₦499,999)</SelectItem>
                          <SelectItem value="in-kind">In-Kind Partner (Services/Goods)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sponsorshipAmount">Sponsorship Amount *</Label>
                      <Input
                        id="sponsorshipAmount"
                        value={formData.sponsorshipAmount}
                        onChange={(e) => handleInputChange("sponsorshipAmount", e.target.value)}
                        placeholder="e.g., ₦500,000 or Services valued at ₦300,000"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="marketingObjectives">Marketing Objectives</Label>
                    <Textarea
                      id="marketingObjectives"
                      value={formData.marketingObjectives}
                      onChange={(e) => handleInputChange("marketingObjectives", e.target.value)}
                      placeholder="What are your primary marketing objectives for this sponsorship?"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="Who is your target audience? How can we help you reach them?"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousSponsorship">Previous Sponsorship Experience</Label>
                    <Textarea
                      id="previousSponsorship"
                      value={formData.previousSponsorship}
                      onChange={(e) => handleInputChange("previousSponsorship", e.target.value)}
                      placeholder="Tell us about your previous sponsorship experiences, if any"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Any special requests, requirements, or additional services you need?"
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
                      I agree to the sponsorship terms and conditions *
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
                      I agree to receive communications about sponsorship opportunities
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Sponsorship Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
