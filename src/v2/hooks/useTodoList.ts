import { useState, useCallback, useEffect } from "react";
import { createTodoApi } from "../api/createTodoApi";
import { deleteTodoApi } from "../api/deleteTodoApi";
import { getTodosApi } from "../api/getTodosApi";
import { updateTodoApi } from "../api/updateTodoApi";
import { useInput } from "./useInput";

export type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  isEditing: boolean;
};

const useTodoList = () => {
  const [todoInputValue, changeTodoInputValue, clearTodoInputValue] =
    useInput("");

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
      alert("todo List를 가져오는것을 실패했습니다.");
    }
  }, []);

  const createTodo = useCallback(
    async (todo: string) => {
      try {
        const response = await createTodoApi({ todo });
        if (response.status === 201) {
          await getTodos();
          clearTodoInputValue();
        }
      } catch (err) {
        alert("생성에 실패했습니다.");
      }
    },
    [clearTodoInputValue, getTodos]
  );

  const deleteTodo = useCallback(
    async (item: TodoType) => {
      try {
        const response = await deleteTodoApi({ id: item.id });
        if (response.status === 204) {
          await getTodos();
        }
      } catch (err) {
        alert("삭제에 실패했습니다.");
      }
    },
    [getTodos]
  );

  const updateTodo = useCallback(async (item: TodoType, newTodo: string) => {
    try {
      const response = await updateTodoApi({
        id: item.id,
        todo: newTodo,
        isCompleted: item.isCompleted,
      });
      if (response.status === 200) {
        setTodos((todos) =>
          todos.map((curTodo) => {
            if (curTodo.id === response.data.id) {
              curTodo.todo = response.data.todo;
            }
            return curTodo;
          })
        );
      }
    } catch (err) {
      alert("수정에 실패했습니다.");
    }
  }, []);

  const updateIsCompleted = useCallback(async (item: TodoType) => {
    try {
      const response = await updateTodoApi({
        id: item.id,
        todo: item.todo,
        isCompleted: !item.isCompleted,
      });
      if (response.status === 200) {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === item.id) {
              todo.isCompleted = response.data.isCompleted;
            }
            return todo;
          })
        );
      }
    } catch (err) {
      alert("체크 변경에 실패했습니다.");
    }
  }, []);

  const changeEditingMode = useCallback((todo: TodoType, mode: boolean) => {
    setTodos((todos) =>
      todos.map((cur) => {
        if (cur.id === todo.id) {
          cur.isEditing = mode;
        }
        return cur;
      })
    );
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return {
    todoInputValue,
    changeTodoInputValue,
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    updateIsCompleted,
    changeEditingMode,
  };
};

export { useTodoList };
