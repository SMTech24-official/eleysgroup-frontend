/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetDoctorByIdQuery } from "@/redux/features/doctorApi/doctorApi";
import { useGetServiceByIdQuery } from "@/redux/features/serviceApi/serviceApi";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { getDate } from "@/lib/formatDates";
import { useDispatch } from "react-redux";
import { setSelectedSlot, setServiceDetails } from "@/redux/features/appointmentSlice/appointmentSlice";
import { useRouter } from "next/navigation";

type FormData = {
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
  const dispatch = useDispatch();
  const router = useRouter();

  const { data } = useGetServiceByIdQuery(serviceId, {
    skip: !serviceId,
  });

  const { data: doctorData } = useGetDoctorByIdQuery(data?.data?.doctorId, {
    skip: !data?.data?.doctorId,
  });

  console.log(data);

  // const [createAppointmentFn, { isLoading: appointMentLoading }] = useCreateAppointmentMutation();

  // console.log(doctorData);

  // console.log(selectedslot, serviceId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    // serviceId : "679384cc24076000448ac56f"

    //   {
    //     "id": "679384cc24076000448ac56f",
    //     "name": "Mental Health Counseling",
    //     "specialization": "Psychology,mental health,counseling",
    //     "duration": 50,
    //     "price": 200,
    //     "isAvailable": true,
    //     "doctorId": "67938452d30eaf0cd8a20d48",
    //     "createdAt": "2025-01-24T12:17:16.634Z",
    //     "updatedAt": "2025-01-24T12:17:16.634Z"
    // }

    dispatch(
      setSelectedSlot({
        slotId: selectedslot?.id,
        startDateTime: selectedslot?.startDateTime,
        endDateTime: selectedslot?.endDateTime,
        duration: selectedslot?.duration,
        isBooked: selectedslot?.isBooked,
        isAvailable: selectedslot?.isAvailable,
        serviceId: selectedslot?.serviceId,
        createdAt: selectedslot?.createdAt,
        updatedAt: selectedslot?.updatedAt,
        price: data?.data?.price,
      })
    );

    dispatch(
      setServiceDetails({
        serviceId: serviceId,
        service: formData.service,
        provider: formData.provider,
        notes: formData.notes || "",
      })
    );

    router.push("/select-payment");
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

        <h2 className="text-xl font-semibold mb-4">{"Book an Appointment"}</h2>

        {/* <ProgressBar currentStep={step} totalSteps={2} /> */}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 mx-2">
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
            <Button type="submit" className="w-full bg-pink-400 hover:bg-pink-500">
              Book Now
            </Button>
          </>
        </form>
      </div>
    </div>
  );
}
