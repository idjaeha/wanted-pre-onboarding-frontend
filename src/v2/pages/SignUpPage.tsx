import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  return (
    <section>
      <h1>회원가입 페이지</h1>
      <SignUp />
      <Link to="/">로그인으로 이동</Link>
    </section>
  );
};

export default SignUpPage;
