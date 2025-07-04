"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  showSearch?: boolean
  notifications?: number
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  actions, 
  showSearch = false,
  notifications = 0 
}: DashboardHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10"
              />
            </div>
          )}
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>
          
          {actions}
        </div>
      </div>
    </div>
  )
} 