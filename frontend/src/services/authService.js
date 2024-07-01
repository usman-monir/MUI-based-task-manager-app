import axiosInstance from './axiosInstance';
import { USERS_API } from '../constants';

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const handleError = (error) => {
  if (error?.response) {
    // Server responded with a status other than 2xx
    throw new Error(error?.response?.data?.message || 'Server Error');
  } else if (error.request) {
    // No response from the server
    throw new Error('Network Error');
  } else {
    // Something else caused the error
    throw new Error(error?.message);
  }
};

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${USERS_API}/login`, { email, password });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const register = async (name, email, password) => {
  try {
    const response = await axiosInstance.post(`${USERS_API}`, { name, email, password });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post(`${USERS_API}/logout`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export { login, register, logout };
