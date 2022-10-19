import { getAccessToken } from "../utils/getAccessToken";
import { instance } from "./instance";

type DeleteTodoArgType = {
  id: number;
};

type DeleteTodoResponseType = {};

const deleteTodoApi = ({ id }: DeleteTodoArgType) =>
  instance.delete<DeleteTodoResponseType>(`todos/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

export { deleteTodoApi };
