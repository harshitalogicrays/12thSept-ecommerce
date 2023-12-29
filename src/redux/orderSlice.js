import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"order",
    initialState:{orders:[]},
    reducers:{
        store_order(state,action){
            state.orders=action.payload
        }
    }
})
export const {store_order}=orderSlice.actions
export default orderSlice.reducer
export const selectorders=(state)=>state.order.orders