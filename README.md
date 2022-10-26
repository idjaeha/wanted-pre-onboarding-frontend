# **프리온보딩 1차 과제**
## **디렉토리 구조**
```
📦 src
 ┣ 📂 api
 ┃ ┣ 📜 createTodoApi.ts
 ┃ ┣ 📜 deleteTodoApi.ts
 ┃ ┣ 📜 getTodosApi.ts
 ┃ ┣ 📜 instance.ts
 ┃ ┣ 📜 signInApi.ts
 ┃ ┣ 📜 signUpApi.ts
 ┃ ┣ 📜 types.ts
 ┃ ┗ 📜 updateTodoApi.ts
 ┣ 📂 components
 ┃ ┣ 📜 AppRouter.tsx
 ┃ ┣ 📜 SignIn.tsx
 ┃ ┗ 📜 SignUp.tsx
 ┣ 📂 hooks
 ┃ ┣ 📜 useInput.ts
 ┃ ┗ 📜 useTodoList.ts
 ┣ 📂 pages
 ┃ ┣ 📜 SignInPage.tsx
 ┃ ┣ 📜 SignUpPage.tsx
 ┃ ┗ 📜 TodoPage.tsx
 ┣ 📂 utils
 ┃ ┣ 📜 env.ts
 ┃ ┣ 📜 getAccessToken.ts
 ┃ ┗ 📜 saveAccessToken.ts
 ┣ 📜 App.css
 ┣ 📜 App.tsx
 ┗ 📜 index.tsx
```

### 각 디렉토리 설명
- api 
  - API 서버와 통신하기 위한 기능을 저장한 디렉토리
- components
  - 한 가지 이상의 기능을 하는 컴포넌트를 저장한 디렉토리
- hooks
  - 각종 커스텀 훅을 저장하고 있는 디렉토리
- pages
  - 각 라우트에 매칭되는 페이지 컴포넌트를 저장한 디렉토리
- utils
  - 그 외에 자주 사용되는 기능을 저장한 디렉토리
<br />

### 아쉬운 점
TodoPage의 경우에는 내부를 구성하는 TodoList를 다른 컴포넌트로 분리할 수 있었는데 그렇게 진행하지 못했다.

<br/>
<br/>

## **기능 구현**

### 유효성 검사
- 아이디와 비밀번호의 값이 바뀔 때마다 `useEffect`를 통해 값을 비교함.
```typescript
useEffect(() => {
  setIsDisabled(!(email.includes("@") && password.length >= 8));
}, [email, password]);
```
<br/>

### 로그인
- form의 submit 기능을 이용하여 요청을 보내 로그인하는 로직.
- 로그인이 성공하면 todo로 redirect
```typescript
const signIn: React.FormEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault();
  try {
    const response = await signInApi({ email, password });
    saveAccessToken(response.data.access_token);
    navigate("/todo");
  } catch (error) {
    if (axios.isAxiosError(error) === true) {
      const requestSignInError = error as SignInApiErrorType;
      const statusCode = requestSignInError.response?.data.statusCode;
      if (statusCode === 401) {
        alert("비밀번호를 확인해주세요.");
      } else if (statusCode === 404) {
        alert("등록되지 않은 이메일입니다.");
      } else {
        alert(requestSignInError.response?.data.message);
      }
    }
  }
};
```

<br/>

### 회원가입
- 로그인과 마찬가지로 form의 submit 기능을 이용하여 요청을 보내 로그인하는 로직.
- 회원가입이 성공하면 todo로 redirect
```typescript
const signUp: React.FormEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault();
  try {
    const response = await signUpApi({ email, password });
    saveAccessToken(response.data.access_token);
    navigate("/todo");
  } catch (error) {
    if (axios.isAxiosError(error) === true) {
      const requestSignUpError = error as SignUpApiErrorType;
      const errorMessage = requestSignUpError.response?.data.message;
      if (errorMessage instanceof Array) {
        alert(errorMessage.join("\n"));
      } else {
        alert(errorMessage);
      }
    }
  }
};
```

<br/>

### TODO CRUD
- 모든 todoList의 CRUD는 `useTodoList` 라는 커스텀 훅을 통해 진행함.
- 그것을 보여주는 `TodoPage.tsx`는 단순히 각 기능에 맞는 요청을 보내고 todo를 보여주기만 함.
<br/>

#### Create
```typescript
const createTodo = useCallback(
  async (todo: string) => {
    try {
      const response = await createTodoApi({ todo });
      if (response.status === 201) {
        await getTodos();
        clearTodoInputValue();
      }
    } catch (err) {
      alert("생성에 실패했습니다.");
    }
  },
  [clearTodoInputValue, getTodos]
);
```
<br/>

#### Read
```typescript
const getTodos = useCallback(async () => {
  try {
    const response = await getTodosApi();
    if (response.status === 200) {
      setTodos(
        response.data.map((value) => ({ ...value, isEditing: false }))
      );
    }
  } catch (err) {
    alert("todo List를 가져오는것을 실패했습니다.");
  }
}, []);
```
<br/>

#### Update(Todo 내용)
```typescript
const updateTodo = useCallback(async (item: TodoType, newTodo: string) => {
  try {
    const response = await updateTodoApi({
      id: item.id,
      todo: newTodo,
      isCompleted: item.isCompleted,
    });
    if (response.status === 200) {
      setTodos((todos) =>
        todos.map((curTodo) => {
          if (curTodo.id === response.data.id) {
            curTodo.todo = response.data.todo;
          }
          return curTodo;
        })
      );
    }
  } catch (err) {
    alert("수정에 실패했습니다.");
  }
}, []);
```
<br/>

### Update(Todo IsCompleted)
```typescript
  const updateIsCompleted = useCallback(async (item: TodoType) => {
    try {
      const response = await updateTodoApi({
        id: item.id,
        todo: item.todo,
        isCompleted: !item.isCompleted,
      });
      if (response.status === 200) {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === item.id) {
              todo.isCompleted = response.data.isCompleted;
            }
            return todo;
          })
        );
      }
    } catch (err) {
      alert("체크 변경에 실패했습니다.");
    }
  }, []);
```
<br/>

### Delete
```typescript
const deleteTodo = useCallback(
  async (item: TodoType) => {
    try {
      const response = await deleteTodoApi({ id: item.id });
      if (response.status === 204) {
        await getTodos();
      }
    } catch (err) {
      alert("삭제에 실패했습니다.");
    }
  },
  [getTodos]
);
```

<br/>
<br/>

### 리다이렉트
- 리다이렉트가 필요한 페이지 컴포넌트에서 `useEffect` 로 리다이렉트를 처리합니다.
- 코드 예시 (SignInPage.tsx)

```typescript
useEffect(() => {
  if (window.localStorage.getItem(env.access_token_name)) {
    navigate("/todo");
  }
}, [navigate]);
```
<br />

- 아쉬운 점
  - 페이지 내부에서 처리하게 되면 추후에 서비스에서 리다이렉트가 어떻게 처리되고 있는지 알아내기 위해 리다이렉트가 일어나는 페이지를 모두 탐색해야해서 실수가 유발될 수 있음.
  - 페이지 컴포넌트가 페이지를 렌더링하는 내용 뿐만 아니라 리다이렉트를 하는 기능도 담당하고 있음.

<br />
<br />  

---

<br />
<br />

# 프리온보딩 사전과제

# 프로젝트 실행 방법
1. `yarn` 혹은 `npm install` 을 통해 필요한 종속성을 다운 받습니다.
2. 해당 프로젝트 루트 경로에 `.env` 파일을 작성합니다. 파일 내용은 아래를 참고해주세요.
3. `yarn start` 혹은 `npm run start` 를 통해 리액트 앱을 실행시킵니다.
4. `http://localhost:3000` 으로 접근하여 Todo 앱을 사용합니다.
<br />
<br />

# .env 파일 내용
```
REACT_APP_ACCESS_TOKEN_NAME=[원하는 액세스 토큰 이름]
REACT_APP_TODO_SERVER_BASE_URL=[원티드 TODO API URL]
```
<br />
<br />

# 배포 링크
아래 링크를 통해 배포된 Todo앱을 사용해볼 수 있습니다.<br/>
https://wanted-pre-onboarding-frontend-five.vercel.app/
