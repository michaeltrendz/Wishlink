"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav"
import { DashboardOverview } from "@/components/dashboard-overview"
import { DashboardWishes } from "@/components/dashboard-wishes"
import { DashboardGrants } from "@/components/dashboard-grants"
import { DashboardMessages } from "@/components/dashboard-messages"
import { DashboardWallet } from "@/components/dashboard-wallet"
import { DashboardVerification } from "@/components/dashboard-verification"
import { DashboardSettings } from "@/components/dashboard-settings"
import { useMobile } from "@/hooks/use-mobile"

type DashboardTab = "overview" | "wishes" | "grants" | "messages" | "wallet" | "verification" | "settings"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")
  const [userRole, setUserRole] = useState<"wisher" | "grantor" | "both">("both") // Demo state
  const isMobile = useMobile()

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview userRole={userRole} />
      case "wishes":
        return <DashboardWishes />
      case "grants":
        return <DashboardGrants />
      case "messages":
        return <DashboardMessages />
      case "wallet":
        return <DashboardWallet />
      case "verification":
        return <DashboardVerification />
      case "settings":
        return <DashboardSettings />
      default:
        return <DashboardOverview userRole={userRole} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} userRole={userRole} />}

        {/* Main Content */}
        <div className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">{renderContent()}</div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <DashboardMobileNav activeTab={activeTab} onTabChange={setActiveTab} userRole={userRole} />}
    </div>
  )
}
