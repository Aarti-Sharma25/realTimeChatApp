// import React from 'react'
// import { IoMdArrowRoundBack } from "react-icons/io";
// import dp from "../assets/dp.png"
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/userSlice';
// function MessageArea() {
//   let {selectedUser}=useSelector((state)=>state.user)
//   let dispatch=useDispatch();
//   return (
//       //  <div className={`lg:w-[70%]  flex w-full h-full border-x-gray-200
//       //  ${selectedUser?"flex":"hidden"}`}>
//        <div className={`lg:flex lg:w-[70%] w-full h-full flex-col border-l border-gray-200
//       ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>
        
//                     {selectedUser && 
//                       <div className='w-full h-[80px] bg-[#148cad] 
//               rounded-b-[30px]  shadow-gray-400 shadow-lg flex gap-[20px]  px-[10px]'>
//               <div className='lg:w-[70%] hidden lg:flex w-full h-full bg-[#148cad]  border-x-gray-200'>

    
                  //  <div className='cursor-pointer'>
                  //        <IoMdArrowRoundBack className='w-[40px] h-[40px] text-white' 
                  //        onClick={()=>dispatch(setSelectedUser(null))}
                  //       />
                  //      </div>
//                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden justify-center items-center'onClick={()=>navigate("/profile")}>
//                             <img src={selectedUser?.image || dp} alt="" className='object-cover w-full h-full'/> 
//                           </div>
//                           <h1 className='text-white text-[35px]'>{selectedUser?.name || "user"}</h1>
//               </div>
//               </div>
//               }
//               {!selectedUser && 
//               <div className='items-center'><h1 className='text-black text-[80px] ' > welcome to app buzz</h1>
//                 </div>
//               }
//        </div>
                
    
//   )

    
  
// }

// // export default MessageArea
// import React, { useRef, useState } from 'react'
// import { IoMdArrowRoundBack } from "react-icons/io";
// import dp from "../assets/dp.png"
// import { IoMdSend } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { RiEmojiStickerLine } from "react-icons/ri";
// import { setSelectedUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { FaImage } from "react-icons/fa";
// import EmojiPicker from 'emoji-picker-react';
// import Sender from './Sender';
// import Receiver from './Receiver';
// import axios from "axios"
// import { serverUrl } from '../main';
// import { setMessages } from '../redux/messageSlice';
// function MessageArea() {
//   const { selectedUser ,userData} = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//    let [showPicker,setShowPicker]=useState(false);
//    let [input,setInput]=useState("");
//    let [frontendImage,setFrontendImage]=useState(null);
//    let [backendImage,setBackendImage]=useState(null);
//    let image=useRef();
//    let {messages}=useSelector(state=>state.message)
//    const handleImage=async(e)=>{
//     let file=e.target.files[0];
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//    }
//    const handleSendMessage=async(e)=>{
//     e.preventDefault();
//     try {
//         let formData=new FormData();
//         formData.append("message",input);
//         if(backendImage){
//           formData.append("image",backendImage);
//         }
//        let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,
//         {withCredentials:true}
//        )
//        console.log(result.data)
//        dispatch(setMessages([...messages,result.data]))
//        setInput("");
//        setBackendImage(null);
//        setFrontendImage(null);
//     } catch (error) 
//     {   console.log(error);
      
//     }
    
//    }
//    const emojiClick=(emojiData)=>{
//       setInput(prevInput=>prevInput+emojiData.emoji)
//       setShowPicker(false);
//    }
//   return (
//     // KEY FIX: Always show on lg. On mobile, only show when a user is selected.
//     <div className={`lg:flex lg:w-[70%] w-full h-full flex-col border-l border-gray-200
//       ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>

//       {selectedUser ? (
//         <>
//           {/* Header */}
//           <div className='w-full h-[80px] bg-[#148cad] rounded-b-[20px] shadow-gray-400 shadow-lg flex items-center gap-[15px] px-[15px] shrink-0'>
//             {/* Back button — only useful on mobile */}
//             {/* <div className='cursor-pointer lg:hidden' onClick={() => dispatch(setSelectedUser(null))}>
//               <IoMdArrowRoundBack className='w-[35px] h-[35px] text-white' />
//             </div> */}
//             <div className='cursor-pointer'>
//                          <IoMdArrowRoundBack className='w-[40px] h-[40px] text-white' 
//                          onClick={()=>dispatch(setSelectedUser(null))}
//                         />
//                        </div>

//             <div
//               className='w-[55px] h-[55px] rounded-full overflow-hidden cursor-pointer shrink-0'
//               onClick={() => navigate("/profile")}
//             >
//               <img src={selectedUser?.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>

//             <h1 className='text-white text-[22px] font-semibold'>{selectedUser?.name || "user"}</h1>
//           </div>

//           {/* Messages area */}
// {/*           
//           <div className='flex-col height-[550px] px-[20px]  py-[30px] flex-1 p-4 overflow-auto bg-gray-400  pt-[30px]'>
//             {/* Your messages will render here */}
//            {/* Your messages will render here */}

//     {showPicker && (
//        <div className='absolute bottom-[120px] '> <EmojiPicker width={250} height={350}
//             onEmojiClick={emojiClick}
//         /></div>
//     )}
//     {messages && messages.map((mess)=>{
//      return  mess.sender==userData._id?<Sender image={mess.image} message={mess.message}/>:<Receiver image={mess.image} message={mess.message}/>
//     })}
//     {/* <Sender/>
//     <Receiver/> */}
    
     
//           {/* </div> */} *
//           {/* Messages area */}
// <div className='flex-col px-[20px] py-[30px] flex-1 p-4 overflow-auto bg-gray-400 pt-[30px] pb-[120px]'>
  
//   {showPicker && (
//     <div className='absolute bottom-[120px]'>
//       <EmojiPicker width={250} height={350} onEmojiClick={emojiClick} />
//     </div>
//   )}

//   {messages && messages.map((mess, i) => {
//     return mess.sender == userData._id
//       ? <Sender key={i} image={mess.image} message={mess.message} />
//       : <Receiver key={i} image={mess.image} message={mess.message} />;
//   })}

//   <div ref={messagesEndRef} /> {/* ✅ auto-scroll anchor */}
// </div>
          
//           <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[5px] flex items-center justify-center rounded-full'>
//             <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[20px]'/ >
//         <form className='w-[95%] max-w-[90%] h-[60px] bg-[#148cad] shadow-gray-400 shadow-lg rounded-full
//         flex items-center gap-[10px]' onSubmit={handleSendMessage}> 
//               <div onClick={()=>setShowPicker(prev=>!prev)}>
//                 <RiEmojiStickerLine  className='h-[25px] w-[45px] text-white cursor-pointer'/>
                
//               </div>
//               <input type="file" accept='image/* ' ref={image} hidden onChange={handleImage}/>
//               <input type="text" placeholder='Message' className='h-full w-full px[30px]'
//               onChange={(e)=>setInput(e.target.value)}
//               value={input}/>
//               <div >
//               <FaImage  className='h-[20px] w-[20px] text-white cursor-pointer' 
//               onClick={()=>image.current.click()}/>
//               </div>
//               <button>
//                 <IoMdSend  className='h-[25px] w-[30px] text-white cursor-pointer'/>
//               </button>
//         </form>
//       </div>

//         </>
//       ) : (
//         /* No user selected — shown only on large screens */
//         <div className='flex items-center justify-center flex-1'>
//           <h1 className='text-gray-400 text-[40px] font-light text-center'>
//             Welcome to App Buzz
//           </h1>
//         </div>

//       )}
      
//     </div>

//   );
// }

// export default MessageArea;
import React, { useRef, useState, useEffect } from 'react'  // ✅ added useEffect
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png"
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RiEmojiStickerLine } from "react-icons/ri";
import { setSelectedUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaImage } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import Sender from './Sender';
import Receiver from './Receiver';
import axios from "axios"
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';

function MessageArea() {
  const { selectedUser, userData,socketi } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let messagesEndRef = useRef(null);  // ✅ added this
  let { messages } = useSelector(state => state.message)

  // ✅ auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImage = async (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(input.length==0 && backendImage==null )return ;
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData,
        { withCredentials: true }
      )
      dispatch(setMessages([...messages, result.data]))
      setInput("");
      setBackendImage(null);
      setFrontendImage(null);
    } catch (error) {
      console.log(error);
    }
  }

  const emojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    setShowPicker(false);
  }
  useEffect(()=>{
    if(!socketi)return;
    socketi.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]));
    })
    return ()=>socketi.off("newMessage")
  },[messages,setMessages])

  return (
    <div className={`lg:flex lg:w-[70%] w-full h-full flex-col border-l border-gray-200
      ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>

      {selectedUser ? (
        <>
          {/* Header */}
          <div className='w-full h-[80px] bg-[#148cad] rounded-b-[20px] shadow-gray-400 shadow-lg flex items-center gap-[15px] px-[15px] shrink-0'>
            <div className='cursor-pointer'>
              <IoMdArrowRoundBack className='w-[40px] h-[40px] text-white'
                onClick={() => dispatch(setSelectedUser(null))}
              />
            </div>
            <div
              className='w-[55px] h-[55px] rounded-full overflow-hidden cursor-pointer shrink-0'
              onClick={() => navigate("/profile")}
            >
              <img src={selectedUser?.image || dp} alt="" className='object-cover w-full h-full' />
            </div>
            <h1 className='text-white text-[22px] font-semibold'>{selectedUser?.name || "user"}</h1>
          </div>

          {/* Messages area */}
          <div className='flex-col px-[20px] py-[30px] flex-1 p-4 overflow-auto bg-gray-400 pt-[30px] pb-[120px]'>

            {showPicker && (
              <div className='absolute bottom-[120px]'>
                <EmojiPicker width={250} height={350} onEmojiClick={emojiClick} />
              </div>
            )}

            {messages && messages.map((mess, i) => {
              return mess.sender == userData._id
                ? <Sender key={i} image={mess.image} message={mess.message} />
                : <Receiver key={i} image={mess.image} message={mess.message} />;
            })}

            <div ref={messagesEndRef} /> {/* ✅ scroll anchor */}
          </div>

          {/* Input bar */}
          <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[5px] flex items-center justify-center rounded-full'>
            <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[20px]' />
            <form className='w-[95%] max-w-[90%] h-[60px] bg-[#148cad] shadow-gray-400 shadow-lg rounded-full
              flex items-center gap-[10px]' onSubmit={handleSendMessage}>
              <div onClick={() => setShowPicker(prev => !prev)}>
                <RiEmojiStickerLine className='h-[25px] w-[45px] text-white cursor-pointer' />
              </div>
              <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
              <input type="text" placeholder='Message' className='h-full w-full px-[30px]'
                onChange={(e) => setInput(e.target.value)}
                value={input} />
              <div>
                <FaImage className='h-[20px] w-[20px] text-white cursor-pointer'
                  onClick={() => image.current.click()} />
              </div>
              {(input.length>0 || backendImage!=null ) && <button>
                <IoMdSend className='h-[25px] w-[30px] text-white cursor-pointer' />
              </button>}
            </form>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center flex-1'>
          <h1 className='text-gray-400 text-[40px] font-light text-center'>
            Welcome to App Buzz
          </h1>
        </div>
      )}
    </div>
  );
}

export default MessageArea;