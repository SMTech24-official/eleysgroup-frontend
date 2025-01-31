import CheckoutForm from "@/components/checkout/CheckoutForm";
import StripeWrapper from "@/components/wrappers/StripeWrapper";
import React from "react";

const Checkout = () => {
  return (
    <div>
      <StripeWrapper>
        <CheckoutForm />
      </StripeWrapper>
    </div>
  );
};

export default Checkout;
