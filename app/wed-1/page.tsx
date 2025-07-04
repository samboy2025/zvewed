"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, Lightbulb, Award, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventGallery from "../components/EventGallery"
import { EventSpeakers, Speaker } from "../components/EventSpeakers"
import BackToTopButton from "../components/BackToTopButton"

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
      src: "/WED 1.0/Pictures WED 1.0/DSC_2287_Original.jpg",
      alt: "Networking at WED 1.0",
      title: "Networking at WED 1.0",
      category: "Networking",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/DSC_2322_Original.jpg",
      alt: "Speaker session at WED 1.0",
      title: "Speaker session at WED 1.0",
      category: "Speakers",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/DSC_2396_Original.jpg",
      alt: "Audience at WED 1.0",
      title: "Audience at WED 1.0",
      category: "Audience",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/DSC_2419_Original.jpg",
      alt: "Panel discussion at WED 1.0",
      title: "Panel discussion at WED 1.0",
      category: "Panels",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/DSC_2500_Original.JPG",
      alt: "Workshop at WED 1.0",
      title: "Workshop at WED 1.0",
      category: "Workshops",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/DSC_2573_Original.JPG",
      alt: "Group photo at WED 1.0",
      title: "Group photo at WED 1.0",
      category: "Networking",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/IMG_1285.PNG",
      alt: "Award ceremony at WED 1.0",
      title: "Award ceremony at WED 1.0",
      category: "Awards",
    },
    {
      src: "/WED 1.0/Pictures WED 1.0/IMG_1357.JPG",
      alt: "Exhibition booth at WED 1.0",
      title: "Exhibition booth at WED 1.0",
      category: "Exhibition",
    },
  ]

  const keyTopics = [
    {
      title: "Community Building",
      description: "Building the foundation for entrepreneurship awareness and community building in Northern Nigeria.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2299_Original.jpg",
    },
    {
      title: "Exploring Opportunities",
      description: "Providing a platform for entrepreneurs to explore new business opportunities, ideas, and collaborations.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2425_Original.jpg",
    },
    {
      title: "Building Networks",
      description: "Connecting entrepreneurs, mentors, investors, and industry experts to foster a supportive ecosystem.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2585_Original.JPG",
    },
  ]

  const wed1Speakers: Speaker[] = [
    {
      name: "Bello Yusuf Yusuf",
      role: "Convener",
      company: "ZVE",
      topic: "The Vision for Entrepreneurship in Zazzau",
      bio: "The foundational speech setting the stage for the WED movement.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2368_Original.jpg",
      expertise: ["Vision", "Community", "Entrepreneurship"],
    },
    {
      name: "Amina Ahmed",
      role: "Panelist",
      company: "Local Artisan Cooperative",
      topic: "From Local Craft to Business",
      bio: "Shared insights on turning local skills into viable businesses.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2502_Original.jpg",
      expertise: ["Artisan Business", "Local Economy", "Craftsmanship"],
    },
    {
      name: "Dr. Suleiman Ibrahim",
      role: "Keynote Speaker",
      company: "Ahmadu Bello University",
      topic: "The Role of Education in Entrepreneurship",
      bio: "An inspiring talk on how academic knowledge can fuel innovation.",
      image: "/WED 1.0/Pictures WED 1.0/DSC_2568_Original.jpg",
      expertise: ["Education", "Innovation", "Academia"],
    },
  ]

  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600 text-white text-lg px-6 py-2">
              WED 1.0 - Foundation (2022)
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transition in the Entrepreneurship Landscape
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Exploring Opportunities and Networks to Build a Sustainable Future
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-black">About WED 1.0</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    World Entrepreneurship Day (WED) 1.0, held in 2022, marked the beginning of a transformative journey for the entrepreneurial ecosystem in Zazzau and beyond. With the theme "Transition in the Entrepreneurship Landscape: Exploring Opportunities and Network," the event brought together 70 pioneering entrepreneurs, students, and thought leaders.
                  </p>
                  <p>
                    This foundational event focused on building awareness, fostering a community of innovators, and providing a platform for exploring emerging business opportunities. It successfully laid the groundwork for what would become Northern Nigeria's premier entrepreneurship platform, creating a strong foundation for collaboration and growth in the years to follow.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/WED 1.0/Pictures WED 1.0/IMG_1667.JPG"
                  alt="WED 1.0 Group Photo"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>

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
              <EventGallery eventName="WED 1.0" images={wed1Gallery} />
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
                  src="/WED 1.0/Pictures WED 1.0/DSC_2299_Original.jpg"
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
