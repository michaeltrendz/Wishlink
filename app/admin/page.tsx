"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Heart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  MoreHorizontal,
  Search,
  Download,
} from "lucide-react"

// Sample admin data
const adminStats = {
  totalUsers: 12847,
  totalWishes: 3421,
  totalGranted: 2156789,
  activeWishes: 892,
  pendingReviews: 23,
  flaggedContent: 7,
}

const recentWishes = [
  {
    id: "1",
    title: "Help Me Buy a Laptop for Computer Science Studies",
    wisher: { name: "Sarah Johnson", avatar: "/computer-science-student.png", verified: true },
    amount: 800,
    raised: 320,
    status: "active",
    category: "Education",
    createdAt: "2024-01-15",
    flagged: false,
  },
  {
    id: "2",
    title: "Medical Treatment for My Mother",
    wisher: { name: "John Doe", avatar: "/placeholder.svg", verified: false },
    amount: 5000,
    raised: 1200,
    status: "pending_review",
    category: "Medical",
    createdAt: "2024-01-20",
    flagged: true,
  },
  {
    id: "3",
    title: "Start My Small Business Dream",
    wisher: { name: "Maria Garcia", avatar: "/placeholder.svg", verified: true },
    amount: 2500,
    raised: 2500,
    status: "completed",
    category: "Business",
    createdAt: "2024-01-10",
    flagged: false,
  },
]

const recentUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/computer-science-student.png",
    joinDate: "2024-01-15",
    verified: true,
    totalWishes: 1,
    totalGrants: 0,
    status: "active",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "/placeholder.svg",
    joinDate: "2024-01-10",
    verified: true,
    totalWishes: 0,
    totalGrants: 5,
    status: "active",
  },
  {
    id: "3",
    name: "Suspicious User",
    email: "suspicious@example.com",
    avatar: "/placeholder.svg",
    joinDate: "2024-01-22",
    verified: false,
    totalWishes: 3,
    totalGrants: 0,
    status: "flagged",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-secondary text-secondary-foreground" },
  pending_review: { label: "Pending Review", color: "bg-accent text-accent-foreground" },
  completed: { label: "Completed", color: "bg-primary text-primary-foreground" },
  rejected: { label: "Rejected", color: "bg-destructive text-destructive-foreground" },
  flagged: { label: "Flagged", color: "bg-destructive text-destructive-foreground" },
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWishes = recentWishes.filter((wish) => {
    const matchesSearch =
      wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.wisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || wish.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredUsers = recentUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage the WishLink platform</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="wishes">Wishes</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-secondary" />
                      <span className="text-secondary">+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Wishes</p>
                        <p className="text-2xl font-bold">{adminStats.activeWishes.toLocaleString()}</p>
                      </div>
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-secondary" />
                      <span className="text-secondary">+8% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Granted</p>
                        <p className="text-2xl font-bold">${(adminStats.totalGranted / 1000000).toFixed(1)}M</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-secondary" />
                      <span className="text-secondary">+23% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                        <p className="text-2xl font-bold">{adminStats.pendingReviews}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-accent" />
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-muted-foreground">Requires attention</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Wishes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentWishes.slice(0, 3).map((wish) => (
                      <div key={wish.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {wish.wisher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{wish.title}</p>
                          <p className="text-sm text-muted-foreground">by {wish.wisher.name}</p>
                        </div>
                        <Badge className={statusConfig[wish.status as keyof typeof statusConfig].color}>
                          {statusConfig[wish.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                          <Badge className={statusConfig[user.status as keyof typeof statusConfig].color}>
                            {statusConfig[user.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Wishes Management Tab */}
            <TabsContent value="wishes" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search wishes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Wishes List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Wishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredWishes.map((wish) => (
                      <div key={wish.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {wish.wisher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{wish.title}</h3>
                            {wish.flagged && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            by {wish.wisher.name} • {wish.category} • {new Date(wish.createdAt).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm">
                              ${wish.raised.toLocaleString()} / ${wish.amount.toLocaleString()}
                            </span>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(wish.raised / wish.amount) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={statusConfig[wish.status as keyof typeof statusConfig].color}>
                            {statusConfig[wish.status as keyof typeof statusConfig].label}
                          </Badge>

                          <div className="flex gap-1">
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {wish.status === "pending_review" && (
                              <>
                                <Button variant="outline" size="icon" className="text-secondary bg-transparent">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="text-destructive bg-transparent">
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            {user.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {new Date(user.joinDate).toLocaleDateString()} •{user.totalWishes} wishes •{" "}
                            {user.totalGrants} grants
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={statusConfig[user.status as keyof typeof statusConfig].color}>
                            {statusConfig[user.status as keyof typeof statusConfig].label}
                          </Badge>

                          <div className="flex gap-1">
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Moderation Tab */}
            <TabsContent value="moderation" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      Flagged Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No flagged content at the moment</p>
                      <p className="text-sm">Great job keeping the platform safe!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Pending Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentWishes
                      .filter((w) => w.status === "pending_review")
                      .map((wish) => (
                        <div key={wish.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {wish.wisher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{wish.title}</p>
                            <p className="text-xs text-muted-foreground">by {wish.wisher.name}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-secondary bg-transparent">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-destructive bg-transparent">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">New Users (30d)</span>
                        <span className="font-semibold">+1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">New Wishes (30d)</span>
                        <span className="font-semibold">+342</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Grants (30d)</span>
                        <span className="font-semibold">$127,450</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Wishes Funded</span>
                        <span className="font-semibold">73%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg. Time to Fund</span>
                        <span className="font-semibold">12 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">User Retention</span>
                        <span className="font-semibold">84%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Education</span>
                        <span className="font-semibold">34%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Medical</span>
                        <span className="font-semibold">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Business</span>
                        <span className="font-semibold">22%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
