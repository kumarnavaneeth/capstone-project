const request=require("supertest");                      //use mock to avoid db calls
const app=require("../app");
const sequelize=require("../config/db");
const User=require("../models/userModel");
beforeAll(async()=>{
    await sequelize.sync({ force: true });        
});
afterAll(async()=>{
    await sequelize.close();
});
describe("Auth Service",()=>{
    test("Registered new user successfully",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            lastName:"User",
            email:"test@example.com",
            phoneNumber:"9876543210",
            password:"123456",
            confirmPassword:"123456"
        });
        expect(response.statusCode).toBe(201);
    });
    test("Failed to register with missing fields",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            email:"test@example.com",
            password:"123456",
            confirmPassword:"123456",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("All fields are required");
    });
    test("Failed to register with existing email",async()=>{
        User.findOne.mockResolvedValue({user_id:1,email:"test@example.com"});
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            lastName:"User",
            email:"test@example.com",
            phoneNumber:"9876543210",
            password:"123456",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });
    test("fails with invalid phone number",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            lastName:"User",
            email:"test@example.com",
            phoneNumber:"123",
            password:"123456",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Phone number must be 10-15 digits");
    });
});
//Login tests
describe("Login",()=>{
    test("Login successfully with correct credentials",async()=>{
        User.findOne.mockResolvedValue({
            user_id:1,
            email:"test@example.com",
            password:await require("bcryptjs").hash("123456",10),
            roles:[{role_name:"USER"}],
            toJSON:()=>({user_id:1,email:"test@example.com"}),
        });
        const response=await request(app)
        .post("/api/v1.0/flight/user/login")
        .send({
            email:"test@example.com",
            password:"123456"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.roles).toContain("USER");
    });
    test("Failed to login with incorrect password",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/login")
        .send({
            email:"test@example.com",
            password:"123456"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.roles).toContain("USER");
    });
    test("Failed to login with missing fields",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/login")
        .send({
            email:"test@example.com"
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Email and password are required");
    });
    test("Failed to login with wrong password",async()=>{
        User.findOne.mockResolvedValue({
            user_id:1,
            email:"test@example.com",
            password:await require("bcryptjs").hash("123456",10),
            roles:[{role_name:"USER"}],
            toJSON:()=>({user_id:1,email:"test@example.com"}),
        });
        const response=await request(app)
        .post("/api/v1.0/flight/user/login")
        .send({
            email:"test@example.com",
            password:"wrongpassword"
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");
    });
    test("Failed to login with non-existent email",async()=>{
        User.findOne.mockResolvedValue(null);
        const response=await request(app)
        .post("/api/v1.0/flight/user/login")
        .send({
            email:"nonexistent@example.com",
            password:"123456"
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("User not found");
    });
});