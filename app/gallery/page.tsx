import ImageGallery from "../components/ImageGallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"
import BackToTopButton from "../components/BackToTopButton"

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <BackToTopButton />
      {/* Hero Section */}
      <section className="gradient-red text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg px-6 py-2">
              WED 4.0 Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              WED
              <br />
              <span className="text-red-200">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 font-light leading-relaxed">
              Explore memorable moments from our World Entrepreneurship Day journey - from WED 1.0 to WED 3.0 - and 
              witness the incredible impact we've created together across 600+ entrepreneurs.
            </p>
            <p className="text-lg mb-8 text-red-200">
              <Camera className="inline-block h-5 w-5 mr-2" />
              WED 4.0 gallery coming soon - August 2025!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8 py-3 font-semibold">
                <Link href="/register" className="flex items-center gap-2">
                  Register for WED 4.0 <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3">
                <Link href="/wed-4">
                  Learn About WED 4.0
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Component */}
      <ImageGallery />
      
      {/* WED 4.0 Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-black">Ready for WED 4.0?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join us in August 2025 for our biggest event yet - "Rebuild, Reinvent, Rise" with 500+ expected participants.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600">Expected Participants</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">2 Days</div>
                <div className="text-gray-600">Intensive Program</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">₦50M+</div>
                <div className="text-gray-600">Investment Target</div>
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3 font-semibold">
              <Link href="/wed-4" className="flex items-center gap-2">
                Explore WED 4.0 Details <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
