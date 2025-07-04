"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit3, Save, X, User, Mail, Phone, Building2, MapPin } from "lucide-react"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

interface UserData {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  organization?: string
  position?: string
  city?: string
  state?: string
  industry?: string
  experience?: string
  bio?: string
  website?: string
  userType: string
  status: string
}

interface UserProfileCardProps {
  userData: UserData
  onUpdate?: () => void
}

export function UserProfileCard({ userData, onUpdate }: UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    phone: userData.phone || '',
    organization: userData.organization || '',
    position: userData.position || '',
    city: userData.city || '',
    state: userData.state || '',
    industry: userData.industry || '',
    experience: userData.experience || '',
    bio: userData.bio || '',
    website: userData.website || '',
  })

  const updateProfile = useMutation(api.users.updateUserProfile)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        userId: userData._id as any,
        ...formData
      })
      setIsEditing(false)
      onUpdate?.()
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      organization: userData.organization || '',
      position: userData.position || '',
      city: userData.city || '',
      state: userData.state || '',
      industry: userData.industry || '',
      experience: userData.experience || '',
      bio: userData.bio || '',
      website: userData.website || '',
    })
    setIsEditing(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-red-600" />
          Profile Information
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={userData.status === 'active' ? 'default' : 'secondary'} className="capitalize">
            {userData.status}
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
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Avatar & Type Badge */}
        <div className="flex flex-col items-center space-y-4">
          {/* Custom Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
              {getInitials(userData.firstName, userData.lastName)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* User Name & Type */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {userData.firstName} {userData.lastName}
            </h3>
            <Badge className="bg-red-600 text-white capitalize px-4 py-2">
              {userData.userType} - WED 4.0
            </Badge>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 border-b pb-2">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{userData.firstName}</span>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{userData.lastName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2 py-2 text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{userData.email}</span>
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
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{userData.phone || 'Not provided'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
