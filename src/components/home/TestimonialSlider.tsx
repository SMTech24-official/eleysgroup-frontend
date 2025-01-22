"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import userImage from "@/assets/placeholders/user-placeholder.jpg";

const reviews = [
  {
    id: 1,
    name: "Audrey Stevenson",
    image: userImage,
    rating: 5,
    review:
      "Thank you for choosing for your recent trip. We're committed to providing an exceptional experience for every client, essential in helping us improve.",
  },
  {
    id: 2,
    name: "John Doe",
    image: userImage,
    rating: 5,
    review:
      "Thank you for your trust in us. We are glad to exceed your expectations and ensure a delightful experience.",
  },
  {
    id: 3,
    name: "Jane Smith",
    image: userImage,
    rating: 5,
    review:
      "Your satisfaction motivates us to do better. Thank you for your kind words and support!",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="py-10 bg-gray-100 h-[650px] flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h3 className="text-primary text-xl font-semibold mb-3">Our Review</h3>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          What Our Client Say
        </h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="container mx-auto"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center">
            <div className="bg-white p-6 shadow-lg rounded-lg text-center w-full max-w-[300px] min-h-[300px]">
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src={review?.image}
                  alt={review?.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <div className="flex justify-center text-yellow-500 my-2">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <p className="text-sm text-gray-600">{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
