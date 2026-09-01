
// import React, { useRef, useState, useEffect } from 'react'  // ✅ added useEffect
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
// import { MdAutoAwesome } from "react-icons/md";
// function MessageArea() {
//   const { selectedUser, userData,socketi } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let [showPicker, setShowPicker] = useState(false);
//   let [input, setInput] = useState("");
//   let [frontendImage, setFrontendImage] = useState(null);
//   let [backendImage, setBackendImage] = useState(null);
//   let [suggestions, setSuggestions] = useState([]);
//   let [loadingSug, setLoadingSug] = useState(false);
//   let image = useRef();
//   let messagesEndRef = useRef(null);
//   let { messages } = useSelector(state => state.message)

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleImage = async (e) => {
//     let file = e.target.files[0];
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//   }

//   const fetchSuggestions = async () => {
//     if (!selectedUser) return;
//     setLoadingSug(true);
//     try {
//       let result = await axios.get(
//         `${serverUrl}/api/ai/suggest-replies/${selectedUser._id}`,
//         { withCredentials: true }
//       );
//       setSuggestions(result.data.suggestions || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingSug(false);
//     }
//   }

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if(input.length==0 && backendImage==null )return ;
//     try {
//       let formData = new FormData();
//       formData.append("message", input);
//       if (backendImage) {
//         formData.append("image", backendImage);
//       }
//       let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData,
//         { withCredentials: true }
//       )
//       dispatch(setMessages([...messages, result.data]))
//       setInput("");
//       setBackendImage(null);
//       setFrontendImage(null);
//       setSuggestions([]);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const emojiClick = (emojiData) => {
//     setInput(prevInput => prevInput + emojiData.emoji)
//     setShowPicker(false);
//   }

//   useEffect(()=>{
//     if(!socketi)return;
//     socketi.on("newMessage",(mess)=>{
//       dispatch(setMessages([...messages,mess]));
//     })
//     return ()=>socketi.off("newMessage")
//   },[messages,setMessages])

//   useEffect(() => {
//     setSuggestions([]);
//   }, [selectedUser]);

//   return (
//     <div className={`lg:flex lg:w-[70%] w-full h-full flex-col border-l border-gray-200
//       ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>

//       {selectedUser ? (
//         <>
//           {/* Header */}
//           <div className='w-full h-[80px] bg-[#148cad] rounded-b-[20px] shadow-gray-400 shadow-lg flex items-center gap-[15px] px-[15px] shrink-0'>
//             <div className='cursor-pointer'>
//               <IoMdArrowRoundBack className='w-[40px] h-[40px] text-white'
//                 onClick={() => dispatch(setSelectedUser(null))}
//               />
//             </div>
//             <div
//               className='w-[55px] h-[55px] rounded-full overflow-hidden cursor-pointer shrink-0'
//               onClick={() => navigate("/profile")}
//             >
//               <img src={selectedUser?.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>
//             <h1 className='text-white text-[22px] font-semibold'>{selectedUser?.name || "user"}</h1>
//           </div>

//           {/* Messages area */}
//           <div className='flex-col px-[20px] py-[30px] flex-1 p-4 overflow-auto bg-gray-400 pt-[30px] pb-[120px]'>

//             {showPicker && (
//               <div className='absolute bottom-[120px]'>
//                 <EmojiPicker width={250} height={350} onEmojiClick={emojiClick} />
//               </div>
//             )}

//             {messages && messages.map((mess, i) => {
//               return mess.sender == userData._id
//                 ? <Sender key={i} image={mess.image} message={mess.message} />
//                 : <Receiver key={i} image={mess.image} message={mess.message} />;
//             })}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input bar */}
//           <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[5px] flex items-center justify-center rounded-full'>
//             <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[20px]' />

//             {/* ✅ NAYA: suggestion chips */}
//             {suggestions.length > 0 && (
//               <div className='absolute bottom-[115px] w-[90%] flex gap-2 flex-wrap justify-center'>
//                 {suggestions.map((s, i) => (
//                   <button
//                     key={i}
//                     type="button"
//                     onClick={() => { setInput(s); setSuggestions([]); }}
//                     className='bg-white text-[#148cad] text-sm px-3 py-1 rounded-full shadow-md hover:bg-gray-100'
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* ✅ NAYA: loading indicator */}
//             {loadingSug && (
//               <div className='absolute bottom-[115px] text-white text-sm'>Loading suggestions...</div>
//             )}

//             <form className='w-[95%] max-w-[90%] h-[60px] bg-[#148cad] shadow-gray-400 shadow-lg rounded-full
//               flex items-center gap-[10px]' onSubmit={handleSendMessage}>
//               <div onClick={() => setShowPicker(prev => !prev)}>
//                 <RiEmojiStickerLine className='h-[25px] w-[45px] text-white cursor-pointer' />
//               </div>

//               {/* ✅ NAYA: suggest button */}
//               <div onClick={fetchSuggestions} className='cursor-pointer'>
//                 <MdAutoAwesome className='h-[22px] w-[35px] text-white' />
//               </div>

//               <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
//               <input type="text" placeholder='Message' className='h-full w-full px-[30px]'
//                 onChange={(e) => setInput(e.target.value)}
//                 value={input} />
//               <div>
//                 <FaImage className='h-[20px] w-[20px] text-white cursor-pointer'
//                   onClick={() => image.current.click()} />
//               </div>
//               {(input.length>0 || backendImage!=null ) && <button>
//                 <IoMdSend className='h-[25px] w-[30px] text-white cursor-pointer' />
//               </button>}
//             </form>
//           </div>
//         </>
//       ) : (
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
// import React, { useRef, useState, useEffect } from 'react'
// import { IoMdArrowRoundBack } from "react-icons/io";
// import dp from "../assets/dp.png"
// import { IoMdSend } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { RiEmojiStickerLine } from "react-icons/ri";
// import { setSelectedUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { FaImage } from "react-icons/fa";
// import { FaSearch } from "react-icons/fa";
// import EmojiPicker from 'emoji-picker-react';
// import Sender from './Sender';
// import Receiver from './Receiver';
// import axios from "axios"
// import { serverUrl } from '../main';
// import { setMessages } from '../redux/messageSlice';
// import { MdAutoAwesome } from "react-icons/md";
// function MessageArea() {
//   const { selectedUser, userData,socketi } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let [showPicker, setShowPicker] = useState(false);
//   let [input, setInput] = useState("");
//   let [frontendImage, setFrontendImage] = useState(null);
//   let [backendImage, setBackendImage] = useState(null);
//   let [suggestions, setSuggestions] = useState([]);
//   let [loadingSug, setLoadingSug] = useState(false);
//   let [showSearch, setShowSearch] = useState(false);
//   let [searchQuery, setSearchQuery] = useState("");
//   let [searchResults, setSearchResults] = useState([]);
//   let [searching, setSearching] = useState(false);
//   let image = useRef();
//   let messagesEndRef = useRef(null);
//   let { messages } = useSelector(state => state.message)

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleImage = async (e) => {
//     let file = e.target.files[0];
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//   }

//   const fetchSuggestions = async () => {
//     if (!selectedUser) return;
//     setLoadingSug(true);
//     try {
//       let result = await axios.get(
//         `${serverUrl}/api/ai/suggest-replies/${selectedUser._id}`,
//         { withCredentials: true }
//       );
//       setSuggestions(result.data.suggestions || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingSug(false);
//     }
//   }

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim() || !selectedUser) return;
//     setSearching(true);
//     try {
//       let result = await axios.post(
//         `${serverUrl}/api/ai/search-messages/${selectedUser._id}`,
//         { query: searchQuery },
//         { withCredentials: true }
//       );
//       setSearchResults(result.data.results || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSearching(false);
//     }
//   }

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if(input.length==0 && backendImage==null )return ;
//     try {
//       let formData = new FormData();
//       formData.append("message", input);
//       if (backendImage) {
//         formData.append("image", backendImage);
//       }
//       let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData,
//         { withCredentials: true }
//       )
//       dispatch(setMessages([...messages, result.data]))
//       setInput("");
//       setBackendImage(null);
//       setFrontendImage(null);
//       setSuggestions([]);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const emojiClick = (emojiData) => {
//     setInput(prevInput => prevInput + emojiData.emoji)
//     setShowPicker(false);
//   }

//   useEffect(()=>{
//     if(!socketi)return;
//     socketi.on("newMessage",(mess)=>{
//       dispatch(setMessages([...messages,mess]));
//     })
//     return ()=>socketi.off("newMessage")
//   },[messages,setMessages])

//   useEffect(() => {
//     setSuggestions([]);
//   }, [selectedUser]);

//   useEffect(() => {
//     setShowSearch(false);
//     setSearchQuery("");
//     setSearchResults([]);
//   }, [selectedUser]);

//   return (
//     <div className={`lg:flex lg:w-[70%] w-full h-full flex-col border-l border-gray-200
//       ${selectedUser ? 'flex' : 'hidden lg:flex'}`}>

//       {selectedUser ? (
//         <>
//           {/* Header */}
//           <div className='w-full h-[80px] bg-[#148cad] rounded-b-[20px] shadow-gray-400 shadow-lg flex items-center gap-[15px] px-[15px] shrink-0'>
//             <div className='cursor-pointer'>
//               <IoMdArrowRoundBack className='w-[40px] h-[40px] text-white'
//                 onClick={() => dispatch(setSelectedUser(null))}
//               />
//             </div>
//             <div
//               className='w-[55px] h-[55px] rounded-full overflow-hidden cursor-pointer shrink-0'
//               onClick={() => navigate("/profile")}
//             >
//               <img src={selectedUser?.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>
//             <h1 className='text-white text-[22px] font-semibold'>{selectedUser?.name || "user"}</h1>

//             {/* ✅ NAYA: search icon */}
//             <div className='ml-auto cursor-pointer' onClick={() => setShowSearch(prev => !prev)}>
//               <FaSearch className='h-[20px] w-[20px] text-white' />
//             </div>
//           </div>

//           {/* ✅ NAYA: search bar + results */}
//           {showSearch && (
//             <div className='w-full bg-gray-100 px-[15px] py-[10px] shrink-0'>
//               <form onSubmit={handleSearch} className='flex gap-2'>
//                 <input
//                   type="text"
//                   placeholder="Search messages..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className='flex-1 px-3 py-2 rounded-full border border-gray-300 outline-none'
//                 />
//                 <button type="submit" className='bg-[#148cad] text-white px-4 rounded-full'>
//                   Search
//                 </button>
//               </form>

//               {searching && <p className='text-sm text-gray-500 mt-2'>Searching...</p>}

//               {searchResults.length > 0 && (
//                 <div className='mt-3 max-h-[200px] overflow-y-auto flex flex-col gap-2'>
//                   {searchResults.map((r) => (
//                     <div key={r._id} className='bg-white p-2 rounded-lg shadow text-sm'>
//                       <p>{r.message}</p>
//                       <p className='text-xs text-gray-400 mt-1'>
//                         {new Date(r.createdAt).toLocaleString()} · match: {(r.score * 100).toFixed(0)}%
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {!searching && searchQuery && searchResults.length === 0 && (
//                 <p className='text-sm text-gray-500 mt-2'>No matches found</p>
//               )}
//             </div>
//           )}

//           {/* Messages area */}
//           <div className='flex-col px-[20px] py-[30px] flex-1 p-4 overflow-auto bg-gray-400 pt-[30px] pb-[120px]'>

//             {showPicker && (
//               <div className='absolute bottom-[120px]'>
//                 <EmojiPicker width={250} height={350} onEmojiClick={emojiClick} />
//               </div>
//             )}

//             {messages && messages.map((mess, i) => {
//               return mess.sender == userData._id
//                 ? <Sender key={i} image={mess.image} message={mess.message} />
//                 : <Receiver key={i} image={mess.image} message={mess.message} />;
//             })}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input bar */}
//           <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[5px] flex items-center justify-center rounded-full'>
//             <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[20px]' />

//             {suggestions.length > 0 && (
//               <div className='absolute bottom-[115px] w-[90%] flex gap-2 flex-wrap justify-center'>
//                 {suggestions.map((s, i) => (
//                   <button
//                     key={i}
//                     type="button"
//                     onClick={() => { setInput(s); setSuggestions([]); }}
//                     className='bg-white text-[#148cad] text-sm px-3 py-1 rounded-full shadow-md hover:bg-gray-100'
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {loadingSug && (
//               <div className='absolute bottom-[115px] text-white text-sm'>Loading suggestions...</div>
//             )}

//             <form className='w-[95%] max-w-[90%] h-[60px] bg-[#148cad] shadow-gray-400 shadow-lg rounded-full
//               flex items-center gap-[10px]' onSubmit={handleSendMessage}>
//               <div onClick={() => setShowPicker(prev => !prev)}>
//                 <RiEmojiStickerLine className='h-[25px] w-[45px] text-white cursor-pointer' />
//               </div>

//               <div onClick={fetchSuggestions} className='cursor-pointer'>
//                 <MdAutoAwesome className='h-[22px] w-[35px] text-white' />
//               </div>

//               <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
//               <input type="text" placeholder='Message' className='h-full w-full px-[30px]'
//                 onChange={(e) => setInput(e.target.value)}
//                 value={input} />
//               <div>
//                 <FaImage className='h-[20px] w-[20px] text-white cursor-pointer'
//                   onClick={() => image.current.click()} />
//               </div>
//               {(input.length>0 || backendImage!=null ) && <button>
//                 <IoMdSend className='h-[25px] w-[30px] text-white cursor-pointer' />
//               </button>}
//             </form>
//           </div>
//         </>
//       ) : (
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
import React, { useRef, useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png"
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RiEmojiStickerLine } from "react-icons/ri";
import { setSelectedUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaImage } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import Sender from './Sender';
import Receiver from './Receiver';
import axios from "axios"
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';
import { MdAutoAwesome } from "react-icons/md";
function MessageArea() {
  const { selectedUser, userData,socketi } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let [suggestions, setSuggestions] = useState([]);
  let [loadingSug, setLoadingSug] = useState(false);
  let [showSearch, setShowSearch] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  let [searching, setSearching] = useState(false);
  let [showSummary, setShowSummary] = useState(false);
  let [summaryText, setSummaryText] = useState("");
  let [loadingSummary, setLoadingSummary] = useState(false);
  let image = useRef();
  let messagesEndRef = useRef(null);
  let { messages } = useSelector(state => state.message)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImage = async (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  const fetchSuggestions = async () => {
    if (!selectedUser) return;
    setLoadingSug(true);
    try {
      let result = await axios.get(
        `${serverUrl}/api/ai/suggest-replies/${selectedUser._id}`,
        { withCredentials: true }
      );
      setSuggestions(result.data.suggestions || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSug(false);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !selectedUser) return;
    setSearching(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/ai/search-messages/${selectedUser._id}`,
        { query: searchQuery },
        { withCredentials: true }
      );
      setSearchResults(result.data.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }

  const fetchSummary = async () => {
    if (!selectedUser) return;
    setShowSummary(true);
    setLoadingSummary(true);
    try {
      let result = await axios.get(
        `${serverUrl}/api/ai/summarize/${selectedUser._id}`,
        { withCredentials: true }
      );
      setSummaryText(result.data.summary || "No summary available.");
    } catch (error) {
      console.log(error);
      setSummaryText("Could not generate summary.");
    } finally {
      setLoadingSummary(false);
    }
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
      setSuggestions([]);
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

  useEffect(() => {
    setSuggestions([]);
  }, [selectedUser]);

  useEffect(() => {
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowSummary(false);
    setSummaryText("");
  }, [selectedUser]);

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

            {/* ✅ NAYA: icons right side, dono ek saath */}
            <div className='ml-auto flex items-center gap-4'>
              <div className='cursor-pointer' onClick={fetchSummary}>
                <MdSummarize className='h-[22px] w-[22px] text-white' />
              </div>
              <div className='cursor-pointer' onClick={() => setShowSearch(prev => !prev)}>
                <FaSearch className='h-[20px] w-[20px] text-white' />
              </div>
            </div>
          </div>

          {/* ✅ NAYA: summary card */}
          {showSummary && (
            <div className='w-full bg-yellow-50 px-[15px] py-[10px] shrink-0 border-b border-yellow-200'>
              <div className='flex justify-between items-center mb-1'>
                <p className='font-semibold text-sm text-gray-700'>Conversation Summary</p>
                <button onClick={() => setShowSummary(false)} className='text-gray-500 text-sm'>✕</button>
              </div>
              {loadingSummary ? (
                <p className='text-sm text-gray-500'>Generating summary...</p>
              ) : (
                <p className='text-sm text-gray-700 whitespace-pre-line'>{summaryText}</p>
              )}
            </div>
          )}

          {/* search bar + results */}
          {showSearch && (
            <div className='w-full bg-gray-100 px-[15px] py-[10px] shrink-0'>
              <form onSubmit={handleSearch} className='flex gap-2'>
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 px-3 py-2 rounded-full border border-gray-300 outline-none'
                />
                <button type="submit" className='bg-[#148cad] text-white px-4 rounded-full'>
                  Search
                </button>
              </form>

              {searching && <p className='text-sm text-gray-500 mt-2'>Searching...</p>}

              {searchResults.length > 0 && (
                <div className='mt-3 max-h-[200px] overflow-y-auto flex flex-col gap-2'>
                  {searchResults.map((r) => (
                    <div key={r._id} className='bg-white p-2 rounded-lg shadow text-sm'>
                      <p>{r.message}</p>
                      <p className='text-xs text-gray-400 mt-1'>
                        {new Date(r.createdAt).toLocaleString()} · match: {(r.score * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {!searching && searchQuery && searchResults.length === 0 && (
                <p className='text-sm text-gray-500 mt-2'>No matches found</p>
              )}
            </div>
          )}

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

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[5px] flex items-center justify-center rounded-full'>
            <img src={frontendImage} alt="" className='w-[100px] absolute bottom-[100px] right-[20px]' />

            {suggestions.length > 0 && (
              <div className='absolute bottom-[115px] w-[90%] flex gap-2 flex-wrap justify-center'>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setInput(s); setSuggestions([]); }}
                    className='bg-white text-[#148cad] text-sm px-3 py-1 rounded-full shadow-md hover:bg-gray-100'
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loadingSug && (
              <div className='absolute bottom-[115px] text-white text-sm'>Loading suggestions...</div>
            )}

            <form className='w-[95%] max-w-[90%] h-[60px] bg-[#148cad] shadow-gray-400 shadow-lg rounded-full
              flex items-center gap-[10px]' onSubmit={handleSendMessage}>
              <div onClick={() => setShowPicker(prev => !prev)}>
                <RiEmojiStickerLine className='h-[25px] w-[45px] text-white cursor-pointer' />
              </div>

              <div onClick={fetchSuggestions} className='cursor-pointer'>
                <MdAutoAwesome className='h-[22px] w-[35px] text-white' />
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