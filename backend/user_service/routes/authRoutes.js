router.post("/admin/login", authController.login);
router.post("/user/login", authController.login);
router.post("/user/register", authController.register);