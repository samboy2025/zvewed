import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Award, Medal, CheckCircle, Users, Megaphone, Handshake } from "lucide-react"
import Link from "next/link"

export default function SponsorshipPage() {
  const sponsorshipPackages = [
    {
      title: "Platinum Sponsor",
      icon: Crown,
      price: "₦500,000+",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      benefits: [
        "Exclusive naming rights",
        "Prominent logo placement on all materials",
        "Speaking opportunities",
        "Premium booth location",
        "10 complimentary tickets",
        "Social media mentions",
        "Press release inclusion",
      ],
    },
    {
      title: "Gold Sponsor",
      icon: Award,
      price: "₦300,000+",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      benefits: [
        "Logo placement on materials",
        "5 complimentary event tickets",
        "Recognition during event",
        "Standard booth space",
        "Social media mentions",
        "Networking opportunities",
      ],
    },
    {
      title: "Silver Sponsor",
      icon: Medal,
      price: "₦150,000+",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      benefits: [
        "Logo placement in event materials",
        "2 complimentary tickets",
        "Recognition in program",
        "Basic networking access",
      ],
    },
  ]

  const partnershipAreas = [
    {
      icon: Users,
      title: "Event Planning and Logistics",
      description: "Assisting with venue setup, equipment, and coordination",
    },
    {
      icon: Megaphone,
      title: "Marketing and Promotion",
      description: "Helping to promote the event through various channels",
    },
    {
      icon: Handshake,
      title: "Content and Speakers",
      description: "Providing experts and speakers to share insights and knowledge",
    },
  ]

  const budgetItems = [
    { item: "Venue Rental", cost: "₦300,000" },
    { item: "Catering (Breakfast, Lunch, Coffee Breaks)", cost: "₦500,000" },
    { item: "Speaker Honorariums and Travel Expenses", cost: "₦400,000" },
    { item: "Marketing and Promotions", cost: "₦200,000" },
    { item: "Materials and Supplies", cost: "₦100,000" },
    { item: "Technical Equipment (Sound, Projectors)", cost: "₦150,000" },
    { item: "Vendor Booth Setup", cost: "₦50,000" },
    { item: "Volunteer Stipends and T-shirts", cost: "₦170,000" },
    { item: "Security", cost: "₦50,000" },
    { item: "Photography", cost: "₦100,000" },
    { item: "Miscellaneous Expenses", cost: "₦100,000" },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Sponsorship & Partnership</Badge>
            <h1 className="text-4xl font-bold mb-6">Partner with WED 3.0</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in empowering entrepreneurs and fostering innovation. Your support will help create a
              transformative experience for the entrepreneurial community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {sponsorshipPackages.map((pkg, index) => (
              <Card key={index} className={`${pkg.borderColor} border-2 hover:shadow-lg transition-shadow`}>
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${pkg.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <pkg.icon className={`h-8 w-8 ${pkg.color}`} />
                  </div>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-gray-900">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/sponsor-registration">Choose This Package</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Partnership Opportunities</CardTitle>
                <CardDescription>Collaborate with us in various aspects of WED 3.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {partnershipAreas.map((area, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <area.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{area.title}</h4>
                        <p className="text-sm text-gray-600">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Sponsor WED 3.0?</CardTitle>
                <CardDescription>Benefits of partnering with us</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Brand visibility to targeted audience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Networking with industry leaders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Support entrepreneurial community</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Corporate social responsibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Access to innovative startups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Media coverage and PR opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Event Budget Breakdown</CardTitle>
              <CardDescription>Total estimated budget: ₦2,120,000</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {budgetItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item.item}</span>
                    <span className="font-semibold">{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Budget</span>
                  <span className="text-xl font-bold text-blue-600">₦2,120,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner with Us?</h2>
            <p className="text-gray-600 mb-6">
              Join us in creating an impactful event that will drive the entrepreneurial ecosystem forward.
            </p>
            <Button asChild size="lg" className="bg-blue-900 hover:bg-blue-800">
              <Link href="/sponsor-registration">Become a Sponsor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
