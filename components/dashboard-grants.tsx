"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { Search, HandHeart, MessageSquare, Receipt, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

// Sample grants data
const grantsData = [
  {
    id: "1",
    wishId: "w1",
    wishTitle: "School Fees for Final Semester",
    wishOwner: {
      name: "Adaora Okafor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 100,
    currency: "$",
    status: "escrow",
    grantedAt: "2024-01-08",
    message: "Education is so important! Wishing you all the best in your final semester.",
    isAnonymous: false,
    receiptRequired: true,
    receiptSubmitted: false,
  },
  {
    id: "2",
    wishId: "w2",
    wishTitle: "Medical Bills for Surgery",
    wishOwner: {
      name: "Kwame Asante",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 50,
    currency: "$",
    status: "completed",
    grantedAt: "2024-01-05",
    message: "Hope your mother recovers quickly. Sending prayers.",
    isAnonymous: false,
    receiptRequired: true,
    receiptSubmitted: true,
    completedAt: "2024-01-12",
  },
  {
    id: "3",
    wishId: "w3",
    wishTitle: "Laptop to Start Freelance Design",
    wishOwner: {
      name: "James Mwangi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 25,
    currency: "$",
    status: "refunded",
    grantedAt: "2024-01-03",
    message: "",
    isAnonymous: true,
    receiptRequired: false,
    receiptSubmitted: false,
    refundedAt: "2024-01-15",
    refundReason: "Wish was cancelled by the wisher",
  },
]

const statusConfig = {
  escrow: {
    label: "In Escrow",
    color: "bg-accent text-accent-foreground",
    icon: Clock,
    description: "Funds are held securely until receipt is provided",
  },
  completed: {
    label: "Completed",
    color: "bg-secondary text-secondary-foreground",
    icon: CheckCircle,
    description: "Grant has been successfully delivered",
  },
  refunded: {
    label: "Refunded",
    color: "bg-muted text-muted-foreground",
    icon: AlertCircle,
    description: "Grant was refunded to your account",
  },
}

export function DashboardGrants() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredGrants = grantsData.filter((grant) => {
    const matchesSearch =
      grant.wishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.wishOwner.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || grant.status === activeTab
    return matchesSearch && matchesTab
  })

  const getStatusCounts = () => {
    return {
      all: grantsData.length,
      escrow: grantsData.filter((g) => g.status === "escrow").length,
      completed: grantsData.filter((g) => g.status === "completed").length,
      refunded: grantsData.filter((g) => g.status === "refunded").length,
    }
  }

  const statusCounts = getStatusCounts()
  const totalGranted = grantsData.reduce((sum, grant) => sum + grant.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">My Grants</h1>
          <p className="text-muted-foreground">Track your contributions and their impact</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">${totalGranted}</div>
          <div className="text-sm text-muted-foreground">Total granted</div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search grants by wish title or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="escrow">In Escrow ({statusCounts.escrow})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({statusCounts.completed})</TabsTrigger>
          <TabsTrigger value="refunded">Refunded ({statusCounts.refunded})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredGrants.length === 0 ? (
            <EmptyState
              title={activeTab === "all" ? "No grants yet" : `No ${activeTab} grants`}
              description={
                activeTab === "all"
                  ? "You haven't made any grants yet. Explore wishes to start making a difference."
                  : `You don't have any ${activeTab} grants at the moment.`
              }
              icon={<HandHeart className="h-12 w-12 text-muted-foreground" />}
              action={
                <Button asChild>
                  <Link href="/explore">Explore Wishes</Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredGrants.map((grant) => {
                const StatusIcon = statusConfig[grant.status as keyof typeof statusConfig].icon

                return (
                  <Card key={grant.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{grant.wishTitle}</h3>
                                <Badge className={statusConfig[grant.status as keyof typeof statusConfig].color}>
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {statusConfig[grant.status as keyof typeof statusConfig].label}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={grant.wishOwner.avatar || "/placeholder.svg"}
                                    alt={grant.wishOwner.name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {grant.wishOwner.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">
                                  {grant.isAnonymous ? "Anonymous grant" : `To ${grant.wishOwner.name}`}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Granted {grant.grantedAt}</span>
                                {grant.completedAt && <span>• Completed {grant.completedAt}</span>}
                                {grant.refundedAt && <span>• Refunded {grant.refundedAt}</span>}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">
                                {grant.currency}
                                {grant.amount}
                              </div>
                            </div>
                          </div>

                          {grant.message && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-sm italic">"{grant.message}"</p>
                            </div>
                          )}

                          {grant.refundReason && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                              <p className="text-sm text-destructive">
                                <strong>Refund reason:</strong> {grant.refundReason}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{statusConfig[grant.status as keyof typeof statusConfig].description}</span>
                            {grant.receiptRequired && (
                              <span>• Receipt {grant.receiptSubmitted ? "submitted" : "pending"}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/wish/${grant.wishId}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Wish
                            </Link>
                          </Button>

                          {grant.status === "escrow" && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                          )}

                          {grant.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Receipt className="mr-2 h-4 w-4" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
