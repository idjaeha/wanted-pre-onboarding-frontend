import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignUp, RequestSignUpErrorType } from "../api/requestSignUp";
import { useInput } from "../hooks/useInput";
import { saveAccessToken } from "../utils/saveAccessToken";

const SignUp = () => {
  const [email, changeEmail] = useInput("");
  const [password, changePassword] = useInput("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const signUp: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const response = await requestSignUp({ email, password });
      saveAccessToken(response.data.access_token);
      navigate("/todo");
    } catch (error) {
      if (axios.isAxiosError(error) === true) {
        const requestSignUpError = error as RequestSignUpErrorType;
        const errorMessage = requestSignUpError.response?.data.message;
        if (errorMessage instanceof Array) {
          alert(errorMessage.join("\n"));
        } else {
          alert(errorMessage);
        }
      }
    }
  };

  useEffect(() => {
    setIsDisabled(!(email.includes("@") && password.length >= 8));
  }, [email, password]);

  return (
    <form onSubmit={signUp}>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={changeEmail}
      />
      <input
        id="password"
        type="password"
        minLength={8}
        required
        value={password}
        onChange={changePassword}
      />
      <button disabled={isDisabled}>회원가입</button>
    </form>
  );
};

export default SignUp;
