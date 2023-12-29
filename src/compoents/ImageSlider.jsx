import React, { useEffect, useState } from 'react';
import './Imageslider.css';
import ReactImageMagnify from 'react-image-magnify';
const ImageSlider=({imgs}) =>{
  const [image,setimage]=useState(imgs[0]) //image url
  const [index,setIndex] = useState(0) //index
  const handleClick=(index)=>{
    setIndex(index)
    const wordSlider=imgs[index];
    setimage(wordSlider)
  }
  return (
    <div className="main">
         <ReactImageMagnify {...{
      smallImage: {
          height:300,
          width:380,
          src: image
      },
      largeImage: {
          src: image,
          width: 1200,
          height: 1000
      }
  }} />
      <div className='flex_row'>
        {imgs.map((data,i)=>
        <div className="thumbnail" key={i} >
          <img className={index==i ? "clicked":''} src={data} onClick={()=>handleClick(i)} height="70" width="100" />
        </div>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;