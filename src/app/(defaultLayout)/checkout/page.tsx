"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PersonalInformationForm from "@/components/checkout/PersonalInformationForm";
import StripeWrapper from "@/components/wrappers/StripeWrapper";
import { FormData } from "@/types/user.type";
import { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  return (
    <div className="flex gap-5 container my-10">
      <PersonalInformationForm formData={formData} setFormData={setFormData} />
      <StripeWrapper>
        <CheckoutForm />
      </StripeWrapper>
    </div>
  );
};

export default Checkout;
