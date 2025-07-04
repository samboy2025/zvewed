"use client"

import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Phone, MapPin, Globe, Users, Calendar, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { SponsorDashboardLayout } from "../../components/SponsorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrganizationProfile() {
  const router = useRouter()
  const [sponsorData, setSponsorData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    companySize: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    description: '',
    foundedYear: '',
  })

  const updateSponsor = useMutation(api.sponsors.updateSponsor)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      const data = JSON.parse(sponsorData)
      setSponsorData(data)
      // Also ensure it's saved under sponsorData
      localStorage.setItem('sponsorData', JSON.stringify(data))
      setFormData({
        organizationName: data.organizationName || '',
        industry: data.industry || '',
        companySize: data.companySize || '',
        website: data.website || '',
        contactName: data.contactName || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
        country: data.country || '',
        description: data.description || '',
        foundedYear: data.foundedYear || '',
      })
    } else {
      router.push('/sponsor-login')
    }
    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (sponsorData?._id) {
        await updateSponsor({
          sponsorId: sponsorData._id,
          updates: formData
        })
        
        // Update localStorage with both keys
        const updatedData = { ...sponsorData, ...formData }
        localStorage.setItem('sponsorData', JSON.stringify(updatedData))
        localStorage.setItem('currentSponsor', JSON.stringify(updatedData))
        setSponsorData(updatedData)
        
        setIsEditing(false)
        alert('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading sponsor dashboard...</span>
        </div>
      </div>
    )
  }

  if (!sponsorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in as a sponsor to access this dashboard.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/sponsor-login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SponsorDashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Organization Profile</CardTitle>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <Building2 className="mr-2" size={20} />
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="inline mr-1" size={16} />
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline mr-1" size={16} />
                  Founded Year
                </label>
                <input
                  type="number"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe className="inline mr-1" size={16} />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="https://www.example.com"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  placeholder="Tell us about your company..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline mr-1" size={16} />
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline mr-1" size={16} />
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  // Reset form to original data
                  setFormData({
                    organizationName: sponsorData.organizationName || '',
                    industry: sponsorData.industry || '',
                    companySize: sponsorData.companySize || '',
                    website: sponsorData.website || '',
                    contactName: sponsorData.contactName || '',
                    contactEmail: sponsorData.contactEmail || '',
                    contactPhone: sponsorData.contactPhone || '',
                    address: sponsorData.address || '',
                    city: sponsorData.city || '',
                    state: sponsorData.state || '',
                    zipCode: sponsorData.zipCode || '',
                    country: sponsorData.country || '',
                    description: sponsorData.description || '',
                    foundedYear: sponsorData.foundedYear || '',
                  })
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Save className="mr-2" size={16} />
                Save Changes
              </button>
            </div>
          )}
        </form>
          </CardContent>
        </Card>
      </div>
    </SponsorDashboardLayout>
  )
}
