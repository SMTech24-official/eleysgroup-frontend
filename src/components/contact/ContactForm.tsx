"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  interface FormData {
    name: string;
    emailPhone: string;
    address1: string;
    country: string;
    address?: string;
    message: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="container pt-20">
      <div className="min-h-screen text-gray-400 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-gray-800 text-center text-2xl font-semibold leading-[140%] tracking-[0.6px]">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center text-base font-normal leading-[160%] tracking-[0.32px]">
              We&apos;d love to hear from you! Whether you have a question about our services, pricing, or anything
              else, our team is ready to answer all your questions.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">
                  Enter Name
                </label>
                <Input
                  placeholder="Esther Howard"
                  className="bg-transparent border placeholder:text-[#98A2B3] border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">
                  Email/Phone
                </label>
                <Input
                  placeholder="alma.lawson@example.com"
                  className="bg-transparent border placeholder:text-[#98A2B3] border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("emailPhone", { required: "Email or Phone is required" })}
                />
                {errors.emailPhone && <span className="text-red-500 text-sm">{errors.emailPhone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">Address</label>
                <Input
                  placeholder="Enter your Address"
                  className="bg-transparent border placeholder:text-[#98A2B3] border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("address1", { required: "Address is required" })}
                />
                {errors.address1 && <span className="text-red-500 text-sm">{errors.address1.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">Country</label>
                <Input
                  placeholder="Enter your Country name"
                  className="bg-transparent border placeholder:text-[#98A2B3] border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">Address</label>
              <Input
                placeholder="Enter your Address"
                className="bg-[#ececec] placeholder:text-[#98A2B3] border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">Message</label>
              <Textarea
                placeholder="Write a message..."
                className="bg-[#ececec] border border-gray-800 rounded-lg placeholder:text-[#98A2B3] min-h-[150px] focus:ring-1 focus:ring-pink-500"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF9AE7] hover:bg-pink-400 rounded-lg h-12 transition-colors text-[#04090D] text-lg font-medium leading-[150%]"
            >
              Submit Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
