import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  return (
    <div className='row'>
    <div className='col-2'>
    <ul class="nav nav-pills flex-column mb-3 text-center">
  <li>
    <Link to='/admin' class="nav-link link-dark">
        <FaUserAlt size={40}/><br></br>
      Dashboard
    </Link> <hr/>
  </li>
  <li>
    <Link to='/admin/viewcategories' class="nav-link link-dark">
      View categories
    </Link> <hr/>
  </li>
  {/* <li>
    <Link to='/admin/addcategory' class="nav-link link-dark">
      Add Category
    </Link> <hr/>
  </li> */}
  <li>
    <Link to='/admin/viewproducts' class="nav-link link-dark">
      View Products
    </Link> <hr/>
  </li>
  <li>
    <Link to='/admin/addproduct' class="nav-link link-dark">
      
      Add Product
    </Link><hr/>
  </li>
  <li>
    <Link to='/admin/viewsliders' class="nav-link link-dark">
      View Slider Images
    </Link> <hr/>
  </li>
  <li>
    <Link to='/admin/vieworders' class="nav-link link-dark">
      View Orders
    </Link>
  </li><hr/>
  <li>
    <Link href="#" class="nav-link link-dark">
      View Users
    </Link> <hr/>
  </li>
  <li>
    <Link href="#" class="nav-link link-dark">
      Add User
    </Link><hr/>
  </li>
</ul>
    </div>
    <div className='col-10'>
        <Outlet/>
    </div>
</div>
  )
}

export default AdminDashboard
