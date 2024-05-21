import { useState, useEffect } from "react";
import useCountRecords from "../../hooks/records/useCountRecords";

export default function Dashboard() {
  document.title = "Dashboard";
  const {
    totalRecords,
    isTotalRecordsLoading,
    isTotalRecordsSuccess,
    isTotalRecordsFetching,
    refetchTotalRecords,
  } = useCountRecords();
  return (
    <div>
      {isTotalRecordsSuccess && totalRecords && (
        <a href="#" className="card text-decoration-none">
          <div className="card-body d-flex align-items-center text-inverse m-5px bg-inverse bg-opacity-10">
            <div className="flex-fill">
              <div className="mb-1">Total Records Added</div>
              <h1 className="h1">{totalRecords.totalRecords}</h1>
            </div>
            <div className="opacity-5">
              <i className="fas fa-database fa-4x"></i>
            </div>
          </div>

          <div className="card-arrow">
            <div className="card-arrow-top-left"></div>
            <div className="card-arrow-top-right"></div>
            <div className="card-arrow-bottom-left"></div>
            <div className="card-arrow-bottom-right"></div>
          </div>
        </a>
      )}
    </div>
  );
}
