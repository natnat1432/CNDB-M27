import Swal from "sweetalert2";
import "../App.css";

// Utility function for displaying success message
export const showSuccessMessage = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

// Utility function for displaying error message
export const showErrorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      popup: "darkModalBG",
    },
  });
};

export const showSuccessAlertMessage = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    customClass: {
      popup: "darkModalBG",
    },
    timer: 1500,
  });
};
export const showErrorAlertMessage = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    customClass: {
      popup: "darkModalBG",
    },
    showConfirmButton: false,
    timer: 1500,
  });
};
export const showConfirmMessage = async (title, text, confirmText) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    showCancelButton: true,
    customClass: {
      popup: "darkModalBG",
    },
    confirmButtonColor: "#2DD4BE",
    confirmButtonText: confirmText,
  });
  return result.isConfirmed;
};
export const showSuccessToast = async (message, action) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    background: "#172028",
    color: "white",
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    willClose: (toast) => {
      if (action) {
        action();
      }
    },
  });
  Toast.fire({
    icon: "success",
    title: message,
    customClass: {
      popup: "darkModalBG",
    },
  });
};

export const showInfo = async (title, htmlContent) => {
  Swal.fire({
    title: title,
    icon: "info",
    html: htmlContent,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonColor: "#2DD4BE",
    customClass: {
      popup: "darkModalBG",
    },
  });
};

export const getInput = async (label, message, type, placeholder) => {
  if (!type) {
    type = "text";
  }
  const { value } = await Swal.fire({
    title: message,
    input: type,
    inputLabel: label,
    inputPlaceholder: placeholder,
  });
  if (value) {
    return value;
  } else {
    return "";
  }
};

export const getSelect = async (title, options, placeholder) => {
  
  const { value } = await Swal.fire({
    title: title,
    input: "select",
    inputOptions:options,
    inputPlaceholder: placeholder,
    showCancelButton:true,
  });
  if (value) {
    return options[value];
  } else {
    return "";
  }
};
