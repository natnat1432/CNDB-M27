import { useState, useCallback } from "react";
import {
  showConfirmMessage,
  showErrorMessage,
  showSuccessMessage,
  showSuccessToast,
} from "../../utility/SwalAlert";
import { useUploadRecordMutation } from "../../features/records/RecordsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/AuthSlice";
import Swal from "sweetalert2";
import "../../App.css";
const useCSVUpload = () => {
  const [header, setHeader] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const [uploadRecord] = useUploadRecordMutation();
  const extractCSVHeader = useCallback(async (file) => {
    try {
      const fileSizeLimit = 1024 * 1024; // 1 MB (adjust as needed)
      const reader = new FileReader();

      const promise = new Promise((resolve, reject) => {
        reader.onload = (event) => {
          const contents = event.target.result;
          const lines = contents.split(/\r\n|\n/);
          if (lines.length < 1) {
            reject(new Error("CSV file is empty"));
            return;
          }

          const headers = lines[0].split(",");

          resolve(headers);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        // Read only the first part of the file (up to fileSizeLimit bytes)
        const blob = file.slice(0, fileSizeLimit);
        reader.readAsText(blob);
      });

      const headers = await promise;
      const { value: accept } = await Swal.fire({
        title: "Select fields to include",
        customClass: {
          popup: "darkModalBG",
        },
        html: `
          <div>
          ${
            headers
              .map(
                (each, index) =>
                  `
              <div class="form-switch" style="text-align:left;">
              <input type="checkbox" class="form-check-input" id="${each}_switch" value="${each}">
              <label class="form-check-label" for="${each}_switch" style="text-align:left; margin-left:10px">${each}</label>
            </div>
              `
              )
              .join("") // Join array elements into a single string
          }
          </div>
        `,
        confirmButtonText: `
          Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        preConfirm: () => {
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );
          const selected = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

          if (selected.length === 0) {
            Swal.showValidationMessage("You need to select at least one field");
          }

          return selected;
        },
      });

      if (accept) {
        const isUpload = await showConfirmMessage(
          "Confirm Upload",
          `Are you sure you to upload these records with the selected fields ${accept.join(
            ", "
          )}?`,
          "Yes"
        );
        if (isUpload) {
          async function action() {
            setIsLoading(true);
            await uploadCSV(file, accept);
          }
          showSuccessToast("Starting to upload", action);
        }
      }

      setHeader(headers);
      setError(null);
    } catch (error) {
      setError(error);
      setHeader(null);
    }
  }, []);

  const uploadCSV = async (file, fields) => {
    let formData = new FormData();

    formData.append("acceptedFields", fields);
    formData.append("createdBy", currentUser.id);
    formData.append("file", file);

    try {
      const { data, error } = await uploadRecord(formData);
      if (data) {
        setIsLoading(false);
        showSuccessMessage(data?.message);
      } else {
        setIsLoading(false);
        showErrorMessage(err.message || "Failed to upload record");
      }
    } catch (err) {
      setIsLoading(false);
      showErrorMessage(err.message || "Failed to upload record");
    }
  };

  return { header, error, isLoading, extractCSVHeader };
};

export default useCSVUpload;
