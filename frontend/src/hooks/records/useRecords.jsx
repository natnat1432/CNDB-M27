import { useState, useEffect } from "react";
import { useGetAllRecordsQuery } from "../../features/records/RecordsApiSlice";
import { getTableHeaders } from "../../utility/Utils";

export default function useRecords() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(25);
  const [order, setOrder] = useState("newest");
  const [headers,setHeaders] = useState([]);

  const info = {
    query: query,
    page: page,
    size: size,
    order: order,
  };

  

  const {
    data: records,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error: recordsError,
    refetch: refetchRecords,
  } = useGetAllRecordsQuery(info);

  useEffect(() => {
    if(records)
    {
      setHeaders(getTableHeaders(records.data))
    }
  }, [records])

  const nextPage = () => {
    if (page < records?.totalPages) {
      window.scroll({ top: 0, behavior: "smooth" });
      setPage(page + 1);
    }
  };
  const previousPage = () => {
    if (page > 0) {
      window.scroll({ top: 0, behavior: "smooth" });
      setPage(page - 1);
    }
  };

  return {
    page,
    size,
    query,
    order,
    records,
    headers,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    recordsError,
    refetchRecords,
    nextPage,
    previousPage,
    setQuery,
    setPage,
    setOrder,
  };
}
