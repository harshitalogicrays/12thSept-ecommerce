import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{checkouts:[]},
    reducers:{
        store_checkout(state,action){
            state.checkouts=action.payload
        }
    }
})
export const {store_checkout}=checkoutSlice.actions
export default checkoutSlice.reducer
export const selectcheckouts=(state)=>state.checkout.checkouts