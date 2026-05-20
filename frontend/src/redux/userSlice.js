import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
        socketi:null,
        onlineUsers:null,
        searchData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
         setOthersUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setSocketi:(state,action)=>{
            state.socketi=action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        },
        setSearchData:(state,action)=>{
            state.searchData=action.payload
        }


    }

})
export const {setUserData,setOthersUsers,setSelectedUser,setSocketi,setOnlineUsers,setSearchData}=userSlice.actions
export default userSlice.reducer