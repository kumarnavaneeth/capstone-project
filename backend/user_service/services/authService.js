const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtil");
const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@test.com",
    password: "$2a$10$7QJp7K1wQkz6z6WQm3p7QeGZ9ZzQ0mG6ZxQ8Q5m8xw3Z8ZzQw3Q2K", // password: admin123
    role: "ADMIN",
  },
];
exports.login = async ({ email, password }) => {
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user);
  return {
    token,
    role: user.role,
  };
};
exports.register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: "USER",
  };
  users.push(newUser);
  return { message: "User registered" };
};