"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-8">Chose your payment method</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
              <RadioGroupItem value="partial" id="partial" className="text-pink-500 border-pink-500" />
              <Label htmlFor="partial" className="flex-grow cursor-pointer">
                Partial Payment
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
              <RadioGroupItem value="full" id="full" className="text-pink-500 border-pink-500" />
              <Label htmlFor="full" className="flex-grow cursor-pointer">
                Full Payment
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
              <RadioGroupItem value="cash" id="cash" className="text-pink-500 border-pink-500" />
              <Label htmlFor="cash" className="flex-grow cursor-pointer">
                Cash Payment
              </Label>
            </div>
          </RadioGroup>

          <div className="flex justify-center">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8" disabled={!paymentMethod}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

