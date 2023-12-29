import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn, selectUserRole } from '../redux/authSlice'
import { Navigate } from 'react-router-dom'

export const ShowOnLogin = ({children}) => {
 const isLoggedIn=useSelector(selectIsLoggedIn)
 if(isLoggedIn){return children}
 else {return null}
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn==false){return children}
    else {return null}
  }

  export const ProtectedAdmin = ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="admin"){return children}
    else {return <Navigate to='/login'></Navigate>}
   }

   export const Protected = ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn){return children}
    else {return <Navigate to='/login'></Navigate>}
   }