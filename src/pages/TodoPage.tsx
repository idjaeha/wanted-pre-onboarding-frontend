import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useTodoList } from "../hooks/useTodoList";
import { env } from "../utils/env";

type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  isEditing: boolean;
};

const TodoPage = () => {
  const navigate = useNavigate();
  const { todos, createTodo, deleteTodo, updateTodo, changeEditingMode } =
    useTodoList();
  const [todo, changeTodo, clearTodo] = useInput("");

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, todo: string) => {
      event.preventDefault();
      createTodo(todo);
      clearTodo();
    },
    [clearTodo, createTodo]
  );

  const handleDelete = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.preventDefault();
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleUpdateIsCompleted = useCallback(
    async (index: number, item: TodoType, todos: TodoType[]) => {
      updateTodo(item.id, index, todos, item.todo, !item.isCompleted);
    },
    [updateTodo]
  );

  const handleUpdateTodo = useCallback(
    async (
      index: number,
      item: TodoType,
      todos: TodoType[],
      newTodo: string
    ) => {
      updateTodo(item.id, index, todos, newTodo, item.isCompleted);
    },
    [updateTodo]
  );

  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name) === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, todo)}>
        <input type="text" value={todo} onChange={changeTodo} />
      </form>
      <ul>
        {todos.map((item, index, todos) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => {
                handleUpdateIsCompleted(index, item, todos);
              }}
            />
            {item.isEditing === true ? (
              <div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleUpdateTodo(
                      index,
                      item,
                      todos,
                      event.currentTarget["editingTodo"].value
                    );
                  }}
                >
                  <input id="editingTodo" defaultValue={item.todo} />
                  <button type="submit">제출</button>
                  <button
                    type="button"
                    onClick={() => {
                      changeEditingMode(index, todos, false);
                    }}
                  >
                    취소
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div>{item.todo}</div>
                <button
                  onClick={() => {
                    changeEditingMode(index, todos, true);
                  }}
                >
                  수정
                </button>
              </div>
            )}
            <button
              onClick={(event) => handleDelete(event, item.id)}
              type="button"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
