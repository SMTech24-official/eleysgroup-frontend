/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const state = getState() as RootState;

      let token = null;
      if (typeof window !== "undefined") {
        try {
          token = localStorage.getItem("accessToken");
        } catch (error) {
          console.error("Error accessing localStorage", error);
        }
      }

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Doctor", "Service", "Appointment", "Review", "Slot"],
  endpoints: (builder) => ({}),
});

export default baseApi;
