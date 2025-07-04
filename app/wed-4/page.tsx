import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, DollarSign, Award, ArrowRight, Lightbulb, TrendingUp, Handshake } from "lucide-react"
import Link from "next/link"
import BackToTopButton from "../components/BackToTopButton"

export default function WED4Page() {
  const objectives = [
    {
      title: "Business Resilience",
      description: "Provide practical strategies for navigating economic challenges",
      icon: Target,
    },
    {
      title: "Network Building", 
      description: "Connect entrepreneurs with investors, mentors, and peers",
      icon: Users,
    },
    {
      title: "Resource Access",
      description: "Facilitate access to funding, markets, and business support",
      icon: DollarSign,
    },
    {
      title: "Policy Influence",
      description: "Engage policymakers on entrepreneurship-friendly policies",
      icon: Award,
    },
  ]

  const expectedOutcomes = [
    {
      metric: "400+",
      description: "Participants Expected",
    },
    {
      metric: "₦3.37M+",
      description: "Sponsorship Target",
    },
    {
      metric: "100+",
      description: "Business Partnerships",
    },
    {
      metric: "200+",
      description: "Jobs to be Created",
    },
  ]

  const programDay1 = [
    {
      time: "9:00 - 10:30 AM",
      title: "Opening Ceremony",
      description: "Keynote on economic resilience, government address, cultural showcase"
    },
    {
      time: "10:45 AM - 12:15 PM", 
      title: "Panel Discussion",
      description: "Rebuilding Business Foundations: Strategies for Economic Survival"
    },
    {
      time: "1:15 - 2:45 PM",
      title: "Workshops Session A", 
      description: "Financial Management, Digital Transformation, Supply Chain, HR Management"
    },
    {
      time: "3:00 - 4:30 PM",
      title: "Workshops Session B",
      description: "Market Research, Legal Compliance, Risk Management, Partnership Development"
    },
    {
      time: "4:30 - 5:30 PM",
      title: "Investor Pitch Competition",
      description: "Preliminary rounds with startup presentations"
    }
  ]

  const programDay2 = [
    {
      time: "9:00 - 10:30 AM",
      title: "Panel Discussion", 
      description: "Reinventing Business Models: Innovation for Relevance"
    },
    {
      time: "10:45 AM - 12:15 PM",
      title: "Panel Discussion",
      description: "Rising Above Challenges: Scaling for Sustainable Growth"
    },
    {
      time: "1:15 - 2:45 PM",
      title: "Masterclass Sessions",
      description: "Investment Readiness, Export Development, Technology Innovation, Leadership"
    },
    {
      time: "3:00 - 4:00 PM", 
      title: "Investor Pitch Finals",
      description: "Top 10 startups present to investor panel"
    },
    {
      time: "4:00 - 5:30 PM",
      title: "Awards & Closing Ceremony",
      description: "Recognition ceremony and WED 5.0 announcement"
    }
  ]

  const sponsorshipTiers = [
    {
      title: "Platinum Sponsor",
      amount: "₦1,000,000+",
      benefits: ["Logo on all materials", "Full booth", "Speaking slot", "Official recognition"],
      color: "bg-purple-600"
    },
    {
      title: "Gold Sponsor", 
      amount: "₦500,000 - ₦999,999",
      benefits: ["Logo visibility", "Booth space", "Media recognition"],
      color: "bg-yellow-600"
    },
    {
      title: "Silver Sponsor",
      amount: "₦250,000 - ₦499,999", 
      benefits: ["Social media mention", "Branded materials", "Program recognition"],
      color: "bg-gray-600"
    }
  ]

  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              WED 4.0 - 2025
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED 4.0
              <br />
              <span className="text-red-200">Resilience</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              "Rebuild, Reinvent, Rise: Navigating Nigeria's Economy with Resilience"
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-medium">October 4, 2025</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="h-6 w-6" />
                <span className="text-xl font-medium">400+ Expected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Explanation */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-black">Rebuild, Reinvent, Rise</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our theme addresses three critical phases of economic recovery and growth for entrepreneurs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-red-600">REBUILD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Reconstructing business foundations for stability. Learn strategies to strengthen your business infrastructure 
                    and create resilient operational frameworks.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-red-600">REINVENT</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Innovating business models for relevance. Discover new approaches to stay competitive and adapt 
                    to changing market conditions and customer needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-red-600">RISE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Achieving sustainable growth and resilience. Scale your business and create lasting impact 
                    while maintaining financial stability and market position.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-black">Event Objectives</h2>
              <p className="text-xl text-gray-600">
                What we aim to achieve at WED 4.0
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {objectives.map((objective, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <objective.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-black">{objective.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Expected Outcomes</h2>
              <p className="text-xl text-gray-300">
                The impact we're targeting for WED 4.0
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {expectedOutcomes.map((outcome, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-red-500 mb-4">{outcome.metric}</div>
                  <p className="text-xl text-gray-300">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-black">Event Program</h2>
              <p className="text-xl text-gray-600">
                A comprehensive agenda designed for maximum impact and learning.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Day 1 */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-red-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Morning Sessions: Foundations</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {programDay1.map((session, index) => (
                      <div key={index} className="border-l-4 border-red-600 pl-6">
                        <h4 className="font-bold text-lg mb-2">{session.time}</h4>
                        <h5 className="font-semibold text-red-600 mb-2">{session.title}</h5>
                        <p className="text-gray-600 text-sm">{session.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Day 2 */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-red-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl text-center">Afternoon Sessions: Growth</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {programDay2.map((session, index) => (
                      <div key={index} className="border-l-4 border-red-600 pl-6">
                        <h4 className="font-bold text-lg mb-2">{session.time}</h4>
                        <h5 className="font-semibold text-red-600 mb-2">{session.title}</h5>
                        <p className="text-gray-600 text-sm">{session.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-black">Sponsorship Opportunities</h2>
              <p className="text-xl text-gray-600">
                Partner with us to support entrepreneurship and gain brand visibility
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className={`${tier.color} text-white rounded-t-lg`}>
                    <CardTitle className="text-2xl text-center">{tier.title}</CardTitle>
                    <div className="text-3xl font-bold text-center">{tier.amount}</div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-4">
                <Link href="/sponsor-registration">
                  View All Sponsorship Packages <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Build Resilience?</h2>
            <p className="text-xl mb-12 opacity-90">
              Join 400+ entrepreneurs, investors, and thought leaders in redefining business success through resilience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-full"
              >
                <Link href="/register">
                  Register for WED 4.0 <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
              >
                <Link href="/vendor-registration">
                  Become a Vendor <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 mb-4">
                For sponsorship inquiries, please contact us at <a href="mailto:wedzazzauversion@gmail.com" className="font-semibold underline hover:text-red-200">wedzazzauversion@gmail.com</a>.
              </p>
              <Button asChild className="bg-transparent border border-white text-white hover:bg-white hover:text-red-600 rounded-full px-8 py-3 font-semibold">
                <Link href="/sponsorship">View Sponsorship Deck</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Contact Us</h2>
            <p className="text-xl text-gray-600 mb-8">
              Questions about WED 4.0? Contact our team:
            </p>
            <div className="text-lg text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:wedzazzauversion@gmail.com" className="text-red-600 hover:underline">
                  wedzazzauversion@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">WhatsApp:</span> 08140135206, 09036625032, 07035877985
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 