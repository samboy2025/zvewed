import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, Trophy, Handshake, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventGallery from "../components/EventGallery"
import { EventSpeakers, Speaker } from "../components/EventSpeakers"
import BackToTopButton from "../components/BackToTopButton"

export default function WED2Page() {
  const highlights = [
    {
      title: "200 Participants",
      description: "Nearly tripled attendance from WED 1.0",
      icon: Users,
    },
    {
      title: "Youth Focus",
      description: "Empowering the next generation of entrepreneurs",
      icon: Target,
    },
    {
      title: "Mentorship Program",
      description: "Introduced structured mentoring initiatives",
      icon: Handshake,
    },
    {
      title: "Pitch Competition",
      description: "First-ever startup pitch competition",
      icon: Trophy,
    },
  ]

  const achievements = [
    "Expanded participant base to 200+ entrepreneurs",
    "Launched the first WED mentorship program",
    "Introduced startup pitch competition with ₦500,000 in prizes",
    "Facilitated ₦15M+ in investment connections",
    "Established partnerships with 10+ organizations",
    "Created youth entrepreneurship development track",
  ]

  const winners = [
    {
      startup: "AgriTech Solutions",
      founder: "Amina Abdullahi",
      prize: "₦200,000",
      category: "Best Innovation",
    },
    {
      startup: "EduConnect",
      founder: "Ibrahim Musa",
      prize: "₦150,000",
      category: "Social Impact",
    },
    {
      startup: "FinanceFlow",
      founder: "Hauwa Aliyu",
      prize: "₦100,000",
      category: "Best Pitch",
    },
  ]

  const wed2Gallery = [
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6193.JPG",
      alt: "Networking at WED 2.0",
      title: "Networking",
      category: "Networking",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6198.JPG",
      alt: "Speaker session at WED 2.0",
      title: "Speaker Session",
      category: "Speakers",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6209.JPG",
      alt: "Audience at WED 2.0",
      title: "Audience",
      category: "Audience",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6226.JPG",
      alt: "Panel discussion at WED 2.0",
      title: "Panel Discussion",
      category: "Panels",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6244.JPG",
      alt: "Workshop at WED 2.0",
      title: "Workshop",
      category: "Workshops",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6262.JPG",
      alt: "Group photo at WED 2.0",
      title: "Group Photo",
      category: "Networking",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6285.JPG",
      alt: "Award ceremony at WED 2.0",
      title: "Award Ceremony",
      category: "Awards",
    },
    {
      src: "/WED 2.0/Pictures WED 2.0/IMG_6291.JPG",
      alt: "Exhibition booth at WED 2.0",
      title: "Exhibition Booth",
      category: "Exhibition",
    },
  ]

  const keyTopics = [
    {
      title: "Youth Empowerment",
      description: "Focusing on empowering the next generation of young entrepreneurs with skills and opportunities.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6203.JPG",
    },
    {
      title: "Building Bridges to Success",
      description: "Creating pathways for entrepreneurs to connect with mentors, investors, and resources.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6240.JPG",
    },
    {
      title: "Startup Pitch Competition",
      description: "Introducing the first-ever pitch competition to showcase and fund innovative startup ideas.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6278.JPG",
    },
  ]

  const wed2Speakers: Speaker[] = [
    {
      name: "Bello Yusuf Yusuf",
      role: "Founder, ZVE",
      company: "Zazzau Version Entrepreneurs",
      topic: "Empowering the Next Generation of Entrepreneurs",
      bio: "Bello Yusuf Yusuf is the visionary founder of ZVE, dedicated to fostering youth entrepreneurship.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6213.JPG",
      expertise: ["Youth Empowerment", "Community Building", "Leadership"],
    },
    {
      name: "Aisha Dantata",
      role: "CEO",
      company: "Dantata Enterprises",
      topic: "Building Bridges to Success for Young Founders",
      bio: "Aisha Dantata is a seasoned entrepreneur with a passion for mentoring young business leaders.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6234.JPG",
      expertise: ["Mentorship", "Business Strategy", "Scaling"],
    },
    {
      name: "Dr. Nneka Eze",
      role: "Director",
      company: "VGG",
      topic: "Securing Your First Investment",
      bio: "Dr. Nneka Eze is an experienced venture capitalist focused on early-stage startups in Africa.",
      image: "/WED 2.0/Pictures WED 2.0/IMG_6250.JPG",
      expertise: ["Venture Capital", "Investment", "Pitching"],
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
              WED 2.0 - 2023
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED 2.0
              <br />
              <span className="text-red-200">Growth</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              "Empowering the Next Generation of Entrepreneurs: Building Bridges to Success"
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-medium">August 2023</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="h-6 w-6" />
                <span className="text-xl font-medium">200 Participants</span>
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
                <h2 className="text-4xl font-bold mb-8 text-black">Remarkable Growth</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  WED 2.0 represented a significant milestone in our journey, with participation nearly tripling from
                  the inaugural event. This growth reflected the increasing recognition of WED as a premier platform for
                  entrepreneurial development in Northern Nigeria.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  The event introduced several new features including a structured mentorship program, the first-ever
                  startup pitch competition, and specialized tracks for youth entrepreneurship. These additions helped
                  create more targeted value for different segments of our entrepreneurial community.
                </p>
                <div className="bg-red-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-black">Key Innovation</h3>
                  <p className="text-gray-700">
                    WED 2.0 introduced the "Bridge to Success" mentorship program, connecting experienced entrepreneurs
                    with emerging startups for ongoing guidance and support.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/WED 2.0/Pictures WED 2.0/IMG_6195.JPG"
                  alt="WED 2.0 Group Photo"
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
              <EventGallery eventName="WED 2.0" images={wed2Gallery} />
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

      {/* Pitch Competition Winners */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Pitch Competition Winners</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {winners.map((winner, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover-lift">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white">{winner.startup}</CardTitle>
                  <CardDescription className="text-red-400">{winner.founder}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">{winner.prize}</div>
                  <Badge className="bg-red-600 text-white">{winner.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-300 mb-6">
              Total prize pool of ₦500,000 distributed to innovative startups
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
              <Link href="/wed-3">See WED 3.0 Innovations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Speakers */}
      <EventSpeakers eventName="WED 2.0" speakers={wed2Speakers} />

      {/* Achievements */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-black">Major Achievements</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-black">Impact Metrics</h3>
                    <ul className="space-y-4">
                      {achievements.slice(0, 3).map((achievement, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-black">Strategic Outcomes</h3>
                    <ul className="space-y-4">
                      {achievements.slice(3).map((achievement, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm font-bold">{index + 4}</span>
                          </div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">WED 2.0 Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">200</div>
              <div className="text-gray-600">Participants</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">₦15M+</div>
              <div className="text-gray-600">Investments Connected</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">25</div>
              <div className="text-gray-600">Startups Pitched</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Mentorship Pairs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 gradient-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Building on Success</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            WED 2.0's success paved the way for even greater innovations in WED 3.0. Join us as we continue to build
            bridges to entrepreneurial success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/wed-3" className="flex items-center gap-2">
                Explore WED 3.0 <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/register">Register for WED 4.0</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
