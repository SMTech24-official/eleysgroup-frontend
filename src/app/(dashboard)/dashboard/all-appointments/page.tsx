/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllAppointmentsQuery } from "@/redux/features/appointmentSlice/appointmentApi";
import { Calendar, Clock, Users } from "lucide-react";

export default function AllAppointments() {
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    lastName: "",
    email: "",
    firstName: "",
    paymentStatus: "",
    paymentType: "",
    sortOrder: "asc",
    limit: 10,
    page: 1,
    sortBy: "createdAt",
    phone: "",
  });

  const { data, error, isLoading } = useGetAllAppointmentsQuery(searchParams);

  const allAppointments = data?.data?.data;
  console.log(allAppointments);
  const metaData = data?.data?.meta;

  console.log(metaData);

  //   "meta": {
  //     "page": 1,
  //     "limit": 10,
  //     "total": 19
  // },

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div> Something went wrong. </div>;

  return (
    <div>
      <div className="min-h-screen bg-blue-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-blue-800">Appointment Dashboard</h1>

          {/* Add form inputs to update searchParams */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search Term"
              value={searchParams.searchTerm}
              onChange={(e) => setSearchParams({ ...searchParams, searchTerm: e.target.value })}
            />
            {/* Add other input fields similarly */}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allAppointments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Appointments</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allAppointments.filter((app: any) => app.date !== null).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Patients</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Set(allAppointments.map((app: any) => app.email)).size}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAppointments?.map((appointment: any) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.email}</TableCell>
                      <TableCell>{appointment.phone}</TableCell>
                      <TableCell>{appointment.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* {allAppointments.length > 10 && (
                <div className="mt-4 text-center">
                  <Button variant="outline">View All Appointments</Button>
                </div>
              )} */}
              {/* paination buttons */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => setSearchParams({ ...searchParams, page: searchParams.page - 1 })}
                >
                  Previous
                </Button>

                <span className="mx-4">{searchParams.page}</span>
                {/* "meta": {
            "page": 1,
            "limit": 10,
            "total": 19
        }, */}
                <Button
                  variant="outline"
                  onClick={() => setSearchParams({ ...searchParams, page: searchParams.page + 1 })}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Not scheduled";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
