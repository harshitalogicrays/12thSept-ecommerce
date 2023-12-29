import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { add_to_cart } from '../redux/cartSlice'

const ProductItem = ({product}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let addtocart=()=>{
    console.log(product)
      dispatch(add_to_cart(product))
    }
  return (
    <div className='col-3 mb-3'>
      <div className="card">
        <Link to={`/details/${product.id}`}>
        <img className="card-img-top" src={product.image[0]} alt={product.name} height={200}/>
        </Link>
        <div className="card-body">
            <h4 className="card-title">{product.name}</h4>
            <p className="card-text">{product.price}
            <br/>available: {product.stock}</p>
            <button type="button" class="btn btn-primary me-2" onClick={addtocart}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
