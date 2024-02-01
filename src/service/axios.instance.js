import axios from "axios";
import { getToken } from "../utils/common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,

});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response.data.detail || "Something went wrong";
    if (error.response.status === 401) {
      toast.error(message);
    }
    if (error.response.status === 403) {
      localStorage.clear();
      window.location.href="/";
    }
    return Promise.reject(error);
  }
);

export default instance;