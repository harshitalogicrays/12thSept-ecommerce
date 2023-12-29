import { createSlice } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"category",
    initialState:{categories:[]},
    reducers:{
        STORE_CATEGORY(state,action){
            state.categories=action.payload
        }
    }
})
export const {STORE_CATEGORY}=categorySlice.actions
export default categorySlice.reducer
export const selectcategories=(state)=>state.category.categories