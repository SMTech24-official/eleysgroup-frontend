/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "./ProgressBar";

type FormData = {
  email: string;
  phone: number;
  appointmentDate: string;
  service: string;
  provider: string;
  notes?: string;
};

export function BookingForm({
  setShowBookingForm,
  selectedslot,
}: {
  setShowBookingForm: (show: boolean) => void;
  selectedslot: any;
}) {
  const [step, setStep] = useState(1);
  console.log(selectedslot);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form data at step", step, ":", data);
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Form submitted:", data);
      // Handle form submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 mx-2 relative">
        <button
          onClick={() => {
            /* handle close */
            setShowBookingForm(false);
          }}
          className="absolute right-4 top-4"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">{step === 1 ? "Contact Info" : "Book an Appointment"}</h2>

        <ProgressBar currentStep={step} totalSteps={2} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 mx-2">
          {step === 1 ? (
            <>
              <div key={1} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="Enter phone number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <span className="text-red-500">Phone is required</span>}
              </div>

              <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-500">
                Next
              </Button>
            </>
          ) : (
            <>
              <div key={2} className="space-y-2">
                <Label htmlFor="appointmentDate">Appointment</Label>
                <Input
                  id="appointmentDate"
                  type="datetime-local"
                  {...register("appointmentDate", { required: true })}
                />
                {errors.appointmentDate && <span className="text-red-500">Appointment date is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input
                  key={3}
                  id="service"
                  type="text"
                  placeholder="Select service"
                  {...register("service", { required: true })}
                />
                {errors.service && <span className="text-red-500">Service is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  type="text"
                  placeholder="Select provider"
                  {...register("provider", { required: true })}
                />
                {errors.provider && <span className="text-red-500">Provider is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Write note" {...register("notes")} />
              </div>

              <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-500">
                Submit
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
