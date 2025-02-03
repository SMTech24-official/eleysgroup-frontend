/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

import { useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useGetAllReviewsQuery } from "@/redux/features/reviewSlice/reviewApi";

export default function TestimonialSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: reviews, isLoading: reviewDataLoading, isError } = useGetAllReviewsQuery({});

  if (isError) {
    return <p>Failed to load reviews</p>;
  }

  return (
    <div className="py-10 bg-gray-100 h-auto container  justify-center items-center relative">
      <div className="text-center mb-12 px-4">
        <h3 className="text-primary text-xl font-semibold mb-3">Our Review</h3>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">What Our Client Say</h2>
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
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="max-w-[100vw]"
      >
        {reviewDataLoading ? (
          <p>Loading...</p>
        ) : (
          reviews?.data?.data?.map((review: any) => (
            <SwiperSlide key={review.id} className="flex justify-center pb-20 !max-w-[100vw] container">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center w-full min-h-[250px]">
                <div className="w-20 h-20 rounded-full mx-auto mb-2">
                  <Image
                    src={review?.image}
                    alt={review?.name}
                    height={500}
                    width={500}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{review?.name}</h3>
                <div className="flex justify-center text-yellow-500 my-2">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar size={20} key={i} />
                    ))}
                </div>
                <p className="text-sm text-gray-600">{review?.message}</p>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-[90px] w-full z-50 flex items-center justify-center gap-20 mt-4">
        <button className="cursor-pointer" onClick={() => swiperRef.current?.slidePrev()}>
          <GrFormPrevious size={20} className="text-primary" />
        </button>
        <button className="cursor-pointer" onClick={() => swiperRef.current?.slideNext()}>
          <GrFormNext size={20} className="text-primary" />
        </button>
      </div>
    </div>
  );
}
