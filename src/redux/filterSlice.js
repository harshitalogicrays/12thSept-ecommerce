import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filters:[]},
    reducers:{
        filter_by_search(state,action){
            //products, search 
            const{allproducts,search}=action.payload
          let data=allproducts.filter(item=>item.name.includes(search) || item.category.includes(search))
          console.log(data)
          state.filters=data
        }
    }
})
export const {filter_by_search}=filterSlice.actions
export default filterSlice.reducer
export const selectfilters=(state)=>state.filter.filters