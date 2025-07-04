import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Award, Medal, CheckCircle, Users, Megaphone, Handshake, Banknote, Mail, MapPin, Calendar, Phone } from "lucide-react"
import Link from "next/link"

export default function SponsorshipPage() {
  const sponsorshipPackages = [
    {
      title: "Platinum Sponsor",
      icon: Crown,
      price: "₦1,000,000+",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      benefits: [
        "Logo on banner & all materials",
        "Full booth",
        "Speaking slot",
        "Official recognition at event",
      ],
    },
    {
      title: "Gold Sponsor",
      icon: Award,
      price: "₦500,000 – ₦999,999",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      benefits: [
        "Logo visibility",
        "Booth space",
        "Recognition in media & program",
      ],
    },
    {
      title: "Silver Sponsor",
      icon: Medal,
      price: "₦250,000 – ₦499,999",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      benefits: [
        "Social media mention",
        "Branded materials",
        "Recognition in program",
        "Certificate of recognition",
      ],
    },
    {
      title: "In-Kind Partner",
      icon: Handshake,
      price: "Value-based",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      benefits: [
        "Provide services/products",
        "Customized branding benefits",
        "Official partnership recognition",
        "Certificate of recognition",
      ],
    },
  ]

  const budgetItems = [
    { item: "Event logistics and venue management", cost: "-" },
    { item: "Vendor stalls for 30+ small businesses", cost: "-" },
    { item: "Branding & marketing (banners, media, shirts)", cost: "-" },
    { item: "Refreshments for participants", cost: "₦500,000" },
    { item: "Kits and materials", cost: "₦400,000" },
    { item: "Speaker & guest hospitality", cost: "₦300,000" },
    { item: "Special support for PLWDs and disadvantaged entrepreneurs", cost: "-" },
    { item: "Total Target", cost: "₦3,370,000" },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Sponsorship</Badge>
            <h1 className="text-4xl font-bold mb-6">Sponsorship Deck for WED 4.0</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Explore the exciting opportunities to sponsor World Entrepreneurship Day (WED) 4.0 – a premier platform for empowering local innovation and global impact.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <Calendar className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">October 4th, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">Amana Event Centre, Randan Kano, Zaria</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <Users className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">400+ Expected</span>
              </div>
            </div>
            <p className="text-md text-gray-500 mb-2">Theme: <span className="font-semibold text-red-600">Rebuild, Reinvent, Rise: Navigating Nigeria's Economy with Resilience</span></p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Mission</h2>
            <p className="text-gray-700 mb-4">To empower, connect, and inspire entrepreneurs by providing platforms for networking, knowledge sharing, growth, and community transformation.</p>
            <p className="text-gray-700 mb-4">Establishment of <span className="font-semibold">Zazzau Version Entrepreneurs (ZVE)</span> – the registered organization now managing WED and future projects.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Why Sponsor WED 4.0?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Engage with Northern Nigeria's largest youth entrepreneurship summit.</li>
              <li>Connect directly with hundreds of young entrepreneurs, SMEs, vendors and change makers.</li>
              <li>Position your brand as a key supporter of youth-led innovation and development.</li>
              <li>Gain brand visibility through our social media campaigns, press coverage and event branding.</li>
              <li>Receive appreciation on event day and certificate of recognition.</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Partnership & Sponsorship Opportunities</h2>
            <p className="text-gray-700 mb-4">We offer flexible sponsorship packages – both in cash and in-kind – that match your branding and CSR goals.</p>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {sponsorshipPackages.map((pkg, index) => (
                <Card key={index} className={`${pkg.borderColor} border-2 hover:shadow-lg transition-shadow flex flex-col`}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full ${pkg.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <pkg.icon className={`h-8 w-8 ${pkg.color}`} />
                    </div>
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-gray-900">{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {pkg.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-auto">
                      <Link href="/sponsor-registration">Choose This Package</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">What We're Raising Funds For</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                    <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-6 text-gray-700">{item.item}</td>
                      <td className="py-2 px-6 text-gray-700">{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">How You Can Support</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Sponsor a participant: <span className="font-semibold">₦6,000</span></li>
              <li>Sponsor a vendor: <span className="font-semibold">₦10,000</span></li>
              <li>Provide refreshments, printing, technical equipment, or branded kits</li>
              <li>Recommend speakers or amplify our reach</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Bank Details</h2>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border-2 border-gray-200 shadow-md">
              <div className="mb-4">
                <p className="text-lg text-gray-600">Account Name</p>
                <p className="text-2xl font-semibold text-gray-900">Zazzau Version Entrepreneurs</p>
              </div>
              <div className="mb-6">
                <p className="text-lg text-gray-600">Bank</p>
                <p className="text-2xl font-semibold text-gray-900">UBA Bank</p>
              </div>
              <div>
                <p className="text-lg text-gray-600">Account Number</p>
                <p className="text-5xl font-bold text-red-600 tracking-wider py-2 bg-white rounded-lg shadow-inner">
                  1027308809
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Let's Collaborate</h2>
            <p className="text-gray-700 mb-2">We believe collaboration builds stronger communities. Let's work together to drive sustainable youth development through entrepreneurship.</p>
            <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">wedzazzauversion@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">Instagram/Facebook: zazzau version Entrepreneurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">08140135206, 09036625032, 07035877985</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3 font-semibold">
              <Link href="/sponsor-registration">Become a Sponsor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
