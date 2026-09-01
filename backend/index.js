import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import aiRouter from "./routes/ai.routes.js";
// ... existing imports ke saath


import { app, server } from "./socket/socket.js";

// const app = express();
const port=process.env.PORT||5000;
// app.use(cors({
//   origin:"https://realtimechatapp-egu5.onrender.com",
//   credentials:true
// }))
const allowedOrigins = [
    "http://localhost:5173",
    "https://realtimechatapp-egu5.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter);
app.use("/api/ai", aiRouter);
console.log("Cloudinary config check:", {
    cloud_name: !!process.env.CLOUD_NAME,
    api_key: !!process.env.API_KEY,
    api_secret: !!process.env.API_SECRET
});
server.listen(port, () => {
     connectDB()
  console.log("Server is running on port 8000");
});
