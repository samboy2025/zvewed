"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Target, DollarSign, Award, ArrowRight, Lightbulb, TrendingUp, Handshake, Store, MapPin, Building, ShieldCheck, HelpCircle } from "lucide-react"
import Link from "next/link"
import BackToTopButton from "../components/BackToTopButton"

export default function WED5Page() {
  const objectives = [
    {
      title: "Sector-Specific Pavilions",
      description: "Deliver sector-specific enterprise knowledge through expert-facilitated pavilions.",
      icon: Lightbulb,
    },
    {
      title: "Business Resilience",
      description: "Build business resilience through access to finance, operational, digital, and market-access strategies.",
      icon: Target,
    },
    {
      title: "Investment Readiness",
      description: "Improve investment readiness among selected SMEs through a structured pitch competition.",
      icon: TrendingUp,
    },
    {
      title: "Market Access",
      description: "Create direct market access through an Enterprise Exhibition running across both days.",
      icon: Store,
    },
    {
      title: "Direct Capital Support",
      description: "Channel direct enterprise capital to six SMEs through a transparent competitive pitch process.",
      icon: DollarSign,
    },
    {
      title: "Measurable Impact",
      description: "Produce a post-event impact report documenting measurable outcomes for all stakeholders.",
      icon: Award,
    },
  ]

  const expectedOutcomes = [
    {
      metric: "400 - 500",
      description: "Total participants (both days)",
    },
    {
      metric: "4",
      description: "Enterprise pavilions (sector-specific)",
    },
    {
      metric: "30+",
      description: "Exhibition participants minimum",
    },
    {
      metric: "6",
      description: "SME pitch finalists",
    },
    {
      metric: "10 - 15",
      description: "Experts and mentors engaged",
    },
    {
      metric: "60 Days",
      description: "Impact report produced post-event",
    }
  ]

  const pavilions = [
    {
      name: "Trade and Commerce",
      who: "Traders, wholesalers, retailers, and small business owners.",
    },
    {
      name: "Technology and Innovation",
      who: "Tech startups, digital services, fintech, and software-based businesses.",
    },
    {
      name: "Agribusiness and Food Processing",
      who: "Farmers, food entrepreneurs, agro-processors, and input supply businesses.",
    },
    {
      name: "Creative and Media",
      who: "Fashion designers, photographers, content creators, and arts entrepreneurs.",
    },
  ]

  const pitches = [
    { position: "1st Position", grant: "₦1,000,000", support: "Mentorship and implementation support" },
    { position: "2nd Position", grant: "₦750,000", support: "Mentorship and implementation support" },
    { position: "3rd Position", grant: "₦500,000", support: "Mentorship and implementation support" },
    { position: "4th Position", grant: "₦300,000", support: "ZVE community advisory" },
    { position: "5th Position", grant: "₦250,000", support: "ZVE community advisory" },
    { position: "6th Position", grant: "₦200,000", support: "ZVE community advisory" },
  ]

  const programDay1 = [
    {
      time: "8:00 - 9:00 AM",
      title: "Registration",
      description: "Check-in and exhibition walkthrough (On-site)"
    },
    {
      time: "9:00 - 9:45 AM",
      title: "Opening Ceremony",
      description: "Convener's address, patron's remark, keynote (Plenary)"
    },
    {
      time: "9:45 - 10:00 AM",
      title: "Pavilion Direction",
      description: "Participants assigned to sector pavilions (Transition)"
    },
    {
      time: "10:00 AM - 1:00 PM",
      title: "Pavilion Session One",
      description: "Expert facilitation; sector-specific discussions (Pavilion)"
    },
    {
      time: "1:00 - 2:00 PM",
      title: "Lunch and Exhibition",
      description: "Catered lunch; enterprise exhibition open (Networking)"
    },
    {
      time: "2:00 - 4:00 PM",
      title: "Pavilion Session Two",
      description: "Advisory, mentorship, peer problem-solving (Pavilion)"
    },
    {
      time: "4:00 - 4:45 PM",
      title: "Plenary Panel",
      description: "Cross-sector resilience conversation (Plenary)"
    },
    {
      time: "4:45 - 5:15 PM",
      title: "Networking and Close",
      description: "Day close; pitch finalist announcement (Networking)"
    }
  ]

  const programDay2 = [
    {
      time: "8:30 - 9:00 AM",
      title: "Registration",
      description: "Day Two check-in; exhibition open (On-site)"
    },
    {
      time: "9:00 - 9:30 AM",
      title: "Day Two Opening",
      description: "Fireside conversation (Plenary)"
    },
    {
      time: "9:30 AM - 12:30 PM",
      title: "Pitch Finals – Round One",
      description: "Three enterprises pitch before judges (Pitch Stage)"
    },
    {
      time: "12:30 - 1:30 PM",
      title: "Lunch and Exhibition",
      description: "Lunch; continued exhibition (Networking)"
    },
    {
      time: "1:30 - 3:00 PM",
      title: "Pitch Finals – Round Two",
      description: "Three enterprises pitch; judges deliberate (Pitch Stage)"
    },
    {
      time: "3:00 - 3:30 PM",
      title: "Judges' Feedback",
      description: "Public expert feedback to all finalists (Plenary)"
    },
    {
      time: "3:30 - 4:30 PM",
      title: "Awards Ceremony",
      description: "Grant awards and partner appreciation (Ceremony)"
    },
    {
      time: "4:30 - 5:00 PM",
      title: "Closing Ceremony",
      description: "Convener's close and community pledge (Plenary)"
    }
  ]

  const sponsorshipTiers = [
    {
      title: "PLATINUM Tier",
      amount: "₦2,000,000+",
      benefits: ["Naming rights", "Keynote/panel slot", "Primary logo on all materials", "10 VIP passes", "Post-event report credit"],
      color: "bg-red-950 text-white border-red-900"
    },
    {
      title: "GOLD Tier",
      amount: "₦1,000,000 – ₦1,999,999",
      benefits: ["Logo on banners and stage", "Panel opportunity", "6 VIP passes", "Social media & report credit"],
      color: "bg-red-800 text-white border-red-700"
    },
    {
      title: "SILVER Tier",
      amount: "₦500,000 – ₦999,999",
      benefits: ["Logo on selected materials", "3 VIP passes", "Social media & report acknowledgement"],
      color: "bg-gray-900 text-white border-gray-800"
    },
    {
      title: "GRANT CO-FUNDER",
      amount: "Negotiable",
      benefits: ["Named association with SME Grant", "Recognition at awards", "Impact report inclusion"],
      color: "bg-red-600 text-white border-red-500"
    }
  ]

  const budgetItems = [
    { item: "1. Venue and Facility (NAERLS Hall 2 days + setup + power)", cost: "₦800,000" },
    { item: "2. Production and Technical (PA, screens, stage, lighting 2 days)", cost: "₦980,000" },
    { item: "3. Pavilion Infrastructure (Partition, branding, expert honoraria, materials for 4 pavilions)", cost: "₦620,000" },
    { item: "4. Exhibition Infrastructure (30 booth setups + branding, tables, chairs)", cost: "₦980,000" },
    { item: "5. Catering and Refreshments (Lunch Day 1 & 2 + Tea, VIP catering, evening reception)", cost: "₦3,620,000" },
    { item: "6. Branding and Event Materials (Banners, booklets, merchandise, lanyards, signage)", cost: "₦1,910,000" },
    { item: "7. Marketing and Communications (Social media ads, designs, videos, PR)", cost: "₦440,000" },
    { item: "8. Speaker and Mentor Logistics (Transport, accommodation, coordination & appreciation gifts)", cost: "₦725,000" },
    { item: "9. Pitch Competition (Coordination, judges, pitch coaching, certificates, awards)", cost: "₦415,000" },
    { item: "10. Photography, Video, Documentation (Photographer, videographer, drone, editing)", cost: "₦480,000" },
    { item: "11. Security and Safety (Security, crowd management, first aid 2 days)", cost: "₦140,000" },
    { item: "12. Registration and Participant Management (Online registration, desk setup, data management)", cost: "₦100,000" },
    { item: "13. Volunteers and Workforce (T-shirts, coordination, stipends for 10 leads)", cost: "₦330,000" },
    { item: "14. Transportation and Logistics (Participant buses, haulage, fuel)", cost: "₦230,000" },
    { item: "15. Monitoring, Evaluation and Reporting (Surveys, analysis, impact report writing)", cost: "₦190,000" },
    { item: "16. Contingency Reserve (~5%)", cost: "₦694,000" },
    { item: "GRAND TOTAL BUDGET", cost: "₦12,654,000" },
  ]

  return (
    <div className="min-h-screen">
      <BackToTopButton />

      {/* Hero Section */}
      <section className="bg-black text-white py-24 border-b border-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-black to-black z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white border-red-800 text-md px-6 py-2 rounded-full tracking-wider animate-pulse">
              5TH ANNIVERSARY EDITION
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-none">
              WED 5.0
              <br />
              <span className="text-red-500 bg-clip-text">ZAZZAU VERSION</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-200">
              BUILDING RESILIENT ENTERPRISES FOR THE FUTURE
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              World Entrepreneurs Day (WED) – Zazzau Version 5.0 is Northern Nigeria's foremost community-driven entrepreneurship platform, transitioning into a structured enterprise development ecosystem.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/40 rounded-full px-6 py-3 backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-red-500" />
                <span className="text-lg font-medium text-gray-200">October 3–4, 2026</span>
              </div>
              <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/40 rounded-full px-6 py-3 backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-lg font-medium text-gray-200">NAERLS Ultra Modern Hall, ABU Zaria</span>
              </div>
              <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/40 rounded-full px-6 py-3 backdrop-blur-sm">
                <Users className="h-5 w-5 text-red-500" />
                <span className="text-lg font-medium text-gray-200">400 – 500 Target Attendees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-4 font-semibold text-lg transition-transform hover:scale-105">
                <Link href="/register">Register as Participant</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white rounded-full px-8 py-4 font-semibold text-lg transition-transform hover:scale-105 bg-transparent">
                <Link href="/sponsorship">Join as Sponsor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary & About */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <Badge className="bg-red-600 text-white text-sm px-4 py-1 rounded-full">EXECUTIVE SUMMARY</Badge>
                <h2 className="text-4xl font-black tracking-tight text-black">
                  An Expanded Two-Day Anniversary Format
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Since 2022, WED has collectively engaged over 1,000 entrepreneurs, professionals, policymakers, and stakeholders across four editions.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Scheduled for <strong>October 3–4, 2026</strong>, WED 5.0 expands for the first time to a two-day format.
                  <strong> Day One</strong> introduces four sector-specific Enterprise Pavilions where entrepreneurs engage directly with industry experts.
                  <strong> Day Two</strong> is dedicated to a Business Pitch Competition, with six pre-selected SMEs competing before a panel of judges for a proposed enterprise grant pool of <strong>NGN 3,000,000</strong>.
                </p>

                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <h3 className="font-bold text-red-700 mb-2">Total Implementation Budget</h3>
                  <p className="text-gray-900 text-xl font-bold">₦12,654,000</p>
                  <p className="text-gray-600 text-sm mt-1">Reflects a two-day event with pavilion infrastructure, pitch competition, exhibition, catering, documentation, and M&E.</p>
                </div>
              </div>

              <div className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <Badge className="bg-red-600 text-white text-sm px-4 py-1 rounded-full">ORGANISER & CONVENER</Badge>
                <h2 className="text-3xl font-black text-black">Zazzau Version Entrepreneurs (ZVE)</h2>
                <p className="text-gray-700 leading-relaxed">
                  ZVE is a community-based entrepreneurship organisation founded by <strong>Bello Yusuf Yusuf</strong> in Zaria. It operates annual convening through WED, monthly knowledge programming through the ZVE Webinar Series, and long-term ecosystem building through partnerships and mentorship.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  ZVE is affiliated with the <strong>Bello Yusuf Yusuf Innovation and Empowerment Foundation</strong> (CAC Reg No. IT 9699423), through which all funds are managed.
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-sm font-semibold text-gray-500">CONVENER CONTACT</div>
                  <div className="text-lg font-bold text-gray-900">Bello Yusuf Yusuf</div>
                  <div className="text-gray-600 text-sm">Email: wedzazzauversion@gmail.com</div>
                  <div className="text-gray-600 text-sm">LinkedIn: linkedin.com/in/bello-yusuf-yusuf-473377197</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Focus / Timeline */}
      <section className="py-24 bg-black text-white border-t border-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
              THE WED JOURNEY EVOLUTION
            </h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { ed: "WED 1.0", year: "2022", focus: "Foundation and community launch", att: "70" },
                { ed: "WED 2.0", year: "2023", focus: "Growth and expanded programming", att: "200+" },
                { ed: "WED 3.0", year: "2024", focus: "Innovation and strategic partnerships", att: "350+" },
                { ed: "WED 4.0", year: "2025", focus: "Resilience and policy engagement", att: "300+" },
                { ed: "WED 5.0", year: "2026", focus: "Resilient enterprise building", att: "400–500 (target)", highlight: true },
              ].map((ed, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${ed.highlight ? 'bg-red-950/40 border-red-700' : 'bg-gray-950 border-gray-800'}`}>
                  <div className="text-red-500 font-bold text-lg">{ed.ed}</div>
                  <div className="text-white text-sm font-semibold">{ed.year}</div>
                  <div className="text-gray-300 text-sm mt-3 h-20">{ed.focus}</div>
                  <div className="text-red-400 text-xs font-bold mt-4">Attendance: {ed.att}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theme Pillar Explanation */}
      <section className="py-24 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">THEME IN-FOCUS</Badge>
              <h2 className="text-4xl font-black text-black">Building Resilient Enterprises for the Future</h2>
              <p className="text-gray-600 mt-2">What this milestone theme means for our community:</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "BUILDING", desc: "Intentional enterprise development through strategy, systems, financial discipline, leadership, and governance." },
                { title: "RESILIENT", desc: "The capacity to absorb disruption, adapt to market changes, and continue operating with purpose — the baseline requirement for enterprise survival in Nigeria today." },
                { title: "ENTERPRISES", desc: "Inclusive of all productive enterprise: traders, manufacturers, agribusinesses, food entrepreneurs, tech startups, creative professionals, and service providers." },
                { title: "FOR THE FUTURE", desc: "Digital transformation, investment readiness, sustainable growth, and long-term market relevance — built now, before they become unavoidable." },
              ].map((pillar, idx) => (
                <Card key={idx} className="border-0 shadow-lg bg-white">
                  <CardHeader className="bg-red-600 text-white rounded-t-lg py-4">
                    <CardTitle className="text-lg text-center font-bold tracking-wider">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed">{pillar.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">KEY OBJECTIVES</Badge>
              <h2 className="text-4xl font-black text-black">WED 5.0 Strategic Goals</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gray-50 border-gray-100">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <objective.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center font-bold text-black">{objective.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">{objective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Day One: Enterprise Pavilions */}
      <section className="py-24 bg-black text-white border-b border-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">DAY ONE INITIATIVE</Badge>
              <h2 className="text-4xl font-black text-white">The Four Enterprise Pavilions</h2>
              <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                Day One replaces the traditional conference format with four concurrent, sector-specific Enterprise Pavilions.
                Participants register for a pavilion in their business field to engage directly with industry experts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {pavilions.map((pav, idx) => (
                <div key={idx} className="p-8 bg-gray-950 rounded-3xl border border-red-950/50 hover:border-red-600 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{pav.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <strong>Serves:</strong> {pav.who}
                  </p>
                  <p className="text-gray-500 text-xs mt-4">
                    Facilitated by an industry expert covering business model challenges, market opportunities, finance, digital tools, and growth strategy.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Day Two: Business Pitch Competition */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">DAY TWO TARGETS</Badge>
              <h2 className="text-4xl font-black text-black">Business Pitch Competition</h2>
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                Six pre-selected SMEs pitch before a panel of expert judges. Finalists receive pre-event pitch coaching and compete publicly for a proposed grant pool of <strong>₦3,000,000</strong>.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {pitches.map((pitch, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="text-red-600 font-bold text-lg mb-2">{pitch.position}</div>
                    <div className="text-gray-900 text-3xl font-black mb-4">{pitch.grant}</div>
                  </div>
                  <div className="text-gray-600 text-sm border-t border-gray-200 pt-4">
                    <strong>Post-Award:</strong> {pitch.support}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 italic max-w-2xl mx-auto">
              Note: Grant figures are proposed and subject to confirmed funding. Disbursement is strictly managed by Zazzau Version Entrepreneurs (ZVE).
            </p>
          </div>
        </div>
      </section>

      {/* Expected Target Indicators */}
      <section className="py-24 bg-black text-white border-t border-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">TARGET INDICATORS</Badge>
              <h2 className="text-4xl font-black text-white">Expected Outcomes</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {expectedOutcomes.map((outcome, index) => (
                <div key={index} className="text-center p-6 bg-gray-950 rounded-2xl border border-red-950/40">
                  <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">{outcome.metric}</div>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Sponsorship */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">PARTNERSHIP</Badge>
              <h2 className="text-4xl font-black text-black">Sponsorship Tiers</h2>
              <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                WED 5.0 offers structured partnership opportunities positioned as an investment in enterprise development, not simply event support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sponsorshipTiers.map((tier, index) => (
                <Card key={index} className={`border-2 flex flex-col justify-between ${tier.color}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg font-bold tracking-wider">{tier.title}</CardTitle>
                    <div className="text-2xl font-black mt-2">{tier.amount}</div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col p-6 bg-white text-black rounded-b-lg">
                    <ul className="space-y-3 mb-6 flex-grow text-sm">
                      {tier.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Implementation Budget */}
      <section className="py-24 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">FINANCIALS</Badge>
              <h2 className="text-4xl font-black text-black">Implementation Budget</h2>
              <p className="text-gray-600 mt-2">Based on current Zaria market rates (Subject to revision after procurement)</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8 border-b border-gray-100 bg-red-950 text-white flex justify-between items-center">
                <span className="font-bold text-lg">Detailed Event Expenditure</span>
                <span className="font-black text-xl text-red-400">Total: ₦12,654,000</span>
              </div>
              <div className="divide-y divide-gray-100">
                {budgetItems.map((item, idx) => (
                  <div key={idx} className={`p-4 flex justify-between items-center text-sm ${idx === budgetItems.length - 1 ? 'bg-red-50 font-bold text-red-900' : ''}`}>
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-semibold text-gray-900">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appendix: Proposed Agenda */}
      <section className="py-24 bg-black text-white border-t border-red-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-600 text-white mb-4">PROPOSED AGENDA</Badge>
              <h2 className="text-4xl font-black text-white">Event Schedule</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Day 1 Agenda */}
              <div className="space-y-6">
                <div className="p-6 bg-red-950/40 border border-red-700 rounded-2xl">
                  <h3 className="text-xl font-bold text-white">DAY ONE – 3rd October 2026</h3>
                  <div className="text-red-400 text-sm mt-1">Enterprise Pavilions</div>
                </div>
                <div className="space-y-4">
                  {programDay1.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-950 rounded-xl border border-gray-800/80 flex gap-4">
                      <div className="font-bold text-red-500 text-sm whitespace-nowrap w-28">{item.time}</div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 2 Agenda */}
              <div className="space-y-6">
                <div className="p-6 bg-red-950/40 border border-red-700 rounded-2xl">
                  <h3 className="text-xl font-bold text-white">DAY TWO – 4th October 2026</h3>
                  <div className="text-red-400 text-sm mt-1">Pitch Competition & Grant Awards</div>
                </div>
                <div className="space-y-4">
                  {programDay2.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-950 rounded-xl border border-gray-800/80 flex gap-4">
                      <div className="font-bold text-red-500 text-sm whitespace-nowrap w-28">{item.time}</div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-black mb-6">Invest in the Future of Northern Nigerian Enterprise</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            WED 5.0 is the most structured, most practical, and most directly capital-connected edition in the platform's five-year history. Partner with us today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/register">
                Register as Participant <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-red-600 font-semibold text-lg px-8 py-4 rounded-full"
            >
              <Link href="/sponsor-registration">
                Apply for Sponsorship <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
