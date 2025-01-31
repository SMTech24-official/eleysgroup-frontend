import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Slot {
  slotId: string;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  isBooked: boolean;
  isAvailable: boolean;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  serviceId: string;
  service: string;
  provider: string;
  notes: string;
}

interface AppointmentState {
  selectedSlot: Slot | null;
  serviceDetails: Service | null;
}

const initialState: AppointmentState = {
  selectedSlot: null,
  serviceDetails: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setSelectedSlot(state, action: PayloadAction<Slot>) {
      state.selectedSlot = action.payload;
    },
    setServiceDetails(state, action: PayloadAction<Service>) {
      state.serviceDetails = action.payload;
    },
    clearAppointment(state) {
      state.selectedSlot = null;
      state.serviceDetails = null;
    },
  },
});

export const { setSelectedSlot, setServiceDetails, clearAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;