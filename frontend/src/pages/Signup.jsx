import React,{useState} from 'react'

import { useNavigate } from "react-router-dom";
import { serverUrl } from '../main';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Signup() {
  let navigate=useNavigate();
  let [show,setShow]=useState(false);
  let [userName,setUserName]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [loading,setLoading]=useState(false);
  let [err,setErr]=useState("");
  let dispatch=useDispatch();
  const handleSignup=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      console.log({ username: userName, email, password });
      let result=await axios.post(`${serverUrl}/api/auth/signup`,{
         username: userName,email,password
        
      },{withCredentials:true})
      dispatch(setUserData(result.data));
      navigate("/");
      console.log(result)
      setLoading(false)
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoading(false)
      console.log(error)
      setErr(error.response.data.message)
    }
  }
  return (
    
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
        shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-[#19cdff]
            rounded-b-[30%]  shadow-gray-400 shadow-lg flex items-center justify-center'>
              <h1 className='font-bold text-gray-600 text-[30px]'>
              Welcome To <span className='text-white'>App Buzz</span>
            </h1>
            </div>
            <form className='flex flex-col w-full gap-[20px] items-center' onSubmit={handleSignup}>
              <input type='text' placeholder='username' 
              className='w-[90%] h-[60px] outline-none border-2
              border-[#20c7ff] px-[20px] py-[10px] bg-white
              rounded-lg shadow-gray-400 shadow-lg' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
              <input type='email' placeholder='email' className='w-[90%] h-[60px] outline-none border-2
              border-[#20c7ff] px-[20px] py-[10px] bg-white
              rounded-lg shadow-gray-400 shadow-lg'onChange={(e)=>setEmail(e.target.value)} value={email}/>
             <div className='w-[90%] h-[50px] border-[#20c7ff]  
             border-2 overflow-hidden rounded-lg relative shadow-gray-400 shadow-lg'>
               <input type={`${show?"text":"password"}`}placeholder='password' 
               className='w-[90%] h-[60px] outline-none 
              px-[20px] py-[10px] bg-white
              ' onChange={(e)=>setPassword(e.target.value)} value={password}/>
              <span className='absolute top-[10px] text-blue-600 text-[15px]
               font-semibold right[20px]' onClick={()=>setShow(prev=>!prev)} >
                {`${show?"hide":"show"}`}</span>
             </div>
             {err&&<p>{err}</p>}
              <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2x1
               rounded-lg shadow-gray-400 shadow-lg 'disabled={loading}>{loading?"Loading...":"SignUp"}</button>
               <p className='cursor-pointer'onClick={()=>navigate("/login")} > Already have an account? <span className='text-[#20c7ff] text-[bold]'>Login</span></p>
            </form>
            
           
        </div>


    </div>
  )
}

export default Signup