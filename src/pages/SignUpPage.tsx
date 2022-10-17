import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  return (
    <div>
      <SignUp />
      <Link to="/">로그인으로 이동</Link>
    </div>
  );
};

export default SignUpPage;
