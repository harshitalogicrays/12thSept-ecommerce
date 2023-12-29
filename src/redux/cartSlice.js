import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const cartSlice=createSlice({
  name:'cart',
  initialState:{cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :[],
  totalAmount:localStorage.getItem("total") ? localStorage.getItem("total")  : 0,previousURL:''},
  reducers:{
    add_to_cart(state,action){
      const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id) 
      if(action.payload.stock >0){
        if(itemIndex== - 1){ //add         
          state.cartItems.push({...action.payload,cartQuantity:1})
          toast.success(`${action.payload.name} added to cart`)
      }
      else {//increase 
        if( state.cartItems[itemIndex].cartQuantity < action.payload.stock)
            state.cartItems[itemIndex].cartQuantity+=1
        else
          toast.info(`only ${action.payload.stock} available`) 
      }
    }
    else {
      toast.error(`${action.payload.name} out of stock`)
    }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    decrease(state,action){
      const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id) 
      if( state.cartItems[itemIndex].cartQuantity > 1)
            state.cartItems[itemIndex].cartQuantity-=1
        else
          state.cartItems[itemIndex].cartQuantity=1
    localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    remove_From_cart(state,action){ state.cartItems.splice(action.payload,1)
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    empty_cart(state,action){
      state.cartItems=[]
      state.totalAmount=0;
      localStorage.removeItem("cartItems")
    },
   
      calculate_total(state,action){
        let t = state.cartItems.reduce((prev,item)=>{return prev += item.price * item.cartQuantity},0)
            state.totalAmount=t
    },
    save_url(state,action){
      console.log(action.payload)
      state.previousURL=action.payload}
  }
})
export const {add_to_cart,decrease,remove_From_cart,empty_cart,calculate_total,save_url}=cartSlice.actions
export default cartSlice.reducer
export const selectCartItems=(state)=>state.cart.cartItems
export const selectTotalAmount=(state)=>state.cart.totalAmount
export const selectURL=(state)=>state.cart.previousURL