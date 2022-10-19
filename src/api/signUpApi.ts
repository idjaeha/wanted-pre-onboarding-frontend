import { AxiosError } from "axios";
import { instance } from "./instance";
import { ResponseAccessTokenType } from "./types";

export type SignUpApiArgType = {
  email: string;
  password: string;
};

export type SignUpApiErrorType = AxiosError<{
  statusCode: number;
  message: string | Array<string>;
  error: string;
}>;

const signUpApi = ({ email, password }: SignUpApiArgType) =>
  instance.post<ResponseAccessTokenType>(
    "/auth/signup",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export { signUpApi };
