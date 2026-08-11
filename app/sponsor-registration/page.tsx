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
import { Handshake, CheckCircle, AlertCircle } from "lucide-react"
import BackToTopButton from "../components/BackToTopButton"
import Link from "next/link"

export default function SponsorRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const createSponsor = useMutation(api.sponsors.createSponsor)

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
      const sponsorId = await createSponsor({
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
        speakerNomination: formData.speakerNomination || undefined,
        networkingPreferences: formData.networkingPreferences || undefined,
        agreeToTerms: formData.agreeToTerms,
        agreeToMarketing: formData.agreeToMarketing,
      })

      console.log("Sponsor created with ID:", sponsorId)
      setSubmitStatus("success")

      // Reset form
      setFormData({
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
        speakerNomination: "",
        networkingPreferences: "",
        agreeToTerms: false,
        agreeToMarketing: false,
      })
    } catch (error) {
      console.error("Sponsor registration error:", error)
      setErrorMessage("Failed to submit sponsor application. Please try again.")
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
                <CardTitle className="text-2xl text-green-700">Application Submitted!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your interest in sponsoring WED 5.0. Our team will contact you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your sponsorship application has been received successfully. Our partnership team will review your application and schedule a follow-up call to finalize your corporate benefits and guide you on the next steps.
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                    <Link href="/login">Login to Your Sponsor Portal</Link>
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
            <Badge className="mb-4 bg-red-600 text-white">WED 5.0 Sponsor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4 text-black">Become a WED 5.0 Sponsor</h1>
            <p className="text-gray-600">
              Invest in Northern Nigeria's premier entrepreneurship platform during our historic 5th Anniversary (October 3–4, 2026).
            </p>
          </div>

          <Card className="bg-white border border-gray-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Handshake className="h-5 w-5 text-red-600" />
                Sponsorship Application Form
              </CardTitle>
              <CardDescription>Complete this form to begin your sponsorship partnership with WED 5.0</CardDescription>

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
                  <h3 className="text-lg font-semibold border-b pb-2 border-red-100 text-black">Organization Details</h3>
                  <div>
                    <Label htmlFor="organizationName" className="text-black">Organization/Company Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
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
                      <Label htmlFor="position" className="text-black">Position/Title *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website" className="text-black">Website URL</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://..."
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organizationType" className="text-black">Organization Type *</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("organizationType", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="corporate">Corporate Organization</SelectItem>
                          <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
                          <SelectItem value="ngo">NGO/Foundation</SelectItem>
                          <SelectItem value="government">Government Agency</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-black">Address *</Label>
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

                {/* Partnership Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 border-red-100 text-black">Sponsorship Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorshipLevel" className="text-black">Sponsorship Tier *</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("sponsorshipLevel", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="platinum">Platinum Tier (₦2,000,000+)</SelectItem>
                          <SelectItem value="gold">Gold Tier (₦1,000,000 – ₦1,999,999)</SelectItem>
                          <SelectItem value="silver">Silver Tier (₦500,000 – ₦999,999)</SelectItem>
                          <SelectItem value="grant-cofunder">Grant Co-Funder (Negotiable)</SelectItem>
                          <SelectItem value="in-kind">In-Kind / Media Partner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sponsorshipAmount" className="text-black">Proposed Investment Amount *</Label>
                      <Input
                        id="sponsorshipAmount"
                        value={formData.sponsorshipAmount}
                        onChange={(e) => handleInputChange("sponsorshipAmount", e.target.value)}
                        placeholder="e.g. ₦1,500,000 or Media coverage"
                        required
                        disabled={isSubmitting}
                        className="bg-white border-gray-300 text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-black">Industry Sector *</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      placeholder="e.g. Finance, Agribusiness, Telecommunications"
                      required
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="marketingObjectives" className="text-black">What are your primary brand/CSR objectives?</Label>
                    <Textarea
                      id="marketingObjectives"
                      value={formData.marketingObjectives}
                      onChange={(e) => handleInputChange("marketingObjectives", e.target.value)}
                      placeholder="e.g. CSR youth empowerment, brand visibility, ecosystem connection"
                      rows={3}
                      disabled={isSubmitting}
                      className="bg-white border-gray-300 text-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="speakerNomination" className="text-black">Do you want to nominate an expert/facilitator for our sector pavilions?</Label>
                    <Input
                      id="speakerNomination"
                      value={formData.speakerNomination}
                      onChange={(e) => handleInputChange("speakerNomination", e.target.value)}
                      placeholder="Name, role, sector expertise"
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
                      I agree to the sponsorship partnership terms *
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
                      I agree to receive event communications
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Complete Sponsorship Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
