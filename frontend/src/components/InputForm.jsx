import React from "react";
import ErrorStatement from "./ErrorStatement";

export default function InputForm({
  isEdit,
  register,
  errors,
  registerName,
  required,
  label,
  defaultValue,
  errorLabel,
  placeholder,
  type,
  name,
  step,
  validator,
}) {
  return (
    <div>
      {(isEdit == null || isEdit === true) && required && (
        <ErrorStatement message="*Required" />
      )}
      <div className="relative mt-2 w-full">
        <input
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder}
          disabled={isEdit !== null && isEdit === false}
          defaultValue={defaultValue ? defaultValue : null}
          {...register(registerName, {
            required: required && required === true ? true : false,
            validator: validator ? validator : null,
          })}
          step={step && type === "number" ? step : null}
          className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
        />
        <label
          htmlFor="password"
          className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
        >
          {" "}
          {label}
        </label>
      </div>
      {errors && (
        <div className="label">
          <span className="label-text-alt text-red-500 text-sm">
            {errors[registerName] && <span>{errorLabel}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
