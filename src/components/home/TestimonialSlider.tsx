"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import userImage from "@/assets/placeholders/user-placeholder.jpg";
import { useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

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
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="py-10 bg-gray-100 h-[650px] flex flex-col justify-center items-center relative">
      <div className="text-center mb-12">
        <h3 className="text-primary text-xl font-semibold mb-3">Our Review</h3>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          What Our Client Say
        </h2>
      </div>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="container mx-auto"
      >
        {reviews?.map((review) => (
          <SwiperSlide
            key={review.id}
            className="flex justify-center pb-16 container"
          >
            <div className="bg-white p-6 shadow-lg rounded-lg text-center w-full min-h-[300px]">
              <div className="w-20 h-20 rounded-full mx-auto mb-2">
                <Image
                  src={review?.image}
                  alt={review?.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <div className="flex justify-center text-yellow-500 my-2">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar size={20} key={i} />
                  ))}
              </div>
              <p className="text-sm text-gray-600">{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-[90px] z-50 flex items-center justify-center gap-20 mt-4">
        <button
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <GrFormPrevious size={20} className="text-primary" />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <GrFormNext size={20} className="text-primary" />
        </button>
      </div>
    </div>
  );
}
