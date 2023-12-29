import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_product } from '../../redux/productSlice'
import {FaPencilAlt, FaTrash} from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { Link } from 'react-router-dom'
const ViewProducts = () => {
  const {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
   useEffect(()=>{
       dispatch(store_product({productsdata:data}))
   },[data])
   let products=useSelector(selectproducts)

   let handleDelete=async(id,imageURL)=>{
    console.log(imageURL)
    if(window.confirm('sure you want to delete this??')){
      try{
        Array.from(imageURL).forEach(async(file)=>{
          await deleteObject(ref(storage,file))       
        })
        await deleteDoc(doc(db,"products",id))
          toast.success("product deleted")
          }
      catch(err){toast.error(err.message)}
  }
   }
  return (
    <div className='container mt-4 shadow'>
      <h2>View Products</h2><hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th>category</th>
              <th>brand</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length==0 && <tr><td colSpan={8}>No product found</td></tr>}
            {products.map((product)=>
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td><img src={product.image[0]} width='50px' hegiht='50px'/></td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link type="button" class="btn btn-success me-2" to={`/admin/edit/${product.id}`}><FaPencilAlt/></Link>
                  <button type="button" class="btn btn-danger" 
                    onClick={()=>handleDelete(product.id,product.image)}><FaTrash/></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewProducts
