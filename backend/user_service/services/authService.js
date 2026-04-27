const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtil");
//login
exports.login = async ({ email, password }) => {
  if(!email||!password){
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ where: { email } });
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
    role: user.role
  };
};
//register
exports.register = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  confirmPassword, }) => {
    if(!firstName||!lastName||!email ||!phoneNumber||!password||!confirmPassword){
      throw new Error("All fields are required");
    }
    firstName=firstName.trim();
    lastName=lastName.trim();
    email=email.trim();
    phoneNumber=phoneNumber.trim();
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  if(password.length<6){
    throw new Error("Password must be at least 6 characters");
  }
  if (!/^[a-zA-Z]+$/.test(firstName)){
    throw new Error("First name must contain only letters");
  }
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    throw new Error("Last name must contain only letters");
  }
  if (!/^\d{10,15}$/.test(phoneNumber)) {
    throw new Error("Phone number must be 10-15 digits");
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw new Error("Invalid email format");
  }
  //checks for existing user
  const existingUser = await User.findOne({where:{ email } });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const existingPhone = await User.findOne({where:{ phoneNumber } });
  if (existingPhone) {
    throw new Error("Phone number already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  //creates new user
  await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    role: "USER",
  });
  return {sucess: true};
};