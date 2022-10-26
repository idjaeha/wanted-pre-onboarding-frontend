import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList";
import { env } from "../utils/env";

const TodoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name) === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section>
      <h1>투두를 작성해봅시다!</h1>
      <TodoList />
    </section>
  );
};

export default TodoPage;
