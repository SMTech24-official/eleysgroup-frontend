import baseApi from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ reformedData, id }) => ({
        url: `/service/${id}`,
        method: "PUT",
        body: reformedData,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

    // get service by doctor id
    getServiceByDoctorId: builder.query({
      query: (id) => ({
        url: `/service/doctor/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceByDoctorIdQuery,
} = serviceApi;
