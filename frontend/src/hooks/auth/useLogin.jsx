import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
  setCredentials,
} from "../../features/auth/AuthSlice";
import { useLoginMutation } from "../../features/auth/AuthApiSlice";
import { useSelector } from "react-redux";

import { showSuccessToast, showErrorMessage } from "../../utility/SwalAlert";

import { useForm } from "react-hook-form";

export const useLogin = () => {
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      username: null,
      password: null,
    },
  });

  useEffect(() => {
    errRef.current.focus();
  }, []);

  useEffect(() => {
    if (token) {
      showSuccessToast("Log in successful");
      location.href = "/dashboard";
    }
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      const {data,error} = await login({ username, password });
      function action() {
        navigate("/dashboard/");
      }
      if (data) {
        dispatch(setCredentials({ ...data }));
        reset();
        showSuccessToast("Log in successful", action);
      }
      else{
        if (error.originalStatus === 400) {
          setErrMsg("Missing Username or Password");
        } else if (error.originalStatus === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");;
        }
      }
    } catch (err) {
      console.error(err);
      setErrMsg("Log in error");
    }
  };

  return {
    errRef,
    errMsg,
    isValid,
    isDirty,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
