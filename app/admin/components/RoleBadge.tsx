import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoleBadgeProps {
  role: string
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const getVariant = () => {
    switch (role) {
      case "admin":
        return "destructive"
      case "sponsor":
        return "default"
      case "vendor":
        return "secondary"
      case "speaker":
        return "outline"
      case "participant":
      default:
        return "secondary"
    }
  }

  const getClassName = () => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200"
      case "sponsor":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "vendor":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "speaker":
        return "bg-green-100 text-green-700 border-green-200"
      case "participant":
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Badge variant={getVariant()} className={cn(getClassName(), className)}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  )
}
