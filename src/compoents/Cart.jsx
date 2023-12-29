import React, { useEffect } from 'react'

import {FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart, calculate_total, decrease, empty_cart, remove_From_cart, save_url, selectCartItems, selectTotalAmount } from '../redux/cartSlice'
import { selectIsLoggedIn } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectTotalAmount)
  const isLoggedIn=useSelector(selectIsLoggedIn)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    useEffect(()=>{
      dispatch(calculate_total())
    },[cartItems])
    let url=window.location.href
    let checkout=()=>{
      if(isLoggedIn){navigate('/checkout-details')}
      else {
        dispatch(save_url(url))
        navigate('/login')
      }
    }
  return (
    <div className='container mt-5 shadow'>
        <h1>Cart Page</h1><hr/>
        <div
          class="table-responsive"
        >
          <table
            class="table table-bordered table-striped"
          >
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th>price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length==0 && <tr><td colSpan={7}>No Item added </td></tr>}
              {cartItems.map((c,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{c.name}</td>
                <td><img src={c.image} height='50px' width='50px'/></td>
                <td>{c.price}</td>
                <td>
                  <button onClick={()=>dispatch(decrease(c))} >-</button>
                  <input type="text" value={c.cartQuantity}  style={{width:'40px',textAlign:'center'}}/>
                  <button onClick={()=>dispatch(add_to_cart(c))}>+</button>
                  </td>
                <td>{c.price * c.cartQuantity}</td>
                <td><button
                  type="button"
                  class="btn btn-danger"  onClick={()=>dispatch(remove_From_cart(i))}
                >
                  <FaTrash/>
                </button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
          <div className="row p-2">
            <div className="col-8">
              <button
                type="button"
                class="btn btn-danger btn-lg" onClick={()=>dispatch(empty_cart())}
              >
                Empty Cart
              </button>
              
            </div>
            <div className="col-4">
              <div className="card p-2">
                <h4>Total:<span class="float-end">${totalAmount}</span></h4>
                <hr/>
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    name=""
                    id=""
                    class="btn btn-warning" onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
                
              </div>
            </div>
            </div>      
    </div>
  )
}

export default Cart
