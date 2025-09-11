"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, CreditCard, Wallet, Shield, Target, CheckCircle, ArrowRight, Lock } from "lucide-react"

interface GrantModalProps {
  isOpen: boolean
  onClose: () => void
  wish: {
    id: string
    title: string
    description: string
    targetAmount: number
    raisedAmount: number
    wisher: {
      name: string
      avatar: string
      verified: boolean
    }
    category: string
    urgency: "low" | "medium" | "high"
    image?: string
  }
}

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    processingFee: "2.9% + $0.30",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
    processingFee: "3.49% + $0.49",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Shield,
    description: "Direct bank transfer (ACH)",
    processingFee: "0.8% (min $5)",
  },
]

const quickAmounts = [25, 50, 100, 250, 500]

export function GrantModal({ isOpen, onClose, wish }: GrantModalProps) {
  const [step, setStep] = useState<"amount" | "payment" | "confirmation">("amount")
  const [grantAmount, setGrantAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [message, setMessage] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [coverFees, setCoverFees] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const remainingAmount = wish.targetAmount - wish.raisedAmount
  const progressPercentage = (wish.raisedAmount / wish.targetAmount) * 100

  const selectedPaymentMethod = paymentMethods.find((method) => method.id === paymentMethod)
  const processingFee = grantAmount * 0.029 + 0.3 // Simplified calculation
  const totalAmount = coverFees ? grantAmount + processingFee : grantAmount

  const handleAmountSelect = (amount: number) => {
    setGrantAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setGrantAmount(numValue)
    }
  }

  const handleNext = () => {
    if (step === "amount") {
      setStep("payment")
    } else if (step === "payment") {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setStep("confirmation")
      }, 3000)
    }
  }

  const handleClose = () => {
    setStep("amount")
    setGrantAmount(50)
    setCustomAmount("")
    setMessage("")
    setIsAnonymous(false)
    setCoverFees(true)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Grant a Wish
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Wish Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {wish.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={wish.image || "/placeholder.svg"}
                      alt={wish.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{wish.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={wish.wisher.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {wish.wisher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{wish.wisher.name}</span>
                    {wish.wisher.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>${wish.raisedAmount.toLocaleString()} raised</span>
                      <span>${wish.targetAmount.toLocaleString()} goal</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {step === "amount" && (
            <div className="space-y-6">
              {/* Quick Amount Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Choose Grant Amount</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={grantAmount === amount && !customAmount ? "default" : "outline"}
                      onClick={() => handleAmountSelect(amount)}
                      className="h-12"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Impact Preview */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Your Impact</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Your grant:</span>
                      <span className="font-semibold">${grantAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New total raised:</span>
                      <span className="font-semibold">${(wish.raisedAmount + grantAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining needed:</span>
                      <span className="font-semibold">
                        ${Math.max(0, remainingAmount - grantAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optional Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Leave an encouraging message for the wisher..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Privacy Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  <Label htmlFor="anonymous" className="text-sm">
                    Grant anonymously (your name won't be shown)
                  </Label>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                          <Card className="p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-muted-foreground">{method.description}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">{method.processingFee}</div>
                            </div>
                          </Card>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              {/* Payment Form */}
              {paymentMethod === "card" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Card Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="font-mono" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholder">Cardholder Name</Label>
                      <Input id="cardholder" placeholder="John Doe" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Fee Coverage Option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cover-fees" checked={coverFees} onCheckedChange={setCoverFees} />
                  <Label htmlFor="cover-fees" className="text-sm">
                    Cover processing fees (+${processingFee.toFixed(2)}) so 100% goes to the wisher
                  </Label>
                </div>
              </div>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Grant amount:</span>
                    <span>${grantAmount.toFixed(2)}</span>
                  </div>
                  {coverFees && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing fee:</span>
                      <span>+${processingFee.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("amount")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1" size="lg" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Complete Grant
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Grant Successful!</h3>
                <p className="text-muted-foreground">
                  Your ${grantAmount.toFixed(2)} grant has been sent to {wish.wisher.name}
                </p>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Grant ID:</span>
                      <span className="font-mono">#GR{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="capitalize">{selectedPaymentMethod?.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation shortly. You can track this grant in your dashboard.
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                    Close
                  </Button>
                  <Button onClick={handleClose} className="flex-1">
                    View Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
