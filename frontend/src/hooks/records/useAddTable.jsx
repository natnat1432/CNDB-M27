import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/AuthSlice";
import { useAddTableMutation } from "../../features/records/RecordsApiSlice";
import { useSelector } from "react-redux";
import {
  showSuccessToast,
  showErrorMessage,
  showSuccessMessage,
} from "../../utility/SwalAlert";
import { getErrorMessage } from "../../utility/Utils";

export default function useAddTable() {
  const currentUser = useSelector(selectCurrentUser);

  const [addTable, { isLoading }] = useAddTableMutation();

  const onSubmit = async (name, refetchRecords) => {
    console.log(name);

    const { data, error } = await addTable({
      name: name,
      creatorID: currentUser.id,
    });

    if (data) {
      showSuccessMessage(data.message);
      refetchRecords();
    } else {
      showErrorMessage(getErrorMessage(error.data) ?? "Error creating table");
    }
  };
  return {
    onSubmit,
  };
}
