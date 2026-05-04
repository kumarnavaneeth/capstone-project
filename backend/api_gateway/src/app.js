const express=require("express");
require("dotenv").config();

const app=express();
const userRoutes=require("./routes/userRoutes");
const flightRoutes=require("./routes/flightRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
app.use("/api/v1.0/user",userRoutes);
app.use("/api/v1.0/flight",flightRoutes);
app.use("/api/v1.0/booking",bookingRoutes);
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`API Gateway running on port ${PORT}`);
});
module.exports=app;