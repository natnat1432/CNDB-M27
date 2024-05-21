import React from "react";

const ErrorStatement = ({message}) => {
  return(
    <div className="label">
    <span className="label-text  text-red-500 text-xs">
        {message}
    </span>
  </div>
  );
};

export default ErrorStatement;
