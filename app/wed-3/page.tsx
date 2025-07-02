import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, Globe, Award, ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventGallery from "../components/EventGallery"
import EventSpeakers from "../components/EventSpeakers"

export default function WED3Page() {
  const innovations = [
    {
      title: "Global Impact Focus",
      description: "Innovate locally, impact globally theme",
      icon: Globe,
    },
    {
      title: "300+ Expected",
      description: "Largest WED event to date",
      icon: Users,
    },
    {
      title: "Sustainability Focus",
      description: "Emphasis on sustainable entrepreneurship",
      icon: Target,
    },
    {
      title: "International Speakers",
      description: "Global thought leaders and experts",
      icon: Award,
    },
  ]

  const newFeatures = [
    "Enhanced vendor exhibition with 50+ booths",
    "International speaker lineup from 5+ countries",
    "Sustainability-focused innovation challenges",
    "Global partnership announcements",
    "Advanced networking platform and app",
    "Live streaming for global audience participation",
  ]

  const expectedOutcomes = [
    {
      metric: "300+",
      description: "Participants Expected",
    },
    {
      metric: "₦25M+",
      description: "Investment Target",
    },
    {
      metric: "50+",
      description: "Vendor Booths",
    },
    {
      metric: "15+",
      description: "International Speakers",
    },
  ]

  const wed3Gallery = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "WED 3.0 Innovation Showcase",
      title: "Innovation Showcase Opening",
      category: "ceremony",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "International Speaker",
      title: "International Keynote Speaker",
      category: "speakers",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Sustainability Workshop",
      title: "Sustainable Business Workshop",
      category: "workshops",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Global Networking",
      title: "Global Networking Session",
      category: "networking",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Innovation Challenge",
      title: "Innovation Challenge Finals",
      category: "exhibition",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Partnership Announcement",
      title: "Global Partnership Signing",
      category: "ceremony",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Tech Exhibition",
      title: "Technology Exhibition",
      category: "exhibition",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Youth Panel",
      title: "Next Generation Panel",
      category: "speakers",
    },
  ]

  const wed3Speakers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Global Innovation Expert",
      company: "Innovation Labs International",
      topic: "Global Innovation Trends",
      bio: "Dr. Johnson is an internationally recognized expert in innovation and has advised governments and corporations across 5 continents.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Global Innovation", "Technology Trends", "Strategic Planning"],
    },
    {
      name: "Ahmed Al-Rashid",
      role: "Sustainability Entrepreneur",
      company: "Green Future Ventures",
      topic: "Sustainable Business Models",
      bio: "Ahmed is a pioneer in sustainable entrepreneurship and has built multiple successful green businesses across Africa and the Middle East.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Sustainability", "Green Business", "Impact Investing"],
    },
    {
      name: "Dr. Kemi Adebayo",
      role: "FinTech Pioneer",
      company: "African Financial Solutions",
      topic: "Financial Inclusion Through Technology",
      bio: "Dr. Adebayo has revolutionized financial services in Africa and her platforms serve over 2 million users across 15 countries.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["FinTech", "Financial Inclusion", "Technology Innovation"],
    },
    {
      name: "James Chen",
      role: "International Investor",
      company: "Global Venture Partners",
      topic: "Cross-Border Investment Opportunities",
      bio: "James has facilitated over $500 million in cross-border investments and specializes in emerging market opportunities.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["International Investment", "Emerging Markets", "Cross-Border Business"],
    },
    {
      name: "Fatima Al-Zahra",
      role: "Social Impact Leader",
      company: "Impact Ventures Africa",
      topic: "Building Businesses for Social Good",
      bio: "Fatima leads one of Africa's largest social impact investment funds and has supported over 100 social enterprises.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Social Impact", "Impact Investing", "Social Entrepreneurship"],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              WED 3.0 - 2024
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED 3.0
              <br />
              <span className="text-red-200">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              "Innovate Locally, Impact Globally: Empowering Entrepreneurs for a Sustainable Future"
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-medium">August 24, 2024</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="h-6 w-6" />
                <span className="text-xl font-medium">300+ Expected</span>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/register" className="flex items-center gap-2">
                Register Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-black">The Future is Now</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  WED 3.0 represents the culmination of our journey towards creating a truly global platform for
                  entrepreneurial excellence. Building on the success of previous events, WED 3.0 focuses on sustainable
                  innovation that creates local impact while addressing global challenges.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  This year's theme emphasizes the power of local innovation to create global change. We're bringing
                  together entrepreneurs, investors, and thought leaders from around the world to share insights on
                  building sustainable businesses that make a lasting positive impact.
                </p>
                <div className="bg-red-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-red-600" />
                    Innovation Focus
                  </h3>
                  <p className="text-gray-700">
                    WED 3.0 introduces sustainability challenges, global partnership announcements, and advanced
                    networking technologies to create unprecedented opportunities for collaboration.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="WED 3.0 Innovation"
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-red-400">300+</div>
                  <div className="text-gray-300">Expected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Innovations */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">WED 3.0 Innovations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {innovations.map((innovation, index) => (
              <Card key={index} className="text-center hover-lift border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <innovation.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">{innovation.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{innovation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">What's New in WED 3.0</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-red-400">Enhanced Features</h3>
                <ul className="space-y-4">
                  {newFeatures.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-red-400">Global Reach</h3>
                <ul className="space-y-4">
                  {newFeatures.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 4}</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <EventGallery eventName="WED 3.0" images={wed3Gallery} />

      {/* Event Speakers */}
      <EventSpeakers eventName="WED 3.0" speakers={wed3Speakers} />

      {/* Expected Outcomes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Expected Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {expectedOutcomes.map((outcome, index) => (
              <Card key={index} className="text-center hover-lift border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-red-600 mb-4">{outcome.metric}</div>
                  <div className="text-gray-600 font-medium">{outcome.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 gradient-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Be Part of WED 3.0</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join us for the most ambitious WED event yet. Register now and be part of the movement that's shaping the
            future of entrepreneurship in Nigeria and beyond.
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
