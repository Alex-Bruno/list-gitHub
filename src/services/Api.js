
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
    return config;
});

export default api;
