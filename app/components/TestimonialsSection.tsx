import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Amina Abdullahi",
    role: "Tech Entrepreneur",
    company: "InnovateTech Solutions",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "WED 2.0 was a game-changer for my startup. The networking opportunities and insights from industry experts helped me secure my first major investment. The event truly lives up to its promise of empowering entrepreneurs.",
    rating: 5,
    event: "WED 2.0",
  },
  {
    name: "Ibrahim Musa",
    role: "Social Entrepreneur",
    company: "AgriConnect Nigeria",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The workshops at WED 1.0 equipped me with practical skills in digital marketing and business strategy. Today, my agritech startup serves over 10,000 farmers across Northern Nigeria. Thank you WED!",
    rating: 5,
    event: "WED 1.0",
  },
  {
    name: "Dr. Fatima Hassan",
    role: "Investor & Mentor",
    company: "Zazzau Venture Capital",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a speaker at WED 2.0, I was impressed by the quality of entrepreneurs and their innovative solutions. The event has become a premier platform for discovering and nurturing the next generation of business leaders.",
    rating: 5,
    event: "WED 2.0",
  },
  {
    name: "Yusuf Garba",
    role: "E-commerce Entrepreneur",
    company: "NorthMart Online",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "WED introduced me to my co-founder and key investors. The collaborative environment and focus on sustainable business practices aligned perfectly with our vision. We've grown 300% since attending WED 1.0.",
    rating: 5,
    event: "WED 1.0",
  },
  {
    name: "Hauwa Aliyu",
    role: "FinTech Founder",
    company: "PayNorth Solutions",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The panel discussions at WED 2.0 provided invaluable insights into the challenges and opportunities in the Nigerian fintech space. The connections I made there led to strategic partnerships that transformed my business.",
    rating: 5,
    event: "WED 2.0",
  },
  {
    name: "Prof. Ahmed Bello",
    role: "Academic & Researcher",
    company: "ABU Business School",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "WED has become an essential platform for bridging the gap between academia and industry. The quality of discussions and the caliber of participants make it a must-attend event for anyone serious about entrepreneurship.",
    rating: 5,
    event: "WED 2.0",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-black">What Entrepreneurs Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from successful entrepreneurs who have transformed their businesses through WED events
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-red-500 text-red-500" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-red-500 mb-4" />

                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-red-600 font-medium">{testimonial.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{testimonial.event} Participant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-red-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join Our Success Stories</h3>
            <p className="text-red-100 mb-6">Be part of WED 3.0 and create your own entrepreneurial success story</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-white font-medium">500+ Entrepreneurs Impacted</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-white font-medium">₦50M+ Investments Facilitated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
