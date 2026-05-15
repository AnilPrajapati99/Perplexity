import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
import Loading from './Loading'


const Protected = ({children}) => {
    const {user }= useSelector(state=>state.auth)
    const {checkingAuth }= useSelector(state=>state.auth)
    console.log(user, checkingAuth)

    if(checkingAuth){
      return <Loading/>
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
  return children
}

export default Protected
