"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Crown, Award, Medal, Building, Target, Handshake } from "lucide-react"

export default function SponsorRegistrationPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sponsor registration submitted:", formData)
    alert("Sponsorship application submitted successfully! Our team will contact you within 24 hours.")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const sponsorshipLevels = [
    {
      value: "platinum",
      label: "Platinum Sponsor",
      amount: "₦500,000+",
      icon: Crown,
      color: "text-purple-600",
      benefits: ["Exclusive naming rights", "Speaking opportunities", "Premium booth", "10 tickets"],
    },
    {
      value: "gold",
      label: "Gold Sponsor",
      amount: "₦300,000+",
      icon: Award,
      color: "text-yellow-600",
      benefits: ["Logo placement", "Standard booth", "5 tickets", "Recognition"],
    },
    {
      value: "silver",
      label: "Silver Sponsor",
      amount: "₦150,000+",
      icon: Medal,
      color: "text-gray-600",
      benefits: ["Logo in materials", "2 tickets", "Basic recognition"],
    },
  ]

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-purple-500">Sponsor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4">Become a WED 3.0 Sponsor</h1>
            <p className="text-gray-600">Partner with us to empower entrepreneurs and gain valuable brand exposure</p>
          </div>

          {/* Sponsorship Levels Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {sponsorshipLevels.map((level) => (
              <Card key={level.value} className="text-center">
                <CardHeader className="pb-2">
                  <level.icon className={`h-8 w-8 ${level.color} mx-auto mb-2`} />
                  <CardTitle className="text-sm">{level.label}</CardTitle>
                  <CardDescription className="font-bold text-lg text-gray-900">{level.amount}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-xs text-gray-600 space-y-1">
                    {level.benefits.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Sponsorship Application Form
              </CardTitle>
              <CardDescription>Complete this form to begin your sponsorship partnership with WED 3.0</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Title *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                        required
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
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Organization Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.yourorganization.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Organization Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("organizationType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
                          <SelectItem value="multinational">Multinational Company</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                          <SelectItem value="government">Government Agency</SelectItem>
                          <SelectItem value="financial">Financial Institution</SelectItem>
                          <SelectItem value="educational">Educational Institution</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry Sector *</Label>
                      <Select onValueChange={(value) => handleInputChange("industry", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="banking">Banking & Finance</SelectItem>
                          <SelectItem value="telecommunications">Telecommunications</SelectItem>
                          <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Sponsorship Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Sponsorship Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorshipLevel">Preferred Sponsorship Level *</Label>
                      <Select onValueChange={(value) => handleInputChange("sponsorshipLevel", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsorship level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">Platinum Sponsor (₦500,000+)</SelectItem>
                          <SelectItem value="gold">Gold Sponsor (₦300,000+)</SelectItem>
                          <SelectItem value="silver">Silver Sponsor (₦150,000+)</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sponsorshipAmount">Proposed Sponsorship Amount</Label>
                      <Input
                        id="sponsorshipAmount"
                        value={formData.sponsorshipAmount}
                        onChange={(e) => handleInputChange("sponsorshipAmount", e.target.value)}
                        placeholder="₦ Amount"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="marketingObjectives">Marketing Objectives *</Label>
                    <Textarea
                      id="marketingObjectives"
                      value={formData.marketingObjectives}
                      onChange={(e) => handleInputChange("marketingObjectives", e.target.value)}
                      placeholder="What do you hope to achieve through this sponsorship?"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="Describe your target audience at this event..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Additional Requirements</h3>
                  <div>
                    <Label htmlFor="previousSponsorship">Previous Sponsorship Experience</Label>
                    <Textarea
                      id="previousSponsorship"
                      value={formData.previousSponsorship}
                      onChange={(e) => handleInputChange("previousSponsorship", e.target.value)}
                      placeholder="Describe your experience with event sponsorships..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Custom Requirements</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Any specific requirements or custom sponsorship ideas..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="speakerNomination">Speaker Nomination</Label>
                    <Textarea
                      id="speakerNomination"
                      value={formData.speakerNomination}
                      onChange={(e) => handleInputChange("speakerNomination", e.target.value)}
                      placeholder="Would you like to nominate a speaker from your organization?"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="networkingPreferences">Networking Preferences</Label>
                    <Textarea
                      id="networkingPreferences"
                      value={formData.networkingPreferences}
                      onChange={(e) => handleInputChange("networkingPreferences", e.target.value)}
                      placeholder="Specific networking opportunities you're interested in..."
                      rows={2}
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
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the sponsorship terms and conditions, including payment schedules and deliverables *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive communications about future sponsorship opportunities
                    </Label>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">What Happens Next?</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Our partnerships team will review your application within 24 hours</li>
                    <li>• We'll schedule a call to discuss your specific requirements</li>
                    <li>• A customized sponsorship agreement will be prepared</li>
                    <li>• Marketing materials and logo placement will be coordinated</li>
                    <li>• Event logistics and networking opportunities will be arranged</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Submit Sponsorship Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
