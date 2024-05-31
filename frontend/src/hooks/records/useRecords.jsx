import { useState, useEffect } from "react";
import { useGetAllRecordsQuery } from "../../features/records/RecordsApiSlice";
import { getErrorMessage, getTableHeaders } from "../../utility/Utils";
import { useParams } from "react-router-dom";

export default function useRecords() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(25);
  const [order, setOrder] = useState("newest");
  const [headers, setHeaders] = useState([]);
  const params = useParams();
  const [isSkipQuery, setIsSkipQuery] = useState(true);
  const table = params.table;
  const [tableName, setTableName] = useState("");

  useEffect(() => {
    if (table && isSkipQuery == true) {
      setTableName(table);
      setIsSkipQuery(false);
    }
  }, [table]);

  let info = {
    query: query,
    page: page,
    size: size,
    order: order,
    table: tableName,
  };
  const {
    data: records,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    isUninitialized,
    error: recordsError,
    refetch: refetchRecords,
  } = useGetAllRecordsQuery(info, { skip: isSkipQuery });

  useEffect(() => {
    if (records) {
      setHeaders(getTableHeaders(records.data));
    }
  }, [records]);

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
    tableName,
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
