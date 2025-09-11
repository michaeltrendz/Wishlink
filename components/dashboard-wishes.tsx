"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/empty-state"
import { Search, Plus, MoreHorizontal, Edit, Share2, Eye, Trash2, Heart, Clock } from "lucide-react"
import Link from "next/link"

// Sample wishes data
const wishesData = [
  {
    id: "1",
    title: "Laptop to Start Freelance Design",
    category: "Startup",
    status: "live",
    amountRequested: 900,
    amountGranted: 180,
    currency: "$",
    grantors: 8,
    views: 234,
    createdAt: "2024-01-08",
    lastUpdate: "2 hours ago",
    isUrgent: false,
  },
  {
    id: "2",
    title: "School Fees for Final Semester",
    category: "Education",
    status: "funded",
    amountRequested: 1200,
    amountGranted: 1200,
    currency: "$",
    grantors: 15,
    views: 456,
    createdAt: "2024-01-05",
    lastUpdate: "1 week ago",
    isUrgent: false,
  },
  {
    id: "3",
    title: "Art Supplies for Portfolio",
    category: "Education",
    status: "draft",
    amountRequested: 300,
    amountGranted: 0,
    currency: "$",
    grantors: 0,
    views: 0,
    createdAt: "2024-01-10",
    lastUpdate: "Never",
    isUrgent: false,
  },
]

const statusConfig = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
  live: { label: "Live", color: "bg-primary text-primary-foreground" },
  funded: { label: "Funded", color: "bg-secondary text-secondary-foreground" },
  closed: { label: "Closed", color: "bg-destructive text-destructive-foreground" },
}

export function DashboardWishes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredWishes = wishesData.filter((wish) => {
    const matchesSearch = wish.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || wish.status === activeTab
    return matchesSearch && matchesTab
  })

  const getStatusCounts = () => {
    return {
      all: wishesData.length,
      draft: wishesData.filter((w) => w.status === "draft").length,
      live: wishesData.filter((w) => w.status === "live").length,
      funded: wishesData.filter((w) => w.status === "funded").length,
      closed: wishesData.filter((w) => w.status === "closed").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">My Wishes</h1>
          <p className="text-muted-foreground">Manage and track your wishes</p>
        </div>
        <Button asChild>
          <Link href="/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Wish
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search your wishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({statusCounts.draft})</TabsTrigger>
          <TabsTrigger value="live">Live ({statusCounts.live})</TabsTrigger>
          <TabsTrigger value="funded">Funded ({statusCounts.funded})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({statusCounts.closed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredWishes.length === 0 ? (
            <EmptyState
              title={activeTab === "all" ? "No wishes yet" : `No ${activeTab} wishes`}
              description={
                activeTab === "all"
                  ? "You haven't created any wishes yet. Create your first wish to get started."
                  : `You don't have any ${activeTab} wishes at the moment.`
              }
              icon={<Heart className="h-12 w-12 text-muted-foreground" />}
              action={
                <Button asChild>
                  <Link href="/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Wish
                  </Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredWishes.map((wish) => (
                <Card key={wish.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{wish.title}</h3>
                              <Badge className={statusConfig[wish.status as keyof typeof statusConfig].color}>
                                {statusConfig[wish.status as keyof typeof statusConfig].label}
                              </Badge>
                              <Badge variant="outline">{wish.category}</Badge>
                              {wish.isUrgent && (
                                <Badge variant="destructive">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Created {wish.createdAt} • Last updated {wish.lastUpdate}
                            </p>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/wish/${wish.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              {wish.status === "draft" && (
                                <DropdownMenuItem asChild>
                                  <Link href={`/create?edit=${wish.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {wish.status !== "draft" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">
                                {wish.currency}
                                {wish.amountGranted.toLocaleString()} raised
                              </span>
                              <span className="text-muted-foreground">
                                of {wish.currency}
                                {wish.amountRequested.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={(wish.amountGranted / wish.amountRequested) * 100} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{Math.round((wish.amountGranted / wish.amountRequested) * 100)}% funded</span>
                              <span>
                                {wish.grantors} grantors • {wish.views} views
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {wish.status === "draft" ? (
                          <>
                            <Button variant="outline" asChild>
                              <Link href={`/create?edit=${wish.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </Button>
                            <Button>Publish</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" asChild>
                              <Link href={`/wish/${wish.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button variant="outline">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
