"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { ConvexClientProvider } from "./ConvexClientProvider"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Hide navigation for dashboard, admin, vendor-dashboard, sponsor-dashboard, and login pages
  const hideNavigation = pathname?.startsWith('/dashboard') || 
                         pathname?.startsWith('/admin') || 
                         pathname?.startsWith('/vendor-dashboard') ||
                         pathname?.startsWith('/sponsor-dashboard') ||
                         pathname?.startsWith('/login')

  if (hideNavigation) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ConvexClientProvider>
          <LayoutContent>{children}</LayoutContent>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
