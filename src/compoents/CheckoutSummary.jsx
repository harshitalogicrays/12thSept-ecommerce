import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const total=useSelector(selectTotalAmount)
  return (
    <div>
      <h1>Checkout Summary</h1><hr/>
      <div className='card p-2'>
        <h5>Total Product(s) : {cartItems.length}</h5>
        <h5>Total Amount : {total}</h5>
      </div>
      {cartItems.map((item,i)=><div key={i} className='card p-2'>
            <p>Product Name: {item.name}<br/>
                Unit Price: {item.price}<br/>
                Qty:{item.cartQuantity}
            </p>

      </div>
      )}
    </div>
  )
}

export default CheckoutSummary
