# 프리온보딩 1차 과제
## 디렉토리 구조

## 기능 구현

#### 유효성 검사
- 아이디와 비밀번호의 값이 바뀔 때마다 `useEffect`를 통해 값을 비교함.

#### 로그인
- form의 submit 기능을 이용하여 요청을 보내 로그인하는 로직.
- 로그인이 성공하면 todo로 redirect

#### 회원가입
- 로그인과 마찬가지로 form의 submit 기능을 이용하여 요청을 보내 로그인하는 로직.
- 회원가입이 성공하면 todo로 redirect

#### TODO CRUD
- 모든 todoList의 CRUD는 `useTodoList` 라는 커스텀 훅을 통해 진행함.
- 그것을 보여주는 `TodoPage.tsx`는 단순히 각 기능에 맞는 요청을 보내고 todo를 보여주기만 함.

#### 리다이렉트
- 리다이렉트가 필요한 페이지 컴포넌트에서 `useEffect` 로 리다이렉트를 처리합니다.
- 코드 예시 (SignInPage.tsx)
  ```
  useEffect(() => {
    if (window.localStorage.getItem(env.access_token_name)) {
      navigate("/todo");
    }
  }, [navigate]);
  ```
- 아쉬운 점
  - 페이지 내부에서 처리하게 되면 추후에 서비스에서 리다이렉트가 어떻게 처리되고 있는지 알아내기 위해 리다이렉트가 일어나는 페이지를 모두 탐색해야해서 실수가 유발될 수 있음.
  - 페이지 컴포넌트가 페이지를 렌더링하는 내용 뿐만 아니라 리다이렉트를 하는 기능도 담당하고 있음.
  

<br />
<br />
<br />

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
