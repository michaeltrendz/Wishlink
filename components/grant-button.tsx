"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GrantModal } from "@/components/grant-modal"
import { Heart, Zap } from "lucide-react"

interface GrantButtonProps {
  wish: {
    id: string
    title: string
    description: string
    targetAmount: number
    raisedAmount: number
    wisher: {
      name: string
      avatar: string
      verified: boolean
    }
    category: string
    urgency: "low" | "medium" | "high"
    image?: string
  }
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function GrantButton({ wish, variant = "default", size = "default", className }: GrantButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const urgencyConfig = {
    low: { icon: Heart, text: "Grant Wish" },
    medium: { icon: Heart, text: "Grant Wish" },
    high: { icon: Zap, text: "Grant Now" },
  }

  const config = urgencyConfig[wish.urgency]
  const Icon = config.icon

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant={variant} size={size} className={className}>
        <Icon className="mr-2 h-4 w-4" />
        {config.text}
      </Button>

      <GrantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} wish={wish} />
    </>
  )
}
