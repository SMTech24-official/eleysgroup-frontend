import baseApi from "@/redux/api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendEmailMutation } = contactApi;
