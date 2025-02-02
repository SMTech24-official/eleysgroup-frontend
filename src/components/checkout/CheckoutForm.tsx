"use client";

import { RootState } from "@/redux/store";
import { FormData } from "@/types/user.type";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutForm({ formData }: { formData: FormData }) {
  // get price form redux

  const priceFromRedux = useSelector((state: RootState) => state.appointment.selectedSlot?.price);
  console.log(priceFromRedux);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setError("Card element not found.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setError(error.message || "Payment failed.");
      setLoading(false);
      return;
    }

    console.log("Payment Method:", paymentMethod);
    // Send `paymentMethod.id` to your backend for processing
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full  mx-auto border border-[#c7c2d7] p-6 rounded-lg ">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>

      {/* show payable total pirce */}

      {priceFromRedux && (
        <div className="flex justify-between items-center pb-4">
          <p className="text-[#475467] text-[20px] font-normal leading-normal">Total Fee</p>
          <p className="text-[20px] font-normal leading-normal text-green-600 ">${priceFromRedux}</p>
        </div>
      )}

      <div className="flex flex-col justify-between h-full ">
        <div className="flex h-full flex-col gap-5">
          <div>
            <label htmlFor="card-number" className="text-[#475467] text-[20px]  font-normal leading-normal">
              Card Number
            </label>
            <div className="p-2 mt-2 border rounded-md">
              <CardNumberElement id="card-number" className="w-full" options={{ style: tailwindStyle }} />
            </div>
          </div>

          {/* Expiry Date, CVC, and Zip Code */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="card-expiry" className="text-[#475467] text-[20px] font-normal leading-normal">
                Expiration date
              </label>
              <div className="p-2 mt-2 border rounded-md">
                <CardExpiryElement id="card-expiry" className="w-full" options={{ style: tailwindStyle }} />
              </div>
            </div>
            <div>
              <label htmlFor="card-cvc" className="text-[#475467] text-[20px] font-normal leading-normal">
                Security code
              </label>
              <div className="p-2 mt-2 border rounded-md">
                <CardCvcElement id="card-cvc" className="w-full" options={{ style: tailwindStyle }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-[#ff9ce7] disabled:bg-pink-100 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            {loading ? " Loading... " : "Proceed"}
            {/* Save Card */}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

const tailwindStyle = {
  base: {
    fontSize: "16px",
    color: "#32325d",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#9e2146",
  },
};
