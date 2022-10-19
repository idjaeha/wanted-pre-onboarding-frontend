import { AxiosError } from "axios";
import { instance } from "./instance";
import { ResponseAccessTokenType } from "./types";

type SignInApiArgType = {
  email: string;
  password: string;
};

export type SignInApiErrorType = AxiosError<{
  statusCode: number;
  message: string | Array<string>;
  error?: string;
}>;

const signInApi = ({ email, password }: SignInApiArgType) =>
  instance.post<ResponseAccessTokenType>(
    "/auth/signin",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export { signInApi };
