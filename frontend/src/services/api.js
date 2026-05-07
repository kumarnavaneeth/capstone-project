import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1.0",
=======
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1.0",
>>>>>>> 8250be5b2e4aabc54431c3e9d8d005fed36d660e
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
