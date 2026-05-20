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
import { app, server } from "./socket/socket.js";
// const app = express();
const port=process.env.PORT||5000;
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter);
server.listen(8000, () => {
     connectDB()
  console.log("Server is running on port 8000");
});
