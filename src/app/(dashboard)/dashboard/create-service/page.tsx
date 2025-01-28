"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { useEffect } from "react";

interface ServiceFormData {
  name: string;
  specialization: string;
  duration: number;
  doctorId: string;
  price: number;
  isAvailable: boolean;
}

export default function ServiceForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>();

  const { data: doctorsData, error, isLoading } = useGetAllDoctorsQuery({});

  console.log(doctorsData?.data);

  const allDoctors = doctorsData?.data;
  //   [
  //     {
  //         "id": "67938452d30eaf0cd8a20d48",
  //         "name": "Dr. John Doe",
  //         "title": "MD",
  //         "specialization": "Cardiologist",
  //         "profileImage": "https://nyc3.digitaloceanspaces.com/smtech-space/01 (1).jpg",
  //         "createdAt": "2025-01-24T12:15:13.888Z",
  //         "updatedAt": "2025-01-24T12:15:13.888Z"
  //     }
  // ]

  //   useEffect(() => {
  //     // default value for doctorId
  //     reset({ doctorId: allDoctors[0].id });
  //   }, []);

  const onSubmit = (data: ServiceFormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Service name is required" }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="specialization">Specialization</Label>
        <Controller
          name="specialization"
          control={control}
          rules={{ required: "Specialization is required" }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}
      </div>

      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Controller
          name="duration"
          control={control}
          rules={{ required: "Duration is required", min: 1 }}
          render={({ field }) => <Input type="number" {...field} />}
        />
        {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
      </div>

      <div>
        <Label htmlFor="doctorId">Doctor</Label>
        <Controller
          name="doctorId"
          control={control}
          rules={{ required: "Doctor selection is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {allDoctors?.map((doctor: { id: string; name: string }) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.doctorId && <p className="text-red-500">{errors.doctorId.message}</p>}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required", min: 0 }}
          render={({ field }) => <Input type="number" step="0.01" {...field} />}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isAvailable"
          control={control}
          render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
        />
        <Label htmlFor="isAvailable">Is Available</Label>
      </div>

      <Button type="submit">Create Service</Button>
    </form>
  );
}

// const doctors = [
//   { id: "67938452d30eaf0cd8a20d48", name: "Dr. John Doe" },
//   { id: "67938452d30eaf0cd8a20d49", name: "Dr. Jane Smith" },
//   { id: "67938452d30eaf0cd8a20d50", name: "Dr. Mike Johnson" },
// ];
