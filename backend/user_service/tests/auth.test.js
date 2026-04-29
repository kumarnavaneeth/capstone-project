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
});