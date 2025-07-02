import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, Lightbulb, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventGallery from "../components/EventGallery"
import EventSpeakers from "../components/EventSpeakers"

export default function WED1Page() {
  const highlights = [
    {
      title: "Foundation Event",
      description: "Established the WED movement in Zazzau region",
      icon: Target,
    },
    {
      title: "70 Participants",
      description: "Entrepreneurs, students, and industry professionals",
      icon: Users,
    },
    {
      title: "Network Building",
      description: "Created initial connections and partnerships",
      icon: Lightbulb,
    },
    {
      title: "Knowledge Sharing",
      description: "Workshops on digital business strategies",
      icon: Award,
    },
  ]

  const keyOutcomes = [
    "Established the foundation for annual WED events",
    "Created a network of 70+ entrepreneurs and professionals",
    "Introduced digital marketing concepts to local businesses",
    "Facilitated initial business partnerships and collaborations",
    "Set the stage for future entrepreneurship development programs",
  ]

  const speakers = [
    {
      name: "Dr. Aminu Kano",
      role: "Entrepreneurship Expert",
      topic: "Digital Transformation in Business",
    },
    {
      name: "Fatima Abdullahi",
      role: "Tech Entrepreneur",
      topic: "Building Sustainable Startups",
    },
    {
      name: "Ibrahim Musa",
      role: "Business Consultant",
      topic: "Market Research and Validation",
    },
  ]

  const wed1Gallery = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "WED 1.0 Opening Ceremony",
      title: "Opening Ceremony",
      category: "ceremony",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Digital Marketing Workshop",
      title: "Digital Marketing Workshop",
      category: "workshops",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Networking Session",
      title: "Entrepreneurs Networking",
      category: "networking",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Panel Discussion",
      title: "Industry Panel Discussion",
      category: "speakers",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Business Consultation",
      title: "One-on-One Consultations",
      category: "networking",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Group Photo",
      title: "WED 1.0 Participants",
      category: "ceremony",
    },
  ]

  const wed1Speakers = [
    {
      name: "Dr. Aminu Kano",
      role: "Entrepreneurship Expert",
      company: "ABU Business School",
      topic: "Digital Transformation in Business",
      bio: "Dr. Kano is a renowned expert in digital business transformation with over 15 years of experience helping businesses adapt to the digital age.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Digital Marketing", "Business Strategy", "Innovation"],
    },
    {
      name: "Fatima Abdullahi",
      role: "Tech Entrepreneur",
      company: "InnovateTech Solutions",
      topic: "Building Sustainable Startups",
      bio: "Fatima is the founder of a successful tech startup and passionate advocate for sustainable business practices in the technology sector.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Startup Development", "Sustainability", "Technology"],
    },
    {
      name: "Ibrahim Musa",
      role: "Business Consultant",
      company: "Northern Business Advisors",
      topic: "Market Research and Validation",
      bio: "Ibrahim specializes in helping entrepreneurs validate their business ideas and conduct effective market research for successful launches.",
      image: "/placeholder.svg?height=300&width=400",
      expertise: ["Market Research", "Business Validation", "Consulting"],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              WED 1.0 - 2022
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED 1.0
              <br />
              <span className="text-red-200">Foundation</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              "Transition in the Entrepreneurship Landscape: Exploring Opportunities and Network"
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-medium">August 2022</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="h-6 w-6" />
                <span className="text-xl font-medium">70 Participants</span>
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
                <h2 className="text-4xl font-bold mb-8 text-black">The Beginning of WED</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  WED 1.0 marked the inaugural World Entrepreneurship Day event in the Zazzau region. This foundational
                  event brought together 70 passionate entrepreneurs, students, and industry professionals to explore
                  the evolving entrepreneurship landscape and build meaningful networks.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  The event focused on understanding the transition happening in the business world, particularly the
                  shift towards digital platforms and innovative business models. Participants gained valuable insights
                  into market opportunities and learned how to leverage technology for business growth.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                  <Link href="/wed-2" className="flex items-center gap-2">
                    See WED 2.0 Evolution <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="WED 1.0 Event Highlights"
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-red-400">70</div>
                  <div className="text-gray-300">Participants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Event Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover-lift border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Speakers</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {speakers.map((speaker, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover-lift">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{speaker.name.charAt(0)}</span>
                  </div>
                  <CardTitle className="text-white">{speaker.name}</CardTitle>
                  <CardDescription className="text-red-400">{speaker.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{speaker.topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <EventGallery eventName="WED 1.0" images={wed1Gallery} />

      {/* Event Speakers */}
      <EventSpeakers eventName="WED 1.0" speakers={wed1Speakers} />

      {/* Key Outcomes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-black">Key Outcomes & Impact</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {keyOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 text-lg">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-black">WED 1.0 Legacy</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              WED 1.0 laid the foundation for what would become a transformative annual event. The connections made,
              knowledge shared, and enthusiasm generated during this inaugural event set the stage for the remarkable
              growth we've seen in subsequent years.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">70</div>
                <div className="text-gray-600">Initial Network</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
                <div className="text-gray-600">Partnerships Formed</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">5</div>
                <div className="text-gray-600">Startups Launched</div>
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-4 text-lg">
              <Link href="/wed-overview">Explore Full WED Journey</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
