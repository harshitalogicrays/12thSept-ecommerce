import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectproducts } from '../redux/productSlice'
import { add_to_cart, decrease, selectCartItems } from '../redux/cartSlice'
import ReactImageMagnify from 'react-image-magnify'
import ImageSlider from './ImageSlider'

const ProductDetails = () => {
  const {id}=useParams()
  const dispatch=useDispatch()
  const products=useSelector(selectproducts)
  const data=products.find(item=>item.id==id)
  const cartItems=useSelector(selectCartItems)
  const itemdata=cartItems.find((item)=>item.id==id)
  const itemindex=cartItems.findIndex((item)=>item.id==id)
  return (
    <div className='container col-8 shadow mt-5 p-2'>
      {data.stock >  0 ? 
        <span class="badge rounded-pill text-bg-success float-end"
        >In Stock</span>
      :
      <span class="badge rounded-pill text-bg-danger float-end"
      >Out of Stock</span>
      }
        
           
        <div className='row  p-3'>
        <div className='col-6'>
          <ImageSlider imgs={data.image}/>
        </div>
        <div className='col-6'>
            <h4>{data.name}</h4>
            <p>{data.category}<br></br>
              {data.price}
            </p>
            <p>{data.description}</p>
            {itemindex == -1  ?  
            <button type="button" class="btn btn-primary" 
            onClick={()=>dispatch(add_to_cart(data))}>Add to Cart</button>           
            :
            <>
                 <button onClick={()=>dispatch(decrease(itemdata))}>-</button>
                  <input type="text" value={itemdata.cartQuantity}  style={{width:'40px',textAlign:'center'}}/>
                  <button onClick={()=>dispatch(add_to_cart(itemdata))}>+</button>
            </>
            
            }
           
                 
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
