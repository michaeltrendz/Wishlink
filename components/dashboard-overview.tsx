"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  HandHeart,
  TrendingUp,
  Plus,
  Search,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

interface DashboardOverviewProps {
  userRole: "wisher" | "grantor" | "both"
}

// Sample data
const userStats = {
  wisher: {
    activeWishes: 2,
    totalReceived: 1250,
    pendingVerifications: 1,
    completedWishes: 1,
  },
  grantor: {
    totalGranted: 5600,
    wishesSupported: 23,
    activeGrants: 8,
    impactScore: 92,
  },
}

const recentActivity = [
  {
    id: "1",
    type: "grant_received",
    title: "New grant received",
    description: 'Sarah Johnson granted $50 to your "Laptop for Design" wish',
    time: "2 hours ago",
    icon: HandHeart,
    iconColor: "text-secondary",
  },
  {
    id: "2",
    type: "wish_verified",
    title: "Wish verified",
    description: 'Your "School Fees" wish has been verified and is now live',
    time: "1 day ago",
    icon: CheckCircle,
    iconColor: "text-primary",
  },
  {
    id: "3",
    type: "message_received",
    title: "New message",
    description: "Michael Chen sent you a message about your wish",
    time: "2 days ago",
    icon: AlertCircle,
    iconColor: "text-accent",
  },
]

const activeWishes = [
  {
    id: "1",
    title: "Laptop to Start Freelance Design",
    description: "As a graphic designer, I need a reliable laptop to start my freelance business.",
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
]

export function DashboardOverview({ userRole }: DashboardOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your wishes and grants</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(userRole === "wisher" || userRole === "both") && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Wishes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.wisher.activeWishes}</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Received</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${userStats.wisher.totalReceived}</div>
                <p className="text-xs text-muted-foreground">+$180 this week</p>
              </CardContent>
            </Card>
          </>
        )}

        {(userRole === "grantor" || userRole === "both") && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Granted</CardTitle>
                <HandHeart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${userStats.grantor.totalGranted}</div>
                <p className="text-xs text-muted-foreground">+$200 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.grantor.impactScore}</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col space-y-2">
              <Link href="/create">
                <Plus className="h-6 w-6" />
                <span>Create New Wish</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
              <Link href="/explore">
                <Search className="h-6 w-6" />
                <span>Explore Wishes</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
              <Link href="/dashboard/wallet">
                <DollarSign className="h-6 w-6" />
                <span>Add Funds</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-muted ${activity.iconColor}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Active Wishes or Grants */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{userRole === "grantor" ? "Recent Grants" : "Your Active Wishes"}</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={userRole === "grantor" ? "/dashboard/grants" : "/dashboard/wishes"}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {userRole === "grantor" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>AO</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">School Fees for Final Semester</p>
                      <p className="text-xs text-muted-foreground">Granted $100 • 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">In Escrow</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Medical Bills for Surgery</p>
                      <p className="text-xs text-muted-foreground">Granted $50 • 1 week ago</p>
                    </div>
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground">Completed</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {activeWishes.map((wish) => (
                  <div key={wish.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{wish.title}</h4>
                      <Badge variant="secondary">{wish.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${wish.amountGranted} raised</span>
                        <span>of ${wish.amountRequested}</span>
                      </div>
                      <Progress value={(wish.amountGranted / wish.amountRequested) * 100} />
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{Math.round((wish.amountGranted / wish.amountRequested) * 100)}% funded</span>
                      <span>Posted {wish.timePosted}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
