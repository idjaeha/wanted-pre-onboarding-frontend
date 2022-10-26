import { env } from "./env";

const saveAccessToken = (value: string) => {
  window.localStorage.setItem(env.access_token_name, value);
};

export { saveAccessToken };
