import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useTodoList } from "../hooks/useTodoList";
import { env } from "../utils/env";

const TodoPage = () => {
  const navigate = useNavigate();
  const {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    updateIsCompleted,
    changeEditingMode,
  } = useTodoList();
  const [todoInputValue, changeTodoInputValue, clearTodoInputValue] =
    useInput("");

  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name) === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section>
      <h1>투두를 작성해봅시다!</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createTodo(todoInputValue);
          clearTodoInputValue();
        }}
      >
        <input
          type="text"
          value={todoInputValue}
          onChange={changeTodoInputValue}
        />
        <button type="submit">추가</button>
      </form>
      <br />
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {item.isEditing === true ? (
              <>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    updateTodo(
                      item,
                      event.currentTarget[`editingTodo-${item.id}`].value
                    );
                  }}
                >
                  <input
                    id={`editingTodo-${item.id}`}
                    defaultValue={item.todo}
                  />
                  <span>
                    <button type="submit">제출</button>
                    <button
                      type="button"
                      onClick={() => changeEditingMode(item, false)}
                    >
                      취소
                    </button>
                  </span>
                </form>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => updateIsCompleted(item)}
                />
                <div>{item.todo}</div>
                <span>
                  <button onClick={() => changeEditingMode(item, true)}>
                    수정
                  </button>
                  <button onClick={() => deleteTodo(item)} type="button">
                    삭제
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoPage;
