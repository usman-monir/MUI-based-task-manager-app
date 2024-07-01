import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // login to check if the user is logged in, usually by checking the JWT token in Cookies.
  const userInfo = null;
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
