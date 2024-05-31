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
    addTable: builder.mutation({
      query: (data) => ({
        url: apiEndpoint + `/records/tables/`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTable: builder.mutation({
      query: (name) => ({
        url: apiEndpoint + `/records/tables/${name}`,
        method: "DELETE",
      }),
    }),
    getAllRecords: builder.query({
      query:(info) => apiEndpoint +  `/records?page=${info.page}&size=${info.size}&order=${info.order}&query=${info.query}&table=${info.table}`,
      keepUnusedDataFor:5,
    }),
    countAllRecords:builder.query({
      query:() => apiEndpoint +  `/records/count/all`,
      keepUnusedDataFor:5,
    }),
    listAllTables:builder.query({
      query:() => apiEndpoint +  `/records/tables/all`,
      keepUnusedDataFor:5,
    })
  }),
});

export const {
    useUploadRecordMutation,
    useAddTableMutation,
    useDeleteTableMutation,
    useGetAllRecordsQuery,
    useCountAllRecordsQuery,
    useListAllTablesQuery,
} = recordApiSlice;