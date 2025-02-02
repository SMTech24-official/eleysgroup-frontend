"use client";

import { useCreateAppointmentMutation } from "@/redux/features/appointmentSlice/appointmentApi";
import { RootState } from "@/redux/store";
import { PaymentType } from "@/types/paymentTypes";
import { FormData } from "@/types/user.type";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CheckoutForm({ formData }: { formData: FormData }) {
  // get price form redux

  const [bookAppointmentMutaionFn, { isLoading: bookAppointmentLoading }] = useCreateAppointmentMutation();

  const priceFromRedux = useSelector((state: RootState) => state.appointment.selectedSlot?.price);
  // console.log(priceFromRedux);
  const servicedatafromRedux = useSelector((state: RootState) => state.appointment.serviceDetails);
  const slotdatafromRedux = useSelector((state: RootState) => state.appointment.selectedSlot);
  const payment = useSelector((state: RootState) => state.payment.method);

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
    if (priceFromRedux === null && payment === PaymentType.FULL) {
      const formtattedData: {
        serviceId: string | undefined;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        notes: string | undefined;
        slotId: string | undefined;
        paymentType: "CASH" | "FULL" | "PARTIAL" | null;
        paymentMethodId: string;
        price?: number;
      } = {
        serviceId: servicedatafromRedux?.serviceId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address,
        notes: servicedatafromRedux?.notes,
        slotId: slotdatafromRedux?.slotId,
        paymentType: payment,
        paymentMethodId: paymentMethod.id,
      };

      // if (priceFromRedux !== null) {
      //   formtattedData.price = priceFromRedux;
      // }

      console.log(formtattedData);

      try {
        const res = await bookAppointmentMutaionFn(formtattedData).unwrap();

        if (res.success) {
          console.log(res.data);
          toast.success("Appointment created successfully");
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to create appointment");
      }
    } else {
      const formtattedData: {
        serviceId: string | undefined;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        notes: string | undefined;
        slotId: string | undefined;
        paymentType: "CASH" | "FULL" | "PARTIAL" | null;
        paymentMethodId: string;
        price?: number;
      } = {
        serviceId: servicedatafromRedux?.serviceId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address,
        notes: servicedatafromRedux?.notes,
        slotId: slotdatafromRedux?.slotId,
        paymentType: payment,
        paymentMethodId: paymentMethod.id,
        price: priceFromRedux,
      };

      console.log(formtattedData);

      try {
        const res = await bookAppointmentMutaionFn(formtattedData).unwrap();

        if (res.success) {
          console.log(res.data);
          toast.success("Appointment created successfully");
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to create appointment");
      }
    }
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
            {loading || bookAppointmentLoading ? " Loading... " : "Proceed"}
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
