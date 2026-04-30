import api from "./api";

const userService = {
  getUserProfile: () =>
    api.get("/userProfile"),

  getAdminProfile: () =>
    api.get("/adminProfile")
};

export default userService;