/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomLoader } from "@/components/shared/CustomLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllAppointmentsQuery } from "@/redux/features/appointmentSlice/appointmentApi";
import { Calendar, Clock, Users } from "lucide-react";
import { useState } from "react";

export default function AllAppointments() {
  const { data, error, isLoading } = useGetAllAppointmentsQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  const allAppointments = data?.data?.data;
  console.log(allAppointments);
  const metaData = data?.data?.meta;

  console.log(metaData);

  if (isLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (error) return <div> Something went wrong. </div>;

  const filteredAppointments = allAppointments?.filter((appointment: any) => {
    const query = searchQuery.toLowerCase();
    return (
      appointment.email.toLowerCase().includes(query) ||
      appointment.firstName.toLowerCase().includes(query) ||
      appointment.lastName.toLowerCase().includes(query) ||
      appointment.phone.toLowerCase().includes(query)
    );
  });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments?.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(filteredAppointments?.length / appointmentsPerPage);

  return (
    <div>
      <div className="min-h-screen bg-blue-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-blue-800">Appointment Dashboard</h1>

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
              {/* search Input field */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search appointments (email/first name/last name/ phone)"
                  className="p-2 mb-10 border border-gray-300 rounded-md w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Email</TableHead>
                    {/* first name */}
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments?.map((appointment: any) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{formatDate(appointment.date)}</TableCell>
                      <TableCell>{appointment.email}</TableCell>
                      <TableCell>{appointment.firstName}</TableCell>
                      <TableCell>{appointment.lastName}</TableCell>
                      <TableCell>{appointment.phone}</TableCell>
                      <TableCell>{appointment.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
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
