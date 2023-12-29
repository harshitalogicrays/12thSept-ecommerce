
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import Loader from '../compoents/Loader'

const Register = () => {
    let initialstate={username: '',email:'',password:'',cpassword:'',role:'user'}
    let [user,setuser]=useState(initialstate)
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let registerUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async(userCredential) => {
          const user1 = userCredential.user;
          const docref=doc(db,"users",user1.uid)
          await setDoc(docref,{...user,createdAt:Timestamp.now().toDate()})
          setIsLoading(false)
          toast.success('registered Successfully')
            navigate('/')
        })
        .catch((error) => {
             setIsLoading(false)
             toast.error(error.message)
        });
    }
  return (
    <div className='container mt-4 shadow'>    
    <h1>Register Page</h1> <hr/>
    {isLoading && <Loader/>}
    <div className='row '>
        <div className='col-4'>
            <img src={require('../assets/register.png')} className='img-fluid'/>
        </div>
        <div className='col-6'>
            <form onSubmit={registerUser}>
            <div class="mb-3">
                  <label for="" class="form-label">User Name</label>
                  <input type="text" name="username" id="" class="form-control" value={user.username} 
                  onChange={(e)=>setuser({...user,username:(e.target.value)})}/>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Email</label>
                  <input type="text" name="email" id="" class="form-control" value={user.email} 
                  onChange={(e)=>setuser({...user,email:(e.target.value)})}/>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Password</label>
                  <input type="password" name="password" id="" class="form-control" value={user.password} 
                  onChange={(e)=>setuser({...user,password:(e.target.value)})}/>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label"> Confirm Password</label>
                  <input type="password" name="cpassword" id="" class="form-control" value={user.cpassword} 
                  onChange={(e)=>setuser({...user,cpassword:(e.target.value)})}/>
                </div>
                <div class="d-grid gap-2">
                     <button type="submit" class="btn btn-primary">Register</button>
                </div>
               
                <hr/>
                <p> Already an account??{" "}<Link to='/login'>sign in</Link></p>
            </form>
        </div>
    </div>
    </div>

  )
}
    
  

export default Register
