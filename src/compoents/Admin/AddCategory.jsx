import { Timestamp, addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'

const AddCategory = () => {
    const navigate=useNavigate()
    let [category,setCategory]=useState({title:'',desc:''})
    let handleSubmit=async(e)=>{
        e.preventDefault()
        let docref=collection(db,"category")
        try{
            const res= await addDoc(docref,{...category,createdAt:Timestamp.now().toDate()})
            toast.success("category added")
            navigate('/admin/viewcategories')
        }
        catch(err){toast.error(err.message)}
    }
  return (
    <div className='container mt-5 shadow col-10 p-3'>
        <h1>Add Category
            <Link
                type="button"
                class="btn btn-info float-end btn-lg" to='/admin/viewcategories' >
                View Categories
            </Link>
            
        </h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="" class="form-label">Title</label>
            <input
                type="text"
                name="title"
                id=""
                class="form-control"
                placeholder=""
                value={category.title} onChange={(e)=>setCategory({...category,title:e.target.value})}
            />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">Description</label>
        <textarea class="form-control" name="desc" id="" rows="3"  
        value={category.desc} onChange={(e)=>setCategory({...category,desc:e.target.value})}
          >{category.desc}</textarea>
      </div>
      <button
        type="submit"
        class="btn btn-primary"  >
        Submit
      </button>
      
        
      </form>
    </div>
  )
}

export default AddCategory
