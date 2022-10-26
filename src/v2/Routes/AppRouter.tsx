import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./Routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element, isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute isPrivate={isPrivate} />}
        >
          <Route path={path} element={<Element />} />
        </Route>
      ))}
    </Routes>
  );
};

export default AppRouter;
