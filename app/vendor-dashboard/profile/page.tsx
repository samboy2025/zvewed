"use client"

import { VendorDashboardLayout } from "../../components/VendorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit3, Save, X, Store, Mail, Phone, Globe, MapPin, Package, Loader2, Camera } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

export default function VendorProfilePage() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const updateVendorProfile = useMutation(api.vendors.updateVendorProfile)
  const updateProfileImage = useMutation(api.vendors.updateProfileImage)

  // Get vendor data from localStorage
  useEffect(() => {
    const vendorData = localStorage.getItem('currentVendor')
    if (vendorData) {
      setCurrentVendor(JSON.parse(vendorData))
    }
    setIsLoading(false)
  }, [refreshKey])

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
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
    objectives: "",
    previousExperience: "",
  })

  // Initialize form data when vendor data loads
  useEffect(() => {
    if (currentVendor) {
      setFormData({
        companyName: currentVendor.companyName || '',
        contactPerson: currentVendor.contactPerson || '',
        phone: currentVendor.phone || '',
        website: currentVendor.website || '',
        address: currentVendor.address || '',
        city: currentVendor.city || '',
        state: currentVendor.state || '',
        businessType: currentVendor.businessType || '',
        industry: currentVendor.industry || '',
        yearsInBusiness: currentVendor.yearsInBusiness || '',
        productServices: currentVendor.productServices || '',
        targetAudience: currentVendor.targetAudience || '',
        boothSize: currentVendor.boothSize || '',
        specialRequirements: currentVendor.specialRequirements || '',
        objectives: currentVendor.objectives || '',
        previousExperience: currentVendor.previousExperience || '',
      })
    }
  }, [currentVendor])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateVendorProfile({
        vendorId: currentVendor._id as any,
        ...formData
      })
      
      // Update localStorage with new data
      const updatedVendor = { ...currentVendor, ...formData }
      localStorage.setItem('currentVendor', JSON.stringify(updatedVendor))
      
      setIsEditing(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Failed to update vendor profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (currentVendor) {
      setFormData({
        companyName: currentVendor.companyName || '',
        contactPerson: currentVendor.contactPerson || '',
        phone: currentVendor.phone || '',
        website: currentVendor.website || '',
        address: currentVendor.address || '',
        city: currentVendor.city || '',
        state: currentVendor.state || '',
        businessType: currentVendor.businessType || '',
        industry: currentVendor.industry || '',
        yearsInBusiness: currentVendor.yearsInBusiness || '',
        productServices: currentVendor.productServices || '',
        targetAudience: currentVendor.targetAudience || '',
        boothSize: currentVendor.boothSize || '',
        specialRequirements: currentVendor.specialRequirements || '',
        objectives: currentVendor.objectives || '',
        previousExperience: currentVendor.previousExperience || '',
      })
    }
    setIsEditing(false)
  }

  const getInitials = (companyName: string) => {
    if (typeof companyName !== 'string' || companyName.length === 0) {
      return "C"; // Return a default initial if company name is invalid
    }
    return companyName.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        await updateProfileImage({
          vendorId: currentVendor._id as any,
          imageUrl: data.secure_url,
        });

        const updatedVendor = { ...currentVendor, imageUrl: data.secure_url };
        setCurrentVendor(updatedVendor);
        localStorage.setItem('currentVendor', JSON.stringify(updatedVendor));
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    }
  }

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading vendor profile...</span>
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
              Company Profile
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your company information and exhibition details
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/vendor-dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 space-y-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Company Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-red-600" />
                Company Information
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={currentVendor.status === 'approved' ? 'default' : 'secondary'} className="capitalize">
                  {currentVendor.status}
                </Badge>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Company Avatar & Name */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  {currentVendor.imageUrl ? (
                    <img
                      src={currentVendor.imageUrl}
                      alt="Company Logo"
                      className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                      {getInitials(currentVendor.companyName)}
                    </div>
                  )}
                  {/* Upload button overlay */}
                  {isEditing && (
                    <label className="absolute inset-0 w-24 h-24 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Camera className="h-6 w-6 text-white" />
                    </label>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {currentVendor.companyName}
                  </h3>
                  <Badge className="bg-red-600 text-white capitalize px-4 py-2">
                    Vendor - WED 4.0
                  </Badge>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">
                  Company Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    {isEditing ? (
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 py-2">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span>{currentVendor.companyName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    {isEditing ? (
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 py-2">
                        <span>{currentVendor.contactPerson}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-2 py-2 text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{currentVendor.email}</span>
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 py-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{currentVendor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.yourcompany.com"
                    />
                  ) : (
                    <div className="flex items-center gap-2 py-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      {currentVendor.website ? (
                        <a 
                          href={currentVendor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700 underline"
                        >
                          {currentVendor.website}
                        </a>
                      ) : (
                        <span>Not provided</span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Business Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center gap-2 py-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{currentVendor.address}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    ) : (
                      <div className="py-2">
                        <span>{currentVendor.city}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    {isEditing ? (
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                    ) : (
                      <div className="py-2">
                        <span>{currentVendor.state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">
                  Business Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    {isEditing ? (
                      <Select onValueChange={(value) => handleInputChange('businessType', value)}>
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
                    ) : (
                      <div className="py-2 capitalize">
                        <span>{currentVendor.businessType}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    {isEditing ? (
                      <Select onValueChange={(value) => handleInputChange('industry', value)}>
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
                    ) : (
                      <div className="py-2 capitalize">
                        <span>{currentVendor.industry}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    {isEditing ? (
                      <Select onValueChange={(value) => handleInputChange('yearsInBusiness', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10-plus">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="py-2">
                        <span>{currentVendor.yearsInBusiness}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="boothSize">Booth Size</Label>
                    {isEditing ? (
                      <Select onValueChange={(value) => handleInputChange('boothSize', value)}>
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
                    ) : (
                      <div className="py-2 capitalize">
                        <span>{currentVendor.boothSize}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="productServices">Products/Services Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="productServices"
                      value={formData.productServices}
                      onChange={(e) => handleInputChange('productServices', e.target.value)}
                      placeholder="Describe your products or services"
                      rows={3}
                    />
                  ) : (
                    <div className="py-2">
                      <span>{currentVendor.productServices}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="objectives">Exhibition Objectives</Label>
                  {isEditing ? (
                    <Textarea
                      id="objectives"
                      value={formData.objectives}
                      onChange={(e) => handleInputChange('objectives', e.target.value)}
                      placeholder="What do you hope to achieve from this exhibition?"
                      rows={3}
                    />
                  ) : (
                    <div className="py-2">
                      <span>{currentVendor.objectives || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
