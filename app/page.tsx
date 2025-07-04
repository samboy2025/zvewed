import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Zazzau Version Entrepreneurs (ZVE) - Empowering Northern Nigeria's Innovators",
  description:
    "ZVE is a transformative entrepreneurship organization. Join us for our flagship event, WED 4.0, on October 4th, 2025: 'Rebuild, Reinvent, Rise'.",
  keywords: "ZVE, Zazzau Version Entrepreneurs, entrepreneurship, innovation, business, startup, WED 4.0, Zaria, Northern Nigeria, networking",
  generator: 'v0.dev'
}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Target, Lightbulb, Handshake, ArrowRight, Play, Store } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TestimonialsSection } from "@/components/ui/testimonials-demo"
import BackToTopButton from "./components/BackToTopButton"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section - Emphasizing ZVE */}
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
            <h1 className="text-xl md:text-2xl font-semibold text-red-400 mb-4 tracking-wider">
              Zazzau Version Entrepreneurs (ZVE) Presents
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              World Entrepreneurship Day 4.0
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-300 drop-shadow-lg">
              Theme: Rebuild, Reinvent, Rise - Navigating Nigeria's Economy with Resilience
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-red-400/50">
                <Calendar className="h-5 w-5 text-red-400" />
                <span className="font-medium">October 4th, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-red-400/50">
                <Users className="h-5 w-5 text-red-400" />
                <span className="font-medium">400+ Participants Expected</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-4 font-semibold">
                <Link href="/register">Register for WED 4.0</Link>
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
              <div className="text-5xl font-bold text-red-500 mb-2">4</div>
              <div className="text-xl text-gray-300">WED Events Planned</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">600+</div>
              <div className="text-xl text-gray-300">Entrepreneurs Reached</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-xl text-gray-300">Expert Speakers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">₦3.37M+</div>
              <div className="text-xl text-gray-300">Sponsorship Target</div>
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
              <h2 className="text-5xl font-bold mb-6 text-black">About WED 4.0</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                World Entrepreneurship Day (WED) 4.0: "Rebuild, Reinvent, Rise" - Empowering entrepreneurs to navigate 
                current economic challenges through strategic rebuilding, innovative reinvention, and sustainable growth.
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-4">Organized by Zazzau Version Entrepreneurs (ZVE)</h3>
                <p className="text-gray-700 leading-relaxed">
                  ZVE is a transformative entrepreneurship organization founded by <strong>Bello Yusuf Yusuf</strong> with the mission to 
                  unite, empower, and support entrepreneurs across Northern Nigeria and beyond. What began as a simple vision has 
                  evolved into a powerful movement that is redefining the entrepreneurship narrative in the region through 
                  innovation, collaboration, and sustainable impact.
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
                      <h3 className="text-xl font-semibold">WED 1.0: Foundation</h3>
                      <p className="text-gray-600">70 participants - Building the groundwork</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 2.0: Growth</h3>
                      <p className="text-gray-600">200 participants - Expanding horizons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 3.0: Innovation</h3>
                      <p className="text-gray-600">300+ participants - Global impact achieved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">WED 4.0: Resilience</h3>
                      <p className="text-gray-600">400+ expected - Economic resilience focus</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                    <Link href="/about">Learn More About ZVE</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-8 py-3">
                    <Link href="/wed-4">Explore WED 4.0</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl hover-lift">
                  <h3 className="text-2xl font-bold mb-6 text-black">Event Highlights</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Keynote addresses by renowned speakers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Interactive panel discussions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Practical workshops and training</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Vendor exhibitions and networking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Innovation competitions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Entertainment and cultural activities</span>
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
                  <p className="text-red-400 text-lg mb-2">Founder, ZVE</p>
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
                      <span className="text-red-400 font-bold">600 entrepreneurs and attendees</span> collectively,
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
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white rounded-full px-8 py-3">
                        <Link href="/about">Learn About ZVE</Link>
                      </Button>
                    </div>

                    <div className="border-t border-gray-700 pt-6 mt-8">
                      <p className="text-lg">
                        <span className="text-white font-semibold">With gratitude,</span>
                        <br />
                        <span className="text-red-400 font-bold text-xl">Bello Yusuf Yusuf</span>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">WED 4.0 Objectives</h2>
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our objectives align with the "Rebuild, Reinvent, Rise" theme, focusing on economic resilience and sustainable growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Business Resilience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Provide practical strategies for navigating economic challenges and building resilient businesses
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Network Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Connect entrepreneurs with investors, mentors, and peers for sustainable partnerships
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Resource Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Facilitate access to funding, markets, and business support services for growth
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Policy Influence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Engage policymakers on creating entrepreneurship-friendly policies and frameworks
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
            <Card className="bg-gray-900 border-gray-800 hover-lift">
              <CardHeader>
                <CardTitle className="text-white text-xl">Entrepreneurs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Aspiring entrepreneurs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Established business owners
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Startup founders
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover-lift">
              <CardHeader>
                <CardTitle className="text-white text-xl">Industry Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Industry experts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Thought leaders
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Investors & VCs
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover-lift">
              <CardHeader>
                <CardTitle className="text-white text-xl">Academic & Government</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Students & educators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Government representatives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Policymakers
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
              Join the Movement
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Join WED 4.0?</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto font-light leading-relaxed opacity-90">
              Be part of this transformative experience focused on rebuilding, reinventing, and rising above economic 
              challenges. Navigate current realities with resilience. Join us on October 4th, 2025.
            </p>

            {/* Registration Options Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Participant</CardTitle>
                  <CardDescription className="text-white/80">
                    Join as an attendee to learn, network, and grow your entrepreneurial journey
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

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Store className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Vendor</CardTitle>
                  <CardDescription className="text-white/80">
                    Showcase your products and services to 500+ entrepreneurs and industry leaders
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white bg-transparent text-white hover:bg-white hover:text-red-600 hover:border-white font-semibold text-lg py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/vendor-registration">Join as Vendor</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">Sponsor</CardTitle>
                  <CardDescription className="text-white/80">
                    Partner with us to support entrepreneurship and gain brand visibility
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
                Have questions? Want to learn more about sponsorship packages?
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
                  <Link href="/sponsorship">View Sponsorship Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
