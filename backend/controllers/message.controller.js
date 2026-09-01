import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { generateEmbedding } from "../config/embedding.js";
export const sendMessage=async(req,res)=>{
    try {
        let sender=req.userId;
        let {receiver}=req.params;
        let {message}=req.body;
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.buffer);
        }
        let embedding = await generateEmbedding(message); 
        if (!embedding && message && message.trim().length > 0) {
  console.log("⚠️ Warning: embedding generation failed for message, saving without it");
} 
       let newMessage=await Message.create({
         sender,receiver,message,image,
         embedding: embedding || undefined 
       })
       let conversation= await Conversation.findOne({
            participants:{$all:[sender,receiver]}
       })
        console.log("✅ Conversation found:", conversation);
       if(!conversation){
        conversation=await Conversation.create({
            participants:[sender,receiver],
            messages:[newMessage._id]
        })
        console.log("✅ Conversation created:", conversation._id);
       }
        else{
            conversation.messages.push(newMessage._id);
            await conversation.save();
            console.log("✅ Conversation updated");
            
        }
        const receiverSocketId=getReceiverSocketId(receiver);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
       
        return res.status(201).json(newMessage);
    } catch (error) {
         console.log("❌ EXACT ERROR:", error.message); // ✅ paste what this prints
    console.log("❌ STACK:", error.stack);
        return res.status(500).json({message:`error :${error}`})
    }
}
export const getMessages=async(req,res)=>{
    try {
            let sender=req.userId;
    let {receiver}=req.params;
    let conversation=await Conversation.findOne({
       participants:{$all:[sender,receiver]}


    }).populate("messages"); 
     if (!conversation) {
      return res.status(200).json([]); // ✅ return empty array, not an error
    }
    return res.status(201).json(conversation?.messages);

        
    } catch (error) {
        return res.status(501).json({message:`error :${error}`})

    }
}
