import axiosInstance from './axiosInstance';
import { USERS_API } from '../constants';
import handleError from '../utils/handleError';
import handleResponse from '../utils/handleResponse';

const AuthService = {

  async login (email, password){
    let response;
  try {
    response = await axiosInstance.post(`${USERS_API}/login`, { email, password });
    return handleResponse(response);
  } catch (error) {
    handleError(response, error);
  }
  },

  async register (name, email, password) {
  try {
    const response = await axiosInstance.post(`${USERS_API}`, { name, email, password });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
  },

  async logout() {
  try {
    const response = await axiosInstance.post(`${USERS_API}/logout`);
    localStorage.setItem('userInfo', null);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}
}
export default AuthService;
