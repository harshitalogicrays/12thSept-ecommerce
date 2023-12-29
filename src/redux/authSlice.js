import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,userEmail:null,userRole:null,userName:null,userId:null},
    reducers:{
        loginuser(state,action){
            let {userEmail,userId,userName,userRole}=action.payload
            state.isLoggedIn=true
            state.userEmail=userEmail
            state.userRole=userRole
            state.userName=userName
            state.userId=userId
        },
        logoutuser(state,action){
            state.isLoggedIn=false
            state.userEmail=null
            state.userRole=null
            state.userName=null
            state.userId=null
        }
    }
})
export const {loginuser,logoutuser}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectUserEmail=state=>state.auth.userEmail
export const selectUserName=state=>state.auth.userName
export const selectUserRole=state=>state.auth.userRole
export const selectUserId=state=>state.auth.userId