"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Wallet,
  Plus,
  Minus,
  CreditCard,
  Building2,
  Smartphone,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Sample wallet data
const walletData = {
  balance: 1250.5,
  pendingEscrow: 350.0,
  lifetimeGranted: 5600.0,
  lifetimeReceived: 2100.0,
  currency: "USD",
}

// Sample transactions
const transactions = [
  {
    id: "1",
    type: "grant_sent",
    amount: -100,
    currency: "USD",
    description: 'Grant to "School Fees for Final Semester"',
    recipient: "Adaora Okafor",
    status: "completed",
    date: "2024-01-10",
    time: "2:30 PM",
  },
  {
    id: "2",
    type: "grant_received",
    amount: 50,
    currency: "USD",
    description: 'Grant received for "Laptop for Design"',
    sender: "Sarah Johnson",
    status: "completed",
    date: "2024-01-09",
    time: "11:15 AM",
  },
  {
    id: "3",
    type: "deposit",
    amount: 200,
    currency: "USD",
    description: "Wallet top-up via Credit Card",
    status: "completed",
    date: "2024-01-08",
    time: "9:45 AM",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: -150,
    currency: "USD",
    description: "Withdrawal to Bank Account",
    status: "pending",
    date: "2024-01-07",
    time: "4:20 PM",
  },
  {
    id: "5",
    type: "refund",
    amount: 25,
    currency: "USD",
    description: "Refund from cancelled wish",
    status: "completed",
    date: "2024-01-06",
    time: "1:10 PM",
  },
]

const transactionIcons = {
  grant_sent: ArrowUpRight,
  grant_received: ArrowDownLeft,
  deposit: Plus,
  withdrawal: Minus,
  refund: ArrowDownLeft,
}

const statusConfig = {
  completed: { label: "Completed", color: "bg-secondary text-secondary-foreground", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-accent text-accent-foreground", icon: Clock },
  failed: { label: "Failed", color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
}

export function DashboardWallet() {
  const [addFundsOpen, setAddFundsOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [addAmount, setAddAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleAddFunds = () => {
    // Handle add funds logic
    console.log("Adding funds:", addAmount, paymentMethod)
    setAddFundsOpen(false)
    setAddAmount("")
    setPaymentMethod("")
  }

  const handleWithdraw = () => {
    // Handle withdrawal logic
    console.log("Withdrawing:", withdrawAmount)
    setWithdrawOpen(false)
    setWithdrawAmount("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Escrow</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.pendingEscrow.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Pending delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Granted</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.lifetimeGranted.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.lifetimeReceived.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime total</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Funds to Wallet</DialogTitle>
              <DialogDescription>Add money to your wallet to support wishes and dreams</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-amount">Amount</Label>
                <Input
                  id="add-amount"
                  type="number"
                  placeholder="0.00"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="bank">
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        Bank Transfer
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile">
                      <div className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Mobile Money
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddFunds} className="w-full" disabled={!addAmount || !paymentMethod}>
                Add ${addAmount || "0.00"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Minus className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>Withdraw money from your wallet to your bank account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm">
                  <strong>Available for withdrawal:</strong> ${walletData.balance.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.00"
                  max={walletData.balance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>

              <Button
                onClick={handleWithdraw}
                className="w-full"
                disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) > walletData.balance}
              >
                Withdraw ${withdrawAmount || "0.00"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="grants">Grants</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const Icon = transactionIcons[transaction.type as keyof typeof transactionIcons]
                  const StatusIcon = statusConfig[transaction.status as keyof typeof statusConfig].icon

                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.amount > 0 ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {transaction.date} at {transaction.time}
                            </span>
                            {(transaction.recipient || transaction.sender) && (
                              <>
                                <span>•</span>
                                <span>{transaction.recipient || transaction.sender}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-lg font-semibold ${
                            transaction.amount > 0 ? "text-secondary" : "text-foreground"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <Badge className={statusConfig[transaction.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[transaction.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
