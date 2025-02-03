/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllSlotsQuery } from "@/redux/features/slots/slotsApi";
import type React from "react";
import { useEffect, useState } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";

const AllSlots = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    startDate: "",
    endDate: "",
  });

  const {
    data: slotsData,
    isLoading,
    isError,
  } = useGetAllSlotsQuery({
    page: params.page,
    limit: params.limit,
    startDate: params.startDate,
    endDate: params.endDate,
  });

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);
    setParams((prev) => ({
      ...prev,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    }));
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-4 text-red-500 font-semibold">Something went wrong. Please try again later.</div>
    );

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prev) => ({ ...prev, limit: Number.parseInt(event.target.value, 10) }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const date = new Date(value);
    const dateStr = date.toISOString().split("T")[0];
    setParams((prev) => ({ ...prev, [name]: dateStr }));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Slots</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <label className="flex items-center space-x-2 text-gray-700">
            <span>Limit:</span>
            <select
              value={params.limit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>Start:</span>
            <input
              type="date"
              name="startDate"
              value={params.startDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>End:</span>
            <input
              type="date"
              name="endDate"
              value={params.endDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slotsData?.data?.schedules.map((schedule: any) =>
              schedule.slots.map((slot: any) => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{schedule.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{schedule.day}</td>
                  <td className="px-4 py-3 ">
                    <div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {new Date(slot.startDateTime).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    {new Date(slot.endDateTime).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{slot.duration} mins</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        slot.isBooked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {slot.isBooked ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        slot.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {slot.isAvailable ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="flex items-center justify-center gap-5">
                    {/* change availability */}
                    <button
                      className={`px-4 py-2 text-white rounded-md ${slot.isAvailable ? "bg-red-500" : "bg-green-500"}`}
                    >
                      {slot.isAvailable && !slot.isBooked ? "Disable" : "Enable"}
                    </button>
                    <MdDeleteForever className="text-red-500" size={30} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handlePageChange(params.page - 1)}
          disabled={params.page === 1}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition duration-200"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </button>
        <span className="text-gray-700">
          Page {params.page} of {slotsData?.data?.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(params.page + 1)}
          disabled={params.page === slotsData?.data?.totalPages}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition duration-200"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AllSlots;
