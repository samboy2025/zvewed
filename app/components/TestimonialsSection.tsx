"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    name: "Aisha Abubakar",
    title: "Founder, EcoInnovate",
    quote: "WED was a game-changer for my startup. The mentorship and networking opportunities were invaluable.",
    image: "/WED 2.0/Pictures WED 2.0/a9fdf12c-df22-4e26-8014-b060e6fa6042.jpg",
  },
  {
    name: "Bello Mohammed",
    title: "Student Entrepreneur",
    quote: "As a student, WED gave me the confidence and connections to pursue my business idea. Highly recommended!",
    image: "/WED 1.0/Pictures WED 1.0/DSC_2517_Original.jpg",
  },
  {
    name: "Fatima Yusuf",
    title: "CEO, TechSavvy Solutions",
    quote: "The pitch competition was intense but incredibly rewarding. We secured our first seed funding thanks to WED.",
    image: "/WED 3.0/WED 3.0/1001640345.jpeg",
  },
  {
    name: "David Okon",
    title: "Social Entrepreneur",
    quote: "I met my co-founder at WED. It's more than a conference; it's a community of passionate innovators.",
    image: "/WED 2.0/Pictures WED 2.0/5d0a04c5-d840-469b-bad0-a71bfd322b8f.jpg",
  },
  {
    name: "Chiamaka Nwosu",
    title: "Agri-Tech Innovator",
    quote: "The workshops on sustainable agriculture were eye-opening. WED is relevant and forward-thinking.",
    image: "/WED 3.0/WED 3.0/IMG_7851.JPG",
  },
  {
    name: "Usman Aliyu",
    title: "Creative Director, Zaria Arts",
    quote: "A fantastic platform for creative entrepreneurs to showcase their work and connect with a wider audience.",
    image: "/WED 1.0/Pictures WED 1.0/DSC_2601_Original.JPG",
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
            Hear from entrepreneurs, innovators, and leaders who have been part of the WED journey.
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
