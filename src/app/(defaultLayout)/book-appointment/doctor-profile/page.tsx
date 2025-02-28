/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";

import { Fragment, useEffect, useState } from "react";
import { DateRow } from "@/components/doctor-profile/date-row";
import { Button } from "@/components/ui/button";
import { useGetAllSlotsQuery } from "@/redux/features/slots/slotsApi";
import { BookingForm } from "@/components/book/BookingForm";
import doctorImage from "@/assets/bigprofile.png";

export default function DoctorProfile() {
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string | null>>({});

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [todaysDate, setTodaysDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");

  const [setScheduleMaindata, setScheduleMainData] = useState<any>([]);

  const { data, isLoading } = useGetAllSlotsQuery({
    startDate: todaysDate,
    endDate: weekDay,
  });

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString();

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    const weekDay = sevenDaysLater.toISOString();

    setTodaysDate(today);
    setWeekDay(weekDay);
  }, []);

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedTimes({ [date]: time });
    setScheduleMainData(time);
  };

  const hasSelectedTime = Object.values(selectedTimes).some((time) => time !== null);

  return (
    <Fragment>
      <div className="bg-gray-50">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-5">
            <div className="flex-1 space-y-6 col-span-1 lg:col-span-2">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-[40px] font-semibold text-foreground">Dr. Magda</h1>
                <p className="text-xl text-foreground font-medium">Physiotherapist</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h2 className="text-base text-foreground">Specialities</h2>
                  <p className="text-lg font-medium">physiotherapist</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-base text-foreground">Qualification</h2>
                  <p className="text-lg font-medium">MBBS, D. Card, FACC</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-base text-foreground">Consultation Fee</h2>
                <p className="text-2xl font-medium text-foreground">$1200</p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-gray-600 leading-relaxed">
                  Hi, I’m Magda, a passionate and dedicated physiotherapist with over 10 years of experience in helping
                  people move better, feel stronger, and recover from pain or injury. With a Master’s Degree in
                  Physiotherapy, I’ve had the opportunity to work in both hospital and private practice settings,
                  supporting patients through a wide range of conditions, from chronic pain and injuries to
                  post-surgical rehabilitation.
                </p>
                <p>
                  I believe in a hands-on, evidence-based approach to treatment, combining advanced techniques like
                  electrotherapy, manual therapy, dry needling, and myofascial dry cupping and more... to create
                  personalized treatment plans. I’m always eager to learn and grow, which is why I’ve pursued
                  specialized certifications, including Oncology Scar Specialist and Manual Lymph Drainage according to
                  Dr. Vodder ect, to provide the best possible care for my patients.
                </p>
                <p>
                  Fluent in both English and Polish, I love working as part of a multi-disciplinary team, collaborating
                  with doctors, nurses, and occupational therapists to ensure a holistic and well-rounded approach to
                  treatment. More than anything, I pride myself on building strong, trusting relationships with my
                  patients—making sure they feel heard, supported, and empowered on their journey to recovery.
                </p>
                <p>
                  Now based in Swansea, I continue to expand my expertise as both a physiotherapist and a sports massage
                  therapist. Helping people improve their health, mobility, and overall well-being is what truly drives
                  me, and I’m grateful for the opportunity to make a difference every day.
                </p>
              </div>
            </div>

            <div className="cols-span-1">
              <div className="rounded-lg bg-primary/50 pt-10 mr-20 pr-10 w-[400px]  h-[600px] ">
                <Image
                  src={doctorImage}
                  alt="Doctor profile photo"
                  className="object-cover w-full h-[600px] rounded-lg"
                  // priority
                  height={1000}
                  width={1000}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full container mx-auto p-4">
          <h2 className="text-xl font-semibold mb-6 text-center">Appointment Time</h2>

          <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              data?.data?.schedules.map((schedule: any) => {
                return (
                  <DateRow
                    key={schedule.date}
                    date={schedule.date}
                    day={schedule.day}
                    selectedTime={selectedTimes[schedule.date]}
                    onTimeSelect={(time) => handleTimeSelect(schedule.date, time)}
                    slots={schedule.slots}
                  />
                );
              })
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              disabled={!hasSelectedTime}
              onClick={() => {
                // console.log(selectedTimes);
                setShowBookingForm(true);
                // console.log(setScheduleMaindata?.serviceId);
                // console.log(setScheduleMaindata?.id);
              }}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
      <div>
        {showBookingForm && (
          //    {
          //     "2025-01-26": {
          //         "id": "6794e58b40f3c87d0a22749c",
          //         "serviceId": "679384cc24076000448ac56f",
          //         "startDateTime": "2025-01-26T09:00:00.000Z",
          //         "endDateTime": "2025-01-26T09:30:00.000Z",
          //         "duration": 30,
          //         "isBooked": false,
          //         "isAvailable": true
          //     }
          // }
          <BookingForm
            serviceId={setScheduleMaindata?.serviceId}
            selectedslot={setScheduleMaindata}
            setShowBookingForm={setShowBookingForm}
          />
        )}
      </div>
    </Fragment>
  );
}
