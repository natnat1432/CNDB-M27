import React, { useEffect } from "react";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import { useLogin } from "../../hooks/auth/useLogin";
import Logo from "../../assets/database.svg";
export default function SignIn() {
  const {
    errRef,
    isValid,
    isDirty,
    errMsg,
    register,
    handleSubmit,
    errors,
    onSubmit,
  } = useLogin();
  document.title = "Log in";
  return (
    <div id="app" className="app app-full-height app-without-header">
      <div className="login">
        <div className="login-content">
          <form name="login_form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center">Sign In</h1>
            <div className="text-white text-opacity-50 text-center mb-4">
              Hackers are the artists who push the boundaries, revealing
              vulnerabilities and driving innovation in protection.
            </div>

            <div className="mb-3">
              <label className="form-label">
                Username <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="username"
                placeholder=""
                {...register("username")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="password"
                placeholder=""
                {...register("password")}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
            >
              Sign In
            </button>
            <div 
              className="text-center text-red "
              ref={errRef}
              >{errMsg}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
