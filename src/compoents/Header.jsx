import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaArrowAltCircleLeft, FaHome, FaLock, FaPenAlt, FaSearch, FaShoppingBasket, FaShoppingCart} from 'react-icons/fa' 
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser, logoutuser, selectUserName, selectUserRole } from '../redux/authSlice'
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks'
import { selectCartItems } from '../redux/cartSlice'
import useFetchCollection from '../customhook/useFetchCollection'
import { selectproducts, store_product } from '../redux/productSlice'
import { filter_by_search } from '../redux/filterSlice'
const Header = () => {
    const cartItems=useSelector(selectCartItems)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const username=useSelector(selectUserName)
    const role=useSelector(selectUserRole)

    const [search,setSearch]=useState('')

    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                 const uid = user.uid;
                const docref=doc(db,"users",uid)
                const docSnap=await getDoc(docref)
                let obj={userEmail:docSnap.data().email,userId:uid,userName:docSnap.data().username,userRole:docSnap.data().role}
                dispatch(loginuser(obj))
            } else {
                dispatch(logoutuser())
            }
          });
    },[auth])

    let handleLogout=()=>{
        signOut(auth).then(() => {
           toast.success("loggedOut Successfully")
           navigate('/')
          }).catch((error) => {
            toast.error(error.message)
          });
          
    }

    const{data}=useFetchCollection('products')
    useEffect(()=>{ dispatch(store_product({productsdata:data}))},[data])
    const allproducts=useSelector(selectproducts)
    let filterProduct=(e)=>{
        e.preventDefault()
        dispatch(filter_by_search({allproducts,search}))
    }

    useEffect(()=>{
        dispatch(filter_by_search({allproducts,search}))
    },[search])

    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark" >
            <div class="container-fluid">
                <a class="navbar-brand" href="#">flipcart</a>
                <button
                    class="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" to='/' aria-current="page"
                            ><FaHome/>Home<span class="visually-hidden">(current)</span></Link >
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to='/products'><FaShoppingBasket/>Products</Link>
                        </li>
                       
                    </ul>
                    <form class="d-flex my-2 my-lg-0">
                        <div className='input-group'>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <button
                            class="btn btn-danger my-2 my-sm-0"
                            type="submit" onClick={filterProduct}>
                            <FaSearch/>
                        </button>
                        </div>
                    </form>
                    <ul class="navbar-nav mt-2 mt-lg-0">
                        
                        <li class="nav-item">
                            <Link class="nav-link" to='/cart'><FaShoppingCart size={30}/>
                            <span
                                class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}
                                >{cartItems.length}</span>
                            </Link>
                        </li>
                        <ShowOnLogout>
                            <li class="nav-item">
                                <Link class="nav-link" to='/register'><FaPenAlt/>Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/login'><FaLock/> Login</Link>
                            </li>
                        </ShowOnLogout>
                        <ShowOnLogin>
                            {role=="user" &&
                                <li class="nav-item">
                                    <Link class="nav-link" to='/myorders'>My Orders</Link>
                                </li>
                            }
                            <li class="nav-item">
                                <a class="nav-link" href="#">Welcome {username}</a>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" onClick={handleLogout}><FaArrowAltCircleLeft/> Logout</button>
                            </li>
                        </ShowOnLogin>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header
