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
import { Store, Package, Users, Zap } from "lucide-react"

export default function VendorRegistrationPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Vendor registration submitted:", formData)
    alert("Vendor registration submitted successfully! We will contact you soon with booth details.")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-green-500">Vendor Registration</Badge>
            <h1 className="text-3xl font-bold mb-4">Vendor Exhibition Registration</h1>
            <p className="text-gray-600">
              Showcase your products and services to entrepreneurs and industry professionals
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Vendor Registration Form
              </CardTitle>
              <CardDescription>
                Join our vendor exhibition and connect with potential customers and partners
              </CardDescription>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
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
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address *</Label>
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

                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Business Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("businessType", value)}>
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
                      <Select onValueChange={(value) => handleInputChange("industry", value)}>
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
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                    <Select onValueChange={(value) => handleInputChange("yearsInBusiness", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years in business" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="more-than-10">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="productServices">Products/Services Description *</Label>
                    <Textarea
                      id="productServices"
                      value={formData.productServices}
                      onChange={(e) => handleInputChange("productServices", e.target.value)}
                      placeholder="Describe your products or services in detail..."
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience *</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="Describe your target customers and market..."
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Exhibition Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Exhibition Requirements
                  </h3>
                  <div>
                    <Label htmlFor="boothSize">Preferred Booth Size *</Label>
                    <Select onValueChange={(value) => handleInputChange("boothSize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select booth size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (3m x 3m) - ₦25,000</SelectItem>
                        <SelectItem value="premium">Premium (3m x 6m) - ₦45,000</SelectItem>
                        <SelectItem value="corner">Corner Booth (3m x 3m) - ₦35,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                      placeholder="Power outlets, internet, display equipment, etc."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketingMaterials">Marketing Materials to Display</Label>
                    <Textarea
                      id="marketingMaterials"
                      value={formData.marketingMaterials}
                      onChange={(e) => handleInputChange("marketingMaterials", e.target.value)}
                      placeholder="Banners, brochures, product samples, demonstrations, etc."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Event Objectives */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Event Objectives</h3>
                  <div>
                    <Label htmlFor="previousExperience">Previous Exhibition Experience</Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                      placeholder="Describe your experience with trade shows or exhibitions..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="objectives">What do you hope to achieve at WED 3.0? *</Label>
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) => handleInputChange("objectives", e.target.value)}
                      placeholder="Lead generation, brand awareness, partnerships, sales, etc."
                      rows={3}
                      required
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
                      I agree to the vendor terms and conditions, including booth setup guidelines and payment terms *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive marketing communications about future vendor opportunities
                    </Label>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We will review your application within 48 hours</li>
                    <li>• You will receive booth assignment and payment instructions</li>
                    <li>• Setup details will be provided 1 week before the event</li>
                    <li>• Vendor orientation session will be scheduled</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Submit Vendor Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
