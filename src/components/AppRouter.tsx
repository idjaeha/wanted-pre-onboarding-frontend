import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/todo" element={<TodoPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
