import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./Routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element, authority }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute authority={authority} />}
        >
          <Route path={path} element={<Element />} />
        </Route>
      ))}
    </Routes>
  );
};

export default AppRouter;
