import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Globe, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WEDOverviewPage() {
  const wedEvents = [
    {
      version: "WED 1.0",
      year: "2022",
      theme: "Transition in the Entrepreneurship Landscape: Exploring Opportunities and Network",
      participants: 70,
      highlights: [
        "Foundation of the WED movement in Zazzau",
        "Focus on exploring entrepreneurial opportunities",
        "Building initial network of entrepreneurs",
        "Introduction to digital business strategies",
      ],
      image: "/WED 1.0/Pictures WED 1.0/DSC_2272_Original.jpg",
      link: "/wed-1",
    },
    {
      version: "WED 2.0",
      year: "2023",
      theme: "Empowering the Next Generation of Entrepreneurs: Building Bridges to Success",
      participants: 200,
      highlights: [
        "Significant growth in participation",
        "Focus on youth entrepreneurship",
        "Introduction of mentorship programs",
        "Enhanced networking opportunities",
        "First startup pitch competition",
      ],
      image: "/WED 2.0/Pictures WED 2.0/IMG_6247.JPG",
      link: "/wed-2",
    },
    {
      version: "WED 3.0",
      year: "2024",
      theme: "Innovate Locally, Impact Globally: Empowering Entrepreneurs for a Sustainable Future",
      participants: "300+ Attended",
      highlights: [
        "Successful sustainable entrepreneurship showcase",
        "Global impact achieved through local innovation",
        "Enhanced vendor exhibition with 50+ booths",
        "International speaker lineup from 5+ countries",
        "Innovation competitions and awards ceremony",
      ],
      image: "/WED 3.0/WED 3.0/IMG_7833.JPG",
      link: "/wed-3",
    },
    {
      version: "WED 4.0",
      year: "2025",
      theme: "Rebuild, Reinvent, Rise: Navigating the Current Economy with Resilience",
      participants: "400+ Expected",
      highlights: [
        "Focus on economic resilience and business sustainability",
        "Strategic rebuilding and reinvention workshops",
        "₦3.37M+ sponsorship target",
        "Partnership and networking opportunities",
        "Enhanced networking and mentorship programs",
      ],
      image: "/WED 3.0/WED 3.0/IMG_8075.JPG",
      link: "/wed-4",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              WED Initiative Overview
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              World Entrepreneurship Day
              <br />
              <span className="text-red-200">Initiative</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              Celebrating and empowering entrepreneurs across three transformative events, building a sustainable
              ecosystem for innovation and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-black">Our Mission & Vision</h2>
                <div className="space-y-8">
                  <div className="bg-red-50 p-6 rounded-2xl">
                    <Target className="h-8 w-8 text-red-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-black">Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To create a vibrant entrepreneurial ecosystem that celebrates innovation, fosters collaboration,
                      and empowers the next generation of business leaders to drive sustainable economic growth.
                    </p>
                  </div>
                  <div className="bg-black p-6 rounded-2xl text-white">
                    <Globe className="h-8 w-8 text-red-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Vision</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To be the premier platform for entrepreneurial development in Northern Nigeria, connecting local
                      innovators with global opportunities and creating lasting impact through sustainable business
                      practices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/WED 2.0/Pictures WED 2.0/IMG_6195.JPG"
                  alt="WED Initiative Impact"
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl">
                  <div className="text-3xl font-bold">600+</div>
                  <div className="text-red-200">Entrepreneurs Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Collective Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500 mb-4">4</div>
              <div className="text-xl text-gray-300 mb-2">WED Events</div>
              <div className="text-sm text-gray-500">2022 - 2025</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500 mb-4">600+</div>
              <div className="text-xl text-gray-300 mb-2">Entrepreneurs Reached</div>
              <div className="text-sm text-gray-500">Across all events</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500 mb-4">50+</div>
              <div className="text-xl text-gray-300 mb-2">Expert Speakers</div>
              <div className="text-sm text-gray-500">Industry leaders</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500 mb-4">₦3.37M+</div>
              <div className="text-xl text-gray-300 mb-2">Sponsorship Target</div>
              <div className="text-sm text-gray-500">For WED 4.0</div>
            </div>
          </div>
        </div>
      </section>

      {/* WED Events Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">WED Events Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the evolution of World Entrepreneurship Day from its inception through WED 3.0's success to the upcoming WED 4.0
            </p>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {wedEvents.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/2">
                  <Image
                    src={event.image || "/WED 3.0/WED 3.0/IMG_8104.JPG"}
                    alt={`${event.version} Event`}
                    width={500}
                    height={300}
                    className="rounded-2xl shadow-lg w-full"
                  />
                </div>
                <div className="lg:w-1/2">
                  <Card className="border-0 shadow-lg hover-lift">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-red-600 text-white text-lg px-4 py-2">{event.version}</Badge>
                        <Badge variant="outline" className="border-red-600 text-red-600">
                          {event.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-black">{event.theme}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-red-600" />
                        {event.participants} Participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {event.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                        <Link href={event.link} className="flex items-center gap-2">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fostering creative solutions and breakthrough thinking in entrepreneurship
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Building strong networks and partnerships for mutual growth and success</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Promoting business practices that create lasting positive impact</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-black">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Striving for the highest standards in all our programs and initiatives</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 gradient-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Join WED 4.0</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Be part of the next evolution in our entrepreneurial journey. Join WED 4.0 and learn to rebuild, reinvent, 
            and rise through economic challenges with resilience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/register">Register for WED 4.0</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/wed-4">Learn About WED 4.0</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
