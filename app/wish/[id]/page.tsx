"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { WishCard } from "@/components/wish-card"
import { MapPin, Calendar, Shield, Heart, Share2, Flag, Clock, CheckCircle, MessageSquare, Users } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample wish data
const wishData = {
  id: "1",
  title: "School Fees for Final Semester",
  description: `I am Adaora, a final-year Computer Science student at the University of Lagos. I have worked incredibly hard to get to this point, maintaining a 3.8 GPA while working part-time to support my studies.

Unfortunately, my family has faced unexpected financial difficulties due to my father's recent job loss. We have exhausted our savings, and I am now unable to pay for my final semester fees of ₦450,000.

This is my last semester before graduation, and I have already secured a job offer at a tech company that starts after graduation. All I need is this final push to complete my degree and start my career.

I have attached my academic transcripts, admission letter, and the school fee invoice as proof. Any amount, no matter how small, will bring me closer to my dream of becoming a software engineer and eventually giving back to others in similar situations.

Thank you for taking the time to read my story. Your support means the world to me.`,
  category: "Education",
  location: "Lagos, NG",
  amountRequested: 450000,
  amountGranted: 270000,
  currency: "₦",
  images: [
    "/placeholder.svg?height=400&width=600&text=University+Campus",
    "/placeholder.svg?height=400&width=600&text=Academic+Transcript",
    "/placeholder.svg?height=400&width=600&text=Fee+Invoice",
  ],
  user: {
    name: "Adaora Okafor",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Computer Science student passionate about technology and education",
    joinedDate: "March 2024",
    wishesPosted: 1,
    totalReceived: 270000,
  },
  timePosted: "2 days ago",
  deadline: "2024-02-15",
  isVerified: true,
  isUrgent: false,
  verificationDocs: [
    { type: "ID Verification", status: "verified" },
    { type: "Academic Records", status: "verified" },
    { type: "Fee Invoice", status: "verified" },
  ],
  updates: [
    {
      id: "1",
      date: "2024-01-10",
      title: "Thank you for the amazing support!",
      content:
        "I am overwhelmed by the generosity shown so far. We are now 60% funded! I have submitted my partial payment to the university and they have confirmed my enrollment for the final semester.",
      image: "/placeholder.svg?height=200&width=300&text=Payment+Receipt",
    },
    {
      id: "2",
      date: "2024-01-08",
      title: "Verification documents uploaded",
      content:
        "I have uploaded all required verification documents including my student ID, academic transcript, and the official fee invoice from the university.",
      image: null,
    },
  ],
  comments: [
    {
      id: "1",
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      content: "Your story is inspiring! Education is so important. Wishing you all the best in your final semester.",
      date: "1 day ago",
      isGrantor: true,
    },
    {
      id: "2",
      user: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
      content: "Just contributed! Keep pushing forward, you are almost there!",
      date: "2 days ago",
      isGrantor: true,
    },
  ],
  grantors: 23,
  shares: 156,
}

// Related wishes
const relatedWishes = [
  {
    id: "2",
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
  {
    id: "5",
    title: "Art Supplies for Young Artist",
    description: "I am a 16-year-old artist who dreams of attending art school.",
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
]

export default function WishDetailPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const progressPercentage = (wishData.amountGranted / wishData.amountRequested) * 100
  const remainingAmount = wishData.amountRequested - wishData.amountGranted

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={wishData.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={wishData.title}
                    fill
                    className="object-cover"
                  />
                  {wishData.isUrgent && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Urgent
                    </Badge>
                  )}
                </div>
                {wishData.images.length > 1 && (
                  <div className="flex gap-2 p-4">
                    {wishData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          "relative aspect-video w-20 rounded-lg overflow-hidden border-2",
                          selectedImageIndex === index ? "border-primary" : "border-transparent",
                        )}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${wishData.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wish Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{wishData.category}</Badge>
                      {wishData.isVerified && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Shield className="mr-1 h-4 w-4 text-primary" />
                          Verified
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-heading">{wishData.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {wishData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Posted {wishData.timePosted}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsSaved(!isSaved)}>
                      <Heart className={cn("h-4 w-4", isSaved && "fill-current text-red-500")} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {wishData.currency}
                      {wishData.amountGranted.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      of {wishData.currency}
                      {wishData.amountRequested.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{progressPercentage.toFixed(0)}% funded</span>
                    <span>
                      {wishData.currency}
                      {remainingAmount.toLocaleString()} remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {wishData.grantors} grantors
                    </div>
                    <div className="flex items-center">
                      <Share2 className="mr-1 h-4 w-4" />
                      {wishData.shares} shares
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Story */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold">The Story</h3>
                  <div className="prose prose-sm max-w-none">
                    {wishData.description.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="updates" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="updates">Updates ({wishData.updates.length})</TabsTrigger>
                <TabsTrigger value="comments">Comments ({wishData.comments.length})</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="updates" className="space-y-4">
                {wishData.updates.map((update) => (
                  <Card key={update.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={wishData.user.avatar || "/placeholder.svg"} alt={wishData.user.name} />
                          <AvatarFallback>
                            {wishData.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-semibold">{update.title}</h4>
                            <p className="text-sm text-muted-foreground">{update.date}</p>
                          </div>
                          <p className="text-muted-foreground">{update.content}</p>
                          {update.image && (
                            <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden">
                              <Image
                                src={update.image || "/placeholder.svg"}
                                alt="Update image"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                {wishData.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                          <AvatarFallback>
                            {comment.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{comment.user.name}</h4>
                            {comment.isGrantor && (
                              <Badge variant="secondary" className="text-xs">
                                Grantor
                              </Badge>
                            )}
                            <span className="text-sm text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="verification" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {wishData.verificationDocs.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="font-medium">{doc.type}</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span className="text-sm text-secondary font-medium">Verified</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grant Widget */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Support This Wish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    10%
                  </Button>
                  <Button variant="outline" size="sm">
                    25%
                  </Button>
                  <Button variant="outline" size="sm">
                    50%
                  </Button>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/grant/${wishData.id}`}>Grant Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Wisher Profile */}
            <Card>
              <CardHeader>
                <CardTitle>About the Wisher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={wishData.user.avatar || "/placeholder.svg"} alt={wishData.user.name} />
                    <AvatarFallback>
                      {wishData.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{wishData.user.name}</h4>
                    <p className="text-sm text-muted-foreground">Joined {wishData.user.joinedDate}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{wishData.user.bio}</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-semibold">{wishData.user.wishesPosted}</div>
                    <div className="text-xs text-muted-foreground">Wishes Posted</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {wishData.currency}
                      {wishData.user.totalReceived.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Received</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Wishes */}
            <Card>
              <CardHeader>
                <CardTitle>Related Wishes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedWishes.map((wish) => (
                  <div key={wish.id} className="space-y-3">
                    <WishCard {...wish} className="border-0 shadow-none p-0" />
                    {wish.id !== relatedWishes[relatedWishes.length - 1].id && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
