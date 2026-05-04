const bcrypt = require("bcryptjs");
const { User, Role, UserRole } = require("../models/index");
const dataInitializer = async () => {
    console.log("Initializing data");
    try {
        const [adminRole] = await Role.findOrCreate({ where: { role_name: "ADMIN" } });
        await Role.findOrCreate({ where: { role_name: "USER" } });
        console.log("Roles initialized");
        const adminEmail = process.env.ADMIN_EMAIL || "admin@test.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
        const [adminUser, created] = await User.findOrCreate({
            where: { email: adminEmail },
            defaults: {
                firstName: "Admin",
                lastName: "User",
                phoneNumber: process.env.ADMIN_PHONE || "1234567890",
                password: await bcrypt.hash(adminPassword, 10),
            },
        });
        const existing = await UserRole.findOne({
            where: { user_id: adminUser.user_id, role_id: adminRole.role_id },
        });
        if (!existing) {
            await UserRole.create({
                user_id: adminUser.user_id,
                role_id: adminRole.role_id,
            });
        }
        if (created) {
            console.log("Admin user created and role assigned");
        } else {
            console.log(`Admin already exists (${adminEmail})`);
        }
    } catch (error) {
        console.error("Error initializing data:", error.message);
    }
};
module.exports = dataInitializer;