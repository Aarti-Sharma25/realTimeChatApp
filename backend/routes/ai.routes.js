import express from "express";
import isAuth from "../middlewares/isAuth.js";
//import { suggestReplies } from "../controllers/ai.controller.js";
import { suggestReplies, searchMessages, summarizeChat } from "../controllers/ai.controller.js";
const aiRouter = express.Router();
aiRouter.get("/summarize/:receiver", isAuth, summarizeChat);  
aiRouter.get("/suggest-replies/:receiver", isAuth, suggestReplies);
aiRouter.post("/search-messages/:receiver", isAuth, searchMessages); 
export default aiRouter;