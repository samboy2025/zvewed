"use client"

import { TestimonialsSection as MarqueeTestimonials } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Aminu Zainab Inuwa",
      handle: "Entrepreneur & Business Owner",
      avatar: "/TESTIMONIALS/Snapchat-1294343314 - Aminu Zainab Inuwa.jpeg"
    },
    text: "No boring moment. It's worth every penny and more."
  },
  {
    author: {
      name: "Sani Hajarah Muhammad",
      handle: "Business Owner & Innovator",
      avatar: "/TESTIMONIALS/Snapchat-1598378819 - Hajarah Muhammad Sani.jpg"
    },
    text: "It's very educational and empowering."
  },
  {
    author: {
      name: "Fadila Yusuf Bello",
      handle: "Entrepreneur & Networker",
      avatar: "/TESTIMONIALS/IMG-20250304-WA0003 - Fadila Yusuf.jpg"
    },
    text: "I was able to meet young and successful entrepreneurs and gained a lot of experience"
  },
  {
    author: {
      name: "Umar Abdulkadir Imam",
      handle: "Business Owner & Attendee",
      avatar: "/TESTIMONIALS/7d541405ec89477e89501668669436fe - Umar Abdulkadir Imam (Sir Tech).jpg"
    },
    text: "It was a great privilege having the opportunity to attend and it was a game changer"
  },
  {
    author: {
      name: "Idris Shafiullah",
      handle: "Entrepreneur & Business Owner",
      avatar: "/TESTIMONIALS/IMG_8151 - idris shafiullah.jpeg"
    },
    text: "WED was an eye-opening and inspiring experience for me. I connected with brilliant minds, gained practical insights, and left with renewed motivation to grow my business. It was truly a day that reminded me why I started my entrepreneurial journey in the first place."
  },
  {
    author: {
      name: "Zakari Aisha Muhammad",
      handle: "Business Owner & Learner",
      avatar: "/TESTIMONIALS/IMG_9557-1 - AISHA ZAKARI MUHAMMAD.jpg"
    },
    text: "My experience at WED 3.0 was very impactful. I learned so much from the speakers about business growth & personal development."
  },
  {
    author: {
      name: "Fatima Imam Musa",
      handle: "Entrepreneur & Event Attendee",
      avatar: "/TESTIMONIALS/IMG_4994 - fatima imam musa.jpeg"
    },
    text: "I learn and unlearn a lot from the event"
  },
  {
    author: {
      name: "Aisha Abubakar",
      handle: "Founder & CEO, EcoInnovate Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "WED was a game-changer for my startup. The mentorship and networking opportunities were invaluable. We've grown from 5 to 25 employees since attending WED 2.0."
  },
  {
    author: {
      name: "Bello Mohammed",
      handle: "Founder & Managing Director, Student Ventures",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a student entrepreneur, WED gave me the confidence and connections to pursue my business idea. We've secured our first major client and are expanding rapidly."
  },
  {
    author: {
      name: "Fatima Yusuf",
      handle: "Founder & CEO, TechSavvy Solutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The pitch competition was intense but incredibly rewarding. We secured our first seed funding thanks to WED. The investor connections alone were worth the experience."
  },
  {
    author: {
      name: "David Okon",
      handle: "Founder & Executive Director, Social Impact Hub",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "I met my co-founder at WED. It's more than a conference; it's a community of passionate innovators. Our social enterprise has impacted over 10,000 lives."
  },
  {
    author: {
      name: "Chiamaka Nwosu",
      handle: "Founder & CEO, AgriTech Innovations",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The workshops on sustainable agriculture were eye-opening. WED is relevant and forward-thinking. We've developed new farming technologies that are now used across 5 states."
  },
  {
    author: {
      name: "Usman Aliyu",
      handle: "Founder & Creative Director, Zaria Arts Collective",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "A fantastic platform for creative entrepreneurs to showcase their work and connect with a wider audience. We've expanded our business to three cities since WED 1.0."
  }
]

export function TestimonialsSection() {
  return (
    <MarqueeTestimonials
      title="What Our Community Says"
      description="Hear from business owners, entrepreneurs, and innovators who have been part of the WED journey."
      testimonials={testimonials}
      className="bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/50"
    />
  )
}
