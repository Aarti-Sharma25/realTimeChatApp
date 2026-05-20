import http from "http";
import express from "express"
import { Server } from "socket.io";
let app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
});
const userMap={}
export const getReceiverSocketId=(receiver)=>{
    return userMap[receiver];
}
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId!=undefined){
        // console.log(userId,socket.id);
        userMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userMap));
    socket.on("disconnect",()=>{
        delete  userMap[userId];
         io.emit("getOnlineUsers",Object.keys(userMap));
    })
})
export {app,server,io}