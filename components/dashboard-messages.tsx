"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { EmptyState } from "@/components/empty-state"
import { Search, MessageSquare, Send, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample conversations data
const conversations = [
  {
    id: "1",
    participant: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "Thank you so much for your support! I just wanted to update you on my progress.",
      timestamp: "2 hours ago",
      isRead: true,
      senderId: "other",
    },
    unreadCount: 0,
    wishTitle: "School Fees for Final Semester",
    type: "grantor", // This user is a grantor in this conversation
  },
  {
    id: "2",
    participant: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    lastMessage: {
      content: "I would love to help with your laptop fund. Can you tell me more about your design work?",
      timestamp: "1 day ago",
      isRead: false,
      senderId: "other",
    },
    unreadCount: 2,
    wishTitle: "Laptop to Start Freelance Design",
    type: "wisher", // This user is a wisher in this conversation
  },
  {
    id: "3",
    participant: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "The receipt has been uploaded. Thank you for your patience!",
      timestamp: "3 days ago",
      isRead: true,
      senderId: "me",
    },
    unreadCount: 0,
    wishTitle: "Medical Bills for Surgery",
    type: "grantor",
  },
]

// Sample messages for selected conversation
const sampleMessages = [
  {
    id: "1",
    content: "Hi! Thank you so much for supporting my wish. It means the world to me!",
    timestamp: "2024-01-10 10:30 AM",
    senderId: "other",
    type: "text",
  },
  {
    id: "2",
    content: "You're very welcome! Education is so important. How are your studies going?",
    timestamp: "2024-01-10 11:15 AM",
    senderId: "me",
    type: "text",
  },
  {
    id: "3",
    content:
      "They're going really well! I'm in my final semester now and already have a job lined up after graduation.",
    timestamp: "2024-01-10 11:45 AM",
    senderId: "other",
    type: "text",
  },
  {
    id: "4",
    content: "That's fantastic news! What field will you be working in?",
    timestamp: "2024-01-10 12:00 PM",
    senderId: "me",
    type: "text",
  },
  {
    id: "5",
    content: "Software engineering at a fintech startup. I'm really excited about it!",
    timestamp: "2024-01-10 12:30 PM",
    senderId: "other",
    type: "text",
  },
  {
    id: "6",
    content: "Thank you so much for your support! I just wanted to update you on my progress.",
    timestamp: "2024-01-10 2:00 PM",
    senderId: "other",
    type: "text",
  },
]

export function DashboardMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.wishTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with grantors and wishers
          {totalUnread > 0 && <Badge className="ml-2">{totalUnread} unread</Badge>}
        </p>
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Start a conversation after you grant a wish or receive support for your wishes."
          icon={<MessageSquare className="h-12 w-12 text-muted-foreground" />}
        />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-muted/50 transition-colors",
                      selectedConversation.id === conversation.id && "bg-muted",
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={conversation.participant.avatar || "/placeholder.svg"}
                            alt={conversation.participant.name}
                          />
                          <AvatarFallback>
                            {conversation.participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-secondary rounded-full border-2 border-background" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium truncate">{conversation.participant.name}</h4>
                          <div className="flex items-center gap-1">
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 w-5 rounded-full p-0 text-xs">{conversation.unreadCount}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {conversation.lastMessage.content}
                        </p>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {conversation.type === "grantor" ? "Grantor" : "Wisher"}
                          </Badge>
                          <span className="text-xs text-muted-foreground truncate">{conversation.wishTitle}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.participant.avatar || "/placeholder.svg"}
                    alt={selectedConversation.participant.name}
                  />
                  <AvatarFallback>
                    {selectedConversation.participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.participant.isOnline ? "Online" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <Separator />

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.senderId === "me" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-4 py-2",
                        message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          message.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <Separator />

            {/* Message Input */}
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
