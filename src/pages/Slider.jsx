import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import useFetchCollection from '../customhook/useFetchCollection'

const Slider = () => {
  const {data}=useFetchCollection("sliders")
  const slider=data.filter((d)=>d.status=="active")
  console.log(slider)
  // const [slider,setSlider]=useState([])
  // useEffect(()=>{
  //     getslider()
  // },[])
//   let getslider=async()=>{
//    let docSnap= await getDocs(collection(db, "sliders"));
//     const newData = docSnap.docs.map((doc) => ({...doc.data(), id:doc.id }));
//       setSlider(newData)   
// }
  return (
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-pause='false' data-bs-interval='2000'>
    <div class="carousel-inner">
      {slider.length !=0 && 
      slider.map((s,i)=>
      <div class={`carousel-item ${i==0?"active":''}`} key={i}>
      <img src={s.image} class="d-block w-100" height='500px'/>
      <div class="carousel-caption d-none d-md-block">
      <h5>{s.title}</h5>
      <p>{s.desc}</p>
    </div>
    </div>
   
      )}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default Slider
