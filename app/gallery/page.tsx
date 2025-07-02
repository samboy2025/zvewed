import ImageGallery from "../components/ImageGallery"
import { Badge } from "@/components/ui/badge"

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              Event Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED
              <br />
              <span className="text-red-200">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 font-light leading-relaxed">
              Explore memorable moments from our World Entrepreneurship Day events and witness the impact we've created
              together in the entrepreneurial community.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Component */}
      <ImageGallery />
    </div>
  )
}
