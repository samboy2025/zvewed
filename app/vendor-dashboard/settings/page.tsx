"use client"

import { VendorDashboardLayout } from "../../components/VendorDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings,
  Bell,
  Shield,
  User,
  Mail,
  Phone,
  Globe,
  Key,
  AlertTriangle,
  Check,
  Loader2,
  Info
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VendorSettingsPage() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  // Get vendor data from localStorage
  useEffect(() => {
    const vendorData = localStorage.getItem('currentVendor')
    if (vendorData) {
      setCurrentVendor(JSON.parse(vendorData))
    }
    setIsLoading(false)
  }, [])

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    paymentReminders: true,
    eventReminders: true,
    newsAndUpdates: false,
    marketingEmails: false
  })

  // Security settings
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveNotifications = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      alert("Notification preferences saved successfully!")
    }, 1000)
  }

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert("New passwords do not match!")
      return
    }
    if (security.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }
    
    setIsSaving(true)
    // Simulate password change
    setTimeout(() => {
      setIsSaving(false)
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setShowPasswordFields(false)
      alert("Password changed successfully!")
    }, 1000)
  }

  if (isLoading) {
    return (
      <VendorDashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading settings...</span>
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
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your account preferences and security
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
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-red-600" />
                    Account Information
                  </CardTitle>
                  <CardDescription>
                    Your vendor account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Company Name</Label>
                      <p className="font-medium">{currentVendor.companyName}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Contact Person</Label>
                      <p className="font-medium">{currentVendor.contactPerson}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <p className="font-medium">{currentVendor.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="font-medium">{currentVendor.phone}</p>
                      </div>
                    </div>
                    {currentVendor.website && (
                      <div>
                        <Label className="text-sm text-gray-500">Website</Label>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a href={currentVendor.website} target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 hover:text-red-700">
                            {currentVendor.website}
                          </a>
                        </div>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm text-gray-500">Vendor ID</Label>
                      <p className="font-mono text-sm">{currentVendor._id?.slice(-8).toUpperCase() || 'VEN123'}</p>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      To update your account information, please visit your <Link href="/vendor-dashboard/profile" className="text-red-600 hover:text-red-700 font-medium">Company Profile</Link> page.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-red-600" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Registration Date</Label>
                      <p className="font-medium">
                        {new Date(currentVendor.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Event</Label>
                      <p className="font-medium">WED 4.0</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Application Status</Label>
                      <p className="font-medium capitalize">{currentVendor.status}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Payment Status</Label>
                      <p className="font-medium capitalize">{currentVendor.paymentStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-red-600" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailUpdates" className="font-medium">Email Updates</Label>
                        <p className="text-sm text-gray-500">Receive important updates via email</p>
                      </div>
                      <Switch
                        id="emailUpdates"
                        checked={notifications.emailUpdates}
                        onCheckedChange={() => handleNotificationChange('emailUpdates')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="smsAlerts" className="font-medium">SMS Alerts</Label>
                        <p className="text-sm text-gray-500">Get text messages for urgent updates</p>
                      </div>
                      <Switch
                        id="smsAlerts"
                        checked={notifications.smsAlerts}
                        onCheckedChange={() => handleNotificationChange('smsAlerts')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="paymentReminders" className="font-medium">Payment Reminders</Label>
                        <p className="text-sm text-gray-500">Notifications about payment deadlines</p>
                      </div>
                      <Switch
                        id="paymentReminders"
                        checked={notifications.paymentReminders}
                        onCheckedChange={() => handleNotificationChange('paymentReminders')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="eventReminders" className="font-medium">Event Reminders</Label>
                        <p className="text-sm text-gray-500">Important dates and deadlines</p>
                      </div>
                      <Switch
                        id="eventReminders"
                        checked={notifications.eventReminders}
                        onCheckedChange={() => handleNotificationChange('eventReminders')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="newsAndUpdates" className="font-medium">News & Updates</Label>
                        <p className="text-sm text-gray-500">Latest news about WED events</p>
                      </div>
                      <Switch
                        id="newsAndUpdates"
                        checked={notifications.newsAndUpdates}
                        onCheckedChange={() => handleNotificationChange('newsAndUpdates')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="marketingEmails" className="font-medium">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Promotional offers and opportunities</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notifications.marketingEmails}
                        onCheckedChange={() => handleNotificationChange('marketingEmails')}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={handleSaveNotifications}
                      disabled={isSaving}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Login Information */}
                  <div>
                    <h3 className="font-medium mb-3">Login Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-500">Login Email:</span>
                        <span className="font-medium">{currentVendor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-500">Login Phone:</span>
                        <span className="font-medium">{currentVendor.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-gray-500">Last changed: Never</p>
                      </div>
                      {!showPasswordFields && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPasswordFields(true)}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                      )}
                    </div>

                    {showPasswordFields && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={security.currentPassword}
                            onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={security.newPassword}
                            onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                          />
                          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleChangePassword}
                            disabled={isSaving}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isSaving ? 'Updating...' : 'Update Password'}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowPasswordFields(false)
                              setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" })
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Coming Soon</AlertTitle>
                    <AlertDescription>
                      Two-factor authentication will be available in a future update for enhanced security.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      These actions are permanent and cannot be undone.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                    <p className="text-sm text-gray-500">
                      Temporarily disable your account. You can reactivate it by logging in again.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
