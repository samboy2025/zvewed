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
import { User, CheckCircle, AlertCircle } from "lucide-react"
import BackToTopButton from "../components/BackToTopButton"

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  const createRegistration = useMutation(api.registrations.createRegistration)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    city: "",
    state: "",
    category: "",
    experience: "",
    interests: [] as string[],
    expectations: "",
    dietaryRestrictions: "",
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
      const registrationId = await createRegistration({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization || undefined,
        position: formData.position || undefined,
        city: formData.city,
        state: formData.state,
        category: formData.category,
        experience: formData.experience || undefined,
        interests: formData.interests,
        expectations: formData.expectations || undefined,
        dietaryRestrictions: formData.dietaryRestrictions || undefined,
        agreeToTerms: formData.agreeToTerms,
        agreeToMarketing: formData.agreeToMarketing,
      })
      
      console.log("Registration created with ID:", registrationId)
      setSubmitStatus("success")
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        position: "",
        city: "",
        state: "",
        category: "",
        experience: "",
        interests: [],
        expectations: "",
        dietaryRestrictions: "",
        agreeToTerms: false,
        agreeToMarketing: false,
      })
      
    } catch (error) {
      console.error("Registration error:", error)
      setErrorMessage("Failed to submit registration. Please try again.")
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

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const interests = [
    "Financial Management & Economic Resilience",
    "Business Risk Management",
    "Digital Transformation",
    "Supply Chain Optimization",
    "Investment Readiness",
    "Market Research & Analysis",
    "Leadership & Team Management",
    "Export Development",
    "Networking & Partnerships",
    "Legal Compliance",
  ]

  // Success message component
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <BackToTopButton />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700">Registration Successful!</CardTitle>
                <CardDescription className="text-lg">
                  Thank you for registering for WED 4.0. We will contact you soon with further details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your registration has been submitted successfully. You will receive a confirmation email shortly.
                  </p>
                  <Button onClick={() => setSubmitStatus("idle")} className="bg-red-600 hover:bg-red-700">
                    Register Another Participant
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
      <BackToTopButton />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Registration</Badge>
            <h1 className="text-3xl font-bold mb-4">Register for WED 4.0</h1>
            <p className="text-gray-600">Join us for 2 days of learning economic resilience and building sustainable businesses</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Participant Registration Form
              </CardTitle>
              <CardDescription>Please fill out all required fields to complete your registration</CardDescription>
              
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
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Professional Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization/Company</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Title</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
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

                {/* Event-Specific Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Event Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Participant Category *</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aspiring-entrepreneur">Aspiring Entrepreneur</SelectItem>
                          <SelectItem value="established-business">Established Business Owner</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="academic">Academic Professional</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="government">Government Representative</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Entrepreneurship Experience</Label>
                      <Select onValueChange={(value) => handleInputChange("experience", value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No experience</SelectItem>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Areas of Interest (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-2 mt-2">
                      {interests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={interest} className="text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="expectations">What do you hope to gain from WED 4.0?</Label>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => handleInputChange("expectations", e.target.value)}
                      placeholder="Share your expectations and goals for attending this event. How can we help you rebuild, reinvent, and rise?"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Special Requirements</Label>
                    <Input
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                      placeholder="Please specify any dietary restrictions or special needs"
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
                      I agree to the terms and conditions and privacy policy *
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
                      I agree to receive marketing communications about future events
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Registration..." : "Complete Registration for WED 4.0"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
