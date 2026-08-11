"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Target, Lightbulb, Handshake, ArrowRight, Play, Store, TrendingUp, Award, DollarSign, Star, Quote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { TestimonialsSection } from "./components/TestimonialsSection"
import BackToTopButton from "./components/BackToTopButton"

// Dynamically import the AboutEventSlider with SSR disabled to prevent static prerendering compilation mismatches
const AboutEventSlider = dynamic(() => import("./components/AboutEventSlider"), { ssr: false })

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section - Emphasizing ZVE & WED 5.0 */}
      <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image Slideshow with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {[
              "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_c34d51ee.jpg",
              "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_d6d26545.jpg",
              "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.36_be1495c8.jpg",
              "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.38_6950c980.jpg",
              "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.39_68a1f474.jpg",
              "/WED 3.0/WED 3.0/IMG_7833.JPG",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`WED Event Background ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  index === 0 ? 'animate-slideshow-1' :
                  index === 1 ? 'animate-slideshow-2' :
                  index === 2 ? 'animate-slideshow-3' :
                  index === 3 ? 'animate-slideshow-4' :
                  index === 4 ? 'animate-slideshow-5' :
                  'animate-slideshow-6'
                }`}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl font-semibold text-red-500 mb-4 tracking-wider">
              Zazzau Version Entrepreneurs (ZVE) Presents
            </h1>
            <Badge className="mb-4 bg-red-600 text-white font-semibold px-4 py-1.5 text-xs sm:text-sm tracking-widest rounded-full uppercase">
              5th Anniversary Edition
            </Badge>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-lg text-white leading-none">
              World Entrepreneurs Day 5.0
            </h2>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto text-red-200 font-bold drop-shadow-lg tracking-wide">
              Theme: Building Resilient Enterprises for the Future
            </p>

            {/* Optimised Responsive Hero Chips - No wrap/break text, wraps whole chips as blocks, no overflow */}
            <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-12 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/50 hover:bg-white/20 transition-all duration-300">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm md:text-base text-white whitespace-nowrap">
                  October 3–4, 2026
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/50 hover:bg-white/20 transition-all duration-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm md:text-base text-white whitespace-nowrap">
                  NAERLS Hall, ABU Zaria
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/50 hover:bg-white/20 transition-all duration-300">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm md:text-base text-white whitespace-nowrap">
                  400–500 Target Attendees
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-4 font-semibold transition-transform hover:scale-105">
                <Link href="/register">Register for WED 5.0</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-black hover:border-white rounded-full px-10 py-4 font-semibold transition-transform hover:scale-105">
                <Link href="/sponsorship">Become a Sponsor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-600 mb-2">5</div>
              <div className="text-xl text-gray-300">WED Events Executed & Planned</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-600 mb-2">1,000+</div>
              <div className="text-xl text-gray-300">Entrepreneurs Engaged</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-600 mb-2">₦3.0M</div>
              <div className="text-xl text-gray-300">SME Grant Pool (Proposed)</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-600 mb-2">₦12.65M</div>
              <div className="text-xl text-gray-300">Implementation Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Picture Slider on Left Side, About Text on Right Side */}
      <section className="py-24 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-600 text-white px-4 py-1">Organized by ZVE</Badge>
              <h2 className="text-5xl font-extrabold text-black">About WED 5.0</h2>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
                Transitioning from an annual event to a structured, community-rooted enterprise ecosystem.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Picture Slider on Left Column */}
              <div className="lg:col-span-6 w-full">
                <AboutEventSlider />
              </div>

              {/* About Text Content on Right Column */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-3xl font-extrabold text-black leading-tight border-b-2 border-red-600 pb-2">
                  Building Resilient Enterprises
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  World Entrepreneurs Day (WED) – Zazzau Version 5.0 is the fifth and anniversary edition of Northern Nigeria's foremost community-driven entrepreneurship platform, convened by Zazzau Version Entrepreneurs (ZVE) in Zaria, Kaduna State.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  Over the expanded 2-day format, Day One replaces standard lectures with <strong>4 concurrent, expert-led sector pavilions</strong> (Trade, Tech, Agribusiness, Creative). Day Two presents a public <strong>SME Pitch Competition</strong> awarding <strong>₦3,000,000</strong> in enterprise grants to support adaptability, digital transformation, and sustainable scaling.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="text-red-600 font-bold text-xl mb-1">2 Days</div>
                    <p className="text-xs text-gray-500">Expanded multi-day networking and masterclasses</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="text-red-600 font-bold text-xl mb-1">₦3,000,000</div>
                    <p className="text-xs text-gray-500">Proposed grant capital for competitive SME pitch</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2.5">
                    <Link href="/about">About ZVE Team</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-6 py-2.5 bg-transparent">
                    <Link href="/wed-5">Full Concept Note</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline progression nested section */}
            <div className="mt-24 border-t border-gray-200 pt-16">
              <h4 className="text-2xl font-bold mb-12 text-center">ZVE Journey from WED 1.0 to WED 5.0</h4>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { title: "WED 1.0", year: "2022", p: "70", text: "Foundation & Launch" },
                  { title: "WED 2.0", year: "2023", p: "200+", text: "Ecosystem Growth" },
                  { title: "WED 3.0", year: "2024", p: "350+", text: "Global Innovations" },
                  { title: "WED 4.0", year: "2025", p: "300+", text: "Policy & Resilience" },
                  { title: "WED 5.0", year: "2026", p: "400-500", text: "Anniversary Milestones", bold: true },
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border ${item.bold ? 'bg-red-50 border-red-500 shadow-md' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <div className="text-red-600 font-black text-lg">{item.title}</div>
                    <div className="text-gray-500 text-xs font-semibold">{item.year}</div>
                    <p className="text-xs text-gray-700 font-bold mt-2">{item.text}</p>
                    <div className="text-red-600 font-bold text-xs mt-3">{item.p} Attendees</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-red-600 text-white text-lg px-6 py-2">Leadership Message</Badge>
              <h2 className="text-5xl font-bold mb-6">Founder's Message</h2>
            </div>

            <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/3 text-center lg:text-left">
                  <div className="w-48 h-48 rounded-full mx-auto lg:mx-0 mb-6 overflow-hidden border-4 border-red-600 shadow-2xl">
                    <Image
                      src="/FOUNDER.JPG"
                      alt="Bello Yusuf Yusuf - Founder of ZVE"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Bello Yusuf Yusuf</h3>
                  <p className="text-red-500 text-lg mb-2">Founder, ZVE</p>
                  <p className="text-gray-400">Convener, WED</p>
                </div>

                <div className="lg:w-2/3 space-y-6">
                  <div className="text-xl leading-relaxed text-gray-300">
                    <p className="mb-6">
                      <span className="text-2xl font-bold text-white">
                        Welcome to Zazzau Version Entrepreneurs (ZVE)!
                      </span>
                    </p>

                    <p className="mb-6">
                      I am Bello Yusuf Yusuf, the Founder of ZVE and Convener of the highly celebrated World
                      Entrepreneurship Day (WED) – Zazzau Version. What started as a simple vision to unite and empower
                      entrepreneurs has grown into a movement that is redefining the entrepreneurship narrative in
                      Northern Nigeria and beyond.
                    </p>

                    <p className="mb-6">
                      Over the past editions of WED, we have witnessed overwhelming participation, with over{" "}
                      <span className="text-red-500 font-bold">1,000 entrepreneurs and attendees</span> collectively,
                      engaging in workshops, exhibitions, panel discussions, and networking opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Button
                        asChild
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                        <Link href="/leadership">Read Full Message</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded-full px-8 py-3 bg-transparent">
                        <Link href="/about">Learn About ZVE</Link>
                      </Button>
                    </div>

                    <div className="border-t border-gray-700 pt-6 mt-8">
                      <p className="text-lg">
                        <span className="text-white font-semibold">With gratitude,</span>
                        <br />
                        <span className="text-red-500 font-bold text-xl">Bello Yusuf Yusuf</span>
                        <br />
                        <span className="text-gray-400">Founder, ZVE & Convener, WED</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">WED 5.0 Objectives</h2>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our objectives align with the "Building Resilient Enterprises for the Future" theme, focusing on ecosystem building, strategic pavilions, and direct capital access.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Sector Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Deliver sector-specific enterprise knowledge through 4 concurrent expert-facilitated pavilions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Business Resilience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Build business resilience through access to finance, operational, digital, and market-access strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Investment Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Improve investment readiness among selected SMEs through a structured pitch competition and pre-event coaching.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Market Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Create direct market access through an Enterprise Exhibition with minimum 30 businesses running across both days.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Direct Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Channel direct enterprise capital (₦3M proposed grant pool) to six SMEs through a transparent competitive pitch.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg bg-gray-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Impact Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Produce a post-event impact report documenting measurable outcomes within 60 days post-event.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Target Audience */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">Who Should Attend</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-900 border-gray-800 hover-lift text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl">Entrepreneurs & SMEs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Traders, retailers, and small business owners
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Agro-processors & farmers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Tech startups & digital creators
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover-lift text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl">Experts & Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Industry domain experts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Investors & financial institutions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Corporate mentors & strategists
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover-lift text-white">
              <CardHeader>
                <CardTitle className="text-white text-xl">Ecosystem Enablers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Government representatives & policymakers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Development partners & NGOs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Students & creative professionals
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white text-lg px-6 py-2 border-white/30">
              Join the Anniversary Movement
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Join WED 5.0?</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-light leading-relaxed opacity-90">
              Be part of this historic two-day experience focused on building resilient enterprises for the future. Discover expert pavilions, watch pitch competitions, and network. Join us October 3–4, 2026.
            </p>

            {/* Registration Options Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Participant</CardTitle>
                  <CardDescription className="text-white/85">
                    Join as an attendee, register for a sector pavilion to learn and network.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white bg-transparent text-white hover:bg-white hover:text-red-600 hover:border-white font-semibold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/register">Register Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Store className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Exhibitor Vendor</CardTitle>
                  <CardDescription className="text-white/85">
                    Showcase your products to 400-500 participants over the expanded 2-day marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white bg-transparent text-white hover:bg-white hover:text-red-600 hover:border-white font-semibold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/vendor-registration">Join as Exhibitor</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Sponsor</CardTitle>
                  <CardDescription className="text-white/85">
                    Invest in structured enterprise development and access corporate branding opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white bg-transparent text-white hover:bg-white hover:text-red-600 hover:border-white font-semibold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/sponsor-registration">Become a Sponsor</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional CTA */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-white/80 mb-6 text-lg">
                Have questions? Want to learn more about anniversary sponsorship packages?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-red-600 hover:border-white font-semibold rounded-full px-8 py-3"
                >
                  <Link href="/about">Learn More About WED</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold rounded-full px-8 py-3"
                >
                  <Link href="/wed-5">View WED 5.0 Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
