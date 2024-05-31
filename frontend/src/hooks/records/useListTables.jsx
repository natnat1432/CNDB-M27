import { useState, useEffect } from "react";
import { useListAllTablesQuery } from "../../features/records/RecordsApiSlice";

export default function useListTables() {
  const {
    data: tables,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error: tablesError,
    refetch: refetchRecords,
  } = useListAllTablesQuery();

  return {
    tables,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    tablesError,
    refetchRecords,
  };
}
