import { getAccessToken } from "../utils/getAccessToken";
import { instance } from "./instance";

type GetTodosResponseType = {
  id: number;
  todo: string;
  isCompleted: false;
  userId: number;
};

const getTodos = () =>
  instance.get<GetTodosResponseType[]>("todos", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

export { getTodos };
