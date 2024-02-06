import axios from "axios";
import { getToken, getRefreshToken, updateToken } from "../utils/common";
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
  async (error) => {
    const message = error.response.data.detail || "Something went wrong";
    if (error.response.status === 401) {
      toast.error(message);
    }
    if (error.response.status === 403) {
      const originalRequest = error.config;
      try {
        let refreshToken = getRefreshToken();
        const response = await instance.post('/token/refresh/', { refresh: refreshToken });
        let refreshTokn = updateToken(response.data.access_token)
        originalRequest.headers["Authorization"] = `Bearer ${refreshTokn}`;
        return instance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        localStorage.clear();
        window.location.href="/";
        console.error("Error refreshing token:", error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;