import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !config.url.includes("/user/register") &&
    !config.url.includes("/user/login") &&
    !config.url.includes("/admin/login")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
