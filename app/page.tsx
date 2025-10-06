"use client"

import { useEffect, useState } from "react"
import SafeAppsSDK, { SafeInfo } from "@safe-global/safe-apps-sdk"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Wallet,
  Send,
  Users,
  Clock,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Settings,
  Plus,
} from "lucide-react"

// ✅ Initialize Safe SDK
const appsSdk = new SafeAppsSDK()

export default function SafeWalletApp() {
  const [safeInfo, setSafeInfo] = useState<SafeInfo | null>(null)
  const [balance, setBalance] = useState<string>("Loading...")
  const [activeTab, setActiveTab] = useState("overview")
  const [pendingTransactions, setPendingTransactions] = useState<any[]>([])
  const [recentTransactions, setRecentTransactions] = useState<any[]>([])

  // Load Safe context automatically
  useEffect(() => {
    const loadSafe = async () => {
      try {
        const safe = await appsSdk.safe.getInfo()
        setSafeInfo(safe)

        // Fetch real ETH balance
        const provider = new ethers.providers.JsonRpcProvider(safe.chainId === 1 
          ? "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
          : "https://arb-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY")
        const bal = await provider.getBalance(safe.safeAddress)
        setBalance(ethers.utils.formatEther(bal))

      } catch (err) {
        console.error("Not in Safe context or error fetching Safe info", err)
      }
    }
    loadSafe()
  }, [])

  const handleSend = async () => {
    if (!safeInfo) return alert("Safe not connected")
    const safeTx = {
      to: safeInfo.safeAddress,
      value: "0",
      data: "0x",
    }

    await appsSdk.txs.send({ txs: [safeTx] })
    alert("Transaction sent to Safe for confirmation.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Safe Wallet</h1>
            </div>
            {safeInfo ? (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {safeInfo.chainId === 1 ? "Ethereum Mainnet" : `Chain ID: ${safeInfo.chainId}`}
              </Badge>
            ) : (
              <Badge variant="outline">Connecting...</Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {balance !== "Loading..." ? `${balance} ETH` : "Loading..."}
                    </CardTitle>
                    <CardDescription>
                      {safeInfo?.safeAddress
                        ? `${safeInfo.safeAddress.slice(0, 6)}...${safeInfo.safeAddress.slice(-4)}`
                        : "Waiting for Safe connection..."}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSend}>
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

            {/* Safe Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Threshold</p>
                    <p className="text-2xl font-bold">{safeInfo?.threshold ?? "--"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-chart-2/10 rounded-lg">
                    <Clock className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{pendingTransactions.length}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="p-2 bg-chart-5/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-chart-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Network</p>
                    <p className="text-lg font-bold">
                      {safeInfo?.chainId === 1 ? "Ethereum" : `Chain ${safeInfo?.chainId}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tabs can reuse your previous layout as-is */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Coming soon: list from Safe Transaction Service</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your Safe configuration</CardDescription>
              </CardHeader>
              <CardContent>
                {safeInfo ? (
                  <>
                    <p><strong>Address:</strong> {safeInfo.safeAddress}</p>
                    <p><strong>Threshold:</strong> {safeInfo.threshold}</p>
                    <p><strong>Owners:</strong></p>
                    <ul className="list-disc ml-6">
                      {safeInfo.owners.map((owner, idx) => (
                        <li key={idx}>{owner}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>Loading Safe info...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
