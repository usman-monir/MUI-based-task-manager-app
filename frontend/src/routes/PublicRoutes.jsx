import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import NotFound from "../screens/Util/NotFound";

const publicRoutes = [
  { path: "login", element: <LoginScreen /> },
  { path: "register", element: <RegisterScreen /> },
  { path: "*", element: <NotFound /> },
];

export default publicRoutes;
