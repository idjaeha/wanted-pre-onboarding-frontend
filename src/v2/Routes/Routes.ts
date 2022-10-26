import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

const routePath = {
  signIn: "/",
  signUp: "/sign-up",
  todo: "/todo",
};

const routes = [
  {
    path: routePath.signIn,
    element: SignInPage,
    isPrivate: false,
  },
  {
    path: routePath.signUp,
    element: SignUpPage,
    isPrivate: false,
  },
  {
    path: routePath.todo,
    element: TodoPage,
    isPrivate: true,
  },
];

export { routes, routePath };
