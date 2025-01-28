"use client";

import { ServiceTable } from "@/components/dashboard/allServices/ServiceTable";
import { useGetAllServicesQuery, useUpdateServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import React from "react";
import { toast } from "sonner";

// This is a mock function to simulate updating the service on the server

export default function ServicesPage() {
  const { data: allServices, isLoading: allServiceLoading, isError } = useGetAllServicesQuery({});
  const [updateServiceByIdFin] = useUpdateServiceMutation();
  //   console.log(allServices);

  const handleUpdateService = async (updatedService: {
    id: string;
    name: string;
    specialization: string;
    duration: number;
    price: number;
    isAvailable: boolean;
    doctorId: string;
  }) => {
    try {
      // Update the service on the server
      const { id } = updatedService;

      const reformedData = {
        name: updatedService.name,
        specialization: updatedService.specialization,
        duration: updatedService.duration,
        price: updatedService.price,
        isAvailable: updatedService.isAvailable,
        doctorId: updatedService?.doctorId,
      };
      // console.log(reformedData, id);

      // return;
      const result = await updateServiceByIdFin({ reformedData, id }).unwrap();

      if (result.success) {
        toast.success("Service updated successfully");
      } else {
        toast.error("Failed to update service");
      }

      // Update the local state
      // console.log(result);
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };
  if (allServiceLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Services</h1>
      <ServiceTable services={allServices?.data} onUpdateService={handleUpdateService} />
    </div>
  );
}
