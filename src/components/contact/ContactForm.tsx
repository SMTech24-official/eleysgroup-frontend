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
    <div className="container">
      <div className="min-h-screen text-gray-400 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-semibold text-blue-400">Get in Touch</h1>
            <p className="text-gray-500">
              We&apos;d love to hear from you! Whether you have a question about our services, pricing, or anything
              else, our team is ready to answer all your questions.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Enter Name</label>
                <Input
                  placeholder="Esther Howard"
                  className="bg-transparent border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Email/Phone</label>
                <Input
                  placeholder="alma.lawson@example.com"
                  className="bg-transparent border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("emailPhone", { required: "Email or Phone is required" })}
                />
                {errors.emailPhone && <span className="text-red-500 text-sm">{errors.emailPhone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Address</label>
                <Input
                  placeholder="Enter your Address"
                  className="bg-transparent border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("address1", { required: "Address is required" })}
                />
                {errors.address1 && <span className="text-red-500 text-sm">{errors.address1.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Country</label>
                <Input
                  placeholder="Enter your Country name"
                  className="bg-transparent border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Address</label>
              <Input
                placeholder="Enter your Address"
                className="bg-transparent border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Message</label>
              <Textarea
                placeholder="Write a message..."
                className="bg-transparent border border-gray-800 rounded-lg min-h-[150px] focus:ring-1 focus:ring-pink-500"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg h-12 transition-colors"
            >
              Submit Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
