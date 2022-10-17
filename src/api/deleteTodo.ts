import { getAccessToken } from "../utils/getAccessToken";
import { instance } from "./instance";

type DeleteTodoArgType = {
  id: number;
};

type DeleteTodoResponseType = {};

const deleteTodo = ({ id }: DeleteTodoArgType) =>
  instance.delete<DeleteTodoResponseType>(`todos/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

export { deleteTodo };
