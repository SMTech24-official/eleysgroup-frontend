import baseApi from "@/redux/api/baseApi";

const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query({
      query: () => ({
        url: "/appointment",
        method: "GET",
      }),
      providesTags: ["Appointment", "Service"],
    }),
    getAppointmentById: builder.query({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "GET",
      }),
      providesTags: ["Appointment", "Service"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: "/appointment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment", "Service"],
    }),
    updateAppointment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/appointment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointment", "Service"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment", "Service"],
    }),
  }),
});

export const {
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApi;
