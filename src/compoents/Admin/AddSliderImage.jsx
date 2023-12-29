import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db, storage } from '../../firebase/config'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'

const AddSliderImage = () => {
    const [slider,setSlider]=useState({title:'',image:'',desc:'',status:''})
    const redirect=useNavigate()
    let handleImage=(e)=>{
        let file=e.target.files[0]
        const storageRef=ref(storage,`12thsept-images-slider/${Date.now()}`)
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",(snapshot)=>{
        },(error)=>{toast.error(error.message)},
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
              console.log(url)
              setSlider({ ...slider, image: url });
            })
          }
        )
    }
    let handleSubmit=(e)=>{
        e.preventDefault()
        try{
            addDoc(collection(db,"sliders"),{
              ...slider,
              createdAt:Timestamp.now().toDate()
            })
            toast.success("image added")
            redirect('/admin/viewsliders')
        }
        catch(error){toast.error(error.message)}
    }
    return (
        <div className='container mt-5 shadow  p-2'>
            <h1>Add Slider
                <Link
                    type="button"
                    class="btn btn-info float-end btn-lg" to='/admin/viewsliders' >
                    View Sliders
                </Link>

            </h1>

            <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        name="title"
                        placeholder="" value={slider.title} onChange={(e)=>setSlider({...slider,title:e.target.value})}
                    />
                    <label for="formId1">Title</label>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Choose file</label>
                    <input
                        type="file"
                        class="form-control"
                        name="image" onChange={handleImage}
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">description</label>
                    <textarea class="form-control" name="desc" id="" rows="3" value={slider.desc} onChange={(e)=>setSlider({...slider,desc:e.target.value})}>{slider.desc}</textarea>
                </div>
                <div class="form-group">
                <label class="form-check-label me-2" for=""> status </label>
               
                    <input class="form-check-input" type="checkbox" value="active"  onChange={(e)=>setSlider({...slider,status:e.target.value})}  name='status'/>
                     </div>
               <button
                type="submit"
                class="btn btn-primary mt-2"
               >
                Submit
               </button>
               
            </form>
        </div>
    )
}

export default AddSliderImage
