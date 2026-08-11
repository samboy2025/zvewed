import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Zazzau Version Entrepreneurs (ZVE) - Empowering Northern Nigeria's Innovators",
  description:
    "ZVE is a transformative entrepreneurship organization. Join us for our 5th anniversary flagship event, WED 5.0, on October 3-4, 2026: 'Building Resilient Enterprises for the Future'.",
  keywords: "ZVE, Zazzau Version Entrepreneurs, entrepreneurship, innovation, business, startup, WED 5.0, Zaria, Northern Nigeria, networking, Pitch Competition",
  generator: 'v0.dev'
}

export default function HomePage() {
  return <HomePageClient />
}
