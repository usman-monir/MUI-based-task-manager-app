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
    const response = await axiosInstance.post(`${USERS_API}/`, { name, email, password });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      return handleResponse(error.response); // Handle 400 error specifically
    }
  }
  },

  async logout() {
  try {
    const response = await axiosInstance.post(`${USERS_API}/logout`);
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
  },

  async updateProfile(name, email, password, imageUrl) {
  try {
    const response = await axiosInstance.put(`${USERS_API}/profile`, {name, email, password, imageUrl});
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status < 200 && error.response.status >= 300 ) {
      return handleResponse(error.response);
    }
  }
  },

  async uploadProfilePicture (formData) {
    try {
      const response = await axiosInstance.post(`${USERS_API}/profile/upload-profile-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },
}
export default AuthService;
