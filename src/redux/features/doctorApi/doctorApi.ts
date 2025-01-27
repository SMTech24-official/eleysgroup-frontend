import baseApi from "@/redux/api/baseApi";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: () => ({
        url: "/doctors",
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    getDoctorById: builder.query({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    createDoctor: builder.mutation({
      query: (data) => ({
        url: "/doctors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: ({ data, id }) => ({
        url: `/doctors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
