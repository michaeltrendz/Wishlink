"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { GrantButton } from "@/components/grant-button"
import { Share2, Flag, MapPin, Calendar, CheckCircle } from "lucide-react"

// Sample wish data - in real app this would come from API
const sampleWish = {
  id: "1",
  title: "Help Me Buy a Laptop for Computer Science Studies",
  description:
    "I'm a first-year computer science student who needs a laptop for my studies. My family can't afford one right now, and I'm working part-time to save up, but it's not enough. A laptop would help me complete assignments, learn programming, and build projects for my portfolio.",
  longDescription: `I'm Sarah, a 19-year-old first-year computer science student at State University. Coming from a low-income family, affording a laptop for my studies has been a significant challenge.

Currently, I rely on the university's computer lab, but the limited hours and high demand make it difficult to complete assignments and work on personal projects. I'm working 20 hours a week at a local café to help with expenses, but after tuition and living costs, there's little left for a laptop.

A laptop would be transformative for my education. It would allow me to:
- Complete programming assignments from my dorm
- Build a portfolio of projects to show potential employers
- Participate in online coding bootcamps and tutorials
- Collaborate with classmates on group projects

I've researched affordable options and found a reliable laptop that would meet my needs for the next 4 years of study. Any contribution, no matter how small, would bring me closer to this goal and help me succeed in my computer science journey.

Thank you for considering supporting my education!`,
  targetAmount: 800,
  raisedAmount: 320,
  wisher: {
    name: "Sarah Johnson",
    avatar: "/computer-science-student.png",
    verified: true,
    location: "Austin, TX",
    joinDate: "December 2023",
    bio: "Computer Science student passionate about web development and AI",
  },
  category: "Education",
  urgency: "medium" as const,
  image: "/placeholder-w4h8i.png",
  createdAt: "2024-01-15",
  deadline: "2024-03-01",
  supporters: 23,
  updates: [
    {
      id: "1",
      date: "2024-01-20",
      title: "Thank you for the amazing support!",
      content:
        "I'm overwhelmed by the generosity shown so far. We're already at 40% of the goal! I've been researching laptops and found some great options within budget.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ],
  recentGrants: [
    {
      id: "1",
      grantor: { name: "Anonymous", avatar: "" },
      amount: 50,
      message: "Good luck with your studies!",
      date: "2024-01-22",
      isAnonymous: true,
    },
    {
      id: "2",
      grantor: { name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40" },
      amount: 25,
      message: "Education is so important. Keep going!",
      date: "2024-01-21",
      isAnonymous: false,
    },
    {
      id: "3",
      grantor: { name: "Jennifer Smith", avatar: "/placeholder.svg?height=40&width=40" },
      amount: 100,
      message: "As a fellow CS student, I know how important having your own laptop is. Best of luck!",
      date: "2024-01-20",
      isAnonymous: false,
    },
  ],
}

export default function GrantPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"story" | "updates" | "grants">("story")

  const wish = sampleWish // In real app, fetch by params.id
  const progressPercentage = (wish.raisedAmount / wish.targetAmount) * 100
  const remainingAmount = wish.targetAmount - wish.raisedAmount
  const daysLeft = Math.ceil((new Date(wish.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{wish.category}</Badge>
                <Badge variant={wish.urgency === "high" ? "destructive" : "outline"}>
                  {wish.urgency === "high" ? "Urgent" : "Active"}
                </Badge>
              </div>

              <h1 className="font-heading text-3xl font-bold">{wish.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {wish.wisher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{wish.wisher.name}</span>
                  {wish.wisher.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{wish.wisher.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {new Date(wish.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            {wish.image && (
              <div className="rounded-xl overflow-hidden">
                <img
                  src={wish.image || "/placeholder.svg"}
                  alt={wish.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}

            {/* Content Tabs */}
            <Card>
              <CardHeader>
                <div className="flex gap-4">
                  <Button variant={activeTab === "story" ? "default" : "ghost"} onClick={() => setActiveTab("story")}>
                    Story
                  </Button>
                  <Button
                    variant={activeTab === "updates" ? "default" : "ghost"}
                    onClick={() => setActiveTab("updates")}
                  >
                    Updates ({wish.updates.length})
                  </Button>
                  <Button variant={activeTab === "grants" ? "default" : "ghost"} onClick={() => setActiveTab("grants")}>
                    Grants ({wish.supporters})
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "story" && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line">{wish.longDescription}</p>
                  </div>
                )}

                {activeTab === "updates" && (
                  <div className="space-y-6">
                    {wish.updates.map((update) => (
                      <div key={update.id} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            {new Date(update.date).toLocaleDateString()}
                          </div>
                        </div>
                        <h3 className="font-semibold">{update.title}</h3>
                        <p className="text-muted-foreground">{update.content}</p>
                        {update.image && (
                          <img
                            src={update.image || "/placeholder.svg"}
                            alt="Update"
                            className="rounded-lg w-full max-w-md"
                          />
                        )}
                        <Separator />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "grants" && (
                  <div className="space-y-4">
                    {wish.recentGrants.map((grant) => (
                      <div key={grant.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                        <Avatar className="h-10 w-10">
                          {!grant.isAnonymous && grant.grantor.avatar ? (
                            <AvatarImage src={grant.grantor.avatar || "/placeholder.svg"} />
                          ) : null}
                          <AvatarFallback>
                            {grant.isAnonymous
                              ? "?"
                              : grant.grantor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {grant.isAnonymous ? "Anonymous" : grant.grantor.name}
                            </span>
                            <span className="text-sm text-muted-foreground">granted ${grant.amount}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(grant.date).toLocaleDateString()}
                            </span>
                          </div>
                          {grant.message && <p className="text-sm text-muted-foreground">{grant.message}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grant Progress */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">${wish.raisedAmount.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">of ${wish.targetAmount.toLocaleString()}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{Math.round(progressPercentage)}% funded</span>
                    <span>${remainingAmount.toLocaleString()} to go</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">{wish.supporters}</div>
                    <div className="text-sm text-muted-foreground">Supporters</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-accent">{daysLeft}</div>
                    <div className="text-sm text-muted-foreground">Days Left</div>
                  </div>
                </div>

                <GrantButton wish={wish} size="lg" className="w-full" />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wisher Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Wisher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {wish.wisher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {wish.wisher.name}
                      {wish.wisher.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="text-sm text-muted-foreground">Joined {wish.wisher.joinDate}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{wish.wisher.bio}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{wish.wisher.location}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Identity verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Funds held until delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Full refund protection</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
