import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import useCSVHeaderReader from "../../hooks/csv/useCSVUpload";
import useListTables from "../../hooks/records/useListTables";
import Loading from "../../components/Loading";

const UploadComponent = () => {
  const { isLoading, extractCSVHeader } = useCSVHeaderReader();
  const [existingTables, setExistingTables] = useState([]);
  const {
    tables
  } = useListTables();

  useEffect(() => {
    if(tables)
    {
      let t = [];
      tables.map((table) => t.push(table.name));
      setExistingTables(t);
    }
  }, [tables])

  const onDrop = useCallback(async (acceptedFile) => {
    try {
      await extractCSVHeader(acceptedFile[0],existingTables);
    } catch (error) {
      console.error("Error reading CSV file: ", error);
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  document.title = "Upload Record";


  return (
    <>
      <Loading state={isLoading} message="Uploading" />
      <div className="card">
        <div className="card-header fw-bold large">
          UPLOAD RECORDS FILE <b>(.CSV)</b>
        </div>
        <div className="card-body" {...getRootProps()}>
          <input {...getInputProps()} accept=".csv" />
          {isDragActive ? (
            <div>
              <center>
                <i className="fas fa-upload"></i>
                <p
                  className="card-title"
                  style={{ userSelect: "none", cursor: "pointer" }}
                >
                  Drop the files here...
                </p>
              </center>
            </div>
          ) : (
            <div>
              <center>
                <i className="fas fa-upload"></i>
                <p
                  className="card-title"
                  style={{ userSelect: "none", cursor: "pointer" }}
                >
                  Drag 'n' drop some files here, or click to select files
                </p>
              </center>
            </div>
          )}
        </div>

        {/* <!-- arrow --> */}
        <div className="card-arrow">
          <div className="card-arrow-top-left"></div>
          <div className="card-arrow-top-right"></div>
          <div className="card-arrow-bottom-left"></div>
          <div className="card-arrow-bottom-right"></div>
        </div>
      </div>
    </>
  );
};

export default UploadComponent;
