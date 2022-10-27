import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

const routePath = {
  signIn: "/",
  signUp: "/sign-up",
  todo: "/todo",
};

const routeAuthority = {
  requireLoggedIn: "requireLoggedIn",
  requireNotLoggedIn: "requireNotLoggedIn",
  public: "public",
} as const;

const routes = [
  {
    path: routePath.signIn,
    element: SignInPage,
    authority: routeAuthority.requireNotLoggedIn,
  },
  {
    path: routePath.signUp,
    element: SignUpPage,
    authority: routeAuthority.requireNotLoggedIn,
  },
  {
    path: routePath.todo,
    element: TodoPage,
    authority: routeAuthority.requireLoggedIn,
  },
];

export { routes, routePath, routeAuthority };
