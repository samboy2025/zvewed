"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    name: "Aminu Zainab Inuwa",
    title: "Entrepreneur & Business Owner",
    quote: "No boring moment. It's worth every penny and more",
    image: "/TESTIMONIALS/aisha_abubakar.jpg",
  },
  {
    name: "Sani Hajarah Muhammad",
    title: "Business Owner & Innovator",
    quote: "It's very educational and empowering.",
    image: "/TESTIMONIALS/bello_mohammed.jpg",
  },
  {
    name: "Fadila Yusuf Bello",
    title: "Entrepreneur & Networker",
    quote: "I was able to meet young and successful entrepreneurs and gained a lot of experience",
    image: "/TESTIMONIALS/fatima_yusuf.jpg",
  },
  {
    name: "Umar Abdulkadir Imam",
    title: "Business Owner & Attendee",
    quote: "It was a great privilege having the opportunity to attend and it was a game changer",
    image: "/TESTIMONIALS/david_okon.jpg",
  },
  {
    name: "Idris Shafiullah",
    title: "Entrepreneur & Business Owner",
    quote: "WED was an eye-opening and inspiring experience for me. I connected with brilliant minds, gained practical insights, and left with renewed motivation to grow my business. It was truly a day that reminded me why I started my entrepreneurial journey in the first place.",
    image: "/TESTIMONIALS/chiamaka_nwosu.jpg",
  },
  {
    name: "Zakari Aisha Muhammad",
    title: "Business Owner & Learner",
    quote: "My experience at WED 3.0 was very impactful. I learned so much from the speakers about business growth & personal development.",
    image: "/TESTIMONIALS/usman_aliyu.jpg",
  },
  {
    name: "Fatima Imam Musa",
    title: "Entrepreneur & Event Attendee",
    quote: "I learn and unlearn a lot from the event",
    image: "/TESTIMONIALS/aisha_abubakar.jpg",
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
