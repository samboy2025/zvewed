"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "WED 2.0 Opening Ceremony",
    title: "WED 2.0 Opening Ceremony",
    event: "WED 2.0",
    category: "ceremony",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Keynote Speaker at WED 2.0",
    title: "Inspiring Keynote Address",
    event: "WED 2.0",
    category: "speakers",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Networking Session WED 1.0",
    title: "Entrepreneurs Networking",
    event: "WED 1.0",
    category: "networking",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Workshop Session",
    title: "Digital Marketing Workshop",
    event: "WED 2.0",
    category: "workshops",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Panel Discussion",
    title: "Industry Leaders Panel",
    event: "WED 2.0",
    category: "panels",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Vendor Exhibition",
    title: "Innovation Showcase",
    event: "WED 1.0",
    category: "exhibition",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Award Ceremony",
    title: "Entrepreneurship Awards",
    event: "WED 2.0",
    category: "awards",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Group Photo WED 1.0",
    title: "WED 1.0 Participants",
    event: "WED 1.0",
    category: "group",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Startup Pitch Competition",
    title: "Pitch Competition Finals",
    event: "WED 2.0",
    category: "competition",
  },
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredImages =
    filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter || img.event === filter)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    }
  }

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "WED 1.0", label: "WED 1.0" },
    { value: "WED 2.0", label: "WED 2.0" },
    { value: "speakers", label: "Speakers" },
    { value: "workshops", label: "Workshops" },
    { value: "networking", label: "Networking" },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-black">Event Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore moments from our previous WED events and see the impact we've created together
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                onClick={() => setFilter(category.value)}
                className={`rounded-full px-6 ${
                  filter === category.value
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-red-600 text-red-600 hover:bg-red-50"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-lift cursor-pointer border-0 shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                  <p className="text-red-200 text-sm">{image.event}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">{filteredImages[selectedImage].title}</h3>
                <p className="text-red-200">{filteredImages[selectedImage].event}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
