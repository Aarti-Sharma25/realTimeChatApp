import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import genToken from "../config/token.js"
export const signup=async(req,res)=>{
    console.log("BODY:", req.body);
   try{
     const {username,email,password}=req.body;
    const checkByusername=await User.findOne({username});
    if(checkByusername){
        return res.status(400).json({message:"username already exist"})
        
    }
     const checkByemail=await User.findOne({email});
    if(checkByemail){
        return res.status(400).json({message:"emailid already exist"})
        
    }
    if(password.length<6){
        return res.status(400).json({message:"pass len must be greater than 6"})

    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create(
        {username,email,password:hashedPassword});
    const token=await genToken(user._id);
   res.cookie("token",token,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    // sameSite:"none",
    // secure:true
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production"
   }

   )
      return res.status(201).json(user);



   }
   catch(error){
    console.log("SIGNUP ERROR:", error);
  return res.status(500).json({ message: error.message });
   }

}
export const login=async(req,res)=>{
   try{
     const {email,password}=req.body;
   
     const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"emailid doesn't exist"})
        
    }
    
  
   console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message:"wrong password"});

    }

    const token=await genToken(user._id);
   res.cookie("token",token,{
    httpOnly:true,
    maxAge:7*24*60*60*1000,
//    sameSite:"none",
//     secure:true
sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production"
   }

   )
      return res.status(200).json(user);



   }

   catch(error){
    console.log("LOGIN ERROR:", error); 
    return res.status(500).json({message:`login error ${error}`})
   }

}
export const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
    return res.status(200).json({messsage:"successfully logged out"});
    }
    catch(error){
    return res.status(500).json({message:`logout error ${error}`})
   }
}
