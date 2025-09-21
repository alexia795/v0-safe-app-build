"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Wallet,
  Send,
  Users,
  Clock,
  CheckCircle,
  ExternalLink,
  Plus,
  Settings,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  MoreHorizontal,
} from "lucide-react"

export default function SafeWalletApp() {
  const [selectedSafe, setSelectedSafe] = useState("0x9a8FEe232DCF73060Af348a1B62Cdb0a19852d13")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data based on the Safe configuration
  const safeWallets = [
    {
      address: "0x9a8FEe232DCF73060Af348a1B62Cdb0a19852d13",
      name: "Main Safe",
      balance: "12.45 ETH",
      threshold: 2,
      owners: 4,
      network: "Ethereum",
    },
    {
      address: "0x0CD875515e9bb3DC05B283A375d043fDfDea2626",
      name: "Multi-Chain Safe",
      balance: "8.32 ETH",
      threshold: 1,
      owners: 2,
      network: "Arbitrum",
    },
  ]

  const pendingTransactions = [
    {
      id: "1",
      to: "0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C",
      amount: "2.5 ETH",
      confirmations: 1,
      threshold: 2,
      type: "send",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      to: "0x123d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C",
      amount: "0.1 ETH",
      confirmations: 0,
      threshold: 2,
      type: "send",
      timestamp: "5 hours ago",
    },
  ]

  const recentTransactions = [
    {
      id: "1",
      type: "received",
      amount: "5.0 ETH",
      from: "0xabc123...",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: "2",
      type: "sent",
      amount: "1.2 ETH",
      to: "0xdef456...",
      timestamp: "2 days ago",
      status: "completed",
    },
    {
      id: "3",
      type: "sent",
      amount: "0.5 ETH",
      to: "0x789abc...",
      timestamp: "3 days ago",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Safe Wallet</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Ethereum Mainnet
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Safes</CardTitle>
                <CardDescription>Select a Safe to manage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {safeWallets.map((safe) => (
                  <div
                    key={safe.address}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedSafe === safe.address
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSafe(safe.address)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{safe.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {safe.network}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {safe.address.slice(0, 6)}...{safe.address.slice(-4)}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{safe.balance}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {safe.threshold}/{safe.owners}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Safe
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="apps">Apps</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Balance Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">12.45 ETH</CardTitle>
                        <CardDescription>≈ $23,456.78 USD</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button>
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                        <Button variant="outline">
                          <ArrowDownLeft className="h-4 w-4 mr-2" />
                          Receive
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Safe Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Threshold</p>
                          <p className="text-2xl font-bold">2 of 4</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-chart-2/10 rounded-lg">
                          <Clock className="h-6 w-6 text-chart-2" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-2xl font-bold">{pendingTransactions.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-chart-5/10 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-chart-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Network</p>
                          <p className="text-lg font-bold">Ethereum</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pending Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Transactions</CardTitle>
                    <CardDescription>Transactions awaiting confirmations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-chart-3/10 rounded-lg">
                              <ArrowUpRight className="h-4 w-4 text-chart-3" />
                            </div>
                            <div>
                              <p className="font-medium">Send {tx.amount}</p>
                              <p className="text-sm text-muted-foreground">
                                To: {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <Progress value={(tx.confirmations / tx.threshold) * 100} className="w-20 h-2" />
                              <span className="text-sm text-muted-foreground">
                                {tx.confirmations}/{tx.threshold}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-lg ${tx.type === "received" ? "bg-chart-5/10" : "bg-chart-1/10"}`}
                            >
                              {tx.type === "received" ? (
                                <ArrowDownLeft
                                  className={`h-4 w-4 ${tx.type === "received" ? "text-chart-5" : "text-chart-1"}`}
                                />
                              ) : (
                                <ArrowUpRight
                                  className={`h-4 w-4 ${tx.type === "received" ? "text-chart-5" : "text-chart-1"}`}
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {tx.type === "received" ? "Received" : "Sent"} {tx.amount}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {tx.type === "received" ? "From" : "To"}: {tx.type === "received" ? tx.from : tx.to}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-1">
                              {tx.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Transaction Queue</CardTitle>
                        <CardDescription>Manage pending transactions</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Transaction
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingTransactions.map((tx) => (
                        <Card key={tx.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar>
                                  <AvatarFallback>
                                    <Send className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Send Transaction</p>
                                  <p className="text-sm text-muted-foreground">
                                    {tx.amount} to {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {tx.confirmations}/{tx.threshold} confirmations
                                  </p>
                                  <Progress value={(tx.confirmations / tx.threshold) * 100} className="w-32 h-2 mt-1" />
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm">Confirm</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Safe Configuration</CardTitle>
                    <CardDescription>Manage your Safe settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Owners & Threshold</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>A1</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">0xAfD5...A0A0</p>
                              <p className="text-sm text-muted-foreground">Owner</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>A2</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">0xFDf8...3a24</p>
                              <p className="text-sm text-muted-foreground">Owner</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Required confirmations</p>
                          <p className="text-sm text-muted-foreground">
                            Any transaction requires the confirmation of 2 out of 4 owners
                          </p>
                        </div>
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Apps Tab */}
              <TabsContent value="apps" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Safe Apps</CardTitle>
                    <CardDescription>Connect to decentralized applications through your Safe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <Wallet className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mb-2">WalletConnect</h3>
                          <p className="text-sm text-muted-foreground">Connect to dApps with WalletConnect</p>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-chart-2/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <ExternalLink className="h-6 w-6 text-chart-2" />
                          </div>
                          <h3 className="font-medium mb-2">Transaction Builder</h3>
                          <p className="text-sm text-muted-foreground">Compose custom transactions</p>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-chart-5/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-chart-5" />
                          </div>
                          <h3 className="font-medium mb-2">Drain Safe</h3>
                          <p className="text-sm text-muted-foreground">Emergency asset recovery tool</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
