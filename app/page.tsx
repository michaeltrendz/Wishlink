import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WishCard } from "@/components/wish-card"
import { Gift, Heart, Shield, TrendingUp, ArrowRight, Users, CheckCircle, Sparkles, Star } from "lucide-react"
import Link from "next/link"

// Sample data
const featuredWishes = [
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
    imageUrl: "/computer-science-student.png",
    user: {
      name: "Adaora Okafor",
      avatar: "/placeholder-w4h8i.png",
    },
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
    imageUrl: "/placeholder-pq8r8.png",
    user: {
      name: "James Mwangi",
      avatar: "/placeholder-ung4d.png",
    },
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
    imageUrl: "/placeholder-sacx0.png",
    user: {
      name: "Kwame Asante",
      avatar: "/placeholder-oqggl.png",
    },
    timePosted: "1 day ago",
    isVerified: true,
    isUrgent: true,
  },
]

const topDonors = [
  { name: "Zainab A.", amount: "₦4.2M", avatar: "/placeholder.svg?height=40&width=40", badge: "Streak 12 weeks" },
  {
    name: "Anonymous #2481",
    amount: "$7,800",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Early Supporter",
  },
  {
    name: "Kobby Mensah",
    amount: "₵95,000",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Community Builder",
  },
  { name: "Sarah Johnson", amount: "$5,200", avatar: "/placeholder.svg?height=40&width=40", badge: "Verified Donor" },
  { name: "Ahmed Hassan", amount: "₦2.8M", avatar: "/placeholder.svg?height=40&width=40", badge: "Rising Star" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <MobileNav />

      <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pb-32">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-4 md:left-10 w-20 md:w-32 h-20 md:h-32 bg-blue-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-4 md:right-20 w-16 md:w-24 h-16 md:h-24 bg-green-500/20 rounded-full blur-xl md:blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-24 md:w-40 h-24 md:h-40 bg-purple-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {/* Enhanced badge */}
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg">
                <Sparkles className="h-4 w-4" />
                Over 50,000 dreams fulfilled
              </div>

              <div className="space-y-6 md:space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.9] tracking-tight">
                  Where Dreams
                  <br />
                  <span className="text-blue-600">Meet Kindness</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4 md:px-0">
                  A simple, beautiful platform connecting people who need help with those who want to give.
                </p>
              </div>

              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 md:px-0">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  Post Your Wish
                  <Star className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-2xl border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white font-bold transition-all duration-300 hover:scale-105 group"
                  asChild
                >
                  <Link href="/explore">
                    Grant a Wish
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Enhanced stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 md:pt-20 max-w-4xl mx-auto px-4 md:px-0">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 text-center group hover:shadow-xl hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2">50K+</div>
                  <div className="text-sm md:text-base text-gray-700 font-bold">Dreams Fulfilled</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 text-center group hover:shadow-xl hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">$2.8M</div>
                  <div className="text-sm md:text-base text-gray-700 font-bold">Total Granted</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 text-center group hover:shadow-xl hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">100K+</div>
                  <div className="text-sm md:text-base text-gray-700 font-bold">Happy Hearts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-gray-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Three simple steps to make magic happen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Share Your Story</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                Tell us about your dream with photos and details. Authentic stories connect hearts.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-green-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-green-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Get Verified</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                Quick verification builds trust. Verified wishes receive 5x more support.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-purple-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Receive Support</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                Watch as generous hearts come together to make your dream reality.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-gray-900 tracking-tight">
              Featured Dreams
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Real stories from our community. Help make these dreams come true.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-16">
            {featuredWishes.map((wish, index) => (
              <div key={wish.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <WishCard {...wish} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-2xl border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white font-bold transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link href="/explore">
                Discover More Dreams
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-gray-900 tracking-tight">
              Built on Trust
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Your security and peace of mind are our priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Secure Payments</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                Bank-level encryption protects every transaction with secure escrow.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-green-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-green-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Verified Stories</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                Every wish is reviewed to ensure authenticity and trustworthiness.
              </p>
            </Card>

            <Card className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 text-center hover:shadow-2xl hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 group">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-purple-600 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-900">Community Support</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                24/7 support team ensures a safe, positive experience for everyone.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4 text-gray-900">Top Donors</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium">
              Celebrating our most generous community members
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {topDonors.map((donor, index) => (
              <Card
                key={donor.name}
                className="text-center p-4 md:p-6 bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative mb-3 md:mb-4">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16 mx-auto">
                    <AvatarImage src={donor.avatar || "/placeholder.svg"} alt={donor.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-900 font-bold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2">
                      <div
                        className={`h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-400 text-white"
                              : "bg-amber-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="font-bold mb-1 text-sm md:text-base text-gray-900">{donor.name}</h3>
                <p className="text-base md:text-lg font-black text-blue-600 mb-2">{donor.amount}</p>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 font-medium">
                  {donor.badge}
                </Badge>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold bg-transparent"
              asChild
            >
              <Link href="/leaderboard">
                View Full Leaderboard
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">WishLink</span>
              </div>
              <p className="text-gray-700">Connecting hearts and making dreams come true.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link href="/explore" className="block text-gray-700 hover:text-gray-900">
                  Explore Wishes
                </Link>
                <Link href="/stories" className="block text-gray-700 hover:text-gray-900">
                  Success Stories
                </Link>
                <Link href="/leaderboard" className="block text-gray-700 hover:text-gray-900">
                  Leaderboard
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-gray-700 hover:text-gray-900">
                  About Us
                </Link>
                <Link href="/faq" className="block text-gray-700 hover:text-gray-900">
                  FAQ
                </Link>
                <Link href="/contact" className="block text-gray-700 hover:text-gray-900">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/terms" className="block text-gray-700 hover:text-gray-900">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="block text-gray-700 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-gray-700">
            <p>&copy; 2024 WishLink. Made with ❤️ for dreamers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
