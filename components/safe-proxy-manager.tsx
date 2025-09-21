"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Shield, Code, ExternalLink, Copy, AlertCircle, CheckCircle, Zap } from "lucide-react"

export function SafeProxyManager() {
  const [proxyAddress, setProxyAddress] = useState("0x9a8FEe232DCF73060Af348a1B62Cdb0a19852d13")
  const [implementationAddress, setImplementationAddress] = useState("0x41675C099F32341bf84BFc5382aF534df5C7461a")

  const modules = [
    {
      name: "Social Recovery Module",
      address: "0x29fcB43b46531BcA003ddC8FCB67FFE91900C762",
      status: "active",
      description: "Allows recovery of the Safe through social consensus",
    },
    {
      name: "Spending Limit Module",
      address: "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134",
      status: "inactive",
      description: "Set daily spending limits for specific tokens",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Proxy Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Safe Proxy Configuration</span>
          </CardTitle>
          <CardDescription>Manage your Safe's proxy contract and implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Proxy Address</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input value={proxyAddress} readOnly className="font-mono text-sm" />
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Implementation</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input value={implementationAddress} readOnly className="font-mono text-sm" />
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-chart-5/10 border border-chart-5/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-chart-5" />
            <div>
              <p className="font-medium text-chart-5">Safe v1.4.1</p>
              <p className="text-sm text-muted-foreground">Your Safe is running the latest stable version</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Safe Modules</span>
          </CardTitle>
          <CardDescription>Extend your Safe's functionality with modules</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="installed" className="space-y-4">
            <TabsList>
              <TabsTrigger value="installed">Installed</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="installed" className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${module.status === "active" ? "bg-chart-5/10" : "bg-muted"}`}>
                      <Zap
                        className={`h-4 w-4 ${module.status === "active" ? "text-chart-5" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{module.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={module.status === "active" ? "default" : "secondary"}
                      className={module.status === "active" ? "bg-chart-5 text-white" : ""}
                    >
                      {module.status}
                    </Badge>
                    <Button size="sm" variant={module.status === "active" ? "destructive" : "default"}>
                      {module.status === "active" ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Browse the Safe App Store to discover new modules</p>
                <Button className="mt-4">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open App Store
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Payable Functions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Payable Functions</span>
          </CardTitle>
          <CardDescription>Configure payable contract interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-chart-3/10 border border-chart-3/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-chart-3 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-chart-3">Gas Optimization</p>
              <p className="text-muted-foreground mt-1">
                Your Safe supports efficient batch transactions and gas optimization for payable functions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Batch Transactions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Execute multiple payable calls in a single transaction
              </p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Configure Batching
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Gas Station</h4>
              <p className="text-sm text-muted-foreground mb-3">Optimize gas usage for contract interactions</p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Manage Gas Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
