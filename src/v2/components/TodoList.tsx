import React from "react";
import { useInput } from "../hooks/useInput";
import { useTodoList } from "../hooks/useTodoList";

const TodoList = () => {
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

  return (
    <>
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
    </>
  );
};

export default TodoList;
