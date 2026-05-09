import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const PublicProtected = ({children}) => {
const {user ,loading} = useSelector(state=>state.auth)

if(loading){
    return <h1>Loading..</h1>
}

if(!loading && user){
    return <Navigate to="/" />
}



  return children
}

export default PublicProtected
