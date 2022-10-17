import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSignIn, RequestSignInErrorType } from "../api/requestSignIn";
import { useInput } from "../hooks/useInput";
import { saveAccessToken } from "../utils/saveAccessToken";

const SignIn = () => {
  const [email, changeEmail] = useInput("");
  const [password, changePassword] = useInput("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const signIn: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const response = await requestSignIn({ email, password });
      saveAccessToken(response.data.access_token);
      navigate("/todo");
    } catch (error) {
      if (axios.isAxiosError(error) === true) {
        const requestSignInError = error as RequestSignInErrorType;
        const statusCode = requestSignInError.response?.data.statusCode;
        if (statusCode === 401) {
          alert("비밀번호를 확인해주세요.");
        } else if (statusCode === 404) {
          alert("등록되지 않은 이메일입니다.");
        } else {
          alert(requestSignInError.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    setIsDisabled(!(email.includes("@") && password.length >= 8));
  }, [email, password]);

  return (
    <form onSubmit={signIn}>
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
      <button disabled={isDisabled}>로그인</button>
    </form>
  );
};

export default SignIn;
