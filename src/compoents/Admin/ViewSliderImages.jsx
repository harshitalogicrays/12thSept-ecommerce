import React from 'react'
import { Link } from 'react-router-dom'

const ViewSliderImages = () => {
  return (
    <div className='container mt-5 shadow p-2'>
        <h1>View Sliders
            <Link
                type="button"
                class="btn btn-info float-end btn-lg" to='/admin/addslider' >
                Add Slider
            </Link>
            
        </h1>
      
    </div>
  )
}

export default ViewSliderImages
