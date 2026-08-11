import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Award, Medal, CheckCircle, Users, Megaphone, Handshake, Banknote, Mail, MapPin, Calendar, Phone, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SponsorshipPage() {
  const sponsorshipPackages = [
    {
      title: "PLATINUM Sponsor",
      icon: Crown,
      price: "₦2,000,000+",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      benefits: [
        "Naming rights for selected event properties",
        "Keynote address or primary panel slot",
        "Primary logo placement on all event materials",
        "10 VIP passes for representatives",
        "Exclusive credit inside post-event Impact Report",
      ],
    },
    {
      title: "GOLD Sponsor",
      icon: Award,
      price: "₦1,000,000 – ₦1,999,999",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      benefits: [
        "Logo prominently placed on banners and stage backdrops",
        "Interactive panel discussion opportunity",
        "6 VIP passes for representatives",
        "Dedicated social media mentions and Impact Report credit",
      ],
    },
    {
      title: "SILVER Sponsor",
      icon: Medal,
      price: "₦500,000 – ₦999,999",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      benefits: [
        "Logo on selected promotional materials",
        "3 VIP passes for representatives",
        "Social media and Impact Report acknowledgement",
        "Certificate of recognition",
      ],
    },
    {
      title: "GRANT CO-FUNDER",
      icon: Sparkles,
      price: "Negotiable",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      benefits: [
        "Named association with the SME Grant Pool",
        "Direct presentation of awards at Day Two ceremony",
        "Dedicated section inside post-event Impact Report",
        "Custom community-level advisory credit",
      ],
    },
  ]

  const budgetItems = [
    { item: "1. Venue and Facility (NAERLS Hall 2 days + setup + power)", cost: "₦800,000" },
    { item: "2. Production and Technical (PA, screens, stage, lighting 2 days)", cost: "₦980,000" },
    { item: "3. Pavilion Infrastructure (Partition, expert honoraria, materials for 4 pavilions)", cost: "₦620,000" },
    { item: "4. Exhibition Infrastructure (30 booths, branding, tables, chairs)", cost: "₦980,000" },
    { item: "5. Catering and Refreshments (Lunch, Tea, VIP catering, networking reception)", cost: "₦3,620,000" },
    { item: "6. Branding and Event Materials (Banners, booklets, merchandise, outdoor signage)", cost: "₦1,910,000" },
    { item: "7. Marketing and Communications (Social media ads, designs, videos, PR)", cost: "₦440,000" },
    { item: "8. Speaker and Mentor Logistics (Transport, accommodation, appreciation gifts)", cost: "₦725,000" },
    { item: "9. Pitch Competition (Coordination, judges, pitch coaching, certificates)", cost: "₦415,000" },
    { item: "10. Photography, Video, Documentation (Photographer, videographer, drone, editing)", cost: "₦480,000" },
    { item: "11. Security and Safety (Security, crowd management, first aid 2 days)", cost: "₦140,000" },
    { item: "12. Registration & Management (Online registration, desk setup, data management)", cost: "₦100,000" },
    { item: "13. Volunteers and Workforce (T-shirts, coordination, stipends for 10 leads)", cost: "₦330,000" },
    { item: "14. Transportation & Logistics (Participant buses, haulage, fuel)", cost: "₦230,000" },
    { item: "15. Monitoring, Evaluation and Reporting (Surveys, analysis, impact report writing)", cost: "₦190,000" },
    { item: "16. Contingency Reserve (~5%)", cost: "₦694,000" },
    { item: "Total Implementation Budget", cost: "₦12,654,000" },
  ]

  return (
    <div className="min-h-screen py-12 text-black bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 text-white">WED 5.0 Anniversary Sponsorship</Badge>
            <h1 className="text-4xl font-bold mb-6 text-black">Sponsorship Deck for WED 5.0</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Explore corporate investment opportunities for World Entrepreneurs Day (WED) – Zazzau Version 5.0. Partner with Northern Nigeria's foremost ecosystem.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <Calendar className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">October 3–4, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">NAERLS Ultra Modern Hall, ABU Zaria</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-100 shadow-sm">
                <Users className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-800">400–500 Expected</span>
              </div>
            </div>
            <p className="text-md text-gray-500 mb-2">Theme: <span className="font-semibold text-red-600">Building Resilient Enterprises for the Future</span></p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Mission & Ecosystem Evolution</h2>
            <p className="text-gray-700 mb-4">To empower, connect, and inspire entrepreneurs by providing platforms for networking, knowledge sharing, growth, and community transformation.</p>
            <p className="text-gray-700 mb-4">WED 5.0 marks the transition from an annual convening event to a structured, year-round enterprise development ecosystem managed by <strong>Zazzau Version Entrepreneurs (ZVE)</strong>.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Why Sponsor WED 5.0?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Engage with Northern Nigeria's premier youth and SME entrepreneurship anniversary summit.</li>
              <li>Connect directly with 400-500 young entrepreneurs, domain experts, agribusinesses, and startups.</li>
              <li>Position your brand as a strategic ecosystem investor driving real youth empowerment.</li>
              <li>Gain brand visibility through extensive PR campaigns, lanyards, stage backdrops, and video documentations.</li>
              <li>Receive appreciation, named grant association, and exclusive credit in the post-event Impact Report.</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Partnership & Sponsorship Opportunities</h2>
            <p className="text-gray-700 mb-4">We offer flexible, ROI-driven partnership packages focused on long-term enterprise growth.</p>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {sponsorshipPackages.map((pkg, index) => (
                <Card key={index} className={`${pkg.borderColor} border-2 hover:shadow-lg transition-shadow flex flex-col bg-white text-black`}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full ${pkg.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <pkg.icon className={`h-8 w-8 ${pkg.color}`} />
                    </div>
                    <CardTitle className="text-xl text-black">{pkg.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-gray-900">{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow text-sm">
                      {pkg.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white rounded-full">
                      <Link href="/sponsor-registration">Choose This Package</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Detailed Implementation Expenditure</h2>
            <p className="text-gray-600 text-sm mb-4">Our total estimated implementation budget is <strong>₦12,654,000</strong>. Figures are based on Zaria market rates.</p>
            <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-md">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-red-950 text-white">
                    <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider">Item / Category</th>
                    <th className="py-3 px-6 text-right text-xs font-semibold uppercase tracking-wider">Total (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgetItems.map((item, idx) => (
                    <tr key={idx} className={idx === budgetItems.length - 1 ? 'bg-red-50 font-bold' : ''}>
                      <td className="py-3 px-6 text-gray-700 text-sm">{item.item}</td>
                      <td className={`py-3 px-6 text-right text-sm ${idx === budgetItems.length - 1 ? 'text-red-700 font-extrabold' : 'text-gray-900'}`}>{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">How You Can Support</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Sponsor an SME exhibition booth: <span className="font-semibold">₦25,000</span></li>
              <li>Co-fund the SME Grant Pool: <span className="font-semibold">Negotiable</span></li>
              <li>Provide transport, lanyards, printing, media slots, or high-value expert facilitators</li>
              <li>Amplify our outreach campaign and register your team members</li>
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
                <p className="text-5xl font-bold text-red-600 tracking-wider py-2 bg-white rounded-lg shadow-inner max-w-sm mx-auto">
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
                <span className="text-gray-700">Instagram/Facebook: wed_zazzau_version</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">+2348109569323, 09036625032, 07035877985</span>
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
