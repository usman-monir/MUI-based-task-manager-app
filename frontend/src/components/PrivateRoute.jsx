import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const PrivateRoute = () => {
  // login to check if the user is logged in, usually by checking the JWT token in Cookies.
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? (
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
