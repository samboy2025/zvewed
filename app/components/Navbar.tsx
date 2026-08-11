"use client"

import * as React from "react"
import { Button } from '@/components/ui/button'
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Mobile Collapsible Section Component
const MobileCollapsibleSection = ({ title, children, defaultOpen = false }: { 
  title: string, 
  children: React.ReactNode, 
  defaultOpen?: boolean 
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-red-600 transition-colors py-2"
      >
        {title}
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-2 ml-4 mt-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="ZVE Logo" width={48} height={48} className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/about" legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-red-50 text-gray-700")}>
                                        About ZVE
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-red-50 text-gray-700">
                                    Events
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-5">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-600 to-red-700 p-6 no-underline outline-none focus:shadow-md"
                                                    href="/wed-overview"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                        WED Journey
                                                    </div>
                                                    <p className="text-sm leading-tight text-red-100">
                                                        Explore our entrepreneurship evolution from WED 1.0 to our milestone 5th Anniversary WED 5.0
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/wed-5" title="WED 5.0 (Anniversary)">
                                            Building Resilient Enterprises for the Future (October 2026)
                                        </ListItem>
                                        <ListItem href="/wed-4" title="WED 4.0">
                                            Rebuild, Reinvent, Rise - 400+ participants (2025)
                                        </ListItem>
                                        <ListItem href="/wed-3" title="WED 3.0">
                                            Innovation focus - 350+ participants (Completed 2024)
                                        </ListItem>
                                        <ListItem href="/wed-2" title="WED 2.0">
                                            Growth phase with 200 entrepreneurs (Completed 2023)
                                        </ListItem>
                                        <ListItem href="/wed-1" title="WED 1.0">
                                            Foundation event with 70 participants (Completed 2022)
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            
                            <NavigationMenuItem>
                                <Link href="/gallery" legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-red-50 text-gray-700")}>
                                        Gallery
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-red-50 text-gray-700">
                                    Get Involved
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem href="/sponsorship" title="Sponsorship">
                                            Partner with us and support our mission
                                        </ListItem>
                                        <ListItem href="/vendor-registration" title="Vendor Registration">
                                            Showcase your business at our events
                                        </ListItem>
                                        <ListItem href="/leadership" title="Leadership">
                                            Meet our founder and leadership team
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* CTA Button & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            className="bg-red-700 hover:bg-red-800 text-white border-2 border-red-700">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button
                            asChild
                            className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white">
                            <Link href="/register">Register for WED 5.0</Link>
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden text-black hover:bg-red-50">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white text-black border-l border-red-100">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <div className="flex flex-col gap-6 mt-6">
                                    <Link href="/" className="flex items-center gap-3 pb-4 border-b border-red-100">
                                        <Image src="/logo.png" alt="ZVE Logo" width={40} height={40} className="h-10 w-auto" />
                                    </Link>
                                    
                                    <div className="space-y-4">
                                        <Link href="/about" className="block font-medium text-gray-900 hover:text-red-600 transition-colors py-2 border-b border-gray-100 pb-4">
                                            About ZVE
                                        </Link>
                                        
                                        {/* Collapsible Events Section */}
                                        <MobileCollapsibleSection title="Events">
                                            <Link href="/wed-overview" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                WED Journey
                                            </Link>
                                            <Link href="/wed-5" className="block text-red-600 font-bold hover:text-red-700 transition-colors py-1">
                                                WED 5.0 (Anniversary)
                                            </Link>
                                            <Link href="/wed-4" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                WED 4.0 (Previous)
                                            </Link>
                                            <Link href="/wed-3" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                WED 3.0 (Completed)
                                            </Link>
                                            <Link href="/wed-2" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                WED 2.0 (Completed)
                                            </Link>
                                            <Link href="/wed-1" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                WED 1.0 (Completed)
                                            </Link>
                                        </MobileCollapsibleSection>
                                        
                                        <Link href="/gallery" className="block font-medium text-gray-900 hover:text-red-600 transition-colors py-2 border-b border-gray-100 pb-4">
                                            Gallery
                                        </Link>
                                        
                                        {/* Collapsible Get Involved Section */}
                                        <MobileCollapsibleSection title="Get Involved">
                                            <Link href="/sponsorship" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                Sponsorship
                                            </Link>
                                            <Link href="/vendor-registration" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                Vendor Registration
                                            </Link>
                                            <Link href="/leadership" className="block text-gray-600 hover:text-red-600 transition-colors py-1">
                                                Leadership
                                            </Link>
                                        </MobileCollapsibleSection>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3 mt-6">
                                        <Button asChild className="bg-red-700 hover:bg-red-800 text-white">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                                            <Link href="/register">Register for WED 5.0</Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
