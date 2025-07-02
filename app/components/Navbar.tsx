"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-bold text-red-600 tracking-tight">
            WED 3.0
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors font-medium">
                WED Events <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/wed-overview" className="text-gray-700 hover:text-red-600">
                    WED Initiative Overview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wed-1" className="text-gray-700 hover:text-red-600">
                    WED 1.0
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wed-2" className="text-gray-700 hover:text-red-600">
                    WED 2.0
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wed-3" className="text-gray-700 hover:text-red-600">
                    WED 3.0
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/activities" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Activities
            </Link>
            <Link href="/sponsorship" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Sponsorship
            </Link>
            <Link href="/speakers" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Speakers
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Gallery
            </Link>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-red-600" /> : <Menu className="h-6 w-6 text-red-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/wed-overview" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                WED Initiative
              </Link>
              <Link href="/wed-1" className="text-gray-700 hover:text-red-600 transition-colors font-medium pl-4">
                WED 1.0
              </Link>
              <Link href="/wed-2" className="text-gray-700 hover:text-red-600 transition-colors font-medium pl-4">
                WED 2.0
              </Link>
              <Link href="/wed-3" className="text-gray-700 hover:text-red-600 transition-colors font-medium pl-4">
                WED 3.0
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/activities" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Activities
              </Link>
              <Link href="/sponsorship" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Sponsorship
              </Link>
              <Link href="/speakers" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Speakers
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Gallery
              </Link>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full w-fit">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
