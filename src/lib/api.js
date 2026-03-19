import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
const IMG_PATH = API_URL + "storage/";

const api = axios.create({
  baseURL: API_URL + "api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/dashboard/";
    }
    return Promise.reject(error);
  },
);

export default api;
export { API_URL, IMG_PATH };
