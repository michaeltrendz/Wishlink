"use client"

import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GrantSuccessToastProps {
  amount: number
  wishTitle: string
  onClose: () => void
  onViewDashboard: () => void
}

export function GrantSuccessToast({ amount, wishTitle, onClose, onViewDashboard }: GrantSuccessToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Grant Successful!</div>
              <div className="text-sm text-muted-foreground">
                ${amount} sent for "{wishTitle}"
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="flex-1 bg-transparent">
            Close
          </Button>
          <Button size="sm" onClick={onViewDashboard} className="flex-1">
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
