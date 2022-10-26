import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp";
import { env } from "../utils/env";

const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name)) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <section>
      <h1>회원가입 페이지</h1>
      <SignUp />
      <Link to="/">로그인으로 이동</Link>
    </section>
  );
};

export default SignUpPage;
