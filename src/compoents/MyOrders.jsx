import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../redux/authSlice'
import { selectorders, store_order } from '../redux/orderSlice'
import Loader from './Loader'

const MyOrders = () => {
    const{data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_order(data))
    },[data])

    const orders=useSelector(selectorders)
    const userId=useSelector(selectUserId)
   const myorders = orders.filter((item,i)=>item.userId==userId)
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    {myorders.length == 0 ?  <>No Orders</>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>Order Amount</th>
               <th>Order Status</th>
               <th>View</th>
             </tr>
           </thead>
           <tbody>
             {myorders.map((order, index) => {
               const {
                 id, orderDate, orderTime, totalAmount, orderStatus} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td> {"$"}{totalAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                   <td>
                    <button type="button" class="btn btn-primary">View</button>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>   
   </>
    }
  </div>
  
  )
}

export default MyOrders
