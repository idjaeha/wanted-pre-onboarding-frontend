import { AxiosError } from "axios";
import { instance } from "./instance";
import { ResponseAccessTokenType } from "./types";

export type RequestSignUpArgType = {
  email: string;
  password: string;
};

export type RequestSignUpErrorType = AxiosError<{
  statusCode: number;
  message: string | Array<string>;
  error: string;
}>;

const requestSignUp = ({ email, password }: RequestSignUpArgType) =>
  instance.post<ResponseAccessTokenType>(
    "/auth/signup",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export { requestSignUp };
