import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchCollection = (collectionname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getCollectionData()
    },[])
    let getCollectionData=()=>{
        setIsLoading(true)
        try{
            const docref=collection(db,collectionname)
            const q=query(docref,orderBy('createdAt','desc'))
            onSnapshot(q,((docSnap)=>{               
                    const allData = docSnap.docs.map((doc) => ({...doc.data(), id:doc.id }));
                    setData(allData)
                    setIsLoading(false)
             }
            ))
        }
        catch(err){setIsLoading(false)
            console.log(err.message)
        }
    }
  return (
    {data,isLoading}
  )
}

export default useFetchCollection
