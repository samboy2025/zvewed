import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Award, Target, Lightbulb, Heart, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LeadershipPage() {
  const achievements = [
    {
      icon: Users,
      title: "600+ Lives Impacted",
      description: "Through three successful WED events",
      value: "600+"
    },
    {
      icon: TrendingUp,
      title: "3 Successful Events",
      description: "WED 1.0, 2.0, and 3.0 executed flawlessly",
      value: "3"
    },
    {
      icon: Award,
      title: "Regional Recognition",
      description: "Northern Nigeria's premier entrepreneurship platform",
      value: "Top"
    },
    {
      icon: Globe,
      title: "Movement Building",
      description: "From event to sustainable ecosystem",
      value: "∞"
    }
  ]

  const visionPoints = [
    {
      icon: Target,
      title: "Economic Transformation",
      description: "Drive economic growth through entrepreneurship in Northern Nigeria"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Establish Zaria as a leading center for innovation and startup development"
    },
    {
      icon: Users,
      title: "Youth Empowerment",
      description: "Solve youth unemployment through entrepreneurship education and mentorship"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Create lasting positive change in local communities through business solutions"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Link href="/" className="inline-block mb-6">
                <Image src="/logo.png" alt="ZVE Logo" width={80} height={80} className="bg-white/10 rounded-full p-2" />
              </Link>
              <Badge className="mb-6 bg-red-600 text-white text-lg px-6 py-2">Leadership</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Meet Our Founder</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Visionary leader driving entrepreneurship transformation in Northern Nigeria
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3 text-center">
                <div className="w-64 h-64 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-8xl font-bold text-white">BY</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Bello Yusuf Yusuf</h2>
                <p className="text-red-400 text-xl mb-2">Founder & CEO, ZVE</p>
                <p className="text-gray-400 text-lg">Convener, World Entrepreneurship Day</p>
              </div>

              <div className="lg:w-2/3">
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-red-400">{achievement.value}</div>
                        <CardTitle className="text-white text-lg">{achievement.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Leadership Message */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-black">Complete Leadership Message</h2>
              <p className="text-xl text-gray-600">A personal note from our founder about the journey and vision ahead</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-12 shadow-xl">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6 text-2xl font-semibold text-black">
                  Welcome to Zazzau Version Entrepreneurs (ZVE)!
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
                  <span className="text-red-600 font-bold">600 entrepreneurs and attendees</span> collectively,
                  engaging in workshops, exhibitions, panel discussions, and networking opportunities. The feedback
                  and success stories have been overwhelming, with participants gaining access to funding
                  opportunities, mentorship, partnerships, and business visibility.
                </p>

                <p className="mb-6">
                  As we move forward with WED 4.0, themed{" "}
                  <span className="text-red-600 font-semibold">
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

                <div className="border-t border-gray-300 pt-6 mt-8">
                  <p className="text-lg">
                    <span className="text-black font-semibold">With gratitude,</span>
                    <br />
                    <span className="text-red-600 font-bold text-xl">Bello Yusuf Yusuf</span>
                    <br />
                    <span className="text-gray-600">Founder, ZVE & Convener, WED</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Vision for the Future</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Building a sustainable entrepreneurship ecosystem that transforms communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {visionPoints.map((point, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <point.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{point.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Ready to Join Our Mission?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                  <Link href="/register">Register for WED 4.0</Link>
                </Button>
                <Button asChild variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white rounded-full px-8 py-3">
                  <Link href="/sponsorship">Become a Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Connect with Leadership</h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions or want to discuss partnership opportunities? We'd love to hear from you.
            </p>
            
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-black">Leadership Team</h3>
                    <p className="text-gray-600 mb-4">Get in touch with our founder and leadership team for strategic discussions and partnership opportunities.</p>
                    <p className="text-sm text-gray-500">
                      <strong>Email:</strong> <a href="mailto:wedzazzauversion@gmail.com" className="text-red-600">wedzazzauversion@gmail.com</a><br />
                      <strong>WhatsApp:</strong> 08140135206
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-black">Media & Press</h3>
                    <p className="text-gray-600 mb-4">For media inquiries, interviews, and press-related matters, please reach out to our communications team.</p>
                    <p className="text-sm text-gray-500">
                      <strong>Email:</strong> <a href="mailto:wedzazzauversion@gmail.com" className="text-red-600">wedzazzauversion@gmail.com</a><br />
                      <strong>WhatsApp:</strong> 09036625032, 07035877985
                    </p>
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