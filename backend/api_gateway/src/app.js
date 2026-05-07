const express=require("express");
require("dotenv").config();
const app=express();
const cors=require("cors");
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use((request, response, next) => {
    request.rawBody = JSON.stringify(request.body);
    next();
});
const userRoutes=require("./routes/userRoutes");
const flightRoutes=require("./routes/flightRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
app.use("/api/v1.0/user",userRoutes);
app.use("/api/v1.0/flights",flightRoutes); 
app.use("/api/v1.0/booking",bookingRoutes);
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`API Gateway running on port ${PORT}`);
});
module.exports=app;