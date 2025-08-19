"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    name: "Aisha Abubakar",
    title: "Founder & CEO, EcoInnovate Solutions",
    quote: "WED was a game-changer for my startup. The mentorship and networking opportunities were invaluable. We've grown from 5 to 25 employees since attending WED 2.0.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.34_f02e294f.jpg",
  },
  {
    name: "Bello Mohammed",
    title: "Founder & Managing Director, Student Ventures",
    quote: "As a student entrepreneur, WED gave me the confidence and connections to pursue my business idea. We've secured our first major client and are expanding rapidly.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_3e862169.jpg",
  },
  {
    name: "Fatima Yusuf",
    title: "Founder & CEO, TechSavvy Solutions",
    quote: "The pitch competition was intense but incredibly rewarding. We secured our first seed funding thanks to WED. The investor connections alone were worth the experience.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_c34d51ee.jpg",
  },
  {
    name: "David Okon",
    title: "Founder & Executive Director, Social Impact Hub",
    quote: "I met my co-founder at WED. It's more than a conference; it's a community of passionate innovators. Our social enterprise has impacted over 10,000 lives.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_d6d26545.jpg",
  },
  {
    name: "Chiamaka Nwosu",
    title: "Founder & CEO, AgriTech Innovations",
    quote: "The workshops on sustainable agriculture were eye-opening. WED is relevant and forward-thinking. We've developed new farming technologies that are now used across 5 states.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_d8cb4136.jpg",
  },
  {
    name: "Usman Aliyu",
    title: "Founder & Creative Director, Zaria Arts Collective",
    quote: "A fantastic platform for creative entrepreneurs to showcase their work and connect with a wider audience. We've expanded our business to three cities since WED 1.0.",
    image: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.36_6d4e05d7.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50/50 dark:bg-gray-900/50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            What Our Community Says
          </h2>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Hear from business owners, entrepreneurs, and innovators who have been part of the WED journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 rounded-full object-cover mr-6 border-4 border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
