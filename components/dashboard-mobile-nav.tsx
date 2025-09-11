"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Heart, HandHeart, MessageSquare, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardMobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "wisher" | "grantor" | "both"
}

export function DashboardMobileNav({ activeTab, onTabChange, userRole }: DashboardMobileNavProps) {
  const navItems = [
    { id: "overview", label: "Home", icon: Home, show: true },
    { id: "wishes", label: "Wishes", icon: Heart, show: userRole === "wisher" || userRole === "both", badge: "3" },
    {
      id: "grants",
      label: "Grants",
      icon: HandHeart,
      show: userRole === "grantor" || userRole === "both",
      badge: "12",
    },
    { id: "messages", label: "Messages", icon: MessageSquare, show: true, badge: "2" },
    { id: "wallet", label: "Wallet", icon: Wallet, show: true },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navItems
          .filter((item) => item.show)
          .map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn("flex flex-col h-auto py-2 px-1 relative", activeTab === item.id && "text-primary")}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs">{item.badge}</Badge>
              )}
            </Button>
          ))}
      </div>
    </div>
  )
}
