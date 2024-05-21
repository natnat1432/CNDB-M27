import { useCountAllRecordsQuery } from "../../features/records/RecordsApiSlice";

export default function useCountRecords() {
  const {
    data: totalRecords,
    isLoading: isTotalRecordsLoading,
    isSuccess: isTotalRecordsSuccess,
    isFetching: isTotalRecordsFetching,
    isError: isTotalRecordsError,
    error: totalRecordsError,
    refetch: refetchTotalRecords,
  } = useCountAllRecordsQuery();
  return {
    totalRecords,
    isTotalRecordsLoading,
    isTotalRecordsSuccess,
    isTotalRecordsFetching,
    refetchTotalRecords,
  };
}
