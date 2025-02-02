"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { FormData } from "@/types/user.type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PaymentType } from "@/types/paymentTypes";

interface PersonalInformationFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PersonalInformationForm({ formData, setFormData }: PersonalInformationFormProps) {
  // get payment option form redux

  const payment = useSelector((state: RootState) => state.payment.method);
  console.log(payment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  const paymentMethodFromRedux = useSelector((state: RootState) => state.payment.method);

  return (
    <Card className="w-full max-w-2xl mx-auto border border-[#c7c2d7] bg-transparent">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Smith" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" className="min-h-[100px]" value={formData.address} onChange={handleChange} />
          </div>

          {payment === PaymentType.PARTIAL && (
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={formData.price ?? ""} onChange={handleChange} />
            </div>
          )}

          {paymentMethodFromRedux === PaymentType.CASH && (
            <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-500">
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
