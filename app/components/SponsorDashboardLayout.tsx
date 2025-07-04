"use client"

import { SponsorSidebar } from "./SponsorSidebar"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface SponsorDashboardLayoutProps {
  children: React.ReactNode
}

export function SponsorDashboardLayout({ children }: SponsorDashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SponsorSidebar currentPath={pathname} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-3 py-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-gray-900">
              Sponsor Portal
            </h1>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

