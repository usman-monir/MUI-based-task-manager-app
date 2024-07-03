import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
  // login to check if the user is logged in, usually by checking the JWT token in Cookies.
  const { user } = useContext(UserContext);
  return user ? (
    <>
        <Header />
        <Box m={4}>
          <Outlet />
        </Box>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateRoute;
