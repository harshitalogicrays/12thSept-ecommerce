import React, { useEffect } from 'react'
import ProductList from './ProductList'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_product } from '../redux/productSlice'
import Loader from './Loader'
import { selectfilters } from '../redux/filterSlice'

const Products = () => {
  const {data}=useFetchCollection("products")
  const dispatch=useDispatch()
   useEffect(()=>{
       dispatch(store_product({productsdata:data}))
   },[data])
   let products=useSelector(selectproducts)
   let filterproducts=useSelector(selectfilters)
  return (
    <>
    {filterproducts.length==0 ? 
      <ProductList products={products}/>
      :
      <ProductList products={filterproducts}/>
    }
    </>
  )
}

export default Products
