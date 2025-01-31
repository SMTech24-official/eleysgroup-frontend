"use client";

import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>

      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="p-2 border rounded-md">
          <CardNumberElement id="card-number" className="w-full" options={{ style: tailwindStyle }} />
        </div>
      </div>

      {/* Expiry Date, CVC, and Zip Code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
            Expiration date
          </label>
          <div className="p-2 border rounded-md">
            <CardExpiryElement id="card-expiry" className="w-full" options={{ style: tailwindStyle }} />
          </div>
        </div>
        <div>
          <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">
            Security code (CVC)
          </label>
          <div className="p-2 border rounded-md">
            <CardCvcElement id="card-cvc" className="w-full" options={{ style: tailwindStyle }} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-500 disabled:bg-orange-400 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        {loading ? "Saving..." : "Save Card"}
        {/* Save Card */}
      </button>

      {error && (
        <div className="text-red-500 text-sm text-center">
          <p>{error}</p>
        </div>
      )}
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
    color: "#fa755a",
  },
};
