"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PersonalInformationForm from "@/components/checkout/PersonalInformationForm";
import StripeWrapper from "@/components/wrappers/StripeWrapper";
import { RootState } from "@/redux/store";
import { PaymentType } from "@/types/paymentTypes";

import { FormData } from "@/types/user.type";
import { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    price: null,
  });

  const paymentMethodFromRedux = useSelector((state: RootState) => state.payment.method);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   if ((formData?.price ?? 0) > (priceFromRedux ?? 0)) {
  //     toast.message("Price can't be greater than payable amount");
  //   }
  // };

  return (
    <div className="flex gap-5 container my-10">
      <PersonalInformationForm formData={formData} setFormData={setFormData} />
      {paymentMethodFromRedux !== PaymentType.CASH && (
        <StripeWrapper>
          <CheckoutForm formData={formData} />
        </StripeWrapper>
      )}
    </div>
  );
};

export default Checkout;
