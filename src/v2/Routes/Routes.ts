import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

const routePath = {
  signIn: "/",
  signUp: "/sign-up",
  todo: "/todo",
};

const routeType = {
  requireLoggedIn: "requireLoggedIn",
  requireNotLoggedIn: "requireNotLoggedIn",
  public: "public",
} as const;

const routes = [
  {
    path: routePath.signIn,
    element: SignInPage,
    type: routeType.requireNotLoggedIn,
  },
  {
    path: routePath.signUp,
    element: SignUpPage,
    type: routeType.requireNotLoggedIn,
  },
  {
    path: routePath.todo,
    element: TodoPage,
    type: routeType.requireLoggedIn,
  },
];

export { routes, routePath, routeType };
