import { useState } from "react";
import useListTables from "../../hooks/records/useListTables";
import useAddTable from "../../hooks/records/useAddTable";
import useDeleteTable from "../../hooks/records/useDeleteTable";
import { getInput, showConfirmMessage } from "../../utility/SwalAlert";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Records() {
  const [isLoading, setIsLoading] = useState(false);
  document.title = "Records";
  const {
    tables,
    isSuccess,
    isFetching,
    isError,
    tablesError,
    refetchRecords,
  } = useListTables();

  const { onSubmit } = useAddTable();
  const { onSubmit: onSubmitDelete } = useDeleteTable();

  const add = async () => {
    const record = await getInput(
      "Add Record",
      "Enter the record name",
      "text",
      "Record name"
    );
    if (record) {
      setIsLoading(true);
      await onSubmit(record, refetchRecords);
    }
    setIsLoading(false);
  };

  const deleteTableRecord = async (tableName) => {
    const isDelete = await showConfirmMessage(
      "Delete Table",
      `Are you sure you want to delete table ${tableName}`,
      "Yes, delete it"
    );
    console.log("is delete", isDelete);
    if (isDelete) {
      setIsLoading(true);
      onSubmitDelete(tableName, refetchRecords);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loading state={isLoading} />
      <button
        type="button"
        className="btn btn-outline-theme"
        onClick={() => add()}
      >
        {" "}
        <i className="fas fa-plus"></i> Add Records
      </button>
      <br />
      <br />
      {isSuccess &&
        tables &&
        tables.map((table, Index) => (
          <div key={Index}>
            <br />
            <div className="card w-50">
              <div className="card-body">
                <h1 className="page-header">{table.name}</h1>
                <p>
                  Total data: <b>{table.count}</b>
                </p>
                <br />
                <div className="row">
                  <a
                    href={`/admin/records/${table.name}`}
                    className="btn btn-outline-theme btn-lg active"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteTableRecord(table.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-arrow">
                <div className="card-arrow-top-left"></div>
                <div className="card-arrow-top-right"></div>
                <div className="card-arrow-bottom-left"></div>
                <div className="card-arrow-bottom-right"></div>
              </div>
            </div>
            <br />
          </div>
        ))}
    </>
  );
}
