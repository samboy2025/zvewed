"use client"

import React, { useState, useEffect } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Settings, Bell, Shield, Key, Save, LogOut, Loader2 } from 'lucide-react'
import { SponsorDashboardLayout } from "../../components/SponsorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [sponsorData, setSponsorData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    publicProfile: true,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const updateSettings = useMutation(api.sponsors.updateSettings)
  const updatePassword = useMutation(api.sponsors.updatePassword)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      const data = JSON.parse(sponsorData)
      setSponsorData(data)
      // Also ensure it's saved under sponsorData
      localStorage.setItem('sponsorData', JSON.stringify(data))
      // Load saved settings if available
      if (data.settings) {
        setSettings(data.settings)
      }
    } else {
      router.push('/sponsor-login')
    }
    setIsLoading(false)
  }, [router])

  const handleSettingChange = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof settings]
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const saveSettings = async () => {
    try {
      if (sponsorData?._id) {
        await updateSettings({
          sponsorId: sponsorData._id,
          settings: settings
        })
        
        // Update localStorage with both keys
        const updatedData = { ...sponsorData, settings }
        localStorage.setItem('sponsorData', JSON.stringify(updatedData))
        localStorage.setItem('currentSponsor', JSON.stringify(updatedData))
        
        alert('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    try {
      if (sponsorData?._id) {
        await updatePassword({
          sponsorId: sponsorData._id,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
        
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        
        alert('Password updated successfully!')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      alert('Failed to update password')
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('sponsorData')
    localStorage.removeItem('currentSponsor')
    router.push('/login')
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
            <CardTitle className="text-2xl flex items-center">
              <Settings className="mr-2" size={24} />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>

        {/* Notification Settings */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Bell className="mr-2" size={20} />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleSettingChange('emailNotifications')}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">SMS Notifications</span>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleSettingChange('smsNotifications')}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Marketing Emails</span>
              <input
                type="checkbox"
                checked={settings.marketingEmails}
                onChange={() => handleSettingChange('marketingEmails')}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            Security
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Two-Factor Authentication</span>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleSettingChange('twoFactorAuth')}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Privacy</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Public Profile</span>
              <input
                type="checkbox"
                checked={settings.publicProfile}
                onChange={() => handleSettingChange('publicProfile')}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
            </label>
          </div>
        </div>

        {/* Password Change */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Key className="mr-2" size={20} />
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={saveSettings}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Save className="mr-2" size={16} />
            Save Settings
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <LogOut className="mr-2" size={16} />
            Sign Out
          </button>
        </div>
          </CardContent>
        </Card>
      </div>
    </SponsorDashboardLayout>
  )
}
