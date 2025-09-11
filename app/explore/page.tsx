"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { WishCard } from "@/components/wish-card"
import { FilterDrawer } from "@/components/filter-drawer"
import { WishSkeleton } from "@/components/wish-skeleton"
import { EmptyState } from "@/components/empty-state"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, Grid, List } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample wishes data
const allWishes = [
  {
    id: "1",
    title: "School Fees for Final Semester",
    description:
      "I need help completing my Computer Science degree. Just one semester left to graduate and start my career in tech.",
    category: "Education",
    location: "Lagos, NG",
    amountRequested: 450000,
    amountGranted: 270000,
    currency: "₦",
    imageUrl: "/placeholder.svg?height=300&width=400&text=School",
    user: { name: "Adaora Okafor", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "2 days ago",
    isVerified: true,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Laptop to Start Freelance Design",
    description:
      "As a graphic designer, I need a reliable laptop to start my freelance business and support my family.",
    category: "Startup",
    location: "Nairobi, KE",
    amountRequested: 900,
    amountGranted: 180,
    currency: "$",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Laptop",
    user: { name: "James Mwangi", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "5 hours ago",
    isVerified: true,
    isUrgent: false,
  },
  {
    id: "3",
    title: "Medical Bills for Surgery",
    description: "My mother needs urgent surgery. We have exhausted our savings and need help with the medical bills.",
    category: "Health",
    location: "Accra, GH",
    amountRequested: 3200,
    amountGranted: 800,
    currency: "$",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Medical",
    user: { name: "Kwame Asante", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "1 day ago",
    isVerified: true,
    isUrgent: true,
  },
  {
    id: "4",
    title: "Sewing Machine for Small Business",
    description:
      "I want to start a tailoring business to support my children. I need a good sewing machine to get started.",
    category: "Business",
    location: "Ibadan, NG",
    amountRequested: 180000,
    amountGranted: 0,
    currency: "₦",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Sewing",
    user: { name: "Fatima Ibrahim", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "3 hours ago",
    isVerified: false,
    isUrgent: false,
  },
  {
    id: "5",
    title: "Art Supplies for Young Artist",
    description:
      "I am a 16-year-old artist who dreams of attending art school. I need quality supplies to build my portfolio.",
    category: "Education",
    location: "Cape Town, ZA",
    amountRequested: 500,
    amountGranted: 125,
    currency: "$",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Art",
    user: { name: "Thabo Molefe", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "1 week ago",
    isVerified: true,
    isUrgent: false,
  },
  {
    id: "6",
    title: "Clean Water Well for Village",
    description: "Our village of 200 people needs a clean water well. We are tired of walking 5km for water every day.",
    category: "Community",
    location: "Tamale, GH",
    amountRequested: 5000,
    amountGranted: 1200,
    currency: "$",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Water",
    user: { name: "Chief Alhassan", avatar: "/placeholder.svg?height=40&width=40" },
    timePosted: "4 days ago",
    isVerified: true,
    isUrgent: false,
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    locations: [] as string[],
    urgency: "",
    amountRange: [0, 10000],
    verificationStatus: "",
    fundingStatus: "",
  })

  // Filter wishes based on search and filters
  const filteredWishes = allWishes.filter((wish) => {
    const matchesSearch =
      wish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(wish.category)
    const matchesVerification =
      !filters.verificationStatus ||
      (filters.verificationStatus === "verified" && wish.isVerified) ||
      (filters.verificationStatus === "unverified" && !wish.isVerified)

    return matchesSearch && matchesCategory && matchesVerification
  })

  // Sort wishes
  const sortedWishes = [...filteredWishes].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime()
      case "urgent":
        return b.isUrgent ? 1 : -1
      case "most-supported":
        return b.amountGranted / b.amountRequested - a.amountGranted / a.amountRequested
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Explore Wishes</h1>
          <p className="text-lg text-muted-foreground">Discover dreams waiting to be fulfilled</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search wishes, users, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                  <SelectItem value="most-supported">Most Supported</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters Button */}
              <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="w-full lg:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {(filters.categories.length > 0 || filters.verificationStatus) && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {filters.categories.length + (filters.verificationStatus ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.verificationStatus) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {filters.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          categories: prev.categories.filter((c) => c !== category),
                        }))
                      }
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {filters.verificationStatus && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.verificationStatus}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, verificationStatus: "" }))}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFilters({
                      categories: [],
                      locations: [],
                      urgency: "",
                      amountRange: [0, 10000],
                      verificationStatus: "",
                      fundingStatus: "",
                    })
                  }
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${sortedWishes.length} wishes found`}
          </p>
        </div>

        {/* Wishes Grid/List */}
        {isLoading ? (
          <div className={cn("grid gap-6", viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
            {Array.from({ length: 6 }).map((_, i) => (
              <WishSkeleton key={i} />
            ))}
          </div>
        ) : sortedWishes.length === 0 ? (
          <EmptyState
            title="No wishes match your filters"
            description="Try adjusting your search terms or filters to find more wishes."
            action={
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setFilters({
                    categories: [],
                    locations: [],
                    urgency: "",
                    amountRange: [0, 10000],
                    verificationStatus: "",
                    fundingStatus: "",
                  })
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className={cn("grid gap-6", viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
            {sortedWishes.map((wish) => (
              <WishCard key={wish.id} {...wish} className={viewMode === "list" ? "flex-row" : ""} />
            ))}
          </div>
        )}

        {/* Load More */}
        {sortedWishes.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Wishes
            </Button>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer open={isFilterOpen} onOpenChange={setIsFilterOpen} filters={filters} onFiltersChange={setFilters} />
    </div>
  )
}
