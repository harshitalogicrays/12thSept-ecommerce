import React from 'react'
import ProductItem from './ProductItem'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const ProductList = ({products}) => {
  return (
    <div className='mt-5'>
      {products.length==0 && <Loader/>}
      <div className='row'>
        <div className='col-2'>
        <ul class="nav nav-pills flex-column mb-3 text-center">
      <li>
        <Link to='/admin/addproduct' class="nav-link link-dark">
          
          Add Product
        </Link><hr/>
      </li>
</ul>
        </div>
        <div className='col-10'>
            <div className='row'>
            {products.map((product,i)=>
            <ProductItem key={product.id} product={product}/>
            )}
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default ProductList
