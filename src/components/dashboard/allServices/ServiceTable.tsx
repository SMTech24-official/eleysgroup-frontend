/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditServiceModal } from "./EditServiceModal";

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
              <TableCell>
                <Button onClick={() => setEditingService(service)}>Edit</Button>
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
    </div>
  );
}
