import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Users, Wrench, Store, Trophy, Music } from "lucide-react"

export default function ActivitiesPage() {
  const activities = [
    {
      icon: Mic,
      title: "Keynote Addresses",
      description: "Inspiring talks on economic resilience and navigating business challenges",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Panel Discussions",
      description: "Expert panels on rebuilding business foundations and sustainable growth",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Wrench,
      title: "Workshops",
      description: "Practical sessions on financial management, risk mitigation, and business resilience",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Store,
      title: "Vendor Sessions",
      description: "Exhibitions and networking opportunities with innovative vendors",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Trophy,
      title: "Games and Competitions",
      description: "Interactive activities to engage participants and encourage creativity",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Live performances and entertainment to enhance the event experience",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ]

  const workshops = [
    "Financial Management in Economic Uncertainty",
    "Digital Transformation for Business Resilience",
    "Supply Chain Optimization Strategies",
    "Risk Management and Business Continuity",
    "Market Research in Volatile Economies",
    "Investment Readiness and Funding Strategy",
    "Legal Compliance for Growing Businesses",
    "Export Development and International Markets",
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Activities</Badge>
            <h1 className="text-4xl font-bold mb-6">What to Expect at WED 4.0</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 2-day program focused on economic resilience, designed to help entrepreneurs rebuild, 
              reinvent, and rise through current economic challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${activity.bgColor} flex items-center justify-center mb-4`}>
                    <activity.icon className={`h-6 w-6 ${activity.color}`} />
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Workshop Topics</CardTitle>
                <CardDescription>
                  Practical sessions designed to equip participants with actionable skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {workshops.map((workshop, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{workshop}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Networking Opportunities</CardTitle>
                <CardDescription>Connect with like-minded entrepreneurs and industry leaders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Vendor Exhibition</h4>
                    <p className="text-sm text-blue-800">Showcase your products and services to a targeted audience</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Coffee Breaks</h4>
                    <p className="text-sm text-green-800">Informal networking sessions during refreshment breaks</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Interactive Sessions</h4>
                    <p className="text-sm text-purple-800">
                      Participate in group activities and collaborative discussions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-center">2-Day Event Schedule Overview</CardTitle>
              <CardDescription className="text-center">
                August 2025 at Business School, Ahmadu Bello University, Zaria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h4 className="font-semibold mb-4 text-red-600">Day 1: REBUILD - Foundation for Resilience</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p><strong>Morning:</strong> Opening Ceremony & Keynote on Economic Resilience</p>
                    <p><strong>Mid-Morning:</strong> Panel - Rebuilding Business Foundations</p>
                    <p><strong>Afternoon:</strong> Workshops on Financial Management & Digital Transformation</p>
                    <p><strong>Evening:</strong> Investor Pitch Competition (Preliminary Rounds)</p>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-4 text-red-600">Day 2: REINVENT & RISE - Innovation and Growth</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p><strong>Morning:</strong> Panel - Reinventing Business Models</p>
                    <p><strong>Mid-Morning:</strong> Panel - Rising Above Challenges</p>
                    <p><strong>Afternoon:</strong> Masterclass Sessions & Investment Readiness</p>
                    <p><strong>Evening:</strong> Pitch Finals, Awards & WED 5.0 Announcement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
