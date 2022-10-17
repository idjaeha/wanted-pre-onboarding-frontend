import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import { env } from "../utils/env";

const SignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name)) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <div>
      <SignIn />
      <Link to="/sign-up">회원 가입으로 이동</Link>
    </div>
  );
};

export default SignInPage;
