
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { STORE_CATEGORY, selectcategories } from "../../redux/categorySlice";
import Loader from "../Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import useFetchCollection from "../../customhook/useFetchCollection";
import { selectproducts } from "../../redux/productSlice";

const AddProduct = () => {
   const {data}=useFetchCollection("category")
  const dispatch=useDispatch()
   useEffect(()=>{
       dispatch(STORE_CATEGORY(data))
   },[data])
   let categories=useSelector(selectcategories)
  let obj = {category: "", name: "",  price: "", brand: "", stock: "", image: "",  description: ""};
  let [product, setProduct] = useState(obj);
  let redirect=useNavigate()
  let [isLoading,setIsLoading]=useState(false)
  let [uploadProgress,setUploadProgress]=useState(0)
  //edit
  const {id}=useParams()
  let products=useSelector(selectproducts)
  let productEdit=products.find((item)=>item.id==id)
  console.log(productEdit)
  const [productImages, setProductImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  useEffect(()=>{
    if(id) {setProduct({...productEdit})
    setProductImages(productEdit.image || [])
  }
    else setProduct(obj)
  },[id])

  let handleRemoveImage=(index,image)=>{
    const updatedImages = [...productImages];
      updatedImages.splice(index, 1);
      setProductImages(updatedImages);
      deleteObject(ref(storage,image))
  }

  let handleproduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  let handleImage=(e)=>{
    let images=e.target.files
    let arr=[]
    Array.from(images).forEach((file)=>{
      const storageRef=ref(storage,`12thsept-images-product/${Date.now()}`)
      const uploadTask=uploadBytesResumable(storageRef,file)
      uploadTask.on("state_changed",(snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
        setUploadProgress(progress)
      },(error)=>{toast.error(error.message)},
        async()=>{
          try{
            await getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            console.log(url)
            arr.push(url)
            setNewImages((prevImages) => [...prevImages, url]); //update - add images
          })
          setProduct({ ...product, image: arr });
        }
        catch(err){console.log(err.message)}
        }
      )
    })
   
   }
  let handlesubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    if(!id){
    try{
        addDoc(collection(db,"products"),{
          category:product.category,
          name:product.name,
          brand:product.brand,
          image:product.image,
          price:product.price,
          stock:product.stock,
          description:product.description,
          createdAt:Timestamp.now().toDate()
        })
        setIsLoading(false)
        toast.success("product added")
        redirect('/admin/viewproducts')
    }
    catch(error){ setIsLoading(false);toast.error(error.message)}
  }
  else {
      const updatedImages=[...productImages,...newImages]
    try{
      setDoc(doc(db,"products",id),{
        category:product.category,
        name:product.name,
        brand:product.brand,
        image:updatedImages,
        price:product.price,
        stock:product.stock,
        description:product.description,
        createdAt:productEdit.createdAt,
        editedAt:Timestamp.now().toDate()
      })
      setIsLoading(false)
      toast.success("product updated")
      redirect('/admin/viewproducts')
  }
  catch(error){ setIsLoading(false);toast.error(error.message)}
  }
}
  return (
    <div className="container mt-3 shadow">
      {isLoading && <Loader/>}
      <h1>{id?"Edit":"Add"} Product</h1> <hr />
      <form onSubmit={handlesubmit} encType="multipart/form-data">
        <div class="mb-3">
          <label for="" class="form-label">
            category
          </label>
          <select name="category" class="form-select" onChange={handleproduct} value={product.category}>
            <option> ------choose one-----------</option>
            {categories.map((c,i)=><option key={i}>{c.title}</option>)}
          </select>
        </div>
        <div className="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            value={product.name}
            onChange={handleproduct}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            price
          </label>
          <input
            type="number"
            name="price"
            id=""
            class="form-control"
            value={product.price}
            onChange={handleproduct}
          />
        </div></div>
        <div className="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            id=""
            class="form-control"
            value={product.brand}
            onChange={handleproduct}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            stock
          </label>
          <input
            type="number"
            name="stock"
            id=""
            class="form-control"
            value={product.stock}
            onChange={handleproduct}
          />
        </div> </div>
        {uploadProgress != 0 &&
        <div class="progress mb-3" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
       <div class="progress-bar" style={{width: `${uploadProgress}%`}}>
        {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
        </div>
      </div>
}
        <div class="mb-3">
          <label for="" class="form-label">
            image
          </label>
          <input
            type="file"
            name="image"
            id=""  multiple
            class="form-control"
             onChange={handleImage}
          />
        </div>
        {id && 
               <>{productImages.map((image,i)=><React.Fragment key={i}><img src={image} width='100px' height='100px'  style={{border:'3px solid black',marginTop:'30px'}}/>
              <span class="text-danger me-2" style={{position:'relative',top:'-30px',left:'-7px',fontSize:'20px'}}  onClick={()=>handleRemoveImage(i,image)}> X </span>
            
            </React.Fragment>)} </> }
         <div class="mb-3">
          <label for="" class="form-label">
            description
          </label>
          <textarea name="description" class="form-control" value={product.description}   onChange={handleproduct}></textarea>
        </div>
        <button type="submit" class="btn btn-primary">{id? "Update" :"Submit"}</button>
      </form>
    </div>
  );
};

export default AddProduct;
