import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

export function EmptyState({
  title,
  description,
  action,
  icon = <Search className="h-12 w-12 text-muted-foreground" />,
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}
