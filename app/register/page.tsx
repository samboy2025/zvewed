"use client"

import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, CheckCircle2, Video, Users, ExternalLink, Sparkles } from "lucide-react"
import BackToTopButton from "../components/BackToTopButton"

export default function RegisterPage() {
  const googleFormUrl = "https://forms.gle/9q8Xg1cbnh6Jbnp58"
  const googleFormEmbedUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf56ZWfd7wA8mgjYvcsHzpf9eBX5oAgKF2mnKZ3AeVnJ1oBkQ/viewform?embedded=true"

  return (
    <div className="min-h-screen py-10 bg-gray-50 text-black">
      <BackToTopButton />
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-sm font-semibold rounded-full uppercase tracking-wider">
            WED 5.0 Business Pitch Competition
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            WED 5.0 Enterprise Growth Pitch
          </h1>
          <p className="text-lg md:text-xl font-medium text-red-600">
            Pitch Your Business. Win Real Support.
          </p>
          <p className="text-gray-600 text-base md:text-lg">
            Got a business idea worth growing? WED 5.0 is giving three entrepreneurs a total of{" "}
            <span className="font-bold text-black">₦500,000</span> in enterprise support, not just a trophy.
          </p>
        </div>

        {/* Top Info Cards / Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* Left Column: Image Flyer & Pitch Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-white border-gray-200 shadow-md overflow-hidden">
              <div className="relative w-full aspect-[4/5] bg-gray-100">
                <Image
                  src="/wed-5-pitch.jpeg"
                  alt="WED 5.0 Enterprise Growth Pitch Flyer"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Card>

            {/* Prizes Card */}
            <Card className="bg-white border-red-100 shadow-md">
              <CardHeader className="bg-red-50 border-b border-red-100 pb-4">
                <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-red-600" />
                  Prize Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-red-600 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-90">1st Place</p>
                    <p className="text-lg md:text-xl font-black mt-1">₦250,000</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-90">2nd Place</p>
                    <p className="text-lg md:text-xl font-black mt-1">₦150,000</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800 text-white shadow-sm">
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-90">3rd Place</p>
                    <p className="text-lg md:text-xl font-black mt-1">₦100,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Requirements & Details */}
            <Card className="bg-white border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Application Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-red-600" /> Who Can Apply
                  </h4>
                  <p>Young entrepreneurs, startups, and MSMEs with a real business and a clear plan to grow it.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                    <Video className="h-4 w-4 text-red-600" /> What You Need
                  </h4>
                  <p>A completed application form + a short 60–90 second video pitch (just record it on your phone).</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-red-600" /> How It Works
                  </h4>
                  <p className="font-medium text-red-700">
                    Apply → Screening → Top 6 Shortlisted → Live Pitch → Top 3 Winners
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: 23rd September, 2026</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Google Form Embedded Iframe */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-white border-gray-200 shadow-lg overflow-hidden flex flex-col h-full">
              <CardHeader className="bg-gray-900 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                      <CheckCircle2 className="h-5 w-5 text-red-500" />
                      Registration & Pitch Application Form
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-xs md:text-sm mt-1">
                      Complete the Google Form below to register and submit your entry for the WED 5.0 Enterprise Growth Pitch.
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-red-600 hover:bg-red-700 text-white border-none text-xs md:text-sm font-semibold whitespace-nowrap"
                  >
                    <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <span>Open Form in New Tab</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow min-h-[700px] md:min-h-[900px] bg-gray-50 relative">
                <iframe
                  src={googleFormEmbedUrl}
                  className="w-full h-full min-h-[700px] md:min-h-[900px] border-none"
                  title="WED 5.0 Enterprise Growth Pitch Registration Form"
                  allow="autoplay"
                >
                  Loading form...
                </iframe>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  )
}
