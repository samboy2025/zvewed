import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    type: "up" | "down" | "neutral"
  }
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.type === "up" && "text-green-600",
                trend.type === "down" && "text-red-600",
                trend.type === "neutral" && "text-gray-600"
              )}
            >
              {trend.type === "up" && "↗"} 
              {trend.type === "down" && "↘"} 
              {trend.value}%
            </span>
            <span className="text-xs text-gray-500 ml-1">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 