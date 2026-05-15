import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'
const PublicProtected = ({children}) => {
const {user , authLoading} = useSelector(state=>state.auth)

// if(authLoading){
//     return <Loading/>
// }

if( user){
    return <Navigate to="/" />
}



  return children
}

export default PublicProtected
