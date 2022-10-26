import { env } from "./env";

const getAccessToken = () => window.localStorage.getItem(env.access_token_name);

export { getAccessToken };
