import { getAccessToken } from "../utils/getAccessToken";
import { instance } from "./instance";

type UpdateTodoArgType = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

type UpdateTodoResponseType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

const updateTodoApi = ({ id, todo, isCompleted }: UpdateTodoArgType) =>
  instance.put<UpdateTodoResponseType>(
    `todos/${id}`,
    {
      todo,
      isCompleted,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

export { updateTodoApi };
