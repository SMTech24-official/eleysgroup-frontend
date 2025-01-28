"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendEmailMutation } from "@/redux/features/contactSlice/contactApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const [sendEmailFn, { isLoading }] = useSendEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  interface FormData {
    name: string;
    email: string;
    country: string;
    address: string;
    phone: string;
    message: string;
  }

  const onSubmit = async (data: FormData) => {
    // console.log(data);

    try {
      const response = await sendEmailFn(data).unwrap();

      if (response.success) {
        toast.success(response.message);
        // Clear the form
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      // console.log(error);
    }
  };

  return (
    <div className="container">
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
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">Email</label>
                <Input
                  placeholder="alma.lawson@example.com"
                  className="bg-transparent border placeholder:text-[#98A2B3] border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("email", { required: "Email or Phone is required" })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-600 text-base font-normal leading-[160%] tracking-[0.32px]">
                  Phone Number
                </label>
                <Input
                  placeholder="Enter your Phone Number"
                  className="bg-transparent placeholder:text-[#98A2B3] border border-gray-800 rounded-lg h-12 focus:ring-1 focus:ring-pink-500"
                  {...register("phone", { required: "Phone Number is required" })}
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
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
            {/* Phone number */}

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
              {isLoading ? "Submitting..." : "Submit Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
