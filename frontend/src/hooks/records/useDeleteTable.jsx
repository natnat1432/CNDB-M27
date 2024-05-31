import { useDeleteTableMutation } from "../../features/records/RecordsApiSlice";
import {
  showSuccessMessage,
  showErrorMessage,
  showSuccessToast,
} from "../../utility/SwalAlert";
import { getErrorMessage } from "../../utility/Utils";

export default function useDeleteTable() {
  const [deleteTable, { isLoading }] = useDeleteTableMutation();

  const onSubmit = async (name, refetchRecords) => {
    console.log(name);
    const { data, error } = await deleteTable(name);

    if (data) {
      showSuccessMessage(data.message);
      refetchRecords();
    } else {
      showErrorMessage(getErrorMessage(error.data) ?? "Error deleting table");
    }
  };
  return {
    onSubmit,
  };
}
