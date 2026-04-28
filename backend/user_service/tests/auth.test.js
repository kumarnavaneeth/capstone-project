process.env.JWT_SECRET = "test_secret_key";                     
const request=require("supertest");                      
const app=require("../app");

//mocking the models
jest.mock("../models/index",()=>({
    User:{
        findOne:jest.fn(),
        create:jest.fn(),
        findAll:jest.fn(),  
    },
    Role:{
        findOne:jest.fn(),
        create:jest.fn(),
        findOrCreate:jest.fn(),
    },
    UserRole:{
        findOne:jest.fn(),
        create:jest.fn(),   
        findAll:jest.fn(),
    },
}));
//Mock db connection
jest.mock("../config/db",()=>({
    define:jest.fn(),
    sync:jest.fn().mockResolvedValue(true),
    close:jest.fn().mockResolvedValue(true),
    query:jest.fn().mockResolvedValue([]),
}));
const{User,Role,UserRole}=require("../models/index");
afterEach(()=>{
    jest.clearAllMocks();
});

//registration tests
describe("Register",()=>{
    test("Registered new user successfully",async()=>{
        User.findOne.mockResolvedValue(null);
        Role.findOne.mockResolvedValue({role_id:1,role_name:"USER"});
        User.create.mockResolvedValue({user_id:1,email:"test@example.com"});
        UserRole.create.mockResolvedValue({});
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            lastName:"User",
            email:"test@example.com",
            phoneNumber:"9876543210",
            password:"123456",
        });
        expect(response.statusCode).toBe(201);
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(UserRole.create).toHaveBeenCalledTimes(1);
    });
    test("Failed to register with missing fields",async()=>{
        const response=await request(app)
        .post("/api/v1.0/flight/user/register")
        .send({
            firstName:"Test",
            email:"test@example.com",
            password:"123456",
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