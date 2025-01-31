"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "@/redux/features/paymentSlice/paymentSlice";
import { useRouter } from "next/navigation";

export default function SelectPayment() {
  const [method, setMethod] = useState<"cash" | "full" | "partial">("full");
  const router = useRouter();

  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setPaymentMethod(method));
    router.push("/checkout");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg mx-auto py-16 border shadow-md shadow-pink-400/50">
        <CardContent className="flex items-center justify-center flex-col">
          <h2 className="text-2xl font-semibold text-center mb-8">Choose your payment method</h2>

          <RadioGroup
            value={method}
            onValueChange={(value: string) => setMethod(value as "cash" | "full" | "partial")}
            className="flex mb-8"
          >
            <div className="flex items-center gap-2 border rounded-lg p-4 hover:bg-gray-50 shadow-lg shadow-pink-400/40">
              <RadioGroupItem value="partial" id="partial" className="text-pink-500 border-pink-500" />
              <Label htmlFor="partial" className="flex-grow cursor-pointer">
                Partial Payment
              </Label>
            </div>

            <div className="flex items-center gap-2 border rounded-lg p-4 hover:bg-gray-50 shadow-lg shadow-pink-400/40">
              <RadioGroupItem value="full" id="full" className="text-pink-500 border-pink-500" />
              <Label htmlFor="full" className="flex-grow cursor-pointer">
                Full Payment
              </Label>
            </div>

            <div className="flex items-center gap-2 border rounded-lg p-4 hover:bg-gray-50 shadow-lg shadow-pink-400/40">
              <RadioGroupItem value="cash" id="cash" className="text-pink-500 border-pink-500" />
              <Label htmlFor="cash" className="flex-grow cursor-pointer">
                Cash Payment
              </Label>
            </div>
          </RadioGroup>

          <div className="flex justify-center">
            <Button onClick={handleNext} className="bg-pink-500 hover:bg-pink-600 text-white px-8" disabled={!method}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
