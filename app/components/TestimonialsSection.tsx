"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Aminu Zainab Inuwa",
    title: "Entrepreneur & Business Owner",
    quote: "No boring moment. It's worth every penny and more",
    image: "/TESTIMONIALS/Snapchat-1294343314 - Aminu Zainab Inuwa.jpeg",
  },
  {
    name: "Sani Hajarah Muhammad",
    title: "Business Owner & Innovator",
    quote: "It's very educational and empowering.",
    image: "/TESTIMONIALS/Snapchat-1598378819 - Hajarah Muhammad Sani.jpg",
  },
  {
    name: "Fadila Yusuf Bello",
    title: "Entrepreneur & Networker",
    quote: "I was able to meet young and successful entrepreneurs and gained a lot of experience",
    image: "/TESTIMONIALS/IMG-20250304-WA0003 - Fadila Yusuf.jpg",
  },
  {
    name: "Umar Abdulkadir Imam",
    title: "Business Owner & Attendee",
    quote: "It was a great privilege having the opportunity to attend and it was a game changer",
    image: "/TESTIMONIALS/7d541405ec89477e89501668669436fe - Umar Abdulkadir Imam (Sir Tech).jpg",
  },
  {
    name: "Idris Shafiullah",
    title: "Entrepreneur & Business Owner",
    quote: "WED was an eye-opening and inspiring experience for me. I connected with brilliant minds, gained practical insights, and left with renewed motivation to grow my business. It was truly a day that reminded me why I started my entrepreneurial journey in the first place.",
    image: "/TESTIMONIALS/IMG_8151 - idris shafiullah.jpeg",
  },
  {
    name: "Zakari Aisha Muhammad",
    title: "Business Owner & Learner",
    quote: "My experience at WED 3.0 was very impactful. I learned so much from the speakers about business growth & personal development.",
    image: "/TESTIMONIALS/IMG_9557-1 - AISHA ZAKARI MUHAMMAD.jpg",
  },
  {
    name: "Fatima Imam Musa",
    title: "Entrepreneur & Event Attendee",
    quote: "I learn and unlearn a lot from the event",
    image: "/TESTIMONIALS/IMG_4994 - fatima imam musa.jpeg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Community Feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Community{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Says
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Hear from business owners, entrepreneurs, and innovators who have been part of the WED journey.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-600"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-600"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex carousel-transition"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl overflow-hidden relative testimonial-card mx-4">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Quote icon */}
                      <div className="absolute top-6 right-6 text-blue-400/30 hover:text-blue-400 transition-colors duration-300">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>
                      
                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic font-medium min-h-[120px] flex items-center">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="relative">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 rounded-full object-cover mr-6 border-4 border-white dark:border-gray-600 shadow-lg hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 font-medium">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full dot-indicator ${
                  index === currentIndex 
                    ? 'bg-blue-600 dark:bg-blue-400 active' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
