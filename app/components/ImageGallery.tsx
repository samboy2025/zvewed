"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  // WED 1.0 Images
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2272_Original.jpg",
    alt: "WED 1.0 Opening Ceremony",
    title: "WED 1.0 Opening Ceremony",
    event: "WED 1.0",
    category: "ceremony",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2287_Original.jpg",
    alt: "WED 1.0 Keynote Session",
    title: "Inspiring Keynote Address",
    event: "WED 1.0",
    category: "speakers",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2299_Original.jpg",
    alt: "WED 1.0 Networking Session",
    title: "Entrepreneurs Networking",
    event: "WED 1.0",
    category: "networking",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2322_Original.jpg",
    alt: "WED 1.0 Workshop Session",
    title: "Entrepreneurship Workshop",
    event: "WED 1.0",
    category: "workshops",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2339_Original.jpg",
    alt: "WED 1.0 Panel Discussion",
    title: "Industry Leaders Panel",
    event: "WED 1.0",
    category: "panels",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2368_Original.jpg",
    alt: "WED 1.0 Vendor Exhibition",
    title: "Innovation Showcase",
    event: "WED 1.0",
    category: "exhibition",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2396_Original.jpg",
    alt: "WED 1.0 Award Ceremony",
    title: "Entrepreneurship Awards",
    event: "WED 1.0",
    category: "awards",
  },
  {
    src: "/WED 1.0/Pictures WED 1.0/DSC_2399_Original.jpg",
    alt: "WED 1.0 Group Photo",
    title: "WED 1.0 Participants",
    event: "WED 1.0",
    category: "group",
  },

  // WED 2.0 Images
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6193.JPG",
    alt: "WED 2.0 Opening Ceremony",
    title: "WED 2.0 Grand Opening",
    event: "WED 2.0",
    category: "ceremony",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6194.JPG",
    alt: "WED 2.0 Keynote Speaker",
    title: "Keynote Presentation",
    event: "WED 2.0",
    category: "speakers",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6195.JPG",
    alt: "WED 2.0 Networking Event",
    title: "Business Networking",
    event: "WED 2.0",
    category: "networking",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6196.JPG",
    alt: "WED 2.0 Workshop",
    title: "Digital Marketing Workshop",
    event: "WED 2.0",
    category: "workshops",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6197.JPG",
    alt: "WED 2.0 Panel Session",
    title: "Expert Panel Discussion",
    event: "WED 2.0",
    category: "panels",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6198.JPG",
    alt: "WED 2.0 Exhibition",
    title: "Startup Exhibition",
    event: "WED 2.0",
    category: "exhibition",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6199.JPG",
    alt: "WED 2.0 Competition",
    title: "Pitch Competition Finals",
    event: "WED 2.0",
    category: "competition",
  },
  {
    src: "/WED 2.0/Pictures WED 2.0/IMG_6200.JPG",
    alt: "WED 2.0 Team Photo",
    title: "WED 2.0 Participants",
    event: "WED 2.0",
    category: "group",
  },

  // WED 3.0 Images
  {
    src: "/WED 3.0/WED 3.0/IMG_7801.JPG",
    alt: "WED 3.0 Opening Ceremony",
    title: "WED 3.0 Launch Event",
    event: "WED 3.0",
    category: "ceremony",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7802.JPG",
    alt: "WED 3.0 Keynote Address",
    title: "Featured Speaker Session",
    event: "WED 3.0",
    category: "speakers",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7803.JPG",
    alt: "WED 3.0 Networking",
    title: "Professional Networking",
    event: "WED 3.0",
    category: "networking",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7804.JPG",
    alt: "WED 3.0 Workshop",
    title: "Innovation Workshop",
    event: "WED 3.0",
    category: "workshops",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7805.JPG",
    alt: "WED 3.0 Panel Discussion",
    title: "Leadership Panel",
    event: "WED 3.0",
    category: "panels",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7806.JPG",
    alt: "WED 3.0 Exhibition",
    title: "Tech Innovation Showcase",
    event: "WED 3.0",
    category: "exhibition",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7808.JPG",
    alt: "WED 3.0 Awards",
    title: "Excellence Awards",
    event: "WED 3.0",
    category: "awards",
  },
  {
    src: "/WED 3.0/WED 3.0/IMG_7809.JPG",
    alt: "WED 3.0 Group Photo",
    title: "WED 3.0 Community",
    event: "WED 3.0",
    category: "group",
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
    { value: "WED 3.0", label: "WED 3.0" },
    { value: "speakers", label: "Speakers" },
    { value: "workshops", label: "Workshops" },
    { value: "networking", label: "Networking" },
    { value: "ceremony", label: "Ceremonies" },
    { value: "awards", label: "Awards" },
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
