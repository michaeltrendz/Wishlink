"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, MapPin, Clock, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { GrantButton } from "@/components/grant-button"

interface WishCardProps {
  id: string
  title: string
  description: string
  category: string
  location: string
  amountRequested: number
  amountGranted: number
  currency: string
  imageUrl: string
  user: {
    name: string
    avatar: string
  }
  timePosted: string
  isVerified: boolean
  isUrgent?: boolean
  className?: string
}

export function WishCard({
  id,
  title,
  description,
  category,
  location,
  amountRequested,
  amountGranted,
  currency,
  imageUrl,
  user,
  timePosted,
  isVerified,
  isUrgent = false,
  className,
}: WishCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const progressPercentage = (amountGranted / amountRequested) * 100

  const wishData = {
    id,
    title,
    description,
    targetAmount: amountRequested,
    raisedAmount: amountGranted,
    wisher: {
      name: user.name,
      avatar: user.avatar,
      verified: isVerified,
    },
    category,
    urgency: isUrgent ? ("high" as const) : ("medium" as const),
    image: imageUrl,
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {isUrgent && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Urgent
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
            isSaved && "text-red-500",
          )}
          onClick={() => setIsSaved(!isSaved)}
        >
          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
        </Button>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          {isVerified && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Shield className="mr-1 h-3 w-3 text-primary" />
              Verified
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Link href={`/wish/${id}`}>
            <h3 className="font-heading font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {currency}
              {amountGranted.toLocaleString()} raised
            </span>
            <span className="text-muted-foreground">
              of {currency}
              {amountRequested.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">{progressPercentage.toFixed(0)}% funded</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium">{user.name}</p>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {location}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{timePosted}</div>
        </div>

        <div className="flex gap-2">
          <GrantButton wish={wishData} className="flex-1" />
          <Button variant="outline" size="sm">
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
