
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import Loader from '../compoents/Loader'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'

const Login = () => {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [isLoading,setIsLoading]=useState(false)
    const redirect=useNavigate()
    let PreviousURL=useSelector(selectURL)
    let redirectURL=()=>{
        if(PreviousURL.includes('cart')){
          redirect('/cart')
        }
        else {redirect('/')}
      
    }
    let loginUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          const docref=doc(db,"users",user.uid)
         const docSnap= await getDoc(docref)
         let role=docSnap.data().role
         if(role=="admin"){
          setIsLoading(false)
          toast.success('loggedIn Successfully')
          redirect('/admin')
         }
         else if(role=="user"){
          setIsLoading(false)
          toast.success('loggedIn Successfully')
          redirectURL()
         }
        
        })
        .catch((error) => {
          setIsLoading(false)
           toast.error(error.message)
        });
      }
      const provider = new GoogleAuthProvider();
      let loginwithgoogle=()=>{
        signInWithPopup(auth, provider)
          .then(async(result) => {
            const user = result.user;
            const docref=doc(db,"users",user.uid)
            await setDoc(docref,{email:user.email,username:user.displayName,role:'user',createdAt:Timestamp.now().toDate()})
            toast.success('loggedIn Successfully')
            redirectURL()
          }).catch((error) => {
              toast.error(error.message)
          });
      }
  return (
    <div className='container mt-4 shadow'>    
    <h1>Login Page</h1> <hr/>
    {isLoading && <Loader/>}
    <div className='row '>
        <div className='col-4'>
            <img src={require('../assets/login.png')} className='img-fluid'/>
        </div>
        <div className='col-6'>
            <form onSubmit={loginUser}>
                <div class="mb-3">
                  <label for="" class="form-label">Email</label>
                  <input type="text" name="email" id="" class="form-control" value={email} 
                  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Password</label>
                  <input type="password" name="password" id="" class="form-control" value={password} 
                  onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div class="d-grid gap-2">
                     <button type="submit" class="btn btn-primary">Login</button>
                </div>
                <hr/>
                <div class="d-grid gap-2">
                     <button type="button" class="btn btn-danger" onClick={loginwithgoogle}>Login with google</button>
                </div>
                <hr/>
                <p>Create an Account?? <Link to='/register'>SignUp</Link></p>
            </form>
        </div>
    </div>
    </div>

  )
}

export default Login
