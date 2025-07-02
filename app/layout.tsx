import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "World Entrepreneurship Day 3.0 - Zazzau Version",
  description:
    "Innovate Locally, Impact Globally: Empowering Entrepreneurs for a Sustainable Future - August 24, 2024 at ABU Zaria",
  keywords: "entrepreneurship, innovation, business, startup, WED, Zaria, ABU, networking",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
