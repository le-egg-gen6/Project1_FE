import axios from "axios";
import { toast } from "sonner";

const service = axios.create({
  baseURL: String(import.meta.env.VITE_BACKEND_URL) || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor
service.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    toast.error("An error occurred");
    return Promise.reject(error);
  }
);

export default service;
