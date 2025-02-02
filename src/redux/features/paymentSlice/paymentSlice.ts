import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  method: "CASH" | "FULL" | "PARTIAL" | null;
}

const initialState: PaymentState = {
  method: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<PaymentState["method"]>) {
      state.method = action.payload;
    },
    removePaymentMethod(state) {
      state.method = "FULL";
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
