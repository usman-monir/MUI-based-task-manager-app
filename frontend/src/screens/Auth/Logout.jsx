import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const callLogoutAPI = async () => await AuthService.logout();
    callLogoutAPI();
    localStorage.setItem('userInfo', null);
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
