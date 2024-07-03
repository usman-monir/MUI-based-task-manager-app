import axiosInstance from './axiosInstance';
import { USERS_API } from '../constants';
import handleResponse from '../utils/handleResponse';

const AuthService = {

  async login (email, password){
  try {
    const response = await axiosInstance.post(`${USERS_API}/login`, { email, password });
    return handleResponse(response);
  } catch (error) {
    console.log( error);
    if (error.response && error.response.status === 401) {
      return handleResponse(error.response); // Handle 401 error specifically
    }
  }
  },

  async register (name, email, password) {
  try {
    const response = await axiosInstance.post(`${USERS_API}`, { name, email, password });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
  },

  async logout() {
  try {
    const response = await axiosInstance.post(`${USERS_API}/logout`);
    localStorage.setItem('userInfo', null);
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
}
}
export default AuthService;
