"use client";

import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { useGetAllServicesQuery } from "@/redux/features/serviceApi/serviceApi";
import { useCreateSlotMutation } from "@/redux/features/slots/slotsApi";
import { toast } from "sonner";

interface FormValues {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  serviceId: string;
}

export default function SlotCreationForm() {
  // const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const { data: servicesData, isLoading: allServiceLoading, isError } = useGetAllServicesQuery({});
  const [createSlotFn, { isLoading }] = useCreateSlotMutation();
  const services = servicesData?.data;

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: {
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      startTime: "08:00",
      endTime: "10:00",
      serviceId: "",
    },
  });

  const serviceId = watch("serviceId");

  const onSubmit = async (data: FormValues) => {
    // console.log(data);

    const reformedData = {
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      serviceId: data.serviceId,
    };

    try {
      const response = await createSlotFn(reformedData).unwrap();
      // console.log(response);
      toast.success("Slot created successfully");
      if (response.success) {
        toast.success("Slot created successfully");
        reset({
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd"),
          startTime: "08:00",
          endTime: "10:00",
          serviceId: "",
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to create slot");
    }
  };

  if (allServiceLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Slot</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" {...register("startDate")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" {...register("endDate")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" {...register("startTime")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" {...register("endTime")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service</Label>
            <Select onValueChange={(value) => setValue("serviceId", value)} value={serviceId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service: { id: string; name: string }) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? "Creating Slot..." : "Create Slot"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
