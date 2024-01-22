import axios from "axios";
import { getToken } from "../utils/common";

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
    const message = error.response.data?.message || "Something went wrong";
    return Promise.reject(error);
  }
);

export default instance;