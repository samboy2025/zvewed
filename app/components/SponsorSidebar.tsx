"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Building2, 
  CreditCard, 
  Award, 
  FileText, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

function SponsorInfo() {
  const [currentSponsor, setCurrentSponsor] = useState<any>(null)

  useEffect(() => {
    // Check both possible keys for sponsor data
    const sponsorData = localStorage.getItem('sponsorData') || localStorage.getItem('currentSponsor')
    if (sponsorData) {
      setCurrentSponsor(JSON.parse(sponsorData))
    }
  }, [])

  const getInitials = (organizationName: string) => {
    return organizationName?.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) || 'SP'
  }

  if (!currentSponsor) return null

  return (
    <div className="p-3 sm:p-4 border-b border-gray-200">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
          {getInitials(currentSponsor.organizationName)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate text-xs sm:text-sm">
            {currentSponsor.organizationName}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            {currentSponsor.sponsorshipLevel} Sponsor
          </p>
        </div>
      </div>
    </div>
  )
}

interface SponsorSidebarProps {
  currentPath: string
  className?: string
}

export function SponsorSidebar({ currentPath, className }: SponsorSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const sponsorNavItems = [
    { href: "/sponsor-dashboard", icon: Home, label: "Dashboard", badge: null },
    { href: "/sponsor-dashboard/organization-profile", icon: Building2, label: "Organization Profile", badge: null },
    { href: "/sponsor-dashboard/payment", icon: CreditCard, label: "Payment", badge: null },
    { href: "/sponsor-dashboard/benefits", icon: Award, label: "Benefits", badge: null },
    { href: "/sponsor-dashboard/guidelines", icon: FileText, label: "Guidelines", badge: null },
    { href: "/sponsor-dashboard/settings", icon: Settings, label: "Settings", badge: null },
  ]

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2 sm:gap-3">
            <Image src="/logo.png" alt="ZVE Logo" width={32} height={32} className="h-6 w-6 sm:h-8 sm:w-8" />
            <div>
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Sponsor Portal</h2>
              <p className="text-[10px] sm:text-xs text-gray-500">WED 4.0</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0 hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
      </div>

      {/* Sponsor Info */}
      {!collapsed && (
        <SponsorInfo />
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4">
        <ul className="space-y-1 sm:space-y-2">
          {sponsorNavItems.map((item) => {
            const isActive = currentPath === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                    isActive
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isActive ? "text-red-600" : "text-gray-400")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem('sponsorData')
            localStorage.removeItem('currentSponsor')
            window.location.href = '/login'
          }}
          className={cn(
            "w-full justify-start gap-2 sm:gap-3 text-gray-600 hover:text-gray-900 text-xs sm:text-sm",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
