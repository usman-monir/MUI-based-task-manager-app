import axiosInstance from './axiosInstance';
import { TASKS_API } from '../constants';
import handleResponse from '../utils/handleResponse';

const TaskService = {
  async fetchTasks() {
    try {
      const response = await axiosInstance.get(TASKS_API);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },

  async fetchTaskById(taskId) {
    try {
      const response = await axiosInstance.get(`${TASKS_API}/${taskId}`);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },

  async createTask(taskData) {
    try {
      const response = await axiosInstance.post(TASKS_API, taskData);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTask(taskId, taskData) {
    try {
      const response = await axiosInstance.put(`${TASKS_API}/${taskId}`, taskData);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTask(taskId) {
    try {
      const response = await axiosInstance.delete(`${TASKS_API}/${taskId}`);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
    }
  },
};

export default TaskService;
