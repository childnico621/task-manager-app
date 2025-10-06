import axios from 'axios';

const API_USERS_URL = import.meta.env.VITE_API_USERS_URL || 'http://localhost:3001/api/v1';
const API_TASKS_URL = import.meta.env.VITE_API_TASKS_URL || 'http://localhost:3002/api/v1';

const userInstance = axios.create({
  baseURL: API_USERS_URL,
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const taskInstance = axios.create({
  baseURL: API_TASKS_URL,
});

taskInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {userInstance, taskInstance};

