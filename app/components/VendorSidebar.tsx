"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Store, 
  Package, 
  CreditCard, 
  Settings, 
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

function VendorInfo() {
  const [currentVendor, setCurrentVendor] = useState<any>(null)

  useEffect(() => {
    const vendorData = localStorage.getItem('currentVendor')
    if (vendorData) {
      setCurrentVendor(JSON.parse(vendorData))
    }
  }, [])

  const getInitials = (companyName: string) => {
    return companyName?.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) || 'VE'
  }

  if (!currentVendor) return null

  return (
    <div className="p-3 sm:p-4 border-b border-gray-200">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
          {getInitials(currentVendor.companyName)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate text-xs sm:text-sm">
            {currentVendor.companyName}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            Vendor - WED 4.0
          </p>
        </div>
      </div>
    </div>
  )
}

interface VendorSidebarProps {
  currentPath: string
  className?: string
}

export function VendorSidebar({ currentPath, className }: VendorSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const vendorNavItems = [
    { href: "/vendor-dashboard", icon: Home, label: "Dashboard", badge: null },
    { href: "/vendor-dashboard/profile", icon: Store, label: "Company Profile", badge: null },
    { href: "/vendor-dashboard/booth", icon: Package, label: "Booth Details", badge: null },
    { href: "/vendor-dashboard/payment", icon: CreditCard, label: "Payment", badge: null },
    { href: "/vendor-dashboard/guidelines", icon: FileText, label: "Guidelines", badge: null },
    { href: "/vendor-dashboard/settings", icon: Settings, label: "Settings", badge: null },
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
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Vendor Portal</h2>
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

      {/* Vendor Info */}
      {!collapsed && (
        <VendorInfo />
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4">
        <ul className="space-y-1 sm:space-y-2">
          {vendorNavItems.map((item) => {
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
            localStorage.removeItem('currentVendor')
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
