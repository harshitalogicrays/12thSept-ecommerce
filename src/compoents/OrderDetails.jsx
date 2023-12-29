import React, { useEffect, useState } from 'react'
import useFetchDocument from '../customhook/useFetchDocument'
import { Link, useParams } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import ChangeOrderstatus from './Admin/ChangeOrderstatus'

const OrderDetails = () => {
    const {id}=useParams()
    const {document}=useFetchDocument("orders",id)
    const [order,setOrder]=useState(null)
    useEffect(()=>{
        setOrder(document)
    },[document])
  return (
    <div className='container shadow mt-2 p-2'>
        <h2>Order Details</h2>
        <div>
            <Link to='/admin/vieworders' className='btn btn-primary mb-2'> 
            <FaArrowAltCircleLeft/> Back to Orders</Link>
        </div>
        <br></br>
        {order  ==  null ? 
            <>
            <div class="spinner-border" style={{width:'3rem',height: '3rem'}} role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow" style={{width:'3rem',height: '3rem'}} role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
            </>
            :
            <>
            <h4 className='text-info'>Order Status = {order.orderStatus}</h4>
             <b>Shipping Address</b>
    <br />
    Address: {order.shippingAddress.line1},
    {order.shippingAddress.line2}, {order.shippingAddress.city}
    <br />
    State: {order.shippingAddress.state}
    <br />
    Country: {order.shippingAddress.country}
  <br />
  <table className="table table-bordered table-hover">
    <thead>
      <tr>
        <th>s/n</th>
        <th>Product</th>
        <th>Image</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {order.cartItems.map((cart, index) => {
        const { id, name, price, image, cartQuantity } = cart;
        return (
          <tr key={id}>
            <td>
              <b>{index + 1}</b>
            </td>
            <td>
                 <b>{name}</b>
</td><td>
              <img
                src={image}
                alt={name}
                style={{ width: "50px" }}
              />
            </td>
            <td>{price}</td>
            <td>{cartQuantity}</td>
            <td>{(price * cartQuantity)}</td>
          </tr>
        );
      })
      }
    </tbody>
  </table>

      <ChangeOrderstatus id={id} orderStatus={order.orderStatus} order={order}/>
            </>
    }

    </div>
  )
}

export default OrderDetails
