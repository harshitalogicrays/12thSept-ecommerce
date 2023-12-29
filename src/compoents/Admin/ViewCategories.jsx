import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useFetchCollection from '../../customhook/useFetchCollection'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_CATEGORY, selectcategories } from '../../redux/categorySlice'

const ViewCategories = () => {
    const {data,isLoading}=useFetchCollection("category")
   const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(STORE_CATEGORY(data))
    },[data])
    let categories=useSelector(selectcategories)
       let handleDelete=async(id)=>{
        if(window.confirm('sure you want to delete this??')){
            try{
                await deleteDoc(doc(db,"category",id))
                toast.success("category deleted")
                window.location.reload()
                }
            catch(err){toast.error(err.message)}
        }
    }
  return (
    <div className='container mt-5 shadow p-3'>
        {isLoading && <Loader/>}
        <h2>All Categories 
            <Link
                type="button"
                class="btn btn-info float-end btn-lg" to='/admin/addcategory' >
                Add Category
            </Link></h2><hr/>
      <div
        class="table-responsive"
      >
        <table
            class="table table-bordered table-striped table-hover"
        >
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {categories.length==0 && <tr><td colSpan={4}>No Category Found</td></tr>}
                {categories.map((c,i)=>
                    <tr key={c.id}>
                        <td scope="row">{c.id}</td>
                        <td>{c.title}</td>
                        <td>{c.desc}</td>
                        <td><button
                            type="button"
                            class="btn btn-danger" onClick={()=>handleDelete(c.id)}
                        >
                            <FaTrashAlt/>
                        </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewCategories
