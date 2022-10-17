import { AxiosError } from "axios";
import { instance } from "./instance";
import { ResponseAccessTokenType } from "./types";

type RequestSignInArgType = {
  email: string;
  password: string;
};

export type RequestSignInErrorType = AxiosError<{
  statusCode: number;
  message: string | Array<string>;
  error?: string;
}>;

const requestSignIn = ({ email, password }: RequestSignInArgType) =>
  instance.post<ResponseAccessTokenType>(
    "/auth/signin",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export { requestSignIn };
