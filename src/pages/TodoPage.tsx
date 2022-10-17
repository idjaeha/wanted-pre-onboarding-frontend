import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../api/createTodo";
import { deleteTodo } from "../api/deleteTodo";
import { getTodos } from "../api/getTodos";
import { updateTodo } from "../api/updateTodo";
import { useInput } from "../hooks/useInput";
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
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todo, changeTodo, clearTodo] = useInput("");

  const loadTodos = useCallback(async () => {
    try {
      const response = await getTodos();
      if (response.status === 200) {
        setTodos(
          response.data.map((value) => ({ ...value, isEditing: false }))
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, todo: string) => {
      event.preventDefault();
      try {
        const response = await createTodo({ todo });
        if (response.status === 201) {
          loadTodos();
          clearTodo();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [clearTodo, loadTodos]
  );

  const handleDelete = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.preventDefault();
      try {
        const response = await deleteTodo({ id });
        if (response.status === 204) {
          await loadTodos();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [loadTodos]
  );

  const changeEditingMode = useCallback(
    (index: number, todos: TodoType[], mode: boolean) => {
      todos[index].isEditing = mode;
      setTodos(todos.slice());
    },
    []
  );

  const handleUpdate = useCallback(
    async (
      id: number,
      index: number,
      todos: TodoType[],
      todo: string,
      isCompleted: boolean
    ) => {
      try {
        const response = await updateTodo({ id, todo, isCompleted });
        if (response.status === 200) {
          todos[index] = { ...response.data, isEditing: false };
          setTodos(todos.slice());
        }
      } catch (err) {}
    },
    []
  );

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

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
                handleUpdate(
                  item.id,
                  index,
                  todos,
                  item.todo,
                  !item.isCompleted
                );
              }}
            />
            {item.isEditing === true ? (
              <div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleUpdate(
                      item.id,
                      index,
                      todos,
                      event.currentTarget["editingTodo"].value,
                      item.isCompleted
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
