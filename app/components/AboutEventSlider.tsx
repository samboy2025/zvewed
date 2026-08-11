"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react"

export interface SlideItem {
  src: string
  alt: string
  title: string
  description: string
}

const slides: SlideItem[] = [
  {
    src: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.35_3e862169.jpg",
    alt: "WED SME Training Session",
    title: "Expert Domain Coaching",
    description: "SME Masterclass and training sessions delivering direct business knowledge.",
  },
  {
    src: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.36_6d4e05d7.jpg",
    alt: "Ecosystem Collaboration",
    title: "Ecosystem Network Building",
    description: "Connecting traders, tech startups, agri-processors, and creative innovators.",
  },
  {
    src: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.36_be1495c8.jpg",
    alt: "WED Enterprise Exhibition",
    title: "Live Enterprise Marketplace",
    description: "A vibrant commercial hub connecting 30+ exhibitors with hundreds of visitors.",
  },
  {
    src: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.37_50de0369.jpg",
    alt: "High-level panel session",
    title: "Domain Knowledge Panels",
    description: "Experts sharing strategies on digital transformation and market resilience.",
  },
  {
    src: "/WED PARTICIPANT IMAGES/WhatsApp Image 2025-07-27 at 15.31.39_0595aef4.jpg",
    alt: "SME Grant Awards",
    title: "Direct Capital Support",
    description: "NGN 3,000,000 grant pool awarded transparently to high-performing SMEs.",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7833.JPG",
    alt: "Global Network Connections",
    title: "Five Years of Milestones",
    description: "Over 1,000 entrepreneurs engaged in Northern Nigeria's premier forum.",
  }
]

export default function AboutEventSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePrev = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setIsPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-red-600/30 group">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
            {/* Soft Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
          </div>

          {/* Description Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white select-none">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-red-500 animate-pulse" />
              <span className="text-red-400 font-bold text-xs uppercase tracking-wider">WED 5.0 FEATURE</span>
            </div>
            <h4 className="text-xl md:text-2xl font-extrabold mb-1 drop-shadow-md text-white">
              {slide.title}
            </h4>
            <p className="text-sm md:text-base text-gray-200 drop-shadow-sm leading-relaxed max-w-xl">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      {/* Slide Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all duration-300 transform opacity-0 group-hover:opacity-100 z-30"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all duration-300 transform opacity-0 group-hover:opacity-100 z-30"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Progress Indicator Dots */}
      <div className="absolute top-4 right-6 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPlaying(false)
              setCurrentIndex(idx)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-red-600 scale-125 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
