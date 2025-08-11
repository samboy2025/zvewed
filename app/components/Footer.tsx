import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="ZVE Logo" width={40} height={40} />
              <span className="text-xl font-bold">ZVE</span>
            </Link>
            <p className="text-gray-300 mb-4 text-sm">
              A transformative entrepreneurship organization dedicated to empowering innovators across Northern Nigeria and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1GE2yLpeg2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/wed_zazzau_version?igsh=MXdsbHJ3NGxrMHV4OQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
              <a href="https://www.linkedin.com/company/zazzau-version-enterpreneurs-zve/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About ZVE
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
              <li>
                <Link href="/wed-4" className="text-gray-300 hover:text-white">
                  WED 4.0
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
                <span className="text-gray-300 text-sm">Amana Event Centre, Randan Kano, Zaria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300 text-sm">wedzazzauversion@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300 text-sm">08140135206, 09036625032, 07035877985</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 World Entrepreneurship Day 4.0 - Organized by Zazzau Version Entrepreneurs (ZVE). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
