import jwt from "jsonwebtoken";

const genToken=async(userid)=>{
   try{
     const token=jwt.sign({userid},process.env.JWT_SECRET,
        {expiresIn:"7d"}
     );
     return token;
   }
   catch(error){
      console.log("error in gen token");
   }
}
export default genToken;