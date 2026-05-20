import React from 'react'
import './index.css'
import {Navigate, Route,Routes} from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import getCurrentUser from './customHooks/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import getOtherUsers from './customHooks/getOtherUsers';
import { useEffect } from 'react';
import {io} from "socket.io-client"
import { serverUrl } from './main';
import { setOnlineUsers, setSocketi } from './redux/userSlice';
function App() {
  getCurrentUser();
  getOtherUsers();
  let {userData,socketi,onlineUsers}=useSelector(state=>state.user);
  let dispatch=useDispatch();
  useEffect(()=>{
    if(userData){
      const socketio=io(`${serverUrl}`,{
      query:{
        userId:userData?._id
      }
    });
    dispatch(setSocketi(socketio));
    socketio.on("getOnlineUsers",(users)=>{
      dispatch(setOnlineUsers(users));
    })
    return ()=>socketio.close();
    }
    else{
      if(socketi){
        socketi.close();
        dispatch(setSocketi(null));
      }
    }
    // socket.on(userData);

  },[userData])
  return (
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}></Route>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to="/profile"/>}></Route>
      <Route path='/' element={userData?<HomePage/>:<Navigate to="/login"/>}></Route>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}></Route>
    </Routes>
  )
}

export default App
