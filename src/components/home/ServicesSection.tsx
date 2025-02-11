/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi/serviceApi";
import { useRouter } from "next/navigation";

export default function ServicesSection() {
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery({});
  const router = useRouter();
  // console.log(servicesData?.data);
  //   [
  //     {
  //         "id": "67ab5530b119272140faf40c",
  //         "name": "Dry cupping",
  //         "specialization": "Dry cupping",
  //         "duration": 45,
  //         "price": 40,
  //         "isAvailable": true,
  //         "doctorId": "67ab50af176179614ad2a9d0",
  //         "thumbImage": "https://nyc3.digitaloceanspaces.com/smtech-space/my-dino (1).png",
  //         "galleryImages": [
  //             {
  //                 "url": "https://nyc3.digitaloceanspaces.com/smtech-space/image2.png"
  //             },
  //             {
  //                 "url": "https://nyc3.digitaloceanspaces.com/smtech-space/image1.png"
  //             },
  //             {
  //                 "url": "https://nyc3.digitaloceanspaces.com/smtech-space/dry.png"
  //             },
  //             {
  //                 "url": "https://nyc3.digitaloceanspaces.com/smtech-space/Frame 2147224570.png"
  //             }
  //         ],
  //         "description": "Dry cupping, also known as air cupping or suction cupping, is a therapeutic technique that involves creating a vacuum within cups and placing them on specific areas of the body. By creating suction, dry cupping helps to stimulate circulation, relieve muscle tension.\nDry cupping therapy offers several benefits, including:",
  //         "serviceList": [
  //             "Promoting the skin’s blood flow",
  //             "Changing the skin’s biomechanical properties",
  //             "Increasing pain thresholds",
  //             "Improving local anaerobic (without oxygen) metabolism",
  //             "Reducing inflammation"
  //         ],
  //         "createdAt": "2025-02-11T13:48:32.129Z",
  //         "updatedAt": "2025-02-11T13:48:32.129Z",
  //         "slots": [
  //             {
  //                 "id": "67ab558db119272140faf40d",
  //                 "startDateTime": "2025-02-11T08:00:00.000Z",
  //                 "endDateTime": "2025-02-11T08:30:00.000Z",
  //                 "duration": 30,
  //                 "isBooked": false,
  //                 "isAvailable": true,
  //                 "serviceId": "67ab5530b119272140faf40c",
  //                 "createdAt": "2025-02-11T13:50:05.403Z",
  //                 "updatedAt": "2025-02-11T13:50:05.403Z"
  //             },
  //             {
  //                 "id": "67ab558db119272140faf40e",
  //                 "startDateTime": "2025-02-11T08:30:00.000Z",
  //                 "endDateTime": "2025-02-11T09:00:00.000Z",
  //                 "duration": 30,
  //                 "isBooked": false,
  //                 "isAvailable": true,
  //                 "serviceId": "67ab5530b119272140faf40c",
  //                 "createdAt": "2025-02-11T13:50:05.882Z",
  //                 "updatedAt": "2025-02-11T13:50:05.882Z"
  //             },
  //             {
  //                 "id": "67ab558eb119272140faf40f",
  //                 "startDateTime": "2025-02-11T09:00:00.000Z",
  //                 "endDateTime": "2025-02-11T09:30:00.000Z",
  //                 "duration": 30,
  //                 "isBooked": false,
  //                 "isAvailable": true,
  //                 "serviceId": "67ab5530b119272140faf40c",
  //                 "createdAt": "2025-02-11T13:50:06.361Z",
  //                 "updatedAt": "2025-02-11T13:50:06.361Z"
  //             },
  //             {
  //                 "id": "67ab558eb119272140faf410",
  //                 "startDateTime": "2025-02-11T09:30:00.000Z",
  //                 "endDateTime": "2025-02-11T10:00:00.000Z",
  //                 "duration": 30,
  //                 "isBooked": false,
  //                 "isAvailable": true,
  //                 "serviceId": "67ab5530b119272140faf40c",
  //                 "createdAt": "2025-02-11T13:50:06.840Z",
  //                 "updatedAt": "2025-02-11T13:50:06.840Z"
  //             }
  //         ]
  //     }
  // ]

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching services</div>;
  }

  return (
    <section className="w-full px-4 py-16 bg-[#FFF5F9]  ">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-primary text-xl font-semibold mb-3">Our Services</h3>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Comprehensive care tailored to your needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {servicesData?.data?.map((service: any, index: number) => (
            <div
              onClick={() => router.push(`/service-details/${service?.id}`)}
              key={index}
              className="relative h-[370px] overflow-hidden cursor-pointer"
            >
              <Image src={service.thumbImage} alt={service.name || "service name"} fill className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[10px]">
                <div className="p-4 text-white text-center w-full">
                  <h3 className="font-semibold text-xl">{service.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link className="md:hidden" href={"/book-appointment"}>
            <Button className="bg-primary hover:bg-primary/80 text-foreground px-2 py-4">Book Appointment</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
