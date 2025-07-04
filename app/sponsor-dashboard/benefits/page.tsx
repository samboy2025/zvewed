"use client"

import React, { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Gift, Crown, Star, Trophy, Award, CheckCircle, Loader2 } from 'lucide-react'
import { SponsorDashboardLayout } from "../../components/SponsorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function BenefitsPage() {
  const router = useRouter()
  const [sponsorData, setSponsorData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      const data = JSON.parse(sponsorData)
      setSponsorData(data)
      // Also ensure it's saved under sponsorData
      localStorage.setItem('sponsorData', JSON.stringify(data))
    } else {
      router.push('/sponsor-login')
    }
    setIsLoading(false)
  }, [router])

  // Benefits data based on sponsorship levels
  const benefitsByLevel = {
    'Platinum': {
      icon: Crown,
      color: 'red',
      benefits: [
        'Premium logo placement on all event materials',
        'VIP table for 10 guests at the event',
        'Keynote speaking opportunity (15 minutes)',
        'Full-page advertisement in event brochure',
        'Logo on event website homepage',
        'Social media mentions (minimum 20 posts)',
        'Exhibition booth in prime location',
        'Access to attendee contact list',
        'Post-event report with analytics',
        'First right of renewal for next year'
      ]
    },
    'Gold': {
      icon: Trophy,
      color: 'yellow',
      benefits: [
        'Logo placement on event materials',
        'VIP table for 6 guests at the event',
        'Speaking opportunity (10 minutes)',
        'Half-page advertisement in event brochure',
        'Logo on event website',
        'Social media mentions (minimum 10 posts)',
        'Exhibition booth',
        'Access to event photos',
        'Post-event summary report'
      ]
    },
    'Silver': {
      icon: Star,
      color: 'gray',
      benefits: [
        'Logo on select event materials',
        'Reserved seating for 4 guests',
        'Quarter-page advertisement in brochure',
        'Logo on sponsors page of website',
        'Social media mentions (minimum 5 posts)',
        'Standard exhibition space',
        'Event photos access'
      ]
    },
    'Bronze': {
      icon: Award,
      color: 'orange',
      benefits: [
        'Logo on event backdrop',
        'Reserved seating for 2 guests',
        'Logo listing in event brochure',
        'Logo on sponsors page of website',
        'Social media mention',
        'Certificate of sponsorship'
      ]
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

  const currentLevel = sponsorData.sponsorshipLevel
  const levelData = benefitsByLevel[currentLevel as keyof typeof benefitsByLevel] || benefitsByLevel['Bronze']
  const IconComponent = levelData.icon

  return (
    <SponsorDashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Gift className="mr-2" size={24} />
              Sponsorship Benefits
            </CardTitle>
            <p className="text-gray-600 mt-2">
              As a {currentLevel} sponsor, you're entitled to the following exclusive benefits:
            </p>
          </CardHeader>
          <CardContent>

        {/* Current Level Display */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <IconComponent className="text-red-600 mr-3" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentLevel} Sponsor</h2>
                <p className="text-gray-600">Premium Partnership Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Benefits Include:</h3>
          {levelData.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How to Maximize Your Benefits:</h4>
          <ul className="list-disc ml-5 space-y-1 text-sm text-blue-800">
            <li>Submit your company logo in high resolution (PNG/SVG format)</li>
            <li>Provide marketing materials at least 2 weeks before the event</li>
            <li>Confirm your guest list 1 week prior to the event</li>
            <li>Coordinate with our team for booth setup and requirements</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-6 text-center py-4">
          <p className="text-gray-600">
            Have questions about your benefits? Contact our sponsorship team at{' '}
            <a href="mailto:sponsors@wed3.com" className="text-red-600 hover:text-red-700 font-medium">
              sponsors@wed3.com
            </a>
          </p>
        </div>
          </CardContent>
        </Card>
      </div>
    </SponsorDashboardLayout>
  )
}
