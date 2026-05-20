
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from "axios"
// import dp from "../assets/dp.png"
// import { CiSearch } from "react-icons/ci";
// import { RxCross1 } from "react-icons/rx";
// import { CiLogout } from "react-icons/ci";
// import { setOthersUsers, setSelectedUser, setUserData,setSearchData } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../main';

// function SideBar() {
//   const { selectedUser, userData, otherUsers,onlineUsers,searchData  } = useSelector((state) => state.user);
//   const [search, setSearch] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [input,setInput]=useState("");
//   const handleLogOut = async () => {
//     try {
//       dispatch(setOthersUsers(null));
//       dispatch(setUserData(null));
//       navigate("/login");
//     } catch (error) {}
//   };
//    const handleSearch = async () => {
//     try {
//       let result=await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true});
//       dispatch(setSearchData(result.data));
//       console.log(result);
      
      
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(()=>{
//      if(input){
//       handleSearch();
//      }
     
//   },[input])


//   return (
//     // KEY FIX: Always show on lg screens. On mobile, hide only when a user is selected.
//     <div className={`lg:w-[30%] w-full h-full bg-slate-200 flex-col gap-[20px] 
//       ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>

//       {/* Header */}
//       <div className='w-full h-[300px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col gap-[20px] justify-center px-[10px]'>
//         <h1 className='text-white font-bold text-[25px]'>App Buzz</h1>

//         <div className='flex items-center justify-between w-full'>
//           <h1 className='text-black font-bold text-[25px]'>Hii, {userData?.name || "user"}</h1>
//           <div
//             className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'
//             onClick={() => navigate("/profile")}
//           >
//             <img src={userData?.image || dp} alt="" className='object-cover w-full h-full' />
//           </div>
//         </div>

//         <div className='flex items-center w-full gap-[20px]'>
//           {!search && (
//             <div
//               className='w-[30px] h-[30px] bg-white cursor-pointer rounded-full flex items-center justify-center'
//               onClick={() => setSearch(true)}
//             >
//               <CiSearch className='w-[20px] h-[20px]' />
//             </div>
//           )}

//           {search && (
//             <div className='flex w-full h-[40px] bg-white rounded-full items-center px-3 gap-2'>
//               <CiSearch className='w-[20px] h-[20px] shrink-0' />
//               <input
//                 type="text"
//                 placeholder='search users..'
//                 className='flex-1 min-w-0 text-sm bg-transparent outline-none' 
//                 onChange={(e)=>setInput(e.target.value)} value={input}
//               />
//               <RxCross1
//                 className='w-[20px] h-[20px] shrink-0 cursor-pointer'
//                 onClick={() => setSearch(false)}
//               />
//               <div>
//                 {searchData?.map((user)=>(
                  
//                     <div>
//                        <div
//             key={user._id}
//             className='w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-gray-400 shadow-sm bg-white rounded-full px-3 cursor-pointer'
//             onClick={() => dispatch(setSelectedUser(user))}
//           >
//          <div className='relative rounded-full'>       
//          <div key={user._id} className='w-[50px] h-[50px] rounded-full overflow-hidden'>
//               <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>
//            {onlineUsers?.includes(user._id) &&    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
// }</div>
            
//             <h1 className='font-medium'>{user.name || "user"}</h1>
//           </div>
                      
//                       </div>
            
//           )}

//           {!search && otherUsers?.map((user) => (
//             onlineUsers?.includes(user._id) && 
//             <div className='relative rounded-full'>  
//             <div key={user._id} className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}
//               >
//               <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>
//             <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
//             </div>
            
//           ))}
//         </div>
//       </div>

//       {/* User List */}
//       <div className='w-full flex-1 overflow-auto flex flex-col gap-[15px] px-2'>
//         {otherUsers?.map((user) => (
          
//           <div
//             key={user._id}
//             className='w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-gray-400 shadow-sm bg-white rounded-full px-3 cursor-pointer'
//             onClick={() => dispatch(setSelectedUser(user))}
//           >
//          <div className='relative rounded-full'>       
//          <div key={user._id} className='w-[50px] h-[50px] rounded-full overflow-hidden'>
//               <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//             </div>
//            {onlineUsers?.includes(user._id) &&    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
// }</div>
            
//             <h1 className='font-medium'>{user.name || "user"}</h1>
//           </div>
//         ))}

//         <div
//           className='w-[40px] h-[40px] bg-[#19cdff] cursor-pointer rounded-full flex items-center justify-center mt-2'
//           onClick={handleLogOut}
//         >
//           <CiLogout className='w-[22px] h-[22px] text-white' />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SideBar;
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from "axios"
// import dp from "../assets/dp.png"
// import { CiSearch } from "react-icons/ci";
// import { RxCross1 } from "react-icons/rx";
// import { CiLogout } from "react-icons/ci";
// import { setOthersUsers, setSelectedUser, setUserData, setSearchData } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../main';

// function SideBar() {
//   const { selectedUser, userData, otherUsers, onlineUsers, searchData } = useSelector((state) => state.user);
//   const [search, setSearch] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [input, setInput] = useState("");

//   const handleLogOut = async () => {
//     try {
//       dispatch(setOthersUsers(null));
//       dispatch(setUserData(null));
//       navigate("/login");
//     } catch (error) {}
//   };

//   const handleSearch = async () => {
//     try {
//       let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true });
//       dispatch(setSearchData(result.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ Clear search results when search bar is closed
//   const handleCloseSearch = () => {
//     setSearch(false);
//     setInput("");
//     dispatch(setSearchData([]));
//   };

//   // ✅ Select user and reset input
//   const handleSelectUser = (user) => {
//     dispatch(setSelectedUser(user));
//     setInput("");
//     dispatch(setSearchData([]));
//     setSearch(false);
//   };

//   useEffect(() => {
//     if (input) {
//       handleSearch();
//     } else {
//       dispatch(setSearchData([])); // clear results when input is empty
//     }
//   }, [input]);

//   return (
//     <div className={`lg:w-[30%] w-full h-full bg-slate-200 flex-col gap-[20px] 
//       ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>

//       {/* Header */}
//       <div className='w-full h-[300px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col gap-[20px] justify-center px-[10px]'>
//         <h1 className='text-white font-bold text-[25px]'>App Buzz</h1>

//         <div className='flex items-center justify-between w-full'>
//           <h1 className='text-black font-bold text-[25px]'>Hii, {userData?.name || "user"}</h1>
//           <div
//             className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'
//             onClick={() => navigate("/profile")}
//           >
//             <img src={userData?.image || dp} alt="" className='object-cover w-full h-full' />
//           </div>
//         </div>

//         <div className='flex items-center w-full gap-[20px]'>
//           {!search && (
//             <div
//               className='w-[30px] h-[30px] bg-white cursor-pointer rounded-full flex items-center justify-center'
//               onClick={() => setSearch(true)}
//             >
//               <CiSearch className='w-[20px] h-[20px]' />
//             </div>
//           )}

//           {/* ✅ Search input bar - standalone, no children */}
//           {search && (
//             <div className='flex w-full h-[40px] bg-white rounded-full items-center px-3 gap-2'>
//               <CiSearch className='w-[20px] h-[20px] shrink-0' />
//               <input
//                 type="text"
//                 placeholder='search users..'
//                 className='flex-1 min-w-0 text-sm bg-transparent outline-none'
//                 onChange={(e) => setInput(e.target.value)}
//                 value={input}
//               />
//               <RxCross1
//                 className='w-[20px] h-[20px] shrink-0 cursor-pointer'
//                 onClick={handleCloseSearch}
//               />
//             </div>
//           )}

//           {/* Online users avatars - only when not searching */}
//           {!search && otherUsers?.map((user) => (
//             onlineUsers?.includes(user._id) &&
//             <div key={user._id} className='relative rounded-full'>
//               <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer'
//                 onClick={() => dispatch(setSelectedUser(user))}>
//                 <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//               </div>
//               <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
//             </div>
//           ))}
//         </div>

//         {/* ✅ Search results dropdown - OUTSIDE the input bar, INSIDE the header */}
//         {search && searchData?.length > 0 && (
//           <div className='w-full flex flex-col gap-[8px] max-h-[200px] overflow-auto bg-white rounded-2xl px-2 py-2 shadow-lg'>
//             {searchData.map((user) => (
//               <div
//                 key={user._id}
//                 className='w-full h-[50px] flex justify-start items-center gap-[15px] hover:bg-slate-100 rounded-full px-3 cursor-pointer'
//                 onClick={() => handleSelectUser(user)}
//               >
//                 <div className='relative rounded-full'>
//                   <div className='w-[38px] h-[38px] rounded-full overflow-hidden'>
//                     <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//                   </div>
//                   {onlineUsers?.includes(user._id) &&
//                     <span className='w-[10px] h-[10px] rounded-full absolute bottom-[1px] right-[-1px] bg-[#084608]'></span>
//                   }
//                 </div>
//                 <h1 className='text-sm font-medium'>{user.name || "user"}</h1>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* User List */}
//       <div className='w-full flex-1 overflow-auto flex flex-col gap-[15px] px-2'>
//         {otherUsers?.map((user) => (
//           <div
//             key={user._id}
//             className='w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-gray-400 shadow-sm bg-white rounded-full px-3 cursor-pointer'
//             onClick={() => dispatch(setSelectedUser(user))}
//           >
//             <div className='relative rounded-full'>
//               <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
//                 <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
//               </div>
//               {onlineUsers?.includes(user._id) &&
//                 <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
//               }
//             </div>
//             <h1 className='font-medium'>{user.name || "user"}</h1>
//           </div>
//         ))}

//         <div
//           className='w-[40px] h-[40px] bg-[#19cdff] cursor-pointer rounded-full flex items-center justify-center mt-2'
//           onClick={handleLogOut}
//         >
//           <CiLogout className='w-[22px] h-[22px] text-white' />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import dp from "../assets/dp.png"
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { setOthersUsers, setSelectedUser, setUserData, setSearchData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';

function SideBar() {
  const { selectedUser, userData, otherUsers, onlineUsers, searchData } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleLogOut = async () => {
    try {
      dispatch(setOthersUsers(null));
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {}
  };

  const handleSearch = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true });
      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSearch = () => {
    setSearch(false);
    setInput("");
    dispatch(setSearchData([]));
  };

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
    setInput("");
    dispatch(setSearchData([]));
    setSearch(false);
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    } else {
      dispatch(setSearchData([]));
    }
  }, [input]);

  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 flex-col gap-[20px] overflow-y-auto
      ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>

      {/* Header */}
      <div className='w-full h-[300px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col gap-[20px] justify-center px-[10px] shrink-0'>
        <h1 className='text-white font-bold text-[25px]'>App Buzz</h1>

        <div className='flex items-center justify-between w-full'>
          <h1 className='text-black font-bold text-[25px]'>Hii, {userData?.name || "user"}</h1>
          <div
            className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer'
            onClick={() => navigate("/profile")}
          >
            <img src={userData?.image || dp} alt="" className='object-cover w-full h-full' />
          </div>
        </div>

        <div className='flex items-center w-full gap-[20px]'>
          {!search && (
            <div
              className='w-[30px] h-[30px] bg-white cursor-pointer rounded-full flex items-center justify-center'
              onClick={() => setSearch(true)}
            >
              <CiSearch className='w-[20px] h-[20px]' />
            </div>
          )}

          {search && (
            <div className='flex w-full h-[40px] bg-white rounded-full items-center px-3 gap-2'>
              <CiSearch className='w-[20px] h-[20px] shrink-0' />
              <input
                type="text"
                placeholder='search users..'
                className='flex-1 min-w-0 text-sm bg-transparent outline-none'
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross1
                className='w-[20px] h-[20px] shrink-0 cursor-pointer'
                onClick={handleCloseSearch}
              />
            </div>
          )}

          {!search && otherUsers?.map((user) => (
            onlineUsers?.includes(user._id) &&
            <div key={user._id} className='relative rounded-full'>
              <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer'
                onClick={() => dispatch(setSelectedUser(user))}>
                <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
              </div>
              <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Results OR User List */}
      {search && searchData?.length > 0 ? (
        <div className='w-full flex flex-col gap-[10px] px-2 pb-4'>
          {searchData.map((user) => (
            <div
              key={user._id}
              className='w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-gray-400 shadow-sm bg-white rounded-full px-3 cursor-pointer'
              onClick={() => handleSelectUser(user)}
            >
              <div className='relative rounded-full'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                  <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
                </div>
                {onlineUsers?.includes(user._id) &&
                  <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
                }
              </div>
              <h1 className='font-medium'>{user.name || user.username || "unknown"}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full flex flex-col gap-[15px] px-2 pb-4'>
          {otherUsers?.map((user) => (
            <div
              key={user._id}
              className='w-[95%] h-[50px] flex justify-start items-center gap-[20px] shadow-gray-400 shadow-sm bg-white rounded-full px-3 cursor-pointer'
              onClick={() => dispatch(setSelectedUser(user))}
            >
              <div className='relative rounded-full'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                  <img src={user.image || dp} alt="" className='object-cover w-full h-full' />
                </div>
                {onlineUsers?.includes(user._id) &&
                  <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#084608]'></span>
                }
              </div>
              <h1 className='font-medium'>{user.name || "user"}</h1>
            </div>
          ))}

          <div
            className='w-[40px] h-[40px] bg-[#19cdff] cursor-pointer rounded-full flex items-center justify-center mt-2'
            onClick={handleLogOut}
          >
            <CiLogout className='w-[22px] h-[22px] text-white' />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;