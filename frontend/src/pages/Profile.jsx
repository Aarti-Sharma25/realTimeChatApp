// import React from 'react'
// import dp from "../assets/dp.png"
// import { IoCamera } from "react-icons/io5";
// function Profile() {
//   return (
//     <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
//         <div className='bg-white  rounded-full border-4 border-[#20c7ff]
//         shadow-gray-400 shadow-lg relative'>
//   <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
//     <img src={dp}  alt="" className='h-[100%]'/>
//   </div>
//   <IoCamera className='absolute text-gray-700 bottom-4 right-5 w-[28px] h-[28px]'/>
//         </div>
//         <form>
//       <input type="text" placeholder='Enter Your Name' className='w-[90%] h-[60px] outline-none border-2
//               border-[#20c7ff] px-[20px] py-[10px] bg-white
//               rounded-lg shadow-gray-400 shadow-lg'></input>
//       <input type="text" readOnly className='w-[90%] h-[60px] outline-none border-2
//               border-[#20c7ff] px-[20px] py-[10px] bg-white
//               rounded-lg shadow-gray-400 shadow-lg'></input>
//       <input type="text" readOnly className='w-[90%] h-[60px] outline-none border-2
//               border-[#20c7ff] px-[20px] py-[10px] bg-white
//               rounded-lg shadow-gray-400 shadow-lg'></input>
//       <button>Save Profile</button>
//         </form>
//     </div>
    
//   )
// }

// export default Profile
import React from 'react'
import dp from "../assets/dp.png"
import { IoCamera } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios"
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
  let {userData}=useSelector(state=>state.user)
  let navigate=useNavigate();
  let [saving,setSaving]=useState(false);
  let [name,setName]=useState(userData?.name||"");
  let [frontendImage,setFrontendImage]=useState(userData?.image|| dp);
  let [backendImage,setBackendImage]=useState(null);
  let image=useRef();
  let dispatch=useDispatch();
  const handleImage=(e)=>{
    let file=e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }
  const handleProfile=async(e)=>{
    setSaving(true);
    e.preventDefault();
    try {
      let formData=new FormData();
      formData.append("name",name);
      if(backendImage){
        formData.append("image",backendImage);
      }
      let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{
        withCredentials:true
      })
      dispatch(setUserData(result.data));
      navigate("/");
      setSaving(false);
    } catch (error) {
      setSaving(false);
      console.log(error);
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col 
      justify-center items-center gap-6'>
      <div className='fixed top-[20px] left-[20px]'>
        <IoMdArrowRoundBack className='w-[50px] h-[50px] text-gray-500' 
        onClick={()=>navigate('/login')}/>
      </div>
      {/* Profile Picture */}
      <div className='bg-white rounded-full border-4 border-[#20c7ff]
        shadow-gray-400 shadow-lg relative' onClick={()=>image.current.click()}>
        <div className='w-[200px] h-[200px] rounded-full overflow-hidden justify-center items-center'>
          <img src={frontendImage} alt="" className='object-cover w-full h-full'/>
        </div>
        <IoCamera className='absolute text-gray-700 bottom-4 right-5 
          w-[28px] h-[28px]' />
      </div>

      {/* Form */}
      <div className='w-[400px] flex flex-col gap-4'>
        <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>
        <input 
          type="text" 
          placeholder='Enter Your Name' 
          className='w-full h-[60px] outline-none border-2
            border-[#20c7ff] px-[20px] py-[10px] bg-white
            rounded-lg shadow-gray-400 shadow-lg' 
            onChange={(e)=>setName(e.target.value)} value={name}
        />
        <input 
          type="text" 
          readOnly 
          
          className='w-full h-[60px] outline-none border-2
            border-[#20c7ff] px-[20px] py-[10px]
            text-gray-400
            rounded-lg shadow-gray-400 shadow-lg bg-gray-50' value={userData?.username}
        />
        <input 
          type="text" 
          readOnly 
          placeholder='email'
          className='w-full h-[60px] outline-none border-2
            border-[#20c7ff] px-[20px] py-[10px]
            text-gray-400
            rounded-lg shadow-gray-400 shadow-lg bg-gray-50'value={userData?.email}
        />
        <button className='w-full h-[60px] bg-[#20c7ff] text-white
          rounded-lg shadow-lg font-semibold hover:opacity-90
          transition-opacity' onClick={handleProfile} disabled={saving}>  
          {saving?"saving....":"Save Profile"}
        </button>
      </div>
    </div>
  )
}

export default Profile