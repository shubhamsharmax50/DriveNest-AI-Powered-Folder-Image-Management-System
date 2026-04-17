import axios from 'axios';

const api = axios.create({
  // Use the confirmed Render backend URL
  baseURL: 'https://drivenest-backend-ui3t.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
