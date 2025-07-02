import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WED 3.0</h3>
            <p className="text-gray-300 mb-4">
              Empowering entrepreneurs for a sustainable future through innovation and collaboration.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-300 hover:text-white">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="text-gray-300 hover:text-white">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-gray-300 hover:text-white">
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Registration</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white">
                  Entrepreneur Registration
                </Link>
              </li>
              <li>
                <Link href="/vendor-registration" className="text-gray-300 hover:text-white">
                  Vendor Registration
                </Link>
              </li>
              <li>
                <Link href="/sponsor-registration" className="text-gray-300 hover:text-white">
                  Sponsor Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300 text-sm">Business School, ABU Zaria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300 text-sm">info@wed3zazzau.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300 text-sm">+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 World Entrepreneurship Day 3.0 - Zazzau Version. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
