import { response } from "express"

import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{
    let  token = req.cookies?.token;
    //console.log("Cookies:", req.cookies);
    try {
        
    if(!token){
        return res.status(400).json({message:"token not found"});
    }
    let verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=verifyToken.userid
    next();
    } 
    catch (error) {
        return res.status(500).json({message:"user not found"})
    }

}
export default isAuth