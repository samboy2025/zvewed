"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  User,
  Calendar,
  Users,
  BarChart3,
  Settings,
  FileText,
  Handshake,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

function UserInfo({ userType }: { userType: "user" | "admin" }) {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const displayName = currentUser 
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : (userType === "admin" ? "Admin User" : "User")
  
  const displayRole = currentUser
    ? currentUser.userType?.charAt(0).toUpperCase() + currentUser.userType?.slice(1)
    : (userType === "admin" ? "Administrator" : "Participant")

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`
    : (userType === "admin" ? "A" : "U")

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate text-sm">
            {displayName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {displayRole}
          </p>
        </div>
      </div>
    </div>
  )
}

interface DashboardSidebarProps {
  userType: "user" | "admin"
  currentPath: string
  className?: string
}

export function DashboardSidebar({ userType, currentPath, className }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const userNavItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", badge: null },
    { href: "/dashboard/profile", icon: User, label: "Profile", badge: null },
    { href: "/dashboard/payment", icon: CreditCard, label: "Payment", badge: null },
    { href: "/dashboard/events", icon: Calendar, label: "My Events", badge: "2" },
  ]

  const adminNavItems = [
    { href: "/admin", icon: Home, label: "Dashboard", badge: null },
    { href: "/admin/participants", icon: Users, label: "Participants", badge: "245" },
    { href: "/admin/payments", icon: CreditCard, label: "Payments", badge: null },
    { href: "/admin/events", icon: Calendar, label: "Events", badge: null },
    { href: "/admin/sponsors", icon: Handshake, label: "Sponsors", badge: "12" },
    { href: "/admin/vendors", icon: Store, label: "Vendors", badge: "8" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics", badge: null },
    { href: "/admin/content", icon: FileText, label: "Content", badge: null },
    { href: "/admin/settings", icon: Settings, label: "Settings", badge: null },
  ]

  const navItems = userType === "admin" ? adminNavItems : userNavItems

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="ZVE Logo" width={32} height={32} className="h-8 w-8" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {userType === "admin" ? "Admin Portal" : "My Dashboard"}
              </h2>
              <p className="text-xs text-gray-500">WED 4.0</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <UserInfo userType={userType} />
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-red-600" : "text-gray-400")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
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
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem('currentUser')
            window.location.href = '/login'
          }}
          className={cn(
            "w-full justify-start gap-3 text-gray-600 hover:text-gray-900",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  )
} 