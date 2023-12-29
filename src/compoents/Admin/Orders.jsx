import React, { useEffect } from 'react'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_order } from '../../redux/orderSlice'
import Loader from '../Loader'
import { Link, useNavigate } from 'react-router-dom'

const Orders = () => {
    const{data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(store_order(data))
    },[data])

    const orders=useSelector(selectorders)
    let handleOrder=(id)=>{
      navigate(`/admin/order-details/${id}`)
    }
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>Orders</h1><hr/>
    {orders.length == 0 ?  <>No Orders</>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>User Email</th>
               <th>Order Amount</th>
               <th>Order Status</th>
               <th>View</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order, index) => {
               const {
                 id, orderDate, orderTime, totalAmount, orderStatus,userEmail} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td>{userEmail}</td>
                   <td> {"$"}{totalAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                   <td>
                    <button type="button" class="btn btn-primary" 
                    disabled={orderStatus == "Delivered" ? "true": "" }  onClick={()=>handleOrder(id)}
                      
                    >View</button>
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

export default Orders
