// services/axiosInstance.js
import axios from 'axios';
import { BASE_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL+"/",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

export default axiosInstance;
