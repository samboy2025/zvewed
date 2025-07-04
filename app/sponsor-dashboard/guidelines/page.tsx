"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, FileText, AlertTriangle, CheckCircle2, Info, HelpCircle, Loader2 } from 'lucide-react'
import { SponsorDashboardLayout } from "../../components/SponsorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function GuidelinesPage() {
  const router = useRouter()
  const [sponsorData, setSponsorData] = useState<any>(null)
  const [activeSection, setActiveSection] = useState('general')
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

  const guidelines = {
    general: {
      title: 'General Guidelines',
      icon: BookOpen,
      items: [
        {
          title: 'Sponsorship Agreement',
          content: 'All sponsors must sign the official sponsorship agreement before any benefits can be activated. The agreement outlines the terms, conditions, and deliverables for both parties.'
        },
        {
          title: 'Payment Terms',
          content: 'Full payment must be received at least 30 days before the event. Late payments may result in reduced benefits or cancellation of sponsorship.'
        },
        {
          title: 'Logo Usage',
          content: 'Sponsor logos must be provided in high-resolution formats (PNG, SVG, or AI). Logos will be used according to the sponsorship level guidelines.'
        },
        {
          title: 'Communication Protocol',
          content: 'All official communications should be directed to the sponsorship team. Response time is typically 24-48 hours during business days.'
        }
      ]
    },
    branding: {
      title: 'Branding Guidelines',
      icon: FileText,
      items: [
        {
          title: 'Logo Specifications',
          content: 'Logos should be provided in vector format with transparent backgrounds. Minimum resolution: 300 DPI for print materials.'
        },
        {
          title: 'Brand Colors',
          content: 'Please provide brand color codes (HEX, RGB, or Pantone) to ensure accurate reproduction across all materials.'
        },
        {
          title: 'Marketing Materials',
          content: 'All marketing materials must be submitted for approval at least 2 weeks before the event. Materials should align with event theme and values.'
        },
        {
          title: 'Social Media',
          content: 'Use official event hashtags and tag the event account in all sponsor-related posts. Maintain professional tone in all communications.'
        }
      ]
    },
    event: {
      title: 'Event Day Guidelines',
      icon: AlertTriangle,
      items: [
        {
          title: 'Setup Time',
          content: 'Booth setup begins at 6:00 AM on event day. All setups must be completed by 8:00 AM. Early setup can be arranged with prior notice.'
        },
        {
          title: 'Staff Requirements',
          content: 'All sponsor representatives must wear identification badges. Maximum staff per booth varies by sponsorship level.'
        },
        {
          title: 'Equipment & Materials',
          content: 'Sponsors are responsible for their own equipment. Power outlets and basic furniture are provided. Special requirements must be communicated in advance.'
        },
        {
          title: 'Breakdown',
          content: 'Booth breakdown cannot begin until after the event officially ends. All materials must be removed within 2 hours of event conclusion.'
        }
      ]
    },
    compliance: {
      title: 'Compliance & Restrictions',
      icon: HelpCircle,
      items: [
        {
          title: 'Prohibited Items',
          content: 'No alcohol, weapons, or hazardous materials allowed. All giveaways must be family-friendly and approved by event management.'
        },
        {
          title: 'Noise Levels',
          content: 'Audio/visual presentations must maintain reasonable volume levels. Sound checks required for any amplified content.'
        },
        {
          title: 'Competition Clause',
          content: 'Direct competitors cannot be sponsored simultaneously without prior agreement. Exclusive sponsorship options available for certain categories.'
        },
        {
          title: 'Insurance Requirements',
          content: 'Sponsors must provide proof of liability insurance. Event organizers are not responsible for lost, stolen, or damaged sponsor property.'
        }
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

  return (
    <SponsorDashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="mr-2" size={24} />
              Sponsorship Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {Object.entries(guidelines).map(([key, section]) => {
            const Icon = section.icon
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 flex items-center transition-colors ${
                  activeSection === key
                    ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="mr-2" size={18} />
                {section.title}
              </button>
            )
          })}
        </div>

        {/* Active Section Content */}
        <div className="space-y-4">
          {guidelines[activeSection as keyof typeof guidelines].items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <CheckCircle2 className="text-green-500 mr-2" size={18} />
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="text-yellow-600 mr-2 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Important Notice</h4>
              <p className="text-sm text-yellow-800">
                These guidelines are subject to change. Sponsors will be notified of any updates via email.
                For clarifications or special requests, please contact the sponsorship team.
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-6 text-center">
          <Button className="inline-flex items-center bg-red-600 hover:bg-red-700">
            <FileText className="mr-2" size={18} />
            Download Full Guidelines PDF
          </Button>
        </div>
          </CardContent>
        </Card>
      </div>
    </SponsorDashboardLayout>
  )
}

