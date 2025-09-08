"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Send, Shield } from "lucide-react"

interface SafeTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (transaction: any) => void
}

export function SafeTransactionModal({ isOpen, onClose, onSubmit }: SafeTransactionModalProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [data, setData] = useState("")
  const [gasLimit, setGasLimit] = useState("21000")

  const handleSubmit = () => {
    const transaction = {
      to: recipient,
      value: amount,
      data: data || "0x",
      gasLimit: Number.parseInt(gasLimit),
    }
    onSubmit(transaction)
    onClose()
    // Reset form
    setRecipient("")
    setAmount("")
    setData("")
    setGasLimit("21000")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>New Transaction</span>
          </DialogTitle>
          <DialogDescription>
            Create a new transaction that will require confirmation from Safe owners
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                step="0.001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="data">Data (Optional)</Label>
              <Textarea
                id="data"
                placeholder="0x"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="mt-1"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty for simple ETH transfers</p>
            </div>

            <div>
              <Label htmlFor="gasLimit">Gas Limit</Label>
              <Input
                id="gasLimit"
                type="number"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Separator />

          {/* Transaction Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Transaction Summary</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <Badge variant="secondary">Ethereum Mainnet</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required confirmations:</span>
                <span>2 of 4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated gas:</span>
                <span>~$12.50</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start space-x-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-destructive">Important</p>
              <p className="text-muted-foreground mt-1">
                This transaction will be queued and require confirmation from other Safe owners before execution.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!recipient || !amount}>
            Create Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
