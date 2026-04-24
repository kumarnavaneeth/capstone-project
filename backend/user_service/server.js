const app = require("./app");
const sequelize = require("./config/db");
const createAdminRoles = require("./utils/dbInitializer");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database connected");
    await createAdminRoles();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to database:", error)
  });