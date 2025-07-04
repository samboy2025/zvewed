"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const unifiedLogin = useMutation(api.auth.unifiedLogin);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const phone = formData.get("phone") as string;

    try {
      const result = await unifiedLogin({ phone });
      
      if (result.type === "user") {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify(result.data));
        
        // Redirect based on user type
        if (result.data.userType === "admin") {
          window.location.href = "/admin"
        } else if (result.data.userType === "vendor") {
          // Also store as currentVendor for vendor dashboard
          localStorage.setItem('currentVendor', JSON.stringify(result.data));
          window.location.href = "/vendor-dashboard"
        } else if (result.data.userType === "sponsor") {
          // Also store as currentSponsor for sponsor dashboard
          localStorage.setItem('currentSponsor', JSON.stringify(result.data));
          localStorage.setItem('sponsorData', JSON.stringify(result.data));
          window.location.href = "/sponsor-dashboard"
        } else {
          // Participants and other user types go to regular dashboard
          window.location.href = "/dashboard"
        }
      } else if (result.type === "vendor") {
        // Store vendor data in localStorage
        localStorage.setItem('currentVendor', JSON.stringify(result.data));
        window.location.href = "/vendor-dashboard"
      } else if (result.type === "sponsor") {
        // Store sponsor data in localStorage with both keys for compatibility
        localStorage.setItem('currentSponsor', JSON.stringify(result.data));
        localStorage.setItem('sponsorData', JSON.stringify(result.data));
        window.location.href = "/sponsor-dashboard"
      }
    } catch (error) {
      console.error(error);
      alert("Phone number not found. Please check your phone number or register first.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4 relative">
      {/* Home Button */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Home className="h-5 w-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>
      
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-4">
            <Link href="/" className="flex justify-center cursor-pointer">
              <Image 
                src="/logo.png" 
                alt="ZVE Logo" 
                width={60} 
                height={60}
                className="h-15 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your registered phone number"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  We'll automatically detect if you're a user, vendor, or sponsor
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-red-600 hover:text-red-500 font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 