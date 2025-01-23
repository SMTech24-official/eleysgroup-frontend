"use client";
import Image from "next/image";
import doctor from "@/assets/doctor.png";
import { useState } from "react";
import { appointments } from "@/constants/appointments";
import { DateRow } from "@/components/doctor-profile/date-row";
import { Button } from "@/components/ui/button";
export default function DoctorProfile() {
  const [selectedTimes, setSelectedTimes] = useState<
    Record<string, string | null>
  >({});

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [date]: prev[date] === time ? null : time,
    }));
  };

  const hasSelectedTime = Object.values(selectedTimes).some(
    (time) => time !== null
  );
  return (
    <div className="bg-gray-50">
      <div className="container px-4 py-8 mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-5">
          {/* Left Column - Information */}
          <div className="flex-1 space-y-6 col-span-1 lg:col-span-2">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-[40px] font-semibold text-foreground">
                Dr. AHM Masud Sinha
              </h1>
              <p className="text-xl text-foreground font-medium">
                Consultant - Cardiology
              </p>
            </div>

            {/* Specialties and Qualifications Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h2 className="text-base text-foreground">Specialities</h2>
                <p className="text-lg font-medium">Cardiology</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-base text-foreground">Qualification</h2>
                <p className="text-lg font-medium">MBBS, D. Card, FACC</p>
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="space-y-2">
              <h2 className="text-base text-foreground">Consultation Fee</h2>
              <p className="text-2xl font-medium text-foreground">$1200</p>
            </div>

            {/* Description */}
            <div className="">
              <p className="text-gray-600 leading-relaxed">
                Dr. AHM Masud Sinha is a cardiologist with 34 years of
                experience. He completed his MBBS from DIP CARD from London,
                United Kingdom. Over the years, Dr. Sinha has worked in various
                hospitals. Dr. AHM Masud Sinha has worked at Euro Bangla Heart
                Hospital, National Heart Foundation, Z H Sikder Women&apos;s
                Medical College & Hospital, AMZ Hospital, and Al Sahna Center
                under King Khaled Hospital, Riyadh, Saudi Arabia. Dr. Sinha has
                received local and international training in Invasive and
                Interventional Cardiology.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="cols-span-1">
            <div className="rounded-lg bg-gray-100 w-full">
              <Image
                src={doctor}
                alt="Doctor profile photo"
                className="object-cover w-full max-h-[500px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Appointment times */}
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Appointment Time
        </h2>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <DateRow
              key={appointment.date}
              date={appointment.date}
              day={appointment.day}
              timeSlots={appointment.timeSlots}
              selectedTime={selectedTimes[appointment.date]}
              onTimeSelect={(time) => handleTimeSelect(appointment.date, time)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            disabled={!hasSelectedTime}
            onClick={() => {
              console.log(selectedTimes);
            }}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
