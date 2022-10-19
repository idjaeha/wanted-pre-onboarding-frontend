import { useState, useCallback, useEffect } from "react";
import { createTodoApi } from "../api/createTodoApi";
import { deleteTodoApi } from "../api/deleteTodoApi";
import { getTodosApi } from "../api/getTodosApi";
import { updateTodoApi } from "../api/updateTodoApi";

export type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  isEditing: boolean;
};

const useTodoList = () => {
  // Context API 고려하기
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = useCallback(async () => {
    try {
      const response = await getTodosApi();
      if (response.status === 200) {
        setTodos(
          response.data.map((value) => ({ ...value, isEditing: false }))
        );
      }
    } catch (err) {
      // TODO: 에러 처리하기
      console.log(err);
    }
  }, []);

  const createTodo = useCallback(
    async (todo: string) => {
      try {
        const response = await createTodoApi({ todo });
        if (response.status === 201) {
          await getTodos();
        }
      } catch (err) {
        // TODO: 에러 처리하기
        console.log(err);
      }
    },
    [getTodos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        const response = await deleteTodoApi({ id });
        if (response.status === 204) {
          await getTodos();
        }
      } catch (err) {
        // TODO: 에러 처리하기
        console.log(err);
      }
    },
    [getTodos]
  );

  const updateTodo = useCallback(
    async (
      id: number,
      index: number,
      todos: TodoType[],
      todo: string,
      isCompleted: boolean
    ) => {
      try {
        const response = await updateTodoApi({ id, todo, isCompleted });
        if (response.status === 200) {
          todos[index] = { ...response.data, isEditing: false };
          setTodos(todos.slice());
        }
      } catch (err) {
        // TODO: 에러 처리하기
      }
    },
    []
  );

  const changeEditingMode = useCallback(
    (index: number, todos: TodoType[], mode: boolean) => {
      todos[index].isEditing = mode;
      setTodos(todos.slice());
    },
    []
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return { todos, createTodo, deleteTodo, updateTodo, changeEditingMode };
};

export { useTodoList };
