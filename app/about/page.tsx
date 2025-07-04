import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Globe, Award, Target, Lightbulb, HandHeart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import BackToTopButton from "../components/BackToTopButton"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white text-lg px-6 py-2">
              About ZVE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Zazzau Version Entrepreneurs
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
              Transforming the entrepreneurship landscape in Northern Nigeria through innovation, 
              collaboration, and sustainable impact.
            </p>
          </div>
        </div>
      </section>

      {/* ZVE Overview with Thumbnail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  About Zazzau Version Entrepreneurs (ZVE)
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  ZVE is a transformative entrepreneurship organization founded by <strong>Bello Yusuf Yusuf</strong> with the mission to 
                  unite, empower, and support entrepreneurs across Northern Nigeria and beyond. What began as a simple vision has 
                  evolved into a powerful movement that is redefining the entrepreneurship narrative in the region.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Through innovation, collaboration, and sustainable impact, ZVE has become a beacon of hope for aspiring entrepreneurs, 
                  providing them with the tools, networks, and opportunities needed to thrive in today's competitive business landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                    <Link href="/wed-4">Explore WED 4.0</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-8 py-3">
                    <Link href="/register">Join Our Community</Link>
                  </Button>
                </div>
              </div>
              
              {/* ZVE Thumbnail Card */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-2xl hover-lift">
                  <CardHeader className="text-center pb-4">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HandHeart className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-red-800 mb-2">ZVE Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-2xl font-bold text-red-600">600+</div>
                        <div className="text-sm text-gray-600">Entrepreneurs Reached</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-2xl font-bold text-red-600">4</div>
                        <div className="text-sm text-gray-600">WED Events</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-2xl font-bold text-red-600">50+</div>
                        <div className="text-sm text-gray-600">Expert Speakers</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-2xl font-bold text-red-600">₦5M+</div>
                        <div className="text-sm text-gray-600">Investment Value</div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Building bridges between entrepreneurs, investors, and industry leaders 
                      to create a thriving ecosystem of innovation and growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-red-600 text-white text-lg px-6 py-2">Leadership</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Meet Our Founder</h2>
            </div>

            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3 text-center">
                  <div className="w-64 h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600 shadow-2xl">
                    <Image
                      src="/FOUNDER.JPG"
                      alt="Bello Yusuf Yusuf - Founder of ZVE"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">Bello Yusuf Yusuf</h3>
                  <p className="text-red-600 text-xl mb-2 font-semibold">Founder & Convener</p>
                  <p className="text-gray-600 text-lg">Zazzau Version Entrepreneurs</p>
                </div>

                <div className="lg:w-2/3 space-y-6">
                  <div className="text-lg leading-relaxed text-gray-700">
                    <p className="mb-6">
                      <span className="text-2xl font-bold text-gray-900">
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
                      <span className="text-red-600 font-bold">600 entrepreneurs and attendees</span> collectively,
                      engaging in workshops, exhibitions, panel discussions, and networking opportunities.
                    </p>

                    <p className="mb-8">
                      Our mission extends beyond events – we are building a sustainable ecosystem where entrepreneurs 
                      can access mentorship, funding opportunities, and strategic partnerships that drive real economic impact.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                        <Link href="/wed-4">Join WED 4.0</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-8 py-3">
                        <Link href="/leadership">Meet Our Team</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <div className="bg-gray-50 rounded-3xl p-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-black">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ZVE was founded to promote entrepreneurship as a comprehensive tool for transformation
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                Solving Youth Unemployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Through skills development and business creation opportunities for young entrepreneurs
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                Promoting Self-Reliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Among young entrepreneurs and business owners through empowerment and support
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                Driving Inclusive Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Across communities in Northern Nigeria through sustainable business practices
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                Fostering Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                And collaborative growth in the entrepreneurial ecosystem
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ZVE Impact & WED Series */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-black">Our Impact</h2>
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">600+</h3>
                    <p className="text-gray-700">Entrepreneurs reached across three WED events</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">50+</h3>
                    <p className="text-gray-700">Expert speakers engaged from various industries</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">₦5M+</h3>
                    <p className="text-gray-700">Investment opportunities facilitated</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">Regional</h3>
                    <p className="text-gray-700">Recognition as Northern Nigeria's premier entrepreneurship platform</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold mb-8 text-black">World Entrepreneurship Day Series</h2>
                <p className="text-gray-600 mb-8">Our flagship initiative that has become the premier entrepreneurship platform in Northern Nigeria</p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-600 pl-6">
                    <h3 className="font-bold text-lg mb-2">WED 1.0 - Foundation</h3>
                    <p className="text-gray-600 mb-2">70 participants | Building groundwork for entrepreneurship awareness</p>
                    <Badge variant="secondary">Completed 2022</Badge>
                  </div>
                  
                  <div className="border-l-4 border-red-600 pl-6">
                    <h3 className="font-bold text-lg mb-2">WED 2.0 - Growth</h3>
                    <p className="text-gray-600 mb-2">200 participants | Expanding horizons and building networks</p>
                    <Badge variant="secondary">Completed 2023</Badge>
                  </div>
                  
                  <div className="border-l-4 border-red-600 pl-6">
                    <h3 className="font-bold text-lg mb-2">WED 3.0 - Innovation</h3>
                    <p className="text-gray-600 mb-2">300+ participants | "Innovate Locally, Impact Globally"</p>
                    <Badge className="bg-green-600 text-white">Completed 2024</Badge>
                  </div>
                  
                  <div className="border-l-4 border-red-600 pl-6">
                    <h3 className="font-bold text-lg mb-2">WED 4.0 - Resilience</h3>
                    <p className="text-gray-600 mb-2">400+ expected | "Rebuild, Reinvent, Rise"</p>
                    <Badge className="bg-red-600 text-white">Upcoming 2025</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black text-white rounded-3xl p-12 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  The principles that guide everything we do at ZVE
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Empowerment</h3>
                  <p className="text-gray-300">
                    We believe in empowering individuals with the knowledge, skills, and networks needed to succeed in entrepreneurship.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Collaboration</h3>
                  <p className="text-gray-300">
                    Building bridges between entrepreneurs, thought leaders, policymakers, and aspiring change-makers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Innovation</h3>
                  <p className="text-gray-300">
                    Encouraging creative solutions to local and global challenges through entrepreneurship.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Impact</h3>
                  <p className="text-gray-300">
                    Creating measurable, lasting positive change in communities through business development.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Inclusion</h3>
                  <p className="text-gray-300">
                    Ensuring equal opportunities for all entrepreneurs regardless of background or experience level.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Growth</h3>
                  <p className="text-gray-300">
                    Fostering sustainable growth and development in the entrepreneurship ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold">Leadership</CardTitle>
                <CardDescription className="text-lg">
                  Meet the visionary behind ZVE and the World Entrepreneurship Day series
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600 shadow-2xl">
                      <Image
                        src="/FOUNDER.JPG"
                        alt="Bello Yusuf Yusuf - Founder of ZVE"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Bello Yusuf Yusuf</h3>
                    <p className="text-red-600 text-lg mb-4">Founder, ZVE & Convener, WED</p>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      <strong>Vision:</strong> Building sustainable entrepreneurship ecosystems across Northern Nigeria and beyond. 
                      <strong>Philosophy:</strong> "Collaboration empowers, and together we can build, grow, and leave a legacy of impact."
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3">Experience & Leadership</h4>
                      <p className="text-gray-700 text-sm">
                        Proven track record in community development and business leadership with a passion for 
                        empowering the next generation of entrepreneurs.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3">Impact & Recognition</h4>
                      <p className="text-gray-700 text-sm">
                        Recognized leader in Northern Nigeria's entrepreneurship space, with successful 
                        track record of building communities and driving sustainable business growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
