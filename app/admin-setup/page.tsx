"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield,
  Check,
  AlertCircle,
  Users,
  Key,
  Database,
  Loader2
} from "lucide-react"

export default function AdminSetupPage() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const seedAdmin = useMutation(api.seedAdmin.seedAdminUser)
  const clearData = useMutation(api.seedAdmin.clearAllData)

  const handleSeedAdmin = async () => {
    setIsSeeding(true)
    setError(null)
    try {
      const result = await seedAdmin()
      setSeedResult(result)
    } catch (err: any) {
      setError(err.message || "Failed to seed admin data")
    } finally {
      setIsSeeding(false)
    }
  }

  const handleClearData = async () => {
    if (!confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      return
    }
    
    setIsSeeding(true)
    setError(null)
    try {
      await clearData()
      setSeedResult(null)
      alert("All data cleared successfully")
    } catch (err: any) {
      setError(err.message || "Failed to clear data")
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Setup</h1>
          <p className="text-gray-600 mt-2">
            Initialize admin accounts and sample data for WED 4.0
          </p>
        </div>

        {/* Setup Card */}
        <Card>
          <CardHeader>
            <CardTitle>Database Seeder</CardTitle>
            <CardDescription>
              Create admin accounts and populate sample data for testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Result */}
            {seedResult && (
              <div className="space-y-4">
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>{seedResult.message}</AlertDescription>
                </Alert>

                {/* Admin Credentials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Admin Login Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {seedResult.adminUsers?.map((admin: any, index: number) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">{admin.role}</h4>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Email:</span>{" "}
                              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                                {admin.email}
                              </code>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Password:</span>{" "}
                              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                                {admin.password}
                              </code>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Test User Credentials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Test User Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {seedResult.testUsers?.map((user: any, index: number) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">{user.role}</h4>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Email:</span>{" "}
                              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                                {user.email}
                              </code>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Password:</span>{" "}
                              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                                {user.password}
                              </code>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSeedAdmin}
                disabled={isSeeding}
                className="flex-1"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Seeding...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Seed Admin Data
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleClearData}
                disabled={isSeeding}
                variant="destructive"
                className="flex-1"
              >
                Clear All Data
              </Button>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> Run the seed function to create admin accounts and sample data. 
                The "Clear All Data" button will remove all users, payments, and events from the database.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Login Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" asChild>
                <a href="/login">User Login</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/admin-login">Admin Login</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
