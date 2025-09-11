"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { WishStepper } from "@/components/wish-stepper"
import { FileUpload } from "@/components/file-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Basics", description: "Tell us about your wish" },
  { id: 2, title: "The Need", description: "Financial details" },
  { id: 3, title: "Your Story", description: "Share your story" },
  { id: 4, title: "Verification", description: "Verify your identity" },
  { id: 5, title: "Preview", description: "Review and publish" },
]

const categories = ["Education", "Health", "Business", "Startup", "Community", "Emergency", "Arts", "Technology"]

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
]

interface WishFormData {
  // Basics
  title: string
  category: string
  location: string
  coverImage: File | null

  // The Need
  amountRequested: string
  currency: string
  breakdown: Array<{ item: string; amount: string }>
  isUrgent: boolean
  deadline: Date | undefined

  // Story
  description: string
  mediaFiles: File[]

  // Verification
  idDocument: File | null
  supportingDocs: File[]

  // Settings
  allowAnonymousGrants: boolean
  enableComments: boolean
}

export default function CreateWishPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<WishFormData>({
    title: "",
    category: "",
    location: "",
    coverImage: null,
    amountRequested: "",
    currency: "USD",
    breakdown: [{ item: "", amount: "" }],
    isUrgent: false,
    deadline: undefined,
    description: "",
    mediaFiles: [],
    idDocument: null,
    supportingDocs: [],
    allowAnonymousGrants: true,
    enableComments: true,
  })

  const updateFormData = (updates: Partial<WishFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const addBreakdownItem = () => {
    updateFormData({
      breakdown: [...formData.breakdown, { item: "", amount: "" }],
    })
  }

  const removeBreakdownItem = (index: number) => {
    updateFormData({
      breakdown: formData.breakdown.filter((_, i) => i !== index),
    })
  }

  const updateBreakdownItem = (index: number, field: "item" | "amount", value: string) => {
    const newBreakdown = [...formData.breakdown]
    newBreakdown[index][field] = value
    updateFormData({ breakdown: newBreakdown })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push("/wish/new-wish-id")
  }

  const selectedCurrency = currencies.find((c) => c.code === formData.currency)
  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">Create Your Wish</h1>
            <p className="text-lg text-muted-foreground">
              Share your dream with the world and let others help make it come true
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% complete</span>
              </div>
              <Progress value={progressPercentage} className="mb-4" />
              <WishStepper steps={steps} currentStep={currentStep} />
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Wish Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., School Fees for Final Semester"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Make it clear and compelling. This is what people will see first.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Lagos, Nigeria"
                      value={formData.location}
                      onChange={(e) => updateFormData({ location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image *</Label>
                    <FileUpload
                      accept="image/*"
                      onFileSelect={(file) => updateFormData({ coverImage: file })}
                      className="aspect-video"
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload a compelling image that represents your wish. This will be the main image people see.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: The Need */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount Requested *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={formData.amountRequested}
                        onChange={(e) => updateFormData({ amountRequested: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency *</Label>
                      <Select value={formData.currency} onValueChange={(value) => updateFormData({ currency: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Cost Breakdown</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addBreakdownItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                    {formData.breakdown.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Item description"
                          value={item.item}
                          onChange={(e) => updateBreakdownItem(index, "item", e.target.value)}
                          className="flex-1"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {selectedCurrency?.symbol}
                          </span>
                          <Input
                            type="number"
                            placeholder="0"
                            value={item.amount}
                            onChange={(e) => updateBreakdownItem(index, "amount", e.target.value)}
                            className="pl-8 w-32"
                          />
                        </div>
                        {formData.breakdown.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeBreakdownItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="urgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => updateFormData({ isUrgent: checked })}
                    />
                    <Label htmlFor="urgent">This is urgent</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.deadline && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.deadline}
                          onSelect={(date) => updateFormData({ deadline: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              {/* Step 3: Your Story */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Tell Your Story *</Label>
                    <Textarea
                      id="description"
                      placeholder="Share your story in detail. Why do you need this? How will it help you? What impact will it have on your life?"
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                      rows={10}
                    />
                    <p className="text-sm text-muted-foreground">
                      Be honest and detailed. People want to understand your situation and how their help will make a
                      difference.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Images/Videos (Optional)</Label>
                    <FileUpload
                      accept="image/*,video/*"
                      multiple
                      onFileSelect={(files) => updateFormData({ mediaFiles: Array.isArray(files) ? files : [files] })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Add more photos or videos to support your story. Maximum 5 files.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2">Why Verification?</h4>
                    <p className="text-sm text-muted-foreground">
                      Verification builds trust with potential grantors and increases your chances of receiving support.
                      All documents are securely stored and only used for verification purposes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>ID Document *</Label>
                    <FileUpload
                      accept=".pdf,.jpg,.jpeg,.png"
                      onFileSelect={(file) => updateFormData({ idDocument: file })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload a clear photo of your government-issued ID (passport, driver's license, national ID).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Supporting Documents (Optional)</Label>
                    <FileUpload
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onFileSelect={(files) =>
                        updateFormData({ supportingDocs: Array.isArray(files) ? files : [files] })
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload any documents that support your wish (invoices, medical reports, school letters, etc.).
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Preview */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2">Review Your Wish</h4>
                    <p className="text-sm text-muted-foreground">
                      Please review all the information below. Once published, some details cannot be changed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Title:</strong> {formData.title}
                        </div>
                        <div>
                          <strong>Category:</strong> {formData.category}
                        </div>
                        <div>
                          <strong>Location:</strong> {formData.location}
                        </div>
                        <div>
                          <strong>Amount:</strong> {selectedCurrency?.symbol}
                          {formData.amountRequested}
                        </div>
                        {formData.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Your Story</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">{formData.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="anonymous-grants"
                            checked={formData.allowAnonymousGrants}
                            onCheckedChange={(checked) => updateFormData({ allowAnonymousGrants: checked })}
                          />
                          <Label htmlFor="anonymous-grants">Allow anonymous grants</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="enable-comments"
                            checked={formData.enableComments}
                            onCheckedChange={(checked) => updateFormData({ enableComments: checked })}
                          />
                          <Label htmlFor="enable-comments">Enable comments</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep === steps.length ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Publishing...</>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Wish
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
