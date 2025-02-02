/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import calenderIcon from "@/assets/icons/calendar.svg";
import Image from "next/image";
import { BookingForm } from "./BookingForm";
import { useGetAllDoctorsQuery } from "@/redux/features/doctorApi/doctorApi";
import { useGetServiceByDoctorIdQuery } from "@/redux/features/serviceApi/serviceApi";
import { getStartOrEndTime } from "@/lib/formatDates";
import { useRouter } from "next/navigation";

const BookComponent = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { data: allDoctocs, isLoading: allDoctocsLoading } = useGetAllDoctorsQuery({});
  const [slecetedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedslot, setSelectedSlot] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const router = useRouter();

  const { data: serviceByDoctorId, isLoading: serviceByDoctorIdLoading } = useGetServiceByDoctorIdQuery(
    slecetedDoctor,
    {
      skip: !slecetedDoctor,
    }
  );

  console.log(serviceByDoctorId);

  useEffect(() => {
    if (allDoctocs?.data?.length) {
      setSelectedDoctor(allDoctocs?.data[0].id);
    }
  }, [allDoctocs?.data]);

  const handleGoToDoctorProfile = () => {
    router.push("/book-appointment/doctor-profile");
  };

  return (
    <div className="my-10">
      <div className="container">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-6">
          <div className="lg:col-span-4 flex gap-5 flex-col">
            <h2 className="text-[#636363] text-2xl font-semibold leading-[140%]">Book by Provider</h2>
            {allDoctocsLoading ? (
              <p>Loading ...</p>
            ) : (
              allDoctocs?.data?.map(
                (doctor: {
                  id: string;
                  name: string;
                  title: string;
                  specialization: string;
                  profileImage: string;
                  createdAt: string;
                  updatedAt: string;
                }) => (
                  <div key={doctor?.id} className="flex p-4 px-6 bg-white justify-between items-center self-stretch">
                    <div onClick={handleGoToDoctorProfile} className="flex gap-4 cursor-pointer">
                      <Image
                        src={doctor?.profileImage}
                        alt={`${doctor?.name} profile`}
                        className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"
                        height={48}
                        width={48}
                      />
                      <div>
                        <p className="text-[#1A1A1A] text-2xl font-medium leading-[140%]">{doctor?.name}</p>
                        <p className="text-[#3D3D3D] text-base font-normal leading-[160%]">
                          Consultant - {doctor?.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-[#636363] text-2xl font-semibold">Book by Service/Class</h2>
            <div>
              <Accordion type="single" collapsible className="w-full" onValueChange={(value) => setOpenItem(value)}>
                {serviceByDoctorIdLoading ? (
                  <p>Loading ...</p>
                ) : (
                  serviceByDoctorId?.data?.map(
                    (item: {
                      id: string;
                      name: string;
                      specialization: string;
                      duration: number;
                      price: number;
                      isAvailable: boolean;
                      doctorId: string;
                      createdAt: string;
                      updatedAt: string;
                      slots: {
                        id: string;
                        startDateTime: string;
                        endDateTime: string;
                        duration: number;
                        isBooked: boolean;
                        isAvailable: boolean;
                        serviceId: string;
                        createdAt: string;
                        updatedAt: string;
                      }[];
                    }) => {
                      const dates = item?.slots.map((slot) => new Date(slot.startDateTime));
                      // Find the minimum and maximum dates
                      const minDate = new Date(Math.min(...dates.map((date) => date.getTime())));
                      const maxDate = new Date(Math.max(...dates.map((date) => date.getTime())));

                      // Format dates as readable strings
                      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
                      const formattedDateRange = `${minDate.toLocaleDateString(
                        "en-US",
                        options
                      )} to ${maxDate.toLocaleDateString("en-US", options)}`;

                      // console.log(formattedDateRange);
                      return (
                        <AccordionItem
                          className="bg-white mt-5 p-2 rounded-md [&[data-state=open]]:bg-[#f6edf4]"
                          key={item.id}
                          value={item.id.toString()}
                        >
                          <AccordionTrigger className="no-underline hover:no-underline">
                            <div className="flex items-start justify-start flex-col">
                              <h2>{item?.name}</h2>

                              {openItem !== item.id.toString() ? (
                                <div className="flex items-center justify-center gap-5">
                                  {item?.duration} mins
                                  {item?.price && item?.price > 0 && <p>Price - ${item?.price}</p>}
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <circle cx="4" cy="4" r="4" fill="#FF9CE7" />
                                    </svg>
                                  </span>
                                  <p>Consultant - {item.specialization}</p>
                                </div>
                              ) : (
                                <div className="flex gap-4">
                                  <p>Consultant - {item.specialization}</p>
                                  <p>{<span>Price - ${item?.price}</span>}</p>
                                </div>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent
                            className={`${
                              // conditionlay background color based on the open or close state
                              openItem === item.id.toString() ? "bg-[#f6edf4]" : "bg-white"
                            }`}
                          >
                            <div>
                              <div className="flex items-center  gap-5">
                                <p className="text-[#04090D] text-lg font-medium leading-[150%]">
                                  {" "}
                                  {item?.slots.length > 0 && formattedDateRange}
                                </p>
                                {item?.slots[0]?.startDateTime && <Image src={calenderIcon} alt="calender" />}
                              </div>
                              <div>
                                <div className="flex py-3 overflow-hidden overflow-x-auto gap-2">
                                  {item?.slots.length > 0 ? (
                                    item?.slots?.map((slot: any) => (
                                      <div className="flex flex-col md:flex-row items-center gap-2 j" key={slot?.id}>
                                        <div className="flex items-center gap-1 mt-5">
                                          <button
                                            key={slot?.id}
                                            onClick={() => {
                                              setShowBookingForm(true);
                                              setSelectedSlot(slot);
                                              setServiceId(item.id);
                                            }}
                                            className={`p-4 rounded-md text-nowrap disabled:text-gray-500 ${
                                              slot.isAvailable ? "bg-[#ff9ce7] text-[#04090D]" : "bg-[#F7F7F7]"
                                            }`}
                                            disabled={!slot.isAvailable || slot.isBooked}
                                          >
                                            <span className=" text-lg font-medium ">
                                              {getStartOrEndTime(slot?.startDateTime)}
                                            </span>{" "}
                                            -{" "}
                                            <span className=" text-lg font-medium ">
                                              {getStartOrEndTime(slot?.endDateTime)}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-5 mt-5"></div>{" "}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                      {" "}
                                      <p className="text-[#04090D] text-lg font-medium leading-[150%]">
                                        No slots available{" "}
                                      </p>{" "}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                  )
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div>
        {showBookingForm && (
          <BookingForm serviceId={serviceId} selectedslot={selectedslot} setShowBookingForm={setShowBookingForm} />
        )}
      </div>
    </div>
  );
};

export default BookComponent;
