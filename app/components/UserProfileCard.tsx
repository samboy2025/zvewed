"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit3, Save, X, User, Mail, Phone, Building2, MapPin, Camera, Loader2 } from "lucide-react"
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
  imageUrl?: string
}

interface UserProfileCardProps {
  userData: UserData
  onUpdate?: () => void
}

export function UserProfileCard({ userData, onUpdate }: UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(userData.imageUrl || null)
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
  const updateProfileImage = useMutation(api.users.updateProfileImage)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview image locally
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setIsUploadingImage(true);
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
        // Update profile image in database
        await updateProfileImage({
          userId: userData._id as any,
          imageUrl: data.secure_url,
        });

        setPreviewImage(data.secure_url);
        
        // Update localStorage with new image URL
        const currentUserData = localStorage.getItem('currentUser');
        if (currentUserData) {
          const parsedData = JSON.parse(currentUserData);
          parsedData.imageUrl = data.secure_url;
          localStorage.setItem('currentUser', JSON.stringify(parsedData));
        }
        
        onUpdate?.();
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
      setPreviewImage(userData.imageUrl || null);
    } finally {
      setIsUploadingImage(false);
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        userId: userData._id as any,
        ...formData
      })
      
      // Update localStorage
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const parsedData = JSON.parse(currentUserData);
        Object.assign(parsedData, formData);
        localStorage.setItem('currentUser', JSON.stringify(parsedData));
      }
      
      setIsEditing(false)
      onUpdate?.()
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
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
    setPreviewImage(userData.imageUrl || null)
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
          <div className="relative group">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                {getInitials(userData.firstName, userData.lastName)}
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
                  disabled={isUploadingImage}
                />
                {isUploadingImage ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </label>
            )}

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
                  placeholder="+234 123 456 7890"
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

        {/* Professional Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 border-b pb-2">
            Professional Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization</Label>
              {isEditing ? (
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Your company or organization"
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span>{userData.organization || 'Not provided'}</span>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="position">Position</Label>
              {isEditing ? (
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Your job title"
                />
              ) : (
                <div className="py-2">
                  <span>{userData.position || 'Not provided'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              {isEditing ? (
                <Select onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
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
                  <span>{userData.industry || 'Not provided'}</span>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              {isEditing ? (
                <Select onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="py-2">
                  <span>{userData.experience || 'Not provided'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              {isEditing ? (
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Your city"
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{userData.city || 'Not provided'}</span>
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
                  placeholder="Your state"
                />
              ) : (
                <div className="py-2">
                  <span>{userData.state || 'Not provided'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio">Professional Bio</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          ) : (
            <div className="py-2">
              <p className="text-gray-600">{userData.bio || 'No bio provided'}</p>
            </div>
          )}
        </div>

        {/* Website */}
        <div>
          <Label htmlFor="website">Website</Label>
          {isEditing ? (
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.yourwebsite.com"
            />
          ) : (
            <div className="py-2">
              {userData.website ? (
                <a 
                  href={userData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 underline"
                >
                  {userData.website}
                </a>
              ) : (
                <span className="text-gray-500">Not provided</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
