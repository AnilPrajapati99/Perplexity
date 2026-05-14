import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
import Loading from './Loading'


const Protected = ({children}) => {
    const {user }= useSelector(state=>state.auth)
    const {loading }= useSelector(state=>state.auth)
    console.log(loading)

    if(loading){
      return <Loading/>
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
  return children
}

export default Protected
