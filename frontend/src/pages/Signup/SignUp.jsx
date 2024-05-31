import React, { useEffect } from "react";
import useRegister from "../../hooks/auth/useRegister";
import { checkConfirmPassword } from "../../utility/FormValidations";
import Loading from "../../components/Loading";
export default function SignUp() {
  document.title = "Sign up";

  const {
    errRef,
    errMsg,
    isValid,
    isDirty,
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading
  } = useRegister();

  return (
    <div id="app" className="app app-full-height app-without-header">
      <Loading state={isLoading} />
      <div className="login">
        <div className="login-content">
          <form name="login_form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center">Sign Up</h1>
            <div className="text-white text-opacity-50 text-center mb-4">
              Create an account to start.
            </div>

            <div className="mb-3">
              <label className="form-label">
                Firstname <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="firstname"
                placeholder="e.g Juan"
                {...register("firstname", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Lastname <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="lastname"
                placeholder="e.g Dela Cruz"
                {...register("lastname", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Username <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="username"
                placeholder="e.g juan123"
                {...register("username", {
                  required: true,
                })}
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
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control form-control-lg bg-white bg-opacity-5"
                name="confirm_password"
                placeholder=""
                {...register("confirmPassword", {
                  required: true,
                })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
            >
              Sign Up
            </button>
            
            <div className="text-inverse text-opacity-50 text-center">
              Already have an account? <a className="nav-link" href="/">Sign In</a>
            </div>
            <div className="text-center text-red " ref={errRef}>
              {errMsg}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
