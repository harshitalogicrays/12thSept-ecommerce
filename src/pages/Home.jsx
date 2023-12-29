import React, { useEffect } from 'react'
import Slider from './Slider'
import Products from '../compoents/Products'

const Home = () => {
  // useEffect(()=>{
    // fetch("http://localhost:1000").then((res)=>{
    //   return res.json().then((data)=>console.log(data))
    // }).catch(err=>console.log(err))

  //   fetch("http://localhost:1000",{
  //     method:"POST",
  //     headers:{'content-type':'application/json'},
  //     body:JSON.stringify({id:'1001'})
  //   }).then((res)=>{
  //     return res.json().then((data)=>console.log(data))
  //   }).catch(err=>console.log(err))
  // },[])
  return (
    <>    <Slider/>
    {/* <Products/> */}
    </>

  )
}

export default Home
