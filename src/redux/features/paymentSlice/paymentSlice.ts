import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  method: "cash" | "full" | "partial" | null;
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
      state.method = "full";
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
