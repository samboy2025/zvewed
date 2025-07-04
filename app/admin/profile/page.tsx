"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  MapPin, 
  Globe, 
  Camera,
  Save,
  Loader2
} from "lucide-react"

export default function AdminProfile() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    city: "",
    state: "",
    bio: "",
    website: "",
    imageUrl: ""
  })

  const updateProfile = useMutation(api.admin.updateAdminProfile)

  // Load current user data
  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (!userData) {
      router.push('/login')
      return
    }

    const user = JSON.parse(userData)
    if (user.userType !== 'admin') {
      router.push('/unauthorized')
      return
    }

    setCurrentUser(user)
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      organization: user.organization || "",
      position: user.position || "",
      city: user.city || "",
      state: user.state || "",
      bio: user.bio || "",
      website: user.website || "",
      imageUrl: user.imageUrl || ""
    })
  }, [router])

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      uploadFormData.append('folder', 'admin_profiles')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      )

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }))
      
      // Update the image immediately in the database
      await updateProfile({
        userId: currentUser._id,
        firstName: formData.firstName || currentUser.firstName,
        lastName: formData.lastName || currentUser.lastName,
        email: formData.email || currentUser.email,
        phone: formData.phone,
        organization: formData.organization,
        position: formData.position,
        city: formData.city,
        state: formData.state,
        bio: formData.bio,
        website: formData.website,
        imageUrl: data.secure_url
      })
      
      // Update localStorage with the new image URL
      const updatedUser = { ...currentUser, imageUrl: data.secure_url }
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      
      toast.success("Profile picture uploaded successfully")
    } catch (error) {
      console.error('Upload error:', error)
      toast.error("Failed to upload profile picture")
    } finally {
      setUploadingImage(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update profile in database
      await updateProfile({
        userId: currentUser._id,
        ...formData
      })

      // Update localStorage
      const updatedUser = { ...currentUser, ...formData }
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error('Update error:', error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Generate initials for avatar fallback
  const getInitials = () => {
    return `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase()
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your admin profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your profile photo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.imageUrl} alt={`${formData.firstName} ${formData.lastName}`} />
                <AvatarFallback className="bg-red-100 text-red-700 text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="profile-upload"
                />
                <Label htmlFor="profile-upload">
                  <Button 
                    type="button" 
                    variant="outline" 
                    disabled={uploadingImage}
                    asChild
                  >
                    <span>
                      {uploadingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Change Photo
                        </>
                      )}
                    </span>
                  </Button>
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="inline h-4 w-4 mr-1" />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="inline h-4 w-4 mr-1" />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled // Email shouldn't be changeable
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Update your work details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organization">
                  <Building className="inline h-4 w-4 mr-1" />
                  Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">
                  <Briefcase className="inline h-4 w-4 mr-1" />
                  Position
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">
                <Globe className="inline h-4 w-4 mr-1" />
                Website
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || uploadingImage}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
