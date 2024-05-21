import { apiSlice } from "../../api/ApiSlice";
import { apiEndpoint } from "../../utility/Enums";

export const recordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadRecord: builder.mutation({
      query: (data) => ({
        url: apiEndpoint + `/records`,
        method: "POST",
        body: data,
      }),
    }),
    getAllRecords: builder.query({
      query:(info) => apiEndpoint +  `/records?page=${info.page}&size=${info.size}&order=${info.order}&query=${info.query}`,
      keepUnusedDataFor:5,
    }),
    countAllRecords:builder.query({
      query:() => apiEndpoint +  `/records/count/all`,
      keepUnusedDataFor:5,
    })
  }),
});

export const {
    useUploadRecordMutation,
    useGetAllRecordsQuery,
    useCountAllRecordsQuery
} = recordApiSlice;