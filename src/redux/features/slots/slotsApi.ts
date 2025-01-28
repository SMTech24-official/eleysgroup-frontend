import baseApi from "@/redux/api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ page, limit, startDate, endDate }) => ({
        url: `/slot${page ? `?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Slot", "Appointment", "Service"],
    }),
    getSlotById: builder.query({
      query: (id) => ({
        url: `/slot/${id}`,
        method: "GET",
      }),
      providesTags: ["Slot", "Appointment", "Service"],
    }),
    createSlot: builder.mutation({
      query: (data) => ({
        url: "/slot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Slot", "Appointment", "Service"],
    }),
    updateSlot: builder.mutation({
      query: ({ data, id }) => ({
        url: `/slot/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Slot", "Appointment", "Service"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slot", "Appointment", "Service"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useGetSlotByIdQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
} = slotsApi;
