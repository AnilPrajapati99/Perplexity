import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from './Loading'
const PublicProtected = ({children}) => {
const {user ,loading} = useSelector(state=>state.auth)

if(loading){
    return <Loading/>
}

if(!loading && user){
    return <Navigate to="/" />
}



  return children
}

export default PublicProtected
