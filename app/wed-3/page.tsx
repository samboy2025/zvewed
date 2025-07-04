import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, Globe, Award, ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventGallery from "../components/EventGallery"
import { EventSpeakers, Speaker } from "@/app/components/EventSpeakers"
import BackToTopButton from "../components/BackToTopButton"

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
      src: "/WED 3.0/WED 3.0/IMG_7801.JPG",
      alt: "Networking at WED 3.0",
      title: "Networking",
      category: "Networking",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7819.JPG",
      alt: "Speaker session at WED 3.0",
      title: "Speaker Session",
      category: "Speakers",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7843.JPG",
      alt: "Audience at WED 3.0",
      title: "Audience",
      category: "Audience",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7865.JPG",
      alt: "Panel discussion at WED 3.0",
      title: "Panel Discussion",
      category: "Panels",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7888.JPG",
      alt: "Workshop at WED 3.0",
      title: "Workshop",
      category: "Workshops",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7922.JPG",
      alt: "Group photo at WED 3.0",
      title: "Group Photo",
      category: "Networking",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_7951.JPG",
      alt: "Award ceremony at WED 3.0",
      title: "Award Ceremony",
      category: "Awards",
    },
    {
      src: "/WED 3.0/WED 3.0/IMG_8001.JPG",
      alt: "Exhibition booth at WED 3.0",
      title: "Exhibition Booth",
      category: "Exhibition",
    },
  ]

  const wed3Speakers: Speaker[] = [
    {
      name: "Dr. Aminu Yusuf",
      role: "Lead, ZVE",
      company: "Zazzau Version Entrepreneurs",
      topic: "The Future of Entrepreneurship in Northern Nigeria",
      bio: "Dr. Aminu Yusuf is the visionary leader behind ZVE, driving the mission to empower entrepreneurs across the region.",
      image: "/WED 3.0/WED 3.0/IMG_8075.JPG",
      expertise: ["Leadership", "Community Building", "Ecosystem Development"],
    },
    {
      name: "Hajiya Fatima Bello",
      role: "Founder",
      company: "Sustainable Futures",
      topic: "Building Socially Responsible Businesses",
      bio: "Hajiya Fatima Bello is a renowned social entrepreneur dedicated to creating sustainable and impactful ventures.",
      image: "/WED 3.0/WED 3.0/IMG_7916.JPG",
      expertise: ["Social Entrepreneurship", "Sustainability", "Impact Investment"],
    },
    {
      name: "Mr. David Adekunle",
      role: "CEO",
      company: "TechGen Africa",
      topic: "Leveraging Technology for Growth",
      bio: "Mr. David Adekunle is a leading figure in the African tech scene, helping startups scale through technology.",
      image: "/WED 3.0/WED 3.0/IMG_7992.JPG",
      expertise: ["Technology", "Startups", "Venture Capital"],
    },
    {
      name: "Aisha Ibrahim",
      role: "Innovation Hub Manager",
      company: "Zaria Innovation Hub",
      topic: "Fostering Local Innovation",
      bio: "Aisha Ibrahim is passionate about creating spaces for innovators to collaborate and thrive.",
      image: "/WED 3.0/WED 3.0/IMG_7930.JPG",
      expertise: ["Innovation Management", "Community Management", "Startups"],
    },
    {
      name: "Chinedu Okoro",
      role: "Investment Analyst",
      company: "Savannah Capital",
      topic: "Investor Readiness for Startups",
      bio: "Chinedu Okoro helps startups understand the investment landscape and prepare for funding.",
      image: "/WED 3.0/WED 3.0/IMG_7840.JPG",
      expertise: ["Investment", "Financial Modeling", "Venture Capital"],
    },
  ]

  const keyTopics = [
    {
      title: "Global Entrepreneurship",
      description: "Featuring an international speaker lineup from over 5 countries, bringing diverse perspectives.",
      image: "/WED 3.0/WED 3.0/IMG_7934.JPG",
    },
    {
      title: "Innovation and Technology",
      description: "Driving discussions on how technology is reshaping industries and creating new opportunities.",
      image: "/WED 3.0/WED 3.0/IMG_7962.JPG",
    },
    {
      title: "Startup Funding and Investment",
      description: "Connecting startups with potential investors and providing insights into securing funding.",
      image: "/WED 3.0/WED 3.0/IMG_7989.JPG",
    },
    {
      title: "Sustainable Business Practices",
      description: "Promoting environmentally and socially responsible entrepreneurship for long-term success.",
      image: "/WED 3.0/WED 3.0/IMG_8021.JPG",
    },
    {
      title: "Policy and Advocacy",
      description: "Engaging with policymakers to create a more favorable environment for entrepreneurs.",
      image: "/WED 3.0/WED 3.0/IMG_8055.JPG",
    },
  ]

  return (
    <div className="min-h-screen">
      <BackToTopButton />
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
                <span className="text-xl font-medium">300+ Attended</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-black">Innovation Achieved</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  WED 3.0 successfully represented the culmination of our journey towards creating a truly global platform for
                  entrepreneurial excellence. Building on the success of previous events, WED 3.0 focused on sustainable
                  innovation that creates local impact while addressing global challenges.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  The theme "Innovate Locally, Impact Globally" successfully demonstrated the power of local innovation to create global change. 
                  We successfully brought together 300+ entrepreneurs, investors, and thought leaders to share insights on
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
                  src="/WED 3.0/WED 3.0/IMG_7902.JPG"
                  alt="WED 3.0 Event Highlights"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-red-400">300+</div>
                  <div className="text-gray-300">Achieved</div>
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

      {/* Key Topics */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Key Topics Covered</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {keyTopics.map((topic, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  width={400}
                  height={250}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3">{topic.title}</CardTitle>
                <p className="text-gray-600">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Event Gallery</h2>
        <EventGallery eventName="WED 3.0" images={wed3Gallery} />
      </div>

      {/* Event Speakers */}
      <EventSpeakers eventName="WED 3.0" speakers={wed3Speakers} />

      {/* Expected Outcomes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Achieved Impact</h2>
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

      {/* Success & Next Event CTA */}
      <section className="py-24 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-black">Ready for the Next Chapter?</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              The journey of innovation and impact continues with WED 4.0. Join us as we build on this legacy and
              tackle new challenges in the entrepreneurial landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-4 text-lg">
                <Link href="/gallery">View WED 3.0 Gallery</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full px-8 py-4 text-lg"
              >
                <Link href="/about">Learn About ZVE</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
