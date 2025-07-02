import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Target, Lightbulb, Handshake, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TestimonialsSection from "./components/TestimonialsSection"
import ImageGallery from "./components/ImageGallery"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-red text-white py-32 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="WED 3.0 Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-fade-in">
              <Badge className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm text-xl px-8 py-3 font-semibold">
                WED 3.0 - Zazzau Version
              </Badge>
              <h1 className="text-7xl md:text-9xl font-bold mb-12 tracking-tight leading-none">
                <span className="block">World</span>
                <span className="block text-red-200 text-6xl md:text-8xl">Entrepreneurship</span>
                <span className="block">Day</span>
              </h1>
              <p className="text-2xl md:text-4xl mb-16 text-red-100 font-light max-w-5xl mx-auto leading-relaxed">
                "Innovate Locally, Impact Globally: Empowering Entrepreneurs for a Sustainable Future"
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16 animate-slide-in">
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <Calendar className="h-8 w-8" />
                <div className="text-left">
                  <div className="text-2xl font-bold">August 24, 2024</div>
                  <div className="text-red-200 text-sm">Save the Date</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <MapPin className="h-8 w-8" />
                <div className="text-left">
                  <div className="text-2xl font-bold">ABU Zaria</div>
                  <div className="text-red-200 text-sm">Business School</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <Users className="h-8 w-8" />
                <div className="text-left">
                  <div className="text-2xl font-bold">300+</div>
                  <div className="text-red-200 text-sm">Expected Participants</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in">
              <Button
                asChild
                size="lg"
                className="bg-white text-red-600 hover:bg-red-50 font-bold text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
              >
                <Link href="/register" className="flex items-center gap-3">
                  Register Now <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold text-xl px-12 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/wed-overview" className="flex items-center gap-3">
                  <Play className="h-6 w-6" />
                  Explore WED Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">3</div>
              <div className="text-xl text-gray-300">Successful Events</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-xl text-gray-300">Entrepreneurs Reached</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-xl text-gray-300">Expert Speakers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl font-bold text-red-500 mb-2">₦5M+</div>
              <div className="text-xl text-gray-300">Investment Facilitated</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-black">About WED 3.0</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The World Entrepreneurship Day (WED) 3.0 is set to be an extraordinary event designed to foster
                innovation, growth, and collaboration among entrepreneurs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                      <p className="text-gray-600">300+ expected - Global impact focus</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                  <Link href="/about">Learn More About Our Journey</Link>
                </Button>
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
                  <div className="w-48 h-48 bg-red-600 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">BY</span>
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
                      ZVE was founded to promote entrepreneurship as a tool for solving youth unemployment, promoting
                      self-reliance, and driving inclusive development. Through WED, we've built a platform where
                      entrepreneurs, thought leaders, policymakers, and aspiring change-makers come together to share
                      knowledge, inspire innovation, and create long-lasting impact.
                    </p>

                    <p className="mb-6">
                      Over the past editions of WED—WED 1.0, WED 2.0, and WED 3.0—we have witnessed overwhelming
                      participation, with over{" "}
                      <span className="text-red-400 font-bold">600 entrepreneurs and attendees</span> collectively,
                      engaging in workshops, exhibitions, panel discussions, and networking opportunities. The feedback
                      and success stories have been overwhelming, with participants gaining access to funding
                      opportunities, mentorship, partnerships, and business visibility.
                    </p>

                    <p className="mb-6">
                      As we move forward with WED 4.0, themed{" "}
                      <span className="text-red-400 font-semibold">
                        "Rebuild, Reinvent, Rise: Navigating the Current Economy with Resilience"
                      </span>
                      , we're focusing on helping entrepreneurs weather the storms of the current economic climate by
                      rebuilding systems, reinventing models, and rising stronger.
                    </p>

                    <p className="mb-6">
                      But ZVE is more than just an event-based platform. It's a movement. We are now expanding into
                      entrepreneurship-focused digital platforms, entrepreneur profiling, online courses, webinars, and
                      local incubation projects to ensure that the impact continues beyond one day.
                    </p>

                    <p className="mb-6">
                      I believe in the power of collaboration, and I appreciate every single volunteer, partner,
                      sponsor, speaker, and supporter who has walked this journey with us. Your contribution has shaped
                      this vision and empowered hundreds of lives.
                    </p>

                    <p className="mb-8">
                      To those visiting us for the first time—welcome to the community of changemakers. Together, let's
                      build, grow, and leave a legacy of impact.
                    </p>

                    <div className="border-t border-gray-700 pt-6">
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
          <h2 className="text-5xl font-bold text-center mb-16 text-black">Our Objectives</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Innovation Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Provide a platform for entrepreneurs to network and share innovative ideas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Equip participants with practical skills through workshops and sessions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Facilitate collaborations among stakeholders in the ecosystem
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Inspire the next generation through success stories and interactions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

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
      <section className="py-24 gradient-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Join WED 3.0?</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Be part of this transformative experience that will foster innovation and collaboration in the
            entrepreneurial ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/register">Register as Participant</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/vendor-registration">Register as Vendor</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/sponsor-registration">Become a Sponsor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
