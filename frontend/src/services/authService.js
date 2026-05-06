import api from "./api";

const authService = {
  userRegister: (data) =>
    api.post("/user/register", data),

  userLogin: (data) =>
    api.post("/user/login", data),

  adminLogin: (data) =>
    api.post("/user/admin/login", data),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userEmail");
  },
};

export default authService;
