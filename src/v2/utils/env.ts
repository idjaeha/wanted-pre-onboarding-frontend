const env = {
  access_token_name: process.env.REACT_APP_ACCESS_TOKEN_NAME ?? "",
  todo_server_base_url: process.env.REACT_APP_TODO_SERVER_BASE_URL ?? "",
};

for (const [key, value] of Object.entries(env)) {
  if (value === "") {
    throw new Error(`${key} 값이 비어있습니다.`);
  }
}

export { env };
