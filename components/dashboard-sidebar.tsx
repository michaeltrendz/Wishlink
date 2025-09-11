"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Home, Heart, HandHeart, MessageSquare, Wallet, Shield, Settings, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "wisher" | "grantor" | "both"
}

export function DashboardSidebar({ activeTab, onTabChange, userRole }: DashboardSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home, show: true },
    { id: "wishes", label: "My Wishes", icon: Heart, show: userRole === "wisher" || userRole === "both", badge: "3" },
    {
      id: "grants",
      label: "My Grants",
      icon: HandHeart,
      show: userRole === "grantor" || userRole === "both",
      badge: "12",
    },
    { id: "messages", label: "Messages", icon: MessageSquare, show: true, badge: "2" },
    { id: "wallet", label: "Wallet", icon: Wallet, show: true },
    { id: "verification", label: "Verification", icon: Shield, show: true },
    { id: "settings", label: "Settings", icon: Settings, show: true },
  ]

  return (
    <div className="w-64 border-r bg-muted/30 p-6">
      {/* User Profile */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button asChild className="w-full justify-start">
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Wish
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start bg-transparent">
            <Link href="/explore">
              <Search className="mr-2 h-4 w-4" />
              Explore Wishes
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/20",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
              {item.badge && <Badge className="ml-auto h-5 w-5 rounded-full p-0 text-xs">{item.badge}</Badge>}
            </Button>
          ))}
      </nav>
    </div>
  )
}
