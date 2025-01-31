import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import baseApi from "../api/baseApi";
import authReducer from "@/redux/features/authSlice/authSlice";
import appointmentReducer from "@/redux/features/appointmentSlice/appointmentSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const appointmentPersistConfig = {
  key: "appointment",
  storage,
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  appointment: persistReducer(appointmentPersistConfig, appointmentReducer),
});

export default rootReducer;
