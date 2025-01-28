"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { useCreateServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import { toast } from "sonner";

interface ServiceFormData {
  name: string;
  specialization: string;
  duration: number;
  doctorId: string;
  price: number;
}

export default function ServiceForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>();

  const { data: doctorsData, error, isLoading } = useGetAllDoctorsQuery({});
  const [createServiceFn, { isLoading: createServiceMutaitonLoading }] = useCreateServiceMutation();

  console.log(doctorsData?.data);

  const allDoctors = doctorsData?.data;

  const onSubmit = async (data: ServiceFormData) => {
    console.log(data);

    const reformedData = {
      name: data.name,
      specialization: data.specialization,
      duration: Number(data.duration),
      doctorId: data.doctorId,
      price: Number(data.price),
    };

    try {
      const response = await createServiceFn(reformedData).unwrap();
      console.log(response);
      if (response.success) {
        toast.success("Service created successfully");
        reset({
          name: "",
          specialization: "",
          duration: 0,
          doctorId: "",
          price: 0,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-lg mx-auto h-full">
      <h1 className="text-2xl font-bold text-center underline py-10">Create a new service</h1>
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

      <Button type="submit">{createServiceMutaitonLoading ? "Creating Service..." : "Create Service"}</Button>
    </form>
  );
}

// const doctors = [
//   { id: "67938452d30eaf0cd8a20d48", name: "Dr. John Doe" },
//   { id: "67938452d30eaf0cd8a20d49", name: "Dr. Jane Smith" },
//   { id: "67938452d30eaf0cd8a20d50", name: "Dr. Mike Johnson" },
// ];
