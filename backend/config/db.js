import mongoose from "mongoose";
const connectDB=async()=>{
    try{
      //  console.log("ENV VALUE:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB connected")
    }
    catch(error){
        console.log("error accepted",error.message)
    }
}
export default connectDB;