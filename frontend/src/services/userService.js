import api from "./api";

const userService = {
  getUserProfile: () =>
    api.get("/user/profile"),

  getAdminProfile: () =>
    api.get("user/admin/profile")
};

export default userService;