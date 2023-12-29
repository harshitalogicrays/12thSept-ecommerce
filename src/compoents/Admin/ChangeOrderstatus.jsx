import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';

const ChangeOrderstatus = ({id,orderStatus,order}) => {
    let [status,setStatus]=useState(orderStatus)
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        const orderConfig={
            userId:order.userId,
            userEmail:order.userEmail,
            totalAmount:order.totalAmount,
            cartItems:order.cartItems,
            shippingAddress:order.shippingAddress,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            orderStatus:status,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toDate()
        }
        try{
                setDoc(doc(db,"orders",id),orderConfig)
                emailjs.send('service_06v6km4', 'template_eaf64yr',{user_email:orderConfig.userEmail,order_status:status,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
                .then((result) => {     
                    toast.success("order status updated")
                     navigate('/admin/vieworders')    
                }, (error) => {
                    console.log(error.text);
                });
                
        }
        catch(err){
            toast.error(err.message)
        }
    }
  return (
    <div className='col-6'>
      <h4>Change Order Status</h4>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="" class="form-label">Order Status</label>
                <select  class="form-select" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option>choose one</option>
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Cancelling</option>
                    <option>Delivered</option>
                </select>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
            >
                Update Status
            </button>
            
        </form>
    </div>
  )
}

export default ChangeOrderstatus
