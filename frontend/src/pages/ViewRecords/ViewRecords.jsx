import { useState } from "react";
import useRecords from "../../hooks/records/useRecords";
import Loading from "../../components/Loading";
import { formatLongDateTime } from "../../utility/Utils";
import { getErrorMessage } from "../../utility/Utils";
export default function ViewRecords() {
  document.title = "View Records";
  const {
    page,
    size,
    query,
    order,
    records,
    headers,
    tableName,
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
  } = useRecords();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    if (refetchRecords) {
      refetchRecords();
    }
  };
  return (
    <>
    <a type="button" className="btn btn-outline-theme" href="/admin/records">Go back</a>
    <br /><br />
    {
      isError && (
        <span>
        {getErrorMessage(recordsError?.data)}
        </span>
      )
    }

    { isSuccess && records && (
  <>
  <h1 className="page-header">
    Search {tableName} <small>Find any data you wish here...</small>
  </h1>
  <div className="search-result">
    <div className="search-input">
      <form name="search_form" onSubmit={handleSearch}>
        <a
          className="search-close"
          data-clear-form="#search"
          onClick={() => location.reload()}
        >
          &times;
        </a>

        <input
          type="text"
          className="form-control form-control-lg"
          id="#search"
          defaultValue={query}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
    <div className="mb-3 row">
      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
        Order
      </label>
      <div className="col-sm-2">
        <select
          className="form-select form-select-sm"
          defaultValue={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>

    <div id="" className="col-sm-12 col-md-5 fs-12px">
      {isSuccess && records && records.data.length > 0 && (
        <>
          <div
            className="dt-info"
            aria-live="polite"
            id="datatable_info"
            role="status"
          >
            Showing{" "}
            {records.data.length > 24 ? (
              <span>
                {(page + 1) * size - size + 1} to {(page + 1) * size}
              </span>
            ) : (
              <span>{records.data.length}</span>
            )}{" "}
            of{" "}
            {records.data.length > 24
              ? records.totalPages * size
              : records.data.length}{" "}
            records
          </div>
        </>
      )}
    </div>
    <Loading state={isLoading | isFetching} message="Getting records" />
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>ID</th>
            {headers.map((header, Index) => (
              <th key={Index}>{header}</th>
            ))}
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {isSuccess &&
            records &&
            records.data.map((record, Index) => (
              <tr key={Index}>
                <td>{record.id}</td>
                {headers.map((header, Index) => (
                  <td key={Index}>{record.data[header] ?? "N/A"}</td>
                ))}
                <td>{formatLongDateTime(new Date(record.createdAt))}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  <div className="text-center mt-4 mb-5">
    <div className="pagination justify-content-center">
      {isSuccess && records && (
        <>
          {page + 1 > 1 && (
            <div className=" page-item" onClick={() => previousPage()}>
              <a className="page-link">
                <span>«</span>
              </a>
            </div>
          )}

          <div className="active page-item">
            <span
              href="#"
              className="page-link"
              style={{ userSelect: "none" }}
            >
              Page {page + 1} / {records.totalPages}
            </span>
          </div>
          {page + 1 < records.totalPages && (
            <div className="page-item" onClick={() => nextPage()}>
              <a className="page-link">
                <span>»</span>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  </div>
</>
    )}
  
    </>
  );
}
