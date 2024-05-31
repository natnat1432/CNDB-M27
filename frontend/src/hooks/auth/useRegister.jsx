import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentToken,
  setCredentials,
} from "../../features/auth/AuthSlice";

import { useRegisterMutation } from "../../features/auth/AuthApiSlice";
import { useSelector } from "react-redux";
import { showSuccessToast, showErrorMessage, showSuccessMessage } from "../../utility/SwalAlert";
import { useForm } from "react-hook-form";

import { getErrorMessage } from "../../utility/Utils";

export default function useRegister() {
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [signup, { isLoading }] = useRegisterMutation();

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
      confirmPassword: null,
      firstname: null,
      lastname: null,
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

  const onSubmit = async ({
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
  }) => {
    if(password !== confirmPassword)
    {
        setErrMsg("Passwords are not the same")
        return;
    }

    const { data,error } = await signup({username,password,firstname,lastname});

    if(data){
        showSuccessMessage(data.message);
        reset();
        navigate("/signin");
    }
    else{
        showErrorMessage(getErrorMessage(error.data) ?? "Error registering account. Please try again later");
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
    isLoading
  };
}
