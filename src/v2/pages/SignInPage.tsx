import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";

const SignInPage = () => {
  return (
    <section>
      <h1>로그인 페이지</h1>
      <SignIn />
      <Link to="/sign-up">회원 가입으로 이동</Link>
    </section>
  );
};

export default SignInPage;
