import axios from "axios";

const axiosInstance = axios.create({
  baseURL: String(process.env.VITE_BACKEND_URL) || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
    return Promise.reject(error);
  }
);
