import { getAccessToken } from "../utils/getAccessToken";
import { instance } from "./instance";

type CreateTodoArgType = {
  todo: string;
};

type CreateTodoResponseType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

const createTodoApi = ({ todo }: CreateTodoArgType) =>
  instance.post<CreateTodoResponseType>(
    "todos",
    { todo },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    }
  );

export { createTodoApi };
