import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from '../main';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Login() {
   let navigate=useNavigate();
   let [show,setShow]=useState(false);
  let [err,setErr]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [loading,setLoading]=useState("")
  let dispatch=useDispatch();
  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      console.log({email, password });
      let result=await axios.post(`${serverUrl}/api/auth/login`,{
         email,password
        
      },{withCredentials:true})
      console.log(result)
      dispatch(setUserData(result.data))
      setLoading(false)
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
      
      console.log("FULL ERROR:", error);
  console.log("BACKEND RESPONSE:", error.response?.data);
    }
  }
   return (
    
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
        shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-[#19cdff]
            rounded-b-[30%]  shadow-gray-400 shadow-lg flex items-center justify-center'>
              <h1 className='font-bold text-gray-600 text-[30px]'>
              Login To <span className='text-white'>App Buzz</span>
            </h1>
            </div>
            <form className='flex flex-col w-full gap-[20px] items-center'
             onSubmit={handleLogin}>
              {/* <input type='text' placeholder='username' 
              className='w-[90%] h-[60px] outline-none border-2
              border-[#20c7ff] px-[20px] py-[10px] bg-white
              rounded-lg shadow-gray-400 shadow-lg'/>*/
              <input type='email' placeholder='email' className='w-[90%] h-[60px] outline-none border-2
              border-[#20c7ff] px-[20px] py-[10px] bg-white
              rounded-lg shadow-gray-400 shadow-lg' onChange={(e)=>setEmail(e.target.value)}
               value={email}/> }
             <div className='w-[90%] h-[50px] border-[#20c7ff]  
             border-2 overflow-hidden rounded-lg relative shadow-gray-400 shadow-lg'>
               <input type={`${show?"text":"password"}`}placeholder='password' 
               className='w-[90%] h-[60px] outline-none 
              px-[20px] py-[10px] bg-white
              ' onChange={(e)=>setPassword(e.target.value)}
               value={password}/>
              <span className='absolute top-[10px] text-blue-600 text-[15px]
               font-semibold right-[20px]' onClick={()=>setShow(prev=>!prev)} >
                {`${show?"hide":"show"}`}</span>
             </div>
             {err&&<p className='text-red-950'>{err}</p>}
              <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2x1
               rounded-lg shadow-gray-400 shadow-lg ' disabled={loading}>{loading?"loading....":"Login"}</button>
               <p className='cursor-pointer'onClick={()=>navigate("/signup")} > Want to create a new account? <span className='text-[#20c7ff] text-[bold]'>SignUp</span></p>
            </form>
            
           
        </div>


    </div>
  )
  
}

export default Login