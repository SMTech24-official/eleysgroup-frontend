/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "./ProgressBar";
import { useGetServiceByIdQuery } from "@/redux/features/serviceApi/serviceApi";
import { useGetDoctorByIdQuery } from "@/redux/features/doctorApi/doctorApi";
import { useCreateAppointmentMutation } from "@/redux/features/appointmentSlice/appointmentApi";
import { toast } from "sonner";
import { getDate } from "@/lib/formatDates";

type FormData = {
  email: string;
  phone: number;
  appointmentDate: string;
  service: string;
  provider: string;
  notes: string;
};

export function BookingForm({
  setShowBookingForm,
  selectedslot,
  serviceId,
}: {
  setShowBookingForm: (show: boolean) => void;
  selectedslot: any;
  serviceId: string;
}) {
  const [step, setStep] = useState(1);

  const { data } = useGetServiceByIdQuery(serviceId, {
    skip: !serviceId,
  });

  const { data: doctorData } = useGetDoctorByIdQuery(data?.data?.doctorId, {
    skip: !data?.data?.doctorId,
  });

  const [createAppointmentFn, { isLoading: appointMentLoading }] = useCreateAppointmentMutation();

  // console.log(data);

  console.log(selectedslot, serviceId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // console.log("Form data at step", step, ":", data);
    if (step === 1) {
      setStep(2);
    } else {
      //   {
      //     "serviceId": "6793852f24076000448ac570",
      //     "email": "belalhossain22000@gmail.com",
      //     "phone": "1234567890",
      //     "notes": "Patient needs follow-up",
      //     "slotId": "679487770e793d78076897b0"
      // }
      // console.log("Form submitted:", data);
      // Handle form submission

      const formattedData = {
        serviceId,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        slotId: selectedslot.id,
      };
      console.log(formattedData);
      try {
        const response = await createAppointmentFn(formattedData).unwrap();

        console.log(response);

        if (response.success) {
          toast.success("Appointment booked successfully");
          reset();
          setShowBookingForm(false);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        service: data?.data?.name,
        provider: doctorData?.data?.name,
      });
    }
  }, [data, doctorData?.data?.name, reset]);

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
              <div key={2} className="space-y-2">
                <Label htmlFor="appointmentDate">Appointment</Label>
                <div className=" text-2xl border p-1 rounded-md border-gray-200 ">
                  {getDate(selectedslot?.startDateTime)}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input
                  // key={random}
                  id="service"
                  type="text"
                  placeholder="Select service"
                  disabled={true}
                  {...register("service", { required: true })}
                />
                {errors.service && <span className="text-red-500">Service is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  key={3}
                  type="text"
                  placeholder="Select provider"
                  disabled={true}
                  {...register("provider", { required: true })}
                />
                {errors.provider && <span className="text-red-500">Provider is required</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Write note" {...register("notes")} />
              </div>
              <Button
                type="button"
                onClick={() => {
                  setStep(2);
                }}
                className="w-full bg-pink-400 hover:bg-pink-500"
              >
                Next
              </Button>
            </>
          ) : (
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
                {appointMentLoading ? "Submitting..." : "Submit"}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
