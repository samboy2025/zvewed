import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Zazzau Version Entrepreneurs (ZVE) - Empowering Northern Nigeria's Innovators",
  description:
    "ZVE is a transformative entrepreneurship organization. Join us for our 5th anniversary flagship event, WED 5.0, on October 3-4, 2026: 'Building Resilient Enterprises for the Future'.",
  keywords: "ZVE, Zazzau Version Entrepreneurs, entrepreneurship, innovation, business, startup, WED 5.0, Zaria, Northern Nigeria, networking, Pitch Competition",
  generator: 'v0.dev'
}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Target, Lightbulb, Handshake, ArrowRight, Play, Store, TrendingUp, Award, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TestimonialsSection } from "./components/TestimonialsSection"
import BackToTopButton from "./components/BackToTopButton"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section - Emphasizing ZVE & WED 5.0 */}
      <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image Slideshow with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {[
              "/WED 2.0/Pictures WED 2.0/IMG_6247.JPG",
              "/WED 1.0/Pictures WED 1.0/DSC_2272_Original.jpg",
              "/WED 2.0/Pictures WED 2.0/IMG_6193.JPG",
              "/WED 3.0/WED 3.0/IMG_7833.JPG",
              "/WED 1.0/Pictures WED 1.0/DSC_2287_Original.jpg",
              "/WED 2.0/Pictures WED 2.0/IMG_6215.JPG",
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
            <Badge className="mb-4 bg-red-600 text-white font-semibold">5TH ANNIVERSARY EDITION</Badge>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-lg text-white">
              World Entrepreneurs Day 5.0
            </h2>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto text-red-200 font-bold drop-shadow-lg">
              Theme: Building Resilient Enterprises for the Future
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-red-500/50">
                <Calendar className="h-5 w-5 text-red-500" />
                <span className="font-medium">October 3–4, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-red-500/50">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="font-medium">NAERLS Ultra Modern Hall, ABU Zaria</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-red-500/50">
                <Users className="h-5 w-5 text-red-500" />
                <span className="font-medium">400–500 Target Attendees</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-4 font-semibold">
                <Link href="/register">Register for WED 5.0</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-black hover:border-white rounded-full px-10 py-4 font-semibold">
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

      {/* About Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-red-600 text-white">Organized by ZVE</Badge>
              <h2 className="text-5xl font-bold mb-6 text-black">About WED 5.0</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                World Entrepreneurs Day (WED) – Zazzau Version 5.0 is the fifth and anniversary edition of Northern Nigeria's foremost community-driven entrepreneurship platform, convened by Zazzau Version Entrepreneurs (ZVE) in Zaria, Kaduna State.
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">Organized by Zazzau Version Entrepreneurs (ZVE)</h3>
                <p className="text-gray-700 leading-relaxed">
                  ZVE is a community-based entrepreneurship organisation founded by <strong>Bello Yusuf Yusuf</strong> in Zaria. It operates annual convening through WED, monthly knowledge programming through the ZVE Webinar Series, and long-term ecosystem building through partnerships and mentorship. ZVE is affiliated with the Bello Yusuf Yusuf Innovation and Empowerment Foundation (CAC Reg No. IT 9699423), through which all funds are managed.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 1.0 (2022) - Foundation</h3>
                      <p className="text-gray-600">70 participants - Foundation and community launch</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 2.0 (2023) - Growth</h3>
                      <p className="text-gray-600">200+ participants - Growth and expanded programming</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 3.0 (2024) - Innovation</h3>
                      <p className="text-gray-600">350+ participants - Innovation and strategic partnerships</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 4.0 (2025) - Resilience</h3>
                      <p className="text-gray-600">300+ participants - Resilience and policy engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 5.0 (2026) - Resilient Future</h3>
                      <p className="text-gray-600">400-500 target - First Two-Day format, Sector Pavilions & SME Pitch Competition</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                    <Link href="/about">Learn More About ZVE</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-8 py-3 bg-transparent">
                    <Link href="/wed-5">Explore WED 5.0</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl hover-lift border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-black">What's New in WED 5.0</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span><strong>First Time Two-Day Format</strong> (Oct 3–4, 2026)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span><strong>4 Sector-Specific Enterprise Pavilions</strong> (Day One)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span><strong>Business Pitch Finals</strong> (Day Two)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span><strong>₦3,000,000 SME Grant Pool</strong> for 6 selected finalists</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span><strong>Enterprise Exhibition</strong> running across both days</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Post-event <strong>Impact Report</strong> produced within 60 days</span>
                    </li>
                  </ul>
                </div>
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
