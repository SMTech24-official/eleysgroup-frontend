/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditServiceModal } from "./EditServiceModal";
import { useDeleteServiceMutation } from "@/redux/features/serviceApi/serviceApi";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  specialization: string;
  duration: number;
  price: number;
  isAvailable: boolean;
}

interface ServiceTableProps {
  services: any;
  onUpdateService: any;
}

export function ServiceTable({ services, onUpdateService }: ServiceTableProps) {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  const [deleteFn, { isLoading }] = useDeleteServiceMutation();

  const handleDeleteService = async () => {
    // delete the service

    try {
      const result = await deleteFn(deletingService?.id).unwrap();
      if (result.success) {
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
    setDeletingService(null);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Duration (min)</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service: any) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.specialization}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>{service.isAvailable ? "Yes" : "No"}</TableCell>
              <TableCell className="flex gap-4">
                <Button onClick={() => setEditingService(service)}>Edit</Button>
                {/* delete button */}
                <Button
                  onClick={() => {
                    setDeletingService(service);
                  }}
                  variant={"destructive"}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingService && (
        <EditServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onUpdate={(updatedService) => {
            onUpdateService(updatedService);
            setEditingService(null);
          }}
        />
      )}

      {/* confirmation modal */}

      {deletingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg flex flex-col  gap-4">
            <h2>Are you sure you want to delete this service?</h2>
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  handleDeleteService();
                }}
                variant={"destructive"}
              >
                {
                  /* show loading indicator */
                  isLoading ? "Deleting..." : "Yes"
                }
              </Button>
              <Button
                onClick={() => {
                  // delete the service
                  setDeletingService(null);
                }}
                variant={"outline"}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
